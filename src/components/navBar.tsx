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
    url: "/about",
  },
  {
    name: "3D",
    url: "/3d",
  },
];

export default function NavBar(currentTab: { currentTab: string }) {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="w-full m-2 p-1 flex flex-row absolute inset-x-0 justify-between">
          <div>
            <Image src="/logo.png" width="200" alt="Profile Pic" />
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
            <ThemeToggle />
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden block">
        <div className="w-full m-2 p-1 flex flex-row absolute inset-x-0 justify-between">
          <div>
            <Image src="/logo.png" width="200" alt="Profile Pic" />
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
