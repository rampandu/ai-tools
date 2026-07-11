// pages/blog/express-js-error-handling-middleware-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function ExpressJsErrorHandlingMiddlewareGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Express.js Error Handling Middleware — A Complete Guide',
        item: 'https://dev-brains-ai.com/blog/express-js-error-handling-middleware-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Express.js Error Handling Middleware — A Complete Guide',
    description:
      'How to write centralized error-handling middleware in Express.js, with a working code example covering custom error classes, async errors, and 404 handling.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/express-js-error-handling-middleware-guide',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Express know a middleware function is an error handler?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Express identifies error-handling middleware by its function signature having exactly four parameters: (err, req, res, next). Regular middleware only has three (req, res, next). This four-argument signature must be exact, even if you do not use all parameters.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where should error-handling middleware be placed in an Express app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Error-handling middleware must be registered last, after all routes and other app.use() calls. Express only reaches it when next(err) is called or an error is thrown, and it works by being the final fallback in the middleware chain.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I pass an error to Express error-handling middleware?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Call next(err) inside a route handler or middleware. Express skips all remaining regular middleware and routes, and jumps straight to the first error-handling middleware in the chain.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Express.js Error Handling Middleware — A Complete Guide | Dev Brains AI</title>
        <meta
          name="description"
          content="How to write centralized error-handling middleware in Express.js, with a working code example covering custom error classes, async errors, and 404 handling."
        />
        <meta
          name="keywords"
          content="express error handling middleware, express.js error handling, custom error class nodejs, express next(err), express 404 handler"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/express-js-error-handling-middleware-guide" />
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
              <li aria-current="page">Express.js Error Handling Middleware</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Express.js Error Handling Middleware — A Complete Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Scattering <code>try/catch</code> blocks with duplicated error-formatting logic across
            every route is a maintenance headache. Express supports centralized error-handling
            middleware that catches errors from anywhere in your app and formats them consistently.
            This guide builds one from scratch.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Error-Handling Middleware Signature
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Express recognizes error-handling middleware purely by its arity — it must declare
            exactly four parameters. This is not a convention, it's how Express's internals
            distinguish it from regular middleware.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Regular middleware — 3 params
function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

// Error middleware — must be exactly 4 params
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Building a Custom Error Class
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A custom error class lets you attach an HTTP status code and a machine-readable code
            to errors you throw intentionally, distinguishing them from unexpected bugs.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// errors/AppError.js
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // distinguishes expected errors from bugs
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;`}
          </pre>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// routes/users.js
const AppError = require('../errors/AppError');

app.get('/users/:id', asyncHandler(async (req, res, next) => {
  const user = await db.users.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  res.json(user);
}));`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Full Error-Handling Setup
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const express = require('express');
const AppError = require('./errors/AppError');
const app = express();

// Wrapper for async route handlers so rejected promises reach next()
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await db.users.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  res.json(user);
}));

// 404 handler — for routes that don't match anything above
app.use((req, res, next) => {
  next(new AppError(\`Route \${req.originalUrl} not found\`, 404, 'ROUTE_NOT_FOUND'));
});

// Centralized error handler — must be registered LAST
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';

  if (!err.isOperational) {
    // Unexpected bug — log full details for debugging
    console.error('UNEXPECTED ERROR:', err);
  }

  res.status(statusCode).json({
    error: {
      code,
      message: err.isOperational ? err.message : 'Something went wrong',
    },
  });
});

app.listen(3000);`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Middleware Order Matters
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Express processes middleware top-to-bottom in the order it's registered</li>
            <li>Calling <code>next(err)</code> skips all remaining regular middleware and jumps straight to the first error-handling middleware</li>
            <li>The 404 handler must come after all real routes — it only runs if nothing else matched</li>
            <li>The error handler must be the very last <code>app.use()</code> call, or it won't catch errors from routes defined after it</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Mistakes
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This happens when you call <code>res.json()</code> or <code>res.send()</code> and then
            still call <code>next(err)</code> (or vice versa) in the same handler. Always{' '}
            <code>return</code> right after sending a response, or return{' '}
            <code>next(err)</code>, never both.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How does Express know a middleware function is an error handler?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Express identifies error-handling middleware by its function signature having
              exactly four parameters: (err, req, res, next). Regular middleware only has three
              (req, res, next). This four-argument signature must be exact, even if you do not use
              all parameters.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Where should error-handling middleware be placed in an Express app?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Error-handling middleware must be registered last, after all routes and other
              app.use() calls. Express only reaches it when next(err) is called or an error is
              thrown, and it works by being the final fallback in the middleware chain.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I pass an error to Express error-handling middleware?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Call next(err) inside a route handler or middleware. Express skips all remaining
              regular middleware and routes, and jumps straight to the first error-handling
              middleware in the chain.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Hit an Express error you don't recognize, like ERR_HTTP_HEADERS_SENT? Paste it into
              our free AI Error Explainer for an instant, plain-English fix.
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
              <li><Link href="/blog/how-to-handle-async-errors-in-nodejs">How to Handle Async Errors in Node.js</Link></li>
              <li><Link href="/blog/cors-error-explained-and-how-to-fix-it">CORS Error Explained — And How to Fix It</Link></li>
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/how-to-design-a-rest-api-best-practices">How to Design a REST API — Best Practices</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
