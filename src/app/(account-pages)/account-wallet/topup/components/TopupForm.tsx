import { useState, useEffect } from "react";
import { CreditCard, Banknote, QrCode, Check, Clipboard } from "lucide-react";
import { formatNumber } from "@/utils/currencyConverter";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useTopup } from "@/context/TopupContext";
import { handleError } from "@/lib/handleApiError";
import { useStoreTopupRequestMutation } from "@/lib/services/topupService";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useGetBanksQuery } from "@/lib/services/bankService";
import { Bank } from "@/interfaces/Bank";

type TopUpFormProps = {
  closeModal: () => void;
};

export default function TopUpForm({ closeModal }: TopUpFormProps) {
  const { state, dispatch } = useTopup(); // Ambil state dan dispatch dari TopupContext
  const [copied, setCopied] = useState<boolean>(false);

  const [storeTopupRequest, { isLoading: isLoadigStoreTopupRequest, isError }] = useStoreTopupRequestMutation();
  const { data: bankData, error, isLoading } = useGetBanksQuery(undefined);

  const presetAmounts: number[] = [100, 200, 500];
  const paymentOptions = [
    { id: "credit_card", label: "Credit Card/Debit Card", icon: <CreditCard size={20} /> },
    { id: "bank_transfer", label: "Bank Transfer", icon: <Banknote size={20} /> },
    { id: "qr_code", label: "QRIS Payment", icon: <QrCode size={20} /> },
  ];
  const bankDetails: any = {
    bank1: {
      name: "XYZ Bank",
      accountNumber: "123-456-789",
      accountName: "Your Company Name",
    },
    bank2: {
      name: "ABC Bank",
      accountNumber: "987-654-321",
      accountName: "Another Company",
    },
  };

  useEffect(() => {
    // Reset customAmount when selecting a preset amount
    if (state.amount !== "custom") {
      dispatch({ type: "SET_CUSTOM_AMOUNT", payload: 0 });
    }
  }, [state.amount, dispatch]);

  const handleAmountChange = (value: number | string) => {
    const parsedValue: number | "custom" = value === "custom" ? "custom" : Number(value);

    if (parsedValue === "custom" || !isNaN(parsedValue)) {
      dispatch({ type: "SET_AMOUNT", payload: parsedValue });
    }
  };

  const handleFileChange = (e: any) => {
    dispatch({ type: "SET_TRANSFER_SLIP", payload: e.target.files[0] });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalAmount = state.amount === "custom" ? state.customAmount : state.amount;

    if (!finalAmount || Number(finalAmount) <= 0) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
        title: "Error",
        description: "Please enter a valid top-up amount.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (state.payment_method === "bank_transfer" && !state.transfer_slip) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
        title: "Error",
        description: "Please upload the payment proof for manual transfer.",
        variant: "destructive", // Menampilkan toast dengan varian error
        duration: 2000,
      });
      return;
    }

    // if (state.payment_method === "qr_code") {
    //   window.location.href = `/qr-payment?amount=${finalAmount}`;
    //   return;
    // }

    const body = {
      amount: finalAmount,
      platform: "web",
      payment_method: state.payment_method === "credit_card" ? "payment_gateway" : state.payment_method,
      ...(state.payment_method === "bank_transfer" && { bank_id: state.bank_id, transfer_slip: state.transfer_slip }),
    };

    try {
      const res = await storeTopupRequest(body).unwrap();
      if (res?.code === 200) {
        if (res?.data?.payment_method === "payment_gateway" && res?.data?.payment_url) {
          window.location.href = res?.data?.payment_url;
          return;
        }
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Success Request Topup!",
          variant: "success", // Menampilkan toast dengan varian sukses
          duration: 2000,
        });
        dispatch({ type: "RESET_TOPUP" });
        closeModal();
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Top-up request failed. Please try again.",
          variant: "destructive", // Menampilkan toast dengan varian error
          duration: 2000,
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      handleError(error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const totalAmount = state.amount === "custom" ? state.customAmount : state.amount;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-center">Choose Amount</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {presetAmounts.map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => handleAmountChange(value)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                state.amount === value
                  ? "border-primary-6000 bg-primary-100"
                  : "border-gray-300 hover:border-primary-400"
              }`}
            >
              {value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleAmountChange("custom")}
            className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
              state.amount === "custom"
                ? "border-primary-6000 bg-primary-100"
                : "border-gray-300 hover:border-primary-400"
            }`}
          >
            Custom
          </button>
        </div>

        {state.amount === "custom" && (
          <>
            <label className="block text-sm font-medium mt-5">Amount: </label>
            <input
              type="text"
              value={state.customAmount === 0 ? "" : state.customAmount}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "") {
                  dispatch({ type: "SET_CUSTOM_AMOUNT", payload: 0 });
                } else if (!isNaN(Number(value))) {
                  dispatch({ type: "SET_CUSTOM_AMOUNT", payload: Number(value) });
                }
              }}
              placeholder="Enter custom amount"
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="1"
            />
          </>
        )}

        <div className="space-y-4">
          <label className="block text-lg font-medium">Payment Method</label>

          <div className="flex flex-col gap-4">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 w-full"
                onClick={() =>
                  dispatch({
                    type: "SET_PAYMENT_METHOD",
                    payload: option.id as "credit_card" | "bank_transfer" | "qr_code", // Tipe casting
                  })
                }
              >
                <label className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={state.payment_method === option.id}
                      onChange={() =>
                        dispatch({
                          type: "SET_PAYMENT_METHOD",
                          payload: option.id as "credit_card" | "bank_transfer" | "qr_code",
                        })
                      }
                      className="form-radio h-5 w-5 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 accent-primary-700"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-medium">{option.label}</span>
                    </div>
                  </div>
                </label>

                {state.payment_method === "bank_transfer" && option.id === "bank_transfer" && (
                  <div className="overflow-hidden transition-max-height duration-500 ease-in-out max-h-[500px]">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium mt-5">Bank Name: </label>
                      <select
                        value={state.bank_id || ""}
                        onChange={(e) => dispatch({ type: "SET_BANK_ID", payload: e.target.value })}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Choose Bank</option>
                        {bankData && bankData.data && bankData.data.length > 0 ? (
                          bankData.data.map((bank: Bank) => (
                            <option key={bank.ulid} value={bank.ulid}>
                              {bank.bank_name}
                            </option>
                          ))
                        ) : (
                          <option disabled>No Banks Available</option>
                        )}
                      </select>

                      <div className="p-4 border-2 border-gray-300 rounded-lg">
                        <h3 className="font-semibold mb-2">Transfer to:</h3>
                        {state.bank_id && bankData && bankData.data.length > 0 ? (
                          bankData.data.map((bank: Bank) => {
                            if (bank.ulid === state.bank_id) {
                              return (
                                <>
                                  <p key={bank.ulid}>Bank Name: {bank.bank_name}</p>
                                  <p className="flex items-center">
                                    Account Number: {bank.account_number}
                                    <span
                                      onClick={() => handleCopy(bank.account_number)}
                                      className="ml-2 cursor-pointer"
                                    >
                                      {copied ? (
                                        <Check size={18} className="text-green-500" />
                                      ) : (
                                        <Clipboard size={18} />
                                      )}
                                    </span>
                                  </p>
                                  <p>Account Name: {bank.account_name}</p>
                                </>
                              );
                            }
                            return null; // Return null for other banks
                          })
                        ) : (
                          <p className="text-red-500">Please select a bank.</p>
                        )}
                      </div>

                      <label className="block text-lg font-medium">Upload Payment</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-3 border-2 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {state.payment_method === "qr_code" && (
            <p className="text-sm text-gray-600 mt-2">
              Scan QR code and complete the payment via our
              <a href="/qr-payment" className="text-primary-600 underline ml-1">
                QRIS payment gateway
              </a>
              .
            </p>
          )}
        </div>
        <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
          <span>Total:</span>
          <span>{formatNumber(totalAmount || 0)}</span>
        </div>
        <ButtonPrimary loading={isLoadigStoreTopupRequest} type="submit" className="w-full py-3 font-semibold">
          Proceed to Top-Up
        </ButtonPrimary>
      </form>
    </div>
  );
}
