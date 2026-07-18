import { z } from "zod";

export const getFormAnalyticsInputModel = z.object({
  formId: z.string(),
});

export const getFormAnalyticsOutputModel = z.object({
  totalResponses: z.number(),
  todaysResponses: z.number(),
  lastResponseAt: z.date().nullable(),
  averageResponsesPerDay: z.number(),
});

export const getDashboardAnalyticsOutputModel = z.object({
  totalForms: z.coerce.number(),
  publicForms: z.coerce.number(),
  totalResponses: z.coerce.number(),
  completionRate: z.coerce.number(),
});

export const getFormSubmissionsOverTimeInputModel = z.object({
  formId: z.string(),
  days: z.number(),
});

export const getFormSubmissionsOverTimeOutputModel = z.array(
  z.object({
    date: z.string(),
    count: z.number(),
  }),
);
