"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Check if we're on the homepage
  const isHomePage = pathname === "/";

  // Hide sidebar by default on homepage
  useEffect(() => {
    if (isHomePage) {
      setIsSidebarOpen(true);
    }
  }, [isHomePage]);

  return (
    <div className="min-h-screen bg-[#121211]">
      {/* Header Component */}
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isHomePage={isHomePage}
      />

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} isHomePage={isHomePage} />

      {/* Main content area */}
      <main
        className={`transition-all duration-200 pt-14 ${
          isSidebarOpen && !isHomePage ? "md:ml-64" : "md:ml-16"
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
