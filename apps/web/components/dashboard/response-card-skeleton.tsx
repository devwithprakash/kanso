import { Skeleton } from "@/components/ui/skeleton";

export default function ResponseCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-muted/40 px-3 py-1">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>

        <Skeleton className="h-3 w-10" />
      </div>

      {/* Preview fields */}
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className={`h-4 ${item === 1 ? "w-40" : item === 2 ? "w-56" : "w-32"}`} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <Skeleton className="mt-4 h-3 w-24" />
    </div>
  );
}
