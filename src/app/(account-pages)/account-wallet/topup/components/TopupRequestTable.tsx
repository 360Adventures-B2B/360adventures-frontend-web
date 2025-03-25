import { ITopupRequest } from "@/interfaces/TopupRequest";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import React, { useState } from "react";

type TopupRequestTableProps = {
  data: ITopupRequest[];
};

const TopupRequestTable: React.FC<TopupRequestTableProps> = ({ data }) => {
  const formatAmount = (amount: number) => {
    const formattedAmount = Math.abs(amount).toLocaleString("en-US");

    return amount < 0 ? (
      <span className="text-red-500">-{formattedAmount}</span>
    ) : (
      <span className="text-green-500">+{formattedAmount}</span>
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      success: "bg-green-100 text-green-800",
      reject: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center justify-center h-8 w-24 text-sm font-medium rounded-full ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const PaymentMethodCell = ({ paymentMethod }: { paymentMethod: string }) => {
    const paymentLabels: Record<string, string> = {
      payment_gateway: "Payment Gateway",
      bank_transfer: "Bank Transfer",
      qr_code: "QR Code",
    };

    return <td className="px-4 py-3 text-sm sm:text-base">{paymentLabels[paymentMethod] || paymentMethod}</td>;
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-sm sm:text-base">No</th>
            <th className="px-4 py-3 text-left text-sm sm:text-base min-w-[150px]">Date</th>
            <th className="px-4 py-3 text-left text-sm sm:text-base">Reference ID</th>
            <th className="px-4 py-3 text-left text-sm sm:text-base">Status</th>
            <th className="px-4 py-3 text-left text-sm sm:text-base">Amount</th>
            <th className="px-4 py-3 text-left text-sm sm:text-base">Point Earn</th>
            <th className="px-4 py-3 text-left text-sm sm:text-base">Payment Method</th>
            <th className="px-4 py-3 text-left text-sm sm:text-base">Detail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-3 text-sm sm:text-base">{index + 1}</td>
              <td className="px-4 py-3 text-sm sm:text-base">{formatDateTime(item.created_at)}</td>
              <td className="px-4 py-3 text-sm sm:text-base">{item.reference_id}</td>
              <td className="px-4 py-3 text-sm sm:text-base">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-4 py-3 text-sm sm:text-base">{formatNumber(item.amount)}</td>
              <td className="px-4 py-3 text-sm sm:text-base">{formatAmount(2000)}</td>
              <PaymentMethodCell paymentMethod={item.payment_method} />
              <td className="px-4 py-3 text-sm sm:text-base">
                <button
                  onClick={() => handleDetail(item)}
                  className="bg-primary-6000 text-white text-sm px-3 py-1 rounded-lg hover:bg-primary-7000 transition"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopupRequestTable;
