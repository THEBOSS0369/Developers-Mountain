"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { signup } from "../app/login/action";

interface RegisterFormProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string;
}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const email = useRef("");
  const password = useRef("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError("Must be a valid email");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email.current);
    const isPasswordValid = validatePassword(password.current);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Call the signup server action
    const formData = new FormData();
    formData.append("email", email.current);
    formData.append("password", password.current);

    await signup(formData);
  };

  return (
    <form className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-white">
          Create your account
        </h1>
        <p className="text-sm text-[#7E7E86]">
          Fill in your details to create a new account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-white">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className={cn(
                "bg-[#1A1A1A] border border-[#333333] text-white h-12 pl-4 pr-10",
                "placeholder:text-[#4B4B4B] focus:border-[#666666] focus:ring-0",
                emailError && "border-red-500 focus:border-red-500"
              )}
              onChange={(e) => {
                email.current = e.target.value;
                validateEmail(e.target.value);
              }}
            />
            {emailError && (
              <div className="absolute right-3 top-3 text-red-500">
                <AlertCircle size={24} />
              </div>
            )}
          </div>
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-white">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className={cn(
                "bg-[#1A1A1A] border border-[#333333] text-white h-12 pl-4 pr-10",
                "focus:border-[#666666] focus:ring-0",
                passwordError && "border-red-500 focus:border-red-500"
              )}
              onChange={(e) => {
                password.current = e.target.value;
                validatePassword(e.target.value);
              }}
            />
            {passwordError && (
              <div className="absolute right-3 top-3 text-red-500">
                <AlertCircle size={24} />
              </div>
            )}
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        <Button
          formAction={signup}
          className="w-full bg-neutral-700 border-[#333333] focus:border-[#666666] hover:bg-neutral-600 text-white h-12"
        >
          Create Account
        </Button>
      </div>

      <p className="text-center text-sm text-[#7E7E86]">
        Already have an account?{" "}
        <a href="/Login" className="text-white hover:text-emerald-500">
          Sign In
        </a>
      </p>
    </form>
  );
}
