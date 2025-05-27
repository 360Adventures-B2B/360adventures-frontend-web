// components/Itinerary.tsx
import React from "react";
import ItineraryList from "./ItineraryList";

type ItineraryItem = {
  title: string;
  description: string;
};

const Itinerary = ({ itineraryData }: { itineraryData: ItineraryItem[] }) => {
  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Itinerary</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>

      <ItineraryList itineraryData={itineraryData} />
    </div>
  );
};

export default Itinerary;