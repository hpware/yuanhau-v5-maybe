"use client";
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
import sql from "@/components/pg";
import { Suspense } from "react";

async function getBlogs() {
  const blogs = await sql`SELECT * FROM blog`;
  return blogs;
}

export default async function Page() {
  const blogs = await getBlogs();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Blog Admin</h1>
      <Button asChild>
        <Link href="/admin/blog/create">Create New Post</Link>
      </Button>
      <Suspense fallback={<p>Loading...</p>}>
        <Table>
          <TableCaption>A list of your recent blog posts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((post: any) => (
              <TableRow key={post.uuid}>
                <TableCell className="font-medium">{post.title}</TableCell>
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
                  {new Date(post.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(post.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button asChild>
                    <Link href={`/admin/blog/${post.slug}`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Suspense>
    </div>
  );
}
