import { z } from "zod";

export const userInputModel = z.object({
  clerkUserId: z.string().describe("clerk id of the user"),
});

export const userOutputModel = z.object({
  email: z.email(),
  fullName: z.string().nullable(),
  imageUrl: z.string().nullable().optional(),
});
