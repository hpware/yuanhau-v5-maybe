import TodoForm from "./TodoForm";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Page() {
  return (
    <div className="justify-center align-center text-center m-1 absolute inset-0 flex flex-col">
      <ViewTransition name="title">
        <h1 className="text-4xl text-bold text-center">v5 管理</h1>
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
