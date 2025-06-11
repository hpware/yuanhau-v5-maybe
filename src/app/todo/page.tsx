"use server";
import postgres from "postgres";

interface TodoItem {
  title: string;
  content: string;
}

function TodoListDisplayComponent({ title, content }: TodoItem) {
  return (
    <li className="w-full md:w-1/2 lg:w-1/3">
      <div className="p-4 m-2 rounded-lg shadow-md bg-white/10 backdrop-blur-sm hover:-translate-y-1 border border-gray-400/60  hover:border-gray-400/40 transition-all duration-200">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <span className="text-gray-200">{content}</span>
      </div>
    </li>
  );
}

export default async function Home() {
  const sql = postgres(process.env.DATABASE_URL || "", { ssl: "require" });
  const sqlData = await sql`SELECT * FROM todos`;
  return (
    <div className="justify-center align-center m-1 absolute inset-0 flex flex-col">
      <h1 className="text-3xl text-bold text-center">
        Server Management Todo List
      </h1>
      <ul className="flex flex-row flex-wrap gap-1 justify-center align-center w-full">
        {sqlData.map((i) => (
          <TodoListDisplayComponent key={i.title} {...i} />
        ))}
      </ul>
    </div>
  );
}
