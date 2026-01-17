import { Badge } from "@/components/ui/badge";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditBlogForm } from "./EditBlogForm";

export default async function EditBlogPage({
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
        <Link
          href="/admin/blog"
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </Link>
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <Badge variant={blog.status === "published" ? "default" : "secondary"}>
          {blog.status}
        </Badge>
      </div>

      <EditBlogForm blog={blog} />
    </div>
  );
}
