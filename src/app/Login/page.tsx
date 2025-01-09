import Login from "@/components/common/Login";
import React from "react";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const LoginPage = (props: Props) => {
  return (
    <div>
      <Login error={props.searchParams?.error} />
    </div>
  );
};

export default LoginPage;
