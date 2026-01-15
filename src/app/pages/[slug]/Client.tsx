"use client";
import { useEffect, useState } from "react";
import { db as dbTypes } from "./types";
import Link from "next/link";
import Markdown from "marked-react";
import { v4 as uuidv4 } from "uuid";
import CodeRender from "./codeRenderer";
import Footer from "@/components/footer";
import { TriangleAlertIcon } from "lucide-react";

function slugify(text: string) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const renderer = {
  heading(text: string, level: number) {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    const id = slugify(text);
    const size =
      level === 1
        ? "text-4xl mb-6"
        : level === 2
          ? "text-3xl mb-4"
          : level === 3
            ? "text-2xl mb-3"
            : level === 4
              ? "text-xl mb-2"
              : "text-lg mb-2";
    return (
      <Tag
        id={id}
        key={uuidv4()}
        className={`${size} font-bold tracking-tight`}
      >
        {text}
      </Tag>
    );
  },
  paragraph(text: string) {
    return (
      <p
        className="my-6 leading-relaxed text-gray-600 dark:text-gray-300"
        key={uuidv4()}
      >
        {text}
      </p>
    );
  },
  text(text: string) {
    return <span key={uuidv4()}>{text}</span>;
  },
  strong(text: string) {
    return (
      <b className="font-semibold text-gray-900 dark:text-white" key={uuidv4()}>
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
        className="max-w-full h-auto rounded-xl shadow-md my-8"
      />
    );
  },
  link(href: string, text: string) {
    return (
      <Link
        href={href}
        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline decoration-2 underline-offset-2"
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
        className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 font-mono text-sm"
      >
        {code}
      </code>
    );
  },
};

function PageArchivedBanner({ writer }: { writer: string }) {
  return (
    <div className="flex items-center justify-center fixed z-50 bg-red-600 p-4 text-white inset-x-0 top-0">
      <TriangleAlertIcon />
      <h2 className="text-lg font-medium">
        This page has been archived by {writer}
      </h2>
    </div>
  );
}

export default function Client({ db }: { db: dbTypes }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {db.page_type === "landing" ? (
        <Landing db={db} />
      ) : db.page_type === "simple" ? (
        <Simple db={db} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen text-4xl font-bold text-gray-400">
          Content Not Available
        </div>
      )}
      {db.status === "archived" && <PageArchivedBanner writer={db.writer} />}
    </div>
  );
}

function Landing({ db }: { db: dbTypes }) {
  return (
    <div className="relative">
      <div className="relative">
        <div className="w-full h-screen flex items-center justify-center p-4">
          <img
            src={db.landing_image}
            alt={`A hero image for ${db.title}`}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <div className="-translate-y-12 justify-center text-center">
            <h2 className="text-2xl font-bold backdrop-blur">{db.title}</h2>
          </div>
          <Link href="#learnmore">
            <button className="px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-50 transition-all shadow-lg">
              Learn more
            </button>
          </Link>
        </div>
      </div>

      <div id="learnmore" className="min-h-screen">
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <article className="prose dark:prose-invert prose-lg max-w-none">
            <Markdown renderer={renderer} gfm={true} breaks={true}>
              {db.markdown_content}
            </Markdown>
          </article>
        </section>
      </div>
      <Footer currentTab="/" />
    </div>
  );
}

function Simple({ db }: { db: dbTypes }) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <article className="prose dark:prose-invert prose-lg max-w-none">
        <Markdown renderer={renderer} gfm={true} breaks={true}>
          {db.markdown_content}
        </Markdown>
      </article>
    </div>
  );
}
