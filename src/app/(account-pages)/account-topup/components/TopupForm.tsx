import { useState } from "react";
import { CreditCard, Banknote, Upload, QrCode } from "lucide-react";
import { formatNumber } from "@/utils/currencyConverter";
import ButtonPrimary from "@/shared/ButtonPrimary";

export default function TopUpForm() {
  const [amount, setAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("gateway");
  const [proof, setProof] = useState(null);
  const [selectedBank, setSelectedBank] = useState("bank1");

  const presetAmounts: number[] = [100, 200, 500];

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

    if (!finalAmount || finalAmount <= 0) {
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
              {formatNumber(value)}
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
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter custom amount"
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="1"
          />
        )}

        <div className="space-y-4">
          <label className="block text-lg font-medium">Payment Method</label>

          {/* Container responsif */}
          <div className="flex flex-col gap-4 md:flex-row">
            <button
              type="button"
              onClick={() => setPaymentMethod("gateway")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                paymentMethod === "gateway"
                  ? "border-primary-6000 bg-primary-100"
                  : "border-gray-300 hover:border-primary-400"
              }`}
            >
              <CreditCard size={20} /> Payment Gateway
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("manual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                paymentMethod === "manual"
                  ? "border-primary-6000 bg-primary-100"
                  : "border-gray-300 hover:border-primary-400"
              }`}
            >
              <Banknote size={20} /> Manual Transfer
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("qrcode")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                paymentMethod === "qrcode"
                  ? "border-primary-6000 bg-primary-100"
                  : "border-gray-300 hover:border-primary-400"
              }`}
            >
              <QrCode size={20} /> QR Code Payment
            </button>
          </div>

          {paymentMethod === "qrcode" && (
            <p className="text-sm text-gray-600 mt-2">
              Scan QR code and complete the payment via our
              <a href="/qr-payment" className="text-primary-600 underline ml-1">
                QRIS payment gateway
              </a>
              .
            </p>
          )}
        </div>

        {paymentMethod === "manual" && (
          <div className="space-y-4">
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
              <p>Account Number: {bankDetails[selectedBank].accountNumber}</p>
              <p>Account Name: {bankDetails[selectedBank].accountName}</p>
            </div>

            <label className="block text-lg font-medium">Upload Payment Proof</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border-2 rounded-lg"
            />
          </div>
        )}

        <ButtonPrimary
          type="submit"
          className="w-full py-3 font-semibold"
        >
          Proceed to Top-Up
        </ButtonPrimary>
      </form>
    </div>
  );
}
