"use client";

import React, { FC, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonClose from "@/shared/ButtonClose";
import Input from "@/shared/Input";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Route } from "next";
import { Amenities_demos, PHOTOS } from "../constant";
import StayDatesRangeInput from "../StayDatesRangeInput";
import GuestsInput from "../GuestsInput";
import SectionDateRange from "../SectionDateRange";
import DatePicker from "../(components)/DatePicker";
import PackageCard from "../(components)/PackageCard";
import { useGetDetailProductQuery } from "@/lib/services/productService";
import { formatNumber } from "@/utils/currencyConverter";

export interface ProductDetailPageProps {}

const ProductDetailPage: FC<ProductDetailPageProps> = ({}) => {
  //

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const thisPathname = usePathname();
  const router = useRouter();

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
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

  const { data: product, error, isLoading } = useGetDetailProductQuery(1);

  const renderSection1 = () => {
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
          <div className="flex items-center space-x-3">
            <i className="las la-check-circle text-2xl"></i>
            <span>Instant Confirmation</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-ban text-2xl"></i>
            <span>Free Cancellation</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-clock text-2xl"></i>
            <span>Duration</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-shuttle-van text-2xl"></i>
            <span>Pickup Included</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-users text-2xl"></i>
            <span>Max People</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-child text-2xl"></i>
            <span>Min Age</span>
          </div>
        </div>
      </div>
    );
  };

  const hightlight = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Hightlight</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>
            Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool,
            a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.
          </span>
          <br />
          <br />
          <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
          <br /> <br />
          <span>
            The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are
            available at the accommodation, while cycling can be enjoyed nearby.
          </span>
        </div>
      </div>
    );
  };

  const includeExlcude = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">What's Included</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Included Section */}
            <div>
              <h2 className="font-semibold">Includes</h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="las la-check-circle text-xl mr-2 text-green-600"></i> Free WiFi
                </li>
                <li className="flex items-center">
                  <i className="las la-check-circle text-xl mr-2 text-green-600"></i> Private Bathroom
                </li>
                <li className="flex items-center">
                  <i className="las la-check-circle text-xl mr-2 text-green-600"></i> Hairdryer & Free Toiletries
                </li>
                <li className="flex items-center">
                  <i className="las la-check-circle text-xl mr-2 text-green-600"></i> Bicycle & Car Rental Service
                </li>
              </ul>
            </div>

            {/* Not Included Section */}
            <div>
              <h2 className="font-semibold">Excludes</h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="las la-times-circle text-xl mr-2 text-red-600"></i> Gratuities
                </li>
                <li className="flex items-center">
                  <i className="las la-times-circle text-xl mr-2 text-red-600"></i> Personal Expenses
                </li>
                <li className="flex items-center">
                  <i className="las la-times-circle text-xl mr-2 text-red-600"></i> Travel Insurance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const description = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Descriptipn</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>
            Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool,
            a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.
          </span>
          <br />
          <br />
          <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
          <br /> <br />
          <span>
            The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are
            available at the accommodation, while cycling can be enjoyed nearby.
          </span>
        </div>
      </div>
    );
  };

  const itinerary = () => {
    const itineraryData = [
      {
        title: "The Symphony 9 Tam Coc",
        duration: "30 mins",
        admission: "Complimentary WiFi",
        description:
          "Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities.",
      },
      {
        title: "Private Bathroom & Facilities",
        duration: "15 mins",
        admission: "Free toiletries",
        description: "There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.",
      },
      {
        title: "Bicycle & Car Rental",
        duration: "45 mins",
        admission: "Rental Service Available",
        description:
          "The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are available at the accommodation, while cycling can be enjoyed nearby.",
      },
    ];
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index: any) => {
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
                  <div className="text-sm text-neutral-500 flex gap-2">
                    <span>{item.duration}</span>
                    <span>|</span>
                    <span>{item.admission}</span>
                  </div>
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

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">
            From{" "}
            <span className="line-through text-gray-400 ml-1">{formatNumber(product?.packages[0]?.cost_price)}</span>
          </span>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-900">{formatNumber(product?.packages[0]?.selling_price)}</p>
            <div className="ml-2 text-green-600 bg-green-100 rounded-full px-2 py-1 text-xs">-15%</div>
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
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              className="object-cover rounded-md sm:rounded-xl"
              src={PHOTOS[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""}`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <Image fill className="object-cover rounded-md sm:rounded-xl " src={item || ""} alt="" sizes="400px" />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">Show all photos</span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          <div ref={packageSectionRef} className="package-section">
            <DatePicker />
          </div>
          {product?.packages?.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
          {hightlight()}
          {includeExlcude()}
          {description()}
          {itinerary()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
