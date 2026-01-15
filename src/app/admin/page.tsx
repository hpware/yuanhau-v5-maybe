import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const isAdmin = user.publicMetadata.role === "admin";
  if (!isAdmin) {
    redirect("/");
  }

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

      {/* Add your admin panel content here */}
      <div className="mt-8">
        <h2 className="text-2xl mb-4">管理面板</h2>
        {/* Add your admin controls here */}
        <div className="flex flex-col space-y-4">
          {/* Add your admin features here */}
        </div>
      </div>
    </div>
  );
}
