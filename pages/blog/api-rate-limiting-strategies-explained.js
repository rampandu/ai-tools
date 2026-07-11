// pages/blog/api-rate-limiting-strategies-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function ApiRateLimitingStrategiesExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'API Rate Limiting Strategies Explained (With Node.js Examples)',
        item: 'https://dev-brains-ai.com/blog/api-rate-limiting-strategies-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'API Rate Limiting Strategies Explained (With Node.js Examples)',
    description:
      'Understand fixed window, sliding window, and token bucket rate limiting algorithms, with a working Node.js/Express middleware example for each.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/api-rate-limiting-strategies-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between fixed window and sliding window rate limiting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fixed window counts requests in discrete time buckets, like per minute, which can allow a burst of 2x the limit right at the window boundary. Sliding window smooths this out by counting requests over a rolling time period, giving a more accurate and fair limit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What HTTP status code should a rate-limited API return?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Return 429 Too Many Requests, along with a Retry-After header telling the client how many seconds to wait before retrying.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is token bucket a popular choice for API rate limiting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Token bucket allows short bursts of traffic up to the bucket capacity while still enforcing a steady average rate over time, which matches real-world client behavior better than a strict fixed cap.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>API Rate Limiting Strategies Explained (With Node.js Examples) | Dev Brains AI</title>
        <meta
          name="description"
          content="Understand fixed window, sliding window, and token bucket rate limiting algorithms, with a working Node.js/Express middleware example for each."
        />
        <meta
          name="keywords"
          content="api rate limiting, rate limiting algorithms, token bucket, sliding window rate limit, express rate limit middleware, nodejs rate limiting"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/api-rate-limiting-strategies-explained" />
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
              <li aria-current="page">API Rate Limiting Strategies</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            API Rate Limiting Strategies Explained (With Node.js Examples)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Rate limiting protects your API from abuse, accidental infinite loops in client code,
            and traffic spikes that could take down your database. There are three algorithms
            worth knowing: fixed window, sliding window, and token bucket. This guide explains
            each one and shows a working Express.js middleware implementation.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Fixed Window
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Fixed window counts requests within a discrete time bucket, like "0-60 seconds" then
            "60-120 seconds". It resets the counter to zero at each boundary. It is the simplest
            algorithm to implement but has a burst problem: a client can send the full limit right
            before a window ends, then the full limit again right after — doubling the effective
            rate for a short period.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const requestCounts = new Map(); // key -> { count, windowStart }
const WINDOW_MS = 60_000;
const LIMIT = 100;

function fixedWindowLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const entry = requestCounts.get(key);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    requestCounts.set(key, { count: 1, windowStart: now });
    return next();
  }

  if (entry.count >= LIMIT) {
    res.set('Retry-After', Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000));
    return res.status(429).json({ error: 'Too many requests' });
  }

  entry.count++;
  next();
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Sliding Window
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Sliding window fixes the boundary-burst problem by tracking a rolling time period
            instead of a fixed bucket. A simple approach stores timestamps and counts how many
            fall within the last N milliseconds.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const timestamps = new Map(); // key -> array of request times
const WINDOW_MS = 60_000;
const LIMIT = 100;

function slidingWindowLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const arr = (timestamps.get(key) || []).filter(t => now - t < WINDOW_MS);

  if (arr.length >= LIMIT) {
    res.set('Retry-After', '1');
    return res.status(429).json({ error: 'Too many requests' });
  }

  arr.push(now);
  timestamps.set(key, arr);
  next();
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This is more accurate but uses more memory per key since it stores individual
            timestamps. In production, this state is usually kept in Redis with sorted sets
            (<code>ZADD</code> / <code>ZREMRANGEBYSCORE</code>) instead of an in-process Map, so
            the limit applies correctly across multiple server instances.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Token Bucket
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Token bucket models a bucket that holds up to N tokens. Tokens refill at a steady rate,
            and each request consumes one token. If the bucket is empty, the request is rejected.
            This allows short bursts (spending saved-up tokens) while still enforcing a long-term
            average rate — closer to how real clients actually behave.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const buckets = new Map(); // key -> { tokens, lastRefill }
const CAPACITY = 20;
const REFILL_RATE = 5; // tokens per second

function tokenBucketLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  let bucket = buckets.get(key) || { tokens: CAPACITY, lastRefill: now };

  const elapsedSeconds = (now - bucket.lastRefill) / 1000;
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + elapsedSeconds * REFILL_RATE);
  bucket.lastRefill = now;

  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    res.set('Retry-After', '1');
    return res.status(429).json({ error: 'Too many requests' });
  }

  bucket.tokens -= 1;
  buckets.set(key, bucket);
  next();
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Choosing an Algorithm
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Fixed window</strong> — simplest, good enough for internal tools or low-stakes endpoints</li>
            <li><strong>Sliding window</strong> — accurate and fair, best for public APIs with strict SLAs</li>
            <li><strong>Token bucket</strong> — best when you want to allow legitimate bursts (e.g. a user syncing many items at once) without raising the sustained limit</li>
            <li>In production, prefer battle-tested libraries like <code>express-rate-limit</code> or <code>rate-limiter-flexible</code> backed by Redis instead of hand-rolled in-memory maps, which break under multiple server instances</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between fixed window and sliding window rate limiting?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Fixed window counts requests in discrete time buckets, like per minute, which can
              allow a burst of 2x the limit right at the window boundary. Sliding window smooths
              this out by counting requests over a rolling time period, giving a more accurate and
              fair limit.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What HTTP status code should a rate-limited API return?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Return 429 Too Many Requests, along with a Retry-After header telling the client how
              many seconds to wait before retrying.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why is token bucket a popular choice for API rate limiting?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Token bucket allows short bursts of traffic up to the bucket capacity while still
              enforcing a steady average rate over time, which matches real-world client behavior
              better than a strict fixed cap.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Seeing unexpected 429 responses or rate-limiter bugs in production? Paste the error
              into our free AI Error Explainer to get a clear cause and fix.
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
              <li><Link href="/blog/how-to-design-a-rest-api-best-practices">How to Design a REST API — Best Practices</Link></li>
              <li><Link href="/blog/api-authentication-methods-explained-oauth-jwt-apikey">API Authentication Methods Explained</Link></li>
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/how-to-debug-rest-api-errors-using-ai">How to Debug REST API Errors Using AI</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
