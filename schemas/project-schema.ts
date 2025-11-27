import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const project = pgTable("project", {
  id: text("id").primaryKey(),
  projectName: text("project_name").notNull(),
  projectURL: text("project_url").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
