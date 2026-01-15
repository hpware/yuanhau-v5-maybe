"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import sql from "@/components/pg";

export default function Page() {
  async function createPost(formData: FormData) {
    "use server";
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const markdown_content = formData.get("markdown_content") as string;
    const uuid = uuidv4();
    const writer = { name: "Howard" }; // Replace with actual writer info

    await sql`
      INSERT INTO blog (uuid, slug, title, markdown_content, writer)
      VALUES (${uuid}, ${slug}, ${title}, ${markdown_content}, ${JSON.stringify(writer)})
    `;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <form action={createPost}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Blog Post Title" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" placeholder="blog-post-title" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="markdown_content">Content</Label>
            <textarea
              id="markdown_content"
              name="markdown_content"
              className="min-h-[300px]"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
