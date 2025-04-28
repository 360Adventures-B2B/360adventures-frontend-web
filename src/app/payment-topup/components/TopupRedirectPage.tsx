import React, { useState } from "react";
import Image from "next/image";
import SuccessPng from "@/images/success.png";
import FailedPng from "@/images/failed.png";
import PendingPng from "@/images/pending.png";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { Route } from "next";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDateTime } from "@/utils/dateHelper";

interface TopupRedirectPageProps {
  description?: string;
  order_id?: string;
  reference_id?: string;
  date?: string;
  amount?: number;
  payment_method?: string;
  payment_type?: string;
  total_paid?: number;
  status?: string;
  buttonHref?: string;
  buttonText?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const TopupRedirectPage: React.FC<TopupRedirectPageProps> = ({
  description = "Your transaction is being processed, please wait...",
  order_id = "-",
  reference_id = "-",
  date = "-",
  amount,
  payment_method = "-",
  payment_type = "-",
  total_paid,
  status = "pending", // Default status is 'pending' when transaction is not successful
  buttonHref = "/account-wallet/topup",
  buttonText = "Back to wallet",
  onRefresh, // Add this prop
  isLoading,
}) => {
  let statusImage = PendingPng;
  let statusColor = "text-yellow-600";
  let statusText = "Payment is pending";

  // Adjust based on actual status
  if (status === "success") {
    statusImage = SuccessPng;
    statusColor = "text-green-600";
    statusText = "Your top-up was successful!";
  } else if (status === "failed") {
    statusImage = FailedPng;
    statusColor = "text-red-600";
    statusText = "Your top-up failed.";
  }

  return (
    <div className="nc-TopupRedirectPage min-h-screen flex items-center justify-center py-16 px-6 bg-gray-50">
      <div className="container max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <header className="text-center space-y-6">
          <Image src={statusImage} alt="Transaction Status" width={100} height={100} className="mx-auto mb-4" />
          <h1 className={`text-3xl font-bold ${statusColor}`}>{statusText}</h1>
          <p className="text-lg text-gray-700">{description}</p>
        </header>

        {/* Always show transaction details */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-semibold">Order ID:</span>
            <span>{order_id}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-semibold">Reference ID:</span>
            <span>{reference_id}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-semibold">Date:</span>
            <span>{formatDateTime(date)}</span>
          </div>
          {amount !== undefined && (
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">Top-up Amount:</span>
              <span>{formatNumber(amount)}</span>
            </div>
          )}
          {payment_method && (
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">Payment Method:</span>
              <span>
                {payment_method === "payment_gateway" && "Payment Gateway"}
                {payment_method === "bank_transfer" && "Bank Transfer"}
                {payment_method === "qr_code" && "QR Code"}
                {!["payment_gateway", "bank_transfer", "qr_code"].includes(payment_method) && payment_method}
              </span>
            </div>
          )}

          {payment_type && (
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">Payment Type:</span>
              <span>{payment_type}</span>
            </div>
          )}

          {total_paid !== undefined && (
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">Total Paid:</span>
              <span>{formatNumber(total_paid)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-semibold">Status:</span>
            <span className={`font-semibold ${statusColor}`}>
              {status === "success" ? "Success" : status === "failed" ? "Failed" : "Pending"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <ButtonPrimary href={buttonHref as Route}>{buttonText}</ButtonPrimary>
        </div>

        {/* Refresh Button for "pending" status */}
        {status === "pending" && onRefresh && (
          <div className="mt-6 text-center">
            <ButtonSecondary loading={isLoading} onClick={onRefresh} className="px-4 py-2">
              Refresh Status
            </ButtonSecondary>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopupRedirectPage;
