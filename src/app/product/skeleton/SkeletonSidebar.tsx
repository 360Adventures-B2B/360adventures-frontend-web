import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonSidebar() {
  return (
    <div className="listingSectionSidebar__wrap shadow-xl p-4">
      <div className="flex flex-col space-y-2">
        <Skeleton className="w-20 h-4" />
        <div className="flex items-center">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="ml-2 w-16 h-6" />
        </div>
        <Skeleton className="w-full h-10 mt-5" />
      </div>
    </div>
  );
}
