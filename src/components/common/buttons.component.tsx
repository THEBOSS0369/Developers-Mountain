"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <button
      className="border border-neutral-600 bg-neutral-700 hover:bg-neutral-600 hover:border-neutral-700 text-[#ECECEC] px-3 py-1.5 md:px-5 md:py-2 rounded-lg text-sm md:text-lg"
      onClick={() => signIn()}
    >
      Log In
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <Link href="/ranking" passHref>
      <button onClick={() => signOut()} className="text-sm md:text-base">
        Log Out
      </button>
    </Link>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register">
      <button className="bg-[#E54D2E] text-white px-3 py-1 md:px-4 md:py-1.5 rounded-lg hover:bg-[#EC6142] text-sm md:text-base">
        Sign Up
      </button>
    </Link>
  );
};

export const ProfileButton = () => {
  return (
    <Link href="/account">
      <button className="group inline-flex items-center justify-center rounded-sm px-2 py-1 md:px-4 md:py-2 text-sm md:text-lg font-[550] text-stone-700 transition-[background-color] duration-300 ease-in-out bg-white hover:bg-neutral-700/80 hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-700/80">
        My Profile
      </button>
    </Link>
  );
};
