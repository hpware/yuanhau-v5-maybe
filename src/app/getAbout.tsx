"use server";
import { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";
import sql from "@/components/pg";

const fetchContent = unstable_cache(
  async (slug: string) => {
    const data = await sql`
      SELECT * FROM mdcontent
      WHERE slug = ${slug}
    `;
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

export default async function getData() {
  const content = await fetchContent("about");
  return content;
}
