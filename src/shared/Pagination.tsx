"use client";

import React, { FC, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import twFocusClass from "@/utils/twFocusClass";

export interface PaginationProps {
  totalPages: number;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ totalPages, className = "" }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    router.push(createPageUrl(page));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams.get("page")]);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button key="1" onClick={() => goToPage(1)} className={pageBtnClass(1)}>
          1
        </button>
      );
      if (startPage > 2)
        pages.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => goToPage(i)} className={pageBtnClass(i)}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1)
        pages.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      pages.push(
        <button key={totalPages} onClick={() => goToPage(totalPages)} className={pageBtnClass(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const pageBtnClass = (page: number) =>
    `inline-flex w-11 h-11 items-center justify-center rounded-full ${
      page === currentPage ? "bg-primary-6000 text-white" : "bg-white border border-neutral-200 hover:bg-neutral-100"
    } ${twFocusClass()}`;

  return (
    <nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium items-center ${className}`}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full border ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-neutral-200 hover:bg-neutral-100"
        } ${twFocusClass()}`}
      >
        ‹
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full border ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-neutral-200 hover:bg-neutral-100"
        } ${twFocusClass()}`}
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
