import { z } from "zod";

export const formFieldOptionInput = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  order: z.number().int().min(0),
});

export const createFormFieldInput = z.object({
  formId: z.string(),
  label: z.string().min(1).max(100),

  type: z.enum([
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
  ]),

  required: z.boolean().optional().default(false),
  order: z.number().int().min(0),

  placeholder: z.string().max(100).optional(),
  helperText: z.string().max(200).optional(),

  minLength: z.number().int().min(0).optional(),
  maxLength: z.number().int().min(1).optional(),

  minValue: z.number().optional(),
  maxValue: z.number().optional(),

  options: z.array(formFieldOptionInput).optional(),
});

export const updateFormFieldOptionInput = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  order: z.number().int().min(0)
});

export const updateFormFieldInput = z.object({
  formFieldId: z.string(),
  label: z.string().min(1).max(100).optional(),

  type: z
    .enum([
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
    ])
    .optional(),

  required: z.boolean().optional(),

  order: z.number().int().min(0).optional(),

  placeholder: z.string().max(100).optional(),

  helperText: z.string().max(200).optional(),

  minLength: z.number().int().min(0).optional(),
  maxLength: z.number().int().min(1).optional(),

  minValue: z.number().optional(),
  maxValue: z.number().optional(),

  options: z.array(updateFormFieldOptionInput).optional(),
});

export type CreateFormFieldInputType = z.infer<typeof createFormFieldInput>;
export type UpdateFormFieldInputType = z.infer<typeof updateFormFieldInput>;
