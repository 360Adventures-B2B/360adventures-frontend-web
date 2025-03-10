"use client";

import React, { FC, Fragment, useState } from "react";
import mastercardPng from "@/images/mastercard.svg";

import { useSearchParams } from "next/navigation";
import { useGetBookingQuery } from "@/lib/services/bookingService";
import { formatNumber } from "@/utils/currencyConverter";

import FormCheckout from "./component/FormCheckout";
import { formatDate, formatDateString } from "@/utils/dateHelper";
export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({ className = "" }) => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const { data: booking, isLoading } = useGetBookingQuery(orderId);
  const bookingData = booking?.data;

  if (isLoading) {
    return "loading";
  }

  const grandTotal = bookingData.reduce((total: any, item: any) => {
    const itemTotal = item.person_types.reduce(
      (subtotal: number, person: any) => subtotal + person.guest * person.price,
      0
    );
    return total + itemTotal;
  }, 0);

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8 mt-3 md:mt-0">
        <h2 className="text-2xl font-semibold">Your Item</h2>

        {bookingData?.map((item: any) => {
          const itemTotal = item.person_types.reduce(
            (subtotal: any, person: any) => subtotal + person.guest * person.price,
            0
          );

          return (
            <div
              key={item.id}
              className="cart-item mb-5 pb-5 flex items-start overflow-hidden border-b border-[#e9e9e9]"
            >
              <a href="#" className="cart-item-image flex-shrink-0 w-[85px] h-[85px]">
                <img
                  alt={item.package.product.name}
                  className="w-full h-full rounded-md object-cover object-top"
                  src={item.package.product.product_galleries[0]}
                />
              </a>
              <div className="cart-item-details flex-1 ml-4">
                <a href="#" className="cart-item-title block text-lg font-normal">
                  {item.package.product.name}
                </a>
                <p className="pkgName text-sm text-[#444] mt-1">{item.package.name}</p>
                <p className="startDate text-sm text-[#444] mt-1">
                  <i className="las la-calendar-alt"></i> {formatDate(item.start_date)}
                </p>
                <p className="timeSlot text-sm text-[#444] mt-1">
                  <i className="las la-clock"></i> {item.time_slot}
                </p>

                <div className="priceDetails text-sm text-[#444] mt-2 space-y-1">
                  {item.person_types
                    .filter((person: any) => person.guest > 0) // Filter guest > 0
                    .map((person: any, index: any) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {person.guest} {person.name} ({person.desc}) x {person.price}
                        </span>
                        <strong>{formatNumber(person.guest * person.price)}</strong>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between border-t border-[#e9e9e9] mt-2 pt-2 text-sm font-bold">
                  <span>Total</span>
                  <span>{formatNumber(itemTotal)}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="grand-total flex justify-between text-lg font-bold">
          <span>Grand Total</span>
          <span>{formatNumber(grandTotal)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 lg:flex lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
          <FormCheckout />
        </div>
        <div className="flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
