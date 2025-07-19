import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  developer: text("developer").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  downloadUrl: text("download_url").notNull(),
  iconUrl: text("icon_url"),
  rating: integer("rating").notNull().default(0), // stored as integer (e.g., 45 for 4.5)
  downloads: text("downloads").default("0"),
  size: text("size").notNull(),
  version: text("version").notNull(),
  requirements: text("requirements").default("Android 5.0+"),
  languages: text("languages").default("Español, Inglés"),
  features: text("features").array(),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertApp = z.infer<typeof insertAppSchema>;
export type App = typeof apps.$inferSelect;
