import Button from "@/shared/Button";
import ButtonPrimary from "@/shared/ButtonPrimary";
import NcModal from "@/shared/NcModal";
import React from "react";
import BookingDetail from "./BookingDetail";

export default function BookingCard() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start p-4 border rounded-lg shadow-sm relative overflow-hidden bg-white mb-4">
        {/* Gambar */}
        <div className="absolute left-0 top-0 bottom-0 w-full h-80 sm:h-96 lg:w-48 lg:h-48">
          <img
            src="https://images.pexels.com/photos/6434634/pexels-photo-6434634.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Penang Hill Funicular"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informasi Tiket */}
        <div className="ml-0 lg:ml-52 mt-80 sm:mt-96 lg:mt-0 flex-1 p-0 text-left">
          <h2 className="text-xs text-gray-500">Penang Hill Funicular Ticket + adadw dwwdw naign wdw</h2>
          <h1 className="text-base font-semibold text-sm">Return (Fast Lane) mantap jiwa gas</h1>

          <div className="mt-2 flex items-center">
            <i className="las la-calendar text-gray-500 text-lg"></i>
            <span className="ml-1 text-gray-700 text-sm">
              Date: <span className="py-1 font-semibold">Mar 6, 2025</span>
            </span>
          </div>

          <NcModal
            contentExtraClass="w-full md:w-1/2"
            renderTrigger={(openModal) => (
              <div
                onClick={() => openModal()}
                className="mt-2 inline-block text-primary-500 underline cursor-pointer text-sm"
              >
                View Detail
              </div>
            )}
            renderContent={(closeModal) => {
              return <BookingDetail />;
            }}
            modalTitle="Booking Details"
          />
        </div>

        {/* Informasi Booking */}
        <div className="ml-auto lg:absolute lg:right-4 lg:top-4 text-left lg:text-right w-full lg:w-auto mt-4 lg:mt-0">
          <p className="text-sm text-gray-500">
            Booking ID: <span className="px-2 py-1 font-semibold text-sm">1512321452</span>
          </p>
          <p className="text-green-500 font-semibold text-sm">Confirmed</p>

          <div className="mt-4 flex flex-col lg:flex-row items-center gap-2">
            <Button
              sizeClass="px-4 py-2"
              fontSize="text-sm"
              className="w-full lg:w-auto  border rounded-lg text-red-500 border-red-300 hover:bg-red-100"
            >
              Cancel booking
            </Button>
            <ButtonPrimary fontSize="text-sm" sizeClass="px-4 py-2" className="w-full lg:w-auto border rounded-lg">
              Download voucher
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}
