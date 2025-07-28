// app/profile/[playerId]/page.tsx

import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;

  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", playerId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return <div>Error loading profile</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const avatarUrl = profile.avatar_url
    ? getPublicImageURL("avatars", profile.avatar_url)
    : null;

  return (
    <div className="bg-[#121211] text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-[#1A1A1A] rounded-lg p-8 shadow-md w-full max-w-lg">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Profile Picture"
            className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-[#2D2D2D]"
          />
        )}
        <h1 className="text-3xl font-bold text-center mb-2">
          {profile.full_name || profile.username}
        </h1>
        <p className="text-gray-400 text-center mb-4">@{profile.username}</p>

        <div className="flex justify-center gap-6 mb-4">
          <div className="text-center">
            <p className="text-2xl font-semibold">{profile.scores || 0}</p>
            <p className="text-gray-400 text-sm">Scores</p>
          </div>
          {/* Add more stats here if needed (e.g., wins, games played) */}
        </div>

        <div className="border-t border-[#2D2D2D] pt-4">
          <h2 className="text-xl font-semibold mb-2">Languages:</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {profile.mainlanguage && (
              <span className="px-3 py-1 rounded-full bg-[#2D2D2D] text-sm font-semibold">
                {profile.mainlanguage}
              </span>
            )}
            {profile.secondlanguage && (
              <span className="px-3 py-1 rounded-full bg-[#2D2D2D] text-sm font-semibold">
                {profile.secondlanguage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
