import sql from "@/components/pg";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db as dbTypes } from "./types";
import ClientPage from "./Client";
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
  if (findPages[0].status === "archived") {
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

const createPagesSystem = await sql`
  CREATE TABLE IF NOT EXISTS pages (
  uuid TEXT PRIMARY KEY,
  slug TEXT unique not null,
  title TEXT not null,
  writer TEXT NOT NULL,
  page_type varchar(20) default 'landing' CHECK (page_type IN ('landing', 'simple', 'info')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  markdown_content text not null,
  landing_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_landing_image CHECK (
    (page_type = 'landing' AND landing_image IS NOT NULL) OR
    (page_type != 'landing')
  )
  );
  `;
