import { useSelector, useDispatch } from "react-redux";
import { useBooking } from "@/context/BookingContext";
import NcModal from "@/shared/NcModal";
import ModalDatePicker from "../../(components)/ModalDatePicker";
import ModalPackage from "../../(components)/ModalPackage";
import { closeModal } from "@/lib/features/modalPackageSlices";
import { RootState } from "@/lib/store";
import PackageDetail from "../../(components)/PackageDetail";
import { useEffect, useRef } from "react";

const ModalPackageCard = () => {
  const hasReset = useRef(false);

  const dispatch = useDispatch();
  const { bookingData, dispatch: bookingDispatch } = useBooking();

  const { modalType, packageData } = useSelector((state: RootState) => state.modalPackage);

  useEffect(() => {
    hasReset.current = false;
  }, [modalType]);

  useEffect(() => {
    if (bookingData?.start_date && packageData?.is_available === false && !hasReset.current) {
      bookingDispatch({ type: "UPDATE_DATE", payload: "" });
      hasReset.current = true;
    }
  }, [bookingData?.start_date, packageData?.is_available, bookingDispatch]);

  if (!modalType || !packageData) return null;

  if (modalType === "PACKAGE") {
    return (
      <NcModal
        isOpenProp={true}
        onCloseModal={() => dispatch(closeModal())}
        modalTitle={bookingData?.start_date ? "Select your preferences" : "Select a Date"}
        contentExtraClass="w-full md:w-1/2"
        renderTrigger={() => null}
        renderContent={(closeModalInner: any) => {
          if (!bookingData?.start_date) {
            return (
              <ModalDatePicker
                selectedDate={null}
                handleDateSelection={() => {}}
                closeModal={closeModalInner}
                hideCloseButton={false}
                packageId={packageData.ulid}
              />
            );
          }

          if (bookingData?.start_date && packageData.is_available === false) {
            return (
              <ModalDatePicker
                selectedDate={new Date(bookingData.start_date)}
                handleDateSelection={() => {}}
                closeModal={closeModalInner}
                hideCloseButton={false}
                packageId={packageData.ulid}
              />
            );
          }
          return (
            <ModalPackage packageId={packageData.ulid || bookingData?.package_id || ""} closeModal={closeModalInner} />
          );
        }}
      />
    );
  }

  if (modalType === "DETAIL_PACKAGE") {
    return (
      <NcModal
        isOpenProp={true}
        onCloseModal={() => dispatch(closeModal())}
        contentExtraClass="w-full md:w-1/2"
        renderTrigger={() => null}
        renderContent={(closeModal) => <PackageDetail packageData={packageData} closeModal={closeModal} />}
        modalTitle="Package Detail"
      />
    );
  }

  return null;
};

export default ModalPackageCard;
