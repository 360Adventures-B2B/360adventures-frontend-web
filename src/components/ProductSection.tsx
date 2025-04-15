"use client";
import React, { FC, ReactNode, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import { useGetProductQuery } from "@/lib/services/productService";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./skeleton/ProductCardSkeleton";
import { useGetCategoriesQuery } from "@/lib/services/categoryService";
import Link from "next/link";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface ProductSectionProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const ProductSection: FC<ProductSectionProps> = ({
  gridClass = "",
  heading = "Popular things to do ",
  subHeading = "",
}) => {
  const { data: categories, error: categoryError, isLoading: isCategoryLoading } = useGetCategoriesQuery();

  const tabsCategories =
    categories && Array.isArray(categories.data)
      ? ["Popular", ...categories.data.map((category) => category?.name?.trim() || "").filter((name) => name !== "")]
      : ["Popular"];
      
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const queryParam = selectedCategory === "Popular" ? {} : { category: [selectedCategory] };

  const {
    data: products,
    isLoading: isProductLoading,
    isFetching: isFetchingProduct,
  } = useGetProductQuery(queryParam, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="nc-ProductSection relative">
      <HeaderFilter
        tabActive={"Popular"}
        subHeading={subHeading}
        tabs={tabsCategories}
        heading={heading}
        onClickTab={(category) => setSelectedCategory(category)}
      />
      <div className={`grid grid-cols-2 gap-6 xl:grid-cols-4 ${gridClass}`}>
        {isProductLoading || isCategoryLoading || isFetchingProduct
          ? Array(4)
              .fill(undefined)
              .map((_, index) => <ProductCardSkeleton key={index} />)
          : products?.data?.map((product) => <ProductCard data={product} key={product.id} />)}
      </div>

      <div className="flex mt-16 justify-center items-center">
        <Link href="/search">
          <ButtonPrimary>See All Activity</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
