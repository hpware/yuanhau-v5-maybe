import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { normalizeTimestamp } from "@/lib/normalizeWriter";
import { auth } from "@clerk/nextjs/server";

export default async function BlogAdminPage() {
  const { getToken } = await auth();
  const token = await getToken({ template: "convex" });
  const blogs = await fetchQuery(api.blog.list, {}, { token });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/create">Create New Post</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of all blog posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((post) => (
            <TableRow key={post._id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="text-gray-500">{post.slug}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    post.status === "published" ? "default" : "secondary"
                  }
                >
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>
                {normalizeTimestamp(post.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {normalizeTimestamp(post.updated_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/blog/${post.slug}/preview`}>Preview</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/admin/blog/${post.slug}`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {blogs.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No blog posts yet. Create your first post!
        </div>
      )}
    </div>
  );
}
