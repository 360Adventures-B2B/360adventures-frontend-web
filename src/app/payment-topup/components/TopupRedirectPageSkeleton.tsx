"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function TopupRedirectPageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-6 bg-gray-50">
      <div className="container max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6">
        <div className="flex justify-center">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
        <div className="text-center pt-4">
          <Skeleton className="h-10 w-40 mx-auto rounded-md" />
        </div>
      </div>
    </div>
  );
}
