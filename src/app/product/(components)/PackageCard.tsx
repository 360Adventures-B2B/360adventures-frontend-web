import NcModal from "@/shared/NcModal";
import React from "react";
import ModalPackage from "./ModalPackage";
import { Package } from "@/interfaces/Package";
import { formatNumber } from "@/utils/currencyConverter";
import { useBooking } from "@/context/BookingContext";
import ModalDatePicker from "./ModalDatePicker";
import PackageDetail from "./PackageDetail";
import { useDate } from "@/context/DateContext";
import { useDispatch } from "react-redux";
import { openDetailPackageModal, openModalForPackageModal } from "@/lib/features/modalPackageSlices";
interface PackageCardProps {
  packageData: Package;
  onOpenModal: () => void;
}
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PackageCard: React.FC<PackageCardProps> = ({ packageData, onOpenModal }) => {
  const { bookingData } = useBooking();
  const { selectedDate, setSelectedDate } = useDate();

  const isAvailable = packageData.is_available;
  const formattedDate = bookingData.start_date ? formatDate(bookingData.start_date) : "";

  const forceCheckAvailability = isAvailable !== true; 

  const dispatch = useDispatch();

  const handleOpenModalPackage = () => {
    dispatch(openModalForPackageModal(packageData));
  };

  const handleOpenModalDetailPackage = () => {
    dispatch(openDetailPackageModal(packageData));
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row gap-3">
      {/* Left Section */}
      <div
        className={`flex-1 flex flex-col justify-between gap-2 sm:border-r sm:border-gray-300 sm:pr-3 ${
          packageData.is_available === false ? "opacity-60" : ""
        }`}
      >
        <h4 className="text-md font-semibold text-gray-800">{packageData.name}</h4>

        {/* Description with opacity if not available */}
        <div className={`text-sm text-gray-600 mt-1`}>
          <p>{packageData.description}</p>
        </div>
        <a
          onClick={handleOpenModalDetailPackage}
          className="text-sm text-black hover:text-blue-600 hover:no-underline mt-4 cursor-pointer"
        >
          More details &gt;
        </a>
      </div>

      {/* Right Section */}
      <div className="flex-col justify-between items-start sm:items-end mt-3 sm:mt-0 w-full sm:w-1/3">
        <div className={`pricing ${packageData.is_available === false ? "opacity-60" : ""}`}>
          <p className="text-md font-semibold text-gray-900">From</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-lg font-bold text-green-600">{formatNumber(packageData.selling_price)}</span>
          </div>
        </div>

        {/* Info jika tidak tersedia */}
        {isAvailable === false && formattedDate && (
          <p className="text-xs text-red-500 mt-3">This package is not available on {formattedDate}</p>
        )}

        <div className="w-full">
          <button
            onClick={handleOpenModalPackage}
            className={`py-1.5 px-3 mt-3 w-full rounded-md text-sm
                ${
                  isAvailable === false
                    ? "border border-primary-6000 text-primary-6000 bg-transparent cursor-pointer"
                    : "bg-primary-6000 hover:bg-primary-700 text-white cursor-pointer"
                }
              `}
          >
            {forceCheckAvailability
              ? "Check Availability"
              : bookingData.start_date
              ? "Select Package"
              : "Check Availability"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
