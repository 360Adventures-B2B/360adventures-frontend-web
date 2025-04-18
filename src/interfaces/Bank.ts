export interface Bank {
  id: number;
  ulid: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  image: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
