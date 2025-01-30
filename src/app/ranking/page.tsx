import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import RankingsPageClient from "./ranking-page-client";
import { Divide } from "lucide-react";
import { Search } from "lucide-react";

export default async function RankingsPage() {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select(
      "id, username, full_name, avatar_url, scores, mainlanguage, secondlanguage",
    )
    .order("scores", { ascending: false });

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
      <div className="relative rounded-lg h-[500px] w-[calc(100%-20px)] mx-auto overflow-hidden">
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
          {/* <p className="text-md md:text-lg font-medium text-stone-300 mb-2"> {/* Increased margin bottom from mb-8 to mb-16 */}
          {/*   Search Developers by their Name */}
          {/* </p> */}
          <div className="flex w-full max-w-2xl mx-auto">
            {" "}
            {/* Increased max-width from max-w-md to max-w-2xl */}
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter developer's name"
                className="w-full px-6 py-4 text-lg bg-stone-600/20 text-white placeholder-gray-400 rounded-lg focus:outline-none hover:bg-stone-600/30 focus:bg-stone-600/30 focus:backdrop-blur-xl backdrop-blur-xl"
              />{" "}
              {/* Increased padding (px-6 py-4) and text size (text-lg) */}
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2.5  text-stone-700 rounded-md font-semibold bg-neutral-100 transition-colors text-base transition-[background-color] duration-300 ease-in-out  hover:text-white hover:bg-neutral-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-700/80">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings Content */}
      <div className="mx-4 py-8">
        <RankingsPageClient initialPlayers={playersWithAvatars} />
      </div>
    </div>
  );
}
