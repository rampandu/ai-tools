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
    headline: 'Base64 Encoding in JavaScript — Complete Guide with Examples',
    description:
      'Learn how Base64 encoding works in JavaScript. Covers btoa, atob, TextEncoder for Unicode, Node.js Buffer, URL-safe Base64, and common use cases with code examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/base64-encoding-javascript-examples',
  };

  return (
    <>
      <Head>
        <title>Base64 Encoding in JavaScript — Complete Guide with Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how Base64 encoding works in JavaScript. Covers btoa, atob, Unicode support with TextEncoder, Node.js Buffer, URL-safe Base64, and real-world use cases."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/base64-encoding-javascript-examples" />
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

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Try it instantly in your browser</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use our <Link href="/base64-tool">free Base64 Encoder / Decoder</Link> to encode or
            decode any string instantly. Supports Unicode and URL-safe mode — no data uploaded.
          </p>

        </article>
      </main>
    </>
  );
}
