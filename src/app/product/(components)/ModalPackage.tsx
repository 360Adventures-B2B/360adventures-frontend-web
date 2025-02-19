"use client";
import React, { useEffect, useState } from "react";
import QuantityStepper from "./QuantityStepper";
import { useBooking } from "@/context/BookingContext";
import { useGetDetailPackageQuery } from "@/lib/services/productService";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate } from "@/utils/dateHelper";
import ModalDatePicker from "./ModalDatePicker";
import NcModal from "@/shared/NcModal";

interface ModalPackageProps {
  packageId: number;
  closeModal: () => void;
}

const ModalPackage: React.FC<ModalPackageProps> = ({ packageId, closeModal: closeModalPackage }) => {
  const { bookingData, updateBookingData } = useBooking();

  const [isChangeDate, setIsChangeDate] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const { data: packageData, error, isLoading } = useGetDetailPackageQuery(packageId);

  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeSelect = (time: any) => {
    setSelectedTime(time);
    updateBookingData({ time_slot: time });
  };

  useEffect(() => {
    if (packageData && packageData.person_types && isFirstOpen) {
      updateBookingData({
        ...bookingData,
        person_types: packageData.person_types,
        package_id: packageId,
      });
      setIsFirstOpen(false);
    }
  }, [packageData, isFirstOpen, bookingData, updateBookingData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isChangeDate) {
    return <ModalDatePicker selectedDate={null} handleDateSelection={() => {}} closeModal={closeModalPackage} />;
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
          <div className="flex items-center space-x-2">
            <span className="text-md sm:text-lg text-gray-700">{formatDate(bookingData.start_date)}</span>
            <button
              type="button"
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={() => {
                setIsChangeDate(true);
              }}
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                className="text-gray-600"
              >
                <path
                  d="m28 11.582-5.59-5.59c-.2-.19-.41-.33-.63-.42-.5-.21-1.05-.21-1.53 0-.23.09-.45.24-.66.44L4.6 21.002c-.19.18-.34.41-.44.66-.1.24-.15.5-.15.76v5.59c0 .53.21 1.03.6 1.43.38.36.89.57 1.4.57h5.59c.28 0 .53-.05.76-.15.23-.09.44-.24.65-.44l11.7-11.71 3.27-3.27a2 2 0 0 0 .46-.67c.1-.25.15-.5.15-.76a2.017 2.017 0 0 0-.59-1.42v-.01Zm-16.39 16.42H6v-5.58l11.01-11 5.59 5.59-10.98 11-.01-.01ZM24 15.593l-5.58-5.58 2.59-2.59 5.58 5.59-2.58 2.58H24Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
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
              <h4 className="text-lg sm:text-xl font-bold text-gray-800">{formatNumber(bookingData.total_price)}</h4>
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
