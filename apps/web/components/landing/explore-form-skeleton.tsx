import { Skeleton } from "../ui/skeleton";

export function ExploreFormCardSkeleton() {
  return (
    <div className="flex flex-col bg-card rounded-2xl border border-border p-5 h-full animate-pulse">
      {/* Top Section */}
      <div className="flex-1">
        <div className="flex justify-between items-start gap-4 mb-3">
          {/* Title Placeholder */}
          <Skeleton className="h-6 w-3/4" />
          {/* Badge Placeholder */}
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Description Placeholder */}
        <div className="space-y-2 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          {/* Date & Response Placeholders */}
          <Skeleton className="h-4 w-20" />
          <span className="text-border">•</span>
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Button Placeholder */}
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}
