import { z } from "zod";

const themeOptions = z.enum([
  "clean-zen",
  "cyber-sunset",
  "cherry-blossom",
  "ocean-mist",
  "lavender-dream",
]);

export const batchFormFieldOptionInput = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  order: z.number().int().min(0),
});

const formFieldInput = z.object({
  id: z.string(),
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
  placeholder: z.string().max(100).nullable().optional(),
  maxLength: z.number().int().min(1).nullable().optional(),
  minValue: z.number().nullable().optional(),
  maxValue: z.number().nullable().optional(),
  options: z.array(batchFormFieldOptionInput).optional(),
});

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
  formFieldData: z.array(formFieldInput),
});

export const deleteFormInput = z.object({
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
export type GetSingleFormDetailsInputType = z.infer<typeof getSingleFormDetailsInput>;
export type GetFormBySlugInputType = z.infer<typeof getFormBySlugInput>;
