import Button from "@/shared/Button";
import ButtonPrimary from "@/shared/ButtonPrimary";
import NcModal from "@/shared/NcModal";
import React, { useState } from "react";
import BookingDetail from "./BookingDetail";
import { IBooking } from "@/interfaces/Booking";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import Image from "next/image";
import ModalCancelBooking from "./ModalCancelBooking";
import { useLazyDownloadTicketQuery } from "@/lib/services/bookingService";
import { useDownloadTicket } from "@/hooks/useDownloadTicket";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function BookingCard({ booking }: { booking: IBooking }) {
  const statusColors: Record<string, string> = {
    confirmed: "text-green-500",
    completed: "text-green-500",
    unconfirmed: "text-yellow-500",
    cancelled: "text-red-500",
  };

  const fallbackUrl = "https://dummyimage.com/500x500/000/fff";
  const [imgSrc, setImgSrc] = useState(
    booking.package?.product?.image || fallbackUrl
  );
  const { isLoadingDownload, handleDownload } = useDownloadTicket();

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start p-4 border rounded-lg shadow-sm relative overflow-hidden bg-white mb-4">
        {/* Gambar */}
        <div className="absolute left-0 top-0 bottom-0 w-full h-56 sm:h-64 lg:w-48 lg:h-48">
          <div className="relative w-full h-48 sm:h-64 lg:h-48">
            <Image
              src={imgSrc}
              alt={booking.package?.product?.name || "Package Image"}
              fill
              className="object-cover"
              onError={() => setImgSrc(fallbackUrl)}
              sizes="(max-width: 768px) 100vw, 192px"
              priority
            />
          </div>
        </div>

        {/* Informasi Tiket */}
        <div className="ml-0 lg:ml-52 mt-[14rem] sm:mt-[16rem] lg:mt-0 flex-1 p-0 text-left">
          <h2 className="text-xs text-gray-500">{booking.package?.name}</h2>
          <h1 className="text-base font-semibold">
            {booking.package?.product?.name}
          </h1>

          <div className="mt-2 flex items-center">
            <i className="las la-calendar text-gray-500 text-lg"></i>
            <span className="ml-1 text-gray-700 text-sm">
              Date:{" "}
              <span className="py-1 font-semibold">
                {formatDate(booking.start_date)}
              </span>
            </span>
          </div>

          {booking.time_slot ? (
            <div className="mt-2 flex items-center gap-1">
              <i className="las la-clock text-gray-500 text-lg"></i>
              <span className="text-gray-700 text-sm">
                Timeslot:{" "}
                <span className="py-1 font-semibold">{booking.time_slot}</span>
              </span>
            </div>
          ) : (
            // Placeholder untuk jaga tinggi
            <div className="mt-2 h-[1.5rem]" />
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
        <div className="w-full lg:w-auto mt-4 lg:mt-0 flex flex-col lg:absolute lg:right-4 lg:top-4 text-left lg:text-right items-start lg:items-end">
          {/* Booking ID */}
          <p className="text-sm text-gray-500">
            Booking ID:{" "}
            <span className="px-2 py-1 font-semibold text-sm">
              {booking.booking_reference_id}
            </span>
          </p>

          {/* Booking Status */}
          <p
            className={`font-semibold text-sm ${
              statusColors[booking.booking_status] || "text-gray-500"
            }`}
          >
            {booking.booking_status.charAt(0).toUpperCase() +
              booking.booking_status.slice(1)}
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-end gap-2 w-full">
            {/* Cancel Booking Button */}
            {(booking?.booking_status === "confirmed" ||
              booking?.booking_status === "unconfirmed") && (
              <div className="w-full lg:w-auto">
                <NcModal
                  contentExtraClass="w-full md:w-1/4"
                  renderTrigger={(openModal) => (
                    <Button
                      onClick={() => openModal()}
                      sizeClass="px-4 py-2"
                      fontSize="text-sm"
                      className="w-full lg:w-auto border rounded-lg text-red-500 border-red-300 hover:bg-red-100"
                    >
                      Cancel booking
                    </Button>
                  )}
                  renderContent={(closeModal) => (
                    <ModalCancelBooking
                      closeModal={closeModal}
                      bookingId={booking?.ulid || ""}
                    />
                  )}
                  modalTitle={"Information"}
                />
              </div>
            )}

            {/* Download Voucher Button */}
            {(booking?.booking_status === "confirmed" ||
              booking?.booking_status === "completed") && (
              <ButtonPrimary
                loading={isLoadingDownload}
                onClick={async () => {
                  try {
                    await handleDownload(booking?.ulid);
                  } catch (err: any) {
                    toast({
                      className: cn(
                        "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"
                      ),
                      title: "Error",
                      description: err?.message || "Failed to download ticket",
                      variant: "destructive",
                      duration: 5000,
                    });
                  }
                }}
                fontSize="text-sm"
                sizeClass="px-4 py-2"
                className="w-full lg:w-auto border rounded-lg"
              >
                Download voucher
              </ButtonPrimary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
