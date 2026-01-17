"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updatePage,
  publishPage,
  unpublishPage,
  deletePage,
} from "../../../actions";

export function EditPageForm({ page }: { page: any }) {
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    const result = await updatePage(page.slug, formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  async function handlePublish() {
    const result = await publishPage(page.slug);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleUnpublish() {
    const result = await unpublishPage(page.slug);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this page?")) return;

    const result = await deletePage(page.slug);
    if (result.success) {
      toast.success(result.message);
      router.push("/admin/pages");
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
              defaultValue={page.title}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={page.slug} disabled />
            <p className="text-sm text-gray-500">
              Slug cannot be changed after creation
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="page_type">Page Type</Label>
            <select
              id="page_type"
              name="page_type"
              defaultValue={page.page_type}
              className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
            >
              <option value="landing">Landing</option>
              <option value="simple">Simple</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="landing_image">
              Landing Image URL (required for landing pages)
            </Label>
            <Input
              id="landing_image"
              name="landing_image"
              defaultValue={page.landing_image || ""}
              placeholder="https://example.com/hero.jpg"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="markdown_content">Content (Markdown)</Label>
            <textarea
              id="markdown_content"
              name="markdown_content"
              defaultValue={page.markdown_content}
              className="min-h-[400px] w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete Page
            </Button>

            <div className="flex space-x-2">
              <Button asChild variant="outline">
                <Link href={`/admin/pages/${page.slug}/preview`}>Preview</Link>
              </Button>
              {page.status === "published" ? (
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
