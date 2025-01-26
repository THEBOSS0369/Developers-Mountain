import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg px-6 py-2 text-base font-semibold text-[#E4E4E7] transition-colors hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          Features
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 text-[#E4E4E7] transition-colors hover:text-white"
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-neutral-800 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E4E4E7] hover:bg-neutral-700 hover:text-white rounded-lg"
              role="menuitem"
            >
              Modern UX
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E4E4E7] hover:bg-neutral-700 hover:text-white rounded-lg"
              role="menuitem"
            >
              Warp AI
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E4E4E7] hover:bg-neutral-700 hover:text-white rounded-lg"
              role="menuitem"
            >
              Agent Mode
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E4E4E7] hover:bg-neutral-700 hover:text-white rounded-lg"
              role="menuitem"
            >
              Warp Drive
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E4E4E7] hover:bg-neutral-700 hover:text-white rounded-lg"
              role="menuitem"
            >
              All Features
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
