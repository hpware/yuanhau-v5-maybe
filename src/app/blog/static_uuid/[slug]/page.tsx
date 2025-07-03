import React from "react";
import Layout from "@/layout/default";
import {
  CalendarIcon,
  CalendarCheckIcon,
  DotIcon,
  UserIcon,
} from "lucide-react";
import Markdown from "marked-react";
import { Metadata } from "next";
import sql from "@/components/pg";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

// Slugify function for heading IDs
function slugify(text: string) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const renderer = {
  heading(text: string, level: number) {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    const id = slugify(text);
    const size =
      level === 1
        ? "text-2xl"
        : level === 2
          ? "text-xl"
          : level === 3
            ? "text-lg"
            : level === 4
              ? "text-md"
              : "text-base";
    return (
      <Tag id={id} className={`${size} font-bold mt-2 mb-2`}>
        {text}
      </Tag>
    );
  },
  strong(text: string) {
    return <b className="font-bold">{text}</b>;
  },
};

async function getPostData(slug: string) {
  const post = await sql`
    SELECT *
    FROM blog
    WHERE uuid = ${slug}
    AND status = 'published'
    ORDER BY created_at DESC
    LIMIT 1
  `;

  if (post.length === 0) {
    throw new Error("Post not found");
  }

  return {
    title: post[0].title,
    publishDate: post[0].created_at || "Unknown",
    updateDate: post[0].updated_at || post[0].created_at || "Unknown",
    authorUser: post[0].writer || "Unknown",
    markdownContent: post[0].markdown_content,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getPostData(resolvedParams.slug);

  return {
    title: `${data.title} | 吳元皓's Blog`,
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const data = await getPostData(resolvedParams.slug);

  return (
    <Layout tab={`/blog/static_uuid/${resolvedParams.slug}`}>
      <div className="h-[75px]"></div>
      <div className="flex flex-col flex-wrap justify-center align-middle">
        <div className="flex flex-col flex-wrap w-full md:w-2/3 p-2 m-auto">
          <span>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 hover:underline text-primary hover:text-primary/80 transition-colors transform-x-3"
            >
              <i>← Back to Blog</i>
            </Link>
          </span>
          <span className="text-3xl justify-center align-middle m-2">
            {data.title}
          </span>
          <div className="flex flex-row flex-wrap mb-2">
            <span className="flex flex-row">
              <UserIcon className="p-1" />
              <span>{data.authorUser}</span>
            </span>
            <DotIcon />
            <span className="flex flex-row flex-wrap">
              <CalendarIcon className="p-1" />
              <span>發布：</span>
              {new Date(data.publishDate).toLocaleDateString("zh-TW")}
            </span>
            <DotIcon />
            <span className="flex flex-row flex-wrap">
              <CalendarCheckIcon className="p-1" />
              <span>更新：</span>
              {new Date(data.updateDate).toLocaleDateString("zh-TW")}
            </span>
          </div>
          <hr className="bg-black/50 dark:bg-white/50 w-full" />
          <section className="mt-2">
            <Markdown renderer={renderer} gfm={true}>
              {data.markdownContent}
            </Markdown>
          </section>
          <div className="h-[40px]"></div>
        </div>
      </div>
    </Layout>
  );
}
