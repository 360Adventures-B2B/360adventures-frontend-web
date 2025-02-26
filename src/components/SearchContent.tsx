"use client";

import React, { useState } from "react";
import ButtonClose from "@/shared/ButtonClose";
import { Search } from "lucide-react";
import Input from "@/shared/Input";
import Link from "next/link";

export interface SearchContentProps {
  onClickClose?: () => void;
}

const searchResults = [
  {
    id: 1,
    title: "Mount Batur 4WD Jeep Sunrise",
    location: "Ubud, Indonesia",
    image:
      "https://www.pelago.com/img/products/ID-Indonesia/mount-batur-4-wd-jeep-sunrise/62ff7da6-9463-4e30-914c-e72386d100e3_mount-batur-4-wd-jeep-sunrise-xsmall.jpg",
  },
  {
    id: 2,
    title: "Bali Volcano Day Jeep 4WD And Waterfall Private Guided Tour",
    location: "Seminyak, Indonesia",
    image:
      "https://www.pelago.com/img/products/ID-Indonesia/temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour/628dfa6a-3ae9-4b84-ae51-75a9e5ccff71_temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour-xsmall.jpg",
  },
  {
    id: 3,
    title: "Bali Volcano Day Jeep 4WD And Waterfall Private Guided Tour",
    location: "Seminyak, Indonesia",
    image:
      "https://www.pelago.com/img/products/ID-Indonesia/temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour/628dfa6a-3ae9-4b84-ae51-75a9e5ccff71_temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour-xsmall.jpg",
  },
  {
    id: 4,
    title: "Bali Volcano Day Jeep 4WD And Waterfall Private Guided Tour",
    location: "Seminyak, Indonesia",
    image:
      "https://www.pelago.com/img/products/ID-Indonesia/temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour/628dfa6a-3ae9-4b84-ae51-75a9e5ccff71_temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour-xsmall.jpg",
  },
  {
    id: 5,
    title: "Bali Volcano Day Jeep 4WD And Waterfall Private Guided Tour",
    location: "Seminyak, Indonesia",
    image:
      "https://www.pelago.com/img/products/ID-Indonesia/temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour/628dfa6a-3ae9-4b84-ae51-75a9e5ccff71_temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour-xsmall.jpg",
  },
  {
    id: 6,
    title: "Bali Volcano Day Jeep 4WD And Waterfall Private Guided Tour",
    location: "Seminyak, Indonesia",
    image:
      "https://www.pelago.com/img/products/ID-Indonesia/temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour/628dfa6a-3ae9-4b84-ae51-75a9e5ccff71_temesi-waterfall-and-sea-side-lunch-half-day-private-guided-tour-xsmall.jpg",
  },
];

const SearchContent: React.FC<SearchContentProps> = ({ onClickClose }) => {
  const [query, setQuery] = useState("");
  const filteredResults = searchResults.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
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
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 max-h-[500px] overflow-y-auto">
                <div className="space-y-2">
                  {filteredResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-100 transition"
                    >
                      <img src={result.image} alt={result.title} className="w-12 h-12 rounded-md object-cover" />
                      <div className="ml-3">
                        <h4 className="text-sm font-semibold">{result.title}</h4>
                        <p className="text-xs text-gray-500">{result.location}</p>
                      </div>
                    </div>
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
