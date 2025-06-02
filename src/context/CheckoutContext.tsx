"use client";
import React, { createContext, useContext, useState } from "react";

interface CheckoutContextProps {
  pickupLocations: { [ulid: string]: string };
  setPickupLocation: (ulid: string, value: string) => void;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pickupLocations, setPickupLocationsState] = useState<{ [ulid: string]: string }>({});

  const setPickupLocation = (ulid: string, value: string) => {
    setPickupLocationsState((prev) => ({ ...prev, [ulid]: value }));
  };

  return <CheckoutContext.Provider value={{ pickupLocations, setPickupLocation }}>{children}</CheckoutContext.Provider>;
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
