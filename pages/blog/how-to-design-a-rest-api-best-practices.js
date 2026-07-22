// pages/blog/how-to-design-a-rest-api-best-practices.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowToDesignARestApiBestPractices() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Design a REST API — Best Practices That Actually Matter',
        item: 'https://dev-brains-ai.com/blog/how-to-design-a-rest-api-best-practices',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Design a REST API — Best Practices That Actually Matter',
    description:
      'A practical guide to REST API design — resource naming, HTTP verbs and status codes, versioning, pagination, and a consistent error response format.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-to-design-a-rest-api-best-practices',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Should REST API URLs use plural or singular nouns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use plural nouns for collections, such as /users and /orders. Use the plural form even for a single resource lookup, like /users/42, to keep the pattern consistent across your entire API.',
        },
      },
      {
        '@type': 'Question',
        name: 'What status code should a REST API return for a validation error?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use 400 Bad Request for malformed input or failed validation, and 422 Unprocessable Entity when the request is well-formed but semantically invalid, such as a duplicate email during signup.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should a REST API handle pagination?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Offset-based pagination (page and limit query params) is simple and fine for most admin dashboards. Cursor-based pagination is better for large, frequently changing datasets because it avoids skipped or duplicated rows when data changes between requests.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How to Design a REST API — Best Practices That Actually Matter | Dev Brains AI</title>
        <meta
          name="description"
          content="A practical guide to REST API design — resource naming, HTTP verbs and status codes, versioning, pagination, and a consistent error response format."
        />
        <meta
          name="keywords"
          content="rest api design best practices, api design guide, rest api naming conventions, api versioning, api pagination, api error response format"
        />
        <meta property="og:title" content="How to Design a REST API — Best Practices That Actually Matter" />
        <meta
          property="og:description"
          content="A practical guide to REST API design — resource naming, HTTP verbs and status codes, versioning, pagination, and a consistent error response format."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/how-to-design-a-rest-api-best-practices" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-to-design-a-rest-api-best-practices" />
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
              <li aria-current="page">REST API Design Best Practices</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Design a REST API — Best Practices That Actually Matter
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            A poorly designed REST API costs a team weeks of confusion down the line — inconsistent
            naming, unclear status codes, and error responses that differ from endpoint to endpoint.
            This guide covers the practices that consistently make APIs easier to use, document,
            and maintain, with concrete examples you can apply today.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Resource Naming
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Name endpoints after nouns (resources), not verbs (actions). Use plural nouns
            consistently and nest sub-resources under their parent.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Bad:                          Good:
GET /getUser?id=42            GET /users/42
POST /createOrder             POST /orders
GET /user-orders/42            GET /users/42/orders
POST /deleteProduct/9         DELETE /products/9`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The HTTP verb already expresses the action, so the URL should only describe the
            resource being acted on.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            HTTP Verbs and Status Codes
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>GET</strong> — read a resource or collection, no side effects, safe to cache</li>
            <li><strong>POST</strong> — create a new resource, returns <code>201 Created</code> with a <code>Location</code> header</li>
            <li><strong>PUT</strong> — replace a resource entirely, idempotent</li>
            <li><strong>PATCH</strong> — partially update a resource, also expected to be idempotent</li>
            <li><strong>DELETE</strong> — remove a resource, returns <code>204 No Content</code> on success</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`200 OK              - successful GET, PUT, PATCH
201 Created         - successful POST that created a resource
204 No Content       - successful DELETE, no response body
400 Bad Request     - malformed request or invalid input
401 Unauthorized    - missing or invalid authentication
403 Forbidden       - authenticated but not allowed
404 Not Found       - resource does not exist
409 Conflict        - request conflicts with current state (e.g. duplicate)
422 Unprocessable Entity - valid syntax, invalid semantics
429 Too Many Requests - rate limit exceeded
500 Internal Server Error - unexpected server failure`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Versioning
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Version your API from day one, even if you only ever ship v1. The most common and
            easiest to reason about is URL path versioning:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`GET https://api.example.com/v1/users/42
GET https://api.example.com/v2/users/42`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This makes breaking changes explicit and lets you run v1 and v2 side by side while
            clients migrate. See our dedicated guide on API versioning strategies for header and
            query-param alternatives.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Pagination
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Never return an entire table in one response. Use offset-based pagination for
            simplicity, or cursor-based pagination when the dataset changes frequently.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Offset-based
GET /orders?page=2&limit=25

// Cursor-based
GET /orders?after=eyJpZCI6MTIzfQ&limit=25

// Response should include pagination metadata
{
  "data": [ ... ],
  "meta": { "page": 2, "limit": 25, "total": 340 }
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Consistent Error Response Format
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every endpoint should return errors in the same shape so clients can handle them
            generically instead of writing custom parsing per endpoint.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// 422 Unprocessable Entity
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is already registered",
    "field": "email",
    "requestId": "req_9f3a2c"
  }
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Including a stable <code>code</code> field (not just a human message) lets frontend
            code branch on error type without string matching, and a <code>requestId</code> makes
            support tickets much easier to trace in your logs.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Should REST API URLs use plural or singular nouns?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use plural nouns for collections, such as /users and /orders. Use the plural form
              even for a single resource lookup, like /users/42, to keep the pattern consistent
              across your entire API.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What status code should a REST API return for a validation error?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use 400 Bad Request for malformed input or failed validation, and 422 Unprocessable
              Entity when the request is well-formed but semantically invalid, such as a duplicate
              email during signup.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How should a REST API handle pagination?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Offset-based pagination (page and limit query params) is simple and fine for most
              admin dashboards. Cursor-based pagination is better for large, frequently changing
              datasets because it avoids skipped or duplicated rows when data changes between
              requests.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Got a confusing 4xx or 5xx response while building your API? Paste the error into
              our free AI Error Explainer for an instant, plain-English breakdown and fix.
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
              <li><Link href="/blog/rest-api-vs-graphql-comparison">REST vs GraphQL — A Practical Comparison</Link></li>
              <li><Link href="/blog/api-versioning-strategies-explained">API Versioning Strategies Explained</Link></li>
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/how-to-debug-rest-api-errors-using-ai">How to Debug REST API Errors Using AI</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
