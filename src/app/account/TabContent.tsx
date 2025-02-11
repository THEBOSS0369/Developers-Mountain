"use client";

import { Card } from "@/components/ui/card";
import { ProfileCard } from "@/components/github/ProfileCard";
import { RepositoryList } from "@/components/github/RepositoryList";
import { PullRequestList } from "@/components/github/PullRequestList";
import PRScoreChart from "@/components/PRScoreChart";
import { useState } from "react";
import { RadialChart } from "@/components/RadialChart";

interface TabContentProps {
  user: any;
  profile: any;
  githubUser: any;
  githubData: any;
  leetcodeStats: any;
}

export const TabContent = ({
  user,
  profile,
  githubUser,
  githubData,
  leetcodeStats,
}: TabContentProps) => {
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
            <div>
              <span className="text-gray-400 block mb-1">Email</span>
              <p>{user?.email}</p>
            </div>
            {profile?.website && (
              <div>
                <span className="text-gray-400 block mb-1">Website</span>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  {profile.website}
                </a>
              </div>
            )}
            <div>
              <span className="text-gray-400 block mb-1">Languages</span>
              <div className="flex gap-2">
                <p className="px-4 py-1.5 font-semibold rounded-sm bg-neutral-800 text-zinc-200">
                  {profile?.mainlanguage}
                </p>
                <p className="px-4 py-1.5 font-semibold rounded-sm bg-neutral-800 text-zinc-200">
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
          <ProfileCard user={githubUser} />
          {githubData && (
            <div className="flex space-x-6 mt-6">
              <div className="flex-1">
                <RepositoryList repositories={githubData.repos} />
              </div>
              <div className="flex-1">
                <PullRequestList pullRequests={githubData.prs} />
              </div>
            </div>
          )}
        </Card>
      )}

      {activeTab === "leetcode" && (
        <Card className="bg-stone-700/20 backdrop-blur-2xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-6">
          <h2 className="text-xl font-semibold mb-4">LeetCode Progress</h2>
          {profile?.leetcodeusername && leetcodeStats && (
            <div className="space-y-6">
              <div className="mt-6">
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
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center">
                  <span className="text-xl text-zinc-400">Total Solved</span>
                  <span className="text-3xl font-bold">
                    {leetcodeStats.totalSolved}/3445
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <span className="text-green-500 block">Easy</span>
                    <p className="text-2xl font-bold">
                      {leetcodeStats.easySolved}/856
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-yellow-500 block">Medium</span>
                    <p className="text-2xl font-bold">
                      {leetcodeStats.mediumSolved}/1793
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-red-500 block">Hard</span>
                    <p className="text-2xl font-bold">
                      {leetcodeStats.hardSolved}/796
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2a2a2a] rounded-lg p-4">
                <h3 className="text-gray-400 mb-2">Badges</h3>
                <div className="text-center">
                  <p className="text-4xl font-bold">0</p>
                  <p className="text-gray-400">Locked Badge</p>
                  <p className="text-xs">Feb LeetCoding Challenge</p>
                </div>
              </div>

              <div className="bg-[#2a2a2a] rounded-lg p-4">
                <h3 className="text-gray-400 mb-2">Submission Activity</h3>
                <div className="h-20 bg-[#1a1a1a] rounded grid grid-cols-12 gap-1 p-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-[#2a2a2a] rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
