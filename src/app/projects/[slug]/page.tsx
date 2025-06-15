export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return (
    <div className="absolute inset-0 m-2 flex flex-col justify-center items-center text-center align-middle">
      <h1>HI!</h1>
      <h4>{slug}</h4>
    </div>
  );
}
