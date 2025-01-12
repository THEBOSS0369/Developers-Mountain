"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart,
  Code,
  Github,
  Bug,
  BotMessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isSidebarOpen: boolean;
  isHomePage: boolean;
}

const Sidebar = ({ isSidebarOpen, isHomePage }: SidebarProps) => {
  const pathname = usePathname();

  const linkStyles = cn(
    "w-full flex items-center gap-4 relative group",
    isSidebarOpen ? "px-4" : "px-3",
    "py-3",
    isSidebarOpen ? "justify-start" : "justify-center",
    "text-left text-[#ECECEC] hover:bg-[#202123]/50 rounded-md transition-all duration-300 ease-in-out"
  );

  const tooltipStyles = cn(
    "fixed ml-16 bg-gradient-to-r from-[#1F1F1F] to-[#2C2C2C] text-white",
    "px-3 py-1 rounded-lg shadow-lg",
    "invisible group-hover:visible opacity-0 group-hover:opacity-100",
    "transition-all duration-300 transform scale-95 group-hover:scale-100",
    "text-sm whitespace-nowrap z-50 before:absolute before:content-['']",
    "before:border-[6px] before:border-transparent before:border-t-[#2C2C2C]",
    "before:-top-3 before:left-2"
  );

  const isActive = (path: string) => {
    return pathname === path ? "bg-[#202123]" : "";
  };

  const NavLink = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => (
    <Link href={href} className={cn(linkStyles, isActive(href))}>
      <Icon
        size={24}
        className={cn(
          "transition-transform duration-300 ease-in-out",
          !isSidebarOpen && "transform hover:scale-110"
        )}
      />
      {isSidebarOpen ? (
        <span className="text-1xl font-bold tracking-tight uppercase">
          {label}
        </span>
      ) : (
        <div className={tooltipStyles}>{label}</div>
      )}
    </Link>
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-[#121211] border-r border-[#2D2D2D]",
        "transform transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-64" : "w-20",
        "pt-16",
        "z-20"
      )}
    >
      {/* Dev Mountain Logo Section */}
      <div
        className={cn(
          "flex items-center justify-center",
          "py-4 px-3 border-b border-[#2D2D2D]"
        )}
      >
        <BotMessageSquare size={32} color="#E54D2E" />
        {isSidebarOpen && (
          <span className="ml-4 text-2xl font-bold text-[#ECECEC] tracking-tight uppercase">
            Dev Mountain
          </span>
        )}
      </div>

      {/* Sidebar Navigation Links */}
      <div className="p-4 overflow-hidden">
        {/* Topics Section */}
        <div className="mb-2">
          <nav className="space-y-1">
            <NavLink href="/" icon={Home} label="Home" />
          </nav>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#2D2D2D] mx-2 my-4 transition-opacity duration-300" />

        {/* Tags Section */}
        <div className="mb-2">
          <h3
            className={cn(
              "text-[#8E8EA0] mb-2 text-sm tracking-wide px-3",
              "transition-all duration-300 ease-in-out",
              isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            TAGS
          </h3>
          <nav className="space-y-1">
            <NavLink href="/ranking" icon={BarChart} label="Leaderboard" />
          </nav>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#2D2D2D] mx-2 my-4 transition-opacity duration-300" />

        {/* Categories Section */}
        <div>
          <h3
            className={cn(
              "text-[#8E8EA0] font-medium mb-2 text-sm tracking-wide px-3",
              "transition-all duration-300 ease-in-out",
              isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            RANKING
          </h3>
          <nav className="space-y-1">
            <NavLink href="/ranking/github" icon={Github} label="GitHub" />
            <NavLink href="/ranking/leetcode" icon={Code} label="Leetcode" />
            <NavLink href="/bug-report" icon={Bug} label="Bug Report" />
          </nav>
        </div>

        <div className="h-[1px] bg-[#2D2D2D] mx-2 my-4 transition-opacity duration-300" />
      </div>
    </aside>
  );
};

export default Sidebar;
