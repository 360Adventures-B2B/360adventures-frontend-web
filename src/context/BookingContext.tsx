// BookingContext.tsx
import { PersonType } from "@/interfaces/PersonType";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookingData {
  agent_id: string;
  package_id: number | null;
  start_date: string;
  time_slot: string;
  person_types: PersonType[];
  total_price: number;
}

interface BookingContextType {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    agent_id: "",
    package_id: null,
    start_date: "",
    time_slot: "",
    person_types: [],
    total_price: 0,
  });

 

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData({
      ...bookingData,
      ...data,
      person_types: data.person_types ?? bookingData.person_types,
      total_price: data.total_price ?? bookingData.total_price,
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
