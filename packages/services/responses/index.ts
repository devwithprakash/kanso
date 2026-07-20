import db, { and, eq, InferSelectModel } from "@repo/database";
import {
  getFormResponseInput,
  GetFormResponseInputType,
  submitResponseInput,
  SubmitResponseInputType,
} from "./model";
import {
  formFieldsTable,
  formResponsesTable,
  formsTable,
  responseAnswersTable,
  usersTable,
} from "@repo/database/schema";
import { throwTRPCError } from "../../trpc/server/utils/trpc-error";
import { GetFormResponseOutput } from "../../trpc/server/routes/responses/model";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ResponseAnswer = InferSelectModel<typeof responseAnswersTable>;

const createResponse = async (payload: SubmitResponseInputType) => {
  const { formId, ipAddress, answer } =
    await submitResponseInput.parseAsync(payload);

  const [form] = await db
    .select({
      title: formsTable.title,
      description: formsTable.description,
    })
    .from(formsTable)
    .where(eq(formsTable.id, formId));

  if (!form) {
    throwTRPCError("NOT_FOUND", "Form not found");
  }

  const [existingResponse] = await db
    .select()
    .from(formResponsesTable)
    .where(and(eq(formResponsesTable.formId, formId), eq(formResponsesTable.ipAddress, ipAddress)));

  if (existingResponse) {
    throwTRPCError("BAD_REQUEST", "You have already submitted this response for this form.");
  }

  const [insertedResponse] = await db
    .insert(formResponsesTable)
    .values({
      formId,
      ipAddress,
      submittedAt: new Date(),
    })
    .returning();

  if (!insertedResponse) {
    throwTRPCError("INTERNAL_SERVER_ERROR", "Failed to create response");
  }

  let responseAnswer: ResponseAnswer[] = [];

  if (answer.length > 0) {
    responseAnswer = await db.transaction(async (tx) => {
      return await tx
        .insert(responseAnswersTable)
        .values(
          answer.map((ans) => ({
            responseId: insertedResponse.id,
            fieldId: ans.fieldId,
            value: ans.value,
          })),
        )
        .returning();
    });
  }

  return { ...insertedResponse, answers: responseAnswer };
};

const getFormResponse = async (payload: GetFormResponseInputType) => {
  const { formId, userId } = await getFormResponseInput.parseAsync(payload);

  const dbUser = await db.select().from(usersTable).where(eq(usersTable.clerkUserId, userId));

  const user = dbUser[0];

  if (!user) {
    throwTRPCError("NOT_FOUND", "User not found");
  }

  const form = await db
    .select()
    .from(formsTable)
    .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, user.id)));

  if (!form) {
    throwTRPCError("NOT_FOUND", "Requested form not found");
  }

  const fields = await db
    .select({
      id: formFieldsTable.id,
      label: formFieldsTable.label,
      type: formFieldsTable.type,
    })
    .from(formFieldsTable)
    .where(eq(formFieldsTable.formId, formId))
    .orderBy(formFieldsTable.order);

  const responses = await db.query.formResponsesTable.findMany({
    where: eq(formResponsesTable.formId, formId),
    orderBy: (responses, { desc }) => [desc(responses.submittedAt)],
    columns: {
      id: true,
      submittedAt: true,
    },
    with: {
      answers: true,
    },
  });

  const result: GetFormResponseOutput = {
    fields,
    responses,
  };

  return result;
};

export { createResponse, getFormResponse };
