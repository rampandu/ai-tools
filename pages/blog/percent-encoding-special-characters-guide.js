// pages/blog/percent-encoding-special-characters-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function PercentEncodingSpecialChars() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Percent-Encoding Special Characters — A Reference Guide',
        item: 'https://dev-brains-ai.com/blog/percent-encoding-special-characters-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Percent-Encoding Special Characters — A Reference Guide',
    description:
      'A quick-reference table for percent-encoding common special characters — space, &, =, ?, #, and more — with JavaScript encodeURIComponent examples for each.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/percent-encoding-special-characters-guide',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the percent-encoded value of a space character?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A space is encoded as %20 using encodeURIComponent or standard percent-encoding. In application/x-www-form-urlencoded form data specifically, a space may also be encoded as a + character instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does & need to be percent-encoded in a URL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '& is the delimiter that separates key-value pairs in a query string. If a parameter value contains a literal & and it is not encoded to %26, the URL parser will incorrectly split it into a new parameter, corrupting the query string.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I percent-encode a character in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use encodeURIComponent(str) for individual values like query parameters — it encodes every reserved character. Use encodeURI(str) only for a full URL where you want to preserve structural characters like : / ? & =.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Percent-Encoding Special Characters — A Reference Guide | Dev Brains AI</title>
        <meta
          name="description"
          content="A quick-reference table for percent-encoding common special characters like space, &, =, ?, # and more, with JavaScript encodeURIComponent examples."
        />
        <meta
          name="keywords"
          content="percent encoding table, url encode special characters, encodeURIComponent examples, url encode space, url encode ampersand"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/percent-encoding-special-characters-guide" />
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
              <li aria-current="page">Percent-Encoding Reference</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Percent-Encoding Special Characters — A Reference Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Bookmark this as your quick lookup for percent-encoding the special characters you'll
            actually run into — spaces, symbols in query strings, and non-ASCII text. Every value
            below matches what JavaScript's <code>encodeURIComponent</code> produces.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>How percent-encoding works</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Each unsafe byte is replaced with <code>%</code> followed by its two-digit hexadecimal
            value. Multi-byte UTF-8 characters (like emoji or Indian scripts) get encoded as multiple
            consecutive <code>%XX</code> sequences, one per byte.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`' ' → 0x20 → %20
'&' → 0x26 → %26
'नमस्ते' → multi-byte UTF-8 → %E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common special character reference table</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Space ( )</strong> → <code>%20</code> (or <code>+</code> in form-urlencoded data)</li>
            <li><strong>&amp;</strong> → <code>%26</code> — must encode to avoid splitting query params</li>
            <li><strong>=</strong> → <code>%3D</code> — must encode inside a value to avoid ending the key early</li>
            <li><strong>?</strong> → <code>%3F</code> — must encode when it's literal data, not the query start</li>
            <li><strong>#</strong> → <code>%23</code> — must encode to avoid being read as a fragment identifier</li>
            <li><strong>/</strong> → <code>%2F</code> — encode when it's part of a value, not a path separator</li>
            <li><strong>:</strong> → <code>%3A</code></li>
            <li><strong>+</strong> → <code>%2B</code> — important: a literal <code>+</code> must be encoded, or it may be misread as a space</li>
            <li><strong>%</strong> → <code>%25</code> — the percent sign itself must be encoded first to avoid double-decoding bugs</li>
            <li><strong>@</strong> → <code>%40</code></li>
            <li><strong>,</strong> → <code>%2C</code></li>
            <li><strong>;</strong> → <code>%3B</code></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript examples for each</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`encodeURIComponent('hello world');        // 'hello%20world'
encodeURIComponent('salt & pepper');      // 'salt%20%26%20pepper'
encodeURIComponent('a=b');                // 'a%3Db'
encodeURIComponent('is this real?');      // 'is%20this%20real%3F'
encodeURIComponent('section#intro');      // 'section%23intro'
encodeURIComponent('path/to/file');       // 'path%2Fto%2Ffile'
encodeURIComponent('9:30 AM');            // '9%3A30%20AM'
encodeURIComponent('2 + 2 = 4');          // '2%20%2B%202%20%3D%204'
encodeURIComponent('100% sure');          // '100%25%20sure'
encodeURIComponent('user@example.com');   // 'user%40example.com'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The space vs plus (+) gotcha</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            There are two valid encodings for a space, and mixing them up causes bugs.{' '}
            <code>encodeURIComponent</code> always produces <code>%20</code>. But the older{' '}
            <code>application/x-www-form-urlencoded</code> format (used by HTML form submissions and
            some legacy APIs) encodes a space as <code>+</code> instead — and in that same format, a
            literal <code>+</code> must itself be encoded as <code>%2B</code> to avoid being
            misinterpreted as a space.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// URLSearchParams uses the form-urlencoded convention: space → '+'
const params = new URLSearchParams({ q: 'red car' });
params.toString();
// → 'q=red+car'   (not 'q=red%20car')

// decodeURIComponent does NOT turn '+' back into a space — use
// URLSearchParams.get() instead, which handles this convention correctly
new URLSearchParams('q=red+car').get('q');
// → 'red car'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Characters that never need encoding</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Letters, digits, and <code>- _ . ! ~ * ' ( )</code> are left untouched by{' '}
            <code>encodeURIComponent</code> — encoding them is unnecessary and, if applied twice,
            causes double-encoding bugs (<code>%20</code> becoming <code>%2520</code>).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the percent-encoded value of a space character?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A space is encoded as %20 using encodeURIComponent or standard percent-encoding. In
              application/x-www-form-urlencoded form data specifically, a space may also be encoded
              as a + character instead.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does & need to be percent-encoded in a URL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              & is the delimiter that separates key-value pairs in a query string. If a parameter
              value contains a literal & and it is not encoded to %26, the URL parser will
              incorrectly split it into a new parameter, corrupting the query string.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I percent-encode a character in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use encodeURIComponent(str) for individual values like query parameters — it encodes
              every reserved character. Use encodeURI(str) only for a full URL where you want to
              preserve structural characters like : / ? &amp; =.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free URL Encoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Skip manually looking up hex codes — paste any string into our free online tool to
              percent-encode or decode it instantly.
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
              <li><Link href="/blog/url-encoding-vs-uri-encoding-difference">URL Encoding vs URI Encoding — What's the Real Difference?</Link></li>
              <li><Link href="/blog/url-encoding-common-mistakes-developers-make">Common URL Encoding Mistakes Developers Make</Link></li>
              <li><Link href="/blog/url-encoding-rest-api-query-parameters">URL Encoding for REST API Query Parameters</Link></li>
              <li><Link href="/blog/encode-decode-query-strings-nodejs">Encoding and Decoding Query Strings in Node.js</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
