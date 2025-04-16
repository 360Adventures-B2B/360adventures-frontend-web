import { useBooking } from "@/context/BookingContext";
import { ExtraPrice } from "@/interfaces/ExtraPrice";
import { formatNumber } from "@/utils/currencyConverter";
import React, { useState } from "react";

interface ExtraPriceSelectorProps {
  extraPrices: ExtraPrice[];
}

const ExtraPriceSelector: React.FC<ExtraPriceSelectorProps> = ({ extraPrices }) => {
  const { bookingData, dispatch } = useBooking();

  const handleCheckboxChange = (extraPrice: any) => {
    const extraPriceExists = bookingData.extra_prices.some((item) => item.name === extraPrice.name);

    // Jika extraPrice belum ada, tambahkan ke dalam extra_prices
    if (!extraPriceExists) {
      dispatch({
        type: "UPDATE_EXTRA_PRICES",
        payload: [...bookingData.extra_prices, extraPrice], // Menambahkan extraPrice ke array
      });
    } else {
      // Jika sudah ada, hapus dari bookingData.extra_prices
      dispatch({
        type: "UPDATE_EXTRA_PRICES",
        payload: bookingData.extra_prices.filter((item) => item.name !== extraPrice.name), // Menghapus extraPrice dari array
      });
    }

    console.log("🚀 ~ bookingData:", bookingData);
  };

  return (
    <div className="space-y-4 p-4 rounded-lg bg-gray-100">
      <h4 className="text-lg sm:text-xl font-semibold">Extra Prices</h4>
      <div className="space-y-3">
        {extraPrices.map((extraPrice) => (
          <label
            key={extraPrice.name} // Menggunakan name sebagai key
            className="flex items-center justify-between border bg-white p-4 rounded-lg cursor-pointer transition"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(extraPrice)}
                className="w-4 h-4 border-gray-300 rounded checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0"
              />
              <div>
                <div className="text-sm font-medium">{extraPrice.name}</div>

                {/* Keterangan tipe harga */}
                <div className="text-xs text-gray-500 italic">
                  {extraPrice.type === "per_person" ? "Per Person" : "One Time"}
                </div>
              </div>
            </div>

            <div className="text-sm font-semibold text-primary-600">{formatNumber(extraPrice.price ?? 0)}</div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ExtraPriceSelector;
