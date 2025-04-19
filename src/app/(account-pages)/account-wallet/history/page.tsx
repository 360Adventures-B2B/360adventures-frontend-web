import React from "react";
import CreditHistory from "./components/CreditHistory";

const AccountTopup = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">Credit Histories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <CreditHistory />
    </div>
  );
};

export default AccountTopup;
