import TodoForm from "./TodoForm";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="justify-center align-center text-center m-1 absolute inset-0 flex flex-col">
      <ViewTransition name="title">
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          v5 管理
        </h1>
        <Link
          href="/"
          className="text-blue-gray-500 hover:underline text-center"
        >
          ← Back
        </Link>
      </ViewTransition>
      <TodoForm />
    </div>
  );
}
