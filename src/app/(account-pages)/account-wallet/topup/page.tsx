"use client";
import React from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import NcModal from "@/shared/NcModal";
import TopUpForm from "./components/TopupForm";
import TopupRequest from "./components/TopupRequest";

const AccountTopup = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">Topup</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-white border rounded-lg p-6 shadow-md h-full flex items-center">
            <div className="mr-4 text-primary-6000">
              <i className="las la-wallet text-4xl"></i>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700">Your Balance</h3>
              <p className="text-3xl font-bold text-primary-6000 mt-4">USD 1,250.00</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-white border rounded-lg p-6 shadow-md h-full">
            <h3 className="text-xl font-semibold text-gray-700">Add Credit</h3>
            <p className="text-gray-600 mt-2">Add more funds to your account to make purchases.</p>
            <div className="flex gap-4 mt-4">
              <NcModal
                contentExtraClass="w-full md:w-1/2"
                renderTrigger={(openModal) => (
                  <ButtonPrimary onClick={() => openModal()} className="px-6 py-2 text-white rounded-full">
                    Add Credit
                  </ButtonPrimary>
                )}
                renderContent={(closeModal) => {
                  return <TopUpForm />;
                }}
                modalTitle="Topup Credit"
              />
              {/* <ButtonPrimary className="px-6 py-2 text-white rounded-full">Add Credit Via QRIS</ButtonPrimary> */}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-semibold">Topup Request</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <TopupRequest />
    </div>
  );
};

export default AccountTopup;
