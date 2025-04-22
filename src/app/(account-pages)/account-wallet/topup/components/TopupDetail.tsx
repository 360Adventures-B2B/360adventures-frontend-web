import { toast } from "@/hooks/use-toast";
import { ITopupRequest } from "@/interfaces/TopupRequest";
import { handleError } from "@/lib/handleApiError";
import { useUpdateTopupRequestMutation } from "@/lib/services/topupService";
import { cn } from "@/lib/utils";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { formatNumber } from "@/utils/currencyConverter";
import { useState } from "react";

type TopupDetailProps = {
  item: ITopupRequest;
  closeModal: () => void;
};

const TopupDetail = ({ item, closeModal }: TopupDetailProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updateTopupRequest, { isLoading, isError }] = useUpdateTopupRequestMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const body = {
        transfer_slip: selectedFile,
      };

      const res = await updateTopupRequest({
        id: item.ulid,
        body,
      }).unwrap();
      console.log("🚀 ~ handleUpload ~ res:", res);

      if (res?.code === 200) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Success Update!",
          variant: "success",
          duration: 2000,
        });
        // closeModal();
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Top-up update failed. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const canUpdateTransferSlip = item.status === "pending" && !item.is_under_verification;

  return (
    <div>
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">Top-up Reference: {item.reference_id}</h2>
        <p className="text-gray-500 text-sm mt-1">Created at: {item.created_at}</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <ul className="space-y-4">
          {/* Detail rows */}
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Amount:</span>
            <span className="text-gray-900">{formatNumber(item.amount)}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Point Earned:</span>
            <span className="text-gray-900">{item.point_earn}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Fee (Credit Card):</span>
            <span className="text-gray-900">{formatNumber(item.fee_credit_card)}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Total Payment:</span>
            <span className="text-gray-900">{formatNumber(item.amount + item.fee_credit_card)}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Payment Method:</span>
            <span className="capitalize text-gray-900">{item.payment_method.replace(/_/g, " ")}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Status:</span>
            <span
              className={
                item.status === "success"
                  ? "text-green-600 font-semibold"
                  : item.status === "pending"
                  ? "text-yellow-600 font-semibold"
                  : item.status === "reject"
                  ? "text-red-600 font-semibold"
                  : "text-gray-600"
              }
            >
              {item.status}
            </span>
          </li>
          {item.payment_method === "bank_transfer" && item.is_under_verification ? (
            <li className="flex justify-between">
              <span className="font-medium text-gray-700">Under Verification:</span>
              <span className="inline-block bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Under Verification
              </span>
            </li>
          ) : null}

          {item.payment_method === "bank_transfer" && (
            <li className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Transfer Slip:</span>
                {item.transfer_slip && (
                  <button
                    onClick={() => window.open(item.transfer_slip, "_blank")}
                    className="bg-primary-6000 text-white text-xs sm:text-sm px-6 py-2 rounded-lg hover:bg-primary-7000 transition"
                  >
                    View Transfer Slip
                  </button>
                )}
              </div>

              <div>
                {/* Gambar preview */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview Transfer Slip"
                    className="rounded-lg border max-w-full max-h-64 object-contain mb-4"
                  />
                ) : item.transfer_slip ? (
                  <img
                    src={item.transfer_slip}
                    alt="Transfer Slip"
                    className="rounded-lg border max-w-full max-h-64 object-contain mb-4"
                    onError={(e) => {
                      e.currentTarget.src = "https://dummyimage.com/500x500/000/fff";
                    }}
                  />
                ) : (
                  <p className="text-sm text-gray-500 mb-4">No transfer slip uploaded yet.</p>
                )}

                {/* Form upload */}
                {canUpdateTransferSlip && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />

                    <div className="text-left">
                      {selectedFile && (
                        <ButtonPrimary
                          loading={isLoading}
                          onClick={handleUpload}
                          className="bg-primary-6000 text-white text-xs sm:text-sm px-6 py-2 rounded-lg hover:bg-primary-7000 transition"
                        >
                          Upload Transfer Slip
                        </ButtonPrimary>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {item.bank && (
                <div className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">Transfer To:</span>
                    </li>
                    {item.bank.bank_name && (
                      <li>
                        <span className="font-medium">Bank Name:</span> {item.bank.bank_name}
                      </li>
                    )}
                    {item.bank.account_name && (
                      <li>
                        <span className="font-medium">Account Name:</span> {item.bank.account_name}
                      </li>
                    )}
                    {item.bank.account_number && (
                      <li>
                        <span className="font-medium">Account Number:</span> {item.bank.account_number}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TopupDetail;
