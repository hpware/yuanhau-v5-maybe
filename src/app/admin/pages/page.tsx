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

export default async function PagesAdminPage() {
  const pages = await fetchQuery(api.pages.list, {});

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Button asChild>
          <Link href="/admin/pages/create">Create New Page</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of all pages.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page._id}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell className="text-gray-500">{page.slug}</TableCell>
              <TableCell>
                <Badge variant="outline">{page.page_type}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    page.status === "published" ? "default" : "secondary"
                  }
                >
                  {page.status}
                </Badge>
              </TableCell>
              <TableCell>
                {normalizeTimestamp(page.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/pages/${page.slug}/preview`}>
                    Preview
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/admin/pages/${page.slug}/edit`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pages.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No pages yet. Create your first page!
        </div>
      )}
    </div>
  );
}
