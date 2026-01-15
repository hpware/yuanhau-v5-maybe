"use server";

import fs from "fs";
import path from "path";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function downloadFile() {
  const filePath = path.resolve("./public/your-file.pdf");
  const fileContents = fs.readFileSync(filePath);
  const headerList = new Headers(await headers());
  headerList.set("Content-Type", "application/pdf");
  headerList.set("Content-Disposition", `attachment; filename="your-file.pdf"`);
  return new NextResponse(fileContents, {
    status: 200,
    headers: headerList,
  });
}
