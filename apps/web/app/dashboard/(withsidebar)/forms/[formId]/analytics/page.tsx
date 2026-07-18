"use client";

import { useFormStats, useFormSubmissionsOverTime } from "@/hooks/analytics/use-analytics";
import { useParams } from "next/navigation";

export default function AnalyticsPage() {
  const params = useParams();
  const formId = params.formId as string;

  const { data, error, isLoading } = useFormStats(formId);
  const { data: submissionData } = useFormSubmissionsOverTime(formId, 30);

  console.log(submissionData);

  return <div></div>;
}
