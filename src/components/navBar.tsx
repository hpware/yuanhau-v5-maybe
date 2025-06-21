import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../app/ThemeToggle";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";

const tabs = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/#about",
  },
  {
    name: "3D",
    url: "/3d",
  },
];

export default function NavBar(currentTab: { currentTab: string }) {
  const desktopSize = "50";
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="w-full flex flex-row fixed inset-x-0 justify-between px-7 py-6">
          <div>
            {/**            <Image
              src="/favicon.ico"
              width={desktopSize}
              height={desktopSize}
              alt="Profile Pic"
            /> */}
          </div>
          <div className="flex items-center gap-1 bg-gray-100/5 border border-accent backdrop-blur-xl shadow-lg p-2 rounded-lg">
            {tabs.map((tab) => (
              <Link
                href={tab.url}
                key={tab.url}
                className={`mx-1 ${
                  currentTab.currentTab === tab.url ? "font-bold" : ""
                }
                  p-2 rounded-lg hover:bg-gray-500/20 hover:dark:bg-white/20 shadow-lg border border-accent dark:border-0 transition-all duration-300`}
              >
                {tab.name}
              </Link>
            ))}
            <ThemeToggle />
            <div className="pl-1"></div>
            <SignedOut>
              <SignInButton>
                <button className="hover:cursor-pointer p-2 rounded-lg hover:bg-gray-500/20 hover:dark:bg-white/20 shadow-lg border border-accent dark:border-0 transition-all duration-300">
                  <LogInIcon />
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <div className="pl-1"></div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden block">
        <div className="w-full flex flex-row fixed inset-x-0 justify-center mt-4">
          <div className="flex items-center gap-1 bg-gray-100/5 border border-accent backdrop-blur-xl shadow-lg p-2 rounded-lg">
            {tabs.map((tab) => (
              <Link
                href={tab.url}
                key={tab.url}
                className={`mx-1 ${
                  currentTab.currentTab === tab.url ? "font-bold" : ""
                }
                  p-2 rounded-lg hover:bg-gray-500/20 hover:dark:bg-white/20 shadow-lg border border-accent dark:border-0 transition-all duration-300`}
              >
                {tab.name}
              </Link>
            ))}
            <ThemeToggle />
            <div className="pl-1"></div>
            <SignedOut>
              <SignInButton>
                <button className="hover:cursor-pointer p-2 rounded-lg hover:bg-gray-500/20 hover:dark:bg-white/20 shadow-lg border border-accent dark:border-0 transition-all duration-300">
                  <LogInIcon />
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <div className="pl-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
