import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/schemas/auth-schema";
import { getDB } from "./db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  plugins: [nextCookies()],
  database: drizzleAdapter(getDB(), {
    provider: "pg",
    schema,
  }),

  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://sage-io.vercel.app",
  // TODO: Update this URL after deploying to Netlify
  trustedOrigins: ["http://localhost:3000", "https://sage-io.vercel.app"], // TODO: Update this URL after deploying to Netlify
});
