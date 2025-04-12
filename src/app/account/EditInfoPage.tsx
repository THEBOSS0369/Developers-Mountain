"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Avatar from "./avatar";

export default function EditInfoPage({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [mainLanguage, setMainLanguage] = useState<string | null>(null);
  const [secondLanguage, setSecondLanguage] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<string | null>(null);
  const [leetcodeUsername, setLeetcodeUsername] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data);
        setFullName(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setMainLanguage(data.mainlanguage);
        setSecondLanguage(data.secondlanguage);
        setAvatarUrl(data.avatar_url);
        setQuality(data.quality);
        setLeetcodeUsername(data.leetcodeusername);
      }
    } catch (error) {
      console.error("Error loading user data!", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const updateProfile = async (customData?: { avatar_url?: string | null }) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullName,
        username,
        website,
        mainlanguage: mainLanguage,
        secondlanguage: secondLanguage,
        avatar_url: customData?.avatar_url || avatar_url,
        quality,
        leetcodeusername: leetcodeUsername,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white min-h-screen px-4 sm:px-6 py-2">
      <div className="mx-auto">
        {/* Hero Background */}
        <div className="relative shadow-[0_0_50px_theme(colors.stone.500/40%)] rounded-lg h-[150px] sm:h-[200px] md:h-[250px] w-full mx-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/zebra.png')",
              backgroundPosition: "center",
            }}
          />
          {/* <div className="absolute shadow-[0_0_50px_theme(colors.stone.700/40%)] inset-4 rounded-lg bg-black/10 backdrop-blur-2xl to-transparent" /> */}
        </div>

        {/* Profile Section - Centered on mobile, left-positioned on larger screens */}
        <div className="flex justify-center md:justify-start md:ml-20 mb-6 -mt-16 sm:-mt-20">
          <div className="relative bg-stone-800/10 backdrop-blur-xl border-2 border-stone-600/20 rounded-2xl overflow-hidden">
            <Avatar
              uid={user?.id ?? null}
              url={avatar_url}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({
                  avatar_url: url,
                });
              }}
            />
          </div>
        </div>

        {/* Edit Form */}
        <Card className="bg-stone-700/30 backdrop-blur-3xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/40%)] p-4 sm:p-6 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Edit Personal Information</h2>
            <Link
              href="/account"
              className="bg-stone-600 border-stone-700/70 shadow-[0_0_50px_theme(colors.stone.700/10%)] text-white rounded-lg px-3 py-2 text-md hover:bg-stone-700 transition-colors"
            >
              Back to Profile
            </Link>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-stone-300 block mb-1">Email</span>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-300 block mb-1">Full Name</span>
                <input
                  type="text"
                  value={fullName || ""}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                />
              </div>

              <div>
                <span className="text-stone-300 block mb-1">Username</span>
                <input
                  type="text"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-300 block mb-1">
                  LeetCode Username
                </span>
                <input
                  type="text"
                  value={leetcodeUsername || ""}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                  className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                />
              </div>

              <div>
                <span className="text-stone-300 block mb-1">Quality</span>
                <input
                  type="text"
                  value={quality || ""}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                />
              </div>
            </div>

            <div>
              <span className="text-stone-300 block mb-1">Website</span>
              <input
                type="url"
                value={website || ""}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-300 block mb-1">Main Language</span>
                <input
                  type="text"
                  value={mainLanguage || ""}
                  onChange={(e) => setMainLanguage(e.target.value)}
                  className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                />
              </div>

              <div>
                <span className="text-stone-300 block mb-1">
                  Second Language
                </span>
                <input
                  type="text"
                  value={secondLanguage || ""}
                  onChange={(e) => setSecondLanguage(e.target.value)}
                  className="w-full p-2 bg-stone-800/50 border border-stone-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                />
              </div>
            </div>

            <button
              onClick={updateProfile}
              disabled={loading}
              className="w-full bg-green-600 border-green-700/70 shadow-[0_0_50px_theme(colors.green.700/10%)] text-white rounded-lg px-4 py-2 mt-4 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
