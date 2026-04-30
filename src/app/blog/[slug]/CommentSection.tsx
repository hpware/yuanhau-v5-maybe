"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ReplyIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

function CommentItem({
  comment,
  slug,
  onDelete,
  onReply,
  depth = 0,
}: {
  comment: any;
  slug: string;
  onDelete: (id: string) => void;
  onReply: (parentId: string) => void;
  depth: number;
}) {
  const { user } = useUser();
  const isAuthor = user?.id === comment.clerk_user;
  const createdDate = new Date(comment.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className={`${depth > 0 ? "ml-6 border-l-2 border-gray-300 dark:border-gray-700 pl-4" : ""}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
          {comment.clerk_user}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {createdDate}
        </span>
      </div>
      <p className="text-sm text-gray-800 dark:text-gray-200 mb-2 whitespace-pre-wrap">
        {comment.comment}
      </p>
      <div className="flex gap-2 mb-2">
        {user && (
          <button
            onClick={() => onReply(comment._id)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
          >
            <ReplyIcon className="w-3 h-3" />
            Reply
          </button>
        )}
        {isAuthor && (
          <button
            onClick={() => onDelete(comment._id)}
            className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <Trash2Icon className="w-3 h-3" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function CommentSection({ slug }: { slug: string }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const comments = useQuery(api.comments.listByArticle, { article_id: slug });
  const createComment = useMutation(api.comments.create);
  const deleteComment = useMutation(api.comments.remove);

  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const topLevelComments = comments?.filter((c: any) => c.parent_id === null) ?? [];
  const getReplies = (parentId: string) =>
    comments?.filter((c: any) => c.parent_id === parentId) ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    setSubmitting(true);
    try {
      await createComment({
        article_id: slug,
        clerk_user: user.id,
        comment: commentText.trim(),
        parent_id: replyingTo ?? undefined,
      });
      setCommentText("");
      setReplyingTo(null);
      toast.success("Comment posted!");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteComment({ id });
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  }

  return (
    <div>
      <h3 className="text-lg font-bold ml-3">Comments:</h3>

      {!isLoaded ? (
        <div className="p-4 text-gray-500">Loading...</div>
      ) : !isSignedIn ? (
        <div className="p-2">
          <div className="flex flex-col gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Please sign in to comment on this post.
            </p>
            <SignInButton mode="redirect">
              <button className="self-start px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col p-2">
          {replyingTo && (
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Replying to comment</span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Cancel
              </button>
            </div>
          )}
          <textarea
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment here..."
            rows={4}
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex mt-2 justify-end mr-2">
            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:dark:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
            >
              {submitting ? "Posting..." : "Submit"}
            </button>
          </div>
        </form>
      )}

      <hr className="bg-gray-300 dark:bg-gray-700 m-3" />

      <div className="px-2">
        {comments === undefined ? (
          <p className="text-gray-500 dark:text-gray-400 ml-3 text-sm">
            Loading comments...
          </p>
        ) : topLevelComments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 ml-3 text-sm">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {topLevelComments.map((comment: any) => (
              <div key={comment._id}>
                <CommentItem
                  comment={comment}
                  slug={slug}
                  onDelete={handleDelete}
                  onReply={setReplyingTo}
                  depth={0}
                />
                {getReplies(comment._id).map((reply: any) => (
                  <CommentItem
                    key={reply._id}
                    comment={reply}
                    slug={slug}
                    onDelete={handleDelete}
                    onReply={setReplyingTo}
                    depth={1}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}