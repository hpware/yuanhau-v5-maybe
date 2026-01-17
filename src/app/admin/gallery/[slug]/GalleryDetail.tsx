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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateGallery,
  addGalleryImage,
  deleteGalleryImage,
} from "../../actions";

export function GalleryDetail({
  gallery,
  images,
}: {
  gallery: any;
  images: any[];
}) {
  const router = useRouter();

  async function handleUpdateGallery(formData: FormData) {
    const result = await updateGallery(gallery._id, gallery.slug, formData);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleAddImage(formData: FormData) {
    const result = await addGalleryImage(gallery._id, gallery.slug, formData);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
      // Reset form
      const form = document.getElementById("add-image-form") as HTMLFormElement;
      form?.reset();
    } else {
      toast.error(result.message);
    }
  }

  async function handleDeleteImage(imageId: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;

    const result = await deleteGalleryImage(imageId, gallery.slug);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/gallery"
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </Link>
        <h1 className="text-3xl font-bold">{gallery.name}</h1>
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

      {/* Gallery Settings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gallery Settings</CardTitle>
          <CardDescription>Update gallery details</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleUpdateGallery} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Gallery Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={gallery.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="index_image">Cover Image URL</Label>
                <Input
                  id="index_image"
                  name="index_image"
                  defaultValue={gallery.index_image || ""}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={gallery.description || ""}
              />
            </div>
            <Button type="submit">Update Gallery</Button>
          </form>
        </CardContent>
      </Card>

      {/* Add new image */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Image</CardTitle>
          <CardDescription>Add a new image to this gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="add-image-form"
            action={handleAddImage}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="img_name">Image Name</Label>
                <Input
                  id="img_name"
                  name="name"
                  placeholder="Sunset at the beach"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="img_description">Description (optional)</Label>
              <Input
                id="img_description"
                name="description"
                placeholder="A beautiful sunset..."
              />
            </div>
            <Button type="submit">Add Image</Button>
          </form>
        </CardContent>
      </Card>

      {/* Images grid */}
      <h2 className="text-xl font-semibold mb-4">Images ({images.length})</h2>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <Card key={image._id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={image.image_url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{image.name}</h3>
                {image.description && (
                  <p className="text-sm text-gray-500 truncate">
                    {image.description}
                  </p>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleDeleteImage(image._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 border rounded-lg">
          No images in this gallery yet. Add your first image above!
        </div>
      )}
    </>
  );
}
