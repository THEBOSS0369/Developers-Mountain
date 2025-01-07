"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button
      className="border border-[#2D2D2D] text-[#ECECEC] px-4 py-1.5 rounded-lg hover:bg-[#202123]"
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
  return <Link href="/profile">Profile</Link>;
};
