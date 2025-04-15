import { Skeleton } from "@/components/ui/skeleton";

export default function PackageCardSkeleton() {
  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row gap-6">
    {/* Left side (title and description) */}
    <div className="flex-1 flex flex-col gap-2 sm:border-r sm:border-gray-300 sm:pr-6">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-5/6 mt-1" />
    </div>

    {/* Right side (pricing and button) */}
    <div className="flex-col justify-between items-start sm:items-end mt-3 sm:mt-0">
      <div className="pricing">
        <Skeleton className="h-4 w-12" />
        <div className="flex items-center gap-1 mt-1">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      <div className="w-full">
        {/* Updated button skeleton width to accommodate longer text */}
        <Skeleton className="h-10 w-full sm:w-44 mt-3" />
      </div>
    </div>
  </div>
  );
}
