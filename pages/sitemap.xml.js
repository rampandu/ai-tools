// pages/sitemap.xml.js

export async function getServerSideProps({ res }) {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dev-brains-ai.com";
  // normalize to avoid trailing slash issues
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  // Define all important URLs explicitly
const routes = [
  { path: "", changefreq: "daily", priority: "1.0" },

  { path: "regex-generator", changefreq: "weekly", priority: "0.9" },
  { path: "sql-generator", changefreq: "weekly", priority: "0.9" },

  { path: "blog", changefreq: "weekly", priority: "0.7" },
  { path: "blog/ai-sql-practical", changefreq: "monthly", priority: "0.6" },
  { path: "blog/regex-top-patterns", changefreq: "monthly", priority: "0.6" },

  { path: "about", changefreq: "monthly", priority: "0.5" },
  { path: "contact", changefreq: "yearly", priority: "0.3" },
  { path: "privacy", changefreq: "yearly", priority: "0.3" },
  { path: "terms", changefreq: "yearly", priority: "0.3" },
];

  const urls = routes
    .map(({ path, changefreq, priority }) => {
      const loc = path ? `${baseUrl}/${path}` : `${baseUrl}/`;
      return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
