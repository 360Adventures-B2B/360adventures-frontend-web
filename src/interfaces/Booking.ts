import { ExtraPrice } from "./ExtraPrice";
import { PersonType } from "./PersonType";
import { User } from "./User";

export interface IBooking {
  ulid: string;
  agent_id: number;
  package_id: number;
  order_id: string;
  booking_reference_id: string;
  booking_time: string;
  start_date: string;
  time_slot: string;
  units: number;
  stock_out_type: string;
  api_partner_name: string | null;
  booking_status: string;
  payment_status: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  special_requirement: string;
  pickup_location: string;
  tax: number;
  total_price: number;
  person_types: PersonType[];
  extra_prices: ExtraPrice[];
  package: Package;
  agent: User;
}

export interface Package {
  ulid: string;
  name: string;
  product: Product;
}

export interface Product {
  ulid: string;
  name: string;
  duration: number;
  instant_confirmation: boolean;
  free_cancellation: boolean;
  pickup_included: boolean;
  image: string;
}
