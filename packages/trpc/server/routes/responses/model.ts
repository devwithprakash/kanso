import { z } from "zod";

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

const responseAnswerInput = z.object({
  fieldId: z.string(),
  value: z.string(),
});

export const createResponseInputModel = z.object({
  formId: z.string(),
  answer: z.array(responseAnswerInput),
});

const responseAnswerOutputModel = z.object({
  id: z.string(),
  responseId: z.string(),
  fieldId: z.string(),
  value: z.string(),
});

export const createResponseOutputModel = z.object({
  id: z.string(),
  formId: z.string(),
  submittedAt: z.date(),
  ipAddress: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  answers: z.array(responseAnswerOutputModel),
});

export const getFormResponseInputModel = z.object({
  formId: z.string(),
});

export const answerSchema = z.object({
  id: z.string(),
  fieldId: z.string(),
  responseId: z.string(),
  value: z.string().nullable(),
});

export const fieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: fieldTypeEnum,
});

export const responseRecordSchema = z.object({
  id: z.string(),
  submittedAt: z.date().or(z.string()),
  answers: z.array(answerSchema),
});

// The master return schema payload structure
export const getFormResponseOutputModel = z.object({
  fields: z.array(fieldSchema),
  responses: z.array(responseRecordSchema),
});

export type GetFormResponseOutput = z.infer<typeof getFormResponseOutputModel>;
