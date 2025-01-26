"use client";

import React from "react";
import Image from "next/image";

interface Player {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  scores: string | null;
}

interface RankingsTableProps {
  players: Player[];
}

const RankingsTable = ({ players }: RankingsTableProps) => {
  return (
    <div className="w-full bg-[#121211]">
      {/* Table Header */}
      <div className="grid grid-cols-4 px-4 py-2 border-b border-[#2D2D2D] text-gray-400">
        <div>Rank</div>
        <div>Player</div>
        <div>Github Scores</div>
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
            <div className="flex items-center gap-2">
              {player.avatar_url ? (
                <Image
                  src={player.avatar_url}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  priority
                />
              ) : (
                <div className="w-8 h-8 bg-gray-600 rounded-full" />
              )}
              <div className="flex flex-col">
                <span className="text-white">
                  {player.full_name || player.username}
                </span>
                {player.full_name && (
                  <span className="text-gray-400 text-sm">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingsTable;
