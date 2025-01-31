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

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "full_name, username, website, avatar_url, github_username, scores, mainlanguage, secondlanguage",
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

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <Button>
          <Link href="/account/edit-info">Edit Info</Link>
        </Button>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg space-y-4">
        {/* Profile Image */}
        {avatarUrl && (
          <div className="flex justify-center">
            <Image
              src={avatarUrl}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full object-cover"
              priority
            />
          </div>
        )}

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <p className="text-white">{user?.email}</p>
          </div>
          {profile?.scores && (
            <div>
              <label htmlFor="">Scores</label>
              <p>{profile?.scores}</p>
            </div>
          )}

          {profile?.full_name && (
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <p className="text-white">{profile?.full_name}</p>
            </div>
          )}

          {profile?.username && (
            <div>
              <label className="block text-sm text-gray-400">Username</label>
              <p className="text-white">{profile.username}</p>
            </div>
          )}

          {profile?.github_username && (
            <div>
              <p>{profile?.github_username}</p>
            </div>
          )}

          {profile?.mainlanguage && (
            <div>
              <label className="block text-sm text-gray-400">
                mainlanguage
              </label>
              <p>{profile?.mainlanguage}</p>
            </div>
          )}

          {profile?.secondlanguage && (
            <div>
              <label className="block text-sm text-gray-400">
                Second language
              </label>
              <p>{profile?.secondlanguage}</p>
            </div>
          )}

          {profile?.website && (
            <div>
              <label className="block text-sm text-gray-400">Website</label>
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
        {/* Github data verifictaion */}
        <ProfileCard user={githubUser} />
        {githubData && (
          <>
            <RepositoryList repositories={githubData.repos} />
            <PullRequestList pullRequests={githubData.prs} />
          </>
        )}
        <div>
          <form action="/auth/signout" method="post">
            <button
              className="w-full p-2 text-white bg-red-600 rounded hover:bg-red-700 transition duration-200"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
