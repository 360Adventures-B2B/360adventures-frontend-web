"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonPackage() {
  return (
    <div>
      <div className="h-full flex flex-col max-h-[75vh] overflow-y-auto">
        <div className="flex-grow space-y-8">
          <div className="space-y-4">
            {/* Skeleton for Title and Description */}
            <Skeleton className="w-2/3 h-6 rounded-md" />
            <Skeleton className="w-1/2 h-4 rounded-md mt-2" />
            <div className="flex items-center space-x-2">
              <Skeleton className="w-32 h-4 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>

          {/* Skeleton for Time Slots */}
          <div className="space-y-4 p-4 rounded-lg bg-gray-100">
            <Skeleton className="w-1/3 h-6 rounded-md" />
            <div className="flex flex-wrap gap-2 justify-start">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-[30%] sm:w-16 md:w-20 lg:w-20 rounded-md" />
              ))}
            </div>
          </div>

          {/* Skeleton for Quantity Section */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-100">
            <div className="flex flex-col gap-2 w-full sm:w-44">
              <Skeleton className="w-1/2 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {/* Skeleton for Person Adult */}
              <div className="flex flex-col p-4 bg-white rounded-md">
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton className="w-3/4 h-5 rounded-md" />
                    <Skeleton className="w-1/2 h-4 rounded-md mt-2" />
                  </div>
                </div>
                <div className="mt-2">
                  <Skeleton className="w-1/2 h-5 rounded-md" />
                </div>
              </div>

              {/* Skeleton for Child */}
              <div className="flex flex-col p-4 bg-white rounded-md">
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton className="w-3/4 h-5 rounded-md" />
                    <Skeleton className="w-1/2 h-4 rounded-md mt-2" />
                  </div>
                </div>
                <div className="mt-2">
                  <Skeleton className="w-1/2 h-5 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton for Footer (Total & Buttons) */}
        <div className="mt-auto bg-white p-4 rounded-lg shadow-lg sticky bottom-0 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <div className="space-y-2 sm:space-y-0 sm:text-left w-full sm:w-auto">
              <Skeleton className="w-1/3 h-6 rounded-md" />
              <div className="flex items-center space-x-2">
                <Skeleton className="w-32 h-6 rounded-md mt-3" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
              <Skeleton className="w-full sm:w-auto h-10 rounded-md" />
              <Skeleton className="w-full sm:w-auto h-10 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
