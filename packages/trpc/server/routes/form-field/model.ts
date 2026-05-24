import { z } from "zod";

// form field and options schema
export const formFieldOptionInputModel = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  order: z.number().int().min(0),
});

export const formFieldInputModel = z.object({
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

  order: z.number().int().min(0),

  required: z.boolean().default(false),

  placeholder: z.string().max(100).optional(),
  helperText: z.string().max(200).optional(),

  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional(),

  minValue: z.number().optional(),
  maxValue: z.number().optional(),

  options: z.array(formFieldOptionInputModel).optional(),
});

export const formFieldOutputModel = z.object({
  id: z.string(),
  formId: z.string(),
  label: z.string(),
  type: z.string(),
  order: z.number(),
  required: z.boolean(),

  helperText: z.string().nullable(),
  placeholder: z.string().nullable(),

  minLength: z.number().nullable(),
  maxLength: z.number().nullable(),
  minValue: z.number().nullable(),
  maxValue: z.number().nullable(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  options: z.array(
    z.object({
      id: z.string(),
      fieldId: z.string(),
      label: z.string(),
      value: z.string(),
      order: z.number(),
    }),
  ),
});

// form field update schema

export const updateFormFieldInputModel = z.object({
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

  options: z.array(formFieldOptionInputModel).optional(),
});

export const updateFormFieldOptionOutputModel = z.object({
  id: z.string(),
  fieldId: z.string(),
  label: z.string(),
  value: z.string(),
  order: z.number(),
});

export const updateFormFieldOutputModel = z.object({
  id: z.string(),
  formId: z.string(),

  label: z.string(),
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

  required: z.boolean(),

  order: z.number(),

  placeholder: z.string().nullable().optional(),
  helperText: z.string().nullable().optional(),

  minLength: z.number().nullable().optional(),
  maxLength: z.number().nullable().optional(),
  minValue: z.number().nullable().optional(),
  maxValue: z.number().nullable().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  options: z.array(updateFormFieldOptionOutputModel),
});

// form field delete schema

export const deleteFormFieldInputModel = z.object({
  formFieldId: z.string().describe("id of the form"),
});

export const deleteFormFieldOutputModel = z.object({
  id: z.string(),
  formId: z.string(),

  label: z.string(),
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

  required: z.boolean(),

  order: z.number(),

  placeholder: z.string().nullable().optional(),
  helperText: z.string().nullable().optional(),

  minLength: z.number().nullable().optional(),
  maxLength: z.number().nullable().optional(),
  minValue: z.number().nullable().optional(),
  maxValue: z.number().nullable().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
