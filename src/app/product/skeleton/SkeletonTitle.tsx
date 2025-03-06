import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTitle() {
  return (
    <div className="listingSection__wrap !space-y-6">
      <Skeleton className="w-full h-8" />

      <div className="flex items-center space-x-4">
        <Skeleton className="w-6 h-6" />
        <Skeleton className="ml-1 w-32 h-4" />
      </div>

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    </div>
  );
}
