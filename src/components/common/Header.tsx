"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "./buttons.component";
import NavigationMenuDemo from "./NavigationMenuDemo";
import { useSession } from "next-auth/react";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isHomePage: boolean;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
  const { data: session } = useSession();

  return (
    <header
      className={`fixed top-0 right-0 transition-all duration-200 ${
        isSidebarOpen ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-5rem)]"
      } bg-[#ffffff5] backdrop-blur-sm border-b p-1 border-[#2D2D2D] z-40`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#ECECEC] hover:text-white mr-4"
          >
            <Menu size={24} />
          </button>

          <NavigationMenuDemo />
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
  );
};

export default Header;
