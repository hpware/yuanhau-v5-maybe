import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-50 p-4">
        <nav className="space-y-4">
          <Link
            href="/admin/blog"
            className="block font-medium text-gray-700 hover:text-black"
          >
            Blog
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
