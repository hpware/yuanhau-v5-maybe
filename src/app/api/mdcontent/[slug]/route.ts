import { NextRequest } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, context: Props) {
  try {
    const { slug } = await context.params;
    const data = await fetchQuery(api.app.getMDContent, { slug });

    // Process content before sending
    const content = data[0]?.content || "";

    return Response.json({
      content: content
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n"),
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return Response.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
