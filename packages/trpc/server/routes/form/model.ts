import { z } from "zod";

// common schemas
const themeEnum = z.enum([
  "clean-zen",
  "cyber-sunset",
  "cherry-blossom",
  "ocean-mist",
  "lavender-dream",
]);

const visibilityEnum = z.enum(["public", "private", "unlisted"]);

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

// create form schema STARTS
const formFieldOptionsInput = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  order: z.number().int().min(0),
});

const formFieldInput = z.object({
  id: z.string(),
  label: z.string().min(1).max(100),
  type: fieldTypeEnum,
  required: z.boolean().default(false),
  order: z.number().int().min(0),
  placeholder: z.string().max(100).nullable(),
  maxLength: z.number().int().min(1).nullable(),
  minValue: z.number().nullable(),
  maxValue: z.number().nullable(),
  fieldOptions: z.array(formFieldOptionsInput).optional(),
});

export const createFormInputModel = z.object({
  title: z.string().describe("title of the form"),
  description: z.string().describe("description of the form").nullable().optional(),
  formFieldData: z.array(formFieldInput),
});

const formFieldOptionOutput = z.object({
  label: z.string(),
  value: z.string(),
  order: z.number(),
});

const formFieldOutput = z.object({
  id: z.string(),
  formId: z.string(),
  label: z.string(),
  type: fieldTypeEnum,
  order: z.number(),
  required: z.boolean(),
  placeholder: z.string().nullable(),
  maxLength: z.number().nullable(),
  minValue: z.number().nullable(),
  maxValue: z.number().nullable(),
  fieldOptions: z.array(formFieldOptionOutput),
});

export const createFormOutputModel = z.object({
  id: z.string(),
  slug: z.string(),
  theme: themeEnum,
  visibility: z.enum(["public", "private", "unlisted"]),
  fieldData: z.array(formFieldOutput),
});

// update form schema STARTS
export const updateFormInputModel = z.object({
  formId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  theme: themeEnum,
  visibility: visibilityEnum,
  formFieldData: z.array(formFieldInput),
});

export const updateFormOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  theme: z.string(),
  visibility: z.string(),
  formFieldData: z.array(formFieldOutput),
});

// delete form schema STARTS
export const deleteFormInputModel = z.object({
  formId: z.string().describe("id of the form"),
});
export const deleteFormOutputModel = z.object({
  title: z.string().describe("Title of the form"),
});

// fetch all forms schema STARTS
export const getAllFormsOutputModel = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),

    responseCount: z.number(),

    theme: themeEnum,
    visibility: z.enum(["public", "private", "unlisted"]),

    slug: z.string(),
    createdBy: z.string(),

    createdAt: z.date(),
    updatedAt: z.date().nullable(),
  }),
);

// fetch form by ID schema STARTS
export const getFormByIdInputModel = z.object({
  formId: z.string().describe("id of the form"),
});

export const fieldOptionModel = z.object({
  value: z.string(),
  label: z.string(),
  order: z.number().int(),
});

export const formFieldModel = z.object({
  id: z.string(),
  formId: z.string(),

  label: z.string(),
  type: fieldTypeEnum,

  order: z.number().int(),
  required: z.boolean(),

  placeholder: z.string().nullable(),
  maxLength: z.number().int().nullable(),
  minValue: z.number().nullable(),
  maxValue: z.number().nullable(),

  fieldOptions: z.array(fieldOptionModel),
});

export const getFormByIdOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),

  theme: themeEnum,

  visibility: visibilityEnum,
  slug: z.string(),

  formFields: z.array(
    formFieldModel.extend({
      fieldOptions: z.array(fieldOptionModel),
    }),
  ),
});

// fetch form by SLUG schema STARTS
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
});

// fetch all public forms schema STARTS
export const getAllPublicFormOutputModel = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    slug: z.string(),
    visibility: visibilityEnum,
    createdAt: z.date(),
    totalResponses: z.number(),
  }),
);
