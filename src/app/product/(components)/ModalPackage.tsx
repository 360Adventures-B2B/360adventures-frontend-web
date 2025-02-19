"use client";
import React, { useState } from "react";
import QuantityStepper from "./QuantityStepper";
import { useBooking } from "@/context/BookingContext";
import { useGetDetailPackageQuery } from "@/lib/services/productService";

interface ModalPackageProps {
  packageId: number;
}

const ModalPackage: React.FC<ModalPackageProps> = ({ packageId }) => {
  const { bookingData, updateBookingData } = useBooking();

  const { data: packageData, error, isLoading } = useGetDetailPackageQuery(packageId);

  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeSelect = (time: any) => {
    setSelectedTime(time);
    updateBookingData({ time_slot: time });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col max-h-[75vh] overflow-y-auto">
      <div className="flex-grow space-y-8">
        <div className="space-y-4">
          {/* <div className="flex space-x-4 items-center">
            <div className="bg-blue-500 text-white p-2 rounded-full text-xs sm:text-sm">Instant confirmation</div>
            <div className="flex items-center cursor-pointer space-x-2">
              <div className="bg-blue-500 text-white p-2 rounded-full text-xs sm:text-sm">Free cancellation</div>
            </div>
          </div> */}
          <p className="text-lg sm:text-xl font-bold">{packageData?.product?.name}</p>
          <h4 className="text-md sm:text-lg text-gray-700">{packageData?.name}</h4>
        </div>

        <div className="space-y-4 p-4 rounded-lg bg-gray-100">
          <h4 className="text-lg sm:text-xl font-semibold">Time slots</h4>
          <div className="flex flex-wrap gap-2 justify-start">
            {packageData?.time_slot.map((time) => (
              <button
                key={time}
                className={`px-4 py-2 roundedƒ-full text-sm sm:text-base ${
                  selectedTime === time ? "bg-primary-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <QuantityStepper personTypes={packageData?.person_types ?? []} />
      </div>
      {/* Footer section */}
      <div className="mt-auto bg-white p-4 rounded-lg shadow-lg sticky bottom-0 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          <div className="space-y-2 sm:space-y-0 sm:text-left w-full sm:w-auto">
            <span className="text-gray-600 text-sm sm:text-base">Total</span>
            <div className="flex items-center space-x-2">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800">USD 51.78</h4>
            </div>
          </div>

          {/* Tombol Checkout dan Add Cart */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
            <button className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
              Checkout
            </button>

            {/* Tombol Add Cart yang tetap sejajar */}
            <button className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPackage;
