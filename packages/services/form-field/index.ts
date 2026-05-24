import { formFieldsTable } from "@repo/database/models/form-field";
import {
  createFormFieldInput,
  CreateFormFieldInputType,
  formFieldOptionInput,
  updateFormFieldInput,
  UpdateFormFieldInputType,
} from "./model";
import db, { eq } from "@repo/database";
import { throwTRPCError } from "../../trpc/server/utils/trpc-error";
import { fieldOptionsTable } from "@repo/database/models/field-options";

const createFormField = async (payload: CreateFormFieldInputType) => {
  const data = await createFormFieldInput.parseAsync(payload);

  return await db.transaction(async (tx) => {
    // create form field
    const inserted = await tx
      .insert(formFieldsTable)
      .values({
        formId: data.formId,
        label: data.label,
        type: data.type,
        order: data.order,
        required: data.required,
        helperText: data.helperText,
        placeholder: data.placeholder,
        minLength: data.minLength,
        maxLength: data.maxLength,
        minValue: data.minValue,
        maxValue: data.maxValue,
      })
      .returning();

    const field = inserted[0];

    if (!field) {
      throwTRPCError("INTERNAL_SERVER_ERROR", "Field creation failed");
    }

    const optionsFieldTypes = ["select", "radio", "checkbox"];

    let options: any[] = [];

    if (optionsFieldTypes.includes(data.type) && data.options?.length) {
      const parsedOptions = data.options.map((opt, index) =>
        // zod validation of field options
        formFieldOptionInput.parse({
          label: opt.label,
          value: opt.value,
          order: opt.order ?? index,
        }),
      );

      const optionsToInsert = parsedOptions.map((opt) => ({
        ...opt,
        fieldId: field.id,
      }));

      // insert field options in db
      const insertedOptions = await tx
        .insert(fieldOptionsTable)
        .values(optionsToInsert)
        .returning();

      if (!insertedOptions[0]) {
        throwTRPCError("INTERNAL_SERVER_ERROR", "Failed to store field options");
      }

      options = insertedOptions;
    }

    return {
      ...field,
      options,
    } as typeof field & { options: typeof options };
  });
};

const updateFormField = async (payload: UpdateFormFieldInputType) => {
  const data = await updateFormFieldInput.parseAsync(payload);

  const formFieldId = data.formFieldId;

  return await db.transaction(async (tx) => {
    // updating form field
    const [updatedField] = await tx
      .update(formFieldsTable)
      .set({
        label: data.label ?? undefined,
        type: data.type ?? undefined,
        required: data.required ?? undefined,
        order: data.order ?? undefined,
        placeholder: data.placeholder,
        helperText: data.helperText,
        minLength: data.minLength,
        maxLength: data.maxLength,
        minValue: data.minValue,
        maxValue: data.maxValue,
      })
      .where(eq(formFieldsTable.id, formFieldId))
      .returning();

    if (!updatedField) {
      throwTRPCError("NOT_FOUND", "Field not found or unauthorized");
    }

    let options: (typeof fieldOptionsTable.$inferSelect)[] = [];

    // updating options if provided
    if (data.options?.length) {
      await tx.delete(fieldOptionsTable).where(eq(fieldOptionsTable.fieldId, formFieldId));

      await tx.insert(fieldOptionsTable).values(
        data.options.map((opt, index) => ({
          fieldId: formFieldId,
          label: opt.label ?? "",
          value: opt.value ?? "",
          order: opt.order ?? index,
        })),
      );
    }

    // getting options as a single source of truth
    options = await tx
      .select()
      .from(fieldOptionsTable)
      .where(eq(fieldOptionsTable.fieldId, formFieldId))
      .orderBy(fieldOptionsTable.order);

    return {
      ...updatedField,
      options,
    };
  });
};

const deleteFormField = async (formFieldId: string) => {
  const result = await db
    .delete(formFieldsTable)
    .where(eq(formFieldsTable.id, formFieldId))
    .returning();

  const deletedFormField = result[0];

  if (!deletedFormField) {
    throwTRPCError("NOT_FOUND", "Form field not found");
  }

  return deletedFormField;
};

export { createFormField, updateFormField, deleteFormField };
