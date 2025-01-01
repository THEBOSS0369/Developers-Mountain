import Link from "next/link";
import { TypographyH1 } from "../ui/Typography";

export default function Header() {
  return (
    <header>
      <nav className=" text-white w-full py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <TypographyH1>Dev Mountain</TypographyH1>
          </Link>

          <div className="flex gap-8">
            <Link
              href="/ranking"
              className="hover:text-gray-300 transition-colors"
            >
              Ranking
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-gray-300 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
