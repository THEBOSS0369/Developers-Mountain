"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <button
      className="border border-emerald-600 bg-emerald-800 hover:bg-emerald-700 hover:border-emerald-400 text-[#ECECEC] px-3 py-2 rounded-lg text-sm"
      onClick={() => signIn()}
    >
      Log In
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <Link href="/ranking" passHref>
      <button onClick={() => signOut()}>Log Out</button>{" "}
    </Link>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register">
      <button className="bg-[#E54D2E] text-white px-4 py-1.5 rounded-lg hover:bg-[#EC6142]">
        Sign Up
      </button>
    </Link>
  );
};

export const ProfileButton = () => {
  return (
    <Link href="/account">
      <button className="group inline-flex h-13 w-max items-center justify-center rounded-sm px-4 py-2 text-lg font-[550] text-stone-700 transition-[background-color] duration-300 ease-in-out bg-white hover:bg-neutral-700/80 hover:text-white  focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-700/80">
        My Profile
      </button>
    </Link>
  );
};
