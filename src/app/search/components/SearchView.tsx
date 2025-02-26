"use client";
import React from "react";
import { useGetProductQuery } from "@/lib/services/productService";
import Pagination from "@/shared/Pagination";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";

export default function SearchView() {
  const searchParams = useSearchParams();
  const getParam = (key: string, isArray = true) => {
    const value = searchParams.get(key);
    if (!value) return undefined;

    return isArray ? JSON.parse(value) : value;
  };

  const filters = Object.fromEntries(
    Object.entries({
      destinations: getParam("destinations"),
      bookingOptions: getParam("bookingOptions"),
      categories: getParam("categories"),
      price_range: getParam("price_range", false)?.split(";").map(Number),
      keyword: getParam("keyword", false),
      page: getParam("page", false),
    }).filter(
      ([_, value]) =>
        value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0)
    )
  );
  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetProductQuery(Object.keys(filters).length > 0 ? filters : undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("🚀 ~ SearchView ~ products:", products);

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-5">All Product</h2>
      <SearchForm totalResults={products?.total || 0} />

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isFetching
          ? Array(4)
              .fill(undefined)
              .map((_, index) => <ProductCardSkeleton key={index} />)
          : products?.data?.map((product) => <ProductCard data={product} key={product.id} />)}
      </div>
      {!isLoading && (products?.total_pages || 1) > 1 && (
        <div className="flex mt-16 justify-center items-center">
          <Pagination totalPages={products?.total_pages || 1} />
        </div>
      )}
    </div>
  );
}
