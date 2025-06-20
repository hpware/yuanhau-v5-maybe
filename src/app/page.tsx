"use client";
import { useScroll, motion } from "motion/react";
import Layout from "@/layout/default";
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
} from "lucide-react";

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

export default function Page() {
  const { scrollYProgress } = useScroll();

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
      <div className="absolute inset-0 align-middle flex flex-col justify-center text-center h-screen">
        <ViewTransition name="title">
          <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
            Howard Wu
          </h1>
        </ViewTransition>
        <div className="flex flex-row justify-center align-middle text-center gap-2">
          {socials.map((i) => (
            <a href={i.url} aria-label={i.name} key={i.url}>
              {i.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="justify-center flex flex-col">
        <h2 className="text-3xl text-bold">關於我</h2>
        <article className="prose">
          <Markdown
            value={content.replace(/\\n/g, "\n").replace(/\n/g, "  \n")}
            breaks={true}
            gfm={true}
          />
        </article>
        <span>More</span>
        <span className="text-gray-600 text-sm">
          About content updates for every 2 hours.
        </span>
      </div>
      <div className="fixed inset-x-0 bottom-0">
        <motion.div style={{ scaleX: scrollYProgress }} />
      </div>
    </Layout>
  );
}
