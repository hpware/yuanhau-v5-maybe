import Layout from "@/layout/default";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

interface GalleryInterface {
  uuid: string;
  name: string;
  slug: string;
  indexImage: string;
  created_at: string;
  updated_at: string;
}

function Loading() {
  return (
    <div>
      <div>Hi</div>
    </div>
  );
}

async function ClientPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <GalleryComponent db={{uuid: uuidv4(), name: "Hi", slug: uuidv4(), indexImage: ""}} />
    </div>
  );
}

function GalleryComponent({ db }: { db: GalleryInterface }) {
  return (
    <div>
      <div></div>
    </div>
  );
}

export default function Page() {
  return (
    <Layout tab="/gallery">
      <div className="h-[20px]"></div>
      <div className="justify-center align-center text-center m-2 p-2">
        <h1 className={`text-4xl text-bold mt-12 ${roboto.variable}`}>
          Gallery
        </h1>
        <hr className="bg-gray-500/50 dark:bg-white/50 my-2 w-[80%] m-auto" />
        <Suspense fallback={<Loading />}>
          <ClientPage />
        </Suspense>
      </div>
    </Layout>
  );
}
