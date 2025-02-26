import React from "react";

export default function EmptySearch() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <i className="las la-search text-6xl text-gray-400"></i>
        <h4 className="text-lg font-semibold text-gray-700 mt-4">No activities found.</h4>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria and we’ll help you find a new activity.</p>
      </div>
    </div>
  );
}
