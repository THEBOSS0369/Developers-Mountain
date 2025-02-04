import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch all users with leetcode usernames
    const { data: profiles, error: fetchError } = await supabase
      .from("profiles")
      .select("id, leetcodeusername")
      .not("leetcodeusername", "is", null);

    if (fetchError) throw fetchError;

    // Update scores for each user
    for (const profile of profiles) {
      if (!profile.leetcodeusername) continue;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/leetcode?` +
            `username=${profile.leetcodeusername}&userId=${profile.id}`,
        );

        if (!response.ok) {
          console.error(`Failed to update score for user ${profile.id}`);
        } else {
          const data = await response.json(); // Parse the response
          console.log(`Updated score for user ${profile.id}:`, data); // Log success
        }
      } catch (error) {
        console.error(`Error processing user ${profile.id}:`, error);
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
