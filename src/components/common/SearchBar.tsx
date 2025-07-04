"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBarWithResults = ({
  profiles = [],
  onSelectUser = () => {},
  currentUserId,
  placeholder = "Search developers by name",
}) => {
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false); // Controls the fade effect
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpen();
      }
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("keydown", down);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => setFade(true), 10); // Ensures smooth fade-in
  };

  const handleClose = () => {
    setFade(false);
    setTimeout(() => setOpen(false), 300); // Wait for animation to finish before closing
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile?.username?.toLowerCase().includes(inputValue.toLowerCase()) ||
      profile?.full_name?.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const router = useRouter();
  const handlePlayerClick = (playerId: string) => {
    if (playerId === currentUserId) {
      router.push("/account");
    } else {
      router.push(`/profile/${playerId}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="w-full flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-stone-700/40 text-stone-400 rounded-lg hover:bg-stone-700/60 focus:outline-none border border-stone-600/30 shadow-xl backdrop-blur-xl"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="flex-1 text-left truncate">Search developers...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-stone-400 bg-stone-700/50 rounded border border-stone-600/30">
          ⌘ K
        </kbd>
      </button>

      {/* Command palette dialog with fade effect */}
      {open && (
        <div
          className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`fixed inset-x-0 top-[10%] sm:top-[20%] w-[95%] sm:max-w-2xl mx-auto p-2 sm:p-4 transition-all duration-500 transform ${
              fade ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="relative bg-stone-700/70 backdrop-blur-sm rounded-lg shadow-2xl border border-stone-600/90">
              {/* Search input */}
              <div className="flex items-center border-b border-stone-600/90 px-2 sm:px-4">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search developer by name or id..."
                  className="w-full px-2 sm:px-4 py-3 sm:py-4 bg-transparent text-white placeholder-stone-400 focus:outline-none text-sm sm:text-base"
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  className="p-1.5 sm:p-2 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Search Results */}
              {inputValue && filteredProfiles.length > 0 && (
                <div className="px-2 sm:px-4 py-2 sm:py-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                  {filteredProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        onSelectUser(profile);
                        handlePlayerClick(profile.id);
                        handleClose();
                        setInputValue("");
                      }}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base text-stone-300 hover:bg-stone-600/90 rounded-lg group ${profile.id === currentUserId ? "bg-stone-600/60" : ""}`}
                    >
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.username}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-700 flex items-center justify-center">
                          <span className="text-xs sm:text-sm text-white">
                            {profile.username?.[0]?.toUpperCase() || "?"}
                          </span>
                        </div>
                      )}
                      <span className="truncate">{profile.username}</span>
                      {profile.full_name && (
                        <span className="text-xs sm:text-sm text-stone-400 truncate hidden xs:inline">
                          ({profile.full_name})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBarWithResults;
