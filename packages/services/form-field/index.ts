import { formFieldsTable } from "@repo/database/models/form-field";
import { createFormFieldInput, CreateFormFieldInputType, formFieldOptionInput } from "./model";
import db from "@repo/database";
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


        if(!insertedOptions[0]){
          throwTRPCError("INTERNAL_SERVER_ERROR", "Failed to store field options")
        }

      options = insertedOptions;
    }

    return {
      ...field,
      options,
    } as typeof field & { options: typeof options };
  });
};

export {
    createFormField
}
