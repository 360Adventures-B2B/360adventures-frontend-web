"use client";
import { createContext, useContext, useState } from "react";

type Step = "otp" | "reset-password";

interface ForgotPasswordContextType {
  step: Step;
  setStep: (step: Step) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const ForgotPasswordContext = createContext<ForgotPasswordContextType | undefined>(undefined);

export const ForgotPasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<Step>("reset-password");
  const [token, setToken] = useState<string | null>(null);

  return (
    <ForgotPasswordContext.Provider value={{ step, setStep, token, setToken }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPassword = () => {
  const context = useContext(ForgotPasswordContext);
  if (!context) {
    throw new Error("useForgotPassword must be used within ForgotPasswordProvider");
  }
  return context;
};
