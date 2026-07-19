"use client";

import dynamic from "next/dynamic";
import {
  Users,
  Calendar,
  Loader2,
  AlertCircle,
  FileText,
  CalendarDays,
  Clock3,
  BarChart3,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormSubmissionsOverTime, useFormStats } from "@/hooks/analytics/use-analytics";
import { useParams } from "next/navigation";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import StatCard from "@/components/dashboard/stat-card";
import { useState } from "react";
import { StatsCardsSkeleton } from "@/components/dashboard/stats-cards-skeleton";
import { ChartSkeleton } from "@/components/dashboard/chart-skeleton";

export default function AnalyticsPage() {
  const params = useParams();
  const formId = params.formId as string;

  const [timeRange, setTimeRange] = useState(7);
  const { data: submissionData, error, isLoading } = useFormSubmissionsOverTime(formId, timeRange);
  const { data: statsData, isLoading: statsLoading } = useFormStats(formId);

  const chartData =
    submissionData?.map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
    })) ?? [];

  const stats = [
    {
      label: "Total Responses",
      value: statsData?.totalResponses ?? 0,
      icon: FileText,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Responses Today",
      value: statsData?.todaysResponses ?? 0,
      icon: CalendarDays,
      color: "bg-chart-2/20 text-chart-2",
    },
    {
      label: "Last Submission",
      value: statsData?.lastResponseAt
        ? `${new Date(statsData.lastResponseAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })} • ${new Date(statsData.lastResponseAt).toLocaleDateString("en-GB")}`
        : "Never",
      icon: Clock3,
      color: "bg-chart-5/20 text-chart-5",
    },
    {
      label: "Avg. Responses / Day",
      value: statsData?.averageResponsesPerDay ?? 0,
      icon: BarChart3,
      color: "bg-chart-4/50 text-foreground",
    },
  ];
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Workspace Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Cross-form historical insights and telemetry maps.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={timeRange.toString()}
            onValueChange={(value) => setTimeRange(Number(value))}
          >
            <SelectTrigger className="w-44 gap-2 border-border/50 bg-card">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {statsLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            return <StatCard stat={stat} index={index} />;
          })}
        </div>
      )}

      {isLoading ? <ChartSkeleton /> : <AnalyticsCharts responsesOverTime={chartData} />}
    </div>
  );
}
