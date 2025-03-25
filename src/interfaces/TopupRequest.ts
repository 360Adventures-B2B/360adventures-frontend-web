import { Bank } from "./Bank";
import { User } from "./User";

export interface ITopupRequest {
  agent?: User;
  bank?: Bank;
  agent_id: number;
  bank_id: number;
  reference_id: string;
  amount: number;
  fee_credit_card: number;
  point_earned: number;
  last_amount: number;
  after_amount: number;
  status: "success" | "reject" | "pending";
  payment_method: "payment_gateway" | "bank_transfer" | "qr_code";
  transfer_slip?: string | null;
  created_at: string;
  updated_at?: string;
}
