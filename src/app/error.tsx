"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded">
      <h2>⚠️ Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
