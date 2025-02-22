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
    <div className="text-white min-h-screen px-6 py-2">
      <div className="mx-auto">
        {/* Hero Background */}
        <div className="relative shadow-[0_0_50px_theme(colors.amber.200/20%)] rounded-lg h-[250px] w-[calc(100%)] mx-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/enterprise.jpg')",
              backgroundPosition: "center",
            }}
          />

          {/* <div className="absolute shadow-[0_0_50px_theme(colors.stone.700/40%)] inset-0 rounded-lg bg-black/10 backdrop-blur-2xl to-transparent" /> */}
        </div>

        {/* Profile Section */}
        <div className="flex items-center ml-20 space-x-6 mb-6 -mt-20">
          <div className="relative bg-stone-800/10 backdrop-blur-xl border-2 border-stone-600/20 rounded-3xl">
            {profile.avatar_url ? (
              <Image
                src={getPublicImageURL("avatars", profile.avatar_url)}
                alt="Profile"
                width={360}
                height={360}
                className="rounded-3xl object-cover"
                priority
              />
            ) : (
              <div className="w-[360px] h-[360px] bg-neutral-700 rounded-3xl" />
            )}
          </div>

          {/* Basic Info and Stats */}
          <div className="flex justify-between items-start p-4 mt-20 w-full">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">
                {profile.full_name || profile.username}
              </h1>
              <h2 className="text-lg py-1 font-semibold text-lime-300">
                @{profile.username}
              </h2>
            </div>

            {/* Stats Overview */}
            <div className="flex space-x-8 px-24">
              <div className="flex flex-col items-center">
                <span className="text-xl text-zinc-400">Total</span>
                <span className="text-3xl font-bold">
                  {(
                    (profile.scores || 0) + (profile.leetcodescores || 0)
                  ).toFixed(0)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl text-zinc-400">GitHub</span>
                <span className="text-3xl font-bold">
                  {profile.scores || "0"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl text-zinc-400">LeetCode</span>
                <span className="text-3xl font-bold">
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
