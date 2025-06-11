import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const sql = postgres(process.env.DATABASE_URL || "", { ssl: "require" });
  await sql`CREATE TABLE IF NOT EXISTS todos (uuid TEXT, title TEXT, content TEXT)`;
  const formData = await req.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const password = formData.get("password");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  // Explicitly cast to string
  await sql`INSERT INTO todos (uuid, title, content) VALUES (${uuidv4()}, ${String(title)}, ${String(content)})`;
  return NextResponse.json({ success: true });
}
