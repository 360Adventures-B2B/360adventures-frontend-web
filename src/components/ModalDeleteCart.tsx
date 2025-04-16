import { toast } from "@/hooks/use-toast";
import { useDeleteCartMutation } from "@/lib/services/cartService";
import { cn } from "@/lib/utils";
import ButtonPrimary from "@/shared/ButtonPrimary";
import React from "react";

interface ModalDeleteCartProps {
  cartId: string;
  closeModal: () => void;
}

export default function ModalDeleteCart({ cartId, closeModal }: ModalDeleteCartProps) {
  const [deleteCart, { isLoading, isError }] = useDeleteCartMutation();

  const handleDeleteCart = async () => {
    try {
      const res = await deleteCart({
        ids: [cartId],
      }).unwrap();
      if (res.code === 200) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Success Delete Cart!",
          variant: "success",
          duration: 2000,
        });
        closeModal();
      }
    } catch (error) {
      console.log("🚀 ~ handleDeleteCart ~ error:", error);
    }
  };
  return (
    <div>
      <div className="text-center text-gray-800 text-lg font-medium">Do you want to delete it?</div>
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
          onClick={handleDeleteCart}
        >
          Confirm
        </ButtonPrimary>
      </div>
    </div>
  );
}
