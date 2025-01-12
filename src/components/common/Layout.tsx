"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Initialize sidebar state based on current page
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isHomePage);

  // Update sidebar state when pathname changes

  return (
    <div className="min-h-screen bg-[#121211]">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isHomePage={isHomePage}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} isHomePage={isHomePage} />

      <main
        className={`transition-all duration-200 pt-14 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        } text-[#ECECEC]`}
      >
        <div className="p-6">
          <div className="rounded-lg">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
