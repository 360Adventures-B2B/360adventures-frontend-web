import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-16 px-6 bg-white">
        <div className="text-6xl text-gray-500 mb-6">
          <i className="las la-shopping-cart"></i>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Your Cart is Empty</h3>
          <p className="text-gray-600 mb-6">
            It looks like you haven't added any items to your cart yet. Start exploring and add some amazing items!
          </p>
          <Link href={"/search"}>
            <ButtonPrimary className="inline-block text-white py-2 px-4">Check Now</ButtonPrimary>
          </Link>
        </div>
      </div>
    </>
  );
}
