import { useState } from "react";

const BookingDetail = () => {
  const [activeTab, setActiveTab] = useState("booking");

  return (
    <>
      <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold">Booking ID: #164</h2>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab("booking")}
              className={`py-2 px-4 ${activeTab === "booking" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            >
              Booking Detail
            </button>
            <button
              onClick={() => setActiveTab("customer")}
              className={`py-2 px-4 ${activeTab === "customer" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            >
              Customer Information
            </button>
          </div>

          {activeTab === "booking" && (
            <div className="mt-6">
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="font-medium">Booking Status:</span>
                  <span>Processing</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Booking Date:</span>
                  <span>02/22/2025</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span>Offline Payment</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Start Date:</span>
                  <span>02/28/2025</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>6 hours</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Quad Bike 250 cc: 1 * 400 USD</span>
                  <span>400 USD</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Total Price:</span>
                  <span>400 USD</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "customer" && (
            <div className="mt-6">
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="font-medium">First Name:</span>
                  <span>Sasuke</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Last Name:</span>
                  <span>sasuke</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>sasuke@gmail.com</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>087328472884</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Address Line 1:</span>
                  <span>Jl. Kesehatan Bo100</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">City:</span>
                  <span>Jakarta</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">State:</span>
                  <span>dwad</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">ZIP Code:</span>
                  <span>1231321</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Country:</span>
                  <span>Indonesia</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {/* <div className="p-6 border-t flex justify-end">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg">Close</button>
        </div> */}
      </div>
    </>
  );
};

export default BookingDetail;
