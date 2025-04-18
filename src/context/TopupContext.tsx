import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface TopupState {
  amount: number | "custom";
  customAmount: number;
  payment_method: "credit_card" | "bank_transfer" | "qr_code";
  bank_id: string;
  transfer_slip: File | null;
}

type TopupAction =
  | { type: "SET_AMOUNT"; payload: number | "custom" }
  | { type: "SET_CUSTOM_AMOUNT"; payload: number }
  | { type: "SET_PAYMENT_METHOD"; payload: "credit_card" | "bank_transfer" | "qr_code" }
  | { type: "SET_BANK_ID"; payload: string }
  | { type: "SET_TRANSFER_SLIP"; payload: File | null }
  | { type: "RESET_TOPUP" };

const initialState: TopupState = {
  amount: 0,
  customAmount: 0,
  payment_method: "credit_card",
  bank_id: "",
  transfer_slip: null,
};

const TopupContext = createContext<{
  state: TopupState;
  dispatch: React.Dispatch<TopupAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

function topupReducer(state: TopupState, action: TopupAction): TopupState {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_CUSTOM_AMOUNT":
      return { ...state, customAmount: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, payment_method: action.payload };
    case "SET_BANK_ID":
      return { ...state, bank_id: action.payload };
    case "SET_TRANSFER_SLIP":
      return { ...state, transfer_slip: action.payload };
    case "RESET_TOPUP":
      return initialState;
    default:
      return state;
  }
}

export function TopupProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(topupReducer, initialState);
  return <TopupContext.Provider value={{ state, dispatch }}>{children}</TopupContext.Provider>;
}

export const useTopup = (): {
  state: TopupState;
  dispatch: React.Dispatch<TopupAction>;
} => {
  const context = useContext(TopupContext);
  if (!context) {
    throw new Error("useTopup must be used within a TopupProvider");
  }
  return context;
};
