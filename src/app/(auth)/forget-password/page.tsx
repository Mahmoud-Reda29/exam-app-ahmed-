import React from "react";
import StepsGroup from "./_components/steps-group";
import type { Metadata } from "next";

// Page metadata
export const metadata: Metadata = {
  title: "Forget Password",
  description:
    "Reset your account password easily by following the guided steps.",
};

const ForgetPassword = () => {
  return (
    <main>
      {/* Steps group for resetting password */}

      <StepsGroup />
    </main>
  );
};

export default ForgetPassword;
