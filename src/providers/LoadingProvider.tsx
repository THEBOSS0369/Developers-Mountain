"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Show loading immediately when pathname changes
  useEffect(() => {
    setIsLoading(true);

    // Hide loading after allowing page to render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Enhanced navigation detection
  useEffect(() => {
    const handleNavigation = () => {
      setIsLoading(true);
    };

    // Listen for link clicks
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      if (link && !link.getAttribute("href")?.startsWith("#")) {
        setIsLoading(true);
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#1A1A1A] rounded-lg p-8 shadow-xl border border-gray-700">
            {/* Pixelated Dog Character */}
            <div className="w-16 h-16 mb-4 relative mx-auto">
              <div
                className="absolute animate-bounce"
                style={{ animationDuration: "1.5s" }}
              >
                {/* Pixel Dog SVG */}
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Head */}
                  <rect x="24" y="8" width="16" height="8" fill="#10B981" />
                  <rect x="16" y="16" width="32" height="8" fill="#10B981" />

                  {/* Ears */}
                  <rect x="16" y="8" width="8" height="8" fill="#059669" />
                  <rect x="40" y="8" width="8" height="8" fill="#059669" />

                  {/* Eyes */}
                  <rect x="24" y="20" width="4" height="4" fill="#000000" />
                  <rect x="36" y="20" width="4" height="4" fill="#000000" />

                  {/* Nose */}
                  <rect x="30" y="28" width="4" height="4" fill="#000000" />

                  {/* Mouth */}
                  <rect x="28" y="32" width="8" height="4" fill="#059669" />

                  {/* Body */}
                  <rect x="20" y="32" width="24" height="16" fill="#10B981" />

                  {/* Legs */}
                  <rect x="20" y="48" width="8" height="8" fill="#059669" />
                  <rect x="36" y="48" width="8" height="8" fill="#059669" />
                </svg>
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <p className="text-white text-lg font-medium mb-2">Loading...</p>
              <div className="flex justify-center space-x-1">
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
