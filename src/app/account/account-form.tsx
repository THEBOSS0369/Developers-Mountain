//Account Form File
"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fullName" className="block mb-1 text-gray-300">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-1 text-gray-300">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="website" className="block mb-1 text-gray-300">
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <button
          className={`w-full p-2 text-white bg-purple-600 rounded hover:bg-purple-700 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button
            className="w-full p-2 text-white bg-red-600 rounded hover:bg-red-700 transition duration-200"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
