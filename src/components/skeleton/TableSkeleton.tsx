import React from "react";
import { Skeleton } from "../ui/skeleton";

type TableSkeletonProps = {
  columns: number; // Jumlah kolom
  rows: number; // Jumlah baris
};

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th key={idx} className="px-4 py-3 text-left text-sm sm:text-base">
                <Skeleton className="w-24 h-4 bg-gray-300" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} className="border-b border-gray-200">
              {Array.from({ length: columns }).map((_, idx) => (
                <td key={idx} className="px-4 py-3 text-sm sm:text-base">
                  <Skeleton className="w-24 h-6 bg-gray-200" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
