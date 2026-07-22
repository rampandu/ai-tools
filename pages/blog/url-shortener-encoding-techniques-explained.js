// pages/blog/url-shortener-encoding-techniques-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function UrlShortenerEncodingTechniques() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How URL Shorteners Generate Short Codes — Encoding Techniques Explained',
        item: 'https://dev-brains-ai.com/blog/url-shortener-encoding-techniques-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How URL Shorteners Generate Short Codes (Base62 Explained)',
    description:
      'How URL shorteners like bit.ly generate short codes: base62 encoding of auto-increment IDs, hash-based alternatives, and working JavaScript examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/url-shortener-encoding-techniques-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do URL shorteners generate short codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most URL shorteners take an auto-incrementing database ID and encode it in base62 (using 0-9, a-z, A-Z), which produces a short, URL-safe string. A few characters can represent millions of unique IDs because base62 packs more information per character than base10.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why use base62 instead of base64 for short URL codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Base64 includes + and / characters, which are not safe to use directly in a URL path without additional percent-encoding. Base62 uses only letters and digits, so every generated code is already URL-safe with no escaping needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do all URL shorteners use sequential IDs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Some use sequential auto-increment IDs encoded in base62 for simplicity and guaranteed uniqueness. Others use a hash of the destination URL (like the first few characters of an MD5 or SHA-256 hash) combined with collision detection, or a random string generator with a uniqueness check against the database.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How URL Shorteners Generate Short Codes (Base62 Explained) | Dev Brains AI</title>
        <meta
          name="description"
          content="How URL shorteners like bit.ly generate short codes: base62 encoding of auto-increment IDs, hash-based alternatives, and working JavaScript examples."
        />
        <meta
          name="keywords"
          content="url shortener algorithm, base62 encoding, how bit.ly works, generate short url code, url shortener design"
        />
        <meta property="og:title" content="How URL Shorteners Generate Short Codes (Base62 Explained)" />
        <meta property="og:description" content="How URL shorteners like bit.ly generate short codes: base62 encoding of auto-increment IDs, hash-based alternatives, and working JavaScript examples." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/url-shortener-encoding-techniques-explained" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/url-shortener-encoding-techniques-explained" />
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
              <li aria-current="page">URL Shortener Encoding</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How URL Shorteners Generate Short Codes — Encoding Techniques Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Services like bit.ly turn a long URL into something like <code>bit.ly/3xK9pQ</code>. The
            core trick isn't compression — it's encoding. This article explains the two most common
            approaches, base62 encoding of sequential IDs and hash-based generation, with runnable
            code for each.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Approach 1: base62 encoding of an auto-increment ID</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The simplest and most common design: store the long URL in a database row with an
            auto-incrementing integer primary key, then encode that integer into base62 (digits{' '}
            <code>0-9</code>, lowercase <code>a-z</code>, uppercase <code>A-Z</code> — 62 symbols
            total). Base62 is preferred over base64 because it avoids <code>+</code> and{' '}
            <code>/</code>, which aren't safe in a URL path without encoding.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const BASE = ALPHABET.length; // 62

function encodeBase62(num) {
  if (num === 0) return ALPHABET[0];
  let result = '';
  while (num > 0) {
    result = ALPHABET[num % BASE] + result;
    num = Math.floor(num / BASE);
  }
  return result;
}

function decodeBase62(str) {
  let num = 0;
  for (const char of str) {
    num = num * BASE + ALPHABET.indexOf(char);
  }
  return num;
}

encodeBase62(1);          // 'b'
encodeBase62(1000000);    // '4C92'
encodeBase62(56800235583); // 'ZZZZZZ' — 6 chars covers 56+ billion IDs

decodeBase62('4C92');     // 1000000`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Why base62 packs so much into so few characters</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Base10 (plain decimal) needs more digits to represent the same number because it only
            has 10 symbols per position. Base62 has 62 symbols per position, so each character
            carries roughly <code>log(62)/log(10) ≈ 1.79</code> times more information than a decimal
            digit — which is why a 6-character base62 code can represent over 56 billion unique IDs.
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>4 characters</strong> → up to 62⁴ ≈ 14.7 million unique URLs</li>
            <li><strong>6 characters</strong> → up to 62⁶ ≈ 56.8 billion unique URLs</li>
            <li><strong>7 characters</strong> → up to 62⁷ ≈ 3.5 trillion unique URLs</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Approach 2: hashing the destination URL</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An alternative design hashes the original URL (e.g. with MD5 or SHA-256) and takes the
            first several characters of the hash, re-encoded in base62 or base64url. This avoids
            needing a sequential counter, but requires collision handling since two different URLs
            could theoretically produce the same short prefix.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import crypto from 'crypto';

function hashBasedShortCode(longUrl, length = 7) {
  const hash = crypto.createHash('sha256').update(longUrl).digest('base64url');
  return hash.slice(0, length);
}

hashBasedShortCode('https://example.com/very/long/article/path?utm=abc');
// → 'Kx9pQ2z' (deterministic — same URL always produces the same code)

// Collision handling: if the code already maps to a DIFFERENT url in the
// database, append a character and re-hash, or fall back to approach 1`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Putting it together: a minimal shortener flow</h2>
          <ol className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>User submits a long URL to <code>POST /shorten</code>.</li>
            <li>Server inserts a new row <code>{'{ id: AUTO_INCREMENT, longUrl }'}</code> into the database.</li>
            <li>Server encodes the new row's <code>id</code> using base62 to get the short code, e.g. <code>4C92</code>.</li>
            <li>Server returns <code>https://short.ly/4C92</code> to the user.</li>
            <li>On <code>GET /4C92</code>, the server decodes the code back to the integer ID, looks up the row, and issues an HTTP 301/302 redirect to the original long URL.</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Base62 vs Base64 vs percent-encoding — where they fit</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Base62</strong> — ideal for generating compact, URL-safe identifiers like short codes, since it needs no percent-encoding at all.</li>
            <li><strong>Base64 / Base64url</strong> — better for encoding arbitrary binary payloads (like JWT segments), not primarily for generating short human-typeable codes.</li>
            <li><strong>Percent-encoding</strong> — a separate concern entirely: it's for safely transmitting characters within an already-formed URL, not for generating the short code itself.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do URL shorteners generate short codes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Most URL shorteners take an auto-incrementing database ID and encode it in base62
              (using 0-9, a-z, A-Z), which produces a short, URL-safe string. A few characters can
              represent millions of unique IDs because base62 packs more information per character
              than base10.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why use base62 instead of base64 for short URL codes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Base64 includes + and / characters, which are not safe to use directly in a URL path
              without additional percent-encoding. Base62 uses only letters and digits, so every
              generated code is already URL-safe with no escaping needed.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Do all URL shorteners use sequential IDs?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Some use sequential auto-increment IDs encoded in base62 for simplicity and
              guaranteed uniqueness. Others use a hash of the destination URL (like the first few
              characters of an MD5 or SHA-256 hash) combined with collision detection, or a random
              string generator with a uniqueness check against the database.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free URL Encoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Building a redirect or short link feature? Use our free online tool to percent-encode
              any destination URL or query parameter before storing it.
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
              <li><Link href="/blog/base64-vs-url-encoding-difference">Base64 vs URL Encoding — What's the Difference?</Link></li>
              <li><Link href="/blog/base64-encoding-limitations-and-alternatives">Base64 Encoding Limitations and Alternatives</Link></li>
              <li><Link href="/blog/url-encoding-rest-api-query-parameters">URL Encoding for REST API Query Parameters</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
