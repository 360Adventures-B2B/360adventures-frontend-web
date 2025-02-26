"use client";
import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import { useGetProductQuery } from "@/lib/services/productService";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./skeleton/ProductCardSkeleton";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card2",
}) => {
  const { data: products, error, isLoading } = useGetProductQuery(undefined);
  console.log("🚀 ~ products:", products);

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter tabActive={"New York"} subHeading={subHeading} tabs={tabs} heading={heading} />
      <div className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}>
        {isLoading
          ? Array(4)
              .fill(undefined)
              .map((_, index) => <ProductCardSkeleton key={index} />)
          : products?.data?.map((product) => <ProductCard data={product} key={product.id} />)}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
