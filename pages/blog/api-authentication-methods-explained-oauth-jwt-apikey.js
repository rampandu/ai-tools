// pages/blog/api-authentication-methods-explained-oauth-jwt-apikey.js
import Head from 'next/head';
import Link from 'next/link';

export default function ApiAuthenticationMethodsExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'API Authentication Methods Explained — API Keys vs JWT vs OAuth 2.0',
        item: 'https://dev-brains-ai.com/blog/api-authentication-methods-explained-oauth-jwt-apikey',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'API Keys vs JWT vs OAuth 2.0: Which Should You Use?',
    description:
      'Compare API keys, JWT bearer tokens, and OAuth 2.0 side by side with code samples for each, so you can pick the right authentication method instead of guessing.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/api-authentication-methods-explained-oauth-jwt-apikey',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between an API key and a JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An API key is an opaque random string looked up in a database to identify the caller, with no information encoded in it. A JWT is a self-contained token that encodes claims like user ID and expiry directly in its payload, verifiable with a signature, without a database lookup.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use OAuth 2.0 instead of API keys?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use OAuth 2.0 when a third-party application needs limited access to a user\'s account without ever seeing their password, such as "Sign in with Google" or letting an app post to a user\'s social media on their behalf. Use API keys for simple server-to-server or internal integrations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are JWTs secure to store in localStorage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Storing JWTs in localStorage exposes them to theft via XSS attacks, since any injected script can read localStorage. A more secure pattern is storing the token in an httpOnly, Secure cookie, which JavaScript cannot access.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>API Keys vs JWT vs OAuth 2.0: Which Should You Use? | Dev Brains AI</title>
        <meta
          name="description"
          content="Compare API keys, JWT bearer tokens, and OAuth 2.0 side by side with code samples for each, so you can pick the right authentication method instead of guessing."
        />
        <meta
          name="keywords"
          content="api key vs jwt vs oauth, api authentication methods, oauth 2.0 explained, jwt bearer token, api security, authentication methods comparison"
        />
        <meta property="og:title" content="API Keys vs JWT vs OAuth 2.0: Which Should You Use?" />
        <meta
          property="og:description"
          content="Compare API keys, JWT bearer tokens, and OAuth 2.0 side by side with code samples for each, so you can pick the right authentication method instead of guessing."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/api-authentication-methods-explained-oauth-jwt-apikey" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/api-authentication-methods-explained-oauth-jwt-apikey" />
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
              <li aria-current="page">API Authentication Methods</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            API Authentication Methods Explained — API Keys vs JWT vs OAuth 2.0
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            "How should I authenticate this API?" is one of the most common design questions
            developers face, and the three usual answers — API keys, JWT, and OAuth 2.0 — solve
            different problems. Picking the wrong one adds needless complexity or leaves security
            gaps. Here is how each works and when to reach for it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            API Keys
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An API key is a static, opaque string issued to a client. The server looks it up in a
            database to identify who is calling and what they're allowed to do. It carries no
            information itself — it's just an identifier.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`GET /api/weather?city=Mumbai HTTP/1.1
X-API-Key: YOUR_API_KEY_HERE

// Server-side check
const key = req.headers['x-api-key'];
const client = await db.apiKeys.findOne({ key, active: true });
if (!client) return res.status(401).json({ error: 'Invalid API key' });`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Best for server-to-server calls, public data APIs, and simple internal tools. Weak
            point: if a key leaks, it's valid until manually revoked, and keys typically don't
            expire on their own.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            JWT Bearer Tokens
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A JSON Web Token is a self-contained, signed token. It encodes claims (user ID, roles,
            expiry) directly in its payload, so the server can verify it using a signature check
            without a database round trip.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsImV4cCI6MTcxOTg2MDAwMH0.4z1p...

// Node.js verification (jsonwebtoken)
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Best for stateless authentication in your own frontend/backend systems — login
            sessions, mobile app APIs. Weak point: a JWT cannot be easily revoked before it
            expires unless you maintain a blocklist, which reintroduces server-side state.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            OAuth 2.0
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            OAuth 2.0 is not itself a token format — it's a protocol for granting a third-party
            application limited access to a user's resources without ever sharing the user's
            password. The most common flow is Authorization Code:
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>User clicks "Sign in with Google" on your app</li>
            <li>Your app redirects to Google's authorization server</li>
            <li>User logs in and approves the requested scopes (e.g. "read your email")</li>
            <li>Google redirects back to your app with a one-time authorization code</li>
            <li>Your backend exchanges that code for an access token (and optionally a refresh token)</li>
            <li>Your app uses the access token to call Google's API on the user's behalf</li>
          </ol>
          <p className="small" style={{ marginBottom: 14 }}>
            Best for third-party integrations, "Sign in with X" flows, and delegated access. It's
            deliberately more complex than API keys or plain JWTs because it's solving a harder
            problem: granting scoped access without ever exposing credentials.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Side-by-Side Comparison
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>API keys</strong> — simplest, no expiry by default, best for server-to-server and public APIs</li>
            <li><strong>JWT</strong> — stateless, self-verifying, best for your own app's login sessions, harder to revoke early</li>
            <li><strong>OAuth 2.0</strong> — most complex, purpose-built for delegated third-party access without sharing passwords</li>
            <li>Many real systems combine them — OAuth 2.0 to authenticate a user, then issue a JWT as the app's own session token</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between an API key and a JWT?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              An API key is an opaque random string looked up in a database to identify the
              caller, with no information encoded in it. A JWT is a self-contained token that
              encodes claims like user ID and expiry directly in its payload, verifiable with a
              signature, without a database lookup.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>When should I use OAuth 2.0 instead of API keys?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use OAuth 2.0 when a third-party application needs limited access to a user's
              account without ever seeing their password, such as "Sign in with Google" or letting
              an app post to a user's social media on their behalf. Use API keys for simple
              server-to-server or internal integrations.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Are JWTs secure to store in localStorage?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Storing JWTs in localStorage exposes them to theft via XSS attacks, since any
              injected script can read localStorage. A more secure pattern is storing the token in
              an httpOnly, Secure cookie, which JavaScript cannot access.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Hit a confusing 401 or "invalid token" error while wiring up authentication? Paste
              it into our free AI Error Explainer for a plain-English cause and fix.
            </p>
            <Link href="/ai-error-explainer">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Try AI Error Explainer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/cors-error-explained-and-how-to-fix-it">CORS Error Explained — And How to Fix It</Link></li>
              <li><Link href="/blog/how-to-design-a-rest-api-best-practices">How to Design a REST API — Best Practices</Link></li>
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/api-rate-limiting-strategies-explained">API Rate Limiting Strategies Explained</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
