import { Skeleton } from "@/components/ui/skeleton"; // Assuming you are using shadcn/ui

export function DashboardFormSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
      <div className="flex items-center gap-4 min-w-0">
        <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}
