"use client";

import { useState } from "react";
import RankingsTable from "./rankings-table";
import { useSearchParams } from "next/navigation";

interface RankingPageClientProps {
  initialPlayers: any[];
  currentUserId?: string;
}

const RankingPageClient = ({
  initialPlayers,
  currentUserId,
}: RankingPageClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("trophies");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("trophies");
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;
  const totalItems = initialPlayers.length;
  const searchParams = useSearchParams();
  const activeTagFromURL = searchParams.get("tag") || "All";

  // Paginated Players
  const paginatedPlayers = initialPlayers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page * itemsPerPage < totalItems) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-[#121211] border-t border-stone-600 text-white">
      {/* Table Section */}
      <div className="container mx-auto">
        <RankingsTable
          currentUserId={currentUserId}
          players={paginatedPlayers}
          activeTagFromURL={activeTagFromURL}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center p-6 bg-[#121211] border-t border-stone-600">
        <div className="flex items-center gap-3">
          {/* Previous Page Button */}
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-3 py-2 bg-[#1F1F1F] border bg-stone-800 border-stone-800 hover:border-stone-600 rounded-md transition hover:bg-stone-700/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>

          {/* Numbered Pagination */}
          {[...Array(Math.ceil(totalItems / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-2 rounded-md border bg-stone-800 transition ${
                page === index + 1
                  ? "bg-stone-500/30 text-white hover:bg-stone-700/70 border-stone-900"
                  : "bg-[#1F1F1F] border-stone-800 hover:bg-stone-700/60 hover:border-stone-600"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Page Button */}
          <button
            onClick={handleNextPage}
            disabled={page * itemsPerPage >= totalItems}
            className="px-3 py-2 bg-[#1F1F1F] border bg-stone-800 border-stone-800 rounded-md hover:border-stone-600 transition hover:bg-stone-700/60  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingPageClient;
