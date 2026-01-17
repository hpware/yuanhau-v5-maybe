import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ClientPage from "./Client";
import { Metadata } from "next";
import Loading from "./loading";
import { normalizeWriter, normalizeTimestamp } from "@/lib/normalizeWriter";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchQuery(api.pages.getPublishedBySlug, { slug });
  
  if (!page) {
    notFound();
  }

  // Transform Convex data to match the expected db format
  const dbPage = {
    uuid: page._id,
    slug: page.slug,
    title: page.title,
    writer: normalizeWriter(page.writer),
    page_type: page.page_type,
    status: page.status,
    markdown_content: page.markdown_content,
    landing_image: page.landing_image || "",
    created_at: normalizeTimestamp(page.created_at).toISOString(),
    updated_at: normalizeTimestamp(page.updated_at).toISOString(),
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ClientPage db={dbPage} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await fetchQuery(api.pages.getPublishedBySlug, { slug: resolvedParams.slug });

  return {
    title: page?.title || "Pages",
    description: "Howard的個人網站",
    openGraph: {
      title: "Howard",
      description: "Howard的個人網站",
      url: "https://yuanhau.com",
      siteName: "Howard",
      locale: "zh_TW",
      type: "website",
    },
  };
}
