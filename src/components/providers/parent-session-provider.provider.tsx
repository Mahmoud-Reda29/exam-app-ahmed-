"use client";

import { SessionProvider } from "next-auth/react";

const ParentSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default ParentSessionProvider;
