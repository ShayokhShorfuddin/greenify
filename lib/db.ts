import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@/schemas/schema";

declare global {
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

const instance = drizzle(process.env.DATABASE_URL as string, { schema });

if (process.env.NODE_ENV !== "production") {
  global.database = instance;
}

export function getDB(): PostgresJsDatabase<typeof schema> {
  return global.database || instance;
}

//TODO Still getting CONNECT_TIMEOUT issue.
// Try looking into "Connect" in our dashboard and "ORMs". Also feel free to see other options next to ORMs
