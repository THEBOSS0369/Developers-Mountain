import { useEffect, useState, useRef } from "react";
import { Menu, X, Github } from "lucide-react";
import { LoginButton, ProfileButton } from "./buttons.component";
import NavigationMenuDemo from "./NavigationMenuDemo";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastPathRef = useRef(
    typeof window !== "undefined" ? window.location.pathname : ""
  );

  useEffect(() => {
    const supabase = createClient();
    // Initial user fetch
    const getInitialUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getInitialUser();
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Handle clicks outside header
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Skip if click was inside header or on navigation elements
      if (headerRef.current?.contains(event.target as Node)) {
        // Allow navigation components to work
        const target = event.target as Element;
        const isNavigationTrigger =
          target.closest('[role="button"]') ||
          target.closest('[role="navigation"]') ||
          target.closest("[data-state]");

        if (isNavigationTrigger) {
          return; // Don't close for navigation triggers
        }
      } else {
        // Click outside header - close the menu
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Handle navigation/route changes
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Check for path changes to close menu on navigation
    const checkForNavigation = () => {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (lastPathRef.current !== currentPath) {
          lastPathRef.current = currentPath;
          setMobileMenuOpen(false);
        }
      }
    };

    // Run check periodically (simplest solution that works)
    const interval = setInterval(checkForNavigation, 200);

    // Also listen for click events on links
    const handleLinkClick = () => {
      setTimeout(() => checkForNavigation(), 50);
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      clearInterval(interval);
      document.removeEventListener("click", handleLinkClick);
    };
  }, [mobileMenuOpen]);

  if (!hydrated) return null;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 bg-[#222222]/80 backdrop-blur-xl border border-[#222222] rounded-lg shadow-md z-50"
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center">
          <div className="flex items-center mr-2 md:mr-6">
            <Link href="/">
              <img
                src="/logo/window.png"
                alt="Logo"
                className="h-8 w-auto md:h-10 rounded-md shadow-md transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <NavigationMenuDemo />
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* GitHub Repository Link */}
          <Link
            href="https://github.com/THEBOSS0369/Developers-Mountain"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white hover:text-gray-300 rounded-md hover:bg-neutral-700/50 transition-all duration-300 group"
            title="View on GitHub"
          >
            <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </Link>
          {user ? <ProfileButton /> : <LoginButton />}
          <button
            className="md:hidden p-2 text-white rounded-md hover:bg-neutral-700 transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu with animation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-96 opacity-100 visible border-t border-neutral-700 px-4 py-3"
            : "max-h-0 opacity-0 invisible py-0 px-4 border-t border-transparent"
        }`}
        style={{ position: "relative", zIndex: 100 }}
      >
        <div className="mobile-nav-container">
          <NavigationMenuDemo />
        </div>
      </div>
    </header>
  );
};

export default Header;
