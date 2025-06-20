"use client";
import { useScroll, motion, useSpring } from "motion/react";
import Layout from "@/layout/default";
import Image from "next/image";
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  useEffect,
} from "react";
import Markdown from "marked-react";
import {
  GithubIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
  ChevronDownIcon,
} from "lucide-react";
import Head from "next/head";

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

export default function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [content, setContent] = useState<string>("");
  const [displayFullAbout, setDisplayFullAbout] = useState<boolean>(false);
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
        <ViewTransition name="title">
          <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
            Howard Wu
          </h1>
        </ViewTransition>
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
      <div className="absolute inset-x-0 top-[90vh] md:top-[90dvh] flex flex-row text-center justify-center align-bottom">
        Learn More <ChevronDownIcon />
      </div>
      <div className="h-screen"></div>
      <div className="flex flex-row flex-wrap gap-1">
        <section id="about"></section>
        <div className="justify-center flex flex-col text-center text-wrap backdrop-blur-lg bg-gray-500/10 rounded-xl w-full md:w-[calc(50%-10px)] px-4 py-8 max-w-3xl mx-auto">
          <h2 className="text-3xl text-bold">關於我</h2>
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
        <section id="education"></section>
        <div className="justify-center flex flex-col text-center text-wrap backdrop-blur-lg bg-gray-500/10 rounded-xl w-full md:w-[calc(50%-10px)] px-4 py-8 max-w-3xl mx-auto">
          <h2 className="text-3xl text-bold">教育</h2>
        </div>
      </div>
      {/**
        <section id="points"></section>
        <div className="flex flex-col justify-center align-center text-center">
          <div className="flex flex-row flex-wrap justify-center m-4">
            {points.map((i) => (
              <div
                className="group flex flex-col p-5 m-1 bg-gray-200 dark:bg-gray-600 rounded min-w-[25%] min-h-[20%]"
                key={i.name}
              >
                <span className="">{i.icon}</span>
                <span className="text-xl m-1 text-left">{i.name}</span>
                <span className="m-1 text-left">{i.content}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[30dvh]"></div> */}
      <div className="h-[10dvh]"></div>
      <section id="blog"></section>
      <div className="justfiy-center flex flex-col text-wrap p-2 backdrop-blur-lg bg-gray-300/10 rounded-lg m-2 md:m-4">
        <h2 className="m-2 text-2xl text-bold">
          <i>Blog Posts</i>
        </h2>
        <hr className="w-[70%] mx-2 my-1" />
        <div></div>
      </div>
    </Layout>
  );
}
