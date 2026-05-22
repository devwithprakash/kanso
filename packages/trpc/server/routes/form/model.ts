import { z } from "zod";

export const createFormInputModel = z.object({
  title: z.string().describe("title of the form"),
  description: z.string().describe("description of the form").nullable().optional(),
});

export const createFormOutputModel = z.object({
  title: z.string().describe("title of the form"),
  description: z.string().describe("description of the form").nullable().optional(),
});

export const fieldTypeEnum = z.enum([
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

export const createFormFieldInputModel = z.object({
  formId: z.string(),

  label: z.string().min(1).max(100),

  type: fieldTypeEnum,

  order: z.number().int().min(0),

  required: z.boolean().default(false),

  placeholder: z.string().max(100).optional(),

  helperText: z.string().max(200).optional(),

  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional(),

  minValue: z.number().optional(),
  maxValue: z.number().optional(),
});

export const createFormFieldOutputModel = z.object({
  id: z.string(),

  formId: z.string().uuid(),

  label: z.string(),

  type: fieldTypeEnum,

  order: z.number(),

  required: z.boolean(),

  placeholder: z.string().nullable().optional(),

  helperText: z.string().nullable().optional(),

  minLength: z.number().nullable().optional(),

  maxLength: z.number().nullable().optional(),

  minValue: z.number().nullable().optional(),

  maxValue: z.number().nullable().optional(),

  createdAt: z.date().optional(),
  updateAt: z.date().optional(),
});
