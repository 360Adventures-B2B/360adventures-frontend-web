"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import { useBooking } from "@/context/BookingContext";
import { formatDateString } from "@/utils/dateHelper";
import NcModal from "@/shared/NcModal";
import ModalPackage from "./ModalPackage";
import { useDate } from "@/context/DateContext";

interface ModalDatePickerProps {
  selectedDate: Date | null;
  handleDateSelection: (date: Date | null) => void;
  closeModal: () => void;
  hideCloseButton?: boolean;
  isIconDatePickerClick?: boolean;
}

const ModalDatePicker: FC<ModalDatePickerProps> = ({
  selectedDate,
  handleDateSelection,
  closeModal,
  hideCloseButton = true,
  isIconDatePickerClick = false,
}) => {
  const [monthsShown, setMonthsShown] = useState(1);
  const { bookingData, dispatch } = useBooking();
  const { setHighlightedDate } = useDate();
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
    handleDateSelection(date);
    if (date) {
      dispatch({ type: "UPDATE_DATE", payload: formatDateString(date) });
      dispatch({ type: "UPDATE_TIME_SLOT", payload: "" });

      setHighlightedDate(date);
    }

    if (isIconDatePickerClick && !bookingData.package_id) {
      closeModal();
    }
  };

  if (isChangeDate) {
    if (bookingData.package_id) {
      return <ModalPackage packageId={bookingData.package_id} closeModal={closeModal} />;
    }
  }

  return (
    <div>
      <div className="text-lg font-semibold mb-4">Select a date</div>

      {/* React DatePicker */}
      <ReactDatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showPopperArrow={false}
        inline
        monthsShown={monthsShown}
        minDate={new Date()}
        renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
        renderDayContents={(day, date) => <DatePickerCustomDay dayOfMonth={day} date={date} />}
      />

      <div className="mt-4 flex justify-end">
        {/* Tombol Close memanggil onCloseModal */}
        {!hideCloseButton && (
          <button
            className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
            onClick={() => {
              handleDateSelection(selectedDate);
              setIsChangeDate(true);
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
