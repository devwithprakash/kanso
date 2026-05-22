import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { formFieldsTable } from "./form-field";

export const fieldOptionsTable = pgTable("field_options", {
  id: uuid("id").defaultRandom().primaryKey(),

  fieldId: uuid("field_id")
    .notNull()
    .references(() => formFieldsTable.id),

  label: varchar("label", { length: 50 }).notNull(),

  value: varchar("value", { length: 100 }).notNull(),

  order: integer("order").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
