"use client";

import React from "react";
import { useGetWishlistQuery } from "@/lib/services/wishlistService";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/shared/Pagination";
import { useSearchParams } from "next/navigation";
import EmptyData from "@/components/EmptyData";

const AccountSavelists = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const {
    data: products,
    isLoading: isProductLoading,
    isFetching: isFetchingProduct,
  } = useGetWishlistQuery(page ? { page } : {});

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-3xl font-semibold">Account Wishlist</h2>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div>
        {isProductLoading || isFetchingProduct ? (
          <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
            {Array(4)
              .fill(undefined)
              .map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
          </div>
        ) : products?.data && products.data.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
            {products.data.map((product, index) => (
              <ProductCard data={product} key={`product-${product.id}-${index}`} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No wishlists found.</div>
        )}
        {(!isProductLoading || !isFetchingProduct) && (products?.pagination?.last_page || 1) > 1 && (
          <div className="flex mt-16 justify-center items-center">
            <Pagination totalPages={products?.pagination?.last_page || 1} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSavelists;
