import Button from "@/shared/Button";
import ButtonPrimary from "@/shared/ButtonPrimary";
import NcModal from "@/shared/NcModal";
import React, { useState } from "react";
import BookingDetail from "./BookingDetail";
import { IBooking } from "@/interfaces/Booking";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import Image from "next/image";

export default function BookingCard({ booking }: { booking: IBooking }) {
  const statusColors: Record<string, string> = {
    confirmed: "text-green-500",
    completed: "text-green-500",
    unconfirmed: "text-yellow-500",
    cancelled: "text-red-500",
  };

  const fallbackUrl = "https://dummyimage.com/500x500/000/fff";
  const [imgSrc, setImgSrc] = useState(booking.package?.product?.image || fallbackUrl);

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start p-4 border rounded-lg shadow-sm relative overflow-hidden bg-white mb-4">
        {/* Gambar */}
        <div className="absolute left-0 top-0 bottom-0 w-full h-80 sm:h-96 lg:w-48 lg:h-48">
          <Image
            src={imgSrc}
            className="object-cover w-full h-full "
            alt={booking.package?.product?.name || "Package Image"}
            sizes="(max-width: 400px) 100vw, 300px"
            onError={() => setImgSrc(fallbackUrl)}
            width={500}
            height={500}
          />
        </div>

        {/* Informasi Tiket */}
        <div className="ml-0 lg:ml-52 mt-80 sm:mt-96 lg:mt-0 flex-1 p-0 text-left">
          <h2 className="text-xs text-gray-500">{booking.package?.name}</h2>
          <h1 className="text-base font-semibold text-sm">{booking.package?.product?.name}</h1>

          <div className="mt-2 flex items-center">
            <i className="las la-calendar text-gray-500 text-lg"></i>
            <span className="ml-1 text-gray-700 text-sm">
              Date: <span className="py-1 font-semibold">{formatDate(booking.start_date)}</span>
            </span>
          </div>

          {booking.time_slot && (
            <div className="mt-2 flex items-center gap-1">
              <i className="las la-clock text-gray-500 text-lg"></i>
              <span className="text-gray-700 text-sm">
                Timeslot: <span className="py-1 font-semibold">{booking.time_slot}</span>
              </span>
            </div>
          )}

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
              return <BookingDetail booking={booking} />;
            }}
            modalTitle="Booking Details"
          />
        </div>

        {/* Informasi Booking */}
        <div className="ml-auto lg:absolute lg:right-4 lg:top-4 text-left lg:text-right w-full lg:w-auto mt-4 lg:mt-0">
          <p className="text-sm text-gray-500">
            Booking ID: <span className="px-2 py-1 font-semibold text-sm">{booking.booking_reference_id}</span>
          </p>

          <p className={`font-semibold text-sm ${statusColors[booking.booking_status] || "text-gray-500"}`}>
            {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
          </p>

          <div className="mt-10 flex flex-col lg:flex-row items-center gap-2">
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
