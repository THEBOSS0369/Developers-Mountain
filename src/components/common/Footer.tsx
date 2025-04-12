import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-700 bg-opacity-30 text-gray-300 px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
          {/* Logo + glow */}
          <div className="flex items-center gap-6">
            <div className="w-30 h-30 relative group">
              <Image
                src="/logo/window.png"
                alt="Developers Mountain Logo"
                width={212}
                height={212}
                className="rounded-md object-contain shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 rounded-full blur-xl -z-10 transition-opacity duration-500"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold  text-white">
                Developers Mountain
              </h1>
              <p className="text-lg text-stone-400 font-medium">
                Level up with the community
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-base">
            {/* Column 1 */}
            <div>
              <h3 className="text-white mb-4 font-bold text-lg">Navigation</h3>
              <ul className="space-y-3 font-semibold">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/ranking" className="hover:text-white transition">
                    Rankings
                  </Link>
                </li>
                <li>
                  <Link href="/rules" className="hover:text-white transition">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-white mb-4 font-bold text-lg">Connect</h3>
              <ul className="space-y-3 font-semibold">
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-400 text-xl" />
                  <a
                    href="mailto:anujkumsharma9876@gmail.com"
                    className="hover:text-white transition"
                  >
                    Email Us
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaLinkedin className="text-gray-400 text-xl" />
                  <Link
                    href="https://www.linkedin.com/in/anuj-kumar-sharma-59330a287/"
                    className="hover:text-white transition"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-white mb-4 font-bold text-lg">Source Code</h3>
              <ul className="space-y-3 font-semibold">
                <li className="flex items-center gap-3">
                  <FaGithub className="text-gray-400 text-xl" />
                  <Link
                    href="https://github.com/THEBOSS0369/Developers-Mountain"
                    className="hover:text-white transition"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-500 mt-16 mb-8"></div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-base text-stone-400 gap-6 font-medium">
          <p>© Developers Mountain {new Date().getFullYear()}</p>
          <p>
            Developed by{" "}
            <Link
              href="https://www.linkedin.com/in/anuj-kumar-sharma-59330a287/"
              className="text-emerald-400 hover:text-emerald-500 font-semibold"
            >
              Anuj Kumar Sharma
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
