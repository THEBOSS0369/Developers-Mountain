import Link from "next/link";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header
      className={`fixed top-0 right-0 w-full border-[#FF977D] transition-all duration-200`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left section with menu and logo */}
        <div className="flex items-center">
          <button className="text-[#ECECEC] hover:text-white mr-4"></button>
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
            <button className="text-[#ECECEC] hover:text-white">Ranking</button>
          </Link>
          <button className="bg-[#E54D2E] text-white px-4 py-1.5 rounded-lg hover:bg-[#EC6142]">
            Sign Up
          </button>
          <Link href="/dashboard" passHref>
            <button className="border border-[#2D2D2D] text-[#ECECEC] px-4 py-1.5 rounded-lg hover:bg-[#202123]">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
