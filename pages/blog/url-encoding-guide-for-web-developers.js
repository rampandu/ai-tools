// pages/blog/url-encoding-guide-for-web-developers.js
import Head from 'next/head';
import Link from 'next/link';

export default function UrlEncodingGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'URL Encoding Guide for Web Developers',
        item: 'https://dev-brains-ai.com/blog/url-encoding-guide-for-web-developers',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'URL Encoding Guide for Web Developers',
    description:
      'A complete guide to URL encoding (percent-encoding) for web developers. Covers encodeURIComponent vs encodeURI, common mistakes, API query params, and Node.js examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/url-encoding-guide-for-web-developers',
  };

  return (
    <>
      <Head>
        <title>URL Encoding Guide for Web Developers | Dev Brains AI</title>
        <meta
          name="description"
          content="A complete guide to URL encoding (percent-encoding) for web developers. Covers encodeURIComponent vs encodeURI, common bugs, query string building, and Node.js examples."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/url-encoding-guide-for-web-developers" />
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
              <li aria-current="page">URL Encoding Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            URL Encoding Guide for Web Developers
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            URLs can only contain a limited set of ASCII characters. Any character outside that set
            — spaces, special symbols, accented letters, emoji — must be percent-encoded before
            being placed in a URL. A single missing <code>%20</code> or an unencoded <code>&amp;</code>{' '}
            in a query string can silently break your API requests. This guide covers everything you
            need to encode URLs correctly.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>What is percent-encoding?</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Each byte is replaced by a <code>%</code> followed by its two-digit hexadecimal value.
            For example, a space (byte <code>0x20</code>) becomes <code>%20</code>, and{' '}
            <code>&amp;</code> (byte <code>0x26</code>) becomes <code>%26</code>.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Without encoding — the & breaks the query string
https://api.example.com/search?q=salt & pepper

// Correctly encoded
https://api.example.com/search?q=salt%20%26%20pepper`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>encodeURIComponent — encode a single value</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Use this for encoding individual query parameter values. It encodes everything except
            letters, digits, and <code>- _ . ! ~ * ' ( )</code>.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`encodeURIComponent('hello world');       // 'hello%20world'
encodeURIComponent('price=₹1,500');      // 'price%3D%E2%82%B91%2C500'
encodeURIComponent('path/to/file');      // 'path%2Fto%2Ffile'
encodeURIComponent('2024-01-01T00:00Z'); // '2024-01-01T00%3A00Z'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>encodeURI — encode a full URL</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Use this when you have a complete URL and want to encode only the characters that are
            not allowed. It preserves structural characters like <code>:// ? & = # /</code>.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`encodeURI('https://example.com/path with spaces?q=hello world');
// → 'https://example.com/path%20with%20spaces?q=hello%20world'
// Note: & = ? : // are preserved`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Building query strings correctly</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Bad — manually concatenating is error-prone
const url = \`/search?q=\${query}&page=\${page}\`;

// Good — use URLSearchParams
const params = new URLSearchParams({ q: query, page, sort: 'desc' });
const url = \`/search?\${params.toString()}\`;
// URLSearchParams handles all encoding automatically`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Node.js: URL and URLSearchParams</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`import { URL } from 'url';

const base = new URL('https://api.example.com/search');
base.searchParams.set('q', 'cron expression & scheduler');
base.searchParams.set('lang', 'en');

console.log(base.toString());
// https://api.example.com/search?q=cron+expression+%26+scheduler&lang=en`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Decoding — when to use decodeURIComponent</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Reading a query param from a URL
const raw = new URL(window.location.href).searchParams.get('q');
// URLSearchParams decodes automatically — no manual decode needed

// But if you have a raw encoded string:
decodeURIComponent('hello%20world');  // 'hello world'
decodeURIComponent('%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87'); // 'नमस्ते'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Common mistakes</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Double-encoding: calling <code>encodeURIComponent</code> on an already-encoded string produces <code>%2520</code> instead of <code>%20</code>.</li>
            <li>Using <code>encodeURI</code> for query param values — it won't encode <code>&amp;</code> and <code>=</code>, breaking the query string.</li>
            <li>Forgetting to encode redirect URLs passed as query parameters — the embedded URL's <code>?</code> and <code>&amp;</code> will corrupt the outer URL.</li>
            <li>Not encoding file names in download URLs — spaces and brackets in filenames cause broken links in some browsers.</li>
          </ul>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Encode or decode any URL instantly</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use our <Link href="/url-encoder">free URL Encoder / Decoder</Link> to percent-encode
            or decode any string in your browser. Supports both <code>encodeURIComponent</code> and{' '}
            <code>encodeURI</code> modes. No data is uploaded.
          </p>

        </article>
      </main>
    </>
  );
}
