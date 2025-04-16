import { createContext, FC, ReactNode, useContext, useState } from "react";

interface DateProviderProps {
  children: ReactNode;
}

type DateContextType = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  highlightedDate: Date | null;
  setHighlightedDate: (date: Date | null) => void;
  resetDate: () => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};

export const DateProvider: FC<DateProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);
  const resetDate = () => {
    setSelectedDate(null);
    setHighlightedDate(null);
  };
  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate, highlightedDate, setHighlightedDate, resetDate }}>
      {children}
    </DateContext.Provider>
  );
};
