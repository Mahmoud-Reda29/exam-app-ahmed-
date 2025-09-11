import { XCircle } from "lucide-react";

export function AuthError({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center w-full mb-9">
      <div className="relative w-full h-9 p-3">
        <div className="absolute left-1/2 top-3  -translate-x-1/2 -translate-y-1/2 bg-white ">
          <XCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="border w-full border-red-400 bg-red-50 text-red-600 py-2 px-4 text-center font-normal text-sm font-mono truncate">
          {/* Error message */}
          {error}
        </div>
      </div>
    </div>
  );
}
