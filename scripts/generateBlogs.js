import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "pages", "blog");

if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

const topics = [
  "AI Microservices Tutorial for Backend Developers",
  "Best Free Developer Tools for Indian Programmers",
  "Fix Node.js Errors Beginners India",
  "JSON Formatter for Indian GST APIs",
  "Python AI Projects for Engineering Students India"
];

// slug
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/ /g, "-");
}

// create React page
function createPage(title) {
  return `
import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>${title}</title>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "${title}",
              author: { "@type": "Organization", name: "Dev-Brains-AI" },
              publisher: { "@type": "Organization", name: "Dev-Brains-AI" }
            })
          }}
        />
      </Head>

      <main style={{ padding: 20 }}>
        <h1>${title}</h1>

        <p>
          This guide is created for Indian developers using Node.js, Python, SQL,
          and AI tools.
        </p>

        <p>
          Try Dev-Brains-AI tools → https://dev-brains-ai.com/
        </p>
      </main>
    </>
  );
}
`;
}

topics.forEach((title) => {
  const slug = slugify(title);
  const filePath = path.join(BLOG_DIR, slug + ".js");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, createPage(title));
    console.log("Created:", filePath);
  } else {
    console.log("Skipped:", filePath);
  }
});