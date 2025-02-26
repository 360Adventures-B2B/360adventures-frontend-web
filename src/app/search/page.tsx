import React from "react";
import { StayDataType } from "@/data/types";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import StayCard2 from "@/components/StayCard2";
import Pagination from "@/shared/Pagination";
import Input from "@/shared/Input";
import { Search } from "lucide-react";
import TabFilters from "./components/TabFilters";
import SearchView from "./components/SearchView";

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

export default function SearchPage() {
  return (
    <div className={`nc-SectionGridFilterCard container pb-24 lg:pb-28 pt-10`} data-nc-id="SectionGridFilterCard">
      <SearchView />
    </div>
  );
}
