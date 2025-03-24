import { useState } from "react";
import { CreditCard, Banknote, Upload, QrCode, Check, Clipboard } from "lucide-react";
import { formatNumber } from "@/utils/currencyConverter";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";

export default function TopUpForm() {
  const [amount, setAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("gateway");
  const [proof, setProof] = useState(null);
  const [selectedBank, setSelectedBank] = useState("bank1");

  const presetAmounts: number[] = [100, 200, 500];
  const paymentOptions = [
    { id: "credit", label: "Credit Card/Debit Card", icon: <CreditCard size={20} /> },
    {
      id: "manual",
      label: "Bank Transfer",
      icon: <Banknote size={20} />,
    },
    { id: "qris", label: "QRIS Payment", icon: <QrCode size={20} /> },
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

  const handleAmountChange = (value: any) => {
    setAmount(value);
    if (value !== "custom") {
      setCustomAmount("");
    }
  };

  const handleFileChange = (e: any) => {
    setProof(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const finalAmount = amount === "custom" ? customAmount : amount;

    if (!finalAmount || Number(finalAmount) <= 0) {
      alert("Please enter a valid top-up amount.");
      return;
    }

    if (paymentMethod === "manual" && !proof) {
      alert("Please upload the payment proof for manual transfer.");
      return;
    }

    if (paymentMethod === "qrcode") {
      window.location.href = `/qr-payment?amount=${finalAmount}`;
      return;
    }

    alert(`Top-up $${finalAmount} via ${paymentMethod}`);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const totalAmount = amount === "custom" ? customAmount : amount;

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
                amount === value ? "border-primary-6000 bg-primary-100" : "border-gray-300 hover:border-primary-400"
              }`}
            >
              {value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleAmountChange("custom")}
            className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
              amount === "custom" ? "border-primary-6000 bg-primary-100" : "border-gray-300 hover:border-primary-400"
            }`}
          >
            Custom
          </button>
        </div>

        {amount === "custom" && (
          <>
            <label className="block text-sm font-medium mt-5">Amount: </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
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
                onClick={() => setPaymentMethod(option.id)}
              >
                <label className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={paymentMethod === option.id}
                      onChange={() => setPaymentMethod(option.id)}
                      className="form-radio h-5 w-5 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 accent-primary-700"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-medium">{option.label}</span>
                      <div className="mt-1 flex space-x-2">
                        {/* {option.logos.map((logo, index) => (
                          <Image
                            key={index}
                            src={logo}
                            alt="payment logo"
                            className="h-8 w-auto"
                            width={32}
                            height={32}
                          />
                        ))} */}
                        {/* <Image
                          src="/img/payment-logo.png"
                          className="h-8 w-auto"
                          width={500}
                          height={500}
                          alt="payment logo"
                        ></Image> */}
                      </div>
                    </div>
                  </div>
                  {/* <span className="text-sm text-gray-600">{option.info}</span> */}
                </label>

                {paymentMethod === "manual" && option.id === "manual" && (
                  <div className="overflow-hidden transition-max-height duration-500 ease-in-out max-h-[500px]">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium mt-5">Bank Name: </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full p-3 border-2 rounded-lg"
                      >
                        {Object.keys(bankDetails).map((bankKey) => (
                          <option key={bankKey} value={bankKey}>
                            {bankDetails[bankKey].name}
                          </option>
                        ))}
                      </select>

                      <div className="p-4 border-2 border-gray-300 rounded-lg">
                        <h3 className="font-semibold mb-2">Transfer to:</h3>
                        <p>Bank Name: {bankDetails[selectedBank].name}</p>
                        <p className="flex items-center">
                          Account Number: {bankDetails[selectedBank].accountNumber}
                          <span
                            onClick={() => handleCopy(bankDetails[selectedBank].accountNumber)}
                            className="ml-2 cursor-pointer"
                          >
                            {copied ? <Check size={18} className="text-green-500" /> : <Clipboard size={18} />}
                          </span>
                        </p>
                        <p>Account Name: {bankDetails[selectedBank].accountName}</p>
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

          {paymentMethod === "qris" && (
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
        <ButtonPrimary type="submit" className="w-full py-3 font-semibold">
          Proceed to Top-Up
        </ButtonPrimary>
      </form>
    </div>
  );
}
