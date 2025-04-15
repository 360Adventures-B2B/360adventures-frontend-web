import React, { useState } from "react";

type ItineraryItem = {
  title: string;
  description: string;
};

const Itinerary = ({ itineraryData }: { itineraryData: ItineraryItem[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Itinerary</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
      <ul className="relative">
        {itineraryData.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const shortText = item.description.slice(0, 100);

          return (
            <li key={index} className="flex relative pb-6">
              {/* Kolom ikon dan garis */}
              <div className="flex flex-col items-center relative w-8">
                {index !== itineraryData.length - 1 && (
                  <div className="absolute top-6 bottom-0 left-1/2 transform -translate-x-1/2 w-px border-l-2 border-dashed border-gray-400"></div>
                )}
                <div className="relative z-10">
                  <div className="bg-white p-1 rounded-full flex items-center justify-center">
                    <i className="la la-map-marker-alt text-primary-700 text-2xl"></i>
                  </div>
                </div>
              </div>

              {/* Konten itinerary */}
              <div className="ml-4 flex-1">
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-neutral-600 dark:text-neutral-300 mt-2">
                  {isExpanded ? item.description : `${shortText}...`}
                </p>
                <button className="text-blue-500 hover:underline mt-2" onClick={() => toggleExpand(index)}>
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Itinerary;
