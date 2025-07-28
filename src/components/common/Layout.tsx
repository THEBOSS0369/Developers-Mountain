"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/register";
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      {/* bg-[#121211] */}
      <Header />
      <main className="mt-4 sm:mt-24 text-[#ECECEC]">
        <div className="pt-16 p-1 md:p-6">
          <div className="rounded-lg">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
