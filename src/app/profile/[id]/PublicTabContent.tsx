"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCard } from "@/components/github/ProfileCard";
import { RepositoryList } from "@/components/github/RepositoryList";
import { PullRequestList } from "@/components/github/PullRequestList";
import PRScoreChart from "@/components/PRScoreChart";
import { useState } from "react";
import { RadialChart } from "@/components/RadialChart";
import LeetProfileCard from "@/components/leetcode/LeetProfileCard";

interface PublicTabContentProps {
  profile: any;
  githubData?: any;
  leetcodeStats?: any;
}

export const PublicTabContent = ({
  profile,
  githubData,
  leetcodeStats,
}: PublicTabContentProps) => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-6 p-2">
        <div className="border-b border-stone-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { id: "personal", label: "Personal Info" },
              { id: "github", label: "GitHub" },
              { id: "leetcode", label: "LeetCode" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-1 pb-4 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "border-stone-300 text-white"
                    : "border-transparent text-stone-300 hover:border-stone-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "personal" && (
        <Card className="bg-stone-700/30 backdrop-blur-3xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            {profile?.website && (
              <div>
                <span className="text-stone-300 block mb-1">Website</span>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-300 hover:text-lime-200"
                >
                  {profile.website}
                </a>
              </div>
            )}
            <div>
              <span className="text-stone-300 block mb-1">Languages</span>
              <div className="flex gap-2">
                <p className="px-4 py-1.5 font-semibold rounded-sm bg-stone-700 text-zinc-200">
                  {profile?.mainlanguage}
                </p>
                <p className="px-4 py-1.5 font-semibold rounded-sm bg-stone-700 text-zinc-200">
                  {profile?.secondlanguage}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "github" && (
        <Card className="bg-stone-700/20 backdrop-blur-2xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-6">
          <h2 className="text-xl font-semibold mb-4">GitHub Activity</h2>
          {githubData ? (
            <div className="flex space-x-6 mt-6">
              <div className="flex-1">
                <RepositoryList repositories={githubData.repos} />
              </div>
              <div className="flex-1">
                <PullRequestList pullRequests={githubData.prs} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-stone-300 mb-3">
                👋 Want to see GitHub activity?
              </div>
              <p className="text-stone-400 mb-4">
                Sign in with GitHub to view repository, PR data and Score
              </p>
              <a
                href="/Login"
                className="inline-flex items-center px-4 py-2 bg-stone-700 text-white rounded-md hover:bg-stone-600 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Sign in with GitHub
              </a>
            </div>
          )}
        </Card>
      )}

      {activeTab === "leetcode" && (
        <Card className="bg-stone-700/20 backdrop-blur-2xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-6">
          <h2 className="text-xl font-semibold mb-4">LeetCode Progress</h2>
          <div className="w-full mb-4">
            <Card className="bg-stone-700/30 backdrop-blur-xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)]">
              <CardHeader>
                <CardTitle>
                  {profile?.leetcodeusername && (
                    <span className="text-stone-300">
                      LeetCode User Name:{" "}
                      <span className="text-lime-300">
                        @{profile?.leetcodeusername}
                      </span>
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          {profile?.leetcodeusername && leetcodeStats && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <RadialChart
                  title="LeetCode Progress"
                  value={leetcodeStats.totalSolved}
                  maxValue={3445}
                  label="Total Solved"
                  description="Problem Solving Progress"
                  trend={3.5}
                  trendPeriod="All Time"
                />
              </div>
              <div className="flex bg-stone-700/30 backdrop-blur-xl border-stone-300/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)] rounded-2xl flex-col justify-center space-y-8">
                <div className="text-center rounded-2xl">
                  <span className="text-xl font-bold text-lime-300">
                    Total Questions Solved
                  </span>
                  <span className="text-4xl font-bold block mt-2">
                    {leetcodeStats.totalSolved}/3445
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <span className="text-green-500 block">Easy</span>
                    <p className="text-3xl font-bold">
                      {leetcodeStats.easySolved}/856
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-yellow-500 block">Medium</span>
                    <p className="text-3xl font-bold">
                      {leetcodeStats.mediumSolved}/1793
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-red-500 block">Hard</span>
                    <p className="text-3xl font-bold">
                      {leetcodeStats.hardSolved}/796
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
