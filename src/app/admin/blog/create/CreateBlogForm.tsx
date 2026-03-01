"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBlogPost } from "../../actions";

export function CreateBlogForm() {
  const router = useRouter();

  async function handleCreate(formData: FormData) {
    const result = await createBlogPost(formData);
    if (result.success) {
      toast.success(result.message);
      router.push(`/admin/blog/${result.slug}`);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form action={handleCreate} className="max-w-2xl">
      <div className="grid w-full items-center gap-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter blog post title"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="blog-post-url-slug"
            required
          />
          <p className="text-sm text-gray-500">
            URL-friendly identifier (e.g., my-first-post)
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="markdown_content">Content (Markdown)</Label>
          <textarea
            id="markdown_content"
            name="markdown_content"
            placeholder="Write your blog post content in Markdown..."
            className="min-h-[400px] w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button asChild variant="outline">
            <Link href="/admin/blog">Cancel</Link>
          </Button>
          <Button type="submit">Create Post</Button>
        </div>
      </div>
    </form>
  );
}
