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
import { relations } from "drizzle-orm";
import { fieldOptionsTable } from "./field-options";

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
    .references(() => formsTable.id, {
      onDelete: "cascade",
    }),

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

export const formFieldsRelations = relations(formFieldsTable, ({ one, many }) => ({
  form: one(formsTable, {
    fields: [formFieldsTable.formId],
    references: [formsTable.id],
  }),

  fieldOptions: many(fieldOptionsTable),
}));
