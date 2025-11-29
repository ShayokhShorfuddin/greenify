import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Schemas
// Import and add more schemas as we create them
import { project } from "@/schemas/project-schema";

declare global {
  var database: PostgresJsDatabase<{ project: typeof project }> | undefined;
}

const instance = drizzle(process.env.DATABASE_URL as string, {
  schema: {
    project,
  },
});

if (process.env.NODE_ENV !== "production") {
  global.database = instance;
}

export function getDB(): PostgresJsDatabase<{ project: typeof project }> {
  return global.database || instance;
}
