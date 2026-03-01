import Link from "next/link";
import { CreatePageForm } from "./CreatePageForm";

export default function CreatePagePage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/pages"
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </Link>
        <h1 className="text-3xl font-bold">Create New Page</h1>
      </div>

      <CreatePageForm />
    </div>
  );
}
