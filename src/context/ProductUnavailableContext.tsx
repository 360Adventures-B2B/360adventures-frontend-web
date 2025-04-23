import React, { createContext, useContext, useState, ReactNode } from "react";

interface UnavailableDatesContextType {
  unavailableDates: Date[];
  setUnavailableDates: React.Dispatch<React.SetStateAction<Date[]>>;
}

const UnavailableDatesContext = createContext<UnavailableDatesContextType | undefined>(undefined);

export const UnavailableDatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  return (
    <UnavailableDatesContext.Provider value={{ unavailableDates, setUnavailableDates }}>
      {children}
    </UnavailableDatesContext.Provider>
  );
};

export const useUnavailableDates = (): UnavailableDatesContextType => {
  const context = useContext(UnavailableDatesContext);
  if (!context) {
    throw new Error("useUnavailableDates must be used within UnavailableDatesProvider");
  }
  return context;
};
