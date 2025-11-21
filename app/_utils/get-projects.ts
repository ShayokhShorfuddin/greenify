import client from "@/lib/db";

export async function getProjects({ userEmail }: { userEmail: string }) {
  // Connect to MongoDB
  const database = client.db("Greenify");
  const projectsCollection = database.collection("projects");

  // TODO: complete after creating new projects with New project button
}
