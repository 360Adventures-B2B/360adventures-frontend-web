"use client";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import CreditHistoryTable from "./CreditHistoryTable";
import Pagination from "@/shared/Pagination";
import { useSearchParams } from "next/navigation";
import { useGetCreditHistoriesQuery } from "@/lib/services/creditHistoryService";
import TableMobileSkeleton from "@/components/skeleton/TableMobileSkeleton";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

const CreditHistory: React.FC<{}> = () => {
  const options = ["All", "Topup", "Payment", "Refund"];
  const searchParams = useSearchParams();

  const page = parseInt(searchParams?.get("page") || "1");

  const [maxVisible, setMaxVisible] = useState(3);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedType = options[selectedIndex];

  const {
    data: creditHistories,
    error: creditHistoriesError,
    isLoading: isCreditHistoriesLoading,
    isFetching: isCreditHistoriesFetching,
  } = useGetCreditHistoriesQuery(
    {
      page,
      limit: 10,
      type: selectedType.toLowerCase() === "all" ? "" : selectedType.toLowerCase(),
    },
    { refetchOnMountOrArgChange: true }
  );

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
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 overflow-x-auto w-full">
          {options.map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                `flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none transition-colors ${
                  selected
                    ? "bg-primary-6000 text-primary-50"
                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`
              }
            >
              {item}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {options.map((item, index) => (
            <Tab.Panel key={index} className="mt-8">
              {isCreditHistoriesLoading || isCreditHistoriesFetching ? (
                <>
                  <div className="sm:hidden">
                    <TableMobileSkeleton rows={5} />
                  </div>

                  <div className="hidden sm:block">
                    <TableSkeleton columns={5} rows={5} />
                  </div>
                </>
              ) : (
                <>
                  <CreditHistoryTable data={creditHistories?.data} />
                  {creditHistories?.pagination?.last_page > 1 && (
                    <div className="text-center pt-10">
                      <Pagination totalPages={creditHistories?.pagination.last_page || 1} maxVisiblePaging={maxVisible} />
                    </div>
                  )}
                </>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default CreditHistory;
