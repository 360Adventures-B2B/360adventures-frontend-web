"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import mastercardPng from "@/images/mastercard.svg";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useGetBookingQuery } from "@/lib/services/bookingService";
import { formatNumber } from "@/utils/currencyConverter";

import FormCheckout from "./component/FormCheckout";
import { formatDate, formatDateString } from "@/utils/dateHelper";
import BookingSummary from "@/components/BookingSummary";
import BookingSummarySkeleton from "@/components/skeleton/BookingSummarySkeleton";
export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({ className = "" }) => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { data: booking, isLoading, isFetching } = useGetBookingQuery(orderId);

  const loading = isLoading || isFetching;
  const bookingData = booking?.data;

  if (!loading && (!bookingData || Object.keys(bookingData).length === 0)) {
    redirect("/");
  }

  const renderSidebar = () => {
    return <BookingSummary bookingData={bookingData} title="Your Item" loading={loading} />;
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 lg:flex lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
          <FormCheckout />
        </div>
        <div className="flex-grow">{loading ? <BookingSummarySkeleton /> : renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
