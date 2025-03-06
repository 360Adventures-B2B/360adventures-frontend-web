import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonHeader() {
  return (
    <header className="rounded-md sm:rounded-xl">
      <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
        <div className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer">
          <Skeleton className="object-cover rounded-md sm:rounded-xl" style={{ height: "100%", width: "100%" }} />
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="relative rounded-md sm:rounded-xl overflow-hidden">
          <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
            <Skeleton className="object-cover rounded-md sm:rounded-xl" style={{ height: "100%", width: "100%" }} />
          </div>
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
        <div className="relative rounded-md sm:rounded-xl overflow-hidden">
          <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
            <Skeleton className="object-cover rounded-md sm:rounded-xl" style={{ height: "100%", width: "100%" }} />
          </div>
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
        <div className="relative rounded-md sm:rounded-xl overflow-hidden">
          <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
            <Skeleton className="object-cover rounded-md sm:rounded-xl" style={{ height: "100%", width: "100%" }} />
          </div>
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
        <div className="relative rounded-md sm:rounded-xl overflow-hidden hidden sm:block">
          <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
            <Skeleton className="object-cover rounded-md sm:rounded-xl" style={{ height: "100%", width: "100%" }} />
          </div>
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
        <button className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10">
          <Skeleton className="w-5 h-5" />
          <span className="ml-2 text-neutral-800 text-sm font-medium">
            <Skeleton style={{ width:"100%" }} />
          </span>
        </button>
      </div>
    </header>
  );
}
