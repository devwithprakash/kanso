import db, { and, count, eq, like, notInArray } from "@repo/database";
import {
  createFormInput,
  CreateFormInputType,
  deleteFormInput,
  DeleteFormInputType,
  getFormBySlugInput,
  GetFormBySlugInputType,
  getSingleFormDetailsInput,
  GetSingleFormDetailsInputType,
  updateFormInput,
  UpdateFormInputType,
} from "./model";
import { throwTRPCError } from "../../trpc/server/utils/trpc-error";

import { formsTable } from "@repo/database/models/form";
import { usersTable } from "@repo/database/models/user";
import { fieldOptionsTable, formFieldsTable, formResponsesTable } from "@repo/database/schema";
import { id } from "zod/v4/locales";

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
  const { title, description, formFieldData } = await createFormInput.parseAsync(payload);

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
      id: formsTable.id,
      slug: formsTable.slug,
      theme: formsTable.theme,
      visibility: formsTable.visibility,
    });

  const createdForm = form[0];

  if (!createdForm) {
    throw new Error("Failed to create form");
  }

  return db.transaction(async (tx) => {
    const results = [];

    for (const fieldData of formFieldData) {
      const insertedFields = await tx
        .insert(formFieldsTable)
        .values({
          formId: createdForm.id,
          label: fieldData.label,
          type: fieldData.type,
          order: fieldData.order,
          required: fieldData.required,
          placeholder: fieldData.placeholder,
          maxLength: fieldData.maxLength,
          minValue: fieldData.minValue,
          maxValue: fieldData.maxValue,
        })
        .returning({
          id: formFieldsTable.id,
          label: formFieldsTable.label,
          type: formFieldsTable.type,
        });

      const field = insertedFields[0];

      if (!field) {
        throwTRPCError("INTERNAL_SERVER_ERROR", `Field creation failed for: ${fieldData.label}`);
      }

      const optionFieldTypes = ["select", "radio", "checkbox"];

      let insertedOptionResult: any[] = [];

      if (optionFieldTypes.includes(field.type) && fieldData.options?.length) {
        const optionsToInsert = fieldData.options.map((opt) => ({
          label: opt.label,
          order: opt.order,
          value: opt.value,
          fieldId: field.id,
        }));

        const insertedOptions = await tx
          .insert(fieldOptionsTable)
          .values(optionsToInsert)
          .returning();

        if (!insertedOptions.length) {
          throwTRPCError(
            "INTERNAL_SERVER_ERROR",
            `Failed to store field options for: ${fieldData.label}`,
          );
        }

        insertedOptionResult = insertedOptions;
      }

      results.push({ ...field, options: insertedOptionResult });
    }

    return {
      ...createdForm,
      fieldData: results,
    };
  });
};

const updateForm = async (payload: UpdateFormInputType, userId: string) => {
  const { formId, title, description, theme, visibility, formFieldData } =
    await updateFormInput.parseAsync(payload);

  console.log("Form field data aa gya ji", formFieldData);

  const [dbUser] = await db.select().from(usersTable).where(eq(usersTable.clerkUserId, userId));

  if (!dbUser) {
    throwTRPCError("NOT_FOUND", "User not found");
  }

  const result = await db
    .update(formsTable)
    .set({
      title,
      description,
      theme,
      visibility,
      updatedAt: new Date(),
    })
    .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, dbUser.id)))
    .returning({
      id: formsTable.id,
      title: formsTable.title,
    });

  const updatedForm = result[0];

  if (!updatedForm) {
    throwTRPCError("NOT_FOUND", "Form not found or you do not have permission to update it");
  }

  const optionFieldTypes = ["select", "radio", "checkbox"];

  return db.transaction(async (tx) => {
    const incomingDbIds = formFieldData
      .map((f) => f.id)
      .filter((id): id is string => !!id && !id.startsWith("field-"));

    console.log("New fields ", incomingDbIds);

    if (incomingDbIds.length > 0) {
      await tx
        .delete(formFieldsTable)
        .where(
          and(eq(formFieldsTable.formId, formId), notInArray(formFieldsTable.id, incomingDbIds)),
        );
    } else {
      await tx.delete(formFieldsTable).where(eq(formFieldsTable.formId, formId));
    }

    const processedFields = [];

    for (const fieldData of formFieldData) {
      const isNewField = !fieldData.id || fieldData.id.startsWith("field-");
      let finalFieldRecord;

      const fieldValues = {
        formId: formId,
        label: fieldData.label,
        type: fieldData.type,
        required: fieldData.required ?? false,
        order: fieldData.order,
        placeholder: fieldData.placeholder ?? null,
        maxLength: fieldData.maxLength ?? null,
        minValue: fieldData.minValue ?? null,
        maxValue: fieldData.maxValue ?? null,
      };

      if (isNewField) {
        const [inserted] = await tx.insert(formFieldsTable).values(fieldValues).returning();
        finalFieldRecord = inserted;
      } else {
        const fieldId = fieldData.id;

        if (!fieldId) {
          throwTRPCError("BAD_REQUEST", "Field id is required");
        }

        const targetId = fieldId;

        const [updated] = await tx
          .update(formFieldsTable)
          .set(fieldValues)
          .where(eq(formFieldsTable.id, targetId))
          .returning();

        finalFieldRecord = updated;
      }

      if (!finalFieldRecord) {
        throwTRPCError("INTERNAL_SERVER_ERROR", `Failed to save field: ${fieldData.label}`);
      }

      const optionFieldTypes = ["select", "radio", "checkbox"];

      if (optionFieldTypes.includes(fieldData.type)) {
        const newFieldOptions = fieldData.options?.map((o) => {});
      }

      await tx.delete(fieldOptionsTable).where(eq(fieldOptionsTable.fieldId, finalFieldRecord.id));

      let synchronizedOptions: (typeof fieldOptionsTable.$inferSelect)[] = [];
      if (optionFieldTypes.includes(finalFieldRecord.type) && fieldData.options?.length) {
        synchronizedOptions = await tx
          .insert(fieldOptionsTable)
          .values(
            fieldData.options.map((opt, index) => ({
              fieldId: finalFieldRecord!.id,
              label: opt.label,
              value: opt.value,
              order: opt.order ?? index,
            })),
          )
          .returning();
      }

      processedFields.push({
        ...finalFieldRecord,
        options: synchronizedOptions,
      });
    }

    return updatedForm;
  });
};

const deleteForm = async (payload: DeleteFormInputType, userId: string) => {
  const { formId } = await deleteFormInput.parseAsync(payload);

  const [dbUser] = await db.select().from(usersTable).where(eq(usersTable.clerkUserId, userId));

  if (!dbUser) {
    throwTRPCError("NOT_FOUND", "User not found");
  }

  const result = await db
    .delete(formsTable)
    .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, dbUser.id)))
    .returning();

  const deletedForm = result[0];

  if (!deletedForm) {
    throwTRPCError("NOT_FOUND", "Form not found");
  }

  return deletedForm;
};

const getAllForms = async (userId: string) => {
  const dbUser = await db.select().from(usersTable).where(eq(usersTable.clerkUserId, userId));
  const user = dbUser[0];

  if (!user) {
    throwTRPCError("NOT_FOUND", "User not found");
  }

  const result = await db
    .select({
      form: formsTable,
      responseCount: count(formResponsesTable.id),
    })
    .from(formsTable)
    .leftJoin(formResponsesTable, eq(formsTable.id, formResponsesTable.formId))
    .where(eq(formsTable.createdBy, user.id))
    .groupBy(formsTable.id);

  return result.map(({ form, responseCount }) => ({
    ...form,
    responseCount,
  }));
};

const getFormById = async (payload: GetSingleFormDetailsInputType, userId: string) => {
  const { formId } = await getSingleFormDetailsInput.parseAsync(payload);

  const dbUser = await db.select().from(usersTable).where(eq(usersTable.clerkUserId, userId));

  const user = dbUser[0];

  if (!user) {
    throwTRPCError("NOT_FOUND", "User not found");
  }

  const form = await db.query.formsTable.findFirst({
    where: and(eq(formsTable.id, formId), eq(formsTable.createdBy, user.id)),
    with: {
      formFields: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });

  if (!form) {
    throwTRPCError("NOT_FOUND", "Form not found");
  }

  return form;
};

const getAllPublicForms = async () => {
  const result = await db
    .select()
    .from(formsTable)
    .where(eq(formsTable.visibility, "public" as any));

  return result;
};

const getFormBySlug = async (payload: GetFormBySlugInputType, ipAddress: string) => {
  const { slug } = await getFormBySlugInput.parseAsync(payload);

  const form = await db.query.formsTable.findFirst({
    where: eq(formsTable.slug, slug),
    with: {
      formFields: {
        with: { fieldOptions: true },
      },
    },
  });

  if (!form) {
    throwTRPCError("NOT_FOUND", "The requested form could not be located.");
  }

  const [existingResponse] = await db
    .select()
    .from(formResponsesTable)
    .where(
      and(eq(formResponsesTable.formId, form.id), eq(formResponsesTable.ipAddress, ipAddress)),
    );

  if (existingResponse) {
    throwTRPCError("BAD_REQUEST", "You have already submitted this form.");
  }

  if (form.visibility === "private") {
    throwTRPCError("FORBIDDEN", "This form is not currently accepting responses");
  }

  return form;
};

export {
  createForm,
  updateForm,
  deleteForm,
  getAllForms,
  getFormById,
  getAllPublicForms,
  getFormBySlug,
};
