"use client";

import React, { ReactNode, useState } from "react";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "./buttons.component";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#131314]">
      {/* Header */}
      <header
        className={`fixed top-0 right-0 w-full transition-all duration-200 ${
          isSidebarOpen ? "md:w-[calc(100%-16rem)]" : "w-full"
        } bg-[#171717] border-b border-[#2D2D2D] z-40`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left section with menu and logo */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-[#ECECEC] hover:text-white mr-4"
            >
              <Menu size={24} />
            </button>
            <Link href="/">
              <div className="h-8 w-8 text-3xl rounded">🌋</div>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#8E8EA0]" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#202123] text-[#ECECEC] pl-10 pr-4 py-2 rounded-lg border border-[#2D2D2D] focus:outline-none focus:border-[#3D3D3D] focus:ring-1 focus:ring-[#3D3D3D]"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <Link href="/ranking" passHref>
              <button className="text-[#ECECEC] hover:text-white">
                Ranking
              </button>
            </Link>
            {session ? (
              <>
                <ProfileButton />
                <LogoutButton />
              </>
            ) : (
              <>
                <RegisterButton />
                <LoginButton />
              </>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#171717] border-r border-[#2D2D2D] transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-30`}
      >
        <div className="p-4">
          {/* Topics Section */}
          <div className="mb-8">
            <h3 className="text-[#8E8EA0] font-medium mb-2 text-sm tracking-wide px-3">
              Topics
            </h3>
            <nav className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-[#ECECEC] hover:bg-[#202123] rounded-lg transition-colors duration-150">
                All Topics
              </button>
            </nav>
          </div>

          {/* Tags Section */}
          <div className="mb-8">
            <h3 className="text-[#8E8EA0] font-medium mb-2 text-sm tracking-wide px-3">
              TAGS
            </h3>
            <nav className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-[#ECECEC] hover:bg-[#202123] rounded-lg transition-colors duration-150">
                Popular Tags
              </button>
            </nav>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-[#8E8EA0] font-medium mb-2 text-sm tracking-wide px-3">
              CATEGORIES
            </h3>
            <nav className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-[#ECECEC] hover:bg-[#202123] rounded-lg transition-colors duration-150">
                Discussion
              </button>
              <button className="w-full text-left px-3 py-2 text-[#ECECEC] hover:bg-[#202123] rounded-lg transition-colors duration-150">
                How To
              </button>
              <button className="w-full text-left px-3 py-2 text-[#ECECEC] hover:bg-[#202123] rounded-lg transition-colors duration-150">
                Bug Report
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main
        className={`transition-all duration-200 pt-14 ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        } bg-[#131314] text-[#ECECEC]`}
      >
        <div className="p-6">
          <div className="rounded-lg">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
