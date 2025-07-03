import React from "react";
import Layout from "@/layout/default";
import {
  CalendarIcon,
  CalendarCheckIcon,
  DotIcon,
  UserIcon,
} from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Suspense } from "react";
import Markdown from "marked-react";
import { Metadata } from "next";
import sql from "@/components/pg";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 3600;
import CodeRender from "./codeRender";
import { v4 as uuidv4 } from "uuid";

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
      <Tag id={id} key={uuidv4()} className={`${size} font-bold mt-2 mb-2`}>
        {text}
      </Tag>
    );
  },
  strong(text: string) {
    return (
      <b className="font-bold" key={uuidv4()}>
        {text}
      </b>
    );
  },
  image(src: string, alt: string) {
    return (
      <img
        src={src}
        alt={alt}
        key={uuidv4()}
        className="max-w-full h-auto rounded-lg p-1 m-1"
      />
    );
  },
  link(href: string, text: string) {
    return (
      <Link
        href={href}
        className="text-blue-600 dark:text-sky-400 hover:text-blue-600/80 hover:dark:text-sky-400/80 hover:underline transition-all duration-200"
        target="_blank"
        key={uuidv4()}
      >
        {text}
      </Link>
    );
  },
  code(code: string, type: string) {
    return <CodeRender code={code} type={type} key={uuidv4()} />;
  },
  inlineCode(code: string) {
    return (
      <code
        key={uuidv4()}
        className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm"
      >
        {code}
      </code>
    );
  },
};

async function getPostData(slug: string) {
  const post = await sql`
    SELECT *
    FROM blog
    WHERE slug = ${slug}
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

function BlogPostLoading() {
  return (
    <div className="flex flex-col items-center justify-center self-center h-screen absolute inset-0">
      <div
        role="status"
        className="p-0 m-0 justify-center align-middle flex flex-col items-center"
      >
        <svg
          aria-hidden="true"
          className="w-1/2 h-1/2 text-xl text-gray-200 animate-spin self-center align-middle justify-center dark:text-gray-600 fill-blue-600 p-0 m-0 text-center content-center"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
      <span className="-translate-y-5 text-gray-500 dark:text-gray-400">
        Loading blog post...
      </span>
    </div>
  );
}

async function BlogPost({ slug }: { slug: string }) {
  const data = await getPostData(slug);
  const publishDate = new Date(data.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const updateDate = new Date(data.updateDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <div className="flex flex-col flex-wrap justify-center align-middle">
      <div className="flex flex-col flex-wrap w-full md:w-2/3 p-2 m-auto z-5">
        <span>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 z-5 hover:underline text-primary hover:text-primary/80 transition-colors transform-x-3"
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
            {publishDate}
          </span>
          <DotIcon />
          <span className="flex flex-row flex-wrap">
            <CalendarCheckIcon className="p-1" />
            <span>更新：</span>
            {updateDate}{" "}
          </span>
        </div>
        <hr className="bg-black/50 dark:bg-white/50 w-full" />
        <section className="mt-2 min-h-[300px]">
          <Markdown renderer={renderer} gfm={true}>
            {data.markdownContent}
          </Markdown>
        </section>
        <div className="h-[40px]"></div>
        <div>
          <h3 className="text-lg text-bold ml-3">Comments:</h3>
          <SignedOut>
            <form className="flex flex-col p-2">
              <textarea
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 resize-none"
                placeholder="Write your comment here..."
                rows={4}
                required
                disabled
              />
              <p className="text-gray-500 dark:text-gray-400 ml-3">
                Please sign in to comment on this post.
              </p>
              <div className="flex mt-2 self-right justify-end mr-2">
                <button
                  className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:cursor-mot-allowed"
                  disabled
                >
                  Submit
                </button>
              </div>
            </form>
          </SignedOut>
          <SignedIn>
            <form className="flex flex-col p-2">
              <textarea
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 resize-none"
                placeholder="Write your comment here..."
                rows={4}
                required
                disabled
              />
              <div className="flex mt-2 self-right justify-end mr-2">
                <button
                  className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:cursor-mot-allowed"
                  disabled
                >
                  Submit
                </button>
              </div>
            </form>
          </SignedIn>
        </div>
        <hr className="bg-gray-700 dark:bg-gray-200/70 m-3" />
        <div>
          <p className="text-gray-500 dark:text-gray-400 ml-3">
            Comments displaying are not yet implemented.
          </p>
        </div>
        <div className="h-[40px]"></div>
      </div>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return (
    <Layout tab={`/blog/${resolvedParams.slug}`}>
      <div className="h-[75px]"></div>
      <Suspense fallback={<BlogPostLoading />}>
        <BlogPost slug={resolvedParams.slug} />
      </Suspense>
    </Layout>
  );
}
