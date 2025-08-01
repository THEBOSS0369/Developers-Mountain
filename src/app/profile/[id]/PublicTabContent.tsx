"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCard } from "@/components/github/ProfileCard";
import { RepositoryList } from "@/components/github/RepositoryList";
import { PullRequestList } from "@/components/github/PullRequestList";
import PRScoreChart from "@/components/PRScoreChart";
import { useState } from "react";
import { RadialChart } from "@/components/RadialChart";
import { LeetProfileCard } from "@/components/leetcode/LeetProfileCard";

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
      {/* Tab Navigation - Scrollable on mobile */}
      <div className="mb-6 p-2 overflow-x-auto">
        <div className="border-b border-stone-700 min-w-max">
          <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
            {[
              { id: "personal", label: "Personal Info" },
              { id: "github", label: "GitHub" },
              { id: "leetcode", label: "LeetCode" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-1 pb-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
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
        <Card className="bg-stone-700/30 backdrop-blur-3xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-3 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Personal Information
          </h2>

          <div className="space-y-4">
            {profile?.full_name && (
              <div>
                <span className="text-stone-300 block mb-1">Full Name</span>
                <p className="text-sm sm:text-base break-words">
                  {profile.full_name}
                </p>
              </div>
            )}

            {profile?.username && (
              <div>
                <span className="text-stone-300 block mb-1">Username</span>
                <p className="text-sm sm:text-base break-words">
                  @{profile.username}
                </p>
              </div>
            )}

            {profile?.leetcodeusername && (
              <div>
                <span className="text-stone-300 block mb-1">
                  LeetCode Username
                </span>
                <p className="text-sm sm:text-base break-words">
                  {profile.leetcodeusername}
                </p>
              </div>
            )}

            {profile?.quality && (
              <div>
                <span className="text-stone-300 block mb-1">Quality</span>
                <p className="text-sm sm:text-base break-words">
                  {profile.quality}
                </p>
              </div>
            )}

            {profile?.website && (
              <div>
                <span className="text-stone-300 block mb-1">Website</span>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-300 hover:text-lime-200 text-sm sm:text-base break-all"
                >
                  {profile.website}
                </a>
              </div>
            )}

            {(profile?.mainlanguage || profile?.secondlanguage) && (
              <div>
                <span className="text-stone-300 block mb-1">
                  Programming Languages
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile?.mainlanguage && (
                    <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base font-semibold rounded-lg bg-stone-700 text-zinc-200">
                      {profile.mainlanguage}
                    </span>
                  )}
                  {profile?.secondlanguage && (
                    <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base font-semibold rounded-lg bg-stone-700 text-zinc-200">
                      {profile.secondlanguage}
                    </span>
                  )}
                </div>
              </div>
            )}

            {!profile?.full_name &&
              !profile?.username &&
              !profile?.leetcodeusername &&
              !profile?.quality &&
              !profile?.website &&
              !profile?.mainlanguage &&
              !profile?.secondlanguage && (
                <div className="text-center text-stone-400 mt-4">
                  <p>User hasn't added personal information.</p>
                </div>
              )}
          </div>
        </Card>
      )}

      {activeTab === "github" && (
        <Card className="bg-stone-700/20 backdrop-blur-2xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-3 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            GitHub Activity
          </h2>
          {githubData && githubData.prs && githubData.prs.length > 0 ? (
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 mt-6">
              <div className="lg:flex-1">
                <RepositoryList repositories={githubData.repos} />
              </div>
              <div className="lg:flex-1">
                <PullRequestList pullRequests={githubData.prs} />
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-12">
              <div className="text-amber-300">
                <span className="text-2xl block mb-2">📊</span>
                <p className="font-semibold mb-2">
                  User needs to create pull requests to show their score
                </p>
                <p className="text-sm text-amber-400 mb-2">
                  GitHub contributions and pull requests will be displayed here
                  once they start contributing to repositories.
                </p>
                <p className="text-sm text-amber-500 font-medium">
                  Else if you haven't logged in you won't be able see the data!
                </p>
              </div>
            </div>
          )}
        </Card>
      )}

      {activeTab === "leetcode" && (
        <Card className="bg-stone-700/20 backdrop-blur-2xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-3 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            LeetCode Progress
          </h2>
          {profile?.leetcodeusername && (
            <div className="w-full mb-4">
              <Card className="bg-stone-700/30 backdrop-blur-xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)]">
                <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
                  <CardTitle>
                    <span className="text-stone-300 text-sm sm:text-base">
                      LeetCode User Name:{" "}
                      <span className="text-lime-300">
                        @{profile.leetcodeusername}
                      </span>
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          )}

          {profile?.leetcodeusername ? (
            leetcodeStats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
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
                <div className="flex bg-stone-700/30 backdrop-blur-xl border-stone-300/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)] rounded-2xl flex-col justify-center space-y-4 sm:space-y-8 p-4">
                  <div className="text-center rounded-2xl">
                    <span className="text-base sm:text-xl font-bold text-lime-300">
                      Total Questions Solved
                    </span>
                    <span className="text-2xl sm:text-4xl font-bold block mt-2">
                      {leetcodeStats.totalSolved}/3445
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-8">
                    <div className="text-center">
                      <span className="text-green-500 block text-sm sm:text-base">
                        Easy
                      </span>
                      <p className="text-xl sm:text-3xl font-bold">
                        {leetcodeStats.easySolved}/856
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="text-yellow-500 block text-sm sm:text-base">
                        Medium
                      </span>
                      <p className="text-xl sm:text-3xl font-bold">
                        {leetcodeStats.mediumSolved}/1793
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="text-red-500 block text-sm sm:text-base">
                        Hard
                      </span>
                      <p className="text-xl sm:text-3xl font-bold">
                        {leetcodeStats.hardSolved}/796
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-stone-400 mt-4">
                <p>Loading LeetCode data...</p>
              </div>
            )
          ) : (
            <div className="text-center py-6">
              <div className="text-amber-300">
                <span className="text-2xl block mb-2">🧮</span>
                <p className="font-semibold">
                  User hasn't added their LeetCode profile
                </p>
                <p className="text-sm text-amber-400 mt-1">
                  LeetCode progress and statistics will be displayed here once
                  they add their username.
                </p>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
