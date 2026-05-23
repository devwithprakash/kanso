import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { formFieldsTable } from "./form-field";
import { relations } from "drizzle-orm";

export const fieldOptionsTable = pgTable("field_options", {
  id: uuid("id").defaultRandom().primaryKey(),

  fieldId: uuid("field_id")
    .notNull()
    .references(() => formFieldsTable.id, {
      onDelete: "cascade",
    }),

  label: varchar("label", { length: 50 }).notNull(),

  value: varchar("value", { length: 100 }).notNull(),

  order: integer("order").notNull(),
});

export const fieldOptionsRelations = relations(fieldOptionsTable, ({ one }) => ({
  formField: one(formFieldsTable, {
    fields: [fieldOptionsTable.fieldId],
    references: [formFieldsTable.id],
  }),
}));
