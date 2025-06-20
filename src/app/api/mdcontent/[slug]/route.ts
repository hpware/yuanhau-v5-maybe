import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import sql from "@/components/pg";

const fetchContent = unstable_cache(
  async (slug: string) => {
    const data = await sql`
      SELECT * FROM mdcontent
      WHERE slug = ${slug}
    `;

    return {
      content:
        data[0]?.content
          .replace(/\\n/g, "\n")
          .replace(/\r\n/g, "\n")
          .replace(/\r/g, "\n") || "",
    };
  },
  ["mdcontent"],
  { revalidate: 9600 },
);

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const content = await fetchContent(params.slug);
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}
