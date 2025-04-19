export interface CreditHistory {
  ulid: string;
  amount: number;
  type: "Topup" | "Payment" | "Refund";
  notes: string | null;
  created_at: string;
  updated_at: string;
  package: {
    ulid: string;
    name: string;
    product?: {
      ulid: string;
      name: string;
    } | null;
  } | null;
  agent: {
    id: number;
    ulid: string;
    name: string;
    company_name: string | null;
  };
}
