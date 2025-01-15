import { Search } from "lucide-react";
import { LoginButton, LogoutButton, ProfileButton } from "./buttons.component";
import NavigationMenuDemo from "./NavigationMenuDemo";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 right-0 w-full bg-[#ffffff5] backdrop-blur-sm border-b border-[#2D2D2D] z-40">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <NavigationMenuDemo />
        </div>
        {/* Search bar */}
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
        {/* Right actions */}
        <div className="flex items-center space-x-4">
          {session ? (
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

export default Header;
