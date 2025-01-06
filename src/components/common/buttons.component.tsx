"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return <button onClick={() => signIn()}>Sign In</button>;
};

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Log Out</button>;
};

export const RegisterButton = () => {
  return <Link href="/register">Register</Link>;
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
