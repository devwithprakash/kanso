import { Skeleton } from "@/components/ui/skeleton";

export function FormCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border p-5 flex flex-col h-full animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      <div className="flex-1 mb-6 space-y-3">
        <Skeleton className="h-7 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
