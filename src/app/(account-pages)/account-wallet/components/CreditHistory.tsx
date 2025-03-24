"use client";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import CreditHistoryTable from "./CreditHistoryTable";
import Pagination from "@/shared/Pagination";

const dummyData: CreditHistoryItem[] = [
  {
    date: "2025-03-20 10:00:00",
    information: "Checkout",
    productName: "Product A",
    type: "Payment",
    amount: -50.0,
  },
  {
    date: "2025-03-19 09:15:00",
    information: "Topup",
    productName: "",
    type: "Topup",
    amount: 100.0,
  },
  {
    date: "2025-03-18 17:45:00",
    information: "Refund",
    productName: "Product B",
    type: "Payment",
    amount: -20.0,
  },
];

type CreditHistoryItem = {
  date: string;
  information: string;
  productName?: string;
  type: "Payment" | "Topup";
  amount: number;
};

const CreditHistory: React.FC<{}> = () => {
  let [options] = useState(["All", "Topup", "Payment", "Refund"]);

  const [maxVisible, setMaxVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setMaxVisible(window.innerWidth <= 768 ? 2 : 5);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex space-x-1 overflow-x-auto w-full">
          {options.map((item) => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none transition-colors ${
                    selected
                      ? "bg-primary-6000 text-primary-50"
                      : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {item}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {options.map((item, index) => (
            <Tab.Panel key={index} className="mt-8">
              <CreditHistoryTable data={dummyData} />

              <div className="text-center pt-10">
                <Pagination totalPages={20} maxVisiblePaging={maxVisible} />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default CreditHistory;
