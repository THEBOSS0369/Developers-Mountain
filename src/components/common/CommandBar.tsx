import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";

interface SearchOption {
  id: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface CommandBarProps {
  options?: SearchOption[];
  onSearch?: (query: string) => void;
}

const defaultOptions: SearchOption[] = [
  {
    id: "docs",
    label: "Search the docs",
    icon: <Search className="w-4 h-4" />,
    type: "DOCS",
  },
  {
    id: "getting-started",
    label: "Go to Getting Started",
    icon: <ArrowRight className="w-4 h-4" />,
    type: "GO_TO",
  },
  {
    id: "database",
    label: "Go to Database",
    icon: <ArrowRight className="w-4 h-4" />,
    type: "GO_TO",
  },
];

const CommandBar = ({
  options = defaultOptions,
  onSearch,
}: CommandBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [query, options]);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleOptionClick = (option: SearchOption) => {
    if (option.onClick) {
      option.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Trigger Button */}
      <button
        onClick={handleSearchClick}
        className="w-full px-4 py-2 text-left text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none"
      >
        <div className="flex items-center">
          <Search className="w-4 h-4 mr-2" />
          <span>Type a command or search...</span>
        </div>
      </button>

      {/* Command Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute w-full mt-2 bg-gray-900 rounded-lg shadow-lg">
            <div className="p-4">
              <input
                type="text"
                placeholder="Type a command or search..."
                className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="w-full px-4 py-3 flex items-center text-left text-gray-300 hover:bg-gray-800"
                >
                  {option.icon && <span className="mr-3">{option.icon}</span>}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommandBar;
