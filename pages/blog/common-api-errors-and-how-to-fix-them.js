import Head from 'next/head';
import Link from 'next/link';

export default function CommonApiErrorsAndHowToFixThem() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Common API Errors and How to Fix Them',
        item: 'https://dev-brains-ai.com/blog/common-api-errors-and-how-to-fix-them',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Common API Errors and How to Fix Them',
    description:
      'A practical breakdown of the REST API error codes developers see most — 400, 401, 403, 404, 429, and 500 — with real causes and fixes for each.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/common-api-errors-and-how-to-fix-them',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between a 401 and a 403 error?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 401 Unauthorized means the request has no valid authentication credentials at all — you are not logged in or your token is missing or expired. A 403 Forbidden means you are authenticated, but your account does not have permission to access that specific resource.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do I get a 429 Too Many Requests error?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 429 error means you have exceeded the API\'s rate limit — too many requests in too short a time window. Fix it by reading the Retry-After header, adding delays between requests, batching calls where possible, or requesting a higher rate limit from the API provider.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I debug a 500 Internal Server Error from an API?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 500 error means the failure happened on the server, not in your request. Check the server logs for a stack trace, since the client response rarely explains the cause. If you do not control the API, retry the request and contact the provider if it persists.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Common API Errors and How to Fix Them | Dev Brains AI</title>
        <meta
          name="description"
          content="A practical guide to the most common REST API error codes — 400, 401, 403, 404, 429, 500 — with real-world causes and how to fix each one."
        />
        <meta
          name="keywords"
          content="common api errors, rest api error codes, 400 bad request, 401 unauthorized, 403 forbidden, 404 not found, 429 too many requests, 500 internal server error"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/common-api-errors-and-how-to-fix-them" />
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
              <li aria-current="page">Common API Errors and How to Fix Them</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Common API Errors and How to Fix Them
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every REST API communicates failure through HTTP status codes, but the same code can mean different
            things depending on the API and the situation. Knowing what each status code actually implies — and
            what to check first — saves hours of guesswork. This guide covers the six error codes developers run
            into most often when integrating with third-party or internal APIs, along with concrete fixes for
            each one.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>400 Bad Request</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A 400 means the server understood who you are and where you&apos;re sending the request, but the
            request body or parameters are malformed or invalid. This is almost always a client-side problem —
            missing a required field, sending a string where a number is expected, or malformed JSON.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`{
  "error": "Bad Request",
  "message": "\\"email\\" is required and must be a valid email address"
}`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Fix: read the error message body carefully — good APIs tell you exactly which field failed validation.
            Validate your payload against the API&apos;s documented schema before sending it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>401 Unauthorized vs 403 Forbidden</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            These two are mixed up constantly. A 401 means the request has no valid credentials at all — your
            API key or bearer token is missing, malformed, or expired. A 403 means you ARE authenticated, but
            your account or token simply doesn&apos;t have permission for that specific action or resource.
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>401: check that the <code>Authorization</code> header is present and formatted as the API expects, e.g. <code>Bearer &lt;token&gt;</code></li>
            <li>401: check whether your token has expired and needs a refresh</li>
            <li>403: check the account&apos;s role or scope — you may need to request elevated API permissions</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>404 Not Found</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A 404 means the URL path itself doesn&apos;t map to any resource on the server. In practice this is
            usually a typo in the endpoint path, a missing ID in the URL, using the wrong API version prefix
            (like <code>/v1/</code> vs <code>/v2/</code>), or querying an ID that was deleted.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Broken: missing the resource id
fetch('https://api.example.com/v1/users/');

// Fixed
fetch('https://api.example.com/v1/users/482');`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>429 Too Many Requests</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            APIs rate-limit clients to protect their infrastructure. A 429 means you crossed that limit. Most
            APIs include a <code>Retry-After</code> header telling you how many seconds to wait.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`async function callWithBackoff(url, options, retries = 3) {
  const res = await fetch(url, options);
  if (res.status === 429 && retries > 0) {
    const wait = Number(res.headers.get('Retry-After') || 2) * 1000;
    await new Promise((r) => setTimeout(r, wait));
    return callWithBackoff(url, options, retries - 1);
  }
  return res;
}`}
          </pre>
          <ol className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Read and respect the <code>Retry-After</code> header instead of retrying instantly</li>
            <li>Batch multiple operations into fewer requests where the API supports it</li>
            <li>Cache responses you don&apos;t need to re-fetch on every call</li>
            <li>Ask the provider for a higher rate limit if your usage genuinely needs it</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>500 Internal Server Error</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Unlike the 4xx codes above, a 500 means the failure is on the server side, not something wrong with
            your request. If it&apos;s your own API, check the server logs — the client response body rarely has
            enough detail to diagnose it. If it&apos;s a third-party API, the safest move is to retry with backoff
            and check the provider&apos;s status page before assuming your code is at fault.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between a 401 and a 403 error?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A 401 Unauthorized means the request has no valid authentication credentials at all — you are not
              logged in or your token is missing or expired. A 403 Forbidden means you are authenticated, but
              your account does not have permission to access that specific resource.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why do I get a 429 Too Many Requests error?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A 429 error means you have exceeded the API&apos;s rate limit — too many requests in too short a
              time window. Fix it by reading the Retry-After header, adding delays between requests, batching
              calls where possible, or requesting a higher rate limit from the API provider.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I debug a 500 Internal Server Error from an API?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A 500 error means the failure happened on the server, not in your request. Check the server logs
              for a stack trace, since the client response rarely explains the cause. If you do not control the
              API, retry the request and contact the provider if it persists.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Turn a cryptic API error into a clear fix</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any API error response into AI Error Explainer to get a plain-English cause and a suggested
              fix, free and instantly.
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
              <li><Link href="/blog/how-to-debug-rest-api-errors-using-ai">How to Debug REST API Errors Using AI</Link></li>
              <li><Link href="/blog/rest-api-vs-graphql-comparison">REST vs GraphQL — A Practical Comparison for Backend Developers</Link></li>
              <li><Link href="/blog/how-to-design-a-rest-api-best-practices">How to Design a REST API — Best Practices That Actually Matter</Link></li>
              <li><Link href="/blog/common-nodejs-npm-errors-and-fixes">Common Node.js and npm Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/fix-nodejs-errors-beginners-india">Fix Common Node.js Errors — Guide for Beginners in India</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
