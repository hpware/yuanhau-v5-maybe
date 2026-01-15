"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navBarItems = [
  {
    name: "admin",
    link: "/admin",
  },
  {
    name: "Blog",
    link: "/admin/blog",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4">
        <nav className="space-y-2">
          {navBarItems.map((i) => (
            <Link
              key={i.link}
              href={i.link}
              className={`block font-medium text-gray-700 hover:text-black dark:hover:text-white transition-all duration-300 ${pathname === i.link && " text-white text-2xl"}`}
            >
              {i.name}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
