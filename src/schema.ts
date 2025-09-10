import { pgTable, uuid, text, decimal, integer } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
});

export const userSelectSchema = createSelectSchema(usersTable);
export type User = z.infer<typeof userSelectSchema>;

export const authMethodsTable = pgTable("auth_methods", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(), // Proper serial primary key
  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id), // Add foreign key
  passwordHash: text("password_hash"),
  providerId: text("provider_id"),
  providerEmail: text("provider_email"),
});

export const authMethodSelectSchema = createSelectSchema(authMethodsTable);
export type AuthMethod = z.infer<typeof authMethodSelectSchema>;

export const codebasesTable = pgTable("codebases", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  fileName: text("file_name"),
  fileSize: decimal("file_size"),
  mimeType: text("mime_type").default("application/zip"),
  s3Key: text("s3_key").notNull(),
});

export const codebaseSelectSchema = createSelectSchema(codebasesTable);
export type Codebase = z.infer<typeof codebaseSelectSchema>;
