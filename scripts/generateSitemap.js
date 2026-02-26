import fs from "fs";
import path from "path";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dev-brains-ai.com";

const routes = [
  "",
  "regex-generator",
  "sql-generator",
  "json-formatter",
  "ai-error-explainer",
  "json-schema-generator",
  "blog",
  "about",
  "contact",
  "privacy",
  "terms",
];

// ----------- GET BLOG FILES -----------
const blogDir = path.join(process.cwd(), "pages", "blog");

let blogRoutes = [];

if (fs.existsSync(blogDir)) {
  blogRoutes = fs.readdirSync(blogDir)
    .filter((f) => f.endsWith(".js") && f !== "index.js")
    .map((f) => "blog/" + f.replace(".js", ""));
}

const allRoutes = [...routes, ...blogRoutes];

// ----------- CREATE XML -----------
const urls = allRoutes
  .map((r) => {
    const loc = r ? `${BASE_URL}/${r}` : `${BASE_URL}/`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
  })
  .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

// save to public folder
fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml generated!");