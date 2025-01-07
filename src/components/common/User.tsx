"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect unauthenticated users to the sign-in page
      window.location.href = "/api/auth/signin";
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
};
