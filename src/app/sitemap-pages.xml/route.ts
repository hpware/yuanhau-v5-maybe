import { unstable_cache } from "next/cache";
import sql from "@/components/pg";
const fetchContent = unstable_cache(
  async () => {
    const data = await sql`
      SELECT *
      FROM pages
      ORDER BY created_at DESC
    `;
    let contentMap = "";
    data.map((i) => {
      contentMap += `<url><loc>https://yuanhau.com/pages/${i.slug}</loc><lastmod>${new Date(i.updated_at).toISOString()}</lastmod><priority>0.6</priority></url>\n`;
    });
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${contentMap}
</urlset>`;

    return content;
  },
  [],
  { revalidate: 9600 },
);

export async function GET() {
  try {
    const res = await fetchContent();
    return new Response(res, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return new Response("Failed to fetch content", { status: 500 });
  }
}
