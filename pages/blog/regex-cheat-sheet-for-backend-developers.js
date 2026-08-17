// pages/blog/regex-cheat-sheet-for-backend-developers.js
import Head from 'next/head';
import Link from 'next/link';

const FAQ = [
  {
    q: 'What is the difference between this cheat sheet and the Regex Generator?',
    a: 'This page is a quick static reference — symbols, character classes, and copy-paste patterns you can scan in a few seconds. The free Regex Generator instead takes a plain-English description ("match a valid email") and builds a new pattern for you on demand, with a live tester attached. Use the cheat sheet when you already roughly know what you need; use the generator when you don\'t want to write the regex by hand at all.',
  },
  {
    q: 'Do these patterns work the same in Java as in Node.js and Python?',
    a: "Mostly yes — the core syntax (character classes, quantifiers, anchors) is shared across PCRE-style regex engines including JavaScript, Python's re module, and Java's java.util.regex. The differences that trip people up are usually around escaping: Java and JavaScript need patterns wrapped in a string literal with backslashes escaped, while Python's raw string prefix (r\"...\") lets you paste a pattern as-is.",
  },
  {
    q: 'Is regex validation enough for Aadhaar, PAN, or GST numbers?',
    a: "Regex can confirm a string has the right shape (correct length, correct character positions) but cannot verify a checksum digit. PAN and GST numbers both use format rules regex can check; Aadhaar has an internal checksum that regex alone cannot validate. See the dedicated guide to Indian ID and document regex validation for which formats need more than a regex check.",
  },
  {
    q: 'How do I test these patterns before using them in production?',
    a: 'Paste the pattern and a sample string into the built-in tester on the Regex Generator page, or use the Regex Explainer to get a token-by-token breakdown of what a pattern actually matches before you trust it against real data.',
  },
];

export default function RegexCheatSheetForBackendDevelopers() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex Cheat Sheet for Backend Developers',
        item: 'https://dev-brains-ai.com/blog/regex-cheat-sheet-for-backend-developers',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex Cheat Sheet for Backend Developers (Node & Python)',
    description:
      'A regex cheat sheet for backend developers: symbols, character classes, a validation pattern reference table, and working Node.js and Python examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-cheat-sheet-for-backend-developers',
    datePublished: '2026-02-26',
    dateModified: '2026-08-17',
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
        <title>Regex Cheat Sheet for Backend Developers (Node & Python) | Dev Brains AI</title>
        <meta
          name="description"
          content="A regex cheat sheet for backend developers: symbols, character classes, a validation pattern reference table, and working Node.js and Python examples."
        />
        <meta
          name="keywords"
          content="regex cheat sheet, regex for backend developers, regex symbols, regex character classes, regex validation patterns, node.js regex, python regex"
        />
        <meta property="og:title" content="Regex Cheat Sheet for Backend Developers (Node & Python)" />
        <meta property="og:description" content="A regex cheat sheet for backend developers: symbols, character classes, a validation pattern reference table, and working Node.js and Python examples." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-cheat-sheet-for-backend-developers" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-cheat-sheet-for-backend-developers" />
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
              <li aria-current="page">Regex Cheat Sheet for Backend Developers</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex Cheat Sheet for Backend Developers
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            A quick-reference sheet for the regex symbols, character classes, and validation
            patterns that come up constantly in backend work — API input validation, log parsing,
            and data cleaning. Everything here is a static reference; if you'd rather describe what
            you need in plain English and have a pattern generated for you, use the{' '}
            <Link href="/regex-generator">free Regex Generator</Link> instead.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Basic Regex Symbols</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 8 }}>
            <li><code>.</code> — any character except a newline</li>
            <li><code>*</code> — zero or more of the preceding token</li>
            <li><code>+</code> — one or more of the preceding token</li>
            <li><code>?</code> — zero or one (makes the preceding token optional)</li>
            <li><code>{'{n,m}'}</code> — between n and m repetitions</li>
            <li><code>^</code> / <code>$</code> — start / end of string</li>
            <li><code>|</code> — alternation ("or")</li>
            <li><code>()</code> — capturing group; <code>(?:)</code> — non-capturing group</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            For lookahead/lookbehind and greedy-vs-lazy quantifiers — the two things that trip up
            most people past the basics — see{' '}
            <Link href="/blog/regex-lookahead-and-lookbehind-explained">
              regex lookahead and lookbehind explained
            </Link>{' '}
            and{' '}
            <Link href="/blog/regex-non-greedy-vs-greedy-matching">
              non-greedy vs greedy matching
            </Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Character Classes</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`[abc]      -> a, b, or c
[a-z]      -> any lowercase letter
[A-Z]      -> any uppercase letter
[0-9]      -> any digit
[^0-9]     -> anything that is NOT a digit
\\d         -> digit, shorthand for [0-9]
\\w         -> word character, shorthand for [A-Za-z0-9_]
\\s         -> whitespace (space, tab, newline)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Validation Pattern Reference
          </h2>
          <div style={{ overflowX: 'auto', marginBottom: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: 520 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '6px 10px', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>What it matches</th>
                  <th style={{ textAlign: 'left', padding: '6px 10px', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>Pattern</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Email address</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}><code>{'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Username (3-16 chars, letters/digits/underscore)</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}><code>{'^[A-Za-z0-9_]{3,16}$'}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Strong password (8+ chars, upper, lower, digit)</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}><code>{'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>IPv4 address (each octet 0-255)</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}><code style={{ fontSize: '0.78rem' }}>{'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Hex color code</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}><code>{'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>URL (http/https)</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}><code>{'^https?:\\/\\/[\\w.-]+\\.[a-z]{2,}(\\/\\S*)?$'}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Indian mobile number</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}><code>{'^(\\+91)?[6-9]\\d{9}$'}</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px' }}>Indian PIN code</td>
                  <td style={{ padding: '6px 10px' }}><code>{'^[1-9]\\d{5}$'}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="small" style={{ marginBottom: 14 }}>
            The URL pattern above requires an explicit <code>http(s)://</code> prefix; for a version
            that also accepts bare domains, <code>www.</code>, <code>localhost</code>, and IP
            addresses with ports, see{' '}
            <Link href="/blog/regex-for-url-validation-javascript">
              regex for URL validation in JavaScript
            </Link>. For Aadhaar, PAN, GST, IFSC, passport, and driving license patterns — plus
            which of these regex can and can't fully verify — see{' '}
            <Link href="/blog/regex-for-indian-id-document-validation">
              the complete guide to Indian ID and document regex validation
            </Link>. For 50 more copy-paste patterns organized by category, see{' '}
            <Link href="/blog/top-50-useful-regex-patterns-for-developers">
              50 ready-to-use regex patterns for developers
            </Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using These Patterns in Code
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Node.js
const phoneRegex = /^(\\+91)?[6-9]\\d{9}$/;
phoneRegex.test("9876543210"); // true

# Python
import re
pattern = r"^(\\+91)?[6-9]\\d{9}$"
bool(re.match(pattern, "9876543210"))  # True`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Java and JavaScript both need the pattern wrapped as a string literal with backslashes
            escaped; Python's raw string prefix (<code>r"..."</code>) lets you paste a pattern
            as-is without doubling the backslashes.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Backend Use Cases
          </h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 14 }}>
            <li>Validating API request bodies before they hit business logic</li>
            <li>Enforcing password strength rules at signup</li>
            <li>Extracting structured fields (IPs, error codes, timestamps) out of log lines</li>
            <li>Parsing or cleaning malformed CSV rows before import</li>
            <li>Validating identifiers like PAN, GST, or SKU codes on form submission</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Regex Patterns Interviewers Commonly Ask You to Write
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            These come up often enough in backend interview rounds that they're worth being able to
            write from memory, not just recognize:
          </p>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 14 }}>
            <li><strong>Email validation</strong> — see the pattern in the table above.</li>
            <li><strong>Find duplicate consecutive words</strong> — <code>{'\\b(\\w+)\\s+\\1\\b'}</code>, using a backreference (<code>\1</code>) to check the same word appears twice in a row.</li>
            <li><strong>Extract all numbers from a string</strong> — <code>{'\\d+'}</code> with the global flag, e.g. <code>{'"order 12 has 3 items".match(/\\d+/g)'}</code> in JavaScript.</li>
            <li><strong>Enforce password rules</strong> — see the strong-password pattern in the table above, which uses lookahead assertions to require multiple character classes without fixing their order.</li>
          </ul>
          <p className="small" style={{ marginBottom: 0 }}>
            Practicing writing these from scratch is more useful than memorizing them — try the{' '}
            <Link href="/regex-generator">Regex Generator</Link> with your own prompt, then compare
            what it produces to what you'd have written by hand.
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

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Generate or Test a Pattern Instead of Writing One by Hand</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe what you need in plain English and get a working pattern with a live tester
              attached — free, no signup.
            </p>
            <Link href="/regex-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Regex Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/regex-explainer">Regex Explainer — paste a pattern, get a token-by-token breakdown</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">50 Ready-to-Use Regex Patterns for Developers</Link></li>
              <li><Link href="/blog/regex-for-indian-id-document-validation">Regex for Indian ID & Document Validation</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/json-formatter">JSON Formatter</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
