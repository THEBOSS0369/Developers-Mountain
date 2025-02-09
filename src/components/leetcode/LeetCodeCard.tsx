"use client";
import React from "react";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LeetCodeStats } from "@/types/leetcode";
import { getScoreBreakdown } from "@/lib/leetcode";
import { createClient } from "@/utils/supabase/client";

interface LeetCodeCardProps {
  stats: LeetCodeStats | null;
  isLoading?: boolean;
  username: string;
}

const LeetCodeCard = ({ stats, isLoading, username }: LeetCodeCardProps) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // Update Supabase score when stats change
  useEffect(() => {
    const updateSupabaseScore = async () => {
      if (!user || !stats) return;

      try {
        const { error } = await supabase
          .from("profiles")
          .update({ leetcodescores: stats.performanceScore })
          .eq("id", user.id);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating LeetCode score:", error);
      }
    };

    updateSupabaseScore();
  }, [stats, user]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>LeetCode Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>LeetCode Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            No LeetCode data available for {username}
          </p>
        </CardContent>
      </Card>
    );
  }

  // if stats exist caluclate the score
  const scoreBreakdown = stats ? getScoreBreakdown(stats) : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>LeetCode Stats</span>
          <span className="text-sm text-gray-400">Rank: #{stats.ranking}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Problems */}
        <div>
          <div className="flex justify-between mb-2">
            <span>Total Solved</span>
            <span>
              {stats.totalSolved} / {stats.totalQuestions}
            </span>
          </div>
          <Progress
            value={(stats.totalSolved / stats.totalQuestions) * 100}
            className="h-2"
          />
        </div>

        {/* Difficulty Breakdown */}
        <div className="grid gap-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-green-400">Easy</span>
              <span>{stats.easySolved}</span>
            </div>
            <Progress
              value={stats.easySolved}
              max={stats.totalQuestions}
              className="h-2 bg-gray-700"
            >
              <div
                className="h-full bg-green-400 transition-all"
                style={{
                  width: `${(stats.easySolved / stats.totalQuestions) * 100}%`,
                }}
              />
            </Progress>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-yellow-400">Medium</span>
              <span>{stats.mediumSolved}</span>
            </div>
            <Progress
              value={stats.mediumSolved}
              max={stats.totalQuestions}
              className="h-2 bg-gray-700"
            >
              <div
                className="h-full bg-yellow-400 transition-all"
                style={{
                  width: `${(stats.mediumSolved / stats.totalQuestions) * 100}%`,
                }}
              />
            </Progress>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-red-400">Hard</span>
              <span>{stats.hardSolved}</span>
            </div>
            <Progress
              value={stats.hardSolved}
              max={stats.totalQuestions}
              className="h-2 bg-gray-700"
            >
              <div
                className="h-full bg-red-400 transition-all"
                style={{
                  width: `${(stats.hardSolved / stats.totalQuestions) * 100}%`,
                }}
              />
            </Progress>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Performance Score</span>
            <span className="text-xl font-bold">
              {stats.performanceScore.toFixed(1)}
            </span>
          </div>
          <Progress
            value={stats.performanceScore}
            className=" bg-blue-500 h-2"
          />

          {/* Optional: Score Breakdown Details */}
          {scoreBreakdown && (
            <div className="text-sm text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>Difficulty Score</span>
                <span>
                  Easy: {scoreBreakdown.difficultyScore.easy.toFixed(1)} |
                  Medium: {scoreBreakdown.difficultyScore.medium.toFixed(1)} |
                  Hard: {scoreBreakdown.difficultyScore.hard.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Solved Ratio Score</span>
                <span>{scoreBreakdown.solvedRatioScore.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Acceptance Score</span>
                <span>{scoreBreakdown.acceptanceScore.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ranking Score</span>
                <span>{scoreBreakdown.rankingScore.toFixed(1)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-400">
          Acceptance Rate: {stats.acceptanceRate.toFixed(1)}%
        </div>
      </CardContent>
    </Card>
  );
};

export default LeetCodeCard;
