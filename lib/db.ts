import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Schemas
// Import and add more schemas as we create them
import { analytics } from "@/schemas/analytics-schema";
import { project } from "@/schemas/project-schema";

declare global {
  var database: PostgresJsDatabase<{ project: typeof project }> | undefined;
}

const instance = drizzle(process.env.DATABASE_URL as string, {
  schema: {
    project,
    analytics,
  },
});

if (process.env.NODE_ENV !== "production") {
  global.database = instance;
}

export function getDB(): PostgresJsDatabase<{ project: typeof project }> {
  return global.database || instance;
}

//TODO Still getting CONNECT_TIMEOUT issue.
// Try looking into "Connect" in our dashboard and "ORMs". Also feel free to see other options next to ORMs
