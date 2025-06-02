import React, { createContext, useContext, useState } from 'react';

type ErrorState = {
  message: string;
  backUrl?: string;
};

type ErrorContextType = {
  error: ErrorState | null;
  showError: (error: ErrorState) => void;
  hideError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error('useError must be used within ErrorProvider');
  return context;
};

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<ErrorState | null>(null);

  const showError = (err: ErrorState) => setError(err);
  const hideError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
    </ErrorContext.Provider>
  );
};
