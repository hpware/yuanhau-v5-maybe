"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-500 mb-2">{error.message}</p>
      {error.digest && (
        <p className="text-sm text-gray-400 mb-6">Digest: {error.digest}</p>
      )}
      <button
        onClick={reset}
        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Try again
      </button>
    </div>
  );
}