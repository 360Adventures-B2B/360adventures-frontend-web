import React from "react";
import FormChangePassword from "./components/form";

const AccountPass = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">Update your password</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <FormChangePassword />
    </div>
  );
};

export default AccountPass;
