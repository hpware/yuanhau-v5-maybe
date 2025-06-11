import postgres from "postgres";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 300;

interface TodoItem {
  uuid: string;
  title: string;
  content: string;
}

function TodoListDisplayComponent({ uuid, title, content }: TodoItem) {
  return (
    <li className="w-full md:w-1/2 lg:w-1/3">
      <div className="p-4 m-2 rounded-lg shadow-md bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm hover:-translate-y-1 border border-gray-400/60 hover:border-gray-400/40 transition-all duration-200">
        <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
          {title}
        </h3>
        <span className="text-gray-700 dark:text-gray-300">{content}</span>
      </div>
    </li>
  );
}
export default async function Home() {
  const sql = postgres(process.env.DATABASE_URL || "", { ssl: "require" });
  const sqlData = await sql<TodoItem[]>`SELECT * FROM todos`;
  return (
    <div className="justify-center align-center m-1 absolute inset-0 flex flex-col">
      <ViewTransition name="title">
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Server Management Todo List
        </h1>
        <Link
          href="/"
          className="text-blue-500 dark:text-blue-400 hover:underline text-center mb-6 transition-colors duration-200"
        >
          ← Back
        </Link>
      </ViewTransition>
      <ul className="flex flex-row flex-wrap gap-1 justify-center align-center w-full">
        {sqlData.map((item: TodoItem) => (
          <TodoListDisplayComponent
            key={item.uuid}
            uuid={item.uuid}
            title={item.title}
            content={item.content}
          />
        ))}
      </ul>
    </div>
  );
}
