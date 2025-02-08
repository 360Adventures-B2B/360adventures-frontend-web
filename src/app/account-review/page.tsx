import React from "react";
import I404Png from "@/images/404.png";
import Image from "next/image";
import LogoutButton from "./components/logout-button";

export default function AccountReview() {
  return (
    <>
      <div className="nc-AccountReview">
        <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
          {/* HEADER */}
          <header className="text-center max-w-2xl mx-auto space-y-2">
            <Image src={I404Png} alt="not-found" />
            <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
              {`Your account is under review, please wait.`}{" "}
            </span>
            <div className="pt-8">
              <LogoutButton />
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
