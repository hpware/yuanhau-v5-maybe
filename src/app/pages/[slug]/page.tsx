import { unstable_ViewTransition as ViewTransition, Suspense } from "react";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 300;
import sql from "@/components/pg";

interface Article {
  uuid: string;
  slug: string;
  title: string;
  content: string;
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const findPages = await sql<Article[]>`
    SELECT * FROM pages
    WHERE slug = ${slug}`;
  return (
    <div>
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
      <span>Hi {slug}</span>
      <span>{findPages}</span>
    </div>
  );
}
