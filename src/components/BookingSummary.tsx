import { Cart } from "@/interfaces/Cart";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate } from "@/utils/dateHelper";
import React from "react";
import BookingItemCard from "./BookingItemCard";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import Input from "@/shared/Input";

interface BookingSummaryProps {
  bookingData: Cart[];
  title?: string;
  form?: UseFormReturn<any>;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ bookingData, title, form }) => {
  const grandTotal = bookingData.reduce((total, item) => total + item.total_price, 0);

  return (
    <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8 mt-3 md:mt-0 sticky top-[5.5rem]">
      <h2 className="text-2xl font-semibold">{title || "Your Item"}</h2>

      {bookingData.map((item, index) => (
        <div key={item.ulid} className="mb-4 border-b pb-4">
          <BookingItemCard item={item} />
          {form ? (
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Pickup Location</span>
              <FormField
                control={form.control}
                name={`pickup_locations.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Enter pickup location" className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </label>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-neutral-600 dark:text-neutral-400">Pickup Location:</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {item.pickup_location || <span className="italic text-neutral-500">Not set</span>}
              </span>
            </div>
          )}
        </div>
      ))}

      <div className="grand-total flex justify-between text-lg font-bold">
        <span>Grand Total</span>
        <span>{formatNumber(grandTotal)}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
