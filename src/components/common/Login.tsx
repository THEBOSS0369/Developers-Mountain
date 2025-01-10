"use client";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";

type Props = {
  classname?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const Email = useRef("");
  const pass = useRef("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: Email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: props.callbackUrl ?? "/",
    });
  };

  return (
    <div className={props.classname}>
      <div>
        <div className="flex min-h-screen items-center justify-center">
          {!!props.error && (
            <p className="text-red-600 text-center p-2">
              Authentication Failed
            </p>
          )}
          <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md p-8">
            <h1 className="text-2xl font-bold mb-6">Login</h1>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                required
                className="text-black w-full p-2 border rounded"
                onChange={(e) => (Email.current = e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full text-black p-2 border rounded"
                onChange={(e) => (pass.current = e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
