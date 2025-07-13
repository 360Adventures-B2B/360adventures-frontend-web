"use client";
import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Pagination from "@/shared/Pagination";
import TopupRequestTable from "./TopupRequestTable";
import { useGetTopupRequestQuery } from "@/lib/services/topupService";
import { useSearchParams } from "next/navigation";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import TableMobileSkeleton from "@/components/skeleton/TableMobileSkeleton";

const TopupRequest: React.FC<{}> = () => {
  const options = ["All", "Pending", "Success", "Reject"];
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedStatus = options[selectedIndex];

  const {
    data: topupRequests,
    error: topupRequestError,
    isLoading: isTopuRequestLoading,
    isFetching: isTopuRequestFetching,
  } = useGetTopupRequestQuery(
    { page, limit: 10, status: selectedStatus.toLowerCase() },
    { refetchOnMountOrArgChange: true }
  );

  const [maxVisible, setMaxVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setMaxVisible(window.innerWidth <= 768 ? 2 : 5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize(); // set awal

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
            {isTopuRequestLoading || isTopuRequestFetching ? (
              <>
                <div className="sm:hidden">
                  <TableMobileSkeleton rows={5} />
                </div>
                <div className="hidden sm:block">
                  <TableSkeleton columns={7} rows={5} />
                </div>
              </>
            ) : (
              <>
                <TopupRequestTable data={topupRequests?.data} />

                {topupRequests?.pagination?.last_page > 1 && (
                  <div className="text-center pt-10">
                    <Pagination totalPages={topupRequests.pagination.last_page || 1} maxVisiblePaging={maxVisible} />
                  </div>
                )}
              </>
            )}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TopupRequest;
