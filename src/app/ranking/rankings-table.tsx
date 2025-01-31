"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Player {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  scores: string | null;
  mainlanguage: string | null;
  secondlanguage: string | null;
}

interface RankingsTableProps {
  players: Player[];
  currentUserId: string;
}

const RankingsTable = ({ players, currentUserId }: RankingsTableProps) => {
  const [activeTag, setActiveTag] = useState("All");
  const tagButtons = ["All", "Github", "Leetcode"];
  const [activeLanguage, setActiveLanguage] = useState("All Language");
  const languageButtons = [
    "All Language",
    "Typescript",
    "JavaScript",
    "Python",
    "C",
    "Java",
  ];

  const router = useRouter(); // Initialize Next.js router

  // Click handler for player profile
  const handlePlayerClick = (playerId: string) => {
    // Redirect to the player's profile page
    router.push(`/profile/${playerId}`);
  };

  return (
    <div className="w-full bg-[#121211]">
      {/* Tags */}
      <div className="flex flex-col">
        {/* Platform row */}
        <div className="flex justify-center gap-2 px-4 py-8 ">
          {tagButtons.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 text-stone-300 py-1.5 font-bold rounded-sm text-xl transition-colors ${
                activeTag === tag
                  ? "bg-neutral-800 text-white"
                  : "hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Second row */}
        <div className="flex justify-center gap-2 px-4 py-4">
          {languageButtons.map((language) => (
            <button
              key={language}
              onClick={() => setActiveLanguage(language)}
              className={`px-4 text-stone-400 py-1.5 font-semibold rounded-sm text-base transition-colors ${
                activeLanguage === language
                  ? "bg-neutral-800 text-zinc-200"
                  : "hover:text-white"
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid max-w-7xl mx-auto grid-cols-4 px-4 py-2 mt-12 border-b-[2px] border-[#2D2D2D] text-xl font-semibold text-neutral-400">
        <div className="text-center">Rank</div>
        <div className="text-center">Player</div>
        <div className="text-center">Github</div>
        <div className="text-center">Languages</div>
      </div>

      {/* Table Body */}
      <div className="divide-y max-w-7xl mx-auto divide-[#2D2D2D]">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="grid grid-cols-4 px-4 py-4 mx-[-12px] hover:bg-neutral-700/30 focus:backdrop-blur-xl rounded-lg transition-colors"
            onClick={() => handlePlayerClick(player.id)}
          >
            {/* Rank Column */}
            <div className="flex items-center justify-center w-full">
              <span className="text-white text-2xl">{index + 1}</span>
            </div>

            {/* Player Column */}
            <div className="flex items-center justify-center w-full gap-4">
              {player.avatar_url ? (
                <Image
                  src={player.avatar_url}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-md object-cover cursor-pointer" // Add cursor pointer for better UX
                  priority
                />
              ) : (
                <div className="w-8 h-8 bg-gray-600 rounded-full" />
              )}
              <div className="flex flex-col">
                <span className="text-stone-200 font-medium text-xl cursor-pointer">
                  {player.full_name || player.username}
                </span>
                {player.full_name && (
                  <span className="text-stone-400 text-sm font-semibold ">
                    @{player.username ? player.username : "Unknown"}
                  </span>
                )}
              </div>
            </div>

            {/* Github Scores Column */}
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-neutral-200 text-2xl">
                {player.scores ? player.scores : "0"}
              </span>
            </div>

            {/* Languages Column */}
            <div className="flex flex-row items-center justify-center w-full gap-2">
              {player?.mainlanguage && (
                <span className="px-4 bg-neutral-800 text-stone-300 py-1.5 font-semibold rounded-sm text-base transition-colors">
                  {player?.mainlanguage || "No Language"}
                </span>
              )}
              {player?.secondlanguage && (
                <span className="px-4 bg-neutral-800 text-stone-300 py-1.5 font-semibold rounded-sm text-base transition-colors">
                  {player?.secondlanguage}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingsTable;
