"use server";
import Layout from "@/layout/default";
export default async function Page(props: { params: { slug: string } }) {
  const { slug } = props.params;
  return (
    <Layout tab={`/blog/${slug}`}>
      <div>
        <span className="justify-center text-center align-center  text-6xl text-bold">
          <i>You are here -&gt; {slug}</i>
        </span>
      </div>
    </Layout>
  );
}
