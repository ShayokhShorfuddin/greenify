"use server";

import { ObjectId } from "mongodb";
import client from "@/lib/db";
import logger from "@/logger";
import type {
  Type_AddProjectData,
  Type_AddProjectResponse,
  Type_GetAllProjectNamesResponse,
  Type_GetProjectByIDResponse,
} from "./types";

// add a new project
export async function addProject(
  projectData: Type_AddProjectData,
): Promise<Type_AddProjectResponse> {
  const projectsCollection = client.db("Greenify").collection("projects");
  try {
    // Check if a project with the same URL already exists for this user
    const projectExists = await projectsCollection.findOne({
      url: projectData.url,
      ownerEmail: projectData.ownerEmail,
    });

    if (projectExists) {
      return { errorOccurred: false, projectAlreadyExists: true };
    }

    const { insertedId } = await projectsCollection.insertOne(projectData);

    return {
      errorOccurred: false,
      projectAlreadyExists: false,
      projectID: insertedId.toString(),
    };
  } catch {
    // TODO: Call sentry here
    return { errorOccurred: true };
  }
}

// Get all project's names (usefull for listing projects in the select project component)
// export async function getAllProjectNames(
//   ownerEmail: string,
// ): Promise<Type_GetAllProjectNamesResponse> {}

// Get a single project by its ID
export async function getProjectByID(
  projectID: string,
): Promise<Type_GetProjectByIDResponse> {
  //TODO: remove me later.
  //  Simulate 3 second delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const projectsCollection = client.db("Greenify").collection("projects");
  try {
    const project = await projectsCollection.findOne({
      _id: new ObjectId(projectID),
    });

    // If not found
    if (!project) {
      return { errorOccurred: false, notFound: true };
    }

    // If found
    return {
      errorOccurred: false,
      notFound: false,

      project: {
        name: project.name,
        url: project.url,
      },
    };
  } catch (e) {
    logger.error("Error in getProjectByID:", e);
    return { errorOccurred: true };
  }
}
