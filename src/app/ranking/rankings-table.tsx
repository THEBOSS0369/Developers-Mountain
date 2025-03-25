// rankings-table.tsx
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Player {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  scores: string | null;
  leetcodescores: string | null;
  mainlanguage: string | null;
  secondlanguage: string | null;
}

interface RankingsTableProps {
  players: Player[];
  currentUserId: string;
  activeTagFromURL: string;
}

const RankingsTable = ({
  players,
  currentUserId,
  activeTagFromURL,
}: RankingsTableProps) => {
  const [activeTag, setActiveTag] = useState(activeTagFromURL);
  const tagButtons = ["All", "Github", "Leetcode"];
  const [activeLanguage, setActiveLanguage] = useState("All Language");
  const languageButtons = ["All Language"];

  const router = useRouter();

  const handlePlayerClick = (playerId: string) => {
    if (playerId === currentUserId) {
      router.push("/account");
    } else {
      router.push(`/profile/${playerId}`);
    }
  };

  // Function to determine which score to display based on active tag
  const getDisplayScore = (player: Player) => {
    switch (activeTag) {
      case "Github":
        return player.scores ? parseFloat(player.scores).toFixed(2) : "00.00";
      case "Leetcode":
        return player.leetcodescores
          ? parseFloat(player.leetcodescores).toFixed(2)
          : "0.00";
      case "All":
        // You can customize how you want to combine scores
        const githubScore = parseInt(player.scores || "0");
        const leetcodeScore = parseInt(player.leetcodescores || "0");
        return (githubScore + leetcodeScore).toString();
      default:
        return "0";
    }
  };

  // Sort players based on active tag
  const sortedPlayers = [...players].sort((a, b) => {
    const scoreA = parseInt(getDisplayScore(a));
    const scoreB = parseInt(getDisplayScore(b));
    return scoreB - scoreA;
  });

  return (
    <div className="w-full ">
      {/* bg-[#121211] */}
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
        <div className="text-center">{activeTag}</div>
        <div className="text-center">Languages</div>
      </div>

      {/* Table Body */}
      <div className="divide-y max-w-7xl mx-auto divide-[#2D2D2D]">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            onClick={() => handlePlayerClick(player.id)}
            className={`grid grid-cols-4 px-4 py-4 mx-[-12px] hover:bg-neutral-700/30 focus:backdrop-blur-xl rounded-lg transition-colors cursor-pointer ${
              player.id === currentUserId ? "bg-stone-600/30" : ""
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handlePlayerClick(player.id);
              }
            }}
          >
            {/* Rank Column */}
            <div className="flex items-center justify-center w-full">
              <span className="text-white text-2xl">{index + 1}</span>
            </div>

            {/* Player Column - Improved alignment */}
            <div className="flex items-center justify-start w-full gap-4 pl-12">
              <div className="h-10 w-10 flex-shrink-0">
                {player.avatar_url ? (
                  <div className="relative h-10 w-10">
                    <Image
                      src={player.avatar_url}
                      alt="Profile"
                      fill
                      sizes="40px"
                      className="rounded-md object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 bg-gray-600 rounded-full" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-stone-200 font-medium text-xl">
                  {player.full_name || player.username}
                </span>
                {player.full_name && (
                  <span className="text-stone-400 text-sm font-semibold">
                    @{player.username ? player.username : "Unknown"}
                  </span>
                )}
              </div>
            </div>

            {/* Scores Column */}
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-neutral-200 text-xl">
                {getDisplayScore(player)}
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
