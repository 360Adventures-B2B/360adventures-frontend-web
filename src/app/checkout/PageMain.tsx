"use client";

import React, { FC, Fragment, useEffect, useState } from "react";

import FormCheckout from "./component/FormCheckout";
import BookingSummary from "@/components/BookingSummary";
import BookingSummarySkeleton from "@/components/skeleton/BookingSummarySkeleton";
import { useGetCartsQuery } from "@/lib/services/cartService";
import { redirect } from "next/navigation";
export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({ className = "" }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // State untuk menyimpan selectedItems

  useEffect(() => {
    const savedItems = sessionStorage.getItem("selectedItems");

    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems)); // Parse string JSON menjadi array
    }
  }, []);

  const bodyCart = { ids: selectedItems };

  const { data: carts, isLoading: isLoadingGetCart, isFetching: isFetchingGetCart, error } = useGetCartsQuery(bodyCart);
  const loading = isFetchingGetCart || isLoadingGetCart;

  if (!loading && carts?.data.length === 0) {
    redirect("/");
  }

  const renderSidebar = () => {
    return <BookingSummary bookingData={carts?.data || []} title="Your Item" />;
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
