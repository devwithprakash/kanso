import { analyticsService } from "../../services";
import { protectedProcedure, router } from "../../trpc";
import {
  getDashboardAnalyticsOutputModel,
  getFormAnalyticsInputModel,
  getFormAnalyticsOutputModel,
  getFormSubmissionsOverTimeInputModel,
  getFormSubmissionsOverTimeOutputModel,
} from "./model";

const TAGS = ["Analytics"];

export const analyticsRouter = router({
  getFormStats: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/analytics/forms",
        tags: TAGS,
        summary: "Get analytics for all forms",
      },
    })
    .input(getFormAnalyticsInputModel)
    .output(getFormAnalyticsOutputModel)
    .query(async ({ input, ctx }) => {
      const { userId } = ctx;
      const { formId } = input;

      return await analyticsService.getFormStats(formId, userId);
    }),

  getFormSubmissionsOverTime: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/analytics/submission",
        tags: TAGS,
        summary: "Get form submission analytics over time",
      },
    })
    .input(getFormSubmissionsOverTimeInputModel)
    .output(getFormSubmissionsOverTimeOutputModel)
    .query(async ({ input, ctx }) => {
      const { userId } = ctx;
      const { formId, days } = input;

      return await analyticsService.getFormSubmissionsOverTime(formId, userId, days);
    }),

  getDashboardStats: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/analytics/dashboard",
        tags: TAGS,
        summary: "Get dashboard analytics overview",
      },
    })
    .output(getDashboardAnalyticsOutputModel)
    .query(async ({ ctx }) => {
      const { userId } = ctx;

      return await analyticsService.getDashboardStats(userId);
    }),
});
