import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export async function LeetProfileCard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(" leetcodeusername, leetcodescores")
    .eq("id", user?.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.log("Error fetching profile:", error);
  }

  let leetcodeStats = null;
  if (profile?.leetcodeusername) {
    leetcodeStats = await fetchLeetCodeStats(profile.leetcodeusername);
  }

  return (
    <Card className="bg-stone-700/30 backdrop-blur-xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)]">
      <CardHeader>
        <CardTitle>
          {user?.user_name && (
            <span className="text-lime-300">
              GitHub User Name: @{profile?.leetcodeusername}
            </span>
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
