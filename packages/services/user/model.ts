    import { z } from "zod";

    export const userInput = z.object({
    clerkUserId: z.string().describe("clerk id of the user"),
    });

    export type UserInputType = z.infer<typeof userInput>;
