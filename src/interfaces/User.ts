export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  phone_verified_at: string | null;
  company_name: string | null;
  company_address: string | null;
  country: string | null;
  state: string | null;
  zip_code: string | null;
  credit_amount: string;
  is_active: boolean;
  is_approve: boolean;
  is_verify: boolean;
  approved_at: string | null;
  created_at: string | null;
  token: string | null;
}
