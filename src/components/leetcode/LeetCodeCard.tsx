import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

interface LeetCodeCardProps {
  stats: LeetCodeStats | null;
  isLoading?: boolean;
  username: string;
}

const LeetCodeCard = ({ stats, isLoading, username }: LeetCodeCardProps) => {
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

        <div className="text-center text-sm text-gray-400">
          Acceptance Rate: {stats.acceptanceRate.toFixed(1)}%
        </div>
      </CardContent>
    </Card>
  );
};

export default LeetCodeCard;
