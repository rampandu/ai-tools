// pages/blog/decode-jwt-tokens-base64-javascript.js
import Head from 'next/head';
import Link from 'next/link';

export default function DecodeJwtBase64() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Decode JWT Tokens Using Base64 in JavaScript',
        item: 'https://dev-brains-ai.com/blog/decode-jwt-tokens-base64-javascript',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Decode JWT Tokens Using Base64 in JavaScript',
    description:
      'Learn how JWT tokens are structured and how to decode the header and payload using Base64Url decoding in JavaScript — browser and Node.js examples included.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/decode-jwt-tokens-base64-javascript',
  };

  return (
    <>
      <Head>
        <title>How to Decode JWT Tokens Using Base64 in JavaScript | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how JWT tokens are structured and how to decode the header and payload sections using Base64Url decoding in JavaScript. Includes browser and Node.js examples."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/decode-jwt-tokens-base64-javascript" />
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
              <li aria-current="page">Decode JWT with Base64</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Decode JWT Tokens Using Base64 in JavaScript
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            JSON Web Tokens (JWTs) are widely used for authentication and information exchange.
            While verifying a JWT requires the secret or public key, decoding its contents to read
            the payload is straightforward — the header and payload are simply Base64Url-encoded
            JSON. This is useful for debugging, logging, and extracting claims on the client side.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>JWT structure</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            A JWT is three dot-separated Base64Url-encoded strings:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9    ← header
.
eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ  ← payload
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← signature`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Decoding the payload in the browser</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`function decodeJwt(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');

  function base64UrlDecode(str) {
    // Pad and normalise URL-safe chars
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  return {
    header:  base64UrlDecode(parts[0]),
    payload: base64UrlDecode(parts[1]),
    // signature is binary — we just note it exists
    signature: parts[2],
  };
}

// Usage
const { header, payload } = decodeJwt(token);
console.log(payload.userId);  // "123"
console.log(payload.role);    // "admin"
console.log(payload.exp);     // expiry timestamp (Unix seconds)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Decoding in Node.js</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`function decodeJwtNode(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT');

  const decode = (str) => {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
  };

  return { header: decode(parts[0]), payload: decode(parts[1]) };
}

const { payload } = decodeJwtNode(token);
console.log(payload);`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Reading the expiry time</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`const { payload } = decodeJwt(token);

if (payload.exp) {
  const expiresAt = new Date(payload.exp * 1000); // exp is Unix seconds
  const isExpired = Date.now() > payload.exp * 1000;
  console.log('Expires:', expiresAt.toLocaleString());
  console.log('Expired:', isExpired);
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Important security note</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Decoding a JWT reads the contents but does NOT verify the signature. Never trust the
            claims in a JWT payload on the server without verifying the signature using your secret
            key or the issuer's public key. Use libraries like <code>jsonwebtoken</code> (Node.js)
            or <code>jose</code> for proper verification.
          </p>

          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Client-side decoding is fine for displaying the username or reading the expiry to auto-refresh tokens.</li>
            <li>Server-side, always use <code>jwt.verify()</code> — never <code>jwt.decode()</code> alone for access control decisions.</li>
          </ul>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Decode Base64 strings instantly</h3>
          <p className="small" style={{ marginTop: 8 }}>
            You can paste any Base64Url-encoded JWT section directly into our{' '}
            <Link href="/base64-tool">Base64 Encoder / Decoder</Link> to read the raw JSON — useful
            for quick debugging without writing any code.
          </p>

        </article>
      </main>
    </>
  );
}
