import sql from "@/components/pg";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db as dbTypes } from "./types";
import ClientPage from "./Client";
import { Metadata } from "next";
import Loading from "./loading";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const findPages = await sql<dbTypes[]>`
    SELECT * FROM pages
    WHERE slug = ${slug}
    AND status != 'draft'
    LIMIT 1`;
  if (findPages.length === 0) {
    notFound();
  }
  console.log(findPages);
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ClientPage db={findPages[0]} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `Pages`,
    description: "吳元皓的個人網站",
    openGraph: {
      title: "吳元皓",
      description: "吳元皓的個人網站",
      url: "https://yuanhau.com",
      siteName: "吳元皓",
      locale: "zh_TW",
      type: "website",
    },
  };
}
