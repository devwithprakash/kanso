import db, { desc, eq, like } from "@repo/database";
import {
  createFormFieldInput,
  CreateFormFieldInputType,
  createFormInput,
  CreateFormInputType,
} from "./model";
import { formsTable } from "../../database/models/form";
import { usersTable } from "@repo/database/models/user";
import { formFieldsTable } from "@repo/database/models/form-field";
import { throwTRPCError } from "../../trpc/server/utils/trpc-error";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

async function getUniqueSlug(title: string): Promise<string> {
  const base = generateSlug(title);

  // Fetch all existing slugs with the same base in one query
  const existing = await db
    .select({ slug: formsTable.slug })
    .from(formsTable)
    .where(like(formsTable.slug, `${base}%`));

  if (existing.length === 0) return base;

  const existingSet = new Set(existing.map((r) => r.slug));

  if (!existingSet.has(base)) return base;

  let counter = 1;
  while (existingSet.has(`${base}-${counter}`)) {
    counter++;
  }

  return `${base}-${counter}`;
}

const createForm = async (payload: CreateFormInputType, userId: string) => {
  const { title, description } = await createFormInput.parseAsync(payload);

  const dbUser = await db.select().from(usersTable).where(eq(usersTable.clerkUserId, userId));

  const user = dbUser[0];

  if (!user) {
    throw new Error("User not found");
  }

  const uniqueSlug = await getUniqueSlug(title);

  const form = await db
    .insert(formsTable)
    .values({
      title,
      slug: uniqueSlug,
      description,
      createdBy: user.id,
    })
    .returning({
      title: formsTable.title,
      description: formsTable.description,
    });

  if (!form[0] || form.length === 0) {
    throw new Error("Failed to create form");
  }

  return form[0];
};

const createFormField = async (payload: CreateFormFieldInputType) => {
  const {
    formId,
    label,
    order,
    required,
    type,
    helperText,
    maxLength,
    maxValue,
    minLength,
    minValue,
    placeholder,
  } = await createFormFieldInput.parseAsync(payload);

  const result = await db
    .insert(formFieldsTable)
    .values({
      formId,
      label,
      type,
      order,
      placeholder,
      required,
      helperText,
      minLength,
      maxLength,
      minValue,
      maxValue,
    })
    .returning();

  const insertedFormField = result[0];

  if (!insertedFormField) {
    throwTRPCError("INTERNAL_SERVER_ERROR", "Failed to create form field");
  }

  return insertedFormField
};

export { createForm, createFormField };
