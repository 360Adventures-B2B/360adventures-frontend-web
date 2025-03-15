import React, { FC } from "react";
import { Nav } from "./(components)/Nav";
import { Sidebar } from "./(components)/Sidebar";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900 min-h-screen sm:flex">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        {/* <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
          <Nav />
        </div> */}

        {/* Main Content */}
        <div className="container pt-8 sm:pt-10 px-10 pb-24 lg:pb-32">{children}</div>
      </div>
    </div>
  );
};

export default CommonLayout;
