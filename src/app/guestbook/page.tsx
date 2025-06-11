import postgres from "postgres";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";

export default async function Page() {
  async function create(formData: FormData) {
    "use server";
    const sql = postgres(process.env.DATABASE_URL || "", { ssl: "require" });
    const comment = formData.get("comment");
    await sql`INSERT INTO comments (comment) VALUES (${String(comment)})`;
  }
  return (
    <div className="justify-center align-center text-center m-1 absolute inset-0 flex flex-col">
      <ViewTransition name="title">
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Guestbook
        </h1>
        <Link
          href="/"
          className="text-blue-gray-500 hover:underline text-center"
        >
          ← Back
        </Link>
      </ViewTransition>
      <form
        action={create}
        className="justify-center align-center text-center flex flex-row m-1"
      >
        <input
          type="text"
          placeholder="leave a comment"
          name="comment"
          className="justify-center align-center"
        />
        <button
          type="submit"
          className="rounded m-2 p-1 bg-gray-300/50 hover:bg-gray-400/50 transition-all duration-200 hover:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
