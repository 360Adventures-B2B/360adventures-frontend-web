import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="nc-ProductCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image Skeleton */}
      <div className="relative w-full">
        <div className="relative group group/cardGallerySlider">
          <div className="w-full overflow-hidden rounded-xl">
            <Skeleton className="w-full h-[200px] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Like Button Skeleton */}
      <div className="absolute right-3 top-3 z-[1]">
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>

      {/* Sale Badge Skeleton */}
      <div className="absolute left-3 top-3">
        <Skeleton className="py-0.5 px-3 text-xs h-2 rounded-full w-24" />
      </div>

      {/* Title Skeleton */}
      <a href="#">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-3/4 h-5" />
            </div>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
              <Skeleton className="w-20 h-4" />
            </div>
          </div>
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>

          {/* Price Skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCardSkeleton;
