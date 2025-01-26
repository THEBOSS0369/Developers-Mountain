import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { LoginButton, LogoutButton, ProfileButton } from "./buttons.component";
import NavigationMenuDemo from "./NavigationMenuDemo";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

const Headercomp = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Initial user fetch
    const getInitialUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getInitialUser();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="fixed top-0 right-0 w-full bg-[#ffffff5] backdrop-blur-sm border-b border-[#2D2D2D] z-40">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <NavigationMenuDemo />
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#8E8EA0]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-neutral-800 hover:border-stone-600 text-[#ECECEC] pl-10 pr-4 py-2 rounded-lg border border-stone-800 focus:outline-none focus:border-stone-700 focus:ring-1 focus:ring-stone-700"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <ProfileButton />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Headercomp;
