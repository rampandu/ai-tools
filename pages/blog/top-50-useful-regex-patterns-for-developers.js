import Head from 'next/head';
import Link from 'next/link';

export default function Top50UsefulRegexPatternsForDevelopers() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Top 50 Useful Regex Patterns for Developers',
        item: 'https://dev-brains-ai.com/blog/top-50-useful-regex-patterns-for-developers',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Top 50 Useful Regex Patterns for Developers',
    description:
      '50 practical, ready-to-use regex patterns for validation, parsing, and search — covering email, URL, phone, date, IP, password, hex color, and more.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/top-50-useful-regex-patterns-for-developers',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best all-purpose email validation regex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A practical pattern is ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$. It is intentionally permissive, checking for the general local-part@domain.tld shape rather than the full RFC 5322 spec, which is impractical to enforce with regex alone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can one regex pattern validate every use case perfectly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex patterns for things like email, phone numbers, and URLs are practical approximations, not formal grammars. They catch the vast majority of real-world valid and invalid input, but edge cases (like fully RFC-compliant email addresses) often need additional business logic or a dedicated parser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these regex patterns compatible across JavaScript, Python, and SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most of the core patterns (character classes, quantifiers, anchors) work identically across JavaScript, Python re, and PostgreSQL regex operators. Differences appear mainly in lookbehind support in older engines and in how each language escapes backslashes in string literals.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Top 50 Useful Regex Patterns for Developers | Dev Brains AI</title>
        <meta
          name="description"
          content="50 practical, ready-to-use regex patterns for validation, parsing, and search — covering email, URL, phone, date, IP, password, hex color, and more."
        />
        <meta
          name="keywords"
          content="top regex patterns, useful regex patterns for developers, regex cheat sheet, common regex examples, regex patterns list"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/top-50-useful-regex-patterns-for-developers" />
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
              <li aria-current="page">Top 50 Regex Patterns</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Top 50 Useful Regex Patterns for Developers
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            This is a working reference of 50 regex patterns you'll actually reach for on the job — grouped by
            category, with real examples instead of abstract descriptions. Copy any pattern directly into
            JavaScript, Python, or a SQL <code>~</code> / <code>REGEXP</code> clause. Where a pattern has known
            edge cases, we've noted them so you don't get burned in production.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>1. Contact and identity patterns (1-8)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`1.  Email (practical):        ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$
2.  US/international phone:   ^\\+?[1-9]\\d{7,14}$
3.  Indian mobile number:     ^(?:\\+91|91)?[6-9]\\d{9}$
4.  Username (3-16 chars):    ^[a-zA-Z0-9_]{3,16}$
5.  Full name (letters only): ^[A-Za-z]+(?:[\\s'-][A-Za-z]+)*$
6.  Twitter/X handle:         ^@?(\\w){1,15}$
7.  Hashtag:                  ^#[A-Za-z0-9_]+$
8.  UUID v4:                  ^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>2. Web and network patterns (9-16)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`9.  URL:                      ^https?:\\/\\/[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&'()*+,;=.]*$
10. Domain name:              ^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\\.[A-Za-z]{2,})+$
11. IPv4 address:              ^((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)$
12. IPv6 address (basic):      ^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$
13. MAC address:               ^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$
14. Slug (URL-friendly):       ^[a-z0-9]+(?:-[a-z0-9]+)*$
15. Query string param:        [?&]([^=#]+)=([^&#]*)
16. Hex color code:            ^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>3. Dates, times, and numbers (17-26)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`17. Date (YYYY-MM-DD):         ^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$
18. Date (DD/MM/YYYY):         ^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$
19. Time (24-hour HH:MM):      ^([01]\\d|2[0-3]):[0-5]\\d$
20. Integer (signed):          ^-?\\d+$
21. Decimal number:            ^-?\\d+(\\.\\d+)?$
22. Positive integer only:     ^[1-9]\\d*$
23. Currency (2 decimals):     ^\\d+(\\.\\d{2})?$
24. Percentage (0-100):        ^(100(\\.0{1,2})?|\\d{1,2}(\\.\\d{1,2})?)$
25. Scientific notation:       ^-?\\d+(\\.\\d+)?[eE][+-]?\\d+$
26. Comma-separated thousands: ^\\d{1,3}(,\\d{3})*$`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>4. Security and passwords (27-32)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`27. Strong password:           ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$
28. At least one digit:        (?=.*\\d)
29. At least one uppercase:    (?=.*[A-Z])
30. No whitespace allowed:     ^\\S+$
31. JWT token shape:           ^[\\w-]+\\.[\\w-]+\\.[\\w-]+$
32. Base64 string:             ^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>5. Parsing and text cleanup (33-42)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`33. Strip HTML tags:           <[^>]*>
34. Collapse extra whitespace: \\s{2,}
35. Leading/trailing spaces:   ^\\s+|\\s+$
36. Words only (Unicode):      [\\p{L}\\p{N}_]+
37. Extract hashtags:          #(\\w+)
38. Extract @mentions:         @(\\w+)
39. Markdown link:             \\[([^\\]]+)\\]\\(([^)]+)\\)
40. CSV field split (simple):  ,(?=(?:[^"]*"[^"]*")*[^"]*$)
41. camelCase to words:        (?<=[a-z])(?=[A-Z])
42. Non-ASCII characters:      [^\\x00-\\x7F]`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>6. File and code patterns (43-50)</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`43. File extension:            \\.([A-Za-z0-9]+)$
44. Image file names:          ^.+\\.(jpe?g|png|gif|webp|svg)$
45. Windows file path:         ^[A-Za-z]:\\\\(?:[^\\\\/:*?"<>|\\r\\n]+\\\\)*[^\\\\/:*?"<>|\\r\\n]*$
46. Semantic version (semver): ^\\d+\\.\\d+\\.\\d+(-[0-9A-Za-z.-]+)?$
47. SQL single-line comment:   --.*$
48. JS single-line comment:    \\/\\/.*$
49. Environment variable:      ^[A-Z_][A-Z0-9_]*$
50. CSS class selector:        \\.[a-zA-Z_-][a-zA-Z0-9_-]*`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>How to use these patterns safely</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Always test against real sample data from your app, not just the happy-path example — edge cases
              like international phone numbers or Unicode names break generic patterns easily.</li>
            <li>Anchor patterns with <code>^</code> and <code>$</code> when you need a full-string match; omit them
              when you're searching for a substring within larger text.</li>
            <li>For anything security-sensitive (passwords, tokens, IDs), pair regex format checks with real
              server-side business logic — regex alone should never be your only line of defense.</li>
            <li>Complex patterns like URL or email matching are approximations. If you need full spec compliance,
              use a dedicated parsing library instead of stretching a regex further.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the best all-purpose email validation regex?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A practical pattern is <code>^[^\s@]+@[^\s@]+\.[^\s@]+$</code>. It is intentionally permissive,
              checking for the general local-part@domain.tld shape rather than the full RFC 5322 spec, which is
              impractical to enforce with regex alone.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can one regex pattern validate every use case perfectly?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex patterns for things like email, phone numbers, and URLs are practical approximations, not
              formal grammars. They catch the vast majority of real-world valid and invalid input, but edge cases
              (like fully RFC-compliant email addresses) often need additional business logic or a dedicated
              parser.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Are these regex patterns compatible across JavaScript, Python, and SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Most of the core patterns (character classes, quantifiers, anchors) work identically across
              JavaScript, Python re, and PostgreSQL regex operators. Differences appear mainly in lookbehind
              support in older engines and in how each language escapes backslashes in string literals.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Don't see the exact pattern you need? Describe it in plain English and get a tested, ready-to-use
              regex instantly with Dev Brains AI&apos;s free AI Regex Generator.
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
              <li><Link href="/blog/regex-top-patterns">Top Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-lookahead-and-lookbehind-explained">Regex Lookahead and Lookbehind Explained</Link></li>
              <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation in JavaScript</Link></li>
              <li><Link href="/blog/regex-for-ipv4-address-validation">Regex for IPv4 Address Validation</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
