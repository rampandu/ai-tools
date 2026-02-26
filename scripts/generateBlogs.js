import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "pages", "blog");

if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

const topics = [
"Regex for Indian Phone Number Validation",
"Regex for Aadhaar Card Validation",
"Regex for PAN Card Validation",
"Regex for GST Number Validation",
"Regex for IFSC Code Validation",
"Regex for Indian PIN Code Validation",
"Regex for Email Validation JavaScript Example",
"Regex for Password Validation Rules",
"Top 50 Useful Regex Patterns for Developers",
"Regex Cheat Sheet for Backend Developers",
"Top SQL Interview Questions TCS Infosys Wipro",
"SQL Queries Asked in Accenture Capgemini Interviews",
"50 SQL Queries for Freshers in India",
"SQL Join Interview Questions With Examples",
"SQL Query for Duplicate Records Detection",
"SQL Query for Sales Report Dashboard",
"SQL Optimization Techniques for Large Tables",
"MySQL vs PostgreSQL Performance Comparison",
"Common SQL Errors and Fix Using AI",
"SQL Query Generator Tutorial for Beginners",
"JSON Formatter for Indian GST APIs",
"Fix Invalid JSON Error in Node.js",
"How to Validate JSON in Python and JavaScript",
"JSON Schema Generator Tutorial With Examples",
"Common API Errors and How to Fix Them",
"How to Debug REST API Errors Using AI",
"AI Microservices Tutorial for Backend Developers",
"AI Anomaly Detection for Server Logs Python Example",
"AI Projects for Engineering Students India",
"Best AI Projects for Final Year BTech"
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