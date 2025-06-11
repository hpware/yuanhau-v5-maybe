import postgres from "postgres";

export default async function Page() {
  async function create(formData: FormData) {
    "use server";
    const sql = postgres(process.env.DATABASE_URL || "", { ssl: "require" });
    const comment = formData.get("comment");
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
  }
  return (
    <div className="justify-center align-center text-center m-1 absolute inset-0 flex flex-col">
      <h1 className="text-4xl text-bold">Guestbook</h1>
      <form
        action={create}
        className="justify-center align-center text-center flex flex-row m-1"
      >
        <input
          type="text"
          placeholder="leave a comment"
          name="comment"
          className="justify-center align-center"
        />
        <button
          type="submit"
          className="rounded m-2 p-1 bg-gray-300/50 hover:bg-gray-400/50 transition-all duration-200 hover:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
