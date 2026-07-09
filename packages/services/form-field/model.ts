import { z } from "zod";

// ─── Shared option input (used for select / radio / checkbox options) ──────────

export const formFieldOptionInput = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  order: z.number().int().min(0),
});

// ─── Single field item in the batch sync payload ──────────────────────────────
// Note: createFormFieldInput / createFormFieldBatchInput were removed —
// the createFormFieldBatch service function is never invoked by any tRPC route.
// Form fields are created inline within formService.createForm() using a
// transaction. Only the "sync" (upsert) path is exposed via the API.

export const updateBatchFormFieldItemInput = z.object({
  id: z.string().optional(),
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
  placeholder: z.string().max(100).nullable().optional(),
  maxLength: z.number().int().min(1).nullable().optional(),
  minValue: z.number().nullable().optional(),
  maxValue: z.number().nullable().optional(),
  options: z.array(formFieldOptionInput).optional(),
});

export const updateBatchFormFieldsInput = z.array(updateBatchFormFieldItemInput);

export type UpdateBatchFormFieldInputType = z.infer<typeof updateBatchFormFieldsInput>;
