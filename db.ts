import sql from "./src/components/pg";
const createTodos = await sql`
  CREATE TABLE IF NOT EXISTS todos (
  uuid TEXT,
  title TEXT,
  content TEXT
  )
`;

const createBlog = await sql`
  CREATE TABLE IF NOT EXISTS blog (
      uuid text primary key,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      markdown_content TEXT NOT NULL,
      writer JSONB NOT NULL,
      status VARCHAR(20) DEFAULT 'draft',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
  `;

const createBlogTriggers = await sql`
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;`;

const createBlogTriggers2 = await sql`
CREATE TRIGGER update_blog_updated_at
BEFORE UPDATE ON blog
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();`;

const createMDContent = await sql`
  CREATE TABLE IF NOT EXISTS mdcontent (
   uuid TEXT PRIMARY KEY,
   slug TEXT unique not null,
   content TEXT not null
  )`;

await sql.end();
