import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import SearchSection from "@/hooks/SearchSelection";
import TopRankings from "./ranking/TopRankings";

import Link from "next/link";

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
      {/* Hero Section - Mobile optimized but preserving desktop layout */}
      {/* Hero Section - With expanded search bar for mobile */}
      <div className="relative shadow-[0_0_50px_theme(colors.stone.500/20%)] rounded-lg h-[400px] sm:h-[500px] w-[calc(100%-16px)] sm:w-[calc(100%-20px)] mx-auto overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/light.jpg')",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/30 backdrop-blur-[1px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-3 sm:px-4">
          <h1 className="text-4xl sm:text-4xl md:text-6xl font-extrabold text-stone-300 mb-2 leading-tight">
            DEVELOPERS
            <br className="sm:hidden" /> MOUNTAIN
          </h1>
          <p className="text-sm sm:text-xl md:text-3xl text-stone-400 max-w-4xl mb-5 sm:mb-8 px-2">
            Discover all top developers around the world!
          </p>

          {/* Search Bar Container with much wider mobile width */}
          <div className="w-[90%] sm:w-full sm:max-w-2xl">
            <SearchSection
              profiles={playersWithAvatars}
              currentUserId={user?.id || ""}
            />
          </div>
        </div>
      </div>

      {/* Rankings Section */}
      <TopRankings
        players={playersWithAvatars}
        currentUserId={user?.id || ""}
      />

      <div className="w-full px-4 sm:px-6 md:px-8 py-4">
        <div className="border-t border-stone-700 w-3/4 mx-auto"></div>
      </div>

      <div className="container mx-auto px-4 mt-12 sm:mt-16 text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brown-200 font-extrabold tracking-tight leading-snug sm:leading-tight mb-4">
          TRACK YOUR
          <span className="text-cyan-300"> DEVELOPER </span>
          JOURNEY AND
          <br />
          <span className="text-fuchsia-500"> RISE THROUGH </span>
          <span className="text-fuchsia-500"> RANKS! 😈</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Join Community CTA Section */}
        <div className="container mx-auto px-4 py-4 ">
          <div className="bg-neutral-700 bg-opacity-30 border border-stone-700/70 shadow-[0_0_40px_theme(colors.neutral.700/30%)] rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Join the Developer{" "}
                <span className="text-cyan-300">Community!!</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Connect your GitHub and LeetCode accounts to start tracking your
                progress, join the rankings and compete with developers
                worldwide.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {user ? (
                  <Link href="/account" legacyBehavior>
                    <a className="px-8 py-4 bg-white text-gray-900 rounded-md font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
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
                    </a>
                  </Link>
                ) : (
                  <Link
                    href="/Login"
                    className="px-8 py-4 bg-white text-gray-900 rounded-md font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
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
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
