import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Layout from "@/components/common/Layout";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";
import SideNavbar from "@/components/common/SideNavbar";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Developers Mountain - Developer Ranking Platform",
  description:
    "Discover and rank developers based on their GitHub skills and Data Structure & Algorithm (DSA) proficiency. A platform that helps companies identify top talent and developers understand their standing in the tech community.",
  keywords: [
    "developers",
    "ranking",
    "github",
    "algorithms",
    "programming",
    "coding",
    "talent",
    "skills",
  ],
  authors: [{ name: "THEBOSS0369" }],
  creator: "THEBOSS0369",
  publisher: "Developers Mountain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo/window.png",
    shortcut: "/logo/window.png",
    apple: "/logo/window.png",
  },
  openGraph: {
    title: "Developers Mountain - Developer Ranking Platform",
    description:
      "Discover and rank developers based on their GitHub skills and Data Structure & Algorithm (DSA) proficiency.",
    url: "https://developers-mountain.vercel.app",
    siteName: "Developers Mountain",
    images: [
      {
        url: "/logo/window.png",
        width: 1200,
        height: 630,
        alt: "Developers Mountain Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developers Mountain - Developer Ranking Platform",
    description:
      "Discover and rank developers based on their GitHub skills and DSA proficiency.",
    images: ["/logo/window.png"],
    creator: "@THEBOSS0369",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={oswald.className}>
      <body className="bg-gradient-to-r from-[#000000] to-[#232323] dark">
        <NextAuthProvider>
          <LoadingProvider>
            <div className="flex h-screen">
              <main className="flex-1">
                <Layout>{children}</Layout>
              </main>
            </div>
          </LoadingProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
