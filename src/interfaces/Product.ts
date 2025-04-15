import { StaticImageData } from "next/image";
import { Category } from "./Category";
import { Location } from "./Location";
import { Package } from "./Package";

// export interface Product {
//   id: number;
//   category_id: number;
//   location_id: number;
//   author_id: number;
//   name: string;
//   slug: string;
//   content: string;
//   instant_confirmation: boolean;
//   free_cancellation: boolean;
//   pickup_included: string;
//   voucher_type: string;
//   duration: number;
//   original_price: number;
//   price: number;
//   created_at: string;
//   updated_at: string;
//   category: Category;
//   location: Location;
//   author: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   product_galleries: (StaticImageData | string)[] | undefined;
//   packages?: Package[];
// }

export interface ProductResponse {
  code: number;
  status: string;
  message: string;
  data: Product;
}

export interface Product {
  id: number;
  ulid: string;
  name: string;
  slug: string;
  duration: number;
  selling_price: number;
  instant_confirmation: boolean;
  free_cancellation: boolean;
  pickup_included: boolean;
  includes: IncludeExclude[];
  excludes: IncludeExclude[];
  description: string;
  highlight: string;
  cancellation_policy: string;
  itinerary: Itinerary[];
  how_to_reach: string;
  additional_information: string;
  voucher_type: string;
  status: string;
  category: Category;
  location: Location;
  author: Author;
  product_galleries: ProductGallery[];
  product_unavailabilities: any[]; // Define detail if needed
  product_blocks: any[]; // Define detail if needed
  packages: Package[];
}

export interface IncludeExclude {
  title: string;
}

export interface Itinerary {
  title: string;
  description: string;
}

export interface Category {
  id: number;
  ulid: string;
  name: string;
}

export interface Location {
  id: number;
  ulid: string;
  name: string;
}

export interface Author {
  id: number;
  ulid: string;
  name: string;
  email: string;
}

export interface ProductGallery {
  id: number;
  ulid: string;
  image: string;
}

export interface ProductPackage {
  id: number;
  ulid: string;
  product_id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  time_slot: string[];
  quota: number;
  selling_price: number;
  person_types: PersonType[];
  extra_prices: ExtraPrice[];
  product: any; 
  quota_left: number;
}

export interface PersonType {
  name: string;
  desc: string;
  cost_price: number;
  selling_price: number;
  retail_price: number;
}

export interface ExtraPrice {
  name: string;
  type: string;
  price: number;
}
