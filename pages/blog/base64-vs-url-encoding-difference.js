// pages/blog/base64-vs-url-encoding-difference.js
import Head from 'next/head';
import Link from 'next/link';

export default function Base64VsUrlEncoding() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Base64 vs URL Encoding — Key Differences Explained',
        item: 'https://dev-brains-ai.com/blog/base64-vs-url-encoding-difference',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Base64 vs URL Encoding — Key Differences Explained',
    description:
      'Understand the key differences between Base64 encoding and URL percent-encoding. When to use each, how they work under the hood, and practical JavaScript examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/base64-vs-url-encoding-difference',
  };

  return (
    <>
      <Head>
        <title>Base64 vs URL Encoding — Key Differences Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="Understand the key differences between Base64 and URL percent-encoding. When to use each, output size, character sets, and practical JavaScript examples for developers."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/base64-vs-url-encoding-difference" />
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
              <li aria-current="page">Base64 vs URL Encoding</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Base64 vs URL Encoding — Key Differences Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Both Base64 and URL encoding (percent-encoding) convert data into a safe text format —
            but they solve very different problems and produce very different output. Confusing the
            two is a common source of bugs. This guide explains each one, when to use it, and how
            the output compares.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>The core difference</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>
              <strong>Base64</strong> — converts binary data (bytes) into a fixed 64-character
              alphabet (A–Z, a–z, 0–9, +, /). Used to safely represent binary data as text.
            </li>
            <li>
              <strong>URL encoding (percent-encoding)</strong> — encodes characters that have
              special meaning in a URL (like <code>&amp;</code>, <code>=</code>, spaces) so they
              are treated as literal data. Used to make text safe for inclusion in a URL.
            </li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Side-by-side comparison</h2>
          <div style={{ overflowX: 'auto', marginBottom: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Property</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Base64</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>URL Encoding</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Purpose', 'Binary data → text', 'Text → URL-safe text'],
                  ['Output characters', 'A–Z a–z 0–9 + / =', 'Original + %XX sequences'],
                  ['Size increase', '~33%', 'Varies (1–3x for special chars)'],
                  ['Reversible', 'Yes', 'Yes'],
                  ['Works in URLs', 'Partially (+ and / clash)', 'Yes — that is the point'],
                  ['Handles binary', 'Yes', 'No (text only)'],
                  ['JS encode fn', 'btoa() / Buffer.from()', 'encodeURIComponent()'],
                  ['JS decode fn', 'atob() / Buffer.from()', 'decodeURIComponent()'],
                ].map(([prop, b64, url], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{prop}</td>
                    <td style={{ padding: '8px 12px' }}>{b64}</td>
                    <td style={{ padding: '8px 12px' }}>{url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Encoding the same string — output comparison</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`const input = 'hello world & price=₹500';

// Base64
btoa(input);
// Error! btoa() can't handle ₹ (multi-byte)
// Correct approach:
Buffer.from(input).toString('base64');
// → 'aGVsbG8gd29ybGQgJiBwcmljZT3igrQ1MDA='

// URL encoding
encodeURIComponent(input);
// → 'hello%20world%20%26%20price%3D%E2%82%B9500'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>When to use Base64</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Embedding images, fonts, or files as inline data URIs in HTML/CSS</li>
            <li>Encoding binary file content for inclusion in a JSON field</li>
            <li>HTTP Basic Authentication credentials</li>
            <li>The payload and header sections of a JWT token</li>
            <li>Email MIME attachments</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>When to use URL encoding</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Encoding user search input for a query string parameter</li>
            <li>Including a redirect URL as a query parameter</li>
            <li>Encoding form data submitted via <code>application/x-www-form-urlencoded</code></li>
            <li>Making REST API parameters with spaces or special characters safe</li>
            <li>Encoding non-ASCII filenames in Content-Disposition headers</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>URL-safe Base64 — bridging the gap</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            When you need Base64 inside a URL (e.g., in a JWT), use URL-safe Base64 which replaces{' '}
            <code>+</code> → <code>-</code> and <code>/</code> → <code>_</code> and removes
            padding <code>=</code> signs. This avoids conflicts with URL-structural characters
            while keeping the Base64 encoding scheme.
          </p>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Try both tools in your browser</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use our <Link href="/base64-tool">Base64 Encoder / Decoder</Link> or{' '}
            <Link href="/url-encoder">URL Encoder / Decoder</Link> to test encoding instantly —
            both tools run entirely in your browser with no data uploaded.
          </p>

        </article>
      </main>
    </>
  );
}
