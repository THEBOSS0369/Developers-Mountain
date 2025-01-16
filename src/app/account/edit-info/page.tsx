import React from "react";
import { createClient } from "@/utils/supabase/server";
import AccountForm from "../account-form";
import Link from "next/link";

export default async function editUserInfo() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Link href="/account">Go Back</Link>
      <h1>Editing User Info</h1>
      <AccountForm user={user} />
    </div>
  );
}
