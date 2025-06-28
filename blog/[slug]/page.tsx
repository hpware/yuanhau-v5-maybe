"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import sql from "@/components/pg";
import { Suspense } from "react";
import Link from "next/link";

async function getBlog(slug: string) {
  const blog = await sql`SELECT * FROM blog WHERE slug = ${slug}`;
  return blog[0];
}

export default async function Page(props: { params: { slug: string } }) {
  const blog = await getBlog(props.params.slug);

  async function updatePost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const markdown_content = formData.get("markdown_content") as string;

    await sql`
      UPDATE blog
      SET title = ${title},
          markdown_content = ${markdown_content}
      WHERE slug = ${props.params.slug}
    `;
  }

  async function togglePublish() {
    "use server";
    const newStatus = blog.status === "published" ? "draft" : "published";
    await sql`
      UPDATE blog
      SET status = ${newStatus}
      WHERE slug = ${props.params.slug}
    `;
  }

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<p>Loading...</p>}>
        <form action={updatePost}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={blog.title} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={blog.slug} disabled />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="markdown_content">Content</Label>
              <textarea
                id="markdown_content"
                name="markdown_content"
                defaultValue={blog.markdown_content}
                className="min-h-[300px]"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Badge variant={blog.status === "published" ? "default" : "secondary"}>
                {blog.status}
              </Badge>
            </div>
            <div className="flex justify-end space-x-2">
              <Button asChild variant="outline">
                <Link href={`/admin/blog/${props.params.slug}/preview`}>Preview</Link>
              </Button>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save</Button>
              <form action={togglePublish}>
                <Button variant={blog.status === "published" ? "destructive" : "default"}>
                  {blog.status === "published" ? "Unpublish" : "Publish"}
                </Button>
              </form>
            </div>
          </div>
        </form>
      </Suspense>
    </div>
  );
}
