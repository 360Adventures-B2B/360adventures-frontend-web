"use client";

import React, { useEffect, useState } from "react";
import ButtonClose from "@/shared/ButtonClose";
import { Search } from "lucide-react";
import Input from "@/shared/Input";
import Link from "next/link";
import { useGetProductQuery } from "@/lib/services/productService";
import { Product } from "@/interfaces/Product";
import SearchItem from "./SearchItem";

export interface SearchContentProps {
  onClickClose?: () => void;
}

const SearchContent: React.FC<SearchContentProps> = ({ onClickClose }) => {
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    if (!query) return;
  }, [query]);

  let queryParam = { q: query };

  const {
    data: products,
    isLoading: isProductLoading,
    isFetching: isFetchingProduct,
  } = useGetProductQuery(queryParam, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-neutral-900">
      <div className="search-header sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b border-[#e9e9e9] py-4 px-5">
        <form>
          <div className="flex justify-between items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full pl-10 pr-4 rounded-full"
                value={query}
                type="search"
                placeholder="Tour, activity, or attraction"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <ButtonClose onClick={onClickClose} />
          </div>
        </form>
      </div>
      <div className="cart-container flex-grow overflow-y-auto py-6 px-5">
        {query && (
          <div className="">
            {products?.data && products?.data?.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 max-h-[500px] overflow-y-auto">
                <div className="space-y-2">
                  {products?.data?.map((product: Product) => (
                    <SearchItem key={product.id} product={product} />
                  ))}
                </div>
                {/* Sticky button */}
                <div className="sticky bottom-0 bg-white py-2">
                  <Link href={`/search?keyword=${query}`} onClick={onClickClose}>
                    <button className="w-full px-4 py-2 text-sm font-medium text-primary-6000 border border-primary-6000 rounded-lg hover:bg-primary-50 transition">
                      See all results for "{query}"
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center mt-4">
                <div className="mt-2">
                  <Link href={`/search?keyword=${query}`} onClick={onClickClose}>
                    <button className="w-full px-4 py-2 text-sm font-medium text-primary-6000 border border-primary-6000 rounded-lg hover:bg-primary-50 transition">
                      See all results for "{query}"
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
