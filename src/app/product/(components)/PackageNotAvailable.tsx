import React from "react";

export default function PackageNotAvailable({
  onSeeMore,
}: {
  onSeeMore?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {/* Icon */}
      <div className="text-gray-400 mb-4">
        <i className="las la-box-open text-6xl"></i>
      </div>

      {/* Message */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Package not available for your selected option
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        Please try changing the date or time slot, or browse other packages.
      </p>

      {/* Button */}
      <button
        onClick={onSeeMore}
        className="bg-primary-6000 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
      >
        See More Options
      </button>
    </div>
  );
}
