import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import Image from "next/image";

export default async function LeetRanking() {
  const supabase = await createClient();

  // Fetch all Profiles
  // will be fetching it from SQL's QUery ;)
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select(`id, full_name, username, avatar_url, website`)
    .order("username");

  if (error) {
    console.log("Error Fetching Profiles: ", error);
    return (
      <div className="text-center py-8 text-red-400">
        Error loading Profiles
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Rankings</h1>
      <div className="grid gap-4">
        {profiles?.map((profile) => {
          const avatarUrl = getPublicImageURL("avatars", profile.avatar_url);

          return (
            <div
              key={profile.id}
              className="bg-gray-900 p-4 rounded-lg flex items-center gap-4 hover:bg-gray-800 transition-colors"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={profile.username || "user avatar"}
                    width={32}
                    height={32}
                    className=""
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-2xl text-gray-400">
                      {(profile.username || "U")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* User Information */}
              <div className="flex-grow">
                {profile?.username && (
                  <h2 className="text-lg font-semibold">{profile.username}</h2>
                )}
                {profile?.full_name && (
                  <p className="text-gray-300">{profile?.full_name}</p>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    {profile.website}
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {(!profiles || profiles.length === 0) && (
          <div className="text-center py-8 text-gray-400">No users found</div>
        )}
      </div>
    </div>
  );
}
