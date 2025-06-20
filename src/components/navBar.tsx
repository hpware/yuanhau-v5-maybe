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
        <div className="w-full p-2 flex flex-row fixed inset-x-0 justify-between">
          <div>
            <Image
              src="/favicon.ico"
              width={desktopSize}
              height={desktopSize}
              alt="Profile Pic"
            />
          </div>
          <div className="gap-2">
            {tabs.map((tab) => (
              <Link
                href={tab.url}
                key={tab.url}
                className={`px-3 py-2 ${currentTab.currentTab === tab.url ? "font-bold" : ""}`}
              >
                {tab.name}
              </Link>
            ))}
            <SignedOut>
              <SignInButton>Login</SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ThemeToggle />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden block">
        <div className="w-full flex flex-row fixed inset-x-0 justify-between">
          <div>
            <div>
              <Image
                src="/favicon.ico"
                width={desktopSize}
                height={desktopSize}
                alt="Profile Pic"
              />
            </div>
          </div>
          <div className="gap-2">
            {tabs.map((tab) => (
              <Link
                href={tab.url}
                key={tab.url}
                className={`px-3 py-2 ${currentTab.currentTab === tab.name ? "font-bold" : ""}`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
