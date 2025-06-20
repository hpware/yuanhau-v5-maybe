import Image from "next/image";
import Link from "next/link";
import {
  GithubIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterIcon,
  GlobeIcon,
  ExternalLink,
} from "lucide-react";

const socials = [
  {
    name: "website",
    url: "https://yuanhau.com/",
    icon: <GlobeIcon />,
  },
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
];

const col1Links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/#about",
  },
  {
    name: "Education",
    link: "/#education",
  },
  {
    name: "Points?",
    link: "/#points",
  },
];

const col2Links = [
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "3D Stuff :D",
    link: "/3d",
  },
  {
    name: "My projects",
    link: "https://yuanhau.com/projects",
  },
  {
    name: "Source Code",
    link: "https://github.com/hpware/yuanhau-v5-maybe.git",
  },
];

export default function Footer(currentTab: { currentTab: string }) {
  return (
    <div className="relative bottom-0 inset-x-0">
      <hr className="bg-black/50 dark:bg-white/50 w-[calc(100%-30px)] justify-center align-middle self-center content-center text-center m-auto" />
      <div className="justify-center align-middle flex flex-row gap-2 mt-4 mb-2 p-1">
        <div className="flex flex-col w-[calc(50%-30px)] p-2 m-2 pl-4">
          <Image
            src="/images/profile.jpg"
            width="60"
            height="60"
            alt="Profile Picture"
            draggable="false"
            className="rounded"
          />
          <span className="text-xl">吳元皓</span>
          <div className="flex flex-row ">
            {socials.map((i) => (
              <a
                href={i.url}
                aria-label={i.name}
                key={i.url}
                className="m-1 hover:text-gray-500/60 hover:dark:text-white/60 transition-all duration-300"
              >
                {i.icon}
              </a>
            ))}
          </div>
          <div className="h-[60px]"></div>
          <span className="text-right text-gray-500">
            &copy; {new Date().getFullYear()} Yuan-Hau Wu
          </span>
        </div>
        <div className="flex flex-col w-[calc(50%-30px)] p-2 m-2">
          <h3 className="text-xl m-2">
            <i>Links</i>
          </h3>
          <div className="flex flex-row ml-4">
            {/**COL 1 */}
            <div className="flex flex-col gap-2 mr-12">
              {col1Links.map((i) => (
                <Link
                  key={i.link}
                  href={i.link}
                  className="hover:text-gray-300/50 transition-all duration-300"
                >
                  {i.name}
                </Link>
              ))}
            </div>
            {/**COL 2 */}
            <div className="flex flex-col mx-12 gap-2">
              {/**
               *               <Link href="/blog">Blog</Link>
               <Link href="/3d">3D Stuff :D</Link>
               <Link
                 href="/projects"
                 className="hover:text-gray-300/50 transition-all duration-300"
               >
                 My Projects
               </Link>
               <Link
                 href="https://github.com/hpware/yuanhau-v5-maybe.git"
                 className="flex flex-row hover:text-gray-300/50 transition-all duration-300"
               >
                 Source Code &nbsp;
                 <ExternalLink className="w-4" />
               </Link>
               */}
              {col2Links.map((i) => (
                <Link
                  key={i.link}
                  href={i.link}
                  className="hover:text-gray-300/50 transition-all duration-300 flex flex-row"
                >
                  {i.name}
                  {i.link.includes("//") && (
                    <span className="flex flex-row">
                      {" "}
                      &nbsp; <ExternalLink className="w-4" />
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
