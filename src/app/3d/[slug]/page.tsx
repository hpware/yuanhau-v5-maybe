import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return (
    <div className="justify-center align-center text-center m-1 absolute inset-0 flex flex-col">
      <ViewTransition name="title">
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          3D Files
        </h1>
        <Link
          href="/"
          className="text-blue-gray-500 hover:underline text-center"
        >
          ← Back
        </Link>
      </ViewTransition>
      <span>Here is your slug: {slug}</span>
      Download File: <a href={"/3d/" + slug + "/download"}>Download</a>
    </div>
  );
}
