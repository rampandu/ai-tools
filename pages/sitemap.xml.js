// pages/sitemap.xml.js
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const staticPages = [
  '',
  'regex-generator',
  'sql-generator',
  'privacy'
];

export function getServerSideProps({ res }) {
  const baseUrl = SITE_URL.replace(/\/$/, '');
  const pages = staticPages.map(p => `${baseUrl}/${p}`.replace(/\/$/, '/'));
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(url => `
      <url>
        <loc>${url}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  // getServerSideProps handles the response.
  return null;
}
