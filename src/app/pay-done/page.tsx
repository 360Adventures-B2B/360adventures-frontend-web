"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useGetBookingSummaryQuery } from "@/lib/services/bookingService";
import BookingSummary from "@/components/BookingSummary";
import BookingSummarySkeleton from "@/components/skeleton/BookingSummarySkeleton";
import InformationSkeleton from "./components/InformationSkeleton";

export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const { data: booking, isLoading, isError, isFetching } = useGetBookingSummaryQuery(orderId);
  console.log("🚀 ~ booking:", booking);

  const bookingData = booking?.data;
  const loading = isLoading || isFetching;

  if (!loading && (!bookingData || Object.keys(bookingData.bookings).length === 0)) {
    redirect("/");
  }

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8">
      <div className="flex items-center">
  {bookingData?.payment_status === "paid" ? (
    <>
      <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-primary-700 rounded-full">
        <i className="las la-check-circle text-white text-3xl"></i>
      </div>
      <div className="ml-3">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          Thank You. Your booking was submitted successfully!
        </h3>
        <p className="text-gray-700">
          Booking details have been sent to:{" "}
          <span className="font-medium">{bookingData?.email}</span>
        </p>
      </div>
    </>
  ) : (
    <>
      <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-red-600 rounded-full">
        <i className="las la-times-circle text-white text-3xl"></i>
      </div>
      <div className="ml-3">
        <h3 className="text-lg font-bold text-red-700 leading-snug">
          Payment Failed
        </h3>
        <p className="text-gray-600">
          We could not process your booking. Please try again or contact support.
        </p>
      </div>
    </>
  )}
</div>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-6 p-4 max-w-3xl">
          <h3 className="text-3xl font-semibold">Your Information</h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">Name</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData?.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">Email</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData?.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">Country</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData?.country}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">City</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData?.city}</span>
            </div>

            <div className="flex flex-col sm:col-span-2 lg:col-span-2">
              <span className="text-neutral-600 dark:text-neutral-400">Special Requirement</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {bookingData?.special_requirement ?? '-'}
              </span>
            </div>
          </div>
        </div>
        <div>
          <ButtonPrimary href="/account-booking">Booking History</ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return <BookingSummary bookingData={bookingData.bookings} title="Your Booking" />;
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 lg:flex lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 mb-5">{loading ? <InformationSkeleton /> : renderMain()}</div>
        <div className="flex-grow">{loading ? <BookingSummarySkeleton /> : renderSidebar()}</div>
      </main>
    </div>
  );
};

export default PayPage;
