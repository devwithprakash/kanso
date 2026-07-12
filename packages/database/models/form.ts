import { boolean, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { relations } from "drizzle-orm";
import { formFieldsTable } from "./form-field";

export const formThemeEnum = pgEnum("form_theme", ["clean-zen", "cyber-sunset", "cherry-blossom", "forest-slate"]);
export const formVisibilityEnum = pgEnum("visibility", ["public", "unlisted", "private"]);

export const formsTable = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 500 }),

  theme: formThemeEnum("theme").default("clean-zen").notNull(),
  visibility: formVisibilityEnum("visibility").default("private").notNull(),

  slug: varchar("slug").unique().notNull(),

  createdBy: uuid("created_by")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const formsRelations = relations(formsTable, ({ many }) => ({
  formFields: many(formFieldsTable),
}));
