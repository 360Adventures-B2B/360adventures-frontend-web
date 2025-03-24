import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import React, { useState } from "react";

type CreditHistoryItem = {
  date: string; // Format tanggal dalam string
  information: string; // Deskripsi informasi (misalnya Checkout, Topup, Refund, dll.)
  productName?: string; // Nama produk, bisa kosong jika tidak ada
  type: "Payment" | "Topup"; // Jenis transaksi: Payment atau Topup
  amount: number; // Jumlah uang (positif untuk topup, negatif untuk pembayaran)
};
type CreditHistoryTableProps = {
  data: CreditHistoryItem[]; // Array dari objek CreditHistoryItem
};

const CreditHistoryTable: React.FC<CreditHistoryTableProps> = ({ data }) => {
  let [options] = useState(["All", "Upcoming", "Completed", "Cancelled"]);

  const formatAmount = (amount: number) => {
    return amount < 0 ? (
      <span className="text-red-500"> -{formatNumber(Math.abs(amount))} </span>
    ) : (
      <span className="text-green-500"> +{formatNumber(amount)} </span>
    );
  };

  return (
    
    <div className="overflow-x-auto">
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
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-3 text-sm sm:text-base">{index + 1}</td>
              <td className="px-4 py-3 text-sm sm:text-base">{formatDateTime(item.date)}</td>
              <td className="px-4 py-3 text-sm sm:text-base">
                {item.information}
                {item.productName && <div className="text-xs text-gray-500">{item.productName}</div>}
              </td>
              <td className="px-4 py-3 text-sm sm:text-base">{item.type}</td>
              <td className="px-4 py-3 text-sm sm:text-base">{formatAmount(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditHistoryTable;
