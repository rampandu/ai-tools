// pages/blog/jwt-authentication-explained-for-beginners.js
import Head from 'next/head';
import Link from 'next/link';

export default function JwtAuthExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JWT Authentication Explained for Beginners',
        item: 'https://dev-brains-ai.com/blog/jwt-authentication-explained-for-beginners',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JWT Authentication Explained for Beginners',
    description:
      'A beginner-friendly explanation of JWT structure (header.payload.signature), how Base64url encoding is used, and how the full JWT authentication flow works end to end.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/jwt-authentication-explained-for-beginners',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the three parts of a JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A JWT has three dot-separated parts: the header (algorithm and token type), the payload (claims/data like user ID and expiry), and the signature (used to verify the token was not tampered with). All three parts are Base64url-encoded.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a JWT encrypted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, by default a standard JWT is only Base64url-encoded and signed, not encrypted. Anyone can decode the header and payload and read the claims. The signature only proves the token has not been altered — it does not hide the contents. Use JWE if you need actual encryption.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does JWT authentication work end to end?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The user logs in with credentials, the server verifies them and issues a signed JWT, the client stores the token and sends it in the Authorization header on future requests, and the server verifies the signature on each request to authenticate without a database lookup.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JWT Authentication Explained for Beginners | Dev Brains AI</title>
        <meta
          name="description"
          content="A beginner-friendly explanation of JWT structure, how Base64url encoding is used inside a token, and how the full JWT authentication flow works end to end."
        />
        <meta
          name="keywords"
          content="jwt authentication explained, how does jwt work, jwt structure, jwt for beginners, base64url jwt, json web token tutorial"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/jwt-authentication-explained-for-beginners" />
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
              <li aria-current="page">JWT Authentication Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JWT Authentication Explained for Beginners
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            JSON Web Tokens (JWTs) are the backbone of authentication in most modern REST APIs and
            single-page apps. They let a server verify who a user is without storing session state
            in a database. This guide breaks down exactly what's inside a JWT and how it flows
            through a login and API request.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The three parts of a JWT</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A JWT is a single string made of three parts separated by dots:{' '}
            <code>header.payload.signature</code>. Each part is Base64url-encoded — a URL-safe
            variant of Base64 that swaps <code>+</code>/<code>/</code> for <code>-</code>/<code>_</code>{' '}
            and drops the padding.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VySWQiOiI0MiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTc4MzY0ODAwMH0
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// header:    { "alg": "HS256", "typ": "JWT" }
// payload:   { "userId": "42", "role": "admin", "exp": 1783648000 }
// signature: HMAC-SHA256(header + "." + payload, SECRET_KEY)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Why Base64url and not plain Base64?</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JWTs are frequently passed in URLs, HTTP headers, and cookies. Standard Base64's{' '}
            <code>+</code> and <code>/</code> characters have special meaning in URLs and would need
            percent-encoding. Base64url avoids that entirely by using only URL-safe characters, so
            the token can be dropped into a header or query string with zero extra encoding.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function base64UrlEncode(obj) {
  const json = JSON.stringify(obj);
  const base64 = btoa(json);
  return base64
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, ''); // padding is dropped, not needed for JWTs
}

base64UrlEncode({ userId: '42', role: 'admin' });
// → 'eyJ1c2VySWQiOiI0MiIsInJvbGUiOiJhZG1pbiJ9'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The signature — what it actually protects</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The signature is computed by hashing the header and payload together with a secret key
            known only to the server (for HMAC algorithms like HS256) or a private key (for RSA/ECDSA
            algorithms like RS256). It's important to understand what this does and doesn't do:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Protects against tampering</strong> — if anyone changes the payload (e.g. <code>role: admin</code>), the signature no longer matches and verification fails.</li>
            <li><strong>Does NOT hide the contents</strong> — the header and payload are just Base64url, not encrypted. Anyone can decode and read them without the secret key.</li>
            <li><strong>Never put sensitive data</strong> (passwords, credit card numbers) in a JWT payload — treat it as visible to the client and anyone who intercepts it.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The full authentication flow</h2>
          <ol className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>User submits email/password to <code>POST /login</code>.</li>
            <li>Server verifies credentials against the database.</li>
            <li>Server creates a JWT payload with claims (<code>userId</code>, <code>role</code>, <code>exp</code>) and signs it with a secret key, returning the token to the client.</li>
            <li>Client stores the token (memory, httpOnly cookie, or localStorage) and attaches it to every subsequent request: <code>Authorization: Bearer &lt;token&gt;</code>.</li>
            <li>On each request, the server verifies the signature and checks <code>exp</code> — no database session lookup needed, which is why JWTs scale well across stateless services.</li>
            <li>When the token expires, the client either re-authenticates or uses a longer-lived refresh token to obtain a new access token.</li>
          </ol>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Node.js server — issuing and verifying a JWT with jsonwebtoken
import jwt from 'jsonwebtoken';

// Issue a token at login
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify on protected routes
app.get('/api/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ userId: payload.userId });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common beginner mistakes</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>Using <code>jwt.decode()</code> instead of <code>jwt.verify()</code> for access control — decode does not check the signature at all.</li>
            <li>Storing sensitive personal data in the payload, assuming it's hidden.</li>
            <li>Never setting an expiry (<code>exp</code>), so a stolen token stays valid forever.</li>
            <li>Storing the secret key in source control instead of an environment variable.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What are the three parts of a JWT?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A JWT has three dot-separated parts: the header (algorithm and token type), the
              payload (claims/data like user ID and expiry), and the signature (used to verify the
              token was not tampered with). All three parts are Base64url-encoded.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is a JWT encrypted?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No, by default a standard JWT is only Base64url-encoded and signed, not encrypted.
              Anyone can decode the header and payload and read the claims. The signature only proves
              the token has not been altered — it does not hide the contents. Use JWE if you need
              actual encryption.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How does JWT authentication work end to end?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The user logs in with credentials, the server verifies them and issues a signed JWT,
              the client stores the token and sends it in the Authorization header on future
              requests, and the server verifies the signature on each request to authenticate without
              a database lookup.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Base64 Encoder/Decoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any JWT segment into our free tool to decode the header or payload instantly and
              inspect the raw claims — no library or code required.
            </p>
            <Link href="/base64-tool">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Base64 Encoder/Decoder →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/decode-jwt-tokens-base64-javascript">How to Decode JWT Tokens Using Base64 in JavaScript</Link></li>
              <li><Link href="/blog/base64-encoding-vs-encryption-difference">Base64 Encoding vs Encryption — What's the Difference?</Link></li>
              <li><Link href="/blog/base64-encoding-javascript-examples">Base64 Encoding in JavaScript — Complete Guide with Examples</Link></li>
              <li><Link href="/blog/base64-vs-url-encoding-difference">Base64 vs URL Encoding — What's the Difference?</Link></li>
              <li><Link href="/blog/base64-encoding-python-examples">Base64 Encoding in Python — Complete Guide with Examples</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
