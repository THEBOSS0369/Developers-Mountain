import { login } from "../app/login/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signInWithGithub } from "../app/login/action";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-6 w-full max-w-md", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold text-white">Welcome!!!</h1>
        <p className="text-sm text-[#7E7E86]">Sign in to your account</p>
      </div>

      <div className="flex flex-col gap-6">
        <Button
          type="button"
          variant="outline"
          onClick={signInWithGithub}
          className="w-full bg-stone-700 border border-stone-700/50 shadow-[0_0_20px_theme(colors.stone.700/10%)] bg-opacity-30 border border-[#333333] text-white hover:bg-[#242424] h-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mr-2 h-5 w-5"
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Continue with GitHub
        </Button>

        <p className="text-sm text-[#7E7E86] text-center px-4">
          Currently, we only support GitHub sign-in while we develop secure
          authentication methods to verify user identity.
        </p>

        {/* <div className="relative"> */}
        {/*   <div className="absolute inset-0 flex items-center"> */}
        {/*     <div className="w-full border-t border-[#333333]"></div> */}
        {/*   </div> */}
        {/*   <div className="relative flex justify-center text-sm"> */}
        {/*     <span className="bg-[#1C1C1C] px-2 text-[#7E7E86]">or</span> */}
        {/*   </div> */}
        {/* </div> */}

        {/* <div className="space-y-4"> */}
        {/*   <div className="space-y-2"> */}
        {/*     <Label htmlFor="email" className="text-sm text-white"> */}
        {/*       Email */}
        {/*     </Label> */}
        {/*     <div className="relative"> */}
        {/*       <Input */}
        {/*         id="email" */}
        {/*         name="email" */}
        {/*         type="email" */}
        {/*         required */}
        {/*         placeholder="you@example.com" */}
        {/*         className="bg-[#1A1A1A] border border-[#333333] text-white h-12 pl-4 pr-10 placeholder:text-[#4B4B4B] focus:border-[#666666] focus:ring-0" */}
        {/*       /> */}
        {/*     </div> */}
        {/*   </div> */}
        {/**/}
        {/*   <div className="space-y-2"> */}
        {/*     <div className="flex items-center justify-between"> */}
        {/*       <Label htmlFor="password" className="text-sm text-white"> */}
        {/*         Password */}
        {/*       </Label> */}
        {/*       <a href="#" className="text-sm text-[#7E7E86] hover:text-white"> */}
        {/*         Forgot Password? */}
        {/*       </a> */}
        {/*     </div> */}
        {/*     <div className="relative"> */}
        {/*       <Input */}
        {/*         id="password" */}
        {/*         name="password" */}
        {/*         type="password" */}
        {/*         required */}
        {/*         placeholder="••••••••" */}
        {/*         className="bg-[#1A1A1A] border border-[#333333] text-white h-12 pl-4 pr-10 focus:border-[#666666] focus:ring-0" */}
        {/*       /> */}
        {/*     </div> */}
        {/*   </div> */}
        {/**/}
        {/*   <div className="flex gap-2"> */}
        {/*     <Button */}
        {/*       formAction={login} */}
        {/*       className="flex-1 text-md bg-neutral-700 border-[#333333] focus:border-[#666666] hover:bg-neutral-600 text-white h-12" */}
        {/*     > */}
        {/*       Sign In */}
        {/*     </Button> */}
        {/*   </div> */}
        {/* </div> */}
      </div>

      {/* <p className="text-center text-sm text-[#7E7E86]"> */}
      {/*   Don&apos;t have an account?{" "} */}
      {/*   <a href="/register" className="text-white hover:text-emerald-500"> */}
      {/*     Sign Up Now */}
      {/*   </a> */}
      {/* </p> */}
    </form>
  );
}
