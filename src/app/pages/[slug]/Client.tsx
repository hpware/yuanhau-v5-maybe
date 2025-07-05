"use client";
import { useEffect, useState } from "react";
import { db as dbTypes } from "./types";
import Link from "next/link";
import Markdown from "marked-react";
import { v4 as uuidv4 } from "uuid";
import CodeRender from "./codeRenderer";

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

function PageArchivedBanner() {
  return (
    <div className="flex flex-col z-50 fixed bg-red-600/90 justify-center align-center text-center p-2 text-white inset-x-0 w-full top-0">
      <div>
        <h2 className="text-lg">This page has been archived by it's owner</h2>
      </div>
    </div>
  );
}

export default function Client({ db }: { db: dbTypes }) {
  const [isArchived, SetIsArchived] = useState<boolean>(false);
  useEffect(() => {
    if (db.status === "archived") {
      SetIsArchived(true);
    }
  }, []);
  return (
    <div>
      {isArchived && <PageArchivedBanner />}
      {db.page_type === "landing" ? (
        <Landing db={db} />
      ) : db.page_type === "simple" ? (
        <Simple db={db} />
      ) : (
        <div className="flex flex-col justify-center align-center absolute inset-0 w-full h-screen text-center text-4xl">
          Content N/A
        </div>
      )}
    </div>
  );
}

// Pages
function Landing({ db }: { db: dbTypes }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-row h-120 w-full">
        {/* Left Content */}
        <div className="flex flex-col justify-center w-1/2 p-4 bg-gray-300/60 backdrop-blur-lg shadow pl-7">
          <h2 className="text-2xl mb-4">{db.title}</h2>
          <div className="flex flex-row gap-2 pl-5">
            <Link href="#learnmore">
              <button className="p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                Learn more
              </button>
            </Link>
          </div>
        </div>
        {/* Right Image */}
        <div className="w-1/2 relative">
          <img
            src={db.landing_image}
            alt={`A hero image for ${db.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div id="learnmore" className="min-h-screen">
        <section className="container mx-auto px-4 py-8 text-wrap">
          <Markdown render={renderer} gfm={true}>
            {db.markdown_content}
          </Markdown>
        </section>
      </div>
    </div>
  );
}

function Simple({ db }: { db: dbTypes }) {
  return (
    <div>
      <div>Hello</div>
    </div>
  );
}

/**
const createPagesSystem = await sql`
  CREATE TABLE IF NOT EXISTS pages (
  uuid TEXT PRIMARY KEY,
  slug TEXT unique not null,
  title TEXT not null,
  writer TEXT NOT NULL,
  page_type varchar(20) default 'landing' CHECK (page_type IN ('landing', 'simple', 'info')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  markdown_content text not null,
  landing_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_landing_image CHECK (
    (page_type = 'landing' AND landing_image IS NOT NULL) OR
    (page_type != 'landing')
  )
  );
  `;
 */
