// pages/blog/cors-error-explained-and-how-to-fix-it.js
import Head from 'next/head';
import Link from 'next/link';

export default function CorsErrorExplainedAndHowToFixIt() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'CORS Error Explained — And How to Fix It on Express.js',
        item: 'https://dev-brains-ai.com/blog/cors-error-explained-and-how-to-fix-it',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'CORS Error Explained — And How to Fix It on Express.js',
    description:
      'What causes the classic "No Access-Control-Allow-Origin header" CORS error, how CORS headers actually work, and how to fix it properly on an Express backend.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cors-error-explained-and-how-to-fix-it',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does the CORS error happen only in the browser and not in Postman?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CORS is a browser security mechanism, not a server-side restriction. Tools like Postman, curl, or server-to-server requests are not subject to CORS, so they succeed even when the same request would be blocked in a browser tab.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I fix a CORS error by setting Access-Control-Allow-Origin to a wildcard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Setting it to * works for public, unauthenticated APIs, but it cannot be combined with credentials: include or cookies. If your requests use cookies or Authorization headers with credentials, you must return the exact requesting origin instead of a wildcard.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a CORS preflight request?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A preflight is an automatic OPTIONS request the browser sends before certain requests, such as those with custom headers or non-simple methods like PUT and DELETE. The server must respond to OPTIONS with the correct CORS headers, or the actual request never gets sent.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>CORS Error Explained — And How to Fix It on Express.js | Dev Brains AI</title>
        <meta
          name="description"
          content='What causes the classic "No Access-Control-Allow-Origin header" CORS error, how CORS headers work, and how to fix it on an Express.js backend.'
        />
        <meta
          name="keywords"
          content="cors error, access-control-allow-origin, fix cors error, cors express js, cors preflight request, cors error nodejs"
        />
        <meta property="og:title" content="CORS Error Explained — And How to Fix It on Express.js" />
        <meta property="og:description" content='What causes the classic "No Access-Control-Allow-Origin header" CORS error, how CORS headers work, and how to fix it on an Express.js backend.' />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/cors-error-explained-and-how-to-fix-it" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cors-error-explained-and-how-to-fix-it" />
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
              <li aria-current="page">CORS Error Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            CORS Error Explained — And How to Fix It on Express.js
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Almost every developer hits this wall at some point: your frontend calls your API,
            works fine in Postman, but the browser console shows a CORS error. This guide explains
            exactly what is happening, why it exists, and how to fix it correctly — not by blindly
            pasting a wildcard header and hoping for the best.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Classic Error
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            You'll typically see something like this in the browser console:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Access to fetch at 'http://localhost:5000/api/users' from origin
'http://localhost:3000' has been blocked by CORS policy: No
'Access-Control-Allow-Origin' header is present on the requested resource.`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This is not a network failure and not a bug in your fetch call — the request usually
            reaches the server and even returns a valid response. The browser itself blocks
            JavaScript from reading that response because the server did not explicitly allow it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What CORS Actually Is
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts
            JavaScript running on one origin (e.g. <code>http://localhost:3000</code>) from reading
            responses from a different origin (e.g. <code>http://localhost:5000</code>) unless the
            server explicitly opts in via response headers. Two origins differ if the protocol,
            domain, or port is different.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><code>http://localhost:3000</code> vs <code>http://localhost:5000</code> — different ports, different origins</li>
            <li><code>http://example.com</code> vs <code>https://example.com</code> — different protocols, different origins</li>
            <li><code>https://app.example.com</code> vs <code>https://api.example.com</code> — different subdomains, different origins</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            This exists to prevent a malicious website from silently making authenticated requests
            to your bank or email provider using your logged-in browser session and reading the
            response.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Preflight Requests
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For "non-simple" requests — custom headers like <code>Authorization</code>, methods
            like <code>PUT</code>/<code>DELETE</code>, or a JSON content type — the browser first
            sends an automatic <code>OPTIONS</code> request to check if the real request is
            allowed.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`OPTIONS /api/users HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, Authorization

// Server must respond with something like:
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            If the server does not handle <code>OPTIONS</code> correctly — a very common mistake —
            the browser never sends the real request at all.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Fixing It on Express.js
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The easiest and most reliable fix is the official <code>cors</code> npm package, which
            handles preflight automatically.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`npm install cors`}
          </pre>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // required if the client sends cookies
}));

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(5000);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            If you're sending cookies or using <code>fetch(url, &#123; credentials: 'include' &#125;)</code> on
            the frontend, you cannot use <code>origin: '*'</code> — you must specify the exact
            allowed origin(s), and set <code>credentials: true</code> on both the server and the
            fetch call.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Mistakes
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Setting CORS headers only on successful responses, but not on error responses — errors need the header too, or the browser hides the real error from your JS code</li>
            <li>Forgetting that a reverse proxy (Nginx) in front of your app can strip or duplicate CORS headers if both Nginx and Express try to set them</li>
            <li>Using <code>origin: '*'</code> together with <code>credentials: true</code> — this combination is invalid and browsers will reject it</li>
            <li>Not handling the <code>OPTIONS</code> method explicitly when writing CORS headers by hand instead of using the <code>cors</code> package</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does the CORS error happen only in the browser and not in Postman?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              CORS is a browser security mechanism, not a server-side restriction. Tools like
              Postman, curl, or server-to-server requests are not subject to CORS, so they succeed
              even when the same request would be blocked in a browser tab.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I fix a CORS error by setting Access-Control-Allow-Origin to a wildcard?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Setting it to * works for public, unauthenticated APIs, but it cannot be combined
              with credentials: include or cookies. If your requests use cookies or Authorization
              headers with credentials, you must return the exact requesting origin instead of a
              wildcard.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a CORS preflight request?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A preflight is an automatic OPTIONS request the browser sends before certain
              requests, such as those with custom headers or non-simple methods like PUT and
              DELETE. The server must respond to OPTIONS with the correct CORS headers, or the
              actual request never gets sent.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Stuck on a CORS error you can't quite figure out? Paste the exact console message
              into our free AI Error Explainer for a plain-English cause and fix.
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
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/express-js-error-handling-middleware-guide">Express.js Error Handling Middleware Guide</Link></li>
              <li><Link href="/blog/api-authentication-methods-explained-oauth-jwt-apikey">API Authentication Methods Explained</Link></li>
              <li><Link href="/blog/how-to-debug-rest-api-errors-using-ai">How to Debug REST API Errors Using AI</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
