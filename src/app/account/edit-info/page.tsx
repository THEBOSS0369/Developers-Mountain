import { createClient } from "@/utils/supabase/server";
import EditInfoPage from "../EditInfoPage";
import { redirect } from "next/navigation";

export default async function EditUserInfo() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect if user is not authenticated
  if (!user) {
    redirect("/auth/signin");
  }

  return <EditInfoPage user={user} />;
}
