import React from "react";
import Layout from "@/layout/default";
import {
  CalendarIcon,
  CalendarCheckIcon,
  DotIcon,
  UserIcon,
} from "lucide-react";
import Markdown from "marked-react";

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
      <Tag id={id} className={`${size} font-bold mt-${6 - level} mb-2`}>
        {text}
      </Tag>
    );
  },
  strong(text: string) {
    return <b className="font-bold">{text}</b>;
  },
};

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  // Fake data for now.
  const title = "What is a buffer overflow?";
  const publishDate = 1735619100000;
  const updateDate = 1735619100000;
  const authorUser = "howard";
  const markdownContent = `
# Hello World

## Heading 2

Some **bold** text.
`;

  return (
    <Layout tab={`/blog/${slug}`}>
      <div className="h-[70px]"></div>
      <div className="flex flex-col flex-wrap justify-center align-middle">
        <div className="flex flex-col flex-wrap w-full md:w-2/3 p-2 m-auto">
          <span className="text-3xl justify-center align-middle m-2">
            {title}
          </span>
          <div className="flex flex-row flex-wrap mb-2">
            <span className="flex flex-row">
              <UserIcon className="p-1" />
              <span>{authorUser}</span>
            </span>
            <DotIcon />
            <span className="flex flex-row flex-wrap">
              <CalendarIcon className="p-1" />
              <span>發布：</span>
              {new Date(publishDate).toLocaleDateString("zh-TW")}
            </span>
            <DotIcon />
            <span className="flex flex-row flex-wrap">
              <CalendarCheckIcon className="p-1" />
              <span>更新：</span>
              {new Date(updateDate).toLocaleDateString("zh-TW")}
            </span>
          </div>
          <hr className="bg-black/50 dark:bg-white/50 w-full" />
          <section className="mt-2">
            <Markdown renderer={renderer}>{markdownContent}</Markdown>
          </section>
        </div>
      </div>
    </Layout>
  );
}
