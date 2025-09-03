import { ExtraPrice } from "./ExtraPrice";
import { PersonType } from "./PersonType";

export interface Package {
  ulid: string;
  name: string;
  pickup_included: boolean;
  enable_phone?: boolean;
  enable_country?: boolean;
  enable_city?: boolean;
}

export interface Product {
  ulid: string;
  name: string;
  slug: string;
  image: string;
}

export interface Cart {
  ulid: string;
  agent_id: number;
  package_id: number;
  start_date: string;
  time_slot: string;
  person_types: PersonType[];
  extra_prices: ExtraPrice[];
  package: Package;
  total_price: number;
  product: Product;
  pickup_location?: string;
  is_expired?: boolean;

  payment_status?: string;
  booking_status?: string;
  created_at?: string;
  updated_at?: string;
}
