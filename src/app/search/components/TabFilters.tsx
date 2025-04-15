"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonThird from "@/shared/ButtonThird";
import ButtonClose from "@/shared/ButtonClose";
import Slider from "rc-slider";
import FilterCard from "./FilterCard";
import FilterCheckbox from "./FilterCheckbox";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { resetFilters, setFiltersFromQuery, setPriceRange, toggleFilter } from "@/lib/features/filterSlices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useGetCategoriesQuery } from "@/lib/services/categoryService";
import { useGetLocationsQuery } from "@/lib/services/locationsService";
const TabFilters = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const { data: categories, error: categoryError, isLoading: isCategoryLoading } = useGetCategoriesQuery();

  const categoriesData = Array.isArray(categories?.data)
    ? categories.data.map((cat) => ({
        name: cat.name,
        label: cat.name,
        defaultChecked: false,
      }))
    : [];

  const { data: locations, error: locationError, isLoading: isLocationLoading } = useGetLocationsQuery();

  const locationList = Array.isArray(locations?.data) ? locations.data.map((loc) => loc.name) : [];

  const bookingOptionsList = ["Instant Confirmation", "Free Cancellation"];

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filteredLocationList = locationList.filter((loc) => loc !== undefined && loc !== null);

  const handleToggleFilter = (
    key: Exclude<"location" | "booking_option" | "category", "price_range">,
    value: string
  ) => {
    dispatch(toggleFilter({ key, value }));
  };

  const handlePriceChange = (range: [number, number]) => {
    dispatch(setPriceRange(range));
  };

  const handleApply = async () => {
    const params = new URLSearchParams();
    const currentParams = new URLSearchParams(window.location.search);

    const keyword = currentParams.get("keyword");
    if (keyword) params.set("keyword", keyword);

    if (filters.location.length) params.set("location", JSON.stringify(filters.location));
    if (filters.booking_option.length) params.set("booking_option", JSON.stringify(filters.booking_option));
    if (filters.category.length) params.set("category", JSON.stringify(filters.category));
    if (filters.price_range[0] !== 100 || filters.price_range[1] !== 2000) {
      params.set("price_range", `${filters.price_range[0]};${filters.price_range[1]}`);
    }

    closeModalMoreFilter();
    router.replace(`/search?${params.toString()}`);

    // await revalidateFilters(pathname);
  };
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  useEffect(() => {
    const params = {
      location: searchParams.get("location") ? JSON.parse(searchParams.get("location")!) : [],
      booking_option: searchParams.get("booking_option") ? JSON.parse(searchParams.get("booking_option")!) : [],
      category: searchParams.get("category") ? JSON.parse(searchParams.get("category")!) : [],
      priceRange: searchParams.get("price_range")
        ? searchParams.get("price_range")!.split(";").map(Number)
        : [100, 2000],
    };

    dispatch(setFiltersFromQuery(params));
  }, [searchParams, dispatch]);

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;

    if (filters.location.length) count += filters.location.length;
    if (filters.booking_option.length) count += filters.booking_option.length;
    if (filters.category.length) count += filters.category.length;
    if (filters.price_range[0] > 100 || filters.price_range[1] < 2000) count += 1;

    return count;
  };

  const renderTabMoreFilter = () => {
    return (
      <div>
        <div
          className="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer gap-2"
          onClick={openModalMoreFilter}
        >
          <i className="las la-filter text-lg"></i>
          <span>Filters ({getActiveFilterCount()})</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModalMoreFilter}>
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      More filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Destination</h3>
                        <div className="mt-6 relative flex flex-wrap gap-2">
                          {filteredLocationList.map((loc) => {
                            const isActive = filters.location.includes(loc);

                            return (
                              <FilterCard
                                key={loc}
                                label={loc}
                                icon="la-map-marker"
                                isActive={isActive}
                                onClick={() => {
                                  handleToggleFilter("location", loc);
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Booking Option</h3>
                        <div className="mt-6 relative flex flex-wrap gap-2">
                          {bookingOptionsList.map((bookingOption) => {
                            const isActive = filters.booking_option.includes(bookingOption);
                            const iconClass = bookingOption === "Free Cancellation" ? "la-check" : "la-bolt";
                            return (
                              <FilterCard
                                key={bookingOption}
                                label={bookingOption}
                                icon={iconClass}
                                isActive={isActive}
                                onClick={() => handleToggleFilter("booking_option", bookingOption)}
                                className={isActive ? "bg-primary-700 text-white" : ""}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Categories</h3>
                        <div className="mt-6 relative flex flex-wrap gap-2">
                          <FilterCheckbox
                            categories={categoriesData}
                            selectedCategories={filters.category}
                            onCategoryChange={(cat) => handleToggleFilter("category", cat)}
                          />
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={50}
                                max={2000}
                                defaultValue={filters.price_range}
                                allowCross={false}
                                onChange={(e) => handlePriceChange(e as [number, number])}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm font-medium">AED</span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={filters.price_range[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm font-medium">AED</span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={filters.price_range[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={() => dispatch(resetFilters())}>Clear</ButtonThird>
                    <ButtonPrimary onClick={handleApply}>Apply</ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return <div className="flex lg:space-x-4">{renderTabMoreFilter()}</div>;
};

export default TabFilters;
