import { createClient } from "@/utils/supabase/server";
import { getPublicImageURL } from "@/utils/supabase/public-url";
import RankingsPageClient from "./ranking-page-client";
import { Divide } from "lucide-react";

export default async function RankingsPage() {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, scores")
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
    <div>
      <RankingsPageClient initialPlayers={playersWithAvatars} />;
    </div>
  );
}
