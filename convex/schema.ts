import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  blog: defineTable({
    uuid: v.string(),
    title: v.string(),
    slug: v.string(),
    markdown_content: v.string(),
    writer: v.array(v.string()),
    status: v.string(),
    created_at: v.number(),
    updated_at: v.number(),
  }).index("uuid", ["uuid", "slug"]),
  // CREATED_AT THINGY
  /**
   * await ctx.db.insert("events", {
     name: "My Event",
     createdAt: Date.now(), // current UTC timestamp
   });
   */
  mdcontent: defineTable({
    uuid: v.string(),
    slug: v.string(),
    content: v.string(), // NOT NULL
  }).index("uuid", ["uuid", "slug"]),

  pages: defineTable({
    uuid: v.string(),
    slug: v.string(),
    title: v.string(),
    writer: v.array(v.string()),
    page_type: v.string(),
    status: v.string(),
    markdown_content: v.string(),
    landing_image: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("uuid", ["uuid", "slug"]),
});
