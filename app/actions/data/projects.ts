"use server";

import { eq } from "drizzle-orm";
import { generateUniqueId } from "@/app/_utils/generate-unique-id";
import { getDB } from "@/lib/db";
import logger from "@/logger";
import { project } from "@/schemas/project-schema";

import type {
  Type_AddProjectResponse,
  Type_GetAllProjectNamesResponse,
} from "./types";

// Add a new project
export async function addProject({
  userID,
  projectName,
  projectURL,
}: {
  userID: string;
  projectName: string;
  projectURL: string;
}): Promise<Type_AddProjectResponse> {
  try {
    // Check if a project with the same URL already exists for this user
    const db = getDB();
    const projectWithSameURL = await db.query.project.findFirst({
      where: eq(project.projectURL, projectURL),
    });

    if (projectWithSameURL) {
      return { errorOccurred: false, projectAlreadyExists: true };
    }

    // Since project with same URL doesn't exist, create a new one
    // Get the ID of the user from session

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

    logger.error("Error in addProject:", error);
    return { errorOccurred: true };
  }
}

// Get all project's names (useful for listing projects in the select project component)
export async function getAllProjectNamesAndIDs({
  userID,
}: {
  userID: string;
}): Promise<Type_GetAllProjectNamesResponse> {
  try {
    const db = getDB();

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

    logger.error("Error in getAllProjectNamesAndIDs:", error);

    return {
      errorOccurred: true,
    };
  }
}

// // Get a single project by its ID
// export async function getProjectByID(
//   projectID: string,
// ): Promise<Type_GetProjectByIDResponse> {
//   const projectsCollection = client.db("Greenify").collection("projects");
//   try {
//     const project = await projectsCollection.findOne({
//       _id: new ObjectId(projectID),
//     });

//     // If not found
//     if (!project) {
//       return { errorOccurred: false, notFound: true };
//     }

//     // If found
//     return {
//       errorOccurred: false,
//       notFound: false,

//       project: {
//         name: project.name,
//         url: project.url,
//       },
//     };
//   } catch (e) {
//     logger.error("Error in getProjectByID:", e);
//     return { errorOccurred: true };
//   }
// }
