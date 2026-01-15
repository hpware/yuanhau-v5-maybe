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

  return <div></div>;
}
