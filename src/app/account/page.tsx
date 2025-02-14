import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import Link from "next/link";
import Image from "next/image";
import { GitHubUser } from "@/types/github";
import { fetchGitHubData } from "@/lib/github";
import { fetchLeetCodeStats } from "@/lib/leetcode";
import { TabContent } from "./TabContent.tsx";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "full_name, username, website, avatar_url, scores, mainlanguage, secondlanguage, leetcodeusername, leetcodescores",
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
    <div className="text-white min-h-screen px-6 py-2">
      <div className="mx-auto">
        {/* Hero Background */}
        <div className="relative shadow-[0_0_50px_theme(colors.stone.500/40%)] rounded-lg h-[250px] w-[calc(100%)] mx-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/zebra.png')",
              backgroundPosition: "center",
            }}
          />
          {/* <div className="absolute shadow-[0_0_50px_theme(colors.stone.700/40%)] inset-0 rounded-lg bg-black/10 backdrop-blur-2xl to-transparent" /> */}
        </div>

        {/* Profile Section */}
        <div className="flex items-center ml-20 space-x-6 mb-6 -mt-20">
          <div className="relative bg-stone-800/10 backdrop-blur-xl border-2 border-stone-600/20 rounded-3xl">
            {avatarUrl && (
              <Image
                src={githubUser?.avatar_url}
                alt="Profile"
                width={360}
                height={360}
                className="rounded-3xl object-cover"
                priority
              />
            )}
            <Link
              href="/account/edit-info"
              className="absolute bottom-0 right-0 bg-green-600 text-white rounded-lg px-2 py-1 text-xs"
            >
              Edit Profile
            </Link>
          </div>

          {/* Basic Info and Stats */}
          <div className="flex justify-between items-start p-4 mt-20 w-full">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">
                {profile?.full_name || githubUser.name}
              </h1>
              <h2 className="text-lg py-1 font-semibold text-lime-300">
                @{profile?.username || githubUser.user_name}
              </h2>
            </div>

            {/* Stats Overview */}
            <div className="flex space-x-8 px-24">
              <div className="flex flex-col items-center">
                <span className="text-xl text-zinc-400">Total</span>
                <span className="text-3xl font-bold">
                  {(
                    (profile?.scores || 0) + (profile?.leetcodescores || 0)
                  ).toFixed(0)}{" "}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl text-zinc-400">GitHub</span>
                <span className="text-3xl font-bold">
                  {profile?.scores || 0.0}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl text-zinc-400">LeetCode</span>
                <span className="text-3xl font-bold">
                  {profile?.leetcodescores
                    ? profile.leetcodescores.toFixed(2)
                    : "00.00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <TabContent
          user={user}
          profile={profile}
          githubUser={githubUser}
          githubData={githubData}
          leetcodeStats={leetcodeStats}
        />

        {/* Sign Out Button */}
        <div className="mt-6">
          <form action="/auth/signout" method="post">
            <button
              className="bg-red-600 border-red-700/70 shadow-[0_0_50px_theme(colors.red.700/10%)] text-white py-3 px-20 rounded hover:bg-red-700 transition duration-200 mx-auto block"
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
