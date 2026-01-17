"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createGallery,
  deleteGallery,
  publishGallery,
  unpublishGallery,
} from "../actions";

export function GalleryList({ galleries }: { galleries: any[] }) {
  const router = useRouter();

  async function handleCreateGallery(formData: FormData) {
    const result = await createGallery(formData);
    if (result.success) {
      toast.success(result.message);
      router.push(`/admin/gallery/${result.slug}`);
    } else {
      toast.error(result.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this gallery?")) return;

    const result = await deleteGallery(id);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleTogglePublish(id: string, currentStatus: string) {
    const result = currentStatus === "published" 
      ? await unpublishGallery(id)
      : await publishGallery(id);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <>
      {/* Create new gallery form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Gallery</CardTitle>
          <CardDescription>Add a new photo gallery/album</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleCreateGallery} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Gallery Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="My Photo Album"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="my-photo-album"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="A brief description of the gallery"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="index_image">Cover Image URL</Label>
              <Input
                id="index_image"
                name="index_image"
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            <Button type="submit">Create Gallery</Button>
          </form>
        </CardContent>
      </Card>

      {/* Existing galleries list */}
      <h2 className="text-xl font-semibold mb-4">Existing Galleries</h2>
      {galleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleries.map((gallery) => (
            <Card key={gallery._id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{gallery.name}</CardTitle>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      gallery.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {gallery.status}
                  </span>
                </div>
                <CardDescription>{gallery.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                {gallery.index_image && (
                  <img
                    src={gallery.index_image}
                    alt={gallery.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                )}
                {gallery.description && (
                  <p className="text-sm text-gray-500 mb-4">
                    {gallery.description}
                  </p>
                )}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/gallery/${gallery.slug}`)}
                  >
                    Manage Images
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      handleTogglePublish(gallery._id, gallery.status)
                    }
                  >
                    {gallery.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(gallery._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 border rounded-lg">
          No galleries yet. Create your first gallery above!
        </div>
      )}
    </>
  );
}
