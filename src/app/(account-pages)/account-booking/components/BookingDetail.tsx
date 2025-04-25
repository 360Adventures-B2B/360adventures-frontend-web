import { IBooking } from "@/interfaces/Booking";
import { formatNumber } from "@/utils/currencyConverter";
import { formatDate, formatDateTime } from "@/utils/dateHelper";
import { useState } from "react";

const BookingDetail = ({ booking }: { booking: IBooking }) => {
  const [activeTab, setActiveTab] = useState("booking");
  return (
    <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">Booking Ref: #{booking.booking_reference_id}</h2>
      </div>

      {/* Tabs */}
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

        {/* Booking Detail */}
        {activeTab === "booking" && (
          <div className="mt-6">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`font-semibold ${
                    booking.booking_status === "confirmed"
                      ? "text-green-500"
                      : booking.booking_status === "unconfirmed"
                      ? "text-yellow-500"
                      : booking.booking_status === "completed"
                      ? "text-green-500"
                      : booking.booking_status === "cancelled"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {booking.booking_status}
                </span>
              </li>

              <li className="flex justify-between">
                <span className="font-medium">Booking Date:</span>
                <span>{formatDateTime(booking.booking_time)}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Payment Status:</span>
                <span>{booking.payment_status}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Start Date:</span>
                <span>{formatDate(booking.start_date)}</span>
              </li>
              {booking.time_slot && (
                <li className="flex justify-between">
                  <span className="font-medium">Time Slot:</span>
                  <span>{booking.time_slot}</span>
                </li>
              )}

              {booking.package.product.duration && (
                <li className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>{booking.package.product.duration} Hours</span>
                </li>
              )}

              {/* Booking Items */}
              {booking.person_types.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Items</h3>
                  <ul className="space-y-2">
                    {/* Person Types */}
                    {booking.person_types.map((person, idx) => (
                      <li key={idx} className="flex justify-between font-medium">
                        <span className="font-medium">
                          {person.name} ({person.guest} × {formatNumber(person.selling_price)})
                        </span>
                        <span className="font-medium">{formatNumber(person.total || 0)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Extra Prices */}
              {booking.extra_prices && booking.extra_prices.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Extra Add-ons</h3>
                  <ul className="space-y-2">
                    {booking.extra_prices.map((extra, idx) => (
                      <li key={idx} className="flex justify-between font-medium">
                        <div>
                          <span className="font-medium">{extra.name}</span>
                          <div className="text-gray-500 font-medium">Type: {extra.type.replace("_", " ")}</div>
                        </div>
                        <span className="font-medium">{formatNumber(extra.total || 0)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <li className="flex justify-between font-medium">
                <span>Total Price:</span>
                <span className="font-medium">{formatNumber(booking.total_price)}</span>
              </li>
            </ul>
          </div>
        )}

        {/* Customer Info */}
        {activeTab === "customer" && (
          <div className="mt-6">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{booking.name || "-"}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{booking.email || "-"}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{booking.phone || "-"}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Country:</span>
                <span>{booking.country || "-"}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">City:</span>
                <span>{booking.city || "-"}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Special Requirement:</span>
                <span>{booking.special_requirement || "-"}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetail;
