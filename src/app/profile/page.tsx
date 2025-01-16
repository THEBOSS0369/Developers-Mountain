import { createClient } from "@/utils/supabase/server";
import {
  LoginButton,
  ProfileButton,
  LogoutButton,
} from "@/components/common/buttons.component";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <div>
        <h1>Welcome, {user?.email} </h1>
        {user ? (
          <>
            <ProfileButton />
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
          </>
        )}
      </div>
    </main>
  );
}
