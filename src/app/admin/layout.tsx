"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navBarItems = [
  {
    name: "Dashboard",
    link: "/admin",
  },
  {
    name: "Blog",
    link: "/admin/blog",
  },
  {
    name: "Pages",
    link: "/admin/pages",
  },
  {
    name: "Gallery",
    link: "/admin/gallery",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
        </div>
        <nav className="space-y-1">
          {navBarItems.map((item) => {
            const isActive = pathname === item.link || 
              (item.link !== "/admin" && pathname.startsWith(item.link));
            return (
              <Link
                key={item.link}
                href={item.link}
                className={`block px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
