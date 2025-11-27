import { drizzle } from "drizzle-orm/postgres-js";

// Schemas
import { project } from "@/schemas/project-schema";

export function getDB() {
  return drizzle(process.env.DATABASE_URL as string, {
    schema: {
      project,
    },
  });
}
