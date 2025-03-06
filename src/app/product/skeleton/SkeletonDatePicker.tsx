import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useRef, useState } from "react";

export default function SKeletonDatePicker() {
  const containerRef = useRef(null);

  const totalDays = 7;

  const getNextDays = (count: any) => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const [dates, setDates] = useState(getNextDays(totalDays));

  useEffect(() => {
    const updateGridLayout = () => {
      if (containerRef.current) {
        const containerWidth = (containerRef.current as HTMLDivElement).offsetWidth;
        const cardWidth = 100;
        const cardsPerRow = Math.floor(containerWidth / cardWidth);
        setDates(getNextDays(cardsPerRow));
      }
    };

    updateGridLayout();
    window.addEventListener("resize", updateGridLayout);

    return () => {
      window.removeEventListener("resize", updateGridLayout);
    };
  }, []);

  return (
    <div className="space-y-6 listingSection__wrap">
      <div className="text-lg font-semibold">
        <Skeleton className="w-32 sm:w-48 h-6" />
      </div>

      <div ref={containerRef} className="flex gap-2 justify-start flex-nowrap">
        {dates.map((_, index) => (
          <div
            key={index}
            className="w-[80px] h-[80px] rounded-lg flex items-center justify-center flex-col cursor-pointer bg-gray-100"
          >
            <Skeleton className="w-8 h-3" />
            <Skeleton className="w-10 h-4 mt-1" />
          </div>
        ))}
        <div className="w-[80px] h-[80px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
          <Skeleton className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
