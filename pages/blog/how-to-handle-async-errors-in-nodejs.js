// pages/blog/how-to-handle-async-errors-in-nodejs.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowToHandleAsyncErrorsInNodejs() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Handle Async Errors in Node.js the Right Way',
        item: 'https://dev-brains-ai.com/blog/how-to-handle-async-errors-in-nodejs',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Node.js Async Error Handling: Avoid Unhandled Rejections',
    description:
      'Stop silent crashes from unhandled promise rejections in Node.js — working try/catch patterns, an Express async route wrapper, and Promise.allSettled examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-to-handle-async-errors-in-nodejs',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What causes an UnhandledPromiseRejectionWarning in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It happens when a Promise rejects (throws inside an async function, or calls reject()) and nothing in your code catches that rejection with a .catch() or a try/catch around an await.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does try/catch work with async/await in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Wrapping an await call in try/catch works exactly like synchronous error handling, because await unwraps the Promise and re-throws its rejection as a catchable exception inside the async function.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do async errors in Express routes crash the server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Express does not automatically catch errors thrown inside async route handlers in versions before Express 5. If you do not wrap the handler in try/catch or an async error-catching helper, the rejection becomes unhandled and can crash the process.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Node.js Async Error Handling: Avoid Unhandled Rejections | Dev Brains AI</title>
        <meta
          name="description"
          content="Stop silent crashes from unhandled promise rejections in Node.js — working try/catch patterns, an Express async route wrapper, and Promise.allSettled examples."
        />
        <meta
          name="keywords"
          content="nodejs async errors, unhandled promise rejection, async await error handling, try catch async javascript, express async errors, promise.allsettled"
        />
        <meta property="og:title" content="Node.js Async Error Handling: Avoid Unhandled Rejections" />
        <meta property="og:description" content="Stop silent crashes from unhandled promise rejections in Node.js — working try/catch patterns, an Express async route wrapper, and Promise.allSettled examples." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/how-to-handle-async-errors-in-nodejs" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-to-handle-async-errors-in-nodejs" />
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
              <li aria-current="page">Async Errors in Node.js</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Handle Async Errors in Node.js the Right Way
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Async code fails differently than synchronous code, and Node.js will not always warn
            you loudly when it does. A missed <code>.catch()</code> or an unwrapped{' '}
            <code>await</code> can silently swallow an error or, worse, crash your entire process.
            This guide covers the patterns that keep async error handling predictable.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Unhandled Promise Rejections
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`(node:12345) UnhandledPromiseRejectionWarning: Error: connect ECONNREFUSED 127.0.0.1:5432
(node:12345) UnhandledPromiseRejectionWarning: Unhandled promise rejection.
This error originated either by throwing inside of an async function without a
catch block, or by rejecting a promise which was not handled with .catch().`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Since Node.js 15, an unhandled rejection crashes the process by default instead of
            just printing a warning. This is a good thing — it surfaces bugs early instead of
            letting them fail silently in production.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Bad: no .catch(), rejection is unhandled
async function loadUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}
loadUser(42); // if fetch fails, this rejection is never caught

// Good: caught explicitly
loadUser(42).catch(err => console.error('Failed to load user:', err.message));`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            try/catch with async/await
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>await</code> converts a Promise rejection into a normal thrown exception inside
            an <code>async</code> function, so plain <code>try/catch</code> works as expected.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`async function getUserOrders(userId) {
  try {
    const user = await db.users.findById(userId);
    if (!user) throw new Error('User not found');

    const orders = await db.orders.findByUserId(userId);
    return orders;
  } catch (err) {
    console.error('getUserOrders failed:', err.message);
    throw err; // re-throw so the caller can also decide what to do
  }
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            A common mistake is forgetting <code>await</code> before a call inside the try block —
            without it, the Promise rejection happens outside the try/catch's synchronous scope
            and becomes unhandled.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Async Errors in Express Route Handlers
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Express (before v5) does not catch rejected Promises thrown inside async route
            handlers automatically. This is a very common source of crashed servers in production.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Dangerous: if db.users.findById throws, Express never sees it,
// the request hangs, and the rejection may crash the process
app.get('/users/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json(user);
});

// Safer: wrap every async handler
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await db.users.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}));

// Central error handler catches everything forwarded via next(err)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Popular libraries like <code>express-async-errors</code> patch Express to do this
            automatically, so you don't need to wrap every single handler by hand.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Handling Multiple Async Operations
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Promise.all()</strong> — rejects immediately if any promise rejects; good when all results are required and a single failure should stop everything</li>
            <li><strong>Promise.allSettled()</strong> — always resolves, giving you the status of each promise; good when partial failures are acceptable</li>
            <li><strong>Sequential awaits</strong> — use when operations depend on each other's results, and you want to fail fast at the first error</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(2),
  fetchUser(999), // does not exist, rejects
]);

results.forEach((r, i) => {
  if (r.status === 'rejected') console.error(\`User \${i} failed:\`, r.reason.message);
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Global Safety Nets
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Use process-level handlers as a last line of defense — log the error and exit
            gracefully, don't rely on them to keep running indefinitely with corrupted state.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  // log to monitoring, then exit; a process manager (pm2, systemd) restarts it
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What causes an UnhandledPromiseRejectionWarning in Node.js?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              It happens when a Promise rejects (throws inside an async function, or calls
              reject()) and nothing in your code catches that rejection with a .catch() or a
              try/catch around an await.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does try/catch work with async/await in Node.js?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Wrapping an await call in try/catch works exactly like synchronous error
              handling, because await unwraps the Promise and re-throws its rejection as a
              catchable exception inside the async function.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why do async errors in Express routes crash the server?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Express does not automatically catch errors thrown inside async route handlers in
              versions before Express 5. If you do not wrap the handler in try/catch or an async
              error-catching helper, the rejection becomes unhandled and can crash the process.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Stuck on an unhandled rejection or a confusing async stack trace? Paste it into our
              free AI Error Explainer for an instant, plain-English fix.
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
              <li><Link href="/blog/common-nodejs-npm-errors-and-fixes">Common Node.js and npm Errors and Fixes</Link></li>
              <li><Link href="/blog/express-js-error-handling-middleware-guide">Express.js Error Handling Middleware Guide</Link></li>
              <li><Link href="/blog/debugging-memory-leaks-in-nodejs">Debugging Memory Leaks in Node.js</Link></li>
              <li><Link href="/blog/fix-nodejs-errors-beginners-india">Fix Node.js Errors — Beginners India</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
