import Layout from "@/layout/default";
import Link from "next/link";
import sql from "@/components/pg";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function getPosts() {
  const fetchArticles = await sql`
    SELECT * FROM blog
    WHERE status = 'published'
    ORDER BY created_at DESC
    `;
  return fetchArticles;
}

export async function generateMetadata() {
  return {
    title: `吳元皓's Blog`,
    description: "吳元皓的個人網站",
    keywords:
      "吳元皓, 吳元皓的個人網站, 吳元皓的個人網站首頁, Howard Wu, yuanhau, wuyuanhau, yuanhau.com, yuanh.xyz, Yuan-Hau Wu, 吳元皓, 元皓, 吳元皓, 吳元浩, 元浩, 吳元浩, 吳元浩, 五專生, ictechz, 台灣的五專生, 吴元皓, 吴元皓的网站,吴元浩,元浩,吴元浩的网站,吴元浩,五专生,ictechz,摄影,前端方面, 個人資料連結",
    authors: [{ name: "吳元皓", url: "https://yuanhau.com" }],
    creator: "@ictechz",
    openGraph: {
      title: "吳元皓",
      description: "吳元皓的個人網站",
      url: "https://yuanhau.com",
      siteName: "吳元皓",
      images: [
        {
          url: "https://yuanhau.com/favicon.jpg",
        },
      ],
      locale: "zh_TW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "吳元皓",
      description: "吳元皓的個人網站",
      creator: "@ictechz",
      site: "https://yuanhau.com",
      images: ["https://yuanhau.com/favicon.jpg"],
    },
  };
}

async function BlogPosts() {
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
      {posts.map((i) => (
        <Link href={`/blog/${i.slug}`} key={i.uuid} className="group">
          <div className="p-4 backdrop-blur-lg bg-gray-500/10 dark:bg-gray-300/20 rounded-xl hover:bg-gray-500/20 transition-all duration-300 min-h-1/5">
            <span className="text-2xl block mb-2">{i.title}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(i.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BlogPostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="p-4 backdrop-blur-lg bg-gray-500/10 dark:bg-gray-300/20 rounded-xl animate-pulse"
        >
          <div className="h-6 bg-gray-300/50 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300/50 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Layout tab="/blog">
      <div className="h-[20px]"></div>
      <div className="justify-center align-center text-center m-2 p-2">
        <h1 className="text-4xl text-bold mt-12">Blog Posts</h1>
        <hr className="bg-gray-500/50 dark:bg-white/50 my-2 w-[80%] m-auto" />
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPosts />
        </Suspense>
      </div>
    </Layout>
  );
}
