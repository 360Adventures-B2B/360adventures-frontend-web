"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Route } from "next";
import DatePicker from "../(components)/DatePicker";
import PackageCard from "../(components)/PackageCard";
import { useCheckAvailableProductMutation, useGetDetailProductQuery } from "@/lib/services/productService";
import { formatNumber } from "@/utils/currencyConverter";
import SkeletonHeader from "../skeleton/SkeletonHeader";
import SkeletonTitle from "../skeleton/SkeletonTitle";
import SkeletonSidebar from "../skeleton/SkeletonSidebar";
import SKeletonDatePicker from "../skeleton/SkeletonDatePicker";
import { Product } from "@/interfaces/Product";
import SectionContent from "../(components)/SectionContent";
import Itinerary from "../(components)/Itinerary";
import IncludeExclude from "../(components)/IncludeExclude";
import DetailGallery from "./components/DetailGallery";
import PackageCardSkeleton from "../skeleton/SkeletonPackageCard";
import { useDate } from "@/context/DateContext";
import { useBooking } from "@/context/BookingContext";
import { useUnavailableDates } from "@/context/ProductUnavailableContext";
import { formatDateString } from "@/utils/dateHelper";

export interface ProductDetailPageProps {}

const ProductDetailPage: FC<ProductDetailPageProps> = ({}) => {
  const { slug } = useParams();

  const thisPathname = usePathname();
  const router = useRouter();

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=GALLERIES` as Route);
  };

  const packageSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToPackageSection = () => {
    if (packageSectionRef.current) {
      packageSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      const offset = 80; // Sesuaikan dengan tinggi header sticky Anda
      const elementPosition = packageSectionRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const { data, error, isLoading } = useGetDetailProductQuery(slug as string);
  const product = data?.data;

  const fallbackUrl = "https://dummyimage.com/1000x1000/000/fff";

  const [firstImgSrc, setFirstImgSrc] = useState(fallbackUrl);

  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  // check available product
  const [checkAvailableProduct, { isLoading: isLoadingCheckAvailableProduct }] = useCheckAvailableProductMutation();

  const { selectedDate } = useDate();

  useEffect(() => {
    if (product?.packages) {
      setPackages(product.packages);
    }
  }, [product]);

  useEffect(() => {
    if (product?.featured_image) {
      setFirstImgSrc(product.featured_image);
    }
  }, [product?.featured_image]);

  useEffect(() => {
    if (product?.ulid && selectedDate) {
      const fetchProductAvailability = async () => {
        try {
          const result = await checkAvailableProduct({
            ulid: product.ulid,
            body: { start_date: formatDateString(selectedDate) },
          }).unwrap();

          setPackages(result.data);
        } catch (err) {
          console.error("Error fetching product availability:", err);
        }
      };

      fetchProductAvailability();
    }
  }, [product?.ulid, checkAvailableProduct, selectedDate]);

  // handle date change

  const handleImageError = (index: number) => {
    setImageSrcs((prev) => {
      const newImages = [...prev];
      newImages[index] = fallbackUrl;
      return newImages;
    });
  };

  useEffect(() => {
    if (product?.product_galleries) {
      const slicedImages = product.product_galleries.slice(0, 4).map((g) => g.image);
      setImageSrcs(slicedImages);
    }
  }, [product]);

  const { dispatch } = useBooking();
  const { resetDate } = useDate();

  useEffect(() => {
    resetDate();
    dispatch({ type: "RESET_BOOKING" });
  }, []);

  // for unavailabl date
  const { setUnavailableDates } = useUnavailableDates();

  useEffect(() => {
    if (product) {
      const unavailableDatesFromUnavailabilities =
        product.product_unavailabilities?.map((item) => new Date(item.blocked_date)) || [];

      const unavailableDatesFromQuotaFull = product.product_quota_full?.map((date) => new Date(date)) || [];

      const allUnavailableDates = [...unavailableDatesFromUnavailabilities, ...unavailableDatesFromQuotaFull];

      const uniqueUnavailableDates = [...new Set(allUnavailableDates.map((date) => date.toISOString()))];

      const finalDates = uniqueUnavailableDates.map((date) => new Date(date));

      setUnavailableDates(finalDates);
    }
  }, [product, setUnavailableDates]);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayClick = (e: any) => {
    e.stopPropagation(); // supaya onClick div induk gak jalan
    setIsVideoPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
  };

  const mainContent = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        {/* <div className="flex justify-between items-center">
          <Badge name="Wooden house" />
          <LikeSaveBtns />
        </div> */}

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{product?.name}</h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          {/* <StartRating /> */}
          {/* <span>·</span> */}
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">{product?.location?.name}</span>
          </span>
        </div>

        {/* 4 */}
        {/* <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by <span className="text-neutral-900 dark:text-neutral-200 font-medium">Kevin Francis</span>
          </span>
        </div> */}

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
          {product?.instant_confirmation && (
            <div className="flex items-center space-x-3">
              <i className="las la-check-circle text-2xl"></i>
              <span>Instant Confirmation</span>
            </div>
          )}

          {product?.free_cancellation && (
            <div className="flex items-center space-x-3">
              <i className="las la-ban text-2xl"></i>
              <span>Free Cancellation</span>
            </div>
          )}

          {product?.duration && (
            <div className="flex items-center space-x-3">
              <i className="las la-clock text-2xl"></i>
              <span>{product.duration} Hours</span>
            </div>
          )}

          {product?.pickup_included && (
            <div className="flex items-center space-x-3">
              <i className="las la-shuttle-van text-2xl"></i>
              <span>Pickup Included</span>
            </div>
          )}

          {product?.packages[0]?.quota && (
            <div className="flex items-center space-x-3">
              <i className="las la-users text-2xl"></i>
              <span>Max People {product?.packages[0]?.quota}</span>
            </div>
          )}

          {/* <div className="flex items-center space-x-3">
            <i className="las la-child text-2xl"></i>
            <span>Min Age</span>
          </div> */}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">
            From{" "}
            <span className="text-lg font-semibold text-gray-900 ml-1">
              {formatNumber(product?.selling_price ?? 0)}
            </span>
            {/* <span className="line-through text-gray-400 ml-1">
              {formatNumber(product?.packages?.[0]?.cost_price ?? 0)}
            </span> */}
          </span>
          <div className="flex items-center">
            {/* <p className="text-lg font-semibold text-gray-900">
              {formatNumber(product?.selling_price ?? 0)}
            </p> */}
            {/* <div className="ml-2 text-green-600 bg-green-100 rounded-full px-2 py-1 text-xs">-15%</div> */}
          </div>
          <button
            onClick={scrollToPackageSection}
            className="mt-4 w-full py-2 bg-primary-6000 text-white font-semibold rounded-md hover:bg-primary-700 transition duration-200"
          >
            Select packages
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-ProductDetailPage">
      {/*  HEADER */}
      <DetailGallery
        product_galleries={product?.product_galleries ?? []}
        featured_image={product?.featured_image || ""}
        video_playback={product?.video_playback}
      />

      {isLoading ? (
        <SkeletonHeader />
      ) : (
        <header className="rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div
              className={`col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden ${
                !product?.video_playback ? "cursor-pointer" : ""
              }`}
              onClick={!product?.video_playback ? handleOpenModalImageGallery : undefined}
            >
              {!isVideoPlaying ? (
                <>
                  <Image
                    fill
                    className="object-cover rounded-md sm:rounded-xl"
                    src={firstImgSrc}
                    alt="Product Image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    onError={() => setFirstImgSrc(fallbackUrl)}
                  />

                  {/* Tombol Play di tengah gambar */}
                  {product?.video_playback && (
                    <button
                      onClick={handlePlayClick}
                      className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity rounded-md sm:rounded-xl"
                      aria-label="Play Video"
                    >
                      {/* Icon Play sederhana (bisa ganti dengan SVG atau icon library) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-16 h-16"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5l14 7-14 7V5z" />
                      </svg>
                    </button>
                  )}
                </>
              ) : (
                // Video fullscreen di area gambar utama
                <div className="absolute inset-0 bg-black rounded-md sm:rounded-xl z-20 flex items-center justify-center">
                  <video
                    className="w-full h-full object-cover rounded-md sm:rounded-xl"
                    src={product?.video_playback}
                    controls
                    autoPlay
                    muted={false}
                    playsInline
                  />
                  {/* Tombol close video di pojok */}
                  <button
                    onClick={handleCloseVideo}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75"
                    aria-label="Close Video"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>

            {imageSrcs.map((src, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""}`}
              >
                <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                  <Image
                    fill
                    className="object-cover rounded-md sm:rounded-xl"
                    src={src}
                    alt={`Gallery Image ${index + 2}`}
                    sizes="400px"
                    onError={() => handleImageError(index)}
                  />
                </div>

                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

            <button
              className="absolute z-30 hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="w-5 h-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">Show all photos</span>
            </button>
          </div>
        </header>
      )}

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {isLoading ? <SkeletonTitle /> : mainContent()}

          <div ref={packageSectionRef} className="package-section">
            {isLoading ? <SKeletonDatePicker /> : <DatePicker />}
          </div>

          {isLoadingCheckAvailableProduct || isLoading ? (
            <div>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="mb-5">
                  <PackageCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {packages?.map((pkg) => (
                <div key={pkg.id} className="mb-5">
                  <PackageCard packageData={pkg} />
                </div>
              ))}
            </div>
          )}

          {product?.highlight && <SectionContent title="Highlight" content={product.highlight} />}

          <IncludeExclude includes={product?.includes} excludes={product?.excludes} />

          {product?.description && <SectionContent title="Description" content={product.description} />}

          {product?.itinerary && product.itinerary.length > 0 && <Itinerary itineraryData={product.itinerary} />}

          {product?.cancellation_policy && (
            <SectionContent title="Cancellation Policy" content={product.cancellation_policy} />
          )}
          {product?.how_to_reach && <SectionContent title="How To Reach" content={product.how_to_reach} />}
          {product?.additional_information && (
            <SectionContent title="Additional Information" content={product.additional_information} />
          )}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{isLoading ? <SkeletonSidebar /> : renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
