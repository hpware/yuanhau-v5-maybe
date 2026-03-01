import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { normalizeTimestamp } from "@/lib/normalizeWriter";

export async function GET() {
  try {
    const blogs = await fetchQuery(api.blog.listPublished, {});
    
    let contentMap = "";
    blogs.forEach((blog) => {
      contentMap += `<url><loc>https://yuanhau.com/blog/${blog.slug}</loc><lastmod>${normalizeTimestamp(blog.updated_at).toISOString()}</lastmod><priority>0.6</priority></url>\n`;
    });
    
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${contentMap}
</urlset>`;

    return new Response(content, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return new Response("Failed to fetch content", { status: 500 });
  }
}
