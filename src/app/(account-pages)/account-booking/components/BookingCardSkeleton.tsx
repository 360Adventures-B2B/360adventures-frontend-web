import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function BookingCardSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-start p-4 border rounded-lg shadow-sm relative overflow-hidden bg-white mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-full h-80 sm:h-96 lg:w-48 lg:h-48">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="ml-0 lg:ml-52 mt-80 sm:mt-96 lg:mt-0 flex-1 p-0 text-left">
        <Skeleton className="w-80 h-4 mb-2" />
        <Skeleton className="w-72 h-5 mb-2" />
        <div className="mt-3 flex items-center">
          <Skeleton className="w-40 h-5" />
        </div>
        <div className="mt-2 inline-block text-primary-500 underline cursor-pointer text-sm">
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <div className="ml-auto lg:absolute lg:right-4 lg:top-4 text-left lg:text-right lg:w-auto mt-4 lg:mt-0">
        <Skeleton className="w-36 h-4 mb-2 ml-auto" />
        <Skeleton className="w-24 h-4 mb-4 ml-auto" />
        <div className="mt-8 flex flex-col lg:flex-row items-center gap-2 w-full">
          <Skeleton className="w-full lg:w-32 h-10" />
          <Skeleton className="w-full lg:w-32 h-10" />
        </div>
      </div>
    </div>
  );
}
