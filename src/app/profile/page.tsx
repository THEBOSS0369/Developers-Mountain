"use client";

import { User } from "@/components/common/User";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <main>
      <div>
        <h1>Welcome, {session?.user?.name ?? "Guest"}</h1>
      </div>
      <User />
    </main>
  );
}
