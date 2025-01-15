"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/Login" || pathname === "/register";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#121211]">
      <Header />
      <main className="pt-14 text-[#ECECEC]">
        <div className="p-6">
          <div className="rounded-lg">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
