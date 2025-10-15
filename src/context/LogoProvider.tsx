// src/contexts/LogoProvider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";

interface LogoContextProps {
  logo: string;
}

const LogoContext = createContext<LogoContextProps>({ logo: "/img/360adventures-logo.png" });
export const useLogo = () => useContext(LogoContext);

interface Props {
  logo: string;
  children: ReactNode;
}

export function LogoProvider({ logo, children }: Props) {
  return <LogoContext.Provider value={{ logo }}>{children}</LogoContext.Provider>;
}
