import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import { GalleryDetail } from "./GalleryDetail";

export const dynamic = "force-dynamic";

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let galleryWithImages: any = null;
  try {
    galleryWithImages = await fetchQuery(api.galleries.getBySlugWithImages, { slug });
  } catch (err) {
    console.error("Failed to load gallery:", err);
  }

  if (!galleryWithImages) {
    notFound();
  }

  const { images, ...gallery } = galleryWithImages;

  return (
    <div>
      <GalleryDetail gallery={gallery} images={images} />
    </div>
  );
}
