// page.tsx
import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import Link from "next/link";
import Image from "next/image";
import { GitHubUser } from "@/types/github";
import { fetchGitHubData } from "@/lib/github";
import { fetchLeetCodeStats } from "@/lib/leetcode";
import { TabContent } from "./TabContent";
import { Suspense } from "react";
import { InstantLoadingSpinner } from "@/components/common/InstantLoadingSpinner";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "full_name, username, website, avatar_url, scores, mainlanguage, secondlanguage, leetcodeusername, leetcodescores"
    )
    .eq("id", user?.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.log("Error fetching profile:", error);
  }

  const avatarUrl = getPublicImageURL("avatars", profile?.avatar_url);

  const githubUser: GitHubUser = {
    name: user?.user_metadata?.name || "User",
    email: user?.user_metadata?.email || "",
    avatar_url: user?.user_metadata?.avatar_url || "",
    user_name: user?.user_metadata?.user_name || "",
  };

  let githubData;
  if (githubUser.user_name) {
    githubData = await fetchGitHubData(githubUser.user_name);
  }

  let leetcodeStats = null;
  if (profile?.leetcodeusername) {
    leetcodeStats = await fetchLeetCodeStats(profile.leetcodeusername);
  }

  return (
    <div className="text-white min-h-screen px-4 sm:px-6 py-2">
      <div className="mx-auto ">
        {/* Hero Background */}
        <div className="relative shadow-[0_0_50px_theme(colors.stone.500/40%)] rounded-lg h-[150px] sm:h-[200px] md:h-[250px] w-full mx-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/zebra.png')",
              backgroundPosition: "center",
            }}
          />
          {/* <div className="absolute shadow-[0_0_50px_theme(colors.stone.700/40%)] inset-0 rounded-lg bg-black/10 backdrop-blur-2xl to-transparent" /> */}
        </div>

        {/* Profile Section - Restructured for mobile */}
        <div className="flex flex-col md:flex-row md:items-center md:ml-20 md:space-x-6 mb-6 -mt-12 sm:-mt-16 md:-mt-20">
          {/* Avatar Container */}
          <div className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[320px] md:h-[280px] lg:w-[360px] lg:h-[300px] mx-auto md:mx-0 overflow-hidden bg-stone-800/10 backdrop-blur-xl border-2 border-stone-600/20 rounded-3xl">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="Profile"
                width={200}
                height={200}
                className="rounded-3xl object-cover w-full h-full"
                priority
              />
            )}
            <Link
              href="/account/edit-info"
              className="absolute bottom-2 right-2 bg-green-600 text-white rounded-lg px-2 py-1 text-xs"
            >
              Edit
            </Link>
          </div>

          {/* Basic Info and Stats - Stacked on mobile, side by side on desktop */}
          <div className="flex flex-col items-center md:items-start md:justify-between p-4 mt-4 md:mt-20 w-full">
            {/* Basic Info and Stats - Restructured for proper alignment */}
            <div className="flex flex-col md:flex-row md:justify-between p-4 mt-1 w-full">
              {/* User information */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {profile?.full_name || githubUser.name}
                </h1>
                <h2 className="text-base sm:text-lg py-1 font-semibold text-lime-300">
                  @{profile?.username || githubUser.user_name}
                </h2>
              </div>

              {/* Stats Overview - Right aligned on desktop */}
              <div className="flex justify-center md:justify-end space-x-4 sm:space-x-6 md:space-x-8 w-full md:w-auto mt-2 md:mt-0">
                <div className="flex flex-col items-center">
                  <span className="text-sm sm:text-base md:text-xl text-zinc-400">
                    Total
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {(
                      (profile?.scores || 0) + (profile?.leetcodescores || 0)
                    ).toFixed(0)}{" "}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm sm:text-base md:text-xl text-zinc-400">
                    GitHub
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {profile?.scores || 0.0}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm sm:text-base md:text-xl text-zinc-400">
                    LeetCode
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {profile?.leetcodescores
                      ? profile.leetcodescores.toFixed(2)
                      : "00.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <Suspense fallback={<InstantLoadingSpinner />}>
          <TabContent
            user={user}
            profile={profile}
            githubUser={githubUser}
            githubData={githubData}
            leetcodeStats={leetcodeStats}
          />
        </Suspense>

        {/* Sign Out Button */}
        <div className="mt-6 mb-8">
          <form action="/auth/signout" method="post">
            <button
              className="bg-red-600 border-red-700/70 shadow-[0_0_50px_theme(colors.red.700/10%)] text-white py-2 sm:py-3 px-8 sm:px-12 md:px-20 rounded hover:bg-red-700 transition duration-200 mx-auto block"
              type="submit"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
