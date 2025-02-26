import { StaticImageData } from "next/image";
import { Category } from "./Category";
import { Location } from "./Location";
import { Package } from "./Package";

export interface Product {
  id: number;
  category_id: number;
  location_id: number;
  author_id: number;
  name: string;
  slug: string;
  content: string;
  instant_confirmation: boolean;
  free_cancellation: boolean;
  pickup_included: string;
  voucher_type: string;
  duration: number;
  original_price: number;
  price: number;
  created_at: string;
  updated_at: string;
  category: Category;
  location: Location;
  author: {
    id: number;
    name: string;
    email: string;
  };
  product_galleries: (StaticImageData | string)[] | undefined;
  packages?: Package[];
}
