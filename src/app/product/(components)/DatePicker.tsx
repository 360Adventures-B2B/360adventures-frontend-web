import NcModal from "@/shared/NcModal";
import { useEffect, useState } from "react";
import ModalDatePicker from "./ModalDatePicker";
import { useBooking } from "@/context/BookingContext";
import { formatDateString } from "@/utils/dateHelper";
import ModalPackage from "./ModalPackage";

const DatePicker = () => {
  const { bookingData, updateBookingData } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);

  const getNextDays = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const [dates, setDates] = useState(getNextDays());

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
    setHighlightedDate(date); // Update highlighted date
  };

  const handleTileClick = (date: Date) => {
    setSelectedDate(date);
    setHighlightedDate(date);
    if (date) {
      updateBookingData({ start_date: formatDateString(date) });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Next available dates</div>

      <div className="flex space-x-4">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`w-24 h-24 rounded-lg flex items-center justify-center flex-col cursor-pointer transition-all duration-200 ease-in-out 
              ${
                highlightedDate && date.toDateString() === highlightedDate.toDateString()
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100"
              }`}
            onClick={() => handleTileClick(date)}
          >
            <div className="text-sm">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div className="font-bold text-sm">{formatDate(date)}</div>
          </div>
        ))}

        <NcModal
          contentExtraClass="w-full md:w-1/2"
          renderTrigger={(openModal) => (
            <div
              className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => openModal()}
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                className="text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.82 3c.44 0 .804.288.862.66l.008.102V5.6h10.62V3.762c0-.346.266-.64.628-.732l.124-.023L22.18 3h.457c.44 0 .804.288.862.66l.008.102V5.6h2.563c1.63 0 2.93 1.3 2.903 2.83L29 26.431c0 1.359-1.205 2.472-2.729 2.562l-.2.006H5.93c-1.55 0-2.82-1.056-2.923-2.392L3 26.432V8.43C3 6.9 4.3 5.6 5.99 5.6h2.503V3.762c0-.346.266-.64.628-.732l.124-.023L9.363 3h.457Zm17.247 9H4.933v14.51c0 .34.274.627.63.68l.12.01h20.633c.371 0 .682-.252.74-.58l.01-.11V12Zm-.75-4.8H5.683a.76.76 0 0 0-.74.646l-.01.124v2.697h22.133V7.97c0-.38-.274-.7-.63-.76l-.12-.01Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          renderContent={(closeModal) => {
            if (bookingData.package_id) {
              return <ModalPackage packageId={bookingData.package_id} closeModal={closeModal} />;
            }
            return (
              <ModalDatePicker
                selectedDate={selectedDate}
                handleDateSelection={handleDateSelection}
                closeModal={closeModal}
              />
            );
          }}
          modalTitle="Select a Date"
        />
      </div>
    </div>
  );
};

export default DatePicker;
