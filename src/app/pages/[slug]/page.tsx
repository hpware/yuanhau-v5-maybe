import sql from "@/components/pg";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

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
  if (findPages.length === 0) {
    notFound();
  }
  console.log(findPages);
  return (
    <div>
      <span>Hi {slug}</span>
    </div>
  );
}
