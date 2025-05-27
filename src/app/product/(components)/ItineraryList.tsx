// components/ItineraryList.tsx
import React, { useState, useEffect, useRef } from "react";

type ItineraryItem = {
  title: string;
  description: string;
};

interface Props {
  itineraryData: ItineraryItem[];
}

const ItineraryList: React.FC<Props> = ({ itineraryData }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showToggle, setShowToggle] = useState<boolean[]>([]);

  const refs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const checkOverflow = () => {
      const flags = refs.current.map((el) => {
        if (!el) return false;
        return el.scrollHeight > el.clientHeight + 2;
      });
      setShowToggle(flags);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [itineraryData]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ul className="relative">
      {itineraryData.map((item, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <li key={index} className="flex relative pb-6">
            {/* Icon + garis */}
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

            {/* Konten */}
            <div className="ml-4 flex-1">
              <p className="font-semibold text-lg">{item.title}</p>
              <p
                className="text-neutral-600 dark:text-neutral-300 mt-2 overflow-hidden"
                ref={(el) => (refs.current[index] = el)}
                style={
                  !isExpanded
                    ? {
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }
                    : {}
                }
              >
                {item.description}
              </p>
              {showToggle[index] && (
                <button
                  className="text-blue-500 hover:underline mt-2"
                  onClick={() => toggleExpand(index)}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ItineraryList;
