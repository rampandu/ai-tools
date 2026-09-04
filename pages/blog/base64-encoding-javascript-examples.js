// pages/blog/base64-encoding-javascript-examples.js
import Head from 'next/head';
import Link from 'next/link';

export default function Base64EncodingJavaScript() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Base64 Encoding in JavaScript — Complete Guide with Examples',
        item: 'https://dev-brains-ai.com/blog/base64-encoding-javascript-examples',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Base64 Encoding in JavaScript: btoa, atob, Unicode Fix',
    description:
      'btoa and atob explained, the Unicode bug that breaks btoa() and how to fix it, plus Node.js Buffer, URL-safe Base64, and real use cases with working code.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/base64-encoding-javascript-examples',
    datePublished: '2026-07-11',
    dateModified: '2026-09-04',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does btoa() throw an error on some strings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'btoa() only accepts characters in the Latin-1 range (code points 0-255). Any string containing emoji, accented letters outside Latin-1, or non-Latin scripts like Hindi or Chinese throws a DOMException. Encode the string to UTF-8 bytes with TextEncoder first, then pass the resulting byte string to btoa().',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use btoa()/atob() or Buffer for Base64 in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Node.js, prefer Buffer.from(str).toString(\'base64\') and Buffer.from(b64, \'base64\').toString(\'utf8\') — Buffer handles Unicode correctly out of the box, with no manual TextEncoder workaround needed. Reach for btoa()/atob() only in browser code, where Buffer is not available.',
        },
      },
      {
        '@type': 'Question',
        name: 'When do I need URL-safe Base64 instead of standard Base64?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Any time the encoded value will be placed inside a URL, query parameter, or filename — standard Base64\'s + and / characters can be misread as URL structure. URL-safe Base64 (Base64Url) replaces them with - and _ and drops padding, which is exactly what JWTs use for their header and payload segments.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Base64 Encoding in JavaScript: btoa, atob, Unicode Fix | Dev Brains AI</title>
        <meta
          name="description"
          content="btoa and atob explained, the Unicode bug that breaks btoa() and how to fix it, plus Node.js Buffer, URL-safe Base64, and real use cases with working code."
        />
        <meta property="og:title" content="Base64 Encoding in JavaScript: btoa, atob, Unicode Fix" />
        <meta
          property="og:description"
          content="btoa and atob explained, the Unicode bug that breaks btoa() and how to fix it, plus Node.js Buffer, URL-safe Base64, and real use cases with working code."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/base64-encoding-javascript-examples" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/base64-encoding-javascript-examples" />
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
              <li aria-current="page">Base64 Encoding in JavaScript</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Base64 Encoding in JavaScript — Complete Guide with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Base64 is a binary-to-text encoding scheme that converts binary data into a string of
            64 printable ASCII characters. In JavaScript, <code>btoa()</code> and{' '}
            <code>atob()</code> are the built-in browser functions for Base64 encoding and decoding.
            This guide covers everything from the basics to handling Unicode, Node.js Buffers, and
            URL-safe variants.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>btoa — encode to Base64</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`btoa('Hello, World!');
// → 'SGVsbG8sIFdvcmxkIQ=='

btoa('admin:password123');
// → 'YWRtaW46cGFzc3dvcmQxMjM='
// Used for HTTP Basic Auth headers`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>atob — decode from Base64</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`atob('SGVsbG8sIFdvcmxkIQ==');
// → 'Hello, World!'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>The Unicode problem — and how to fix it</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>btoa()</code> only accepts Latin-1 characters. Passing multi-byte characters
            (emoji, accented letters, Indian scripts) throws a <code>DOMException</code>. Fix it
            by encoding to UTF-8 bytes first:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Safe Base64 encode for any Unicode string
function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

// Safe Base64 decode
function fromBase64(b64) {
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

toBase64('नमस्ते 🙏');
// works correctly`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Base64 in Node.js using Buffer</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Encode
Buffer.from('Hello, World!').toString('base64');
// → 'SGVsbG8sIFdvcmxkIQ=='

// Decode
Buffer.from('SGVsbG8sIFdvcmxkIQ==', 'base64').toString('utf8');
// → 'Hello, World!'

// Read a file and encode it
import fs from 'fs';
const fileData = fs.readFileSync('./image.png');
const base64Image = fileData.toString('base64');`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>URL-safe Base64</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Standard Base64 uses <code>+</code> and <code>/</code>, which must be percent-encoded
            in URLs. URL-safe Base64 replaces them:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`function toBase64Url(str) {
  return toBase64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // strip padding
}

function fromBase64Url(b64url) {
  const b64 = b64url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  return fromBase64(b64);
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Common real-world use cases</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><strong>HTTP Basic Auth</strong> — <code>Authorization: Basic {'{'}btoa('user:pass'){'}'}</code></li>
            <li><strong>Data URIs</strong> — embed images inline in HTML/CSS: <code>src={'"'}data:image/png;base64,{'{'}base64Data{'}'}{'"'}</code></li>
            <li><strong>JWT payloads</strong> — the middle section of a JWT is Base64Url-encoded JSON</li>
            <li><strong>Email attachments</strong> — MIME encodes binary attachments as Base64</li>
            <li><strong>Passing binary in JSON APIs</strong> — encode file bytes as a Base64 string field</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does btoa() throw an error on some strings?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              <code>btoa()</code> only accepts characters in the Latin-1 range (code points 0-255).
              Any string containing emoji, accented letters outside Latin-1, or non-Latin scripts
              like Hindi or Chinese throws a <code>DOMException</code>. Encode the string to UTF-8
              bytes with <code>TextEncoder</code> first, then pass the resulting byte string to{' '}
              <code>btoa()</code>.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use btoa()/atob() or Buffer for Base64 in Node.js?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In Node.js, prefer <code>Buffer.from(str).toString(&apos;base64&apos;)</code> and{' '}
              <code>Buffer.from(b64, &apos;base64&apos;).toString(&apos;utf8&apos;)</code> — Buffer
              handles Unicode correctly out of the box, with no manual TextEncoder workaround
              needed. Reach for <code>btoa()</code>/<code>atob()</code> only in browser code, where
              Buffer is not available.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>When do I need URL-safe Base64 instead of standard Base64?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Any time the encoded value will be placed inside a URL, query parameter, or filename
              — standard Base64&apos;s <code>+</code> and <code>/</code> characters can be misread
              as URL structure. URL-safe Base64 (Base64Url) replaces them with <code>-</code> and{' '}
              <code>_</code> and drops padding, which is exactly what JWTs use for their header and
              payload segments.
            </p>
          </div>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Try it instantly in your browser</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use our <Link href="/base64-tool">free Base64 Encoder / Decoder</Link> to encode or
            decode any string instantly. Supports Unicode and URL-safe mode — no data uploaded.
          </p>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/base64-encoding-python-examples">Base64 Encoding in Python: b64encode, Errors and Fixes</Link></li>
              <li><Link href="/blog/base64-vs-url-encoding-difference">Base64 vs URL Encoding: Key Differences</Link></li>
              <li><Link href="/blog/decode-jwt-tokens-base64-javascript">Decode a JWT in JavaScript in 3 Lines</Link></li>
              <li><Link href="/blog/base64-encoding-limitations-and-alternatives">Base64 Encoding Limitations: When to Use Base85 Instead</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
