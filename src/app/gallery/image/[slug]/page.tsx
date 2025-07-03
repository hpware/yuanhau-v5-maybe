//import sql from "@/components/pg";
//import { notFound } from "next/navigation";
import Layout from "@/layout/default";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

function Loading() {
  return <div>Hi</div>;
}

async function ImagePage({ slug }: { slug: string }) {
  return (
    <div>
      <div>Hi {slug}</div>
    </div>
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return (
    <Layout tab={`/gallery/image/${slug}`}>
      <div className="h-[20px]"></div>
      <Suspense fallback={<Loading />}>
        <ImagePage slug={slug} />
      </Suspense>
    </Layout>
  );
}
