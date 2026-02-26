// pages/blog/encode-images-base64-data-uri-html-css.js
import Head from 'next/head';
import Link from 'next/link';

export default function EncodeImagesBase64() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Encode Images as Base64 Data URIs in HTML and CSS',
        item: 'https://dev-brains-ai.com/blog/encode-images-base64-data-uri-html-css',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Encode Images as Base64 Data URIs in HTML and CSS',
    description:
      'Learn how to embed images directly in HTML and CSS using Base64 data URIs. Covers when to use inline images, browser support, performance trade-offs, and code examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/encode-images-base64-data-uri-html-css',
  };

  return (
    <>
      <Head>
        <title>How to Encode Images as Base64 Data URIs in HTML and CSS | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how to embed images in HTML and CSS using Base64 data URIs. Covers when to use inline images, the trade-offs vs external URLs, and JavaScript/Node.js encoding examples."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/encode-images-base64-data-uri-html-css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Base64 Data URIs for Images</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Encode Images as Base64 Data URIs in HTML and CSS
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            A data URI is a URL scheme that lets you embed file contents directly in HTML or CSS
            instead of referencing an external file. For images, the content is Base64-encoded and
            prefixed with the MIME type. This eliminates an HTTP request for that asset — useful
            for small icons, loading spinners, and email templates where external URLs may be blocked.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Data URI format</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`data:[<mediatype>][;base64],<data>

# PNG example
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...

# SVG example (can be URL-encoded instead of Base64)
data:image/svg+xml;base64,PHN2ZyB4bWxucz0i...`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Using a data URI in HTML</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  alt="1x1 red pixel"
  width="1"
  height="1"
/>`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Using a data URI in CSS</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`.loading-spinner {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL...");
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
}

/* Inline favicon in HTML head */
<link rel="icon" href="data:image/png;base64,iVBORw0KGgo..." />`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Encoding an image in JavaScript (browser)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// From a file input
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    // reader.result is the full data URI string
    document.getElementById('preview').src = reader.result;
    console.log(reader.result); // data:image/png;base64,...
  };
  reader.readAsDataURL(file);
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Encoding an image in Node.js</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`import fs from 'fs';
import path from 'path';

function imageToDataUri(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mimeMap = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp' };
  const mime = mimeMap[ext] || 'application/octet-stream';
  const base64 = fs.readFileSync(filePath).toString('base64');
  return \`data:\${mime};base64,\${base64}\`;
}

const dataUri = imageToDataUri('./logo.png');
// Embed in an HTML template
const html = \`<img src="\${dataUri}" alt="Logo" />\`;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>When to use data URIs — and when not to</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>✅ <strong>Good for:</strong> small icons (under 5 KB), email templates, single-file HTML deliverables, favicons, inline SVG icons.</li>
            <li>✅ <strong>Good for:</strong> eliminating HTTP requests for critical above-the-fold images.</li>
            <li>❌ <strong>Avoid for:</strong> large images — Base64 increases size by ~33% and inflates your HTML/CSS file, hurting parse time.</li>
            <li>❌ <strong>Avoid for:</strong> images shared across many pages — they can't be cached independently when inlined.</li>
            <li>❌ <strong>Avoid for:</strong> SVGs that change at runtime — use an external <code>&lt;img&gt;</code> or inline <code>&lt;svg&gt;</code> tag instead.</li>
          </ul>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Encode and decode Base64 instantly</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use our <Link href="/base64-tool">free Base64 Encoder / Decoder</Link> to quickly
            encode text strings for use in data URIs or test decoding. For full image-to-data-URI
            conversion, use the JavaScript <code>FileReader</code> snippet above in your browser
            console.
          </p>

        </article>
      </main>
    </>
  );
}
