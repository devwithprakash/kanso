import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export const fieldTypeEnum = pgEnum("field_type", [
  "text",
  "textarea",
  "email",
  "number",
  "phone",
  "select",
  "radio",
  "checkbox",
  "date",
  "file",
]);

export const formFieldsTable = pgTable("form_fields", {
  id: uuid("id").defaultRandom().primaryKey(),

  formId: uuid("form_id")
    .notNull()
    .references(() => formsTable.id),

  label: varchar("label", { length: 100 }).notNull(),

  placeholder: varchar("placeholder", { length: 100 }),

  helperText: text("helper_text"),

  type: fieldTypeEnum("type").notNull(),

  required: boolean("required").default(false).notNull(),

  order: integer("order").notNull(),

  minLength: integer("min_length"),
  maxLength: integer("max_length"),

  minValue: integer("min_value"),
  maxValue: integer("max_value"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
