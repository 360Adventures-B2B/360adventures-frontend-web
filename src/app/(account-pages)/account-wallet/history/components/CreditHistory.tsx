"use client";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import CreditHistoryTable from "./CreditHistoryTable";
import Pagination from "@/shared/Pagination";
import { useSearchParams } from "next/navigation";
import {
  useExportExcelMutation,
  useExportPdfMutation,
  useGetCreditHistoriesQuery,
} from "@/lib/services/creditHistoryService";
import TableMobileSkeleton from "@/components/skeleton/TableMobileSkeleton";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import NcModal from "@/shared/NcModal";
import ModalExportCreditHistory from "./ModalExportCreditHistory";
import ModalFilter from "./ModalFilter";

const CreditHistory: React.FC<{}> = () => {
  const options = ["All", "Topup", "Payment", "Refund"];
  const searchParams = useSearchParams();

  const page = parseInt(searchParams?.get("page") || "1");

  const [maxVisible, setMaxVisible] = useState(3);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedType = options[selectedIndex];

  const type =
    selectedType.toLowerCase() === "all" ? "" : selectedType.toLowerCase();

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const openModalFilter = () => setIsFilterModalOpen(true);
  const closeModalFilter = () => setIsFilterModalOpen(false);

  const [isExportExcelModal, setIsExportExcelModal] = useState(false);
  const openModalExportExcel = () => setIsExportExcelModal(true);
  const closeModalExportExcel = () => setIsExportExcelModal(false);

  const [exportExcel, { isLoading: isExportingExcel }] =
    useExportExcelMutation();
  const [exportPdf, { isLoading: isExportingPdf }] = useExportPdfMutation();

  const [isExportPdfModal, setIsExportPdfModal] = useState(false);
  const openModalExportPdf = () => setIsExportPdfModal(true);
  const closeModalExportPdf = () => setIsExportPdfModal(false);

  const {
    data: creditHistories,
    error: creditHistoriesError,
    isLoading: isCreditHistoriesLoading,
    isFetching: isCreditHistoriesFetching,
  } = useGetCreditHistoriesQuery(
    {
      page,
      limit: 10,
      type:
        selectedType.toLowerCase() === "all" ? "" : selectedType.toLowerCase(),
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
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
      <div className="relative">
        <div className="absolute right-0 top-0 hidden md:flex gap-2 mb-5">
          {/* Tombol Filter */}
          <div
            onClick={openModalFilter}
            className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer gap-2"
          >
            <i className="las la-filter text-lg"></i>
            <span>Filters</span>
          </div>

          {/* Tombol Export Excel */}
          <div
            onClick={openModalExportExcel}
            className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-green-500 bg-green-50 text-green-700 focus:outline-none cursor-pointer gap-2"
          >
            <i className="las la-file-excel text-lg"></i>
            <span>Export Excel</span>
          </div>

          <div
            onClick={openModalExportPdf}
            className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-red-500 bg-red-50 text-red-700 focus:outline-none cursor-pointer gap-2"
          >
            <i className="las la-file-pdf text-lg"></i>
            <span>Export PDF</span>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden flex flex-wrap gap-2 mb-5">
          {/* Tombol Filter */}
          <div
            onClick={openModalFilter}
            className="inline-flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer gap-2"
          >
            <i className="las la-filter text-lg"></i>
            <span>Filters</span>
          </div>

          {/* Tombol Export Excel */}
          <div
            onClick={openModalExportExcel}
            className="inline-flex items-center justify-center px-4 py-2 text-sm rounded-full border border-green-500 bg-green-50 text-green-700 focus:outline-none cursor-pointer gap-2"
          >
            <i className="las la-file-excel text-lg"></i>
            <span>Export Excel</span>
          </div>

          {/* Tombol Export PDF */}
          <div
            onClick={openModalExportPdf}
            className="inline-flex items-center justify-center px-4 py-2 text-sm rounded-full border border-red-500 bg-red-50 text-red-700 focus:outline-none cursor-pointer gap-2"
          >
            <i className="las la-file-pdf text-lg"></i>
            <span>Export PDF</span>
          </div>
        </div>

        <div className="hidden">
          {/* NcModal - shared instance */}
          {/* Modal Filter */}
          <NcModal
            triggerText=""
            isOpenProp={isFilterModalOpen}
            onCloseModal={closeModalFilter}
            modalTitle="Filter Transaction"
            contentExtraClass="w-full md:w-1/2"
            renderContent={(closeModal) => (
              <ModalFilter
                initialFilters={{ fromDate, toDate }}
                onApply={(filters) => {
                  setFromDate(filters.fromDate);
                  setToDate(filters.toDate);
                  closeModal();
                }}
              />
            )}
          />

          {/* Modal Export Excel */}
          <NcModal
            triggerText=""
            isOpenProp={isExportExcelModal}
            onCloseModal={closeModalExportExcel}
            modalTitle="Export Excel"
            contentExtraClass="w-full md:w-1/2"
            renderContent={(closeModal) => (
              <ModalExportCreditHistory
                isLoadingButton={isExportingExcel}
                initialFilters={{ fromDate, toDate, type }}
                onExport={async ({ fromDate, toDate, type }) => {
                  try {
                    const resBlob = await exportExcel({
                      from: fromDate,
                      to: toDate,
                      type: type || undefined,
                    }).unwrap();

                    if (
                      !resBlob.type.includes(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      )
                    ) {
                      const text = await resBlob.text();
                      const errorData = JSON.parse(text);
                      console.error(
                        "Export failed:",
                        errorData.message || errorData
                      );
                      alert(
                        "Export failed: " +
                          (errorData.message || "Unknown error")
                      );
                      return;
                    }

                    const url = window.URL.createObjectURL(resBlob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "transaction_report.xlsx";
                    link.click();
                    window.URL.revokeObjectURL(url);
                    closeModalExportExcel();
                  } catch (error) {
                    console.error("Export Excel failed", error);
                    alert("Export failed. Please try again.");
                  }
                }}
              />
            )}
          />

          <NcModal
            triggerText=""
            isOpenProp={isExportPdfModal}
            onCloseModal={closeModalExportPdf}
            modalTitle="Export PDF"
            contentExtraClass="w-full md:w-1/2"
            renderContent={(closeModal) => (
              <ModalExportCreditHistory
                isLoadingButton={isExportingPdf}
                initialFilters={{ fromDate, toDate, type }}
                onExport={async ({ fromDate, toDate, type }) => {
                  try {
                    const resBlob = await exportPdf({
                      from: fromDate,
                      to: toDate,
                      type: type || undefined,
                    }).unwrap();

                    if (!resBlob.type.includes("application/pdf")) {
                      const text = await resBlob.text();
                      const errorData = JSON.parse(text);
                      alert(
                        "Export failed: " +
                          (errorData.message || "Unknown error")
                      );
                      return;
                    }

                    const url = window.URL.createObjectURL(resBlob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "transaction_report.pdf";
                    link.click();
                    window.URL.revokeObjectURL(url);
                    closeModalExportExcel();
                  } catch (error) {
                    console.error("Export Excel failed", error);
                    alert("Export failed. Please try again.");
                  }
                }}
              />
            )}
          />
        </div>
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
                        <Pagination
                          totalPages={
                            creditHistories?.pagination.last_page || 1
                          }
                          maxVisiblePaging={maxVisible}
                        />
                      </div>
                    )}
                  </>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default CreditHistory;
