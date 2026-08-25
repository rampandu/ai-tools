// pages/blog/regex-top-patterns.js
import Head from 'next/head';
import Link from 'next/link';

const FAQ = [
  {
    q: 'Are these patterns safe to use as-is in production?',
    a: 'They cover the common case reliably, but a few are deliberately simplified — the email and URL patterns here are practical, not full RFC-compliant validators. For a stricter email pattern with edge-case handling, or a URL pattern that also matches bare domains and localhost, see the dedicated guides linked below.',
  },
  {
    q: 'Why does the URL pattern not require the closing bracket or quote?',
    a: 'It stops at the first whitespace character, which works well for plain text but will over-match if the URL is immediately followed by punctuation with no space, like a URL in parentheses. For pattern-matching inside HTML or Markdown specifically, a more context-aware approach is usually better than a single regex.',
  },
  {
    q: 'What does the ? after * do in the non-greedy example?',
    a: 'It flips the quantifier from greedy to lazy. The pattern <.*> on "<a><b>" matches the whole string from the first < to the last >, while <.*?> stops at the first >, matching just "<a>". See the dedicated guide to greedy vs non-greedy matching for more examples of where this distinction matters.',
  },
];

export default function TopRegexPatterns() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dev-brains-ai.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://dev-brains-ai.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Top 10 Regex Patterns Every Developer Should Know',
        item: 'https://dev-brains-ai.com/blog/regex-top-patterns',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '10 Copy-Paste Regex Patterns Every Developer Needs',
    description:
      '10 ready-to-use regex patterns for emails, URLs, phone numbers, hex colors, and more — each with a working example you can paste straight into your code.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-top-patterns',
    datePublished: '2026-02-26',
    dateModified: '2026-08-25',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <Head>
        <title>10 Copy-Paste Regex Patterns Every Developer Needs | Dev Brains AI</title>
        <meta
          name="description"
          content="10 ready-to-use regex patterns for emails, URLs, phone numbers, hex colors, and more — each with a working example you can paste straight into your code."
        />
        <meta property="og:title" content="10 Copy-Paste Regex Patterns Every Developer Needs" />
        <meta property="og:description" content="10 ready-to-use regex patterns for emails, URLs, phone numbers, hex colors, and more — each with a working example you can paste straight into your code." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-top-patterns" />
        <meta property="og:type" content="article" />
        <link
          rel="canonical"
          href="https://dev-brains-ai.com/blog/regex-top-patterns"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article
          className="card"
          style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4,
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Top 10 Regex Patterns</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Top 10 Regex Patterns Every Developer Should Know
          </h1>

                  <p className="small" style={{ marginBottom: 16 }}>
            Regular expressions (regex) are a compact and powerful language for pattern-matching and
            text processing. Learning a few reliable patterns can dramatically speed up tasks like
            validation, parsing logs, and extracting data. Below are ten patterns that are useful
            across many projects — with brief explanations and examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>1. Match only digits</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^\\d+$'}</code> — matches strings that are entirely digits (e.g., "12345"). Use
            for numeric IDs or codes.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>2. Match only letters</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^[A-Za-z]+$'}</code> — matches alphabetic strings. Useful when restricting input
            to letters only.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>3. Basic email validation</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'}</code> — a practical email
            validator for many use cases. Note: email validation can be complicated for every RFC
            nuance; use this for simple checks.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>4. URL detection</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'https?:\\/\\/[^\\s]+'}</code> — finds http or https URLs in text. Pair with
            stricter parsing for production use.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>5. Word boundary match</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'\\bword\\b'}</code> — ensures you match a whole word, not substrings. Helpful in
            search and natural language tasks.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>
            6. Capture groups for extraction
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'(\\d{4})-(\\d{2})-(\\d{2})'}</code> — extracts year, month, day from ISO-like
            date strings. Use capture groups to pull parts into variables.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>7. Optional groups</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^(\\+?\\d{1,3})?[-.\\s]?\\d{10}$'}</code> — a phone number pattern allowing an
            optional country code. Optional groups are powerful for flexible input formats.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>8. Non-greedy matching</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'<.*?>'}</code> — using <code>?</code> after <code>*</code> makes the quantifier
            non-greedy, matching the shortest possible string. Useful when parsing HTML-like
            snippets.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>9. Alternation (or)</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'cat|dog|rabbit'}</code> — matches either "cat", "dog" or "rabbit". Alternation
            is simple but effective for enumerating known tokens.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>
            10. Validate hex colors
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>{'^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'}</code> — matches 3- or 6-digit hex color
            codes with optional leading "#". Handy in styling and design tools.
          </p>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>
            Tips for using regex safely
          </h3>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>
              Avoid catastrophic backtracking by limiting nested quantifiers and preferring atomic
              or possessive quantifiers when available.
            </li>
            <li>
              Always test your patterns with representative input sets — edge cases often surface
              unexpected behavior.
            </li>
            <li>
              Use named capture groups where supported to improve readability, e.g.{' '}
              <code>{'(?<year>\\d{4})'}</code>.
            </li>
          </ul>

          <p className="small" style={{ marginTop: 12, marginBottom: 24 }}>
            Want to generate a pattern for something not on this list, or get any of these
            explained token by token? Try the{' '}
            <Link href="/regex-generator">AI Regex Generator</Link> or the{' '}
            <Link href="/regex-explainer">Regex Explainer</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          {FAQ.map((f, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{f.q}</strong>
              <p className="small" style={{ marginTop: 6 }}>{f.a}</p>
            </div>
          ))}

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation in JS — Patterns &amp; Edge Cases</Link></li>
              <li><Link href="/blog/regex-for-url-validation-javascript">Regex for URL Validation in JavaScript</Link></li>
              <li><Link href="/blog/regex-non-greedy-vs-greedy-matching">Regex Non-Greedy vs Greedy Matching</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">50 Ready-to-Use Regex Patterns for Developers</Link></li>
            </ul>
          </div>
        </article>
      </main>
    </>
  );
}
