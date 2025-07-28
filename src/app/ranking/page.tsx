import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import RankingsPageClient from "./ranking-page-client";
import { Divide } from "lucide-react";
import { Search } from "lucide-react";
import SearchBarWithResults from "@/components/common/SearchBar";
import SearchSection from "@/hooks/SearchSelection";
import { Suspense } from "react";
import { InstantLoadingSpinner } from "@/components/common/InstantLoadingSpinner";

export default async function RankingsPage() {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select(
      "id, username, full_name, avatar_url, scores, mainlanguage, secondlanguage, leetcodeusername, leetcodescores"
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
      <div className="relative shadow-[0_0_50px_theme(colors.stone.500/10%)] rounded-lg h-[400px] sm:h-[450px] md:h-[500px] w-[calc(100%-16px)] sm:w-[calc(100%-20px)] mx-auto overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/light.jpg')", // Replace with your image path
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-3 sm:px-4">
          <h1 className="text-4xl sm:text-4xl md:text-6xl font-extrabold text-stone-300 mb-1 sm:mb-4 md:mb-2">
            DEVELOPERS RANKINGS
          </h1>
          <p className="text-base sm:text-lg md:text-3xl text-stone-400 max-w-2xl mb-6 sm:mb-8 md:mb-12">
            {" "}
            Track your progress and compete with others in our global
            leaderboard!
          </p>
          {/* Search Bar */}
          <div className="w-[90%] sm:w-full sm:max-w-2xl">
            <SearchSection
              profiles={playersWithAvatars}
              currentUserId={user?.id || ""}
            />
          </div>
        </div>
      </div>

      {/* Rankings Content */}
      <div className="mx-4 py-8">
        <Suspense fallback={<InstantLoadingSpinner />}>
          <RankingsPageClient
            currentUserId={user?.id || ""}
            initialPlayers={playersWithAvatars}
          />
        </Suspense>
      </div>
    </div>
  );
}
