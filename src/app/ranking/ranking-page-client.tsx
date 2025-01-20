"use client";

import { useState } from "react";
import RankingsTable from "./rankings-table";

type TabType = "trophies" | "wars" | "multiplayer" | "social" | "singlePlayer";
type SubTabType = "trophies" | "builderBase" | "bestTrophies";

interface RankingPageClientProps {
  initialPlayers: any[];
}

const RankingPageClient = ({ initialPlayers }: RankingPageClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("trophies");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("trophies");
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;
  const totalItems = 500;

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page * itemsPerPage < totalItems) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-[#121211] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-[#121211] border-b border-[#2D2D2D]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            🏆
          </div>
          <h1 className="text-xl font-semibold">Players Trophies Ranking</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#121211] border border-[#2D2D2D] hover:bg-[#2D2D2D] transition rounded-md">
            CLANS RANKINGS
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-md">
            SHARE
          </button>
        </div>
      </header>
      {/* Filter Section */}
      <div className="flex gap-4 p-4">
        <select
          className="flex-1 p-2 bg-[#121211] border border-[#2D2D2D] hover:bg-[#2D2D2D] transition text-white rounded-md cursor-pointer"
          defaultValue="WORLDWIDE"
        >
          <option>WORLDWIDE</option>
          <option>LOCAL</option>
        </select>
        <select
          className="flex-1 p-2 bg-[#121211] border border-[#2D2D2D] hover:bg-[#2D2D2D] transition text-white rounded-md cursor-pointer"
          defaultValue="ALL TOWN HALLS"
        >
          <option>ALL TOWN HALLS</option>
          <option>TOWN HALL 15</option>
          <option>TOWN HALL 14</option>
        </select>
      </div>

      {/* Main Navigation */}
      <nav className="flex justify-center gap-8 p-4 border-b border-[#2D2D2D]">
        {[
          { id: "trophies", icon: "🏆", label: "TROPHIES" },
          { id: "wars", icon: "⚔️", label: "WARS" },
          { id: "multiplayer", icon: "👥", label: "MULTIPLAYER" },
          { id: "social", icon: "🌐", label: "SOCIAL" },
          { id: "singlePlayer", icon: "👤", label: "SINGLE PLAYER" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex flex-col items-center gap-2 transition ${
              activeTab === tab.id ? "" : "opacity-60"
            }`}
          >
            <div
              className={`w-8 h-8 ${
                activeTab === tab.id ? "bg-yellow-500" : "bg-[#2D2D2D]"
              } rounded-full flex items-center justify-center`}
            >
              {tab.icon}
            </div>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Sub Navigation */}
      <nav className="flex justify-center gap-8 p-4 border-b border-[#2D2D2D]">
        {[
          { id: "trophies", icon: "🏆", label: "TROPHIES" },
          { id: "builderBase", icon: "🏠", label: "BUILDER BASE TROPHIES" },
          { id: "bestTrophies", icon: "🌟", label: "BEST TROPHIES" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as SubTabType)}
            className={`flex items-center gap-2 transition ${
              activeSubTab === tab.id ? "text-green-500" : "opacity-60"
            }`}
          >
            <div
              className={`w-6 h-6 ${
                activeSubTab === tab.id
                  ? "bg-green-500 bg-opacity-20"
                  : "bg-[#2D2D2D]"
              } rounded-full flex items-center justify-center`}
            >
              {tab.icon}
            </div>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Table Section */}
      <div className="container mx-auto py-10">
        <RankingsTable players={initialPlayers} />
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 bg-[#121211] border-t border-[#2D2D2D]">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="p-2 bg-[#121211] border border-[#2D2D2D] hover:bg-[#2D2D2D] transition rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>
          <span>{`${(page - 1) * itemsPerPage + 1}-${Math.min(
            page * itemsPerPage,
            totalItems
          )} / ${totalItems}`}</span>
          <button
            onClick={handleNextPage}
            disabled={page * itemsPerPage >= totalItems}
            className="p-2 bg-[#121211] border border-[#2D2D2D] hover:bg-[#2D2D2D] transition rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md flex items-center gap-2">
          <span>REFRESH</span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RankingPageClient;
