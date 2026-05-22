import { TypeOf, z } from "zod";

export const createFormInput = z.object({
  title: z.string().describe("title of the form"),
  description: z.string().describe("description of the form").nullable().optional(),
});

const fieldTypeEnum = z.enum([
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

export const createFormFieldInput = z.object({
  formId: z.string(),

  label: z.string().min(1).max(100),

  type: fieldTypeEnum,

  required: z.boolean().optional().default(false),

  order: z.number().int().min(0),

  placeholder: z.string().max(100).optional(),

  helperText: z.string().max(200).optional(),

  minLength: z.number().int().min(0).optional(),
  maxLength: z.number().int().min(1).optional(),

  minValue: z.number().optional(),
  maxValue: z.number().optional(),
});

export type CreateFormInputType = z.infer<typeof createFormInput>;
export type CreateFormFieldInputType = z.infer<typeof createFormFieldInput>
