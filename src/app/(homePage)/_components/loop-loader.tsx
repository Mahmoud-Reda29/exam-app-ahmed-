"use client";

import { Loader2 } from "lucide-react";

export function LoopLoader() {
  return (
    <div className="flex items-center justify-center h-[60vh] w-full">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
    </div>
  );
}
