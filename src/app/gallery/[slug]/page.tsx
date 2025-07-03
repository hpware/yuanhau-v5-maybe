//import sql from "@/components/pg";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  if (1 === 0) {
    notFound();
  }
  return (
    <div>
      <span>Hi {slug}</span>
    </div>
  );
}
