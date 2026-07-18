"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Users, TrendingUp, Eye, Plus, ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteForm, useGetAllForms } from "@/hooks/form/use-forms";
import { useDashboardStats } from "@/hooks/analytics/use-analytics";
import { StatsCardsSkeleton } from "@/components/dashboard/stats-cards-skeleton";
import StatCard from "@/components/dashboard/stat-card";
import { NoForms } from "@/components/dashboard/no-forms";

export default function DashboardPage() {
  const { data: recentForms } = useGetAllForms();

  const { deleteMutation } = useDeleteForm();
  const { data: analytics, isLoading } = useDashboardStats();

  const handleDeleteForm = async (formId: string) => {
    await deleteMutation.mutateAsync({ formId });
  };

  const hasForms = recentForms && recentForms?.length > 0;

  const stats = [
    {
      label: "Total Forms",
      value: analytics?.totalForms ?? 0,
      icon: FileText,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Total Responses",
      value: analytics?.totalResponses,
      icon: Users,
      color: "bg-chart-2/20 text-chart-2",
    },
    {
      label: "Completion Rate",
      value: analytics?.completionRate,
      icon: TrendingUp,
      color: "bg-chart-5/20 text-chart-5",
    },
    {
      label: "Public Forms",
      value: analytics?.publicForms,
      icon: Eye,
      color: "bg-chart-4/50 text-foreground",
    },
  ];

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s an overview of your forms.
          </p>
        </div>
      </div>

      {isLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {stats.map((stat, index) => (
            <StatCard stat={stat} index={index} />
          ))}
        </motion.div>
      )}

      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <h2 className="font-serif text-lg text-foreground">Recent Forms</h2>
          {hasForms && (
            <Link
              href="/dashboard/forms"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {hasForms ? (
          <div className="divide-y divide-border/50">
            {recentForms?.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/forms/${form.id}`}
                      className="text-sm font-medium text-foreground hover:text-primary truncate block"
                    >
                      {form.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {form.responseCount} responses · Updated {form.updatedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      form.visibility === "public"
                        ? "bg-primary/10 text-primary"
                        : form.visibility === "private"
                          ? "bg-muted text-muted-foreground"
                          : "bg-chart-4/50 text-foreground"
                    }`}
                  >
                    {form.visibility}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/forms/${form.id}/builder`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/forms/${form.id}/analytics`}>Analytics</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/forms/${form.id}/edit`}>Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteForm(form.id)}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoForms />
        )}
      </div>
    </div>
  );
}
