import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata: Metadata = {
  title: {
    default: "Dashboard — Kanso",
    template: "%s — Kanso",
  },
  description:
    "Manage your forms, view responses, and track analytics all in one place.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 mt-16 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}

