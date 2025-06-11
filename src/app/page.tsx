import Link from "next/link";
export default async function Home() {
  return (
    <div className="justify-center align-center m-1 absolute inset-0 flex flex-col">
      <h1 className="text-3xl text-bold text-center">元皓的網站 v5</h1>
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
      </div>
    </div>
  );
}
