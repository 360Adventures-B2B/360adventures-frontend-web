import { Package } from "./Package";
import { PersonType } from "./PersonType";

export interface Cart {
  id?: number;
  start_date?: string;
  time_slot?: string;
  person_types: PersonType[];
  package: Package;
  created_at?: string;
  updated_at?: string;
}
