import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-6">
      <Skeleton className="mb-6 h-6 w-44" />

      <div className="h-[300px]">
        <div className="flex h-full items-end justify-between gap-3">
          <div className="flex h-full w-8 flex-col justify-between py-2">
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-6" />
          </div>

          <div className="flex-1">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-10" />
          ))}
        </div>
      </div>
    </div>
  );
}
