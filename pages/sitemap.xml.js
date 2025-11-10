// pages/sitemap.xml.js

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dev-brains-ai.com";

  // Add all important URLs here
  const pages = [
    "",
    "regex-generator",
    "sql-generator",
    "about",
    "contact",
    "terms",
    "blog/regex-examples",
    "blog/ai-sql-helper",
  ];

  const urls = pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}/${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`
    )
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
