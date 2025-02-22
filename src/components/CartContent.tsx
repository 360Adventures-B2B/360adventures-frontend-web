"use client";

import React, { useState } from "react";
import ButtonClose from "@/shared/ButtonClose";
import NcModal from "@/shared/NcModal";
import ModalDeleteCart from "./ModalDeleteCart";

export interface CartContentProps {
  onClickClose?: () => void;
}

const CartContent: React.FC<CartContentProps> = ({ onClickClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Eiffel Tower Tour",
      package: "VIP Access + Sunset View",
      startDate: "27 Feb 2025",
      price: 56,
      quantity: 2,
      image: "https://picsum.photos/200/300?random=1",
      guests: [{ type: "Dewasa", count: 2 }],
    },
    {
      id: 2,
      name: "Great Wall of China Tickets",
      package: "Full-Day Guided Tour",
      startDate: "15 Mar 2025",
      price: 75,
      quantity: 1,
      image: "https://picsum.photos/200/300?random=2",
      guests: [
        { type: "Dewasa", count: 1 },
        { type: "Anak", count: 1 },
      ],
    },
    {
      id: 3,
      name: "Safari Park Attraction",
      package: "Family Package",
      startDate: "10 Apr 2025",
      price: 48,
      quantity: 3,
      image: "https://picsum.photos/200/300?random=3",
      guests: [
        { type: "Dewasa", count: 2 },
        { type: "Anak", count: 1 },
      ],
    },
    {
      id: 4,
      name: "Bali Snorkeling Adventure",
      package: "All-Inclusive Experience",
      startDate: "05 May 2025",
      price: 65,
      quantity: 1,
      image: "https://picsum.photos/200/300?random=4",
      guests: [{ type: "Dewasa", count: 1 }],
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const isAllSelected = selectedItems.length === cartItems.length;

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    setSelectedItems(isAllSelected ? [] : cartItems.map((item) => item.id));
  };

  const total = cartItems.reduce((sum, item) => {
    return selectedItems.includes(item.id) ? sum + item.price * item.quantity : sum;
  }, 0);

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-neutral-900">
      {/* Header Sticky */}
      <div className="cart-header sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b border-[#e9e9e9] py-4 px-5">
        <div className="flex justify-between items-center">
          <h6 className="m-0 text-xl font-bold text-[#2b2b2d]">My Cart</h6>
          <ButtonClose onClick={onClickClose} />
        </div>
      </div>

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
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="cart-item mb-5 pb-5 flex items-start overflow-hidden border-b border-[#e9e9e9]"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelectItem(item.id)}
                className="mr-3 w-5 h-5 rounded-md appearance-none border border-gray-400 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 cursor-pointer"
              />

              {/* Image */}
              <a href="product-left-sidebar.html" className="cart-item-image grow-[1] basis-[25%]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[85px] h-[85px] rounded-md object-cover object-top"
                />
              </a>

              {/* Details */}
              <div className="cart-item-details relative grow-[1] basis-[70%]">
                {/* Tour Name */}
                <a href="product-left-sidebar.html" className="cart-item-title block text-lg font-normal">
                  {item.name}
                </a>

                {/* Package Name */}
                <p className="pkgName text-sm text-[#444] mt-1">{item.package}</p>

                {/* Start Date */}
                <p className="startDate text-sm text-[#444] mt-1">
                  <i className="las la-calendar-alt"></i> {item.startDate}
                </p>

                {/* Guest Details */}
                <p className="guestDetails text-sm text-[#444] mt-1">
                  <i className="las la-user-friends"></i>{" "}
                  {item.guests.map((guest, index) => (
                    <span key={index}>
                      {guest.count} {guest.type}
                      {index < item.guests.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                {/* Total Price */}
                <p className="totalPrice text-sm text-[#444] mt-1 font-bold">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Remove Item */}

                <NcModal
                  contentExtraClass="w-1/4"
                  renderTrigger={(openModal) => (
                    <a
                      onClick={() => openModal()}
                      className="remove-item absolute top-0 right-0 text-lg text-[#fb5555]"
                    >
                      <i className="las la-trash"></i>
                    </a>
                  )}
                  renderContent={(closeModal) => <ModalDeleteCart closeModal={closeModal} cartId={item.id} />}
                  modalTitle={"Information"}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Sticky */}
      <div className="cart-footer sticky bottom-0 bg-white dark:bg-neutral-900 z-10 p-4 border-t border-[#e9e9e9]">
        <div className="cart-summary mb-2 flex justify-between">
          <table className="table cart-table w-full">
            <tbody>
              <tr>
                <td className="text-left text-lg text-black">Total :</td>
                <td className="text-right text-lg text-black font-bold">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart-buttons flex justify-between">
          <button
            disabled={selectedItems.length === 0}
            onClick={() => {
              if (selectedItems.length > 0) {
                window.location.href = "/checkout";
              }
            }}
            className={`w-full checkout-btn h-[40px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] capitalize leading-[1.2] border rounded-md flex items-center justify-center ${
              selectedItems.length > 0
                ? "bg-primary-6000 hover:bg-primary-700 text-white"
                : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
