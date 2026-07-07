import { z } from "zod";

const themeOptions = z.enum(["clean-zen", "cyber-sunset", "cherry-blossom", "forest-state"]);

const batchFormFieldOptionInput = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  order: z.number().int().min(0),
});

const optionField = z.object({
  label: z.string().min(1).max(100),
  type: z.enum(["select", "radio", "checkbox"]),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
  options: z.array(batchFormFieldOptionInput).min(1),
});

const normalField = z.object({
  label: z.string().min(1).max(100),
  type: z.enum([
    "text",
    "textarea",
    "email",
    "number",
    "phone",
    "date",
    "file",
  ]),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
  placeholder: z.string().max(100).nullable().optional(),
  maxLength: z.number().int().min(1).nullable().optional(),
  minValue: z.number().nullable().optional(),
  maxValue: z.number().nullable().optional(),
});

const formFieldInput = z.discriminatedUnion("type", [
  optionField,
  normalField,
]);

export const createFormInput = z.object({
  title: z.string().describe("title of the form"),
  description: z.string().describe("description of the form").nullable().optional(),
  formFieldData: z.array(formFieldInput),
});

export const updateFormInput = z.object({
  formId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  theme: themeOptions,
  visibility: z.enum(["public", "private", "unlisted"]),
});

export const deleteFormInput = z.object({
  formId: z.string().describe("id of the form"),
});

export const getFormByIdInput = z.object({
  formId: z.string().describe("id of the form"),
});

export const getSingleFormDetailsInput = z.object({
  formId: z.string().describe("id of the form"),
});

export const getFormBySlugInput = z.object({
  slug: z.string().describe("slug of the form"),
});

export type CreateFormInputType = z.infer<typeof createFormInput>;
export type UpdateFormInputType = z.infer<typeof updateFormInput>;
export type DeleteFormInputType = z.infer<typeof deleteFormInput>;
export type GetFormByIdInputType = z.infer<typeof getFormByIdInput>;
export type GetSingleFormDetailsInputType = z.infer<typeof getSingleFormDetailsInput>;
export type GetFormBySlugInputType = z.infer<typeof getFormBySlugInput>;
