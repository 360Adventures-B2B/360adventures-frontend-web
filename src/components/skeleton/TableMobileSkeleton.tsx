import React from "react";
import { Skeleton } from "../ui/skeleton";

type TableMobileSkeletonProps = {
  rows: number; // Jumlah baris (card)
};

const TableMobileSkeleton: React.FC<TableMobileSkeletonProps> = ({ rows }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center space-x-4">
            <div className="w-16 h-4 bg-gray-300 rounded-md">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="w-24 h-4 bg-gray-300 rounded-md">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center space-x-4">
            <div className="w-20 h-6 bg-gray-300 rounded-md">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="w-16 h-6 bg-gray-300 rounded-md">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-16 h-4 bg-gray-300 rounded-md">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-24 h-4 bg-gray-300 rounded-md">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableMobileSkeleton;
