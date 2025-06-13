export default function Page(props: { params: Promise<{ slug: string }> }) {
  return (
    <div className="absolute inset-0 m-2 flex flex-col justify-center items-center text-center align-middle">
      <h1>HI!</h1>
      <h4>{params.slug}</h4>
    </div>
  );
}
