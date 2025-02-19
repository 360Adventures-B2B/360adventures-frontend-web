"use client";
import { useBooking } from "@/context/BookingContext";
import { PersonType } from "@/interfaces/PersonType";
import { formatNumber } from "@/utils/currencyConverter";
import React, { useState, useEffect } from "react";

interface QuantityStepperProps {
  personTypes: PersonType[];
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({ personTypes }) => {
  const { bookingData, updateBookingData } = useBooking();
  console.log("🚀 ~ bookingData:", bookingData);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  console.log("🚀 ~ quantities:", quantities);

  useEffect(() => {
    const total = bookingData.person_types.reduce((acc, personType) => {
      return acc + personType.price * personType.guest;
    }, 0);

    updateBookingData({
      total_price: total,
    });
  }, [bookingData.person_types]);

  const increment = (unitName: string) => {
    setQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [unitName]: (prevQuantities[unitName] || 0) + 1,
    }));
    updateBookingData({
      person_types: bookingData.person_types.map((person) => {
        if (person.name === unitName) {
          return { ...person, guest: person.guest + 1 };
        }
        return person;
      }),
    });
  };

  const decrement = (unitName: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [unitName]: Math.max((prevQuantities[unitName] || 0) - 1, 0),
    }));

    updateBookingData({
      person_types: bookingData.person_types.map((person) => {
        if (person.name === unitName && person.guest > 0) {
          return { ...person, guest: person.guest - 1 };
        }
        return person;
      }),
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-100">
      <div className="flex flex-col gap-2 w-full sm:w-44">
        <h4 className="text-lg font-bold text-gray-800">Quantity</h4>
        {/* <p className="text-sm text-gray-600">(Max: 15)</p> */}
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {personTypes.map((unit, index) => (
          <div key={index} className="flex flex-col p-4 bg-white rounded-md">
            <div className="flex gap-4 items-start">
              <div className="flex flex-col gap-2 flex-1">
                <h4 className="text-gray-800 font-bold">{unit.name}</h4>
                <div className="text-sm text-gray-600">
                  <span>{unit.desc}</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-100 rounded-full"
                  onClick={() => decrement(unit.name)}
                  disabled={quantities[unit.name] === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    className="stroke-current text-gray-600"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 16h22"
                    ></path>
                  </svg>
                </button>
                <span className="text-lg">{quantities[unit.name] ?? 0}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-100 rounded-full"
                  onClick={() => increment(unit.name)}
                  disabled={quantities[unit.name] >= unit.max}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    className="stroke-current text-gray-600"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 16h22M16 5v22"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-gray-700 font-medium">{formatNumber(unit.price)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuantityStepper;
