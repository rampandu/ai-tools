// pages/blog/api-versioning-strategies-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function ApiVersioningStrategiesExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'API Versioning Strategies Explained — URL, Header, and Query Param',
        item: 'https://dev-brains-ai.com/blog/api-versioning-strategies-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'API Versioning Strategies Explained — URL, Header, and Query Param',
    description:
      'Compare the three main API versioning strategies — URL path versioning, header versioning, and query parameter versioning — with the trade-offs of each.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/api-versioning-strategies-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the most common API versioning strategy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'URL path versioning, such as /v1/users and /v2/users, is the most common strategy because it is simple, visible in logs and browser history, and easy for API consumers to understand at a glance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does versioning an API break REST principles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'URL path versioning is debated among REST purists because a resource technically should have one canonical URL. In practice, most production APIs prioritize practical client stability over strict REST purity, and URL versioning remains widely used.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I introduce a new API version instead of just changing the response?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Introduce a new version for breaking changes: removing or renaming a field, changing a field\'s data type, or altering required request parameters. Additive, backward-compatible changes like adding a new optional field do not require a new version.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>API Versioning Strategies Explained — URL, Header, and Query Param | Dev Brains AI</title>
        <meta
          name="description"
          content="Compare the three main API versioning strategies — URL path versioning, header versioning, and query parameter versioning — with the trade-offs of each."
        />
        <meta
          name="keywords"
          content="api versioning strategies, url path versioning, header versioning api, api version query parameter, rest api versioning best practices"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/api-versioning-strategies-explained" />
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
              <li aria-current="page">API Versioning Strategies</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            API Versioning Strategies Explained — URL, Header, and Query Param
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            The moment an API has external consumers, you cannot freely change response shapes
            without breaking someone's integration. Versioning gives you a safe way to evolve the
            API. There are three common strategies, and each makes a different trade-off between
            simplicity, cacheability, and REST purity.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            URL Path Versioning
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The version is embedded directly in the URL path. It's the most widely used approach
            because it's immediately visible and simple to route.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`GET https://api.example.com/v1/users/42
GET https://api.example.com/v2/users/42

// Express routing
const v1Router = require('./routes/v1/users');
const v2Router = require('./routes/v2/users');

app.use('/v1/users', v1Router);
app.use('/v2/users', v2Router);`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Pros</strong> — obvious and self-documenting, trivial to route, cache-friendly since the URL itself changes</li>
            <li><strong>Cons</strong> — some REST purists argue a resource should have one canonical URL regardless of representation</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Header Versioning
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The version is passed in a custom header or via HTTP content negotiation using the{' '}
            <code>Accept</code> header, keeping the URL itself stable.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`GET /users/42 HTTP/1.1
Accept: application/vnd.example.v2+json

// or a custom header
GET /users/42 HTTP/1.1
X-API-Version: 2

// Express middleware
app.use((req, res, next) => {
  req.apiVersion = req.headers['x-api-version'] || '1';
  next();
});`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Pros</strong> — keeps URLs clean and semantically stable, considered more "correct" REST by purists</li>
            <li><strong>Cons</strong> — harder to test quickly in a browser address bar, less visible in server access logs, easy for clients to forget to set the header</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Query Parameter Versioning
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`GET https://api.example.com/users/42?version=2

app.get('/users/:id', (req, res) => {
  const version = req.query.version || '1';
  if (version === '2') return res.json(getUserV2(req.params.id));
  return res.json(getUserV1(req.params.id));
});`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Pros</strong> — easy to test in a browser, optional (can default sensibly), simple to add to an existing API without route restructuring</li>
            <li><strong>Cons</strong> — easy to forget or omit, mixes routing concerns into query string parsing, complicates caching because the same path serves different content based on a param</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Practical Recommendation
          </h2>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>For public APIs with external consumers, use URL path versioning — it's the clearest contract</li>
            <li>Only bump the major version for breaking changes; additive fields don't need a new version</li>
            <li>Keep at most two versions live at once (current + previous) and set a clear deprecation timeline</li>
            <li>Document deprecations with a <code>Sunset</code> or <code>Deprecation</code> response header so automated tooling can detect it</li>
          </ol>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`HTTP/1.1 200 OK
Deprecation: true
Sunset: Sat, 31 Oct 2026 23:59:59 GMT
Link: <https://api.example.com/v2/users/42>; rel="successor-version"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the most common API versioning strategy?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              URL path versioning, such as /v1/users and /v2/users, is the most common strategy
              because it is simple, visible in logs and browser history, and easy for API
              consumers to understand at a glance.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does versioning an API break REST principles?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              URL path versioning is debated among REST purists because a resource technically
              should have one canonical URL. In practice, most production APIs prioritize
              practical client stability over strict REST purity, and URL versioning remains
              widely used.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>When should I introduce a new API version instead of just changing the response?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Introduce a new version for breaking changes: removing or renaming a field, changing
              a field's data type, or altering required request parameters. Additive,
              backward-compatible changes like adding a new optional field do not require a new
              version.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Migrating clients between API versions and hitting unexpected errors? Paste them
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
              <li><Link href="/blog/how-to-design-a-rest-api-best-practices">How to Design a REST API — Best Practices</Link></li>
              <li><Link href="/blog/rest-api-vs-graphql-comparison">REST vs GraphQL — A Practical Comparison</Link></li>
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/how-to-debug-rest-api-errors-using-ai">How to Debug REST API Errors Using AI</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
