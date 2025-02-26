"use client";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "@/shared/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TabFilters from "./TabFilters";

export default function SearchForm() {
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
            placeholder="Type and press enter"
            defaultValue={keyword}
            ref={inputRef}
            onInput={(e) => {
              if (!(e.target as HTMLInputElement).value) {
                setKeyword("");
                router.replace(pathname);
              }
            }}
          />
        </div>
      </form>
      <div className="mb-8 lg:mb-11 flex items-center">
        <h3 className="mr-auto">
          {keyword ? (
            <>
              526 results for <span className="font-semibold">"{keyword}"</span>
            </>
          ) : (
            <>10.000 results</>
          )}
        </h3>

        <div className="ml-auto">
          <TabFilters />
        </div>
      </div>
    </>
  );
}
