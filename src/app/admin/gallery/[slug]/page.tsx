import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import { GalleryDetail } from "./GalleryDetail";

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const galleryWithImages = await fetchQuery(api.galleries.getBySlugWithImages, { slug });

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
