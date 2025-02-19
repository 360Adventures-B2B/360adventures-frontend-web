import { useBooking } from "@/context/BookingContext";
import { PersonType } from "@/interfaces/PersonType";
import { formatNumber } from "@/utils/currencyConverter";
import React, { useState, useEffect } from "react";

interface QuantityStepperProps {
  personTypes: PersonType[];
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({ personTypes }) => {
  // Mengambil booking context
  const { bookingData, updateBookingData } = useBooking();
  console.log("🚀 ~ QuantityStepper ~ bookingData:", bookingData);

  // State untuk menyimpan kuantitas per tipe tamu
  const [quantities, setQuantities] = useState(
    personTypes.reduce((acc: any, type: any) => {
      acc[type.name] = 0; // Inisialisasi semua dengan 0
      return acc;
    }, {})
  );

  // Fungsi untuk menghitung total harga
  const calculateTotalPrice = () => {
    let total = 0;

    // Iterasi untuk menghitung total harga berdasarkan kuantitas dan harga per unit
    personTypes.forEach((unit) => {
      total += quantities[unit.name] * unit.price; // Harga berdasarkan kuantitas
    });

    return total;
  };

  // Mengupdate bookingData setiap ada perubahan kuantitas

  // Fungsi untuk increment kuantitas
  const increment = (type: string) => {
    const personType = personTypes.find((item) => item.name === type);
    const maxQuantity = personType?.max ?? 0;

    const updatedPersonTypes = personTypes.map((unit) => ({
      ...unit,
      guest: quantities[unit.name], // Update kuantitas tamu berdasarkan state
    }));

    updateBookingData({
      person_types: updatedPersonTypes, // Memperbarui person_types di context
      total_price: calculateTotalPrice(), // Update total price
    });

    setQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [type]: Math.min(prevQuantities[type] + 1, maxQuantity),
    }));
  };

  // Fungsi untuk decrement kuantitas
  const decrement = (type: string) => {
    const updatedPersonTypes = personTypes.map((unit) => ({
      ...unit,
      guest: quantities[unit.name], // Update kuantitas tamu berdasarkan state
    }));

    updateBookingData({
      person_types: updatedPersonTypes, // Memperbarui person_types di context
      total_price: calculateTotalPrice(), // Update total price
    });
    const personType = personTypes.find((item) => item.name === type);
    const maxQuantity = personType?.max ?? 0;

    setQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [type]: Math.max(prevQuantities[type] - 1, 0),
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-100">
      <div className="flex flex-col gap-2 w-full sm:w-44">
        <h4 className="text-lg font-bold text-gray-800">Quantity</h4>
        <p className="text-sm text-gray-600">(Max: 15)</p>
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
                <span className="text-lg">{quantities[unit.name]}</span>
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

            {/* Menampilkan total harga per unit */}
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
