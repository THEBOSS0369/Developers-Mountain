import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import RankingsPageClient from "./ranking-page-client";
import { Divide } from "lucide-react";
import { Search } from "lucide-react";
import SearchBarWithResults from "@/components/common/SearchBar";
import SearchSection from "@/hooks/SearchSelection";

export default async function RankingsPage() {
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative shadow-[0_0_50px_theme(colors.stone.500/10%)] rounded-lg h-[500px] w-[calc(100%-20px)] mx-auto overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/light.jpg')", // Replace with your image path
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute bg-black/30 backdrop-blur-[1px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-7xl font-bold text-stone-200 mb-6">
            Developers Rankings
          </h1>
          <p className="text-xl md:text-4xl text-stone-400 max-w-2xl mb-12">
            {" "}
            {/* Increased margin bottom from mb-8 to mb-16 */}
            Track your progress and compete with others in our global
            leaderboard!
          </p>

          {/* Search Bar */}
          <SearchSection
            profiles={playersWithAvatars}
            currentUserId={user?.id || ""}
          />
        </div>
      </div>

      {/* Rankings Content */}
      <div className="mx-4 py-8">
        <RankingsPageClient
          currentUserId={user?.id || ""}
          initialPlayers={playersWithAvatars}
        />
      </div>
    </div>
  );
}
