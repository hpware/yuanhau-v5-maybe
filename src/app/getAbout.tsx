"use server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export default async function getData() {
  // TODO: Implement mdcontent fetching via Convex if needed
  const content = "";
  return {
    content: content
      .replace(/\\n/g, "\n")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n"),
  };
}
