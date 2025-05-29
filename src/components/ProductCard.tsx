import React, { FC, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import GallerySlider from "./GallerySlider";
import { Product } from "@/interfaces/Product";
import { formatNumber } from "@/utils/currencyConverter";
import Image from "next/image";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  size?: "default" | "small";
}

const ProductCard: FC<ProductCardProps> = ({ size = "default", className = "", data }) => {
  const galleryImgs = data?.product_galleries.map((item) => item.image);
  const fallbackUrl = "https://dummyimage.com/600x400/000/fff";
  const [imgSrc, setImgSrc] = useState(data?.featured_image || fallbackUrl);
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        {/* <GallerySlider
          uniqueID={`ProductCard_${data?.id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={galleryImgs}
          href="#"
          galleryClass={size === "default" ? undefined : ""}
        /> */}
        <div className="aspect-w-16 aspect-h-11 ">
          <Image
            src={imgSrc}
            fill
            alt="listing card gallery"
            className={`object-cover`}
            onError={() => setImgSrc(fallbackUrl)}
            sizes="(max-width: 1025px) 100vw, 300px"
          />
        </div>
        {data?.id !== undefined && (
          <BtnLikeIcon className="absolute right-3 top-3 z-[1]" productId={data.id} isLiked={data.is_wishlist} />
        )}
        {data?.is_deal && (
          <SaleOffBadge className="absolute left-3 top-3" desc={`-${data?.selling_price_deal_percent}% today`} />
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{data?.name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === "default" && (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{data?.location?.name}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          {/* Free Cancellation - Mobile (di atas harga) */}
          <div className="mb-1 md:hidden self-start min-h-[20px]">
            {data?.free_cancellation && (
              <div className="text-[9px] md:text-[10px] font-medium bg-green-100 text-green-600 px-2 md:px-3 py-0 rounded-md shadow-sm">
                Free Cancellation
              </div>
            )}
          </div>

          {/* Wrapper Harga & Free Cancellation Desktop */}
          <div className="flex w-full items-center justify-between">
            {/* Harga */}
            <div className="flex flex-col items-start min-h-[40px] md:min-h-[32px]">
              <div className="text-[9px] text-gray-500 font-medium">
                <span>From</span>
                {data?.is_deal && data.selling_price ? (
                  <span className="line-through ml-1 text-[10px] md:text-[11px] text-red-500">
                    {formatNumber(data.selling_price)}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center">
                <span className="text-xs md:text-sm font-semibold text-primary">
                  {formatNumber(data?.is_deal ? data?.selling_price_deal : data?.selling_price ?? 0)}
                </span>
              </div>
            </div>

            {/* Free Cancellation - Desktop (di tengah, antara "From" dan Harga) */}
            <div className="hidden md:flex flex-col items-center justify-center md:mx-4 min-h-[32px]">
              {data?.free_cancellation && (
                <div className="text-[9px] font-medium bg-green-100 text-green-600 px-2 md:px-3 py-0 rounded-md shadow-sm">
                  Free Cancellation
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ProductCard group relative bg-white dark:bg-neutral-900 ${
        size === "default" ? "border border-neutral-100 dark:border-neutral-800 " : ""
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="ProductCard"
    >
      {renderSliderGallery()}
      <Link href={`/product/${data?.slug ?? ""}`}>{renderContent()}</Link>
    </div>
  );
};

export default ProductCard;
