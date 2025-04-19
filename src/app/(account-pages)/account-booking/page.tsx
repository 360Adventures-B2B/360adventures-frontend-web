import React from "react";
import BookingPage from "./components/BookingPage";

const AccountBooking = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">My Bookings</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* TABS */}
      <BookingPage />
    </div>
  );
};

export default AccountBooking;
