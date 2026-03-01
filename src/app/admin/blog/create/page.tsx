import Link from "next/link";
import { CreateBlogForm } from "./CreateBlogForm";

export default function CreateBlogPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/blog"
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </Link>
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>

      <CreateBlogForm />
    </div>
  );
}
