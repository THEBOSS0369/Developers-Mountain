import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import SearchSection from "@/hooks/SearchSelection";
import TopRankings from "./ranking/TopRankings"; // Add this import

export default async function Home() {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select(
      "id, username, full_name, avatar_url, scores, mainlanguage, secondlanguage, leetcodeusername, leetcodescores",
    )
    .order("scores", { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching profiles:", error);
    return <div>Error loading rankings</div>;
  }

  // Transform profiles to include proper avatar URLs
  const playersWithAvatars = profiles.map((profile) => ({
    ...profile,
    avatar_url: profile.avatar_url
      ? getPublicImageURL("avatars", profile.avatar_url)
      : null,
  }));

  return (
    <div className="bg-gradient-to-r min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative shadow-[0_0_50px_theme(colors.stone.500/20%)] rounded-lg h-[500px] w-[calc(100%-20px)] mx-auto overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/light.jpg')",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute bg-black/30 backdrop-blur-[1px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-stone-300 mb-2">
            DEVELOPERS MOUNTAIN
          </h1>
          <p className="text-xl md:text-3xl text-stone-400 max-w-4xl mb-8">
            Discover all top developers around the world!
          </p>

          {/* Search Bar */}
          <SearchSection
            profiles={playersWithAvatars}
            currentUserId={user?.id || ""}
          />
        </div>
      </div>

      {/* Rankings Section */}
      <TopRankings
        players={playersWithAvatars}
        currentUserId={user?.id || ""}
      />

      <div className="container mx-auto px-4 mt-16 text-center">
        <div className="text-5xl md:text-4xl text-brown-200 font-extrabold tracking-wide tracking-tight leading-tight mb-4">
          TRACK YOUR
          <span className=" text-cyan-300"> DEVELOPER </span>
          JOURNEY AND
          <br />
          <span className="text-fuchsia-500"> RISE THROUGH</span>
          <span className="text-fuchsia-500"> RANKS! 😈</span>
        </div>
      </div>

      {/* Features Section */}
      {/* Features Section with Developer-Focused Content */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-stone-200">
          Features for Developers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* GitHub Integration Card */}
          <div className="bg-blue-800 bg-opacity-30 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="flex justify-between mb-8">
              <div className="flex">
                <div className="h-8 w-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </div>
                <div className="h-8 w-8 bg-gray-400 rounded-full -ml-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="8" height="8" x="2" y="2" rx="2"></rect>
                    <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"></path>
                    <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"></path>
                    <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1"></path>
                    <polyline points="7 21 10 18 7 15"></polyline>
                    <rect width="8" height="8" x="14" y="14" rx="2"></rect>
                  </svg>
                </div>
              </div>
              <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                  <path d="M10 2c1 .5 2 2 2 5"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">
              GitHub <span className="text-yellow-400">Integration</span>
            </div>
            <div className="text-xl font-bold mb-4">TRACK YOUR PROGRESS</div>
            <p className="text-gray-300 mb-6">
              Connect your GitHub account to automatically track contributions,
              repositories, and coding activity. Build your developer reputation
              with real metrics.
            </p>
            <button className="w-full bg-black text-white py-3 rounded-md flex items-center justify-center group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Connect GitHub
            </button>
          </div>

          {/* LeetCode Tracking Card */}
          <div className="bg-indigo-800 bg-opacity-30 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="text-4xl font-bold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                <path d="M5 3v4"></path>
                <path d="M19 17v4"></path>
                <path d="M3 5h4"></path>
                <path d="M17 19h4"></path>
              </svg>
              <span>
                150+ <span className="text-yellow-400">Challenges</span>
              </span>
            </div>
            <div className="text-xl font-bold mb-4">ALGORITHM MASTERY</div>
            <p className="text-gray-300 mb-6">
              Track your LeetCode progress and compare solutions with top
              developers. Level up your algorithmic thinking and interview
              preparation skills.
            </p>
            <div className="flex justify-between items-center text-cyan-300 mb-4">
              <span>Easy</span>
              <div className="w-3/4 bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <span>70%</span>
            </div>
            <div className="flex justify-between items-center text-cyan-300 mb-4">
              <span>Medium</span>
              <div className="w-3/4 bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <span>45%</span>
            </div>
            <div className="flex justify-between items-center text-cyan-300">
              <span>Hard</span>
              <div className="w-3/4 bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
              <span>20%</span>
            </div>
          </div>

          {/* Community Features Card */}
          <div className="bg-fuchsia-900 bg-opacity-30 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="text-4xl font-bold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M17 7.82v-3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3"></path>
                <path d="M12 22v-6"></path>
                <rect width="18" height="10" x="3" y="10" rx="2"></rect>
              </svg>
              <span>
                Developer <span className="text-yellow-400">Community</span>
              </span>
            </div>
            <div className="text-xl font-bold mb-4">CONNECT & COLLABORATE</div>
            <p className="text-gray-300 mb-6">
              Join forces with developers who share your tech stack. Get
              inspired by top performers, participate in coding challenges, and
              elevate your skills through community-driven growth.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-gray-800 rounded-lg p-2 text-center">
                <div className="text-2xl font-bold text-cyan-300">24/7</div>
                <div className="text-xs text-gray-400">Support</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-2 text-center">
                <div className="text-2xl font-bold text-fuchsia-400">10K+</div>
                <div className="text-xs text-gray-400">Users</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-2 text-center">
                <div className="text-2xl font-bold text-amber-300">5+</div>
                <div className="text-xs text-gray-400">Events/mo</div>
              </div>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-md flex items-center justify-center group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Join Community
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 border-t border-gray-800">
          <h2 className="text-4xl font-bold text-center mb-12 text-stone-200">
            <span className="text-cyan-300">Latest</span> Activity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Achievements */}
            <div className="bg-neutral-800 bg-opacity-30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-stone-200">
                  Recent Achievements
                </h3>
                <button className="text-cyan-300 hover:text-cyan-400 text-sm font-semibold">
                  VIEW ALL →
                </button>
              </div>

              <div className="space-y-4">
                {/* Achievement items - you would map through actual data */}
                <div className="flex items-center p-3 bg-neutral-700/20 rounded-lg">
                  <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-4">
                    🏆
                  </div>
                  <div className="flex-grow">
                    <div className="text-stone-200 font-medium">
                      LeetCode Marathon Champion
                    </div>
                    <div className="text-stone-400 text-sm">
                      @johndoe solved 30 problems in 24 hours
                    </div>
                  </div>
                  <div className="text-neutral-400 text-sm">2 hours ago</div>
                </div>

                <div className="flex items-center p-3 bg-neutral-700/20 rounded-lg">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold mr-4">
                    🚀
                  </div>
                  <div className="flex-grow">
                    <div className="text-stone-200 font-medium">
                      1000+ GitHub Commits
                    </div>
                    <div className="text-stone-400 text-sm">
                      @dev_master reached 1000 commit milestone
                    </div>
                  </div>
                  <div className="text-neutral-400 text-sm">Yesterday</div>
                </div>

                <div className="flex items-center p-3 bg-neutral-700/20 rounded-lg">
                  <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-black font-bold mr-4">
                    🌟
                  </div>
                  <div className="flex-grow">
                    <div className="text-stone-200 font-medium">
                      Most Valuable Contributor
                    </div>
                    <div className="text-stone-400 text-sm">
                      @codewarrior earned 50+ stars on open source
                    </div>
                  </div>
                  <div className="text-neutral-400 text-sm">3 days ago</div>
                </div>
              </div>
            </div>

            {/* Top Language Stats */}
            <div className="bg-neutral-800 bg-opacity-30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-stone-200">
                  Top Programming Languages
                </h3>
                <div className="text-cyan-300 text-sm font-semibold">
                  THIS MONTH
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-200 font-medium">
                      JavaScript
                    </span>
                    <span className="text-stone-400">42%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{ width: "42%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-200 font-medium">Python</span>
                    <span className="text-stone-400">27%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "27%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-200 font-medium">
                      TypeScript
                    </span>
                    <span className="text-stone-400">15%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-cyan-500 h-2.5 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-200 font-medium">Java</span>
                    <span className="text-stone-400">10%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-red-500 h-2.5 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-200 font-medium">Go</span>
                    <span className="text-stone-400">6%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-400 h-2.5 rounded-full"
                      style={{ width: "6%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="container mx-auto px-4 py-12 border-t border-gray-800">
          <h2 className="text-4xl font-bold text-center mb-12 text-stone-200">
            Upcoming <span className="text-fuchsia-500">Events</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Event cards */}
            <div className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors">
              <div className="h-48 bg-indigo-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🏆</div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full text-sm font-semibold">
                  Mar 28
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Weekend Code Challenge
                </h3>
                <p className="text-gray-400 mb-4">
                  48-hour hackathon to build a full-stack application with
                  real-world impact.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300 text-sm">
                    312 Participants
                  </span>
                  <button className="px-4 py-2 bg-black rounded-md text-white group-hover:bg-indigo-600 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors">
              <div className="h-48 bg-purple-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full text-sm font-semibold">
                  Apr 5
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Open Source Contribution Day
                </h3>
                <p className="text-gray-400 mb-4">
                  Join forces with maintainers to contribute to popular open
                  source projects.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300 text-sm">
                    198 Participants
                  </span>
                  <button className="px-4 py-2 bg-black rounded-md text-white group-hover:bg-purple-600 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors">
              <div className="h-48 bg-green-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🎯</div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full text-sm font-semibold">
                  Apr 12
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  LeetCode Tournament
                </h3>
                <p className="text-gray-400 mb-4">
                  Compete in a live tournament solving algorithmic challenges
                  against fellow developers.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300 text-sm">
                    256 Participants
                  </span>
                  <button className="px-4 py-2 bg-black rounded-md text-white group-hover:bg-green-600 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Community CTA Section */}
        <div className="container mx-auto px-4 py-16 border-t border-gray-800">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Join the Developer{" "}
                <span className="text-cyan-300">Community?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Connect your GitHub and LeetCode accounts to start tracking your
                progress, join the rankings, and compete with developers
                worldwide.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-white text-gray-900 rounded-md font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  Connect GitHub
                </button>
                <button className="px-8 py-4 bg-black text-white rounded-md font-bold text-lg hover:bg-gray-900 transition-colors flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"></path>
                    <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"></path>
                    <path d="M6 6h.01"></path>
                    <path d="M6 18h.01"></path>
                    <path d="m13 6-4 6h6l-4 6"></path>
                  </svg>
                  Connect LeetCode
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-4 py-16 border-t border-gray-800">
          <h2 className="text-4xl font-bold text-center mb-12 text-stone-200">
            Developer <span className="text-amber-400">Testimonials</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 relative">
              <div className="absolute -top-5 -left-5 text-6xl">💬</div>
              <div className="pt-8">
                <p className="text-gray-300 mb-6 italic">
                  "This platform has transformed how I approach my coding
                  journey. The rankings keep me motivated, and seeing other
                  developers' progress pushes me to improve daily."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-indigo-600 rounded-full"></div>
                  <div className="ml-4">
                    <div className="text-white font-semibold">Sarah Chen</div>
                    <div className="text-gray-400">Full Stack Developer</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 relative">
              <div className="absolute -top-5 -left-5 text-6xl">💬</div>
              <div className="pt-8">
                <p className="text-gray-300 mb-6 italic">
                  "Connecting my GitHub and LeetCode accounts gave me visibility
                  into where I stand among peers. The community aspect is
                  fantastic - I've found collaborators for several projects
                  here."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-green-600 rounded-full"></div>
                  <div className="ml-4">
                    <div className="text-white font-semibold">
                      Jamal Washington
                    </div>
                    <div className="text-gray-400">Backend Engineer</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 relative">
              <div className="absolute -top-5 -left-5 text-6xl">💬</div>
              <div className="pt-8">
                <p className="text-gray-300 mb-6 italic">
                  "The coding challenges and events have significantly improved
                  my problem-solving skills. I landed my dream job after being
                  discovered through my ranking on this platform!"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-purple-600 rounded-full"></div>
                  <div className="ml-4">
                    <div className="text-white font-semibold">
                      Elena Rodriguez
                    </div>
                    <div className="text-gray-400">AI Engineer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-black bg-opacity-50 py-12 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-4">
                  DEVELOPERS MOUNTAIN
                </h3>
                <p className="text-gray-400 mb-6">
                  Track your progress, compete with fellow developers, and
                  showcase your skills to the world.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Links
                </h4>
                <ul className="text-gray-400">
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Home
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Leaderboard
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Challenges
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Learning Paths
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Events
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Resources
                </h4>
                <ul className="text-gray-400">
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      API Reference
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Community
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm mb-4 md:mb-0">
                  © 2025 Developers Mountain. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-gray-500 text-sm hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 text-sm hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 text-sm hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
