import Link from "next/link";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 w-full  bg-[#222222]  border-b border-gray-800 z-40">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left section with menu and logo */}
        <div className="flex items-center">
          <button className=" text-gray-300 hover:text-white mr-4"></button>
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
          <Link href="/ranking">
            <button className="text-gray-200 text-semibold hover:text-white">
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
  );
}
