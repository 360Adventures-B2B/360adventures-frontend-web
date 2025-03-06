import React, { useState, Fragment, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import NavMobile from "@/shared/Navigation/NavMobile";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import CartContent from "./CartContent";
import { useGetCartsQuery } from "@/lib/services/cartService";

export interface CartMenuProps {
  className?: string;
  iconClassName?: string;
  cartCount?: number;
}
const CartMenu: React.FC<CartMenuProps> = ({
  className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
  iconClassName = "h-8 w-8",
  cartCount = 2,
}) => {
  const [isVisable, setIsVisable] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsVisable(false);
  }, [pathname]);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const { data: carts, isLoading } = useGetCartsQuery();

  const totalItemCarts = (carts?.data && carts?.data?.length) || 0;

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog as="div" className="relative z-50 overflow-hidden" onClose={handleCloseMenu}>
          <Transition.Child
            as={Fragment}
            enter=" duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 dark:bg-black/70" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex justify-end min-h-full ">
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 transform"
                enterFrom="opacity-0 translate-x-56"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-56"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all ">
                  <CartContent onClickClose={handleCloseMenu} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button
        onClick={handleOpenMenu}
        className={`relative focus:outline-none flex items-center justify-center ${className}`}
      >
        {/* Icon Shopping Cart */}
        <div className="relative">
          <ShoppingCartIcon className={`${iconClassName}`} />

          {/* Badge jumlah item di sudut kanan atas ikon */}
          <span
            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full 
            shadow-md flex items-center justify-center min-w-[18px] min-h-[18px] leading-none"
          >
            {totalItemCarts}
          </span>
        </div>
      </button>

      {renderContent()}
    </>
  );
};

export default CartMenu;
