"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCard } from "@/components/github/ProfileCard";
import { RepositoryList } from "@/components/github/RepositoryList";
import { PullRequestList } from "@/components/github/PullRequestList";
import PRScoreChart from "@/components/PRScoreChart";
import { useState } from "react";
import { RadialChart } from "@/components/RadialChart";
import { LeetProfileCard } from "@/components/leetcode/LeetProfileCard";
import Link from "next/link";

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
      {/* Tab Navigation - Made responsive with flex-wrap */}
      <div className="mb-6 p-2">
        <div className="border-b border-stone-700">
          <nav
            className="-mb-px flex flex-wrap space-x-4 md:space-x-8"
            aria-label="Tabs"
          >
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
        <Card className="bg-stone-700/30 backdrop-blur-3xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <Link
              href="/account/edit-info"
              className="bg-green-600 border-green-700/70 shadow-[0_0_50px_theme(colors.green.700/10%)] text-white rounded-lg px-3 py-2 text-md hover:bg-green-700 transition-colors"
            >
              Edit Info
            </Link>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-stone-300 block mb-1">Email</span>
              <p className="break-words">{user?.email}</p>
            </div>

            <div>
              <span className="text-stone-300 block mb-1">Full Name</span>
              {profile?.full_name ? (
                <p className="break-words">{profile.full_name}</p>
              ) : (
                <p className="text-amber-400 text-sm italic">
                  Please complete this data
                </p>
              )}
            </div>

            <div>
              <span className="text-stone-300 block mb-1">Username</span>
              {profile?.username ? (
                <p className="break-words">@{profile.username}</p>
              ) : (
                <p className="text-amber-400 text-sm italic">
                  Please complete this data
                </p>
              )}
            </div>

            <div>
              <span className="text-stone-300 block mb-1">
                LeetCode Username
              </span>
              {profile?.leetcodeusername ? (
                <p className="break-words">{profile.leetcodeusername}</p>
              ) : (
                <p className="text-amber-400 text-sm italic">
                  Please complete this data
                </p>
              )}
            </div>

            <div>
              <span className="text-stone-300 block mb-1">Quality</span>
              {profile?.quality ? (
                <p className="break-words">{profile.quality}</p>
              ) : (
                <p className="text-amber-400 text-sm italic">
                  Please complete this data
                </p>
              )}
            </div>

            <div>
              <span className="text-stone-300 block mb-1">Website</span>
              {profile?.website ? (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-300 hover:text-lime-200 break-words"
                >
                  {profile.website}
                </a>
              ) : (
                <p className="text-amber-400 text-sm italic">
                  Please complete this data
                </p>
              )}
            </div>

            <div>
              <span className="text-stone-300 block mb-1">
                Programming Languages
              </span>
              {profile?.mainlanguage || profile?.secondlanguage ? (
                <div className="flex flex-wrap gap-2">
                  {profile?.mainlanguage && (
                    <span className="px-3 py-1.5 font-semibold rounded-lg bg-stone-700 text-zinc-200">
                      {profile.mainlanguage}
                    </span>
                  )}
                  {profile?.secondlanguage && (
                    <span className="px-3 py-1.5 font-semibold rounded-lg bg-stone-700 text-zinc-200">
                      {profile.secondlanguage}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-amber-400 text-sm italic">
                  Please complete this data
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeTab === "github" && (
        <Card className="bg-stone-700/20 backdrop-blur-2xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">GitHub Activity</h2>
          <ProfileCard user={githubUser} />
          {githubData && githubData.prs && githubData.prs.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
              <div className="flex-1">
                <RepositoryList repositories={githubData.repos} />
              </div>
              <div className="flex-1">
                <PullRequestList pullRequests={githubData.prs} />
              </div>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg text-center">
              <div className="text-amber-300">
                <span className="text-2xl block mb-2">📊</span>
                <p className="font-semibold">
                  Create pull requests to show your score
                </p>
                <p className="text-sm text-amber-400 mt-1">
                  Your GitHub contributions and pull requests will be displayed
                  here once you start contributing to repositories.
                </p>
              </div>
            </div>
          )}
        </Card>
      )}

      {activeTab === "leetcode" && (
        <Card className="bg-stone-700/20 backdrop-blur-2xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">LeetCode Progress</h2>
          {profile?.leetcodeusername ? (
            <>
              <div className="w-full mb-4">
                <Card className="bg-stone-700/30 backdrop-blur-xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)]">
                  <CardHeader>
                    <CardTitle>
                      <span className="text-stone-300 break-words">
                        LeetCode User Name:{" "}
                        <span className="text-lime-300">
                          @{profile?.leetcodeusername}
                        </span>
                      </span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
              {leetcodeStats && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                  <div className="flex bg-stone-700/30 backdrop-blur-xl border-stone-300/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)] rounded-2xl flex-col justify-center p-4 space-y-6 md:space-y-8">
                    <div className="text-center rounded-2xl">
                      <span className="text-lg md:text-xl font-bold text-lime-300">
                        Total Questions Solved
                      </span>
                      <span className="text-3xl md:text-4xl font-bold block mt-2">
                        {leetcodeStats.totalSolved}/3445
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                      <div className="text-center">
                        <span className="text-green-500 block text-sm md:text-base">
                          Easy
                        </span>
                        <p className="text-2xl md:text-3xl font-bold">
                          {leetcodeStats.easySolved}/856
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-yellow-500 block text-sm md:text-base">
                          Medium
                        </span>
                        <p className="text-2xl md:text-3xl font-bold">
                          {leetcodeStats.mediumSolved}/1793
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-red-500 block text-sm md:text-base">
                          Hard
                        </span>
                        <p className="text-2xl md:text-3xl font-bold">
                          {leetcodeStats.hardSolved}/796
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mt-6 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg text-center">
              <div className="text-amber-300">
                <span className="text-2xl block mb-2">🧮</span>
                <p className="font-semibold">
                  Please add your LeetCode profile to show score
                </p>
                <p className="text-sm text-amber-400 mt-1">
                  Add your LeetCode username in your profile settings to see
                  your coding progress and statistics here.
                </p>
                <Link
                  href="/account/edit-info"
                  className="inline-block mt-3 bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700 transition-colors text-sm"
                >
                  Add LeetCode Username
                </Link>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
