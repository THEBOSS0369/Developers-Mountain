// app/api/profile/[playerId]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // Adjust path if necessary

export const GET = async (
  request: Request,
  { params }: { params: { playerId: string } },
) => {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.playerId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
};
