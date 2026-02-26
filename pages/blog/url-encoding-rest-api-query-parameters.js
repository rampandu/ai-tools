// pages/blog/url-encoding-rest-api-query-parameters.js
import Head from 'next/head';
import Link from 'next/link';

export default function UrlEncodingRestApi() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'URL Encoding for REST API Query Parameters',
        item: 'https://dev-brains-ai.com/blog/url-encoding-rest-api-query-parameters',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'URL Encoding for REST API Query Parameters',
    description:
      'Learn why and how to correctly URL-encode REST API query parameters. Covers encodeURIComponent, URLSearchParams, fetch, axios, and common mistakes that break API calls.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/url-encoding-rest-api-query-parameters',
  };

  return (
    <>
      <Head>
        <title>URL Encoding for REST API Query Parameters | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how to correctly URL-encode REST API query parameters in JavaScript. Covers encodeURIComponent, URLSearchParams, fetch, axios, and the common mistakes that silently break your API calls."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/url-encoding-rest-api-query-parameters" />
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
              <li aria-current="page">URL Encoding for REST APIs</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            URL Encoding for REST API Query Parameters
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            One of the most common sources of silent bugs in API integrations is incorrect URL
            encoding. An unencoded ampersand in a search query, a space in a date parameter, or a
            slash in a file name can corrupt the entire URL, causing the server to receive the wrong
            data while your code gets back a confusing 400 or empty result set. This guide covers
            how to encode query parameters correctly in JavaScript.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>The problem — unencoded special characters</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Looks fine, but & breaks the query string:
const search = 'oil & gas';
fetch(\`/api/companies?industry=\${search}\`);
// Sends: /api/companies?industry=oil & gas
// Server sees: industry=oil (gas becomes a separate unknown param)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Fix 1 — encodeURIComponent</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`const search = 'oil & gas';
fetch(\`/api/companies?industry=\${encodeURIComponent(search)}\`);
// Sends: /api/companies?industry=oil%20%26%20gas ✅`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Fix 2 — URLSearchParams (recommended)</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>URLSearchParams</code> handles all encoding automatically and is the cleanest
            approach for building query strings:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`const params = new URLSearchParams({
  industry: 'oil & gas',
  country: 'India',
  minRevenue: 5000000,
  startDate: '2024-01-01T00:00:00Z',
});

fetch(\`/api/companies?\${params}\`);
// /api/companies?industry=oil+%26+gas&country=India&minRevenue=5000000&startDate=2024-01-01T00%3A00%3A00Z`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Building URLs with the URL API</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`const url = new URL('https://api.example.com/search');
url.searchParams.set('q', 'cron scheduler & automation');
url.searchParams.set('page', 2);
url.searchParams.set('sort', 'relevance');

console.log(url.toString());
// https://api.example.com/search?q=cron+scheduler+%26+automation&page=2&sort=relevance

fetch(url); // works directly with a URL object`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Axios — params option (auto-encodes)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`import axios from 'axios';

// Pass params as an object — axios encodes them automatically
const response = await axios.get('/api/companies', {
  params: {
    industry: 'oil & gas',
    country: 'India',
  },
});
// No manual encoding needed ✅`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Encoding path segments vs query parameters</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Path segments and query values are encoded slightly differently. A slash{' '}
            <code>/</code> in a path segment must become <code>%2F</code>, but query values use{' '}
            <code>encodeURIComponent</code> which also encodes slashes:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// File path in URL path segment
const fileName = 'reports/2024/Q1.pdf';
const url = \`/files/\${encodeURIComponent(fileName)}\`;
// /files/reports%2F2024%2FQ1.pdf

// vs query param — same function, same result
const dlUrl = \`/download?file=\${encodeURIComponent(fileName)}\`;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Server-side: reading encoded params in Node.js</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Express automatically decodes query params
app.get('/search', (req, res) => {
  const industry = req.query.industry;
  // 'oil & gas' — already decoded by Express ✅
  res.json({ industry });
});

// Manually with the URL API in Node.js 18+
const url = new URL(req.url, 'https://example.com');
const q = url.searchParams.get('q'); // auto-decoded`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Checklist for safe API query strings</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Never concatenate user input directly into a URL string.</li>
            <li>Use <code>URLSearchParams</code> or <code>axios params</code> — they encode automatically.</li>
            <li>When using <code>encodeURIComponent</code> manually, apply it only to values, not the entire URL.</li>
            <li>Watch out for double-encoding: if a value is already encoded, encoding again produces <code>%2520</code> (encoded percent sign).</li>
            <li>Dates with colons and plus signs need encoding: <code>2024-01-01T09:00+05:30</code> → <code>2024-01-01T09%3A00%2B05%3A30</code>.</li>
          </ul>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Encode or decode instantly</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use our <Link href="/url-encoder">free URL Encoder / Decoder</Link> to percent-encode
            parameter values before pasting them into requests, or decode encoded strings from API
            logs to read them clearly.
          </p>

        </article>
      </main>
    </>
  );
}
