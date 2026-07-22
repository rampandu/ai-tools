// pages/blog/encode-decode-query-strings-nodejs.js
import Head from 'next/head';
import Link from 'next/link';

export default function EncodeDecodeQueryStringsNodejs() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Encoding and Decoding Query Strings in Node.js',
        item: 'https://dev-brains-ai.com/blog/encode-decode-query-strings-nodejs',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Node.js Query Strings: Encode & Decode the Right Way',
    description:
      'Stop hand-rolling URL encoding. Learn to build and parse Node.js query strings correctly with URLSearchParams, including arrays, special characters, and common pitfalls.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/encode-decode-query-strings-nodejs',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Should I use URLSearchParams or the querystring module in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prefer URLSearchParams for new code — it is a web standard also available in browsers, has a cleaner API, and is actively maintained. The querystring module still works and is slightly faster for simple cases, but Node.js docs mark it as legacy in favor of URLSearchParams.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I build a query string from an object in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pass the object directly to new URLSearchParams(obj) and call .toString(). URLSearchParams automatically percent-encodes keys and values for you, so you never need to call encodeURIComponent manually.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle repeated query parameters like ?tag=a&tag=b in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use URLSearchParams.append() to add multiple values under the same key, and .getAll(key) to retrieve them all as an array. Using .set() or a plain object will overwrite earlier values instead of preserving duplicates.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Node.js Query Strings: Encode & Decode the Right Way | Dev Brains AI</title>
        <meta
          name="description"
          content="Stop hand-rolling URL encoding. Learn to build and parse Node.js query strings correctly with URLSearchParams, including arrays, special characters, and common pitfalls."
        />
        <meta
          name="keywords"
          content="node.js query string, URLSearchParams node, querystring module, build query string javascript, parse query params node"
        />
        <meta property="og:title" content="Node.js Query Strings: Encode & Decode the Right Way" />
        <meta property="og:description" content="Stop hand-rolling URL encoding. Learn to build and parse Node.js query strings correctly with URLSearchParams, including arrays, special characters, and common pitfalls." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/encode-decode-query-strings-nodejs" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/encode-decode-query-strings-nodejs" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Query Strings in Node.js</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Encoding and Decoding Query Strings in Node.js
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Node.js gives you two built-in ways to build and parse query strings:{' '}
            <code>URLSearchParams</code> and the older <code>querystring</code> module. Both handle
            percent-encoding for you automatically — but they behave differently enough with arrays
            and special characters that picking the wrong one causes bugs. Here's how to use each.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Building a query string with URLSearchParams</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>URLSearchParams</code> is the modern, web-standard way to build query strings — it
            works identically in Node.js and browsers. Pass it a plain object or array of pairs, and
            it handles encoding automatically.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const params = new URLSearchParams({
  q: 'node.js & express',
  page: '2',
  sort: 'desc',
});

console.log(params.toString());
// → 'q=node.js+%26+express&page=2&sort=desc'

const url = \`https://api.example.com/search?\${params.toString()}\`;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Parsing a query string with URLSearchParams</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import { URL } from 'url';

const url = new URL('https://api.example.com/search?q=node.js+%26+express&page=2');

url.searchParams.get('q');     // 'node.js & express' — decoded automatically
url.searchParams.get('page');  // '2'
url.searchParams.has('sort');  // false

// Or parse a bare query string directly:
const params = new URLSearchParams('q=hello+world&page=3');
params.get('q'); // 'hello world'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Handling repeated keys (arrays)</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A common source of bugs: using a plain object with an array value doesn't produce
            repeated <code>key=value</code> pairs automatically. Use <code>.append()</code> in a loop
            instead, and <code>.getAll()</code> to read them back.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const params = new URLSearchParams();
for (const tag of ['nodejs', 'backend', 'api']) {
  params.append('tag', tag);
}

console.log(params.toString());
// → 'tag=nodejs&tag=backend&tag=api'

// Reading them back
const parsed = new URLSearchParams('tag=nodejs&tag=backend&tag=api');
parsed.getAll('tag');
// → ['nodejs', 'backend', 'api']`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The querystring module (legacy, still works)</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The older <code>querystring</code> module is still built into Node.js. It handles arrays
            natively (unlike a plain object passed to <code>URLSearchParams</code>), which is
            occasionally convenient, but Node's own documentation recommends{' '}
            <code>URLSearchParams</code> for new code.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import querystring from 'querystring';

// Build — arrays work directly, unlike URLSearchParams(object)
const qs = querystring.stringify({ tag: ['nodejs', 'backend'], page: 2 });
console.log(qs);
// → 'tag=nodejs&tag=backend&page=2'

// Parse
const parsed = querystring.parse('tag=nodejs&tag=backend&page=2');
console.log(parsed);
// → { tag: ['nodejs', 'backend'], page: '2' }`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Using query strings in an Express route</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import express from 'express';
const app = express();

// GET /search?q=node.js%20tutorial&page=2
app.get('/search', (req, res) => {
  // Express parses req.query for you using the querystring module internally
  const { q, page = '1' } = req.query;
  res.json({ query: q, page: Number(page) });
});

// Building a link to another endpoint with query params
app.get('/next-page-link', (req, res) => {
  const params = new URLSearchParams({ q: req.query.q, page: '3' });
  res.json({ next: \`/search?\${params.toString()}\` });
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>URLSearchParams vs querystring — quick comparison</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>URLSearchParams</strong> — web standard, works in browsers too, recommended by Node.js docs, cleaner iteration API.</li>
            <li><strong>querystring</strong> — Node-only, marked legacy, but handles array values from a plain object without extra loops.</li>
            <li>Both automatically percent-encode and decode values — you should rarely call <code>encodeURIComponent</code> manually when using either.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use URLSearchParams or the querystring module in Node.js?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Prefer URLSearchParams for new code — it is a web standard also available in browsers,
              has a cleaner API, and is actively maintained. The querystring module still works and
              is slightly faster for simple cases, but Node.js docs mark it as legacy in favor of
              URLSearchParams.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I build a query string from an object in Node.js?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Pass the object directly to new URLSearchParams(obj) and call .toString().
              URLSearchParams automatically percent-encodes keys and values for you, so you never
              need to call encodeURIComponent manually.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I handle repeated query parameters like ?tag=a&amp;tag=b in Node.js?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use URLSearchParams.append() to add multiple values under the same key, and
              .getAll(key) to retrieve them all as an array. Using .set() or a plain object will
              overwrite earlier values instead of preserving duplicates.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free URL Encoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need to quickly encode a query parameter value by hand? Use our free online tool for
              instant percent-encoding, no Node.js required.
            </p>
            <Link href="/url-encoder">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open URL Encoder →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/url-encoding-guide-for-web-developers">URL Encoding Guide for Web Developers</Link></li>
              <li><Link href="/blog/url-encoding-rest-api-query-parameters">URL Encoding for REST API Query Parameters</Link></li>
              <li><Link href="/blog/percent-encoding-special-characters-guide">Percent-Encoding Special Characters — A Reference Guide</Link></li>
              <li><Link href="/blog/url-encoding-common-mistakes-developers-make">Common URL Encoding Mistakes Developers Make</Link></li>
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL — How AI SQL Generators Work</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
