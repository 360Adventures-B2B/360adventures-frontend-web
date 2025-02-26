import React, { useState } from "react";
import { Search } from "lucide-react";
import Input from "../Input";
import Link from "next/link";

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
export default function NavSearch() {
  const [query, setQuery] = useState("");
  const filteredResults = searchResults.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="relative flex items-center w-full max-w-md">
      <form className="flex items-center w-full rounded-full px-4 py-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />

          <Input
            className="w-full pl-10 rounded-full"
            value={query}
            type="search"
            placeholder="Tour, activity, or attraction"
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-1 rounded-lg z-20 p-3 overflow-hidden">
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto">
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
                    <Link href={`/search?keyword=${query}`}>
                      <button className="w-full px-4 py-2 text-sm font-medium text-primary-6000 border border-primary-6000 rounded-lg hover:bg-primary-50 transition">
                        See all results for "{query}"
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                // <p className="p-3 text-sm text-gray-500 text-center">No results found.</p>
                <div className="text-center mt-4">
                  <div className="mt-2">
                    <Link href={`/search?keyword=${query}`}>
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
      </form>
    </div>
  );
}
