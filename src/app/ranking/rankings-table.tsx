"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Player {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  scores: string | null;
  mainlanguage: string | null;
  seoncdlanguage: string | null;
}

interface RankingsTableProps {
  players: Player[];
}

const RankingsTable = ({ players }: RankingsTableProps) => {
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
      <div className="grid grid-cols-4 px-4 py-2 mt-12 border-b border-[#2D2D2D] text-2xl font-semibold text-stone-300">
        <div>Rank</div>
        <div>Player</div>
        <div>Github Scores</div>
        <div>Primary Languages</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#2D2D2D]">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="grid grid-cols-4 px-4 py-3 hover:bg-[#2D2D2D] transition-colors"
          >
            {/* Rank Column */}
            <div className="flex items-center">
              <span className="text-white">#{index + 1}</span>
            </div>

            {/* Player Column */}
            <div className="flex items-center gap-4">
              {player.avatar_url ? (
                <Image
                  src={player.avatar_url}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                  priority
                />
              ) : (
                <div className="w-8 h-8 bg-gray-600 rounded-full" />
              )}
              <div className="flex flex-col">
                <span className="text-stone-200 font-medium text-xl">
                  {player.full_name || player.username}
                </span>
                {player.full_name && (
                  <span className="text-stone-400 font-semibold ">
                    @{player.username}
                  </span>
                )}
              </div>
            </div>

            {/* Github Scores Column */}
            <div className="flex flex-col">
              <span className="text-white">
                {player.scores ? player.scores : "No scores yet"}
              </span>
            </div>
            <div className="flex flex-col">
              {player.mainlanguage ? player.mainlanguage : "No Language"},
              {player.secondlanguage ? player.secondlanguage : "No Language"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingsTable;
