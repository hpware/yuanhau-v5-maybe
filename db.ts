import sql from "./src/components/pg";
const createTodos = await sql`
  CREATE TABLE IF NOT EXISTS todos (
  uuid TEXT,
  title TEXT,
  content TEXT
  )
`;

const createPages = await sql`
  CREATE TABLE IF NOT EXISTS pages (
  uuid text primary key,
  slug text unique not null,
  title text not null,
  content text not null
  )
  `;

await sql.end();
