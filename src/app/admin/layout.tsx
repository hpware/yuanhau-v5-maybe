import Link from "next/link";

const navBarItems = [
  {
    name: "Blog",
    link: "/blog",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4">
        <h2 className="text-xl">Manage</h2>
        <nav className="space-y-4">
          {navBarItems.map((i) => (
            <Link
              key={i.link}
              href={`/admin${i.link}`}
              className="block font-medium text-gray-700 hover:text-black"
            >
              {i.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
