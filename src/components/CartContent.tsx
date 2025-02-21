"use client";

import React, { useState } from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import SocialsList from "@/shared/SocialsList";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import LangDropdown from "@/app/(client-components)/(Header)/LangDropdown";

export interface CartContentProps {
  onClickClose?: () => void;
}

const CartContent: React.FC<CartContentProps> = ({ onClickClose }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Eiffel Tower Tour", price: 56, quantity: 1, image: "assets/img/product/4.jpg" },
    { id: 2, name: "Great Wall of China Tickets", price: 75, quantity: 1, image: "assets/img/product/2.jpg" },
    { id: 3, name: "Safari Park Attraction", price: 48, quantity: 1, image: "assets/img/product/3.jpg" },
    { id: 4, name: "Safari Park Attraction", price: 48, quantity: 1, image: "assets/img/product/3.jpg" },
    { id: 5, name: "Safari Park Attraction", price: 48, quantity: 1, image: "assets/img/product/3.jpg" },
    { id: 6, name: "Safari Park Attraction", price: 48, quantity: 1, image: "assets/img/product/3.jpg" },
  ]);

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-neutral-900">
      {/* Header Sticky */}
      <div className="cart-header sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b border-[#e9e9e9] py-4 px-5">
        <div className="flex justify-between items-center">
          <h6 className="m-0 text-xl font-bold text-[#2b2b2d]">My Cart</h6>
          <button type="button" className="close-cart text-[#fb5555] text-2xl font-extrabold bg-none border-0">
            ×
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="cart-container flex-grow overflow-y-auto py-6 px-5">
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item mb-5 pb-5 flex overflow-hidden border-b border-[#e9e9e9]">
              <a href="product-left-sidebar.html" className="cart-item-image m-auto grow-[1] basis-[20%]">
                <img src={item.image} alt={item.name} className="max-w-full rounded-md" />
              </a>
              <div className="cart-item-details pl-4 relative grow-[1] basis-[70%]">
                <a href="product-left-sidebar.html" className="cart-item-title text-ellipsis block text-lg font-normal">
                  {item.name}
                </a>
                <span className="cart-item-price mt-1 text-sm block">
                  <span className="text-[#777] font-bold text-lg">${item.price.toFixed(2)}</span> per ticket
                </span>
                <div className="cart-item-quantity mt-1">
                  <div className="quantity-controls w-[80px] h-[30px] relative overflow-hidden flex bg-white border border-[#e9e9e9] rounded-md items-center justify-between">
                    <button
                      type="button"
                      className="increase-quantity h-[25px] w-[25px] mt-[-2px] border-0 bg-transparent flex justify-center items-center"
                    >
                      +
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="quantity w-[30px] text-[#444] text-center"
                    />
                    <button
                      type="button"
                      className="decrease-quantity h-[25px] w-[25px] mt-[-2px] border-0 bg-transparent flex justify-center items-center"
                    >
                      -
                    </button>
                  </div>
                </div>
                <a href="javascript:void(0)" className="remove-item absolute top-0 right-0 text-lg text-[#fb5555]">
                  ×
                </a>
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
                <td className="text-left text-lg text-black">Sub-Total :</td>
                <td className="text-right text-sm text-black font-bold">${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="text-left text-lg text-black">VAT (20%) :</td>
                <td className="text-right text-sm text-black font-bold">${vat.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="text-left text-lg text-black">Total :</td>
                <td className="text-right text-sm text-black font-bold">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart-buttons flex justify-between">
          <a
            href="checkout.html"
            className="w-full checkout-btn h-[40px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] capitalize leading-[1.2] bg-white text-[#64b496] border border-[#64b496] rounded-md flex items-center justify-center hover:bg-[#64b496] hover:text-white"
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
