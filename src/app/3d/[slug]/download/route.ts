import stream from "stream";
import { promisify } from "util";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

const pipeline = promisify(stream.pipeline);
const url =
  "https://w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export async function GET(
  request: NextRequest,
  props: {
    params: Promise<{ slug: string }>;
  },
) {
  const { slug } = await props.params;
  const response = await fetch(url); // replace this with your API call & options
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", `attachment; filename=${slug}.pdf`);

  return new NextResponse(response.body, {
    status: 200,
    headers: headers,
  });
}
