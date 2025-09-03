import Layout from "@/layout/default";
import Link from "next/link";
import sql from "@/components/pg";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

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
    title: `Howard's Blog`,
    description: "Howard的個人網站",
    keywords:
      "Howard, Howard的個人網站, Howard的個人網站首頁",
    authors: [{ name: "Howard", url: "https://yuanhau.com" }],
    
    openGraph: {
      title: "Howard",
      description: "Howard的個人網站",
      url: "https://yuanhau.com",
      siteName: "Howard",
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
      title: "Howard",
      description: "Howard的個人網站",
      
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
        <h1 className={`text-4xl text-bold mt-12 ${roboto.variable}`}>
          Blog Posts
        </h1>
        <hr className="bg-gray-500/50 dark:bg-white/50 my-2 w-[80%] m-auto" />
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPosts />
        </Suspense>
      </div>
    </Layout>
  );
}
