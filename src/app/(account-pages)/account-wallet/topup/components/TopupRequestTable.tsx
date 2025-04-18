import { ITopupRequest } from "@/interfaces/TopupRequest";
import NcModal from "@/shared/NcModal";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDateTime } from "@/utils/dateHelper";
import React, { useState } from "react";
import TopupDetail from "./TopupDetail";

type TopupRequestTableProps = {
  data: ITopupRequest[];
};

const TopupRequestTable: React.FC<TopupRequestTableProps> = ({ data }) => {
  const formatAmount = (amount: number) => {
    const formattedAmount = Math.abs(amount).toLocaleString("en-US");

    return amount < 0 ? (
      <span className="text-red-500">-{formattedAmount}</span>
    ) : (
      <span className="text-green-500">+{formattedAmount}</span>
    );
  };
  const [selectedData, setSelectedData] = useState(null);

  const handleDetail = (item: ITopupRequest) => {
    setSelectedData(item);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-300 text-yellow-800",
      success: "bg-green-300 text-green-800",
      reject: "bg-red-300 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center justify-center h-8 px-4 text-xs sm:text-sm font-medium rounded-full ${
          statusColors[status] || "bg-gray-300 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const PaymentMethodCell = ({ paymentMethod }: { paymentMethod: string }) => {
    const paymentLabels: Record<string, string> = {
      payment_gateway: "Payment Gateway",
      bank_transfer: "Bank Transfer",
      qr_code: "QR Code",
    };
    return <p className="text-xs sm:text-sm sm:px-4 sm:py-3">{paymentLabels[paymentMethod] || paymentMethod}</p>;
  };

  return (
    <div className="overflow-x-auto">
      {/* Mobile view */}
      <div className="block sm:hidden">
        {(data?.length ?? 0) === 0 ? (
          <div className="text-center text-gray-500 py-6">No Data Available</div>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-6 transition-all hover:shadow-xl"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Reference ID:</span>
                <span className="text-xs sm:text-sm text-gray-600">{item.reference_id}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Date:</span>
                <span className="text-xs sm:text-sm text-gray-600">{formatDateTime(item.created_at)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Status:</span>
                <span className="text-xs sm:text-sm">
                  <span
                    className={`block sm:hidden font-semibold ${
                      item.status === "success"
                        ? "text-green-600"
                        : item.status === "pending"
                        ? "text-yellow-500"
                        : item.status === "reject"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Amount:</span>
                <span className="text-xs sm:text-sm text-gray-600">
                  {formatNumber((item.amount || 0) + (item.fee_credit_card || 0))}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Point Earn:</span>
                <span className="text-xs sm:text-sm text-gray-600">{formatAmount(item.point_earn)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm sm:text-base font-semibold text-gray-700">Payment Method:</span>
                <span className="text-xs sm:text-sm text-gray-600">
                  <PaymentMethodCell paymentMethod={item.payment_method} />
                </span>
              </div>
              <div className="text-center mt-4">
                <NcModal
                  contentExtraClass="w-full md:w-1/2"
                  renderTrigger={(openModal) => (
                    <button
                      onClick={() => {
                        handleDetail(item);
                        openModal();
                      }}
                      className="bg-primary-6000 text-white text-xs sm:text-sm px-6 py-2 rounded-lg hover:bg-primary-7000 transition"
                    >
                      View Detail
                    </button>
                  )}
                  renderContent={
                    (closeModal) => (selectedData ? <TopupDetail item={selectedData} /> : <div>Loading...</div>) // Kondisi menunggu data
                  }
                  modalTitle="Topup Details"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop view */}
      {/* <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md hidden sm:block table-auto"> */}
      <div className="hidden sm:block">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">No</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">Reference ID</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">Amount</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">Point Earn</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">Payment Method</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium">Detail</th>
            </tr>
          </thead>
          <tbody>
            {(data?.length ?? 0) === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-3 text-center text-xs sm:text-sm text-gray-500">
                  No Data Available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-xs sm:text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">{formatDateTime(item.created_at)}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">{item.reference_id}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm">
                    {formatNumber((item.amount || 0) + (item.fee_credit_card || 0))}
                  </td>

                  <td className="px-4 py-3 text-xs sm:text-sm">{formatAmount(item.point_earn)}</td>
                  <td>
                    <PaymentMethodCell paymentMethod={item.payment_method} />
                  </td>
                  <td className="text-xs sm:text-sm text-center">
                    <NcModal
                      contentExtraClass="w-full md:w-1/2"
                      renderTrigger={(openModal) => (
                        <button
                          onClick={() => {
                            handleDetail(item);
                            openModal();
                          }}
                          className="bg-primary-6000 text-white text-xs sm:text-sm px-6 py-2 rounded-lg hover:bg-primary-7000 transition"
                        >
                          View Detail
                        </button>
                      )}
                      renderContent={
                        (closeModal) => (selectedData ? <TopupDetail item={selectedData} /> : <div>Loading...</div>) // Kondisi menunggu data
                      }
                      modalTitle="Topup Details"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopupRequestTable;
