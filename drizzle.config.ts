import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./schemas",
  dialect: "postgresql",

  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: <>
    url: process.env.DATABASE_URL!,
  },
});
