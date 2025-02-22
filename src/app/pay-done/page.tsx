"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
  const cartItems = [
    {
      id: 1,
      title: "Eiffel Tower Tour",
      pkgName: "VIP Access + Sunset View",
      startDate: "27 Feb 2025",
      image: "https://picsum.photos/200/300?random=1",
      details: [
        { label: "Dewasa", qty: 2, price: 500 },
        { label: "Anak", qty: 1, price: 300 },
        { label: "Lansia", qty: 1, price: 400 },
      ],
    },
    {
      id: 2,
      title: "Louvre Museum Tour",
      pkgName: "Guided Tour",
      startDate: "28 Feb 2025",
      image: "https://picsum.photos/200/300?random=2",
      details: [
        { label: "Dewasa", qty: 1, price: 450 },
        { label: "Anak", qty: 2, price: 250 },
      ],
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => {
    const itemTotal = item.details.reduce((subtotal, detail) => subtotal + detail.qty * detail.price, 0);
    return sum + itemTotal;
  }, 0);

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
              Booking details have been sent to: <span className="font-medium">sasuke@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Your Information</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Name</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">John Doe</span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Email</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">johndoe@example.com</span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Country</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">United States</span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">City</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">New York</span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Special Requirement</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">Vegetarian meal</span>
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
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8 mt-3 md:mt-0">
        <h3 className="text-2xl font-semibold">Your Booking</h3>
        {cartItems.map((item) => {
          const itemTotal = item.details.reduce((subtotal, detail) => subtotal + detail.qty * detail.price, 0);

          return (
            <div
              key={item.id}
              className="cart-item mb-5 pb-5 flex items-start overflow-hidden border-b border-[#e9e9e9]"
            >
              <a href="#" className="cart-item-image flex-shrink-0 w-[85px] h-[85px]">
                <img alt={item.title} className="w-full h-full rounded-md object-cover object-top" src={item.image} />
              </a>
              <div className="cart-item-details flex-1 ml-4">
                <a href="#" className="cart-item-title block text-lg font-normal">
                  {item.title}
                </a>
                <p className="pkgName text-sm text-[#444] mt-1">{item.pkgName}</p>
                <p className="startDate text-sm text-[#444] mt-1">
                  <i className="las la-calendar-alt"></i> {item.startDate}
                </p>
                <div className="priceDetails text-sm text-[#444] mt-2 space-y-1">
                  {item.details.map((detail, index) => (
                    <div key={index} className="flex justify-between">
                      <span>
                        {detail.qty} {detail.label} x ${detail.price}
                      </span>
                      <strong>${detail.qty * detail.price}</strong>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between border-t border-[#e9e9e9] mt-2 pt-2 text-sm font-bold">
                  <span>Total</span>
                  <span>${itemTotal}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Total Keseluruhan */}
        <div className="flex justify-between text-lg font-bold border-[#e9e9e9]">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 lg:flex lg:flex-row">
        {/* <div className="max-w-4xl mx-auto">{renderContent()}</div> */}
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default PayPage;
