import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function PreviewBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchQuery(api.blog.getBySlug, { slug });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href={`/admin/blog/${slug}`}>Back to Edit</Link>
        </Button>
        <h1 className="text-xl font-bold">Preview</h1>
        <Badge variant={blog.status === "published" ? "default" : "secondary"}>
          {blog.status}
        </Badge>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-white dark:bg-gray-950">
        <article className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h1>{blog.title}</h1>
          <Markdown>{blog.markdown_content}</Markdown>
        </article>
      </div>
    </div>
  );
}
