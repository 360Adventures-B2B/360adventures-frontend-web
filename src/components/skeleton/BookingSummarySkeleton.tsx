import { Skeleton } from "@/components/ui/skeleton";

const BookingSummarySkeleton = () => {
  return (
    <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8 mt-3 md:mt-0">
      <Skeleton className="h-8 w-32 mb-4" />
      {[1, 2].map((item) => (
        <div key={item} className="cart-item mb-5 pb-5 flex items-start overflow-hidden border-b border-[#e9e9e9]">
          <Skeleton className="flex-shrink-0 w-[85px] h-[85px] rounded-md" />

          <div className="cart-item-details flex-1 ml-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />

            <div className="priceDetails text-sm text-[#444] mt-2 space-y-1">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="flex justify-between border-t border-[#e9e9e9] mt-2 pt-2 text-sm font-bold">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}

      <div className="grand-total flex justify-between text-lg font-bold">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
};

export default BookingSummarySkeleton;
