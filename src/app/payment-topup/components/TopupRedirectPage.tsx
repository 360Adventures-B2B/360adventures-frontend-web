import React, { useState } from "react";
import Image from "next/image";
import SuccessPng from "@/images/success.png"; // pastikan file ini ada
import FailedPng from "@/images/failed.png"; // pastikan file ini ada
import PendingPng from "@/images/pending.png"; // gambar untuk status "pending"
import ButtonPrimary from "@/shared/ButtonPrimary";
import { Route } from "next";
import ButtonSecondary from "@/shared/ButtonSecondary";

interface TopupRedirectPageProps {
  description?: string;
  order_id?: string;
  reference_id?: string;
  date?: string;
  amount?: number | string;
  payment_method?: string;
  total_paid?: number | string;
  status?: string;
  buttonHref?: string;
  buttonText?: string;
  onRefresh?: () => void; // Function to trigger when refresh button is clicked
  isLoading?: boolean;
}

const TopupRedirectPage: React.FC<TopupRedirectPageProps> = ({
  description = "Your transaction is being processed, please wait...",
  order_id = "-",
  reference_id = "-",
  date = "-",
  amount,
  payment_method = "-",
  total_paid,
  status = "pending", // Default status is 'pending' when transaction is not successful
  buttonHref = "/account-wallet/topup",
  buttonText = "Back to wallet",
  onRefresh, // Add this prop
  isLoading,
}) => {
  const [loading, setLoading] = useState(false); // Track the loading state

  let statusImage = PendingPng; // Default to pending image
  let statusColor = "text-yellow-600"; // Default to yellow for pending status
  let statusText = "Payment is pending"; // Default text for pending

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
            <span>{date}</span>
          </div>
          {amount !== undefined && (
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">Top-up Amount:</span>
              <span>Rp {typeof amount === "number" ? amount.toLocaleString() : amount}</span>
            </div>
          )}
          {payment_method && (
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">Payment Method:</span>
              <span>{payment_method}</span>
            </div>
          )}
          {total_paid !== undefined && (
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">Total Paid:</span>
              <span>Rp {typeof total_paid === "number" ? total_paid.toLocaleString() : total_paid}</span>
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
