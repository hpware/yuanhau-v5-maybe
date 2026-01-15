import { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";
import sql from "@/components/pg";

const fetchContent = unstable_cache(
  async (slug: string) => {
    const data = await sql`
      SELECT * FROM mdcontent
      WHERE slug = ${slug}
    `;

    // Process content before sending
    const content = data[0]?.content || "";

    return {
      content: content
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n"),
    };
  },
  ["mdcontent"],
  { revalidate: 9600 },
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, context: Props) {
  try {
    const { slug } = await context.params;
    const content = await fetchContent(slug);
    return Response.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    return Response.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
