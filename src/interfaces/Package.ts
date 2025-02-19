import { PersonType } from "./PersonType";
import { Product } from "./Product";

export interface Package {
  id: number;
  product_id: number;
  name: string;
  description: string;
  cost_price: number;
  selling_price: number;
  retail_price: number;
  start_time: string | null;
  end_time: string | null;
  time_slot: [];
  quota: number;
  person_types: PersonType[];
  product?: Product;
  created_at?: string;
  updated_at?: string;
}
