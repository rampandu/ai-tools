// pages/blog/regex-for-url-validation-javascript.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForUrlValidationJavascript() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for URL Validation in JavaScript',
        item: 'https://dev-brains-ai.com/blog/regex-for-url-validation-javascript',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for URL Validation in JavaScript — Patterns and When to Use the URL API Instead',
    description:
      'Regex patterns to validate URLs in JavaScript — protocol, domain, port, path, and query string — plus when the built-in URL constructor is the safer choice.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-url-validation-javascript',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good regex for validating a URL in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A practical pattern is /^(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, which handles protocol, www, domain, and path/query segments for most common cases.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use regex or the URL constructor to validate URLs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For strict correctness, use the built-in URL constructor (new URL(string)) wrapped in a try/catch — it parses per the WHATWG URL spec and handles edge cases regex cannot. Use regex only for lightweight pattern checks like detecting URLs inside free text.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does a regex-matched URL guarantee the site is reachable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex and the URL constructor both only validate syntax/format. Confirming a URL is reachable requires an actual network request, such as a HEAD or GET call, which should be done server-side to avoid CORS and SSRF issues.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for URL Validation in JavaScript (+ URL API Alternative) | Dev Brains AI</title>
        <meta
          name="description"
          content="Regex patterns to validate URLs in JavaScript — protocol, domain, port, path, query string — plus when the built-in URL constructor is the safer choice."
        />
        <meta
          name="keywords"
          content="regex url validation javascript, url regex pattern, validate url javascript, url constructor vs regex, javascript url validation regex"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-url-validation-javascript" />
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
              <li aria-current="page">Regex for URL Validation in JavaScript</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for URL Validation in JavaScript — Patterns and When to Use the URL API Instead
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            URL validation shows up everywhere — signup forms asking for a portfolio link, comment
            fields that should reject junk input, admin panels that store webhook endpoints. Regex
            can catch obviously malformed input quickly, but a truly correct URL parser is harder
            than most developers expect. This guide gives you working regex patterns and explains
            when to reach for JavaScript's built-in <code>URL</code> constructor instead.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Anatomy of a URL
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A URL has several optional and required parts that a validator needs to account for:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`https://www.example.com:8080/products/shoes?color=red&size=9#reviews
\\____/   \\_____________/ \\__/ \\_____________/ \\_____________/ \\_____/
protocol      domain      port      path          query        fragment`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Practical URL Regex
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This pattern covers the common cases: optional protocol, optional www, domain, optional
            port, and an optional path/query/fragment tail.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const urlRegex = /^(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

urlRegex.test('https://dev-brains-ai.com');                  // true
urlRegex.test('http://localhost:3000/api/users?id=5');       // false — 'localhost' has no dot+TLD
urlRegex.test('www.example.com/path?query=1#section');       // true
urlRegex.test('not a url at all');                            // false`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice <code>localhost</code> fails because the pattern requires a dot followed by a
            TLD-like segment. If your app needs to accept local/dev URLs, add an explicit
            alternation for <code>localhost</code> and IP addresses.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Also allow localhost and IPv4 hosts with optional port
const devFriendlyUrlRegex = /^(https?:\\/\\/)?((www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}|localhost|(\\d{1,3}\\.){3}\\d{1,3})(:\\d{1,5})?([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extracting URLs from Free Text
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A common real-world use case is pulling out URLs embedded in a paragraph, chat message,
            or log line rather than validating a single input:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'Check the docs at https://dev-brains-ai.com/docs and also see www.example.org for more.';
const found = text.match(/(https?:\\/\\/[^\\s]+)|(www\\.[^\\s]+)/g);
console.log(found);
// ['https://dev-brains-ai.com/docs', 'www.example.org']`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why the Built-in URL Constructor Is Often Better
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JavaScript ships with a <code>URL</code> class that implements the WHATWG URL parsing
            spec — the same rules browsers use. It handles internationalized domains, percent-encoding,
            unusual-but-valid schemes, and edge cases that a hand-written regex will get wrong.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidUrl(input) {
  try {
    const url = new URL(input);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

isValidUrl('https://dev-brains-ai.com');    // true
isValidUrl('ftp://files.example.com');      // false — protocol not in allow-list
isValidUrl('not a url');                    // false — throws, caught, returns false`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Use regex</strong> when you need to scan free text for URL-like substrings, or need a fast client-side hint before a full check</li>
            <li><strong>Use the URL constructor</strong> when you need to actually validate a single input field and reject genuinely malformed URLs</li>
            <li><strong>Combine both</strong> — regex to find candidates, URL constructor to confirm each one is well-formed</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Pitfalls
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Forgetting the protocol is optional in user input — always normalize by prepending <code>https://</code> if missing before parsing</li>
            <li>Using an overly permissive regex like <code>/^https?:\/\/.+/</code> that accepts almost anything after the protocol</li>
            <li>Assuming a syntactically valid URL is reachable — that requires an actual HTTP request, ideally made server-side to avoid SSRF risk from unchecked user-submitted URLs</li>
            <li>Not trimming whitespace before validation — trailing spaces silently break most patterns</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a good regex for validating a URL in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A practical pattern is{' '}
              <code>{'/^(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/'}</code>,
              which handles protocol, www, domain, and path/query segments for most common cases.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use regex or the URL constructor to validate URLs?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              For strict correctness, use the built-in URL constructor (<code>new URL(string)</code>)
              wrapped in a try/catch — it parses per the WHATWG URL spec and handles edge cases regex
              cannot. Use regex only for lightweight pattern checks like detecting URLs inside free text.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does a regex-matched URL guarantee the site is reachable?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex and the URL constructor both only validate syntax/format. Confirming a URL is
              reachable requires an actual network request, such as a HEAD or GET call, which should
              be done server-side to avoid CORS and SSRF issues.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe any validation rule in plain English and get a working regex instantly —
              no signup required.
            </p>
            <Link href="/regex-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open AI Regex Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation (JavaScript Example)</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/regex-vs-string-methods-when-to-use-which">Regex vs String Methods — When to Use Which</Link></li>
              <li><Link href="/blog/url-encoding-guide-for-web-developers">URL Encoding Guide for Web Developers</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
