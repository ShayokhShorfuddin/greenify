import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/schemas/schema";

const connectionString = process.env.DATABASE_URL as string;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

// TODO Took it from Supabase dashboard. See if this one works or not

// import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// declare global {
//   var database: PostgresJsDatabase<typeof schema> | undefined;
// }

// // Disable prefetch as it is not supported for "Transaction" pool mode
// const client = postgres(process.env.DATABASE_URL as string, { prepare: false });
// const instance = drizzle(client, { schema });

// if (process.env.NODE_ENV !== "production") {
//   global.database = instance;
// }

// export function getDB(): PostgresJsDatabase<typeof schema> {
//   return global.database || instance;
// }

//TODO (Still getting the same issue of MaxClientsReached) (Wait, did adding prepare: false resolve the issue?! Test a bit more to be sure) Still getting CONNECT_TIMEOUT issue.
// Try looking into "Connect" in our dashboard and "ORMs". Also feel free to see other options next to ORMs
