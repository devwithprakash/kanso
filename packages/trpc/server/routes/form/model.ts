import { string, z } from "zod";

const themeOptions = z.enum(["clean-zen", "cyber-sunset", "cherry-blossom", "forest-state"]);

// create form schema
export const createFormInputModel = z.object({
  title: z.string().describe("title of the form"),
  description: z.string().describe("description of the form").nullable().optional(),
  theme: themeOptions,
});

export const createFormOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  theme: z.string(),
  visibility: z.enum(["public", "private", "unlisted"]),
  createdBy: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

// update form schema
export const updateFormInputModel = z.object({
  formId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  theme: themeOptions,
  visibility: z.enum(["public", "private", "unlisted"]),
});

export const updateFormOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  theme: themeOptions,
  visibility: z.enum(["public", "private", "unlisted"]),
  createdBy: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

// delete from schema
export const deleteFormInputModel = z.object({
  formId: z.string().describe("id of the form"),
});

export const deleteFormOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  theme: themeOptions,
  visibility: z.enum(["public", "private", "unlisted"]),
  createdBy: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

// get all forms schema
export const getAllFormsOutputModel = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),

    responseCount: z.number(),

    theme: themeOptions,
    visibility: z.enum(["public", "private", "unlisted"]),

    slug: z.string(),
    createdBy: z.string(),

    createdAt: z.date(),
    updatedAt: z.date().nullable(),
  }),
);

// get form details by id schema

export const getFormByIdInputModel = z.object({
  formId: z.string().describe("id of the form"),
});

export const fieldOptionModel = z.object({
  id: z.string(),
  fieldId: z.string(),
  value: z.string(),
  label: z.string(),
  order: z.number().int(),
});

export const formFieldModel = z.object({
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

  order: z.number().int(),
  required: z.boolean(),

  helperText: z.string().nullable().optional(),
  placeholder: z.string().nullable().optional(),

  minLength: z.number().int().nullable(),
  maxLength: z.number().int().nullable(),
  minValue: z.number().nullable(),
  maxValue: z.number().nullable(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional().nullable(),

  fieldOptions: z.array(fieldOptionModel),
});

export const getFormByIdOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  theme: string(),
  visibility: z.enum(["public", "private", "unlisted"]),
  slug: z.string(),
  formFields: z.array(formFieldModel),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable().optional(),
});

// get all public forms

export const allFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  theme: z.string(),
  visibility: z.enum(["public", "private", "unlisted"]),
  slug: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// get form by slug

export const getFormBySlugInputModel = z.object({
  slug: z.string(),
});

export const getFormBySlugOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  theme: z.string(),
  visibility: z.enum(["public", "private", "unlisted"]),
  slug: z.string(),
  formFields: z.array(formFieldModel),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable().optional(),
});

// get all public forms
export const getAllPublicFormOutputModel = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),

    theme: themeOptions,
    visibility: z.enum(["public", "private", "unlisted"]),

    slug: z.string(),
    createdBy: z.string(),

    createdAt: z.date(),
    updatedAt: z.date().nullable(),
  }),
);

export const getAllPublicFormsOutputModel = z.array(allFormSchema);
