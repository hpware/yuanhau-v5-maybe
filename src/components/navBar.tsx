import Link from "next/link";
import ThemeToggle from "../app/ThemeToggle";
import { AuthButtons } from "./auth-buttons";

const tabs = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Gallery",
    url: "/gallery",
  },
];

export default function NavBar(currentTab: { currentTab: string }) {
  const desktopSize = "50";
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex flex-row fixed z-50 right-0 px-7 py-6 align-right justify-right">
          <div className="flex items-center z-50 gap-1 bg-gray-100/5 border border-accent backdrop-blur-xl shadow-lg p-2 rounded-lg">
            {tabs.map((tab) => (
              <Link
                href={tab.url}
                key={tab.url}
                className={`mx-1 ${
                  currentTab.currentTab === tab.url ? "font-bold" : ""
                }
                  p-2 rounded-lg hover:bg-gray-500/20 z-50 hover:dark:bg-white/20 shadow-lg border border-accent dark:border-0 transition-all duration-300`}
              >
                {tab.name}
              </Link>
            ))}
            <ThemeToggle />
            <div className="pl-1"></div>
            <AuthButtons />
            <div className="pl-1"></div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden block">
        <div className="w-full z-50 flex flex-row fixed inset-x-0 justify-center mt-4">
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
            <AuthButtons />
            <div className="pl-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
