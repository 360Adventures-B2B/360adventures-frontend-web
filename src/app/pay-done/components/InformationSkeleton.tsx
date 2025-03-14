import { Skeleton } from "@/components/ui/skeleton";

export default function InformationSkeleton() {
  return (
    <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8">
      {/* Header Section */}
      <div className="flex items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="ml-3 space-y-2">
          <Skeleton className="h-6 w-80" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>

      <div className="border-b border-neutral-200 dark:border-neutral-700" />

      {/* Information Section */}
      <div className="space-y-6 p-4 max-w-3xl">
        <Skeleton className="h-8 w-48" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-48" />
            </div>
          ))}
        </div>
      </div>

      {/* Button Section */}
      <div>
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>
  );
}
