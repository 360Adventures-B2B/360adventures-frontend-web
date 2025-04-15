import React from "react";

type IncludeExcludeProps = {
  includes?: { title: string }[];
  excludes?: { title: string }[];
};

const IncludeExclude: React.FC<IncludeExcludeProps> = ({ includes, excludes }) => {
  const hasIncludes = includes && includes.length > 0;
  const hasExcludes = excludes && excludes.length > 0;

  if (!hasIncludes && !hasExcludes) {
    return null; 
  }

  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">What's Included</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hasIncludes && (
            <div>
              <h2 className="font-semibold">Includes</h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
              <ul className="space-y-2">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <i className="las la-check-circle text-xl mr-2 text-green-600"></i>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasExcludes && (
            <div>
              <h2 className="font-semibold">Excludes</h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
              <ul className="space-y-2">
                {excludes.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <i className="las la-times-circle text-xl mr-2 text-red-600"></i>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncludeExclude;