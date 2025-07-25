"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { handleError, isErrorResponse } from "@/lib/handleApiError";
import { useError } from "@/context/ErrorContext";
import PackageNotAvailable from "./PackageNotAvailable";

interface ModalPackageProps {
  packageId: string;
  closeModal: () => void;
}

const ModalPackage: React.FC<ModalPackageProps> = ({
  packageId,
  closeModal: closeModalPackage,
}) => {
  const { showError } = useError();
  const { bookingData, dispatch } = useBooking();
  const { selectedDate, setSelectedDate } = useDate();

  const [isChangeDate, setIsChangeDate] = useState(false);
  console.log("🚀 ~ ModalPackage ~ isChangeDate:", isChangeDate);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const [getDetailPackage, { data, isError: isErrorDetailPackage, isLoading }] =
    useGetDetailPackageMutation();

  useEffect(() => {
    if (packageId) {
      const startDate = bookingData.start_date;
      getDetailPackage({
        ulid: packageId,
        body: {
          start_date: formatDateString(startDate),
        },
      });
    }
  }, [packageId]);
  const packageData = data?.data;

  const [selectedTime, setSelectedTime] = useState("");

  const [addCart, { isLoading: isLoadingAddCart, isError }] =
    useAddCartMutation();
  const handleTimeSelect = async (slot: any) => {
    const selectedTimeSlot = slot.time_slot;

    setSelectedTime(selectedTimeSlot);

    dispatch({ type: "UPDATE_TIME_SLOT", payload: selectedTimeSlot });
    if (slot.time_slot_id) {
      dispatch({
        type: "UPDATE_TIME_SLOT_ID_RAYNA",
        payload: slot.time_slot_id,
      });
    }

    const startDate = bookingData.start_date;
    if (packageId && startDate) {
      try {
        const res = await getDetailPackage({
          ulid: packageId,
          body: {
            start_date: formatDateString(startDate),
            check_slot: true,
            time_slot: selectedTimeSlot,
          },
        }).unwrap();

        const updatedPersonTypes = res.data.person_types.map((person: any) => ({
          ...person,
          guest: 0,
        }));

        dispatch({ type: "UPDATE_PERSON_TYPES", payload: updatedPersonTypes });
      } catch (err) {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
          ),
          title: "Error",
          description: err.message || "Server Error",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };

  useEffect(() => {
    if (packageData && packageData.person_types && isFirstOpen) {
      const updatedPersonTypes = packageData.person_types.map(
        (person: any) => ({
          ...person,
          guest: 0,
        })
      );

      dispatch({ type: "UPDATE_PERSON_TYPES", payload: updatedPersonTypes });
      dispatch({ type: "UPDATE_PACKAGE", payload: packageId });
      dispatch({ type: "UPDATE_EXTRA_PRICES", payload: [] });

      setIsFirstOpen(false);
    }
  }, [packageData, isFirstOpen, bookingData, dispatch]);

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleCheckout = async (action: "addCart" | "instant") => {
    try {
      if (!bookingData.start_date) {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
          ),
          title: "Error",
          description: "Please select date!",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      if (
        packageData?.time_slot &&
        packageData?.time_slot.length > 0 &&
        !bookingData.time_slot
      ) {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
          ),
          title: "Error",
          description: "Please select time slot!",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      if (!bookingData.person_types.some((person) => person.guest > 0)) {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
          ),
          title: "Error",
          description: "Please choose guest!",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      for (const pkgPerson of packageData.person_types) {
        const { name, min, max } = pkgPerson;

        const bookingPerson = bookingData.person_types.find(
          (p) => p.name === name
        );
        const guest = bookingPerson ? bookingPerson.guest : 0;

        if (guest < min) {
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
            ),
            title: "Error",
            description: `${name} must be at least ${min} guest${
              min > 1 ? "s" : ""
            }`,
            variant: "destructive",
            duration: 2000,
          });
          return;
        }

        if (guest > max) {
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
            ),
            title: "Error",
            description: `${name} cannot exceed ${max} guest${
              max > 1 ? "s" : ""
            }`,
            variant: "destructive",
            duration: 2000,
          });
          return;
        }
      }

      const simplifiedPersonTypes = Array.isArray(bookingData.person_types)
        ? bookingData.person_types
            .filter((person) => person.guest > 0) // hanya ambil yang guest > 0
            .map((person) => ({
              name: person.name,
              quantity: person.guest.toString(),
            }))
        : [];

      const simplifiedExtraPrices = bookingData.extra_prices.map((extra) => {
        return { name: extra.name };
      });

      const newCartItem = {
        package_id: bookingData.package_id,
        start_date: bookingData.start_date,
        person_types: simplifiedPersonTypes,
        ...(bookingData.time_slot ? { time_slot: bookingData.time_slot } : {}),
        ...(bookingData.time_slot_id_rayna !== undefined &&
        bookingData.time_slot_id_rayna !== null
          ? { time_slot_id_rayna: bookingData.time_slot_id_rayna }
          : {}),
        ...(simplifiedExtraPrices?.length
          ? { extra_prices: simplifiedExtraPrices }
          : {}),
      };

      const is_instant = action === "instant" ? "true" : "false";

      const res = await addCart({ body: newCartItem, is_instant }).unwrap();
      if (res.code === 200) {
        if (action === "addCart") {
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
            ),
            title: "Success",
            description: "Success Add Cart!",
            variant: "success",
            duration: 2000,
          });
          dispatch({ type: "RESET_BOOKING" });
          closeModalPackage();
        }

        if (action === "instant") {
          const ulid = res?.data?.ulid;

          const selectedItems = [ulid];

          sessionStorage.setItem(
            "selectedItems",
            JSON.stringify(selectedItems)
          );

          window.location.href = "/checkout?type=instant";
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleAddCart ~ error:", error);
      handleError(error);
    }
  };

  if (!isLoading && isErrorDetailPackage) {
    return (
      <PackageNotAvailable
        onSeeMore={() => {
          closeModalPackage();
        }}
      />
    );
  }

  if (isLoading || !packageData) {
    return <SkeletonPackage />;
  }

  if (isChangeDate) {
    return (
      <ModalDatePicker
        selectedDate={
          bookingData?.start_date ? new Date(bookingData.start_date) : null
        }
        handleDateSelection={() => {}}
        closeModal={closeModalPackage}
        hideCloseButton={false}
        packageId={packageId}
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
          <p className="text-lg sm:text-xl font-bold">
            {packageData?.product?.name}
          </p>
          <h4 className="text-md sm:text-lg text-gray-700">
            {packageData?.name}
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-md sm:text-lg text-gray-700">
              {formatDate(bookingData.start_date)}
            </span>
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
              {packageData.time_slot.map((slot: any, index: number) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base ${
                    selectedTime === slot.time_slot
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleTimeSelect(slot)}
                >
                  {slot.time_slot}
                </button>
              ))}
            </div>
          </div>
        )}
        <QuantityStepper personTypes={packageData?.person_types ?? []} />
        {packageData?.extra_prices?.length > 0 && (
          <ExtraPriceSelector extraPrices={packageData?.extra_prices ?? []} />
        )}
      </div>
      {/* Footer section */}
      <div className="mt-auto bg-white p-4 rounded-lg shadow-lg sticky bottom-0 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          <div className="space-y-2 sm:space-y-0 sm:text-left w-full sm:w-auto">
            <span className="text-gray-600 text-sm sm:text-base">Total</span>
            <div className="flex items-center space-x-2">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800">
                {formatNumber(bookingData.total_price)}
              </h4>
            </div>
          </div>

          {/* Tombol Checkout dan Add Cart */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
            {/* <button className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
              Checkout
            </button> */}
            <ButtonPrimary
              onClick={async () => handleCheckout("instant")}
              loading={isLoadingAddCart}
              className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
            >
              Checkout
            </ButtonPrimary>

            {/* Tombol Add Cart yang tetap sejajar */}
            <ButtonPrimary
              onClick={async () => handleCheckout("addCart")}
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
