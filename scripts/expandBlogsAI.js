import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";


dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BLOG_DIR = path.join(process.cwd(), "pages", "blog");

async function expandBlog(title) {
  const prompt = `
Write a 1500-2000 word SEO blog for Indian developers.

Title: ${title}

Requirements:
- Target Node.js, Python, SQL developers in India
- Include examples
- Include code snippets
- Include FAQs
- Include internal links to https://dev-brains-ai.com tools
- Include real use cases in India
- Clear headings (H2/H3)
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return res.choices[0].message.content;
}

async function run() {
  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".js") && f !== "index.js");

  for (const file of files) {
    const slug = file.replace(".js", "");
    const title = slug.replace(/-/g, " ");

    console.log("Expanding:", slug);

    const content = await expandBlog(title);

    const page = `
import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>${title}</title>
      </Head>

      <main style={{ padding: 20, maxWidth: 900 }}>
        <div dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g,"\\`")}\` }} />
      </main>
    </>
  );
}
`;

    fs.writeFileSync(path.join(BLOG_DIR, file), page);
    console.log("Updated:", file);
  }
}

run();