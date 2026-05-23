import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { relations } from "drizzle-orm";
import { formFieldsTable } from "./form-field";

export const formsTable = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 500 }),

  slug: varchar("slug").unique().notNull(),
  isPublished: boolean("is_published").default(false).notNull(),

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
