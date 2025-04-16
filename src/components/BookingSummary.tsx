import { Cart } from "@/interfaces/Cart";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate } from "@/utils/dateHelper";
import React from "react";
import BookingItemCard from "./BookingItemCard";

interface BookingSummaryProps {
  bookingData: Cart[];
  title?: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ bookingData, title }) => {
  const grandTotal = bookingData.reduce((total, item) => total + item.total_price, 0);

  return (
    <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8 mt-3 md:mt-0">
      <h2 className="text-2xl font-semibold">{title || "Your Item"}</h2>

      {bookingData.map((item: any) => (
        <BookingItemCard key={item.ulid} item={item} />
      ))}

      <div className="grand-total flex justify-between text-lg font-bold">
        <span>Grand Total</span>
        <span>{formatNumber(grandTotal)}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
