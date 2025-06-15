"use server";
export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <span>Hi</span>
    </div>
  );
}
