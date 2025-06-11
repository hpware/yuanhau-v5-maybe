export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return (
    <div>
      <h1>Here is your slug: {slug}</h1>
    </div>
  );
}
