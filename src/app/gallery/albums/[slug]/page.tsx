//import sql from "@/components/pg";
//import { notFound } from "next/navigation";
import Layout from "@/layout/default";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

function Loading() {
  return <div>Hi</div>;
}

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

async function AlbumsPage({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams: SearchParams;
}) {
  return (
    <div>
      <div>Slug: {slug}</div>
      {Object.entries(searchParams || {}).map(([key, value]) => (
        <div key={key} className="">
          <span className="">{key}:</span> {String(value)}
        </div>
      ))}
    </div>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = await params;
  return (
    <Layout tab={`/gallery/albums/${slug}`}>
      <Suspense fallback={<Loading />}>
        <AlbumsPage slug={slug} searchParams={searchParams} />
      </Suspense>
    </Layout>
  );
}
