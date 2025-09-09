"use client";
import React, { useState, useEffect } from "react";
import TopupRedirectPage from "../components/TopupRedirectPage";
import { useGetDetailTopupRequestQuery } from "@/lib/services/topupService";
import { useRouter, useSearchParams } from "next/navigation";
import TopupRedirectPageSkeleton from "../components/TopupRedirectPageSkeleton";

const PaymentTopupSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentLinkId = searchParams.get("orderId");
  console.log("🚀 ~ PaymentTopupSuccessPage ~ paymentLinkId:", paymentLinkId);

  const [shouldRetry, setShouldRetry] = useState(true);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetDetailTopupRequestQuery(paymentLinkId, {
      skip: !paymentLinkId || !shouldRetry,
    });

  const handleRefresh = () => {
    setShouldRetry(true); // Start polling again
    refetch(); // Trigger the refetch
  };
  const isLoadingOrFetching = isLoading || isFetching;

  if (isLoadingOrFetching) {
    return <TopupRedirectPageSkeleton />;
  }

  if (isError || !data || data.data.payment_method !== "payment_gateway") {
    router.push("/"); // Redirect to home if there's an error or invalid payment method
    return <TopupRedirectPageSkeleton />;
  }
  const topupData = data?.data;

  if (
    topupData.status !== "pending" &&
    topupData.status !== "success" &&
    topupData.status !== "reject"
  ) {
    router.push("/");
    return <TopupRedirectPageSkeleton />; // Halaman tidak menampilkan apa-apa jika status tidak valid
  }

  return (
    <TopupRedirectPage
      status={
        topupData?.status === "success"
          ? "success"
          : topupData?.status === "pending"
          ? "pending"
          : "failed"
      }
      order_id={topupData?.ulid || ""}
      reference_id={topupData?.reference_id}
      date={topupData?.created_at}
      amount={topupData?.amount}
      fee_credit_card={topupData?.fee_credit_card}
      payment_method={topupData?.payment_method}
      payment_type={topupData?.payment_type}
      total_paid={(topupData?.amount || 0) + (topupData?.fee_credit_card || 0)}
      description={
        topupData?.status === "success"
          ? "Your top-up was successful!"
          : topupData?.status === "pending"
          ? "Your payment is pending. Please wait..."
          : "Oops! Something went wrong with your top-up. Please try again."
      }
      {...(topupData?.status === "pending" && { onRefresh: handleRefresh })}
      // status loading/spinner
      isLoading={isLoadingOrFetching}
    />
  );
};

export default PaymentTopupSuccessPage;
