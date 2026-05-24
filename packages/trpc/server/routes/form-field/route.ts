import { formFieldService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  deleteFormFieldInputModel,
  deleteFormFieldOutputModel,
  formFieldInputModel,
  formFieldOutputModel,
  updateFormFieldInputModel,
  updateFormFieldOutputModel,
} from "../form-field/model";

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

  update: publicProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: getPath("/update"),
        tags: TAGS,
      },
    })
    .input(updateFormFieldInputModel)
    .output(updateFormFieldOutputModel)
    .mutation(async ({ input }) => {
      const data = input;

      const result = await formFieldService.updateFormField(data);

      return result;
    }),

  delete: publicProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: getPath("/delete/{formFieldId}"),
      },
    })
    .input(deleteFormFieldInputModel)
    .output(deleteFormFieldOutputModel)
    .mutation(async ({ input }) => {
      const { formFieldId } = input;

      const deletedFormField = await formFieldService.deleteFormField(formFieldId);

      return deletedFormField;
    }),
});
