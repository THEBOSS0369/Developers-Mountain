"use client";
import React from "react";
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

interface TopRankingsProps {
  players: Player[];
  currentUserId: string;
}

const TopRankings = ({ players, currentUserId }: TopRankingsProps) => {
  const router = useRouter();

  const handlePlayerClick = (playerId: string) => {
    if (playerId === currentUserId) {
      router.push("/account");
    } else {
      router.push(`/profile/${playerId}`);
    }
  };

  // Get top 5 players for all scores (combined)
  const topAllPlayers = [...players]
    .sort((a, b) => {
      const scoreA =
        parseInt(a.scores || "0") + parseInt(a.leetcodescores || "0");
      const scoreB =
        parseInt(b.scores || "0") + parseInt(b.leetcodescores || "0");
      return scoreB - scoreA;
    })
    .slice(0, 5);

  // Get top 5 players for GitHub
  const topGithubPlayers = [...players]
    .sort((a, b) => {
      const scoreA = parseInt(a.scores || "0");
      const scoreB = parseInt(b.scores || "0");
      return scoreB - scoreA;
    })
    .slice(0, 5);

  // Get top 5 players for LeetCode
  const topLeetcodePlayers = [...players]
    .sort((a, b) => {
      const scoreA = parseInt(a.leetcodescores || "0");
      const scoreB = parseInt(b.leetcodescores || "0");
      return scoreB - scoreA;
    })
    .slice(0, 5);

  // Function to render a single ranking card
  const renderRankingCard = (
    title: string,
    players: Player[],
    scoreType: "all" | "github" | "leetcode",
  ) => {
    return (
      <div className="bg-neutral-800 border border-stone-700/70 shadow-[0_0_20px_theme(colors.neutral.700/30%)] bg-opacity-30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-200">{title}</h2>
          <button
            onClick={() =>
              router.push(
                `/ranking?tag=${scoreType === "github" ? "Github" : scoreType === "leetcode" ? "Leetcode" : "All"}`,
              )
            }
            className="text-cyan-300 hover:text-cyan-400 text-sm font-semibold"
          >
            VIEW MORE →
          </button>
        </div>

        <div className="space-y-4">
          {players.map((player, index) => (
            <div
              key={player.id}
              onClick={() => handlePlayerClick(player.id)}
              className={`flex items-center p-3 hover:bg-neutral-700/30 rounded-lg transition-colors cursor-pointer ${
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
              <div className="flex items-center justify-center w-8 mr-3">
                <span className="text-white text-xl font-bold">
                  {index + 1}
                </span>
              </div>

              <div className="h-10 w-10 mr-3">
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

              <div className="flex-grow">
                <div className="text-stone-200 font-medium">
                  {player.full_name || player.username}
                </div>
                {player.full_name && (
                  <div className="text-stone-400 text-sm">
                    @{player.username ? player.username : "Unknown"}
                  </div>
                )}
              </div>

              <div className="text-neutral-200">
                {scoreType === "github"
                  ? player.scores
                    ? parseFloat(player.scores).toFixed(2)
                    : "0.00"
                  : scoreType === "leetcode"
                    ? player.leetcodescores
                      ? parseFloat(player.leetcodescores).toFixed(2)
                      : "0.00"
                    : (
                        parseInt(player.scores || "0") +
                        parseInt(player.leetcodescores || "0")
                      ).toString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-stone-200">
        <span className="text-3xl sm:text-4xl md:text-5xl">🏆</span> DEVELOPERS
        RANKINGS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderRankingCard("Overall Trophies", topAllPlayers, "all")}
        {renderRankingCard("Github Trophies", topGithubPlayers, "github")}
        {renderRankingCard("Leetcode Trophies", topLeetcodePlayers, "leetcode")}
      </div>
    </div>
  );
};

export default TopRankings;
