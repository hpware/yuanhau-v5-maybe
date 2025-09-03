"use client";
import { motion } from "motion/react";
import Layout from "@/layout/default";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Markdown from "marked-react";
import { Progress } from "@/components/ui/progress";
import { GetIcon } from "@/icons";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api.js";
import {
  GithubIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
  ChevronDownIcon,
} from "lucide-react";
import Head from "next/head";
import getEducationContent from "./getEducationContent";

function GetAboutMe() {
  const [displayFullAbout, setDisplayFullAbout] = useState<boolean>(false);
  const query = useQuery(api.app.getMDContent, { slug: "about" });
  if (query === undefined) {
    return (
      <div className="h-fit justify-center flex flex-col text-center text-wrap backdrop-blur-lg bg-gray-500/10 rounded-xl px-4 py-8">
        <section id="about"></section>
        <h2 className="text-3xl text-bold align-top">關於我</h2>
        <div className="relative overflow-hidden">
          <div>Loading...</div>
        </div>
      </div>
    );
  }
  const content = query[0].content || "Data not available (yet).";

  // Safe to use content here
  return (
    <div className="h-fit justify-center flex flex-col text-center text-wrap backdrop-blur-lg bg-gray-500/10 rounded-xl px-4 py-8">
      <section id="about"></section>
      <h2 className="text-3xl text-bold align-top">關於我</h2>
      <div className="relative overflow-hidden">
        <motion.article
          className="prose m-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Markdown
            value={
              displayFullAbout
                ? content.replace(/\\n/g, "\n").replace(/\n/g, "  \n")
                : content
                    .split("\n")
                    .slice(0, 20)
                    .join("\n")
                    .replace(/\\n/g, "\n")
                    .replace(/\n/g, "  \n")
            }
            breaks={true}
            gfm={true}
          />
        </motion.article>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: !displayFullAbout ? 1 : 0,
            height: !displayFullAbout ? "100%" : "0%",
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {!displayFullAbout && (
            <div className="h-full bg-gradient-to-b from-transparent via-white/30 to-white dark:via-gray-900/30 dark:to-gray-900" />
          )}
        </motion.div>
      </div>

      <button
        onClick={() => setDisplayFullAbout(!displayFullAbout)}
        className="p-2 bg-gray-300 dark:bg-gray-600 m-2 justify-center align-middle self-center content-center text-center border w-fit rounded hover:cursor-pointer hover:bg-gray-500/50 hover:dark:bg-gray-700/50 hover:border-gray-50 transition-all duration-300"
      >
        {displayFullAbout ? "Show Less" : "Show More"}
      </button>
      <motion.span
        className="text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        About content updates for every 2 hours.
      </motion.span>
    </div>
  );
}

const socials = [
  {
    name: "github",
    url: "https://github.com/hpware",
    icon: <GithubIcon />,
  },
/**
 *   {
    name: "instagram",
    url: "https://instagram.com/yhw_tw",
    icon: <InstagramIcon />,
  },
  {
    name: "threads",
    url: "https://threads.net/@yhw_tw",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161" />
      </svg>
    ),
  },
 */
  {
    name: "Twitter (X)",
    url: "https://twitter.com/ictechz",
    icon: <TwitterIcon />,
  },
  {
    name: "youtube",
    url: "https://youtube.com/@號",
    icon: <YoutubeIcon />,
  },
  {
    name: "email",
    url: "mailto:pv@yuanhau.com",
    icon: <MailIcon />,
  },
];

const progressMap = [
  {
    icon: <GetIcon name="vue" />,
    name: "VueJS",
    percent: 60,
  },
  {
    icon: <GetIcon name="react" />,
    name: "React",
    percent: 1,
  },
  {
    icon: <GetIcon name="tailwind" />,
    name: "Tailwind",
    percent: 50,
  },
  {
    icon: <i className="bi bi-filetype-html"></i>,
    name: "HTML",
    percent: 80,
  },
];

const images = [
  "https://s3.yhw.tw/scharchive/bgimage.jpg",
  "https://s3.yhw.tw/data/bg/bryan-brittos-kNNJAN2jpTI-unsplash.jpg",
];

export default function Page() {
  const [education, setEducationContent] = useState<
    {
      item: number;
      icon: string;
      name: string;
      content: string;
      year: string;
    }[]
  >([
    {
      item: 1,
      icon: "university",
      name: "五專",
      content:
        "Fifth Vocational School Student (3 High School years + 2 University years)",
      year: "September 2024",
    },
  ]);
  const [educationLoading, setEducationLoading] = useState<boolean>(true);
  const [blogContent, setBlogContent] = useState<{
    items: {
      id: number;
      contentId: string;
      title: string;
      content: string;
    }[];
  }>();
  useEffect(() => {
    async function getEducationContent2() {
      const educationContent = await getEducationContent();
      setEducationContent(educationContent.items);
      setEducationLoading(false);
    }
    // Run all
    getEducationContent2();
  }, []);

  const transition = {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  };
  return (
    <Layout tab="/">
      <Head>
        <title>首頁 | Howard</title>
      </Head>
      <div className="absolute inset-0 align-middle flex flex-col justify-center text-center h-screen">
        <Image
          src="/images/profile.jpg"
          width="250"
          height="250"
          alt="Profile Picture"
          draggable="false"
          className="rounded-full justify-center align-middle content-center self-center text-center border shadow-lg border-gray-100/30 backdrop-blur-lg"
        />
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Howard Wu
        </h1>
        <div className="flex flex-row justify-center align-middle text-center gap-2">
          {socials.map((i) => (
            <a
              href={i.url}
              aria-label={i.name}
              key={i.url}
              className="hover:text-gray-500/60 hover:dark:text-white/60 transition-all duration-300"
            >
              {i.icon}
            </a>
          ))}
        </div>
      </div>
      <Link href="/#learnmore">
        <motion.div
          animate={{ y: [0, 20] }}
          transition={transition}
          className="absolute inset-x-0 top-[90vh] md:top-[90dvh] flex flex-row text-center justify-center align-bottom"
        >
          Learn More <ChevronDownIcon />
        </motion.div>
      </Link>
      <div className="h-screen"></div>
      <div className="h-[1dvh]"></div>
      <div className="overflow-hidden w-full relative flex flex-col">
        <ul className="whitespace-nowrap animate-[ticker-to-left_5s_linear_infinite] will-change-transform flex flex-row gap-2 transform-[translateX(0)]">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} className="text-5xl">
              關於我
            </span>
          ))}
        </ul>
      </div>
      <div className="overflow-hidden w-full relative">
        <ul className="whitespace-nowrap animate-[ticker-to-right_20s_linear_infinite] will-change-transform flex flex-row gap-2 transform-[translateX(-150vw)]">
          {Array.from({ length: 50 }).map((_, i) => (
            <li key={i} className="mx-4 inline-block">
              ABOUT ME
            </li>
          ))}
          {Array.from({ length: 50 }).map((_, i) => (
            <li
              key={`dup-${i}`}
              className="mx-4 inline-block"
              aria-hidden="true"
            >
              ABOUT ME
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[1dvh]"></div>
      <section id="learnmore"></section>
      <div className="container mx-auto px-4">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-auto">
          <GetAboutMe />
          <div className="flex flex-col flex-wrap gap-2">
            <div className="h-fit justify-center flex flex-col text-center text-wrap backdrop-blur-lg bg-gray-500/10 rounded-xl px-4 py-8">
              <section id="education"></section>
              <h2 className="text-3xl text-bold align-top">教育</h2>
              {educationLoading ? (
                <span>Loading...</span>
              ) : (
                education
                  .sort((a, b) => b.item - a.item)
                  .map((edu, index, array) => (
                    <div key={index} className="relative">
                      <div className="flex flex-row items-center gap-4 p-4">
                        <div className="relative">
                          <span className="border-4 border-orange-500 rounded-full flex justify-center items-center p-2 bg-white dark:bg-gray-800 z-10 relative">
                            <GetIcon name={edu.icon} />
                          </span>
                          {index < array.length - 1 && (
                            <motion.svg
                              className="absolute top-[50%] left-[50%] -translate-x-1/2 translate-y-0 z-0"
                              width="2"
                              height="100"
                              viewBox="0 0 2 100"
                            >
                              <motion.line
                                x1="1"
                                y1="0"
                                x2="1"
                                y2="100"
                                stroke="orange"
                                strokeWidth="3"
                                strokeDasharray="4"
                                initial={{ strokeDashoffset: 0 }}
                                animate={{ strokeDashoffset: 100 }}
                                transition={{
                                  duration: 10,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                            </motion.svg>
                          )}
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-xl font-bold">{edu.name}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {edu.year}
                          </span>
                          <span className="text-sm">{edu.content}</span>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
            <div className="flex flex-col text-center text-wrap backdrop-blur-lg bg-gray-500/10 rounded-xl p-4 overflow-y-auto">
              <section id="code_progress"></section>
              <h2 className="text-3xl text-bold align-top">程式進度</h2>
              {progressMap.map((i) => (
                <div key={i.name} className="flex flex-col">
                  <div className="flex flex-row">
                    <div className="w-7 p-1 text-black dark:text-white fill-black dark:fill-white">
                      {i.icon}
                    </div>
                    <span className="text-lg">{i.name}:</span>
                  </div>
                  <div className="flex flex-row w-full">
                    <Progress
                      value={i.percent}
                      className="rounded border w-full mx-2 my-1 text-black h-4"
                    />
                    <span className="w-12">{i.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[10dvh]"></div>
      <div className="flex flex-row item-center text-center justify-center algin-middle">
        <span className="text-[150px] m-0 p-0 dark:text-white/30 text-black/20 leading-none translate-x-8 -translate-y-8 select-none">
          “
        </span>
        <div className="text-3xl font-bold">
          This summer, Do something different.
        </div>
        <span className="text-[150px] m-0 p-0 dark:text-white/30 text-black/20 leading-none -translate-x-8 -translate-y-2 select-none">
          ”
        </span>
      </div>
      {/**      <section id="images"></section>
<div className="flex flex-col justify-center align-center text-center">
  <div className="flex flex-row flex-wrap justify-center m-4"></div>
</div>
<div className="h-[5dvh]"></div>

<section id="blog"></section>
      <div className="justfiy-center flex flex-col text-wrap p-2 backdrop-blur-lg bg-gray-300/10 rounded-lg m-2 md:m-4">
        <h2 className="m-2 text-2xl text-bold">
          <i>Blog Posts</i>
        </h2>
        <hr className="w-[70%] mx-2 my-1" />
      </div> */}
    </Layout>
  );
}
