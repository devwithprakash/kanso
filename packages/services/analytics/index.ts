import db, { eq, sql, count, and, gte } from "@repo/database";
import { formsTable, formResponsesTable, usersTable } from "@repo/database/schema";
import { throwTRPCError } from "../../trpc/server/utils/trpc-error";

interface DailySubmissionCount {
  date: string;
  count: number;
}

const MAX_RANGE_DAYS = 365;

function fillMissingDays(
  rows: { date: string; count: number }[],
  days: number,
  startDate: Date,
): DailySubmissionCount[] {
  const countByDate = new Map(rows.map((r) => [r.date, r.count]));
  const result: DailySubmissionCount[] = [];

  const cursor = new Date(startDate);

  for (let i = 0; i < days; i++) {
    const key = toDateKey(cursor);
    result.push({ date: key, count: countByDate.get(key) ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const getFormStats = async (formId: string, userId: string) => {
  const [form] = await db
    .select({
      id: formsTable.id,
      createdAt: formsTable.createdAt,
    })
    .from(formsTable)
    .innerJoin(usersTable, eq(formsTable.createdBy, usersTable.id))
    .where(and(eq(formsTable.id, formId), eq(usersTable.clerkUserId, userId)));

  if (!form) {
    throwTRPCError("NOT_FOUND", "Requested form not found");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [stats] = await db
    .select({
      totalResponses: count(),
      todaysResponses: count(
        sql`CASE WHEN ${formResponsesTable.submittedAt} >= ${today} THEN 1 END`,
      ),
      lastResponseAt: sql<Date | null>`MAX(${formResponsesTable.submittedAt})`,
    })
    .from(formResponsesTable)
    .where(eq(formResponsesTable.formId, formId));

  const totalResponses = stats?.totalResponses ?? 0;
  const todaysResponses = stats?.todaysResponses ?? 0;
  const lastResponseAt = stats?.lastResponseAt ?? null;

  const msSinceCreated = today.getTime() - new Date(form.createdAt).setHours(0, 0, 0, 0);
  const daysSinceCreated = Math.max(1, Math.floor(msSinceCreated / (1000 * 60 * 60 * 24)) + 1);

  const averageResponsesPerDay = Math.round((totalResponses / daysSinceCreated) * 100) / 100;

  const result = {
    totalResponses,
    todaysResponses,
    lastResponseAt: lastResponseAt ? new Date(lastResponseAt) : null,
    averageResponsesPerDay,
  };

  return result;
};

const getFormSubmissionsOverTime = async (formId: string, userId: string, days: number = 30) => {
  const [form] = await db
    .select({})
    .from(formsTable)
    .innerJoin(usersTable, eq(formsTable.createdBy, usersTable.id))
    .where(and(eq(formsTable.id, formId), eq(usersTable.clerkUserId, userId)));

  if (!form) {
    throwTRPCError("NOT_FOUND", "Requested form not found");
  }

  const safeDays = Math.min(Math.max(1, Math.floor(days)), MAX_RANGE_DAYS);

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (safeDays - 1));

  const rows = await db
    .select({
      date: sql<string>`DATE(${formResponsesTable.submittedAt})`,
      count: count(),
    })
    .from(formResponsesTable)
    .where(
      and(eq(formResponsesTable.formId, formId), gte(formResponsesTable.submittedAt, startDate)),
    )
    .groupBy(sql`DATE(${formResponsesTable.submittedAt})`)
    .orderBy(sql`DATE(${formResponsesTable.submittedAt})`);

  const result = fillMissingDays(rows, safeDays, startDate);

  return result;
};

const getDashboardStats = async (userId: string) => {
  const [user] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.clerkUserId, userId));

  if (!user) throwTRPCError("NOT_FOUND", "User not found");

  const analyticsResult = await db
    .select({
      totalForms: count(formsTable.id),
      publicForms: sql<number>`COUNT(*) FILTER (WHERE ${formsTable.visibility} = 'public')`,
      totalResponses: count(formResponsesTable.id),

      completionRate: sql<number>`COALESCE(
        ROUND(
          (COUNT(DISTINCT CASE WHEN ${formResponsesTable.id} IS NOT NULL THEN ${formResponsesTable.id} END)::numeric / 
           NULLIF(COUNT(DISTINCT ${formsTable.id}), 0)) * 100, 
        0), 0)`,
    })
    .from(formsTable)
    .leftJoin(formResponsesTable, eq(formsTable.id, formResponsesTable.formId))
    .where(eq(formsTable.createdBy, user.id));

  return (
    analyticsResult[0] || {
      totalForms: 0,
      publicForms: 0,
      totalResponses: 0,
      completionRate: 0,
    }
  );
};

export { getFormStats, getDashboardStats, getFormSubmissionsOverTime };
