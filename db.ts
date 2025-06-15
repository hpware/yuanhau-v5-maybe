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
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      markdown_content LONGTEXT NOT NULL,
      status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  `;

await sql.end();
