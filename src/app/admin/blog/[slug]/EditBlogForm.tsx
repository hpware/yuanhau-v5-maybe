"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateBlogPost,
  publishBlogPost,
  unpublishBlogPost,
  deleteBlogPost,
} from "../../actions";

export function EditBlogForm({ blog }: { blog: any }) {
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    const result = await updateBlogPost(blog.slug, formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  async function handlePublish() {
    const result = await publishBlogPost(blog.slug);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleUnpublish() {
    const result = await unpublishBlogPost(blog.slug);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    const result = await deleteBlogPost(blog.slug);
    if (result.success) {
      toast.success(result.message);
      router.push("/admin/blog");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="max-w-2xl">
      <form action={handleUpdate}>
        <div className="grid w-full items-center gap-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={blog.title}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={blog.slug} disabled />
            <p className="text-sm text-gray-500">
              Slug cannot be changed after creation
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="markdown_content">Content (Markdown)</Label>
            <textarea
              id="markdown_content"
              name="markdown_content"
              defaultValue={blog.markdown_content}
              className="min-h-[400px] w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete Post
            </Button>

            <div className="flex space-x-2">
              <Button asChild variant="outline">
                <Link href={`/admin/blog/${blog.slug}/preview`}>Preview</Link>
              </Button>
              {blog.status === "published" ? (
                <Button type="button" variant="secondary" onClick={handleUnpublish}>
                  Unpublish
                </Button>
              ) : (
                <Button type="button" variant="default" onClick={handlePublish}>
                  Publish
                </Button>
              )}
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
