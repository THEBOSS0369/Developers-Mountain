import Link from "next/link";
import { TypographyH2, TypographyH4 } from "../ui/Typography";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-[#171918] z-[100]">
      <nav className=" text-white w-full py-2 ">
        <div className="max-w-7xl pt-[10px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-align-center">
            <TypographyH2>🗻</TypographyH2>
          </Link>

          <div className="flex gap-8">
            <Link
              href="/ranking"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <TypographyH4>Ranking</TypographyH4>
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <TypographyH4>Dashboard</TypographyH4>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
