"use client";
import React, { useEffect, useState } from "react";
import QuantityStepper from "./QuantityStepper";
import { useBooking } from "@/context/BookingContext";
import { useGetDetailPackageMutation } from "@/lib/services/productService";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateString } from "@/utils/dateHelper";
import ModalDatePicker from "./ModalDatePicker";
import NcModal from "@/shared/NcModal";
import { useDate } from "@/context/DateContext";
import SkeletonPackage from "./SkeletonPackage";
import { useAddCartMutation } from "@/lib/services/cartService";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import ExtraPriceSelector from "./ExtraPriceSelector";

interface ModalPackageProps {
  packageId: string;
  closeModal: () => void;
}

const ModalPackage: React.FC<ModalPackageProps> = ({ packageId, closeModal: closeModalPackage }) => {
  const { bookingData, dispatch } = useBooking();
  const { selectedDate, setSelectedDate } = useDate();

  const [isChangeDate, setIsChangeDate] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const [getDetailPackage, { data, error, isLoading }] = useGetDetailPackageMutation();

  useEffect(() => {
    if (packageId) {
      const startDate = selectedDate || bookingData.start_date;
      getDetailPackage({
        ulid: packageId,
        body: {
          start_date: formatDateString(startDate),
        },
      });
    }
  }, [packageId, selectedDate]);
  const packageData = data?.data;

  const [selectedTime, setSelectedTime] = useState("");

  const [addCart, { isLoading: isLoadingAddCart, isError }] = useAddCartMutation();

  const handleTimeSelect = (time: any) => {
    setSelectedTime(time);
    dispatch({ type: "UPDATE_TIME_SLOT", payload: time });
  };

  useEffect(() => {
    if (packageData && packageData.person_types && isFirstOpen) {
      const updatedPersonTypes = packageData.person_types.map((person: any) => ({
        ...person,
        guest: 0,
      }));

      dispatch({ type: "UPDATE_PERSON_TYPES", payload: updatedPersonTypes });
      dispatch({ type: "UPDATE_PACKAGE", payload: packageId });

      setIsFirstOpen(false);
    }
  }, [packageData, isFirstOpen, bookingData, dispatch]);

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAddCart = async () => {
    try {
      if (!bookingData.start_date) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Please select date!",
          variant: "destructive",
          duration: 2000,
        });
      }

      if (packageData?.time_slot && packageData?.time_slot.length > 0 && !bookingData.time_slot) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Please select time slot!",
          variant: "destructive",
          duration: 2000,
        });
      }

      if (!bookingData.person_types.some((person) => person.guest > 0)) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Please choose guest!",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      const newCartItem = {
        package_id: bookingData.package_id,
        start_date: bookingData.start_date,
        time_slot: bookingData.time_slot,
        person_types: bookingData.person_types,
      };

      const res = await addCart(newCartItem).unwrap();
      if (res.code === 201) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Success Add Cart!",
          variant: "success",
          duration: 2000,
        });
        closeModalPackage();
      }
    } catch (error) {
      console.log("🚀 ~ handleAddCart ~ error:", error);
    }
  };

  if (isLoading) {
    return <SkeletonPackage />;
  }

  if (isChangeDate) {
    return (
      <ModalDatePicker
        selectedDate={selectedDate}
        handleDateSelection={handleDateSelection}
        closeModal={closeModalPackage}
        hideCloseButton={false}
      />
    );
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
              <i className="las la-calendar text-3xl"></i>
            </button>
          </div>
        </div>

        {packageData?.time_slot?.length > 0 && (
          <div className="space-y-4 p-4 rounded-lg bg-gray-100">
            <h4 className="text-lg sm:text-xl font-semibold">Time slots</h4>

            <div className="flex flex-wrap gap-2 justify-start">
              {packageData?.time_slot.map((time: any) => (
                <button
                  key={time}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base ${
                    selectedTime === time ? "bg-primary-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <QuantityStepper personTypes={packageData?.person_types ?? []} />

        {packageData?.extra_prices?.length > 0 && <ExtraPriceSelector extraPrices={packageData?.extra_prices ?? []} />}
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
            {/* <button className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
              Checkout
            </button> */}
            <ButtonPrimary
              loading={isLoadingAddCart}
              className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
            >
              Checkout
            </ButtonPrimary>

            {/* Tombol Add Cart yang tetap sejajar */}
            <ButtonPrimary
              onClick={handleAddCart}
              loading={isLoadingAddCart}
              className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
            >
              Add Cart
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPackage;
