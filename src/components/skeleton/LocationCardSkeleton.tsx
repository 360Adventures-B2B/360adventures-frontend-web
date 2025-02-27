import { Skeleton } from "@/components/ui/skeleton";

export default function LocationCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[5/5] sm:aspect-[5/6] rounded-2xl overflow-hidden group">
        <Skeleton className="w-full h-full rounded-2xl" />
        <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 mt-1.5 rounded" />
      </div>
    </div>
  );
}
