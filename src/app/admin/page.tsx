import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminDashboard() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const isAdmin = user.publicMetadata.role === "admin";
  if (!isAdmin) {
    redirect("/");
  }

  const [blogStats, pageStats, recentPosts] = await Promise.all([
    fetchQuery(api.blog.getStats, {}),
    fetchQuery(api.pages.getStats, {}),
    fetchQuery(api.blog.getRecent, { limit: 5 }),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user.firstName || "Admin"}
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your site
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Blog Posts</CardDescription>
            <CardTitle className="text-4xl">{blogStats.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              {blogStats.published} published, {blogStats.drafts} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Published Posts</CardDescription>
            <CardTitle className="text-4xl">{blogStats.published}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">Live on your site</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Pages</CardDescription>
            <CardTitle className="text-4xl">{pageStats.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              {pageStats.published} published, {pageStats.drafts} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Draft Posts</CardDescription>
            <CardTitle className="text-4xl">{blogStats.drafts}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">Waiting to be published</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/admin/blog/create">New Blog Post</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/pages/create">New Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/gallery">Manage Gallery</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Your latest content</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPosts.length > 0 ? (
              <ul className="space-y-2">
                {recentPosts.map((post) => (
                  <li
                    key={post._id}
                    className="flex justify-between items-center"
                  >
                    <Link
                      href={`/admin/blog/${post.slug}`}
                      className="text-sm hover:underline truncate flex-1"
                    >
                      {post.title}
                    </Link>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {post.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No blog posts yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
