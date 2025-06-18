import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/app/placeholder.svg";
import Layout from "@/layout/default";

async function MainView({ slug }: { slug: string }) {
  return (
    <div className="justify-center align-center text-center m-1 absolute inset-0 flex flex-col">
      <Image
        alt={"An image of " + "the item"}
        src={Placeholder}
        width="500"
        height="100"
        className="justify-center align-center text-center"
      />
      <ViewTransition name="title">
        <b className="text-gray-700 inline-block">元皓的網站 v5</b>
      </ViewTransition>
      <ViewTransition name={`3d-name-${slug}`}>
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

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return (
    <div>
      <Layout tab={`/3d/${slug}`}>
        <MainView slug={slug} />
      </Layout>
    </div>
  );
}
