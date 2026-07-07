import { z } from "zod";

const themeOptions = z.enum(["clean-zen", "cyber-sunset", "cherry-blossom", "forest-state"]);

export const createFormInput = z.object({
  title: z.string().describe("title of the form"),
  description: z.string().describe("description of the form").nullable().optional(),
  theme: themeOptions,
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
