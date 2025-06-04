"use client";
import React, { FC, useState, useEffect, useRef, useMemo } from "react";
import ReactDatePicker from "react-datepicker";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import { useBooking } from "@/context/BookingContext";
import { formatDateString } from "@/utils/dateHelper";
import ModalPackage from "./ModalPackage";
import { useDate } from "@/context/DateContext";
import { useUnavailableDates } from "@/context/ProductUnavailableContext";
import { useGetDetailPackageMutation } from "@/lib/services/productService";

interface ModalDatePickerProps {
  selectedDate: Date | null;
  handleDateSelection: (date: Date | null) => void;
  closeModal: () => void;
  hideCloseButton?: boolean;
  isIconDatePickerClick?: boolean;
  packageId?: string;
}

const ModalDatePicker: FC<ModalDatePickerProps> = ({
  selectedDate,
  handleDateSelection,
  closeModal,
  hideCloseButton = true,
  isIconDatePickerClick = false,
  packageId,
}) => {
  const [monthsShown, setMonthsShown] = useState(1);
  const { bookingData, dispatch } = useBooking();
  const { setHighlightedDate, setSelectedDate } = useDate();
  const [isChangeDate, setIsChangeDate] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMonthsShown(2);
      } else {
        setMonthsShown(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDateChange = (date: Date) => {
    if (date) {
      handleDateSelection(date);

      dispatch({ type: "UPDATE_DATE", payload: formatDateString(date) });
      dispatch({ type: "UPDATE_TIME_SLOT", payload: "" });

      setHighlightedDate(date);
    }

    if (isIconDatePickerClick && !bookingData.package_id) {
      if (!selectedDate) {
        setSelectedDate(date);
      }
      closeModal();
    }
  };

  const [getDetailPackage, { data, isError: isErrorDetailPackage, isLoading }] = useGetDetailPackageMutation();

  const { unavailableDates: contextUnavailableDates } = useUnavailableDates();

  useEffect(() => {
    if (packageId) {
      getDetailPackage({ ulid: packageId, body: {} });
      dispatch({ type: "UPDATE_PACKAGE", payload: packageId });
      if (selectedDate) {
        dispatch({ type: "UPDATE_DATE", payload: formatDateString(selectedDate) });
      }
    }
  }, [packageId]);

  // Gabungkan unavailable dates dari context dan dari API
  const mergedUnavailableDates = useMemo(() => {
    const apiDates = data?.data?.unavailable_dates || [];

    const apiDateObjects = apiDates.map((dateStr: any) => new Date(dateStr));

    const allDates = [...contextUnavailableDates, ...apiDateObjects];

    const uniqueDateMap = new Map<string, Date>();
    allDates.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      if (!uniqueDateMap.has(dateKey)) {
        uniqueDateMap.set(dateKey, date);
      }
    });

    return Array.from(uniqueDateMap.values());
  }, [contextUnavailableDates, data]);

  if (isChangeDate && bookingData?.package_id) {
    return <ModalPackage packageId={packageId || bookingData?.package_id} closeModal={closeModal} />;
  }

  return (
    <div>
      <div className="text-lg font-semibold mb-4">Select a date</div>
      {packageId && (!data?.data || isLoading) ? (
        <div className="py-20 flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      ) : (
        <ReactDatePicker
          selected={selectedDate}
          onChange={onDateChange}
          showPopperArrow={false}
          inline
          monthsShown={monthsShown}
          minDate={new Date()}
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => <DatePickerCustomDay dayOfMonth={day} date={date} />}
          excludeDates={mergedUnavailableDates}
        />
      )}

      <div className="mt-4 flex justify-end">
        {!hideCloseButton && (
          <button
            className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
            onClick={() => {
              handleDateSelection(selectedDate);
              setIsChangeDate(true);
              setSelectedDate(selectedDate);
            }}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalDatePicker;
