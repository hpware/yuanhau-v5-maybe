"use server";

import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Id } from "../../../convex/_generated/dataModel";

// ============ BLOG ACTIONS ============

export async function createBlogPost(formData: FormData) {
  const user = await currentUser();
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const markdown_content = formData.get("markdown_content") as string;
  const writer = {
    name: user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : user?.emailAddresses?.[0]?.emailAddress || "Unknown",
    id: user?.id,
  };

  try {
    await fetchMutation(api.blog.create, {
      slug,
      title,
      markdown_content,
      writer,
    });
    revalidatePath("/admin/blog");
    return { success: true, message: "Blog post created successfully", slug };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create blog post" };
  }
}

export async function updateBlogPost(slug: string, formData: FormData) {
  const title = formData.get("title") as string;
  const markdown_content = formData.get("markdown_content") as string;

  try {
    await fetchMutation(api.blog.update, {
      slug,
      title,
      markdown_content,
    });
    revalidatePath(`/admin/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true, message: "Blog post updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update blog post" };
  }
}

export async function publishBlogPost(slug: string) {
  try {
    await fetchMutation(api.blog.publish, { slug });
    revalidatePath(`/admin/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true, message: "Blog post published successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to publish blog post" };
  }
}

export async function unpublishBlogPost(slug: string) {
  try {
    await fetchMutation(api.blog.unpublish, { slug });
    revalidatePath(`/admin/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true, message: "Blog post unpublished" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to unpublish blog post" };
  }
}

export async function deleteBlogPost(slug: string) {
  try {
    await fetchMutation(api.blog.remove, { slug });
    revalidatePath("/admin/blog");
    return { success: true, message: "Blog post deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete blog post" };
  }
}

// ============ PAGES ACTIONS ============

export async function createPage(formData: FormData) {
  const user = await currentUser();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const page_type = formData.get("page_type") as "landing" | "simple" | "info";
  const markdown_content = formData.get("markdown_content") as string;
  const landing_image = formData.get("landing_image") as string;
  const writer = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user?.emailAddresses?.[0]?.emailAddress || "Unknown";

  try {
    await fetchMutation(api.pages.create, {
      slug,
      title,
      page_type,
      markdown_content,
      landing_image: landing_image || undefined,
      writer,
    });
    revalidatePath("/admin/pages");
    return { success: true, message: "Page created successfully", slug };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create page" };
  }
}

export async function updatePage(slug: string, formData: FormData) {
  const title = formData.get("title") as string;
  const page_type = formData.get("page_type") as "landing" | "simple" | "info";
  const markdown_content = formData.get("markdown_content") as string;
  const landing_image = formData.get("landing_image") as string;

  try {
    await fetchMutation(api.pages.update, {
      slug,
      title,
      page_type,
      markdown_content,
      landing_image: landing_image || undefined,
    });
    revalidatePath(`/admin/pages/${slug}/edit`);
    revalidatePath("/admin/pages");
    return { success: true, message: "Page updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update page" };
  }
}

export async function publishPage(slug: string) {
  try {
    await fetchMutation(api.pages.publish, { slug });
    revalidatePath(`/admin/pages/${slug}/edit`);
    revalidatePath("/admin/pages");
    return { success: true, message: "Page published successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to publish page" };
  }
}

export async function unpublishPage(slug: string) {
  try {
    await fetchMutation(api.pages.unpublish, { slug });
    revalidatePath(`/admin/pages/${slug}/edit`);
    revalidatePath("/admin/pages");
    return { success: true, message: "Page unpublished" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to unpublish page" };
  }
}

export async function deletePage(slug: string) {
  try {
    await fetchMutation(api.pages.remove, { slug });
    revalidatePath("/admin/pages");
    return { success: true, message: "Page deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete page" };
  }
}

// ============ GALLERY ACTIONS ============

export async function createGallery(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const index_image = formData.get("index_image") as string;

  try {
    await fetchMutation(api.galleries.create, {
      name,
      slug,
      description: description || undefined,
      index_image: index_image || undefined,
    });
    revalidatePath("/admin/gallery");
    return { success: true, message: "Gallery created successfully", slug };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create gallery" };
  }
}

export async function updateGallery(galleryId: string, slug: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const index_image = formData.get("index_image") as string;

  try {
    await fetchMutation(api.galleries.update, {
      id: galleryId as Id<"galleries">,
      name,
      description: description || undefined,
      index_image: index_image || undefined,
    });
    revalidatePath(`/admin/gallery/${slug}`);
    revalidatePath("/admin/gallery");
    return { success: true, message: "Gallery updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update gallery" };
  }
}

export async function deleteGallery(id: string) {
  try {
    await fetchMutation(api.galleries.remove, { id: id as Id<"galleries"> });
    revalidatePath("/admin/gallery");
    return { success: true, message: "Gallery deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete gallery" };
  }
}

export async function publishGallery(id: string) {
  try {
    await fetchMutation(api.galleries.publish, { id: id as Id<"galleries"> });
    revalidatePath("/admin/gallery");
    return { success: true, message: "Gallery published successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to publish gallery" };
  }
}

export async function unpublishGallery(id: string) {
  try {
    await fetchMutation(api.galleries.unpublish, { id: id as Id<"galleries"> });
    revalidatePath("/admin/gallery");
    return { success: true, message: "Gallery unpublished" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to unpublish gallery" };
  }
}

export async function addGalleryImage(galleryId: string, slug: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;

  try {
    await fetchMutation(api.galleries.addImage, {
      gallery_id: galleryId as Id<"galleries">,
      name,
      description: description || undefined,
      image_url,
    });
    revalidatePath(`/admin/gallery/${slug}`);
    return { success: true, message: "Image added successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to add image" };
  }
}

export async function deleteGalleryImage(imageId: string, slug: string) {
  try {
    await fetchMutation(api.galleries.removeImage, { id: imageId as Id<"gallery_images"> });
    revalidatePath(`/admin/gallery/${slug}`);
    return { success: true, message: "Image deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete image" };
  }
}
