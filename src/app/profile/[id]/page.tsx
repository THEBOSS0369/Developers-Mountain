import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import { PublicTabContent } from "./PublicTabContent";
import { fetchGitHubData } from "@/lib/github";
import { fetchLeetCodeStats } from "@/lib/leetcode";

interface ProfileParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProfileParams) {
  return {
    title: `Profile ${params.id}`,
  };
}

export default async function ProfilePage({ params }: ProfileParams) {
  const supabase = await createClient();

  if (!params.id) {
    notFound();
  }

  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!profile && error) {
    const { data: githubProfile, error: githubError } = await supabase
      .from("profiles")
      .select("*")
      .eq("provider_id", params.id)
      .single();

    if (githubProfile) {
      profile = githubProfile;
      error = null;
    }
  }

  if (error || !profile) {
    console.error("Profile fetch error:", error);
    notFound();
  }

  // Fetch GitHub and LeetCode data
  let githubData;
  if (profile.github_username) {
    githubData = await fetchGitHubData(profile.github_username);
  }

  let leetcodeStats = null;
  if (profile.leetcodeusername) {
    leetcodeStats = await fetchLeetCodeStats(profile.leetcodeusername);
  }

  return (
    <div className="text-white min-h-screen px-2 sm:px-4 md:px-6 py-2">
      <div className="mx-auto">
        {/* Hero Background */}
        <div className="relative shadow-[0_0_50px_theme(colors.stone.500/40%)] rounded-lg h-[150px] sm:h-[200px] md:h-[250px] w-full mx-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/zebra.png')",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Profile Section - Responsive Layout */}
        <div className="flex flex-col md:flex-row md:items-center md:ml-20 md:space-x-6 mb-6 -mt-10 sm:-mt-16 md:-mt-20">
          {/* Profile Image - Smaller on mobile */}
          <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[250px] md:w-[360px] md:h-[300px] mx-auto md:mx-0 overflow-hidden bg-stone-800/10 backdrop-blur-xl border-2 border-stone-600/20 rounded-3xl">
            {profile.avatar_url ? (
              <Image
                src={getPublicImageURL("avatars", profile.avatar_url)}
                alt="Profile"
                width={360}
                height={360}
                className="rounded-3xl object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full bg-neutral-700 rounded-3xl" />
            )}
          </div>

          {/* Basic Info and Stats - Stack on mobile */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start p-4 mt-4 md:mt-20 w-full">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
                {profile.full_name || profile.username}
              </h1>
              <h2 className="text-lg py-1 font-semibold text-lime-300 text-center md:text-left">
                @{profile.username}
              </h2>
            </div>

            {/* Stats Overview - Row on mobile, maintain spacing on desktop */}
            <div className="flex space-x-4 md:space-x-8 px-2 md:px-24">
              <div className="flex flex-col items-center">
                <span className="text-base md:text-xl text-zinc-400">
                  Total
                </span>
                <span className="text-xl md:text-3xl font-bold">
                  {(
                    (profile.scores || 0) + (profile.leetcodescores || 0)
                  ).toFixed(0)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base md:text-xl text-zinc-400">
                  GitHub
                </span>
                <span className="text-xl md:text-3xl font-bold">
                  {profile.scores || "0"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base md:text-xl text-zinc-400">
                  LeetCode
                </span>
                <span className="text-xl md:text-3xl font-bold">
                  {profile.leetcodescores
                    ? profile.leetcodescores.toFixed(2)
                    : "00.00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <PublicTabContent
          profile={profile}
          githubData={githubData}
          leetcodeStats={leetcodeStats}
        />
      </div>
    </div>
  );
}
