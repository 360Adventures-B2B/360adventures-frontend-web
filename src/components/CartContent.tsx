"use client";

import React, { useState } from "react";
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

export interface CartContentProps {
  onClickClose?: () => void;
}

const CartContent: React.FC<CartContentProps> = ({ onClickClose }) => {
  const { data: carts, isLoading } = useGetCartsQuery();
  const router = useRouter();

  const [checkoutCart, { isLoading: isLoadingCheckoutCart, isError }] = useCheckoutCartMutation();

  const cartItems = carts?.data || [];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    setSelectedItems(isAllSelected ? [] : cartItems.map((item) => Number(item.id)));
  };

  const total = cartItems.reduce((sum, cart) => {
    if (!selectedItems.includes(Number(cart.id))) return sum;

    const personTotal = cart.person_types?.reduce((subTotal, person) => {
      return subTotal + (person.guest > 0 ? (person.price || 0) * person.guest : 0);
    }, 0);

    return sum + personTotal;
  }, 0);

  const handleCheckout = async () => {
    try {
      if (selectedItems.length > 0) {
        const res = await checkoutCart(selectedItems).unwrap();
        if (res.code === 200) {
          router.push(`/checkout?order_id=${res.order_id}`);
          // toast({
          //   className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          //   title: "Success",
          //   description: "Success Add Cart!",
          //   variant: "success",
          //   duration: 2000,
          // });
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleCheckout ~ error:", error);
    }
  };

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
                <li
                  key={item.id}
                  className="cart-item mb-5 pb-5 flex items-start overflow-hidden border-b border-[#e9e9e9]"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id || 0)}
                    onChange={() => toggleSelectItem(item.id || 0)}
                    className="mr-3 w-5 h-5 rounded-md appearance-none border border-gray-400 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 cursor-pointer"
                  />

                  {/* Image */}
                  <a href="#" className="cart-item-image flex-shrink-0 w-[85px] h-[85px]">
                    <img
                      alt={item?.package?.product?.name ?? ""}
                      className="w-full h-full rounded-md object-cover object-top"
                      src={(item?.package?.product?.product_galleries?.[0] as string) || ""}
                    />
                  </a>

                  {/* Details */}
                  <div className="cart-item-details relative flex-1 ml-4 grow-[1] pr-6">
                    {/* Tour Name */}
                    <a href="product-left-sidebar.html" className="cart-item-title block text-lg font-normal">
                      {item?.package?.product?.name}
                    </a>

                    {/* Package Name */}
                    <p className="pkgName text-sm text-[#444] mt-1">{item?.package?.name}</p>

                    {/* Start Date */}
                    <p className="startDate text-sm text-[#444] mt-1">
                      <i className="las la-calendar-alt"></i> {item?.start_date && formatDate(item?.start_date)}
                    </p>

                    {/* Guest Details */}
                    <p className="guestDetails text-sm text-[#444] mt-1">
                      <i className="las la-user-friends"></i>{" "}
                      {item?.person_types
                        ?.filter((person_type) => person_type.guest > 0)
                        .map((person_type, index, filteredArray) => (
                          <span key={index}>
                            {person_type.guest} {person_type.name}
                            {index < filteredArray.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </p>

                    {/* Total Price */}
                    <p className="totalPrice text-sm text-[#444] mt-1 font-bold">
                      Total: {formatNumber(calculateTotalPersonType(item?.person_types))}
                    </p>

                    {/* Remove Item */}
                    <NcModal
                      contentExtraClass="w-full md:w-1/4"
                      renderTrigger={(openModal) => (
                        <a
                          onClick={() => openModal()}
                          className="remove-item absolute top-0 right-1 text-lg text-[#fb5555]"
                        >
                          <i className="las la-trash"></i>
                        </a>
                      )}
                      renderContent={(closeModal) => <ModalDeleteCart closeModal={closeModal} cartId={item?.id || 0} />}
                      modalTitle={"Information"}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Sticky */}
          <div className="cart-footer fixed bottom-0 left-0 w-full bg-white dark:bg-neutral-900 z-50 p-4 border-t border-[#e9e9e9]">
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
