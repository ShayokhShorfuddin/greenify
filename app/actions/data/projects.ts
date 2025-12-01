"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { generateUniqueId } from "@/app/_utils/generate-unique-id";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/logger";
import { project } from "@/schemas/project-schema";
import type {
  Type_AddProjectResponse,
  Type_GetAllProjectNamesResponse,
  Type_GetProjectByIDResponse,
} from "./types";

// Add a new project
export async function addProject({
  projectName,
  projectURL,
}: {
  projectName: string;
  projectURL: string;
}): Promise<Type_AddProjectResponse> {
  try {
    // Check if a project with the same URL already exists for this user
    const projectWithSameURL = await db.query.project.findFirst({
      where: eq(project.projectURL, projectURL),
    });

    if (projectWithSameURL) {
      return { errorOccurred: false, projectAlreadyExists: true };
    }

    // Since project with same URL doesn't exist, create a new one

    // Get the ID of the user from session
    const userID = await auth.api
      .getSession({
        headers: await headers(),
      })
      .then((session) => session?.user.id as string);

    // Generate unique id for the project
    const projectID = generateUniqueId();

    await db.insert(project).values({
      id: projectID,
      projectName,
      projectURL,
      createdBy: userID,
      createdAt: new Date(),
    });

    return {
      errorOccurred: false,
      projectAlreadyExists: false,
      projectID,
    };
  } catch (error) {
    // TODO: Call sentry here

    logger.error(`Error in addProject: ${error}`);
    return { errorOccurred: true };
  }
}

// Get all project's names (useful for listing projects in the select project component)
export async function getAllProjectNamesAndIDs(): Promise<Type_GetAllProjectNamesResponse> {
  try {
    const userID = await auth.api
      .getSession({
        headers: await headers(),
      })
      .then((session) => session?.user.id as string);

    const projectsCreatedByUser = await db.query.project.findMany({
      where: eq(project.createdBy, userID),
    });

    return {
      errorOccurred: false,
      projectNamesAndIDs: projectsCreatedByUser.map((project) => ({
        name: project.projectName,
        projectID: project.id,
      })),
    };
  } catch (error) {
    // TODO: Call sentry here

    logger.error(`Error in getAllProjectNamesAndIDs: ${error}`);

    return {
      errorOccurred: true,
    };
  }
}

// Get a single project by its ID
export async function getProjectByID({
  projectID,
}: {
  projectID: string;
}): Promise<Type_GetProjectByIDResponse> {
  try {
    const projectData = await db.query.project.findFirst({
      where: eq(project.id, projectID),
    });

    // If not found
    if (!projectData) {
      return {
        errorOccurred: false,
        notFound: true,
      };
    }

    // If found
    return {
      errorOccurred: false,
      notFound: false,

      project: {
        name: projectData.projectName,
        url: projectData.projectURL,
      },
    };
  } catch (error) {
    // TODO: Call sentry here

    logger.error(`Error in getProjectByID: ${error}`);

    return {
      errorOccurred: true,
    };
  }
}
