import sql from "@/components/pg";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

async function getBlog(slug: string) {
  const blog = await sql`SELECT * FROM blog WHERE slug = ${slug}`;
  return blog[0];
}

export default async function Page(props: { params: { slug: string } }) {
  const blog = await getBlog(props.params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <div className="prose lg:prose-xl dark:prose-invert">
        <Markdown>{blog.markdown_content}</Markdown>
      </div>
    </div>
  );
}