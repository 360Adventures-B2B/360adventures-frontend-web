import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useRef, useState } from "react";

export default function SKeletonDatePicker() {
  const containerRef = useRef(null);

  const cardWidth = 100; 

  const [cardsPerRow, setCardsPerRow] = useState(0);

  const updateGridLayout = () => {
    if (containerRef.current) {
      const containerWidth = (containerRef.current as HTMLDivElement).offsetWidth;
      setCardsPerRow(Math.floor(containerWidth / cardWidth)); 
    }
  };

  useEffect(() => {
    updateGridLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateGridLayout(); 
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="space-y-6 listingSection__wrap">
      <div className="text-lg font-semibold">
        <Skeleton className="w-32 sm:w-48 h-6" />
      </div>

      <div ref={containerRef} className="flex gap-2 justify-start flex-nowrap">
        {Array.from({ length: cardsPerRow }).map((_, index) => (
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
