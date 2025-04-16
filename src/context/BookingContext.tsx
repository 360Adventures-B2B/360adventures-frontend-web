// BookingContext.tsx
import { ExtraPrice } from "@/interfaces/ExtraPrice";
import { PersonType } from "@/interfaces/PersonType";
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";

// Interface untuk Booking Data
interface BookingData {
  agent_id: string;
  package_id: string | null;
  start_date: string;
  time_slot: string;
  person_types: PersonType[];
  extra_prices: ExtraPrice[];
  total_price: number;
}

// Action Types
type BookingAction =
  | { type: "UPDATE_AGENT"; payload: string }
  | { type: "UPDATE_PACKAGE"; payload: string | null }
  | { type: "UPDATE_DATE"; payload: string }
  | { type: "UPDATE_TIME_SLOT"; payload: string }
  | { type: "UPDATE_PERSON_TYPES"; payload: PersonType[] }
  | { type: "UPDATE_EXTRA_PRICES"; payload: ExtraPrice[] }
  | { type: "UPDATE_TOTAL_PRICE"; payload: number }
  | { type: "RESET_BOOKING" };

// Initial State
const initialBookingData: BookingData = {
  agent_id: "",
  package_id: null,
  start_date: "",
  time_slot: "",
  person_types: [],
  extra_prices: [],
  total_price: 0,
};

// Reducer Function
const bookingReducer = (state: BookingData, action: BookingAction): BookingData => {
  switch (action.type) {
    case "UPDATE_AGENT":
      return { ...state, agent_id: action.payload };
    case "UPDATE_PACKAGE":
      return { ...state, package_id: action.payload };
    case "UPDATE_DATE":
      return { ...state, start_date: action.payload };
    case "UPDATE_TIME_SLOT":
      return { ...state, time_slot: action.payload };
    case "UPDATE_PERSON_TYPES":
      return { ...state, person_types: action.payload };
    case "UPDATE_EXTRA_PRICES":
      return { ...state, extra_prices: action.payload };
    case "UPDATE_TOTAL_PRICE":
      return { ...state, total_price: action.payload };
    case "RESET_BOOKING":
      return { ...initialBookingData };
    default:
      return state;
  }
};

// Context Type
interface BookingContextType {
  bookingData: BookingData;
  dispatch: React.Dispatch<BookingAction>;
}

// Context Creation
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Provider Component
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, dispatch] = useReducer(bookingReducer, initialBookingData);

  useEffect(() => {
    const totalPersonPrice = bookingData.person_types.reduce((acc, personType) => {
      return acc + personType.selling_price * personType.guest;
    }, 0);

    const totalExtraPrice = bookingData.extra_prices.reduce((acc, extraPrice) => {
      if (extraPrice.type === "one_time") {
        return acc + extraPrice.price;
      }

      if (extraPrice.type === "per_person") {
        const totalGuests = bookingData.person_types.reduce((guestAcc, personType) => guestAcc + personType.guest, 0);
        return acc + extraPrice.price * totalGuests;
      }
      return acc;
    }, 0);

    const totalPrice = totalPersonPrice + totalExtraPrice;

    dispatch({
      type: "UPDATE_TOTAL_PRICE",
      payload: totalPrice,
    });
  }, [bookingData.person_types, bookingData.extra_prices]);

  return <BookingContext.Provider value={{ bookingData, dispatch }}>{children}</BookingContext.Provider>;
};

// Custom Hook
export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
