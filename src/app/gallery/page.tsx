import Layout from "@/layout/default";
import { Suspense } from "react";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { v4 as uuidv4 } from "uuid";
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
      <GalleryComponent
        db={{
          uuid: uuidv4(),
          name: "Hi",
          slug: uuidv4(),
          indexImage:
            "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
          created_at: "2025-07-04 13:32:55.914494+00",
          updated_at: "2025-07-04 13:32:55.914494+00",
        }}
      />
      <GalleryComponent
        db={{
          uuid: uuidv4(),
          name: "Hi",
          slug: uuidv4(),
          indexImage:
            "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
          created_at: "2025-07-04 13:32:55.914494+00",
          updated_at: "2025-07-04 13:32:55.914494+00",
        }}
      />
      <GalleryComponent
        db={{
          uuid: uuidv4(),
          name: "Hi",
          slug: uuidv4(),
          indexImage:
            "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
          created_at: "2025-07-04 13:32:55.914494+00",
          updated_at: "2025-07-04 13:32:55.914494+00",
        }}
      />
    </div>
  );
}

function GalleryComponent({ db }: { db: GalleryInterface }) {
  const createdDate = new Date(db.created_at).toLocaleString("zh-TW");
  const updatedDate = new Date(db.updated_at).toLocaleString("zh-TW");

  return (
    <Link
      href={`/gallery/albums/${db.slug}`}
      className="group relative overflow-hidden rounded-lg shadow-lg my-2 mx-2 transition-all duration-300 bg-gray-100 dark:bg-gray-800"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={db.indexImage}
          alt={db.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col p-2 bg-gray-100/30 dark:bg-gray-700/30 backdrop-blur-sm bottom-0 inset-x-0 absolute text-black dark:text-white">
        <span className="text-lg font-semibold truncate">{db.name}</span>
        <span className="text-sm opacity-75 truncate">建立：{createdDate}</span>
        <span className="text-sm opacity-75 truncate">更新：{updatedDate}</span>
      </div>
    </Link>
  );
}

export default async function Page() {
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
