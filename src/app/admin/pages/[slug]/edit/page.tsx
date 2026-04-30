import { Badge } from "@/components/ui/badge";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditPageForm } from "./EditPageForm";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let page: any = null;
  try {
    page = await fetchQuery(api.pages.getBySlug, { slug });
  } catch (err) {
    console.error("Failed to load page for editing:", err);
  }

  if (!page) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/pages"
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </Link>
        <h1 className="text-3xl font-bold">Edit Page</h1>
        <Badge variant={page.status === "published" ? "default" : "secondary"}>
          {page.status}
        </Badge>
        <Badge variant="outline">{page.page_type}</Badge>
      </div>

      <EditPageForm page={page} />
    </div>
  );
}
