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
import { notFound } from "next/navigation";
import sql from "@/components/pg";

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

type Props = {
  params: { slug: string };
};

async function getPostData(slug: string) {
  const fetchArticle = await sql`
    SELECT * FROM blog
    WHERE slug = ${slug}
    `;
  if (fetchArticle.length === 0) {
    notFound();
  }
  return fetchArticle[0];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostData(params.slug);

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

export default async function Page({ params }: Props) {
  const data = await getPostData(params.slug);

  return (
    <Layout tab={`/blog/${params.slug}`}>
      <div className="h-[70px]"></div>
      <div className="flex flex-col flex-wrap justify-center align-middle">
        <div className="flex flex-col flex-wrap w-full md:w-2/3 p-2 m-auto">
          <span className="text-3xl justify-center align-middle m-2">
            {data.title}
          </span>
          <div className="flex flex-row flex-wrap mb-2">
            <span className="flex flex-row">
              <UserIcon className="p-1" />
              <span>{data.writer}</span>
            </span>
            <DotIcon />
            <span className="flex flex-row flex-wrap">
              <CalendarIcon className="p-1" />
              <span>發布：</span>
              {new Date(data.created_at).toLocaleDateString("zh-TW")}
            </span>
            <DotIcon />
            <span className="flex flex-row flex-wrap">
              <CalendarCheckIcon className="p-1" />
              <span>更新：</span>
              {new Date(data.updated_at).toLocaleDateString("zh-TW")}
            </span>
          </div>
          <hr className="bg-black/50 dark:bg-white/50 w-full" />
          <section className="mt-2">
            <Markdown renderer={renderer} gfm={true}>
              {data.markdown_content}
            </Markdown>
          </section>
          <div className="h-[40px]"></div>
        </div>
      </div>
    </Layout>
  );
}
