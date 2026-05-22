import { userService } from "../../services";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { userInputModel, userOutputModel } from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  me: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/me"),
        tags: TAGS,
      },
    })
    .output(userOutputModel)
    .mutation(async ({ ctx }) => {
      const userId = ctx.userId;

      const user = await userService.syncUser({
        clerkUserId: userId,
      });

      return user;
    }),
});
