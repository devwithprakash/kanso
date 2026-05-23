import { formFieldService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { formFieldInputModel, formFieldOutputModel } from "../form-field/model";

const TAGS = ["Form Fields"];
const getPath = generatePath("/form-field");

export const formFieldRouter = router({
  create: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create"),
        tags: TAGS,
      },
    })
    .input(formFieldInputModel)
    .output(formFieldOutputModel)
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
        options,
      } = input;

      const insertedFormField = await formFieldService.createFormField({
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
        options,
      });

      return insertedFormField;
    }),
});
