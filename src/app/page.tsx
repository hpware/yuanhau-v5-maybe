"use client";
import { useScroll, motion, useSpring, useTransform } from "motion/react";
import Layout from "@/layout/default";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Markdown from "marked-react";
import { Progress } from "@/components/ui/progress";
import { v4 as uuidv4 } from "uuid";
import {
  GithubIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
  ChevronDownIcon,
  UniversityIcon,
  ScrollTextIcon,
} from "lucide-react";
import Head from "next/head";
import HCIcons from "@hackclub/icons";

const socials = [
  {
    name: "github",
    url: "https://github.com/hpware",
    icon: <GithubIcon />,
  },
  {
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
    url: "mailto:yhcom+v5@yuanhau.com",
    icon: <MailIcon />,
  },
];

const points = [
  {
    name: "?",
    content: "What?",
    icon: <MailIcon />,
  },
];

const education = [
  {
    item: 3,
    icon: <ScrollTextIcon />,
    name: "文書處理丙級證照",
    content:
      "This is not even worth the 1000+ NTD I paid. It cannot even help me find a job bro.",
    year: "June 2025",
  },
  {
    item: 2,
    icon: <HCIcons glyph="clubs" size={24} />,
    name: "Hack Club",
    content: "Wait, so this counts?",
    year: "Feburary 2025",
  },
  {
    item: 1,
    icon: <UniversityIcon />,
    name: "五專",
    content:
      "Fifth Vocational School Student (3 High School years + 2 University years)",
    year: "September 2024",
  },
];

// Fake Posts
const posts = [
  {
    name: "Testing",
    image: "",
    content: "blah blah blah \n # blah blah",
  },
  {
    name: "Testing 2",
    image: "/img/profile.jpg",
    content: "blah blah blah \n # blah blah",
  },
  {
    name: "Testing 3",
    image: "",
    content:
      "# What is life? I think life is just a game, a fun one. \n I guess tea is good? \n  Also football is dancing.",
  },
];

const progressMap = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z" />
      </svg>
    ),
    name: "VueJS",
    percent: 60,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1 .9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2 .6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6 .4 19.5 .6 29.5 .6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8 .9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z" />
      </svg>
    ),
    name: "React",
    percent: 1,
  },
  {
    icon: (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        id="Tailwind-Css-Fill--Streamline-Remix-Fill"
        height="16"
        width="16"
      >
        <path
          d="M7.9997333333333325 3.239993333333333c-2.1155466666666665 0 -3.437773333333333 1.0577733333333332 -3.9666599999999996 3.173333333333333 0.7933333333333332 -1.05778 1.7188866666666665 -1.4544466666666667 2.77666 -1.19 0.6035999999999999 0.15073333333333333 1.0346666666666666 0.5883866666666666 1.5126 1.07364C9.100466666666666 7.086333333333333 10.000266666666667 8 11.9664 8c2.115533333333333 0 3.4377999999999997 -1.0577999999999999 3.966666666666667 -3.1733466666666663 -0.7933333333333332 1.05778 -1.7188666666666665 1.4544466666666667 -2.7766666666666664 1.1900066666666667 -0.6035999999999999 -0.15073333333333333 -1.0346 -0.5883933333333333 -1.5126 -1.0736466666666666 -0.7774666666666665 -0.7893666666666667 -1.6772666666666665 -1.70302 -3.6440666666666663 -1.70302ZM4.033073333333333 8C1.91752 8 0.5952953333333333 9.0578 0.06640626666666666 11.173333333333334 0.85974 10.115533333333332 1.7852933333333332 9.718866666666667 2.8430733333333333 9.983333333333333c0.6035933333333333 0.15073333333333333 1.03464 0.5884 1.51262 1.0736666666666665 0.7781266666666666 0.7893333333333332 1.6778999999999997 1.7029999999999998 3.6440399999999995 1.7029999999999998 2.115533333333333 0 3.4377999999999997 -1.0577999999999999 3.966666666666667 -3.173333333333333 -0.7933333333333332 1.0577999999999999 -1.7188666666666665 1.4544666666666668 -2.7766666666666664 1.19 -0.6035999999999999 -0.15073333333333333 -1.0346666666666666 -0.5884 -1.5126 -1.0736666666666665C6.899666666666667 8.913666666666666 5.999879999999999 8 4.033073333333333 8Z"
          stroke-width="0.6667"
        ></path>
      </svg>
    ),
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

async function getBlogContent() {
  "use server";
  return {
    items: [
      {
        id: 1,
        contentId: uuidv4(),
        title: "Hi",
        content: "21922391",
      },
    ],
  };
}

export default function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [content, setContent] = useState<string>("");
  const [displayFullAbout, setDisplayFullAbout] = useState<boolean>(false);
  const [randomImage, setRandomImage] = useState<string>("");
  const [blogContent, setBlogContent] = useState<[]>([]);
  // Loading statuses
  const [aboutLoading, setAboutLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchcontent = async () => {
      try {
        const req = await fetch("/api/mdcontent/about");
        const res = await req.json();
        setContent(res.content || "");
      } catch (e) {
        console.log(e);
      }
    };
    fetchcontent();
    const interval = setInterval(async () => {
      fetchcontent();
    }, 9600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getData() {
      setBlogContent(await getBlogContent());
    }
    getData();
  }, []);

  const transition = {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  };

  useEffect(() => {
    setRandomImage(images[0]);
  }, []);

  return (
    <Layout tab="/">
      <Head>
        <title>首頁 | 吳元皓</title>
      </Head>
      <motion.div
        className="fixed inset-x-0 top-0 h-1 bg-blue-500 origin-[0%] z-50"
        style={{ scaleX }}
      />
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
        <ul className="flex whitespace-nowrap animate-[ticker-to-left_5s_linear_infinite] will-change-transform flex flex-row gap-2 transform-[translateX(0)]">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} className="text-5xl">
              關於我
            </span>
          ))}
        </ul>
      </div>
      <div className="overflow-hidden w-full relative">
        <ul className="flex whitespace-nowrap animate-[ticker-to-right_20s_linear_infinite] will-change-transform flex flex-row gap-2 transform-[translateX(-150vw)]">
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
          <div className="flex flex-col flex-wrap gap-2">
            <div className="h-fit justify-center flex flex-col text-center text-wrap backdrop-blur-lg bg-gray-500/10 rounded-xl px-4 py-8">
              <section id="education"></section>
              <h2 className="text-3xl text-bold align-top">教育</h2>
              {education
                .sort((a, b) => b.item - a.item)
                .map((edu, index, array) => (
                  <div key={index} className="relative">
                    <div className="flex flex-row items-center gap-4 p-4">
                      <div className="relative">
                        <span className="border-4 border-orange-500 rounded-full flex justify-center items-center p-2 bg-white dark:bg-gray-800 z-10 relative">
                          {edu.icon}
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
                ))}
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
      <section id="images"></section>
      <div className="flex flex-col justify-center align-center text-center">
        <div className="flex flex-row flex-wrap justify-center m-4"></div>
      </div>
      <div className="h-[10dvh]"></div>
      <section id="blog"></section>
      <div className="justfiy-center flex flex-col text-wrap p-2 backdrop-blur-lg bg-gray-300/10 rounded-lg m-2 md:m-4">
        <h2 className="m-2 text-2xl text-bold">
          <i>Blog Posts</i>
        </h2>
        <hr className="w-[70%] mx-2 my-1" />
      </div>
    </Layout>
  );
}
