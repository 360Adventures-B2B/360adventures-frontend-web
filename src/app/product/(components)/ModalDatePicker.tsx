import React, { FC, useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import { useBooking } from "@/context/BookingContext";
import { formatDateString } from "@/utils/dateHelper";

interface ModalDatePickerProps {
  selectedDate: Date | null;
  handleDateSelection: (date: Date | null) => void;
  closeModal: () => void;
}

const ModalDatePicker: FC<ModalDatePickerProps> = ({ selectedDate, handleDateSelection, closeModal }) => {
  const [monthsShown, setMonthsShown] = useState(1);
  const { bookingData, updateBookingData } = useBooking();

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
    closeModal();
    if (date) {
      updateBookingData({ start_date: formatDateString(date) });
    }
  };
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
            closeModal(); // This will close the modal after confirming the date
          }} // Panggil fungsi untuk menutup modal
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalDatePicker;
