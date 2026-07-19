"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  TrendingUp,
  Eye,
  ArrowRight,
  MoreHorizontal,
  Trash2,
  Pencil,
  BarChart3,
} from "lucide-react";
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
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { DashboardFormSkeleton } from "@/components/dashboard/dashboard-forms-skeleton";
import { toast } from "sonner";

export default function DashboardPage() {
  const { data: recentForms, isLoading: formsLoading } = useGetAllForms();

  const { deleteMutation } = useDeleteForm();
  const { data: analytics, isLoading } = useDashboardStats();

  const handleDeleteForm = async (formId: string) => {
    await deleteMutation.mutateAsync({ formId });
    toast.success("Form deleted successfully")
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
        {hasForms && (
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h2 className="font-serif text-lg text-foreground">Recent Forms</h2>
            <Link
              href="/dashboard/forms"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {formsLoading ? (
          Array.from({ length: 6 }).map((_, index) => <DashboardFormSkeleton key={index} />)
        ) : hasForms ? (
          <div className="divide-y divide-border/50">
            {recentForms?.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-all group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex flex-col gap-2">
                    <Link
                      href={`/dashboard/forms/${form.id}`}
                      className="text-sm font-semibold font-serif text-foreground hover:text-primary truncate block"
                    >
                      {form.title}
                    </Link>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{form.responseCount}</span>
                      <Users className="w-3 h-3" />

                      <span>{new Date(form.createdAt).toLocaleDateString("en-GB")}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 font-bold uppercase tracking-wider rounded-full border ${
                      form.visibility === "public"
                        ? "bg-primary/5 border-primary/10 text-primary"
                        : "bg-muted/50 border-transparent text-muted-foreground"
                    }`}
                  >
                    {form.visibility}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer hover:bg-secondary"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/forms/${form.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/forms/${form.id}/analytics`}>
                          <BarChart3 className="mr-2 h-4 w-4" /> Analytics
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteForm(form.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
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
