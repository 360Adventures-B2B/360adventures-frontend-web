import React from "react";

interface ModalDeleteCartProps {
  cartId: number;
  closeModal: () => void;
}

export default function ModalDeleteCart({ cartId, closeModal }: ModalDeleteCartProps) {
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
        <button
          type="button"
          className="px-4 py-2 bg-primary-6000 text-white rounded-lg hover:bg-primary-700 ml-4"
          // onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
