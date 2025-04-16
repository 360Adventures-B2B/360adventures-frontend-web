import React, { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/dateHelper";
import { formatNumber } from "@/utils/currencyConverter";
import { Cart } from "@/interfaces/Cart";

interface BookingItemCardProps {
  item: Cart;
}

const BookingItemCard: React.FC<BookingItemCardProps> = ({ item }) => {
  const fallbackUrl = "https://dummyimage.com/1000x1000/000/fff";
  const [imgSrc, setImgSrc] = useState(item?.product?.image || fallbackUrl);

  return (
    <div className="booking-item mb-5 pb-5 flex items-start overflow-hidden border-b border-[#e9e9e9] last:border-0">
      {/* Image */}
      <div className="booking-item-image flex-shrink-0 w-[100px] h-[100px]">
        <Image
          alt={item?.product?.name ?? ""}
          className="w-full h-full rounded-md object-cover"
          src={imgSrc}
          width={100}
          height={100}
          onError={() => setImgSrc(fallbackUrl)}
        />
      </div>

      {/* Details */}
      <div className="booking-item-details relative flex-1 ml-6 pr-6">
        {/* Tour Name */}
        <div className="booking-item-title block text-lg font-semibold text-gray-800">{item?.product?.name}</div>

        {/* Package Name */}
        <p className="pkgName text-sm text-[#444] mt-1">{item?.package?.name}</p>

        {/* Start Date */}
        <p className="startDate text-sm text-[#444] mt-1">
          <i className="las la-calendar-alt mr-2"></i>
          {item?.start_date && formatDate(item?.start_date)}
        </p>

        {/* Time Slot */}
        {item?.time_slot && (
          <p className="timeSlot text-sm text-[#444] mt-1">
            <i className="las la-clock mr-2"></i>
            {item.time_slot}
          </p>
        )}

        {/* Guest Details */}
        <div className="guestDetails text-sm text-[#444] mt-2">
          {item?.person_types
            ?.filter((person_type) => person_type.guest > 0)
            .map((person_type, index) => (
              <div key={index} className="flex items-center mb-2">
                <i className="las la-user-friends mr-2 text-base"></i>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span>
                      {person_type.guest} {person_type.name}
                    </span>
                    <span className="font-semibold text-right min-w-[80px] text-gray-800">
                      {formatNumber(person_type.total)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {item?.extra_prices && item?.extra_prices.length > 0 && (
          <div className="extraPrices text-sm text-[#444] mt-2">
            <i className="las la-check mr-2 text-base"></i>
            <span>Extra Prices</span>

            <ul className="list-none space-y-2">
              {item?.extra_prices.map((extra, index) => (
                <li
                  key={index}
                  className="flex justify-between items-start border-b border-gray-200 pb-2 last:border-0"
                >
                  <div className="text-sm">
                    <div className="font-semibold">{extra.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      ({extra.type === "one_time" ? "One Time" : "Per Person"})
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-800 min-w-[80px] text-right">
                    {formatNumber(extra.price)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Total Price */}
        <div className="flex justify-between border-t border-[#e9e9e9] mt-4 pt-2 text-sm font-bold">
          <span>Total</span>
          <span className="text-gray-800">{formatNumber(item?.total_price)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingItemCard;
