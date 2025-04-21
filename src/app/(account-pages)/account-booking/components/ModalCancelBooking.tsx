import { toast } from "@/hooks/use-toast";
import { useCancelBookingMutation } from "@/lib/services/bookingService";
import { cn } from "@/lib/utils";
import ButtonPrimary from "@/shared/ButtonPrimary";
import React from "react";

interface ModalCancelBookingProps {
  bookingId: string;
  closeModal: () => void;
}

export default function ModalCancelBooking({ bookingId, closeModal }: ModalCancelBookingProps) {
  const [cancelBooking, { isLoading, isError }] = useCancelBookingMutation();

  const handleCancelBooking = async () => {
    try {
      const res = await cancelBooking(bookingId).unwrap();
      console.log("🚀 ~ handleCancelBooking ~ res:", res);
        if (res.code === 200) {
          toast({
            className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
            title: "Success",
            description: "Success Cancel Booking!",
            variant: "success",
            duration: 2000,
          });
          closeModal();
        }
    } catch (error) {
      console.log("🚀 ~ handleCancelBooking ~ error:", error);
    }
  };
  return (
    <div>
      <div className="text-center text-gray-800 text-lg font-medium">Do you want to cancel booking it?</div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={closeModal}
        >
          Cancel
        </button>
        <ButtonPrimary
          loading={isLoading}
          type="button"
          className="px-4 py-2 bg-primary-6000 text-white rounded-lg hover:bg-primary-700 ml-4"
          onClick={handleCancelBooking}
        >
          Confirm
        </ButtonPrimary>
      </div>
    </div>
  );
}
