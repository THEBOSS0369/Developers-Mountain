import React from "react";
import LoginPage from "../login/page";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const Loginpage = (props: Props) => {
  return (
    <div>
      <LoginPage error={props.searchParams?.error} />
    </div>
  );
};

export default LoginPage;
