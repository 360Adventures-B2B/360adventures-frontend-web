import React, { FC, useState, useEffect, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import { useBooking } from "@/context/BookingContext";
import { formatDateString } from "@/utils/dateHelper";
import NcModal from "@/shared/NcModal";
import ModalPackage from "./ModalPackage";

interface ModalDatePickerProps {
  selectedDate: Date | null;
  handleDateSelection: (date: Date | null) => void;
  closeModal: () => void;
}

const ModalDatePicker: FC<ModalDatePickerProps> = ({ selectedDate, handleDateSelection, closeModal }) => {
  const [monthsShown, setMonthsShown] = useState(1);
  const { bookingData, updateBookingData } = useBooking();
  const openModalRef = useRef<Function | null>(null);
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
      updateBookingData({ start_date: formatDateString(date), time_slot: "" });
    }

    if (bookingData.package_id) {
      openModalRef.current?.();
    }
    setIsChangeDate(true);
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
        renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
        renderDayContents={(day, date) => <DatePickerCustomDay dayOfMonth={day} date={date} />}
      />

      <div className="mt-4 flex justify-end">
        {/* Tombol Close memanggil onCloseModal */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded transition-all duration-200 ease-in-out hover:bg-blue-600"
          onClick={() => {
            handleDateSelection(selectedDate);
          }}
        >
          Close
        </button>
      </div>
      {/* <NcModal
        contentExtraClass="w-full md:w-1/2"
        renderTrigger={(openModal) => {
          openModalRef.current = openModal;
          return <></>;
        }}
        renderContent={(closeModal) => {
          return <ModalPackage packageId={bookingData.package_id ?? 0} closeModal={closeModal} />;
        }}
        modalTitle="Select your awgawgagawwaawafwafw"
      /> */}
    </div>
  );
};

export default ModalDatePicker;
