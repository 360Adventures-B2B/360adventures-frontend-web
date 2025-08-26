import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Location } from "@/interfaces/Location";

export interface LocationCardProps {
  className?: string;
  location: Location;
}

const LocationCard: FC<LocationCardProps> = ({ className = "", location }) => {
  const fallbackUrl = "https://dummyimage.com/300x500/000/fff";
  const [imgSrc, setImgSrc] = useState(location?.image || fallbackUrl);

  return (
    <Link
      href={{
        pathname: "/search",
        query: {
          location: JSON.stringify([location?.name]),
        },
      }}
      className={`nc-LocationCard flex flex-col ${className}`}
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          src={imgSrc}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
          fill
          sizes="(max-width: 400px) 100vw, 300px"
          onError={() => setImgSrc(fallbackUrl)}
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {location?.name}
        </h2>
        <span
          className={`block mt-1.5 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {location?.products_count} properties
        </span>
      </div>
    </Link>
  );
};

export default LocationCard;
