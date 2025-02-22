"use client";

import React, { FC, Fragment, useState } from "react";
import mastercardPng from "@/images/mastercard.svg";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({ className = "" }) => {
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

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8 mt-3 md:mt-0">
        <h2 className="text-2xl font-semibold">Your Item</h2>

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
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8">
        <h2 className="text-2xl font-semibold">Let us know who you are</h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
          </div>
          <div className="space-y-1">
            <Label>Phone</Label>
            <Input placeholder="Enter your phone number" />
          </div>
          <div className="space-y-1">
            <Label>Country</Label>
            <Input placeholder="Enter your country" />
          </div>
          <div className="space-y-1">
            <Label>City</Label>
            <Input placeholder="Enter your city" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label>Special Requirement</Label>
            <Textarea placeholder="Special requirement" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <div className="space-y-4 w-full mb-5">
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 w-full">
                <label className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment_gateway"
                      value="credit_balance"
                      className="form-radio h-5 w-5 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 accent-primary-700"
                    />
                    <span className="text-lg font-medium">Credit Balance</span>
                  </div>
                  <span className="text-sm text-gray-600">Saldo: $100.00</span>
                </label>
              </div>

              <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 w-full">
                <label className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment_gateway"
                      value="credit_balance"
                      className="form-radio h-5 w-5 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 accent-primary-700"
                    />
                    <span className="text-lg font-medium">Visa / Mastercard / Apple Pay / G Pay</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <input
                type="checkbox"
                id="termsCheckbox"
                name="term_conditions"
                className="w-4 h-4 border-gray-300 rounded checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0"
              />
              <label htmlFor="termsCheckbox" className="ml-2">
                By continuing, you agree to the
                <a target="_blank" href="#" className="text-blue-600 hover:underline">
                  {" "}
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div className="pt-8">
              <ButtonPrimary className="w-full" href={"/pay-done"}>
                Confirm and pay
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 lg:flex lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
