//login/page.tsx
import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className=" bg-stone-800/10 backdrop-blur-xl grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-6 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <img
                src="/logo/window.png"
                alt="Logo"
                className="rounded-md shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
            DEV MOUNTAIN
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/windo.jpg"
          alt="Image"
          className="absolute bg-[#121211] inset-0 h-full w-full object-cover "
          // dark:brightness-[0.2] dark:grayscale
        />
        {/* <div className="absolute shadow-[0_0_50px_theme(colors.stone.500/70%)] inset-4 rounded-lg bg-black/10 backdrop-blur-sm to-transparent"></div> */}
      </div>
    </div>
  );
}
