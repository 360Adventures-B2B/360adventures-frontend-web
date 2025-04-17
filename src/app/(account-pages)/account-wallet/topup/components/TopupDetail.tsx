import { ITopupRequest } from "@/interfaces/TopupRequest";
import { formatNumber } from "@/utils/currencyConverter";
import { useState } from "react";

const TopupDetail = ({ item }: { item: ITopupRequest }) => {
  return (
    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">Top-up Reference: {item.reference_id}</h2>
        <p className="text-gray-500 text-sm mt-1">Created at: {item.created_at}</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Amount:</span>
            <span className="text-gray-900">{formatNumber(item.amount)}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Point Earned:</span>
            <span className="text-gray-900">{item.point_earn}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Fee (Credit Card):</span>
            <span className="text-gray-900">{formatNumber(item.fee_credit_card)}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Payment Method:</span>
            <span className="capitalize text-gray-900">{item.payment_method.replace(/_/g, " ")}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Status:</span>
            <span
              className={
                item.status === "success"
                  ? "text-green-600 font-semibold"
                  : item.status === "pending"
                  ? "text-yellow-600 font-semibold"
                  : item.status === "reject"
                  ? "text-red-600 font-semibold"
                  : "text-gray-600"
              }
            >
              {item.status}
            </span>
          </li>
          {item.payment_method === "bank_transfer" && item.transfer_slip ? (
            <li className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Transfer Slip:</span>
                <button
                  onClick={() => window.open(item.transfer_slip, "_blank")}
                  className="bg-primary-6000 text-white text-xs sm:text-sm px-6 py-2 rounded-lg hover:bg-primary-7000 transition"
                >
                  View Transfer Slip
                </button>
              </div>
              <div className="relative">
                <img
                  src={item.transfer_slip}
                  alt="Transfer Slip"
                  className="rounded-lg border max-w-full max-h-64 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://dummyimage.com/500x500/000/fff"; // Ganti gambar jika gagal
                  }}
                />
              </div>

              {/* Menampilkan informasi bank jika ada */}
              {item.bank && (
                <div className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">Transfer To:</span>
                    </li>
                    {item.bank.bank_name && (
                      <li>
                        <span className="font-medium">Bank Name:</span> {item.bank.bank_name}
                      </li>
                    )}
                    {item.bank.account_name && (
                      <li>
                        <span className="font-medium">Account Name:</span> {item.bank.account_name}
                      </li>
                    )}
                    {item.bank.account_number && (
                      <li>
                        <span className="font-medium">Account Number:</span> {item.bank.account_number}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default TopupDetail;
