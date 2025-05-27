import { ExtraPrice } from "./ExtraPrice";
import { PersonType } from "./PersonType";
import { IncludeExclude, Itinerary, Product } from "./Product";

export interface Package {
  id: number;
  ulid: string;
  product_id: number;
  name: string;
  description: string;
  selling_price: number;
  start_time: string | null;
  end_time: string | null;
  time_slot: [];
  quota: number;
  person_types: PersonType[];
  extra_prices: ExtraPrice[];
  includes: IncludeExclude[];
  excludes: IncludeExclude[];
  cancellation_policy: string;
  itinerary: Itinerary[];
  additional_information: string;
  product?: Product;
  created_at?: string;
  updated_at?: string;
}
