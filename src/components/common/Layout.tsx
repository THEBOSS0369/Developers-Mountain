"use client";

// const Layout = ({ children }: { children: ReactNode }) => {

import React, { ReactNode, useState } from "react";
import { Menu, Search } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] bg-[#222222]  border-b border-gray-800 z-40">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left section with menu and logo */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-300 hover:text-white mr-4"
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
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#222222] text-gray-200 pl-10 pr-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4 ">
            <Link href="/ranking" passHref>
              <button className="text-gray-200 hover:text-white">
                Ranking
              </button>
            </Link>
            <button className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600">
              Sign Up
            </button>
            <Link href="/dashboard" passHref>
              <button className="border border-gray-700 text-gray-200 px-4 py-1.5 rounded hover:bg-gray-800">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#222222] border-r border-gray-800 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30`}
      >
        <div className="p-4">
          {/* Topics Section */}
          <div className="mb-8">
            <h3 className="text-gray-400 font-medium mb-2 text-sm tracking-wide">
              Topics
            </h3>
            <nav>
              <a href="#" className="block text-gray-300 hover:text-white py-1">
                All Topics
              </a>
            </nav>
          </div>

          {/* Tags Section */}
          <div className="mb-8">
            <h3 className="text-gray-400 font-medium mb-2 text-sm tracking-wide">
              TAGS
            </h3>
            <nav>
              <a href="#" className="block text-gray-300 hover:text-white py-1">
                Popular Tags
              </a>
            </nav>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-gray-400 font-medium mb-2 text-sm tracking-wide">
              CATEGORIES
            </h3>
            <nav className="space-y-1">
              <a href="#" className="block text-gray-300 hover:text-white py-1">
                Discussion
              </a>
              <a href="#" className="block text-gray-300 hover:text-white py-1">
                How To
              </a>
              <a href="#" className="block text-gray-300 hover:text-white py-1">
                Bug Report
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main
        className={`${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64 min-h-screen transition-margin duration-200 ease-in-out pt-14`}
      >
        <div className="p-6">
          {/* Main content */}
          <div className=" rounded-lg">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
