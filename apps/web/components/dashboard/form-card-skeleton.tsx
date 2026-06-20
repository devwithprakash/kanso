import { Skeleton } from "@/components/ui/skeleton";

export const FormCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        <Skeleton className="h-6 w-3/4 mb-3" />

        <div className="flex items-center gap-2.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
