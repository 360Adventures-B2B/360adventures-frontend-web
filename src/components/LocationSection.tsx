"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { useWindowSize } from "react-use";
import LocationCard from "./LocationCard";
import { variants } from "@/utils/animationVariants";
import { useGetLocationsQuery } from "@/lib/services/locationsService";
import LocationCardSkeleton from "./skeleton/LocationCardSkeleton";

export interface LocationSectionProps {
  className?: string;
  heading?: string;
  subHeading?: string;
  itemPerRow?: 4 | 5;
}
const LocationSection: FC<LocationSectionProps> = ({
  heading = "Explorer our destinations",
  subHeading = "Popular places to recommends for you",
  className = "",
  itemPerRow = 5,
}) => {
  const { data: locations, error, isLoading } = useGetLocationsQuery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const [numberOfItems, setNumberOfitem] = useState(0);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth < 320) {
      return setNumberOfitem(1);
    }
    if (windowWidth < 500) {
      return setNumberOfitem(itemPerRow - 3);
    }
    if (windowWidth < 1024) {
      return setNumberOfitem(itemPerRow - 2);
    }
    if (windowWidth < 1280) {
      return setNumberOfitem(itemPerRow - 1);
    }

    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < (locations?.data?.length ?? 0) - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  //   if (!numberOfItems) return null;

  return (
    <div className={`nc-LocationSection ${className}`}>
      <Heading desc={subHeading}>{heading}</Heading>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} {...handlers}>
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul initial={false} className="relative whitespace-nowrap -mx-2 xl:-mx-4">
              <AnimatePresence initial={false} custom={direction}>
                {isLoading
                  ? Array.from({ length: numberOfItems }).map((_, index) => (
                      <motion.li
                        className="relative inline-block px-2 xl:px-4"
                        key={index}
                        style={{ width: `calc(1/${numberOfItems} * 100%)` }}
                      >
                        <LocationCardSkeleton />
                      </motion.li>
                    ))
                  : locations?.data?.map((location, indx) => (
                      <motion.li
                        className="relative inline-block px-2 xl:px-4"
                        custom={direction}
                        initial={{ x: `${(currentIndex - 1) * -100}%` }}
                        animate={{ x: `${currentIndex * -100}%` }}
                        variants={variants(200, 1)}
                        key={indx}
                        style={{ width: `calc(1/${numberOfItems} * 100%)` }}
                      >
                        <LocationCard location={location} />
                      </motion.li>
                    ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex ? (
            <PrevBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}

          {locations?.data && locations.data.length > currentIndex + numberOfItems ? (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}
        </div>
      </MotionConfig>
    </div>
  );
};

export default LocationSection;
