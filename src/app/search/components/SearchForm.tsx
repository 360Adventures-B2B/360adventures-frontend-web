"use client";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "@/shared/Input";
import { usePathname, useSearchParams } from "next/navigation";
import TabFilters from "./TabFilters";
import { useRouter } from 'nextjs-toploader/app';

export default function SearchForm({ totalResults }: { totalResults: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKeyword = inputRef.current?.value.trim();

    if (!trimmedKeyword || trimmedKeyword === keyword) return;

    const params = new URLSearchParams();
    params.set("keyword", trimmedKeyword);

    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key !== "keyword") params.append(key, value);
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center w-full lg:w-1/2 rounded-full mb-5">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full pl-10 rounded-full"
            type="search"
            placeholder="Tour, activity, or attraction"
            defaultValue={keyword}
            ref={inputRef}
            onInput={(e) => {
              if (!(e.target as HTMLInputElement).value) {
                setKeyword("");
                router.replace('/search');
              }
            }}
          />
        </div>
      </form>
      <div className="mb-8 lg:mb-11 flex flex-wrap items-center justify-between gap-4">
        <h3 className="w-full sm:w-auto break-words">
          {keyword ? (
            <>
              {totalResults} results for <span className="font-semibold break-words">"{keyword}"</span>
            </>
          ) : (
            <>{totalResults} results</>
          )}
        </h3>

        <div className="w-full sm:w-auto">
          <TabFilters />
        </div>
      </div>
    </>
  );
}
