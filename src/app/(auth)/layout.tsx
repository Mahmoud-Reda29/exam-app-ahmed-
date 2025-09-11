import React from "react";
import LeftPanel from "./_components/left-panel";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-2 ">
      <div className="relative ">
        <LeftPanel />
      </div>
      <div className="flex flex-1 items-center justify-center   ">
        <div className="w-input max-w-md  text-left">{children}</div>
      </div>
    </main>
  );
};

export default layout;
