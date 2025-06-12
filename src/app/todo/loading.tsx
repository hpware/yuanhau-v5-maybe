import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
export default function Loading() {
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
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="w-full md:w-1/2 lg:w-1/3">
            <div className="animate-pulse p-4 m-2 rounded-lg shadow-md bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm hover:-translate-y-1 border border-gray-400/60 hover:border-gray-400/40 transition-all duration-200">
              <div className="h-6 bg-gray-300/50 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-300/50 rounded w-24"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
