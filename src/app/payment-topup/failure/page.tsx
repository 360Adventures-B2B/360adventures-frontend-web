"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useGetDetailTopupRequestQuery } from "@/lib/services/topupService";
import TopupRedirectPageSkeleton from "../components/TopupRedirectPageSkeleton";
import TopupRedirectPage from "../components/TopupRedirectPage";

const PaymentTopupFailedPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentLinkId = searchParams.get("paymentLinkId");

  const { data, isLoading, isFetching, isError } = useGetDetailTopupRequestQuery(paymentLinkId, {
    skip: !paymentLinkId,
  });

  const isLoadingOrFetching = isLoading || isFetching;

  if (isLoadingOrFetching) {
    return <TopupRedirectPageSkeleton />;
  }

  if (isError || !data || data.data.payment_method !== "payment_gateway") {
    router.push("/"); 
    return <TopupRedirectPageSkeleton />;
  }
  const topupData = data?.data;

  if (topupData.status !== "pending" && topupData.status !== "reject") {
    router.push("/");
    return <TopupRedirectPageSkeleton />;
  }

  return (
    <TopupRedirectPage
      status="failed"
      order_id={topupData?.ulid || ""}
      reference_id={topupData?.reference_id}
      date={topupData?.created_at}
      amount={topupData?.amount}
      payment_method={topupData?.payment_method}
      total_paid={(topupData?.amount || 0) + (topupData?.fee_credit_card || 0)}
      description="Oops! Something went wrong with your top-up. Please try again."
    />
  );
};

export default PaymentTopupFailedPage;
