import NcModal from "@/shared/NcModal";
import React from "react";
import ModalPackage from "./ModalPackage";
import { Package } from "@/interfaces/Package";
import { formatNumber } from "@/utils/currencyConverter";
import { useBooking } from "@/context/BookingContext";
import ModalDatePicker from "./ModalDatePicker";
import PackageDetail from "./PackageDetail";

interface PackageCardProps {
  packageData: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData }) => {
  const { bookingData } = useBooking();

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row gap-3">
      {/* Left Section: Title and Description */}
      <div className="flex-1 flex flex-col justify-between gap-2 sm:border-r sm:border-gray-300 sm:pr-3">
        {/* Bestseller Tag */}
        {/* <div className="flex items-center text-xs font-semibold text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 32 32" className="mr-1">
            <path fill="currentColor" fillRule="evenodd" d="M22.581 17.512a1 1 0 0 1 .832 1.144 7.525 7.525 0 0 1-6.257 6.257 1 1 0 1 1-.312-1.976 5.525 5.525 0 0 0 4.593-4.593 1 1 0 0 1 1.144-.832Z" clipRule="evenodd"></path>
            <path fill="currentColor" fillRule="evenodd" d="M18.18 1.377a1 1 0 0 1 .876.277C22.689 5.275 27.5 10.542 27.5 17.5a11.5 11.5 0 0 1-23 0c0-3.402 1.711-6.932 3.667-9.878a1 1 0 0 1 1.387-.28l4.039 2.686 3.854-8.095a1 1 0 0 1 .732-.556Zm.46 2.703-3.737 7.85a1 1 0 0 1-1.457.403L9.293 9.57C7.672 12.188 6.5 14.975 6.5 17.5a9.5 9.5 0 0 0 19 0c0-5.501-3.472-9.917-6.86-13.42Z" clipRule="evenodd"></path>
          </svg>
          <div>Bestseller</div>
        </div> */}

        {/* Title */}
        <h4 className="text-md font-semibold text-gray-800">{packageData.name}</h4>

        {/* Callouts */}
        {/* <div className="flex gap-2 mt-1">
          <div className="flex items-center text-xs text-blue-600 border border-blue-600 px-2 py-1 rounded-md">
            Instant confirmation
          </div>
          <div className="flex items-center text-xs text-blue-600 border border-blue-600 px-2 py-1 rounded-md cursor-pointer">
            Free cancellation
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" className="ml-1">
              <path fill="currentColor" fillRule="evenodd" d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11 11-4.925 11-11S22.075 5 16 5ZM3 16C3 8.82 8.82 3 16 3s13 5.82 13 13-5.82 13-13 13S3 23.18 3 16Z" clipRule="evenodd"></path>
              <path fill="currentColor" fillRule="evenodd" d="M14 15a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v6a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1v-6a1 1 0 0 1-1-1Z" clipRule="evenodd"></path>
              <path fill="currentColor" d="M15.75 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
            </svg>
          </div>
        </div> */}

        {/* Description */}
        <div className="text-sm text-gray-600 mt-1">
          <p>{packageData.description}</p>
        </div>
        <NcModal
          contentExtraClass="w-full md:w-1/2"
          renderTrigger={(openModal) => (
            <a onClick={() => openModal()} className="text-sm text-black hover:text-blue-600 hover:no-underline mt-4 cursor-pointer">
              More details &gt;
            </a>
          )}
          renderContent={(closeModal) => {
            return <PackageDetail packageData={packageData} closeModal={closeModal} />;
          }}
          modalTitle={`Package Detail`}
        />
      </div>

      {/* Right Section: Price and Select Button */}
      <div className="flex-col justify-between items-start sm:items-end mt-3 sm:mt-0">
        <div className="pricing">
          <p className="text-md font-semibold text-gray-900">
            From
            {/* <span className="line-through text-gray-500 ml-2">{formatNumber(packageData.retail_price)}</span> */}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-lg font-bold text-green-600">{formatNumber(packageData.selling_price)}</span>
            {/* <span className="text-xs text-green-600 bg-green-100 px-1 py-0.5 rounded-full">-15%</span> */}
          </div>
        </div>

        <div className="w-full">
          <NcModal
            contentExtraClass="w-full md:w-1/2"
            renderTrigger={(openModal) => (
              <button
                onClick={() => openModal()}
                className="bg-primary-6000 hover:bg-primary-700 text-white py-1.5 px-3 mt-3 w-full sm:w-full rounded-md text-sm"
              >
                {bookingData.start_date ? "Select Package" : "Check Availability"}
              </button>
            )}
            renderContent={(closeModal) => {
              if (!bookingData.start_date) {
                return <ModalDatePicker selectedDate={null} handleDateSelection={() => {}} closeModal={closeModal} />;
              }
              return <ModalPackage packageId={packageData.ulid} closeModal={closeModal} />;
            }}
            modalTitle={bookingData.start_date ? "Select your preferences" : "Select a Date"}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
