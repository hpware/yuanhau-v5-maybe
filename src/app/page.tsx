import Link from "next/link";
import Layout from "@/layout/default";
import { unstable_ViewTransition as ViewTransition } from "react";
export default async function Home() {
  return (
    <Layout>
      <div className="justify-center align-center m-1 absolute inset-0 flex flex-col">
        <ViewTransition name="title">
          <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
            元皓的網站 v5
          </h1>
        </ViewTransition>
        <div className="flex flex-row flex-wrap gap-1 m-1 justify-center align-center text-center">
          <Link href="/todo">
            <button className="p-2 bg-gray-300/50 backdrop-blur-sm rounded transition-all duration-200 hover:cursor-pointer hover:bg-gray-400/50">
              Server ToDo List
            </button>
          </Link>
          <Link href="/guestbook">
            <button className="p-2 bg-gray-300/50 backdrop-blur-sm rounded transition-all duration-200 hover:cursor-pointer hover:bg-gray-400/50">
              Guestbook
            </button>
          </Link>
          <Link href="/admin">
            <button className="p-2 bg-gray-600/50 dark:bg-gray-300/50 backdrop-blur-sm rounded transition-all duration-200 hover:cursor-pointer hover:bg-gray-400/50">
              Admin
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
