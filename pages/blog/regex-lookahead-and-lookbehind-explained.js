// pages/blog/regex-lookahead-and-lookbehind-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexLookaheadAndLookbehindExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex Lookahead and Lookbehind Explained',
        item: 'https://dev-brains-ai.com/blog/regex-lookahead-and-lookbehind-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex Lookahead vs Lookbehind: 4 Patterns Explained',
    description:
      'All four regex lookaround assertions — positive/negative lookahead and lookbehind — explained with password validation and currency-formatting examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-lookahead-and-lookbehind-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between lookahead and lookbehind in regex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lookahead (?=...) checks what comes after the current position without consuming it, while lookbehind (?<=...) checks what comes before the current position without consuming it. Both let you match based on surrounding context without including that context in the final match.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a negative lookahead used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A negative lookahead (?!...) asserts that a pattern does NOT follow at the current position. It is commonly used in password validation to require multiple character types, e.g. requiring at least one digit anywhere without fixing its position.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is lookbehind supported in all JavaScript environments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lookbehind is supported in all modern JavaScript engines (V8/Chrome/Node.js, and recent versions of Firefox and Safari) but was historically missing in older Safari versions. If you need to support very old browsers, avoid lookbehind or use a polyfill/alternative approach.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex Lookahead vs Lookbehind: 4 Patterns Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="All four regex lookaround assertions — positive/negative lookahead and lookbehind — explained with password validation and currency-formatting examples."
        />
        <meta
          name="keywords"
          content="regex lookahead, regex lookbehind, positive negative lookahead regex, javascript regex lookbehind example, regex assertions explained, regex zero-width assertion"
        />
        <meta property="og:title" content="Regex Lookahead vs Lookbehind: 4 Patterns Explained" />
        <meta property="og:description" content="All four regex lookaround assertions — positive/negative lookahead and lookbehind — explained with password validation and currency-formatting examples." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-lookahead-and-lookbehind-explained" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-lookahead-and-lookbehind-explained" />
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
              <li aria-current="page">Regex Lookahead and Lookbehind Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex Lookahead and Lookbehind Explained — With Practical Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Lookahead and lookbehind are "zero-width assertions" — they check that a pattern exists
            before or after the current position without including it in the match. They are the
            tool that unlocks a huge category of regex problems, from password strength rules to
            inserting commas into large numbers. This guide breaks down all four variants with
            working examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Four Assertion Types
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Positive lookahead</strong> <code>{'(?=...)'}</code> — asserts that the pattern DOES follow, without consuming it</li>
            <li><strong>Negative lookahead</strong> <code>{'(?!...)'}</code> — asserts that the pattern does NOT follow</li>
            <li><strong>Positive lookbehind</strong> <code>{'(?<=...)'}</code> — asserts that the pattern DOES precede, without consuming it</li>
            <li><strong>Negative lookbehind</strong> <code>{'(?<!...)'}</code> — asserts that the pattern does NOT precede</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Positive Lookahead — Password Requirements
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The classic use case: requiring a password to contain a digit, a lowercase letter, an
            uppercase letter, and a special character — in any order, anywhere in the string.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$/;

strongPassword.test('Passw0rd!');   // true
strongPassword.test('password');    // false — missing uppercase, digit, special char
strongPassword.test('PASSWORD1!');  // false — missing lowercase`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Each <code>{'(?=.*X)'}</code> is checked from the same starting position — it peeks ahead
            for "any characters, then X" without moving the match pointer. That's why you can stack
            four of them and still only "consume" the final <code>{'.{8,}'}</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Negative Lookahead — Excluding a Word
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Match "foo" only when NOT followed by "bar"
const notFooBar = /foo(?!bar)/g;

'foobar foobaz foo'.match(notFooBar);
// ['foo', 'foo']  — matches 'foobaz' and standalone 'foo', but not the 'foo' in 'foobar'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Positive Lookbehind — Currency Formatting
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Lookbehind is perfect for inserting thousands separators into a number without consuming
            the digits it's checking against:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Insert a comma every 3 digits from the right (Western/US grouping)
function formatNumber(num) {
  return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}

formatNumber(1234567);  // '1,234,567'

// Extract the amount after the ₹ symbol using lookbehind
const priceText = 'Total: ₹4599';
const amount = priceText.match(/(?<=₹)\\d+/)[0];
console.log(amount);  // '4599'`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The <code>{'\\B(?=(\\d{3})+(?!\\d))'}</code> pattern combines several ideas: <code>\B</code>{' '}
            avoids inserting a comma at the very start, the lookahead checks for groups of exactly 3
            digits remaining, and the nested negative lookahead <code>{'(?!\\d)'}</code> ensures we stop
            at the correct boundary.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Negative Lookbehind — Avoiding False Matches
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Match "$100" but not "US$100" (avoid matching when preceded by "US")
const notUsDollar = /(?<!US)\\$\\d+/g;

'Price: $100, US$100'.match(notUsDollar);
// ['$100']  — only the standalone $100, not the one preceded by "US"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When to Use Lookaround vs Capture Groups
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Use a normal capture group when you need to extract or reuse the surrounding text</li>
            <li>Use lookaround when you need to assert context exists but must NOT include it in the match (e.g. splitting text without losing the delimiter)</li>
            <li>Lookaround assertions add processing overhead, especially nested ones — for very hot code paths (parsing large logs), benchmark against a simpler two-step approach (match, then filter)</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between lookahead and lookbehind in regex?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Lookahead <code>{'(?=...)'}</code> checks what comes after the current position without
              consuming it, while lookbehind <code>{'(?<=...)'}</code> checks what comes before the
              current position without consuming it. Both let you match based on surrounding context
              without including that context in the final match.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a negative lookahead used for?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A negative lookahead <code>{'(?!...)'}</code> asserts that a pattern does NOT follow at
              the current position. It is commonly used in password validation to require multiple
              character types, e.g. requiring at least one digit anywhere without fixing its position.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is lookbehind supported in all JavaScript environments?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Lookbehind is supported in all modern JavaScript engines (V8/Chrome/Node.js, and recent
              versions of Firefox and Safari) but was historically missing in older Safari versions. If
              you need to support very old browsers, avoid lookbehind or use a polyfill/alternative approach.
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
              <li><Link href="/blog/regex-for-password-validation-rules">Regex for Password Validation Rules</Link></li>
              <li><Link href="/blog/regex-non-greedy-vs-greedy-matching">Regex Non-Greedy vs Greedy Matching</Link></li>
              <li><Link href="/blog/regex-performance-and-catastrophic-backtracking">Regex Performance and Catastrophic Backtracking</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">AI Regex Generator Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
