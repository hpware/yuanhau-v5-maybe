import Layout from "@/layout/default";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 300;

// Fake Posts
const posts = [
  {
    uuid: "885fa908-ed18-4dde-a376-32ff921b8783",
    name: "Testing",
    slug: "testing",
    image: "",
    content: "blah blah blah \n # blah blah",
    publishUnix: 1735619100000,
  },
  {
    uuid: "49914abd-82a1-45d2-bf2e-ecc79a65cf7c",
    name: "Testing 2",
    slug: "testing2",
    image: "/img/profile.jpg",
    content: "blah blah blah \n # blah blah",
    publishUnix: 1750495680000,
  },
  {
    uuid: "1444e7ec-2772-431a-8a89-0b3f9d864f23",
    name: "Testing 3",
    slug: "testing3",
    image: "",
    content:
      "# What is life? I think life is just a game, a fun one. \n I guess tea is good? \n  Also football is dancing.",
    publishUnix: 1750501740000,
  },
];

export default function BlogPage() {
  return (
    <Layout tab="/blog">
      <div className="justify-center align-center text-center m-2 p-2">
        <h1 className="text-4xl text-bold mt-12">Blog Posts</h1>
        <hr className="bg-gray-500/50 dark:bg-white/50 my-2 w-[80%] m-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {posts
            .sort((a, b) => b.publishUnix - a.publishUnix)
            .map((i) => (
              <Link href={`/blog/${i.slug}`} key={i.uuid} className="group">
                <div className="p-4 backdrop-blur-lg bg-gray-500/10 rounded-xl hover:bg-gray-500/20 transition-all duration-300">
                  <span className="text-2xl block mb-2">{i.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(i.publishUnix).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
}
