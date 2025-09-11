"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You can log the error to an error tracking service here
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="text-gray-600 mt-2">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
