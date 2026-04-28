"use client";

import { authClient } from "@/lib/auth-client";

export function CommentSection() {
  const { data: session } = authClient.useSession();

  return (
    <form className="flex flex-col p-2">
      <textarea
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 resize-none"
        placeholder={
          session?.user
            ? "Write your comment here..."
            : "Please sign in to comment on this post."
        }
        rows={4}
        required
        disabled
      />
      {!session?.user && (
        <p className="text-gray-500 dark:text-gray-400 ml-3">
          Please sign in to comment on this post.
        </p>
      )}
      <div className="flex mt-2 self-right justify-end mr-2">
        <button
          className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:cursor-not-allowed"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}