import { CreditHistory } from "@/interfaces/CreditHistory";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDateTime } from "@/utils/dateHelper";
import React, { useState } from "react";

type CreditHistoryTableProps = {
  data: CreditHistory[];
};

const CreditHistoryTable: React.FC<CreditHistoryTableProps> = ({ data }) => {
  const formatAmount = (amount: number) => {
    return amount < 0 ? (
      <span className="text-red-500"> -{formatNumber(Math.abs(amount))} </span>
    ) : (
      <span className="text-green-500"> +{formatNumber(amount)} </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Mobile view */}
      <div className="block sm:hidden">
        {(data?.length ?? 0) === 0 ? (
          <div className="text-center text-gray-500 py-6">No Data Available</div>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-6 transition-all hover:shadow-xl"
            >
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Information:</span>
                <span className="text-xs sm:text-sm text-gray-600">{item.notes || "-"}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Date:</span>
                <span className="text-xs sm:text-sm text-gray-600">{formatDateTime(item.created_at)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Type:</span>
                <span className="text-xs sm:text-sm text-gray-600">
                  {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : "-"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Amount:</span>
                <span className="text-xs sm:text-sm text-gray-600">{formatAmount(item.amount)}</span>
              </div>
              {item.package && item.package.product && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm sm:text-base font-semibold text-gray-700">Product:</span>
                  <div className="flex flex-col text-right">
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">{item.package.product.name}</span>
                    <span className="text-xs sm:text-sm text-gray-500">{item.package.name}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm sm:text-base">No</th>
              <th className="px-4 py-3 text-left text-sm sm:text-base min-w-[150px]">Date</th>
              <th className="px-4 py-3 text-left text-sm sm:text-base">Information</th>
              <th className="px-4 py-3 text-left text-sm sm:text-base">Type</th>
              <th className="px-4 py-3 text-left text-sm sm:text-base">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(data?.length ?? 0) === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-xs sm:text-sm text-gray-500">
                  No Data Available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-sm sm:text-base">{index + 1}</td>
                  <td className="px-4 py-3 text-sm sm:text-base">
                    {item.created_at ? formatDateTime(item.created_at) : "-"}
                  </td>
                  <td className="px-4 py-3 text-sm sm:text-base">
                    <div>{item.notes ?? "-"}</div>
                    {item.package?.product?.name && (
                      <div className="text-xs text-gray-700">{item.package.product.name}</div>
                    )}
                    {item.package?.name && <div className="text-xs text-gray-500">{item.package.name}</div>}
                  </td>

                  <td className="px-4 py-3 text-sm sm:text-base">
                    {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : "-"}
                  </td>
                  <td className="px-4 py-3 text-sm sm:text-base">
                    {item.amount !== undefined ? formatAmount(item.amount) : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreditHistoryTable;
