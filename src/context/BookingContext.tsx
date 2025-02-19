// BookingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PersonType {
  name: string;
  price: number;
  guest: number;
}

interface BookingData {
  agent_id: string;
  package_id: string;
  start_date: string;
  time_slot: string;
  person_types: PersonType[];
  total_price: number; // Menambahkan properti total_price
}

interface BookingContextType {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  // calculateTotalPrice: () => void; // Fungsi ini akan memperbarui total_price
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    agent_id: "",
    package_id: "",
    start_date: "",
    time_slot: "",
    person_types: [],
    total_price: 0,
  });

  // Fungsi untuk menghitung total harga dan update state
  // const calculateTotalPrice = () => {
  //   const basePrice = bookingData.person_types.reduce((total, personType) => {
  //     return total + personType.price * personType.guest;
  //   }, 0);

  //   // Misalnya, tambahkan harga tambahan berdasarkan time_slot

  //   const total = basePrice;

  //   // Update state dengan total harga yang baru
  //   setBookingData((prevData) => ({
  //     ...prevData,
  //     total_price: total,
  //   }));
  // };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prevData) => {
      const updatedData = { ...prevData, ...data };
      // if (data.start_date || data.time_slot || data.person_types) {
      //   // calculateTotalPrice();
      // }
      return updatedData;
    });
  };

  return <BookingContext.Provider value={{ bookingData, updateBookingData }}>{children}</BookingContext.Provider>;
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
