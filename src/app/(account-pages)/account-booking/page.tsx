"use client";

import React, { Fragment, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { Tab } from "@headlessui/react";
import BookingCard from "./components/BookingCard";
import Pagination from "@/shared/Pagination";

const AccountBooking = () => {
  let [options] = useState(["All", "Upcoming", "Completed", "Cancelled"]);

  const [maxVisible, setMaxVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setMaxVisible(window.innerWidth <= 768 ? 2 : 5);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">My Bookings</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <Tab.Group>
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
              {/* <p>Content for {item} bookings</p> */}
              <BookingCard />
              <BookingCard />
              <BookingCard />
              <BookingCard />
              <BookingCard />

              <div className="text-center pt-5">
                <Pagination totalPages={20} maxVisiblePaging={maxVisible} />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AccountBooking;
