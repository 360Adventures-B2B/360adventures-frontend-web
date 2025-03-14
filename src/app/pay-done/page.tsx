"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useGetBookingQuery } from "@/lib/services/bookingService";
import BookingSummary from "@/components/BookingSummary";
import { BookingProvider } from "@/context/BookingContext";
import BookingSummarySkeleton from "@/components/skeleton/BookingSummarySkeleton";
import InformationSkeleton from "./components/InformationSkeleton";

export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const router = useRouter();
  const { data: booking, isLoading, isError, isFetching } = useGetBookingQuery(orderId);

  const bookingData = booking?.data;
  const loading = isLoading || isFetching;

  if (!loading && (!bookingData || Object.keys(bookingData).length === 0)) {
    redirect("/");
  }

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8">
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-primary-700 rounded-full">
            <i className="las la-check-circle text-white text-3xl"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-bold text-gray-900 leading-snug">
              Thank You. Your booking was submitted successfully!
            </h3>
            <p className="text-gray-700">
              Booking details have been sent to: <span className="font-medium">{bookingData[0]?.email}</span>
            </p>
          </div>
        </div>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-6 p-4 max-w-3xl">
          <h3 className="text-3xl font-semibold">Your Information</h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">Name</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData[0]?.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">Email</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData[0]?.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">Country</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData[0]?.country}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-neutral-600 dark:text-neutral-400">City</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{bookingData[0]?.city}</span>
            </div>

            <div className="flex flex-col sm:col-span-2 lg:col-span-2">
              <span className="text-neutral-600 dark:text-neutral-400">Special Requirement</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {bookingData[0]?.special_requirement}
              </span>
            </div>
          </div>
        </div>
        <div>
          <ButtonPrimary href="/">Booking History</ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return <BookingSummary bookingData={bookingData} title="Your Booking" />;
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 lg:flex lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{loading ? <InformationSkeleton /> : renderMain()}</div>
        <div className="flex-grow">{loading ? <BookingSummarySkeleton /> : renderSidebar()}</div>
      </main>
    </div>
  );
};

export default PayPage;
