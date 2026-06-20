import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-xl p-5 border border-border/50"
        >
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>

          <Skeleton className="h-8 w-20" />

          <Skeleton className="h-4 w-24 mt-2" />
        </div>
      ))}
    </div>
  );
}