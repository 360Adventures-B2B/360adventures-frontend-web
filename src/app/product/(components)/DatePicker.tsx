import NcModal from "@/shared/NcModal";
import { useEffect, useState, useRef } from "react";
import ModalDatePicker from "./ModalDatePicker";
import { useBooking } from "@/context/BookingContext";
import { formatDateString } from "@/utils/dateHelper";
import ModalPackage from "./ModalPackage";
import { useDate } from "@/context/DateContext";
import { useUnavailableDates } from "@/context/ProductUnavailableContext";

const DatePicker = () => {
  const { bookingData, dispatch } = useBooking();
  const { selectedDate, setSelectedDate, highlightedDate, setHighlightedDate } = useDate();

  const containerRef = useRef(null);

  const getNextDays = (count: number) => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getSurroundingDates = (centerDate: Date, range: number): Date[] => {
    const dates: Date[] = [];
    const half = Math.floor(range / 2);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const center = new Date(centerDate);
    center.setHours(0, 0, 0, 0);

    for (let i = -half; i <= half; i++) {
      const date = new Date(center);
      date.setDate(center.getDate() + i);
      date.setHours(0, 0, 0, 0);

      if (date < today) continue;

      dates.push(date);
    }

    let nextDate = new Date(dates.length ? dates[dates.length - 1] : center);
    while (dates.length < range + 1) {
      nextDate = new Date(nextDate);
      nextDate.setDate(nextDate.getDate() + 1);
      nextDate.setHours(0, 0, 0, 0);
      dates.push(nextDate);
    }

    return dates;
  };

  const [visibleDates, setVisibleDates] = useState<Date[]>([]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
    setHighlightedDate(date);
  };

  const handleTileClick = (date: Date) => {
    setSelectedDate(date);
    setHighlightedDate(date);

    if (date) {
      dispatch({ type: "UPDATE_DATE", payload: formatDateString(date) });
    }
  };

  const updateVisibleDates = () => {
    if (containerRef.current) {
      const containerWidth = (containerRef.current as HTMLDivElement).offsetWidth;
      const cardWidth = 100;
      const cardsPerRow = Math.floor(containerWidth / cardWidth);
      setVisibleDates(getNextDays(cardsPerRow));
    }
  };

  // handle effect visible date misal ada perubahan dari selected date
  useEffect(() => {
    if (!selectedDate || !containerRef.current) return;

    const firstVisible = visibleDates[0];
    const lastVisible = visibleDates[visibleDates.length - 1];

    const containerWidth = (containerRef.current as HTMLDivElement).offsetWidth;

    const cardWidth = 100;
    const cardsPerRow = Math.floor(containerWidth / cardWidth);
    const range = cardsPerRow - 1;

    if (selectedDate < firstVisible || selectedDate > lastVisible) {
      setVisibleDates(getSurroundingDates(selectedDate, range));
    }
  }, [selectedDate, visibleDates]);

  useEffect(() => {
    updateVisibleDates();

    window.addEventListener("resize", updateVisibleDates);

    return () => {
      window.removeEventListener("resize", updateVisibleDates);
    };
  }, []);

  const { unavailableDates } = useUnavailableDates();

  // for block date
  const isDateBlocked = (date: Date) => {
    return unavailableDates.some((blockedDate) => blockedDate.toDateString() === date.toDateString());
  };

  return (
    <div className="space-y-6 listingSection__wrap">
      <div className="text-lg font-semibold">Next available dates</div>
      <div ref={containerRef} className="flex gap-2 justify-start flex-nowrap">
        {visibleDates.map((date: Date, index) => {
          const blocked = isDateBlocked(date);

          return (
            <div
              key={index}
              className={`w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
        ${
          highlightedDate && date.toDateString() === highlightedDate.toDateString()
            ? "bg-primary-500 text-white"
            : "bg-gray-100"
        }
        ${blocked ? "bg-gray-300 cursor-not-allowed opacity-60" : ""}`}
              onClick={() => !blocked && handleTileClick(date)}
            >
              <div className="flex flex-col items-center justify-center text-center h-full space-y-1">
                <div className="text-xs md:text-sm">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className="font-bold text-xs md:text-sm">{formatDate(date)}</div>
                <div className={`text-[10px] text-red-500 leading-tight ${blocked ? "visible" : "invisible"}`}>
                  Not available
                </div>
              </div>
            </div>
          );
        })}

        <NcModal
          className="w-24 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
          contentExtraClass="w-full md:w-1/2"
          renderTrigger={(openModal) => (
            <div
              onClick={() => openModal()}
              className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <i className=" las la-calendar text-3xl "></i>
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
                isIconDatePickerClick={true}
              />
            );
          }}
          modalTitle={bookingData.package_id ? "Select Your Preferences" : "Select a Date"}
        />
      </div>
    </div>
  );
};

export default DatePicker;
