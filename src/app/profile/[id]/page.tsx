// app/profile/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublicImageURL } from "@/utils/supabase/public-url";

interface ProfileParams {
  params: {
    id: string;
  };
}

// Add generateMetadata to properly handle async params
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

  // First try to fetch by id
  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  // If no profile found by id, try to fetch by provider_id (for Auth users)
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

  return (
    <div className="min-h-screen bg-[#121211] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-neutral-800/30 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {profile.avatar_url ? (
                <Image
                  src={getPublicImageURL("avatars", profile.avatar_url)}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                  priority
                />
              ) : (
                <div className="w-24 h-24 bg-neutral-700 rounded-lg" />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {profile.full_name || profile.username}
              </h1>
              {profile.full_name && (
                <p className="text-lg text-neutral-400 mb-4">
                  @{profile.username}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-neutral-800/50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-400">GitHub Score</p>
                  <p className="text-2xl font-bold">{profile.scores || "0"}</p>
                </div>
                <div className="bg-neutral-800/50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-400">Rank</p>
                  <p className="text-2xl font-bold">#1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="bg-neutral-800/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Programming Languages</h2>
          <div className="flex gap-4">
            {profile.mainlanguage && (
              <div className="bg-neutral-800 px-4 py-2 rounded-lg">
                <p className="text-sm text-neutral-400">Main Language</p>
                <p className="text-lg font-medium">{profile.mainlanguage}</p>
              </div>
            )}
            {profile.secondlanguage && (
              <div className="bg-neutral-800 px-4 py-2 rounded-lg">
                <p className="text-sm text-neutral-400">Secondary Language</p>
                <p className="text-lg font-medium">{profile.secondlanguage}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="bg-neutral-800/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-800/50 p-4 rounded-lg">
              <p className="text-sm text-neutral-400">Total Problems Solved</p>
              <p className="text-2xl font-bold">
                {profile.problems_solved || "0"}
              </p>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-lg">
              <p className="text-sm text-neutral-400">Contributions</p>
              <p className="text-2xl font-bold">
                {profile.contributions || "0"}
              </p>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-lg">
              <p className="text-sm text-neutral-400">Streak</p>
              <p className="text-2xl font-bold">{profile.streak || "0"} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
