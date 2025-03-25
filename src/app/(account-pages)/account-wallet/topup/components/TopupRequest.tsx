"use client";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Pagination from "@/shared/Pagination";
import TopupRequestTable from "./TopupRequestTable";
import { ITopupRequest } from "@/interfaces/TopupRequest";

const dummyData: ITopupRequest[] = [
  {
    agent_id: 101,
    bank_id: 5,
    reference_id: "REF123456",
    amount: 500000,
    fee_credit_card: 15000,
    point_earned: 50,
    last_amount: 500000,
    after_amount: 485000,
    status: "success",
    payment_method: "payment_gateway",
    transfer_slip: "https://example.com/slip1.jpg",
    created_at: "2023-09-19 12:00:00",
    updated_at: "2023-09-19 12:30:00",
  },
  {
    agent_id: 102,
    bank_id: 3,
    reference_id: "REF789012",
    amount: 300000,
    fee_credit_card: 10000,
    point_earned: 30,
    last_amount: 300000,
    after_amount: 290000,
    status: "pending",
    payment_method: "bank_transfer",
    transfer_slip: null,
    created_at: "2023-09-19 13:00:00",
    updated_at: "2023-09-19 13:15:00",
  },
  {
    agent_id: 103,
    bank_id: 7,
    reference_id: "REF345678",
    amount: 750000,
    fee_credit_card: 20000,
    point_earned: 75,
    last_amount: 750000,
    after_amount: 730000,
    status: "reject",
    payment_method: "qr_code",
    transfer_slip: "https://example.com/slip2.jpg",
    created_at: "2023-09-19 14:00:00",
    updated_at: "2023-09-19 14:45:00",
  },
];

const TopupRequest: React.FC<{}> = () => {
  let [options] = useState(["All", "Pending", "Success", "Reject"]);

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
              <TopupRequestTable data={dummyData} />

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

export default TopupRequest;
