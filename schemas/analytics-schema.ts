import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const analytics = pgTable("analytics", {
  id: text("id").primaryKey(),
  projectID: text("project_id").notNull(),
  totalTransferSize: integer("total_transfer_size").notNull(),
  assets: jsonb("assets")
    .$type<
      Array<{
        url: string;
        type: string;
        duration: number;
        transferSize: number;
      }>
    >()
    .notNull(),
  createdAt: timestamp("created_at").notNull(),
});
