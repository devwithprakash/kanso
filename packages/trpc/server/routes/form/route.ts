import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  createFormFieldInputModel,
  createFormFieldOutputModel,
  createFormInputModel,
  createFormOutputModel,
} from "./model";
import { formService } from "../../services";

const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({
  createForm: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create"),
        tags: TAGS,
      },
    })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.userId;
      const { title, description } = input;

      const form = await formService.createForm({ title, description }, userId);

      return form;
    }),

  createFormField: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create-form-field"),
        tags: TAGS,
      },
    })
    .input(createFormFieldInputModel)
    .output(createFormFieldOutputModel)
    .mutation(async ({ input }) => {
      const {
        formId,
        order,
        label,
        required,
        type,
        helperText,
        maxLength,
        maxValue,
        minLength,
        minValue,
        placeholder,
      } = input;

      const insertedFormField = await formService.createFormField({
        formId,
        order,
        label,
        required,
        type,
        helperText,
        maxLength,
        maxValue,
        minLength,
        minValue,
        placeholder,
      });

      return insertedFormField;
    }),
});
