import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import Link from "next/link";
import Image from "next/image";
import { GitHubUser } from "@/types/github";
import { fetchGitHubData } from "@/lib/github";
import { ProfileCard } from "@/components/github/ProfileCard";
import { RepositoryList } from "@/components/github/RepositoryList";
import { PullRequestList } from "@/components/github/PullRequestList";
import { fetchLeetCodeStats } from "@/lib/leetcode";
import LeetCodeCard from "@/components/leetcode/LeetCodeCard";
export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "full_name, username, website, avatar_url, scores, mainlanguage, secondlanguage, leetcodeusername",
    )
    .eq("id", user?.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.log("Error fetching profile:", error);
  }

  // Get the public URL for the avatar
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
    <div className=" text-white min-h-screen px-6 py-2">
      <div className="mx-auto">
        <div className="relative rounded-lg h-[300px] w-[calc(100%)] mx-auto overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/light.jpg')", // Replace with your image path
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-white bg-black/20 to-transparent" />
        </div>

        {/* Top Profile Section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-[#2a2a2a] object-cover"
                priority
              />
            )}
            <Link
              href="/account/edit-info"
              className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full px-2 py-1 text-xs"
            >
              Edit Profile
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {profile?.full_name || githubUser.name}
            </h1>
            <p className="text-gray-400">
              @{profile?.username || githubUser.user_name}
            </p>
            <div className="flex space-x-4 mt-2">
              <div>
                <span className="text-gray-400">Languages</span>
                <p>
                  {profile?.mainlanguage}, {profile?.secondlanguage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* LeetCode Progress */}
          {profile?.leetcodeusername && leetcodeStats && (
            <div className="bg-[#2a2a2a] rounded-lg p-4">
              <h3 className="text-gray-400 mb-2">LeetCode Progress</h3>
              <div
                className="radial-progress text-center"
                style={{
                  "--value": `${leetcodeStats.totalSolved}`,
                  "--size": "4rem",
                  "--thickness": "0.5rem",
                }}
              >
                <span className="text-xl font-bold">
                  {leetcodeStats.totalSolved}/3445
                </span>
                <p className="text-xs text-gray-400">Solved</p>
              </div>
              <div className="grid grid-cols-3 text-center mt-2">
                <div>
                  <span className="text-green-500">Easy</span>
                  <p>{leetcodeStats.easySolved}/856</p>
                </div>
                <div>
                  <span className="text-yellow-500">Medium</span>
                  <p>{leetcodeStats.mediumSolved}/1793</p>
                </div>
                <div>
                  <span className="text-red-500">Hard</span>
                  <p>{leetcodeStats.hardSolved}/796</p>
                </div>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="bg-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-gray-400 mb-2">Badges</h3>
            <div className="text-center">
              <p className="text-4xl font-bold">0</p>
              <p className="text-gray-400">Locked Badge</p>
              <p className="text-xs">Feb LeetCoding Challenge</p>
            </div>
          </div>

          {/* Additional User Info */}
          <div className="bg-[#2a2a2a] rounded-lg p-4 space-y-2">
            <div>
              <span className="text-gray-400">Email</span>
              <p>{user?.email}</p>
            </div>
            {profile?.website && (
              <div>
                <span className="text-gray-400">Website</span>
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
          </div>
        </div>

        {/* Submission Activity */}
        <div className="bg-[#2a2a2a] rounded-lg p-4 mb-6">
          <h3 className="text-gray-400 mb-2">Submission Activity</h3>
          <div className="h-20 bg-[#1a1a1a] rounded grid grid-cols-12 gap-1 p-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-[#2a2a2a] rounded"></div>
            ))}
          </div>
        </div>

        {/* GitHub and LeetCode Additional Components */}
        <ProfileCard user={githubUser} />
        {githubData && (
          <>
            <RepositoryList repositories={githubData.repos} />
            <PullRequestList pullRequests={githubData.prs} />
          </>
        )}

        {/* Signout Button */}
        <div className="mt-6">
          <form action="/auth/signout" method="post">
            <button
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition duration-200"
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
