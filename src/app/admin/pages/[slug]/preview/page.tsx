import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function PreviewPagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchQuery(api.pages.getBySlug, { slug });

  if (!page) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href={`/admin/pages/${slug}/edit`}>Back to Edit</Link>
        </Button>
        <h1 className="text-xl font-bold">Preview</h1>
        <Badge variant={page.status === "published" ? "default" : "secondary"}>
          {page.status}
        </Badge>
        <Badge variant="outline">{page.page_type}</Badge>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-950">
        {/* Landing image for landing pages */}
        {page.page_type === "landing" && page.landing_image && (
          <div className="aspect-video relative">
            <img
              src={page.landing_image}
              alt={page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{page.title}</h1>
            </div>
          </div>
        )}

        <div className="p-8">
          {page.page_type !== "landing" && (
            <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
          )}
          <article className="prose lg:prose-xl dark:prose-invert max-w-none">
            <Markdown>{page.markdown_content}</Markdown>
          </article>
        </div>
      </div>
    </div>
  );
}
