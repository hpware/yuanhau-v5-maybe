import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { GalleryList } from "./GalleryList";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  let galleries: any[] = [];
  try {
    galleries = await fetchQuery(api.galleries.list, {});
  } catch (err) {
    console.error("Failed to load galleries:", err);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
      </div>

      <GalleryList galleries={galleries} />
    </div>
  );
}
