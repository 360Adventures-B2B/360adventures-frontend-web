"use client";

import React, { useEffect, useState } from "react";
import ButtonClose from "@/shared/ButtonClose";
import NcModal from "@/shared/NcModal";
import ModalDeleteCart from "./ModalDeleteCart";
import { useCheckoutCartMutation, useGetCartsQuery } from "@/lib/services/cartService";
import { formatDate, formatDateString } from "@/utils/dateHelper";
import { calculateTotalPersonType } from "@/utils/calculateTotalPersonType";
import { formatNumber } from "@/utils/currencyConverter";
import EmptyCart from "./EmptyCart";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CartItem from "./CartItem";

export interface CartContentProps {
  onClickClose?: () => void;
}

const CartContent: React.FC<CartContentProps> = ({ onClickClose }) => {
  const { data: carts, isLoading } = useGetCartsQuery();
  const router = useRouter();

  // const [checkoutCart, { isLoading: isLoadingCheckoutCart, isError }] = useCheckoutCartMutation();

  const cartItems = carts?.data || [];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  const [isLoadingCheckoutCart, setLoadingCheckoutCart] = useState(false);

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    setSelectedItems(isAllSelected ? [] : cartItems.map((item) => item.ulid));
  };

  const total = cartItems.reduce((sum, cart) => {
    if (!selectedItems.includes(cart.ulid)) return sum;

    // Temukan item berdasarkan ulid
    const foundItem = cartItems.find((item) => item.ulid === cart.ulid);

    // Jika ditemukan, tambahkan total_price ke sum
    if (foundItem) {
      return sum + (foundItem.total_price || 0);
    }

    return sum;
  }, 0);

  const handleCheckout = async () => {
    if (selectedItems.length > 0) {
      // Tampilkan loading
      setLoadingCheckoutCart(true);

      // Simpan selectedItems ke sessionStorage
      sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));

      // Redirect ke halaman /checkout menggunakan Next.js router
      window.location.href = "/checkout";
    }
  };

  // useEffect(() => {
  //   getCart();
  // }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-neutral-900">
      {/* Header Sticky */}
      <div className="cart-header sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b border-[#e9e9e9] py-4 px-5">
        <div className="flex justify-between items-center">
          <h6 className="m-0 text-xl font-bold text-[#2b2b2d]">My Cart</h6>
          <ButtonClose onClick={onClickClose} />
        </div>
      </div>

      {cartItems.length > 0 ? (
        <>
          {/* Content Area */}
          <div className="cart-container flex-grow overflow-y-auto py-6 px-5">
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="w-5 h-5 rounded-md appearance-none border border-gray-400 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 cursor-pointer"
              />
              <label className="ml-3 font-bold text-gray-700 cursor-pointer">Select All</label>
            </div>
            <ul className="cart-items">
              {carts?.data?.map((item) => (
                <CartItem
                  key={item.ulid}
                  item={item}
                  selectedItems={selectedItems}
                  toggleSelectItem={toggleSelectItem}
                />
              ))}
            </ul>
          </div>

          {/* Footer Sticky */}
          <div className="cart-footer sticky bottom-10 sm:bottom-0 bg-white dark:bg-neutral-900 z-10 p-4 border-t border-[#e9e9e9]">
            <div className="cart-summary mb-2 flex justify-between">
              <table className="table cart-table w-full">
                <tbody>
                  <tr>
                    <td className="text-left text-lg text-black">Total :</td>
                    <td className="text-right text-lg text-black font-bold">{formatNumber(total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart-buttons flex justify-between">
              <ButtonPrimary
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
                loading={isLoadingCheckoutCart}
                className={`w-full checkout-btn h-[40px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] capitalize leading-[1.2] border rounded-md flex items-center justify-center ${
                  selectedItems.length > 0
                    ? "bg-primary-6000 hover:bg-primary-700 text-white"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
              >
                Checkout
              </ButtonPrimary>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartContent;
