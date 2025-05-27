import { Package } from "@/interfaces/Package";
import React, { useState } from "react";
import IncludeExclude from "./IncludeExclude";
import Itinerary from "./Itinerary";
import { formatNumber } from "@/utils/currencyConverter";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useBooking } from "@/context/BookingContext";
import ModalDatePicker from "./ModalDatePicker";
import ModalPackage from "./ModalPackage";
import ItineraryList from "./ItineraryList";

type PackageDetailProps = {
  packageData: Package;
  closeModal: () => void;
};

export default function PackageDetail({ packageData, closeModal }: PackageDetailProps) {
  if (!packageData) return null;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const { bookingData } = useBooking();
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);

  if (showDateModal) {
    if (!bookingData.start_date) {
      return <ModalDatePicker selectedDate={null} handleDateSelection={() => {}} closeModal={closeModal} />;
    }
    return <ModalPackage packageId={packageData.ulid} closeModal={closeModal} />;
  }

  if (showPackageModal) {
    return <ModalPackage packageId={packageData.ulid} closeModal={() => setShowPackageModal(false)} />;
  }

  const handleClick = () => {
    if (!bookingData.start_date) {
      setShowDateModal(true);
    } else {
      setShowPackageModal(true);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col max-h-[75vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800">{packageData.name}</h2>
        </div>

        <p className="text-gray-600 mt-2">{packageData.description}</p>
        {/* <IncludeExclude includes={packageData?.includes} excludes={packageData?.excludes} /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {packageData.includes && packageData.includes.length > 0 && (
            <div>
              <h2 className="font-semibold">Includes</h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
              <ul className="space-y-2">
                {packageData.includes.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <i className="las la-check-circle text-xl mr-2 text-green-600"></i>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {packageData.excludes && packageData.excludes.length > 0 && (
            <div>
              <h2 className="font-semibold">Excludes</h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
              <ul className="space-y-2">
                {packageData.excludes.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <i className="las la-times-circle text-xl mr-2 text-red-600"></i>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* itinerary */}
        {packageData.itinerary && packageData.itinerary.length > 0 && (
          <div className="mt-6">
            <div className="font-semibold">Itinerary</div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
            <ItineraryList itineraryData={packageData.itinerary} />
          </div>
        )}

        {/* cancellation policy */}
        {packageData.cancellation_policy && packageData.cancellation_policy.trim() !== "" && (
          <div className="mt-6">
            <div className="font-semibold">Cancellation Policy</div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
            <div className="text-neutral-600 dark:text-neutral-300">{packageData.cancellation_policy}</div>
          </div>
        )}

        {/* additional information */}
        {packageData.additional_information && packageData.additional_information.trim() !== "" && (
          <div className="mt-6">
            <div className="font-semibold">Additional Information</div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
            <div className="text-neutral-600 dark:text-neutral-300">{packageData.additional_information}</div>
          </div>
        )}

        {/* footer */}
        <div className="mt-auto bg-white p-4 rounded-lg shadow-lg sticky bottom-0 w-full z-40">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <div className="space-y-2 sm:space-y-0 sm:text-left w-full sm:w-auto">
              <span className="text-gray-600 text-sm sm:text-base">From</span>
              <div className="flex items-center space-x-2">
                <h4 className="text-lg sm:text-xl font-bold text-gray-800">
                  {formatNumber(packageData.selling_price)}
                </h4>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
              <ButtonPrimary
                onClick={handleClick}
                className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
              >
                {bookingData.start_date ? "Select Package" : "Check Availability"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
