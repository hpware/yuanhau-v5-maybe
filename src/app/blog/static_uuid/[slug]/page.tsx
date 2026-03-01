import { redirect } from "next/navigation";

// This route is deprecated - redirect to the main blog page
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  redirect("/blog");
}
