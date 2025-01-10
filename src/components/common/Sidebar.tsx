"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart, Code, Github, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isSidebarOpen: boolean;
  isHomePage: boolean;
}

const Sidebar = ({ isSidebarOpen, isHomePage }: SidebarProps) => {
  const pathname = usePathname();

  const linkStyles = cn(
    "w-full flex items-center gap-4",
    isSidebarOpen ? "px-4" : "px-3",
    "py-3",
    isSidebarOpen ? "justify-start" : "justify-center",
    "text-left text-[#ECECEC] hover:bg-[#202123]/50 rounded-md transition-all duration-300 ease-in-out"
  );

  const isActive = (path: string) => {
    return pathname === path ? "bg-[#202123]" : "";
  };

  if (isHomePage) return null;

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
      <div className="p-4 overflow-hidden">
        {/* Topics Section */}
        <div className="mb-2">
          <nav className="space-y-1">
            <Link href="/" className={cn(linkStyles, isActive("/"))}>
              <Home
                size={24}
                className={cn(
                  "transition-transform duration-300 ease-in-out",
                  !isSidebarOpen && "transform hover:scale-110"
                )}
              />
              <span
                className={cn(
                  "text-1xl font-bold tracking-tight uppercase",
                  "transition-all duration-300 ease-in-out",
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 hidden"
                )}
              >
                Home
              </span>
            </Link>
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
            <Link
              href="/ranking"
              className={cn(linkStyles, isActive("/ranking"))}
            >
              <BarChart
                size={24}
                className={cn(
                  "transition-transform duration-300 ease-in-out",
                  !isSidebarOpen && "transform hover:scale-110"
                )}
              />
              <span
                className={cn(
                  "text-1xl font-bold tracking-tight uppercase",
                  "transition-all duration-300 ease-in-out",
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 hidden"
                )}
              >
                LeaderBoard
              </span>
            </Link>
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
            <Link
              href="/ranking/github"
              className={cn(linkStyles, isActive("/ranking/github"))}
            >
              <Github
                size={24}
                className={cn(
                  "transition-transform duration-300 ease-in-out",
                  !isSidebarOpen && "transform hover:scale-110"
                )}
              />
              <span
                className={cn(
                  "text-1xl font-bold tracking-tight uppercase",
                  "transition-all duration-300 ease-in-out",
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 hidden"
                )}
              >
                GitHub
              </span>
            </Link>
            <Link
              href="/ranking/leetcode"
              className={cn(linkStyles, isActive("/ranking/leetcode"))}
            >
              <Code
                size={24}
                className={cn(
                  "transition-transform duration-300 ease-in-out",
                  !isSidebarOpen && "transform hover:scale-110"
                )}
              />
              <span
                className={cn(
                  "text-1xl font-bold tracking-tight uppercase",
                  "transition-all duration-300 ease-in-out",
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 hidden"
                )}
              >
                Leetcode
              </span>
            </Link>
            <Link
              href="/bug-report"
              className={cn(linkStyles, isActive("/bug-report"))}
            >
              <Bug
                size={24}
                className={cn(
                  "transition-transform duration-300 ease-in-out",
                  !isSidebarOpen && "transform hover:scale-110"
                )}
              />
              <span
                className={cn(
                  "text-1xl font-bold tracking-tight uppercase",
                  "transition-all duration-300 ease-in-out",
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 hidden"
                )}
              >
                Bug Report
              </span>
            </Link>
          </nav>
        </div>

        <div className="h-[1px] bg-[#2D2D2D] mx-2 my-4 transition-opacity duration-300" />
      </div>
    </aside>
  );
};

export default Sidebar;
