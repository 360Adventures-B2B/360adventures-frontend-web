"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Pagination from "@/shared/Pagination";
import { useSearchParams } from "next/navigation";
import BookingCard from "./BookingCard";
import { useGetBookingsQuery } from "@/lib/services/bookingService";
import BookingCardSkeleton from "./BookingCardSkeleton";
import { IBooking } from "@/interfaces/Booking";

export default function BookingPage() {
  const options = ["All", "Confirmed", "Unconfirmed", "Completed", "Cancelled"];
  const searchParams = useSearchParams();

  const page = parseInt(searchParams?.get("page") || "1");

  const [maxVisible, setMaxVisible] = useState(3);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedStatus = options[selectedIndex];

  const {
    data: bookings,
    error: bookingsError,
    isLoading: isBookingsLoading,
    isFetching: isBookingsFetching,
  } = useGetBookingsQuery(
    {
      page,
      limit: 10,
      bookingStatus: selectedStatus.toLowerCase() === "all" ? "" : selectedStatus.toLowerCase(),
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxVisible(window.innerWidth <= 768 ? 2 : 5);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 overflow-x-auto w-full">
          {options.map((item) => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none transition-colors ${
                    selected
                      ? "bg-primary-6000 text-primary-50"
                      : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {item}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {options.map((item, index) => (
            <Tab.Panel key={index} className="mt-8">
              {/* Loading Skeleton */}
              {isBookingsLoading || isBookingsFetching ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <BookingCardSkeleton key={i} />
                  ))}
                </>
              ) : bookings?.data?.length > 0 ? (
                <>
                  {/* BookingCard list */}
                  {bookings.data.map((booking: IBooking) => (
                    <BookingCard key={booking.ulid} booking={booking} />
                  ))}

                  {/* Pagination */}
                  {bookings?.pagination?.last_page > 1 && (
                    <div className="text-center pt-5">
                      <Pagination totalPages={bookings?.pagination.total} maxVisiblePaging={maxVisible} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500">No bookings found.</div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
