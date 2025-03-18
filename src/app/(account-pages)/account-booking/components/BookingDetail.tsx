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
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Booking Status:</span>
                  <span className="break-words sm:text-right">Processing</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Booking Date:</span>
                  <span className="break-words sm:text-right">02/22/2025</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Payment Method:</span>
                  <span className="break-words sm:text-right">Offline Payment</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Start Date:</span>
                  <span className="break-words sm:text-right">02/28/2025</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Timeslot:</span>
                  <span className="break-words sm:text-right">10:00 AM</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Duration:</span>
                  <span className="break-words sm:text-right">6 hours</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Quad Bike 250 cc: 1 * 400 USD</span>
                  <span className="break-words sm:text-right">400 USD</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Quad Bike 250 cc: 1 * 400 USD</span>
                  <span className="break-words sm:text-right">400 USD</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Quad Bike 250 cc: 1 * 400 USD</span>
                  <span className="break-words sm:text-right">400 USD</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Total Price:</span>
                  <span className="break-words sm:text-right">400 USD</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "customer" && (
            <div className="mt-6">
              <ul className="space-y-4">
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">First Name:</span>
                  <span className="break-words sm:text-right">Sasuke</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Last Name:</span>
                  <span className="break-words sm:text-right">Sasuke</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Email:</span>
                  <span className="break-words sm:text-right">sasuke@gmail.com</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Phone:</span>
                  <span className="break-words sm:text-right">087328472884</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Address Line 1:</span>
                  <span className="break-words sm:text-right">Jl. Kesehatan Bo100</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">City:</span>
                  <span className="break-words sm:text-right">Jakarta</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">State:</span>
                  <span className="break-words sm:text-right">dwad</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">ZIP Code:</span>
                  <span className="break-words sm:text-right">1231321</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium whitespace-nowrap">Country:</span>
                  <span className="break-words sm:text-right">Indonesia</span>
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
