import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { GalleryList } from "./GalleryList";

export default async function GalleryAdminPage() {
  const galleries = await fetchQuery(api.galleries.list, {});

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
      </div>

      <GalleryList galleries={galleries} />
    </div>
  );
}
