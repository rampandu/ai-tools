// pages/blog/regex-non-greedy-vs-greedy-matching.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexNonGreedyVsGreedyMatching() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex Non-Greedy vs Greedy Matching',
        item: 'https://dev-brains-ai.com/blog/regex-non-greedy-vs-greedy-matching',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex Non-Greedy vs Greedy Matching — Side-by-Side Examples',
    description:
      'The difference between greedy (.*) and lazy/non-greedy (.*?) quantifiers in regex, with side-by-side examples showing exactly how the matched results differ.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-non-greedy-vs-greedy-matching',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between greedy and non-greedy regex matching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A greedy quantifier like .* matches as many characters as possible, then backtracks if needed. A non-greedy (lazy) quantifier like .*? matches as few characters as possible, expanding only if the rest of the pattern requires it.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I make a regex quantifier non-greedy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Add a question mark after the quantifier: *? for zero-or-more, +? for one-or-more, ?? for zero-or-one, and {n,m}? for a bounded range.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is non-greedy matching always slower than greedy matching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not necessarily. Performance depends on the input and how much backtracking each approach needs. In many cases a well-anchored non-greedy pattern is actually faster because it stops as soon as a match is found, rather than consuming the whole string and backtracking.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex Non-Greedy vs Greedy Matching (Side-by-Side Examples) | Dev Brains AI</title>
        <meta
          name="description"
          content="The difference between greedy (.*) and lazy/non-greedy (.*?) quantifiers in regex, with side-by-side examples showing how matched results differ."
        />
        <meta
          name="keywords"
          content="regex greedy vs non-greedy, lazy quantifier regex, regex .*? explained, greedy quantifier examples, non-greedy matching javascript"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-non-greedy-vs-greedy-matching" />
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
              <li aria-current="page">Regex Non-Greedy vs Greedy Matching</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex Non-Greedy vs Greedy Matching — Side-by-Side Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            One of the most common regex surprises is a quantifier matching way more text than
            expected. It usually comes down to greedy versus non-greedy (lazy) behavior. This guide
            shows exactly how each one works with side-by-side match results so you can predict the
            behavior instead of guessing.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Greedy Quantifiers (Default Behavior)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            By default, quantifiers like <code>*</code>, <code>+</code>, and <code>{'{n,m}'}</code>{' '}
            are greedy: they try to consume as much of the string as possible first, then backtrack
            one character at a time until the rest of the pattern can match.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const html = '<b>bold</b> and <i>italic</i>';

// Greedy: .* grabs everything up to the LAST '>'
html.match(/<.*>/)[0];
// '<b>bold</b> and <i>italic</i>'  — spans the whole string!`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Non-Greedy (Lazy) Quantifiers
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Adding a <code>?</code> after a quantifier makes it lazy: it matches as few characters as
            possible, only expanding when required for the overall pattern to succeed.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const html = '<b>bold</b> and <i>italic</i>';

// Non-greedy: .*? stops at the FIRST '>'
html.match(/<.*?>/)[0];
// '<b>'  — stops as soon as possible

// With the global flag, you get every tag separately
html.match(/<.*?>/g);
// ['<b>', '</b>', '<i>', '</i>']`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Side-by-Side Comparison Table
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Input:    "aaa"
Pattern:  a+   (greedy)   → matches "aaa"  (all three a's)
Pattern:  a+?  (lazy)     → matches "a"    (just one a)

Input:    "start...middle...end"
Pattern:  start(.*)end     (greedy)  → captures "...middle...end" minus "end" itself... actually captures everything up to the LAST "end"
Pattern:  start(.*?)end    (lazy)    → captures "..." up to the FIRST "end"

Input:    '"first" and "second"'
Pattern:  ".*"   (greedy)  → matches '"first" and "second"'  (whole thing)
Pattern:  ".*?"  (lazy)    → matches '"first"'  (just the first quoted string)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            All the Lazy Variants
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><code>*?</code> — zero or more, as few as possible</li>
            <li><code>+?</code> — one or more, as few as possible</li>
            <li><code>??</code> — zero or one, prefers zero</li>
            <li><code>{'{n,m}?'}</code> — between n and m, prefers n</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Better Alternative — Negated Character Classes
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For extracting content between two known delimiters, a negated character class is often
            more precise and faster than a lazy dot, because it can't accidentally "jump over" a
            closing delimiter of a different kind:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const html = '<b>bold</b>';

// Lazy dot — works, but .*? can still match across unintended characters
html.match(/<(.*?)>/)[1];  // 'b'

// Negated character class — explicitly "anything but >"
html.match(/<([^>]*)>/)[1]; // 'b'  — same result here, but more robust on messy input`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <code>{'[^>]*'}</code> is generally the preferred idiom over <code>{'.*?'}</code> when
            you know the exact character that should stop the match — it is both clearer intent and
            avoids some pathological backtracking cases that lazy dots can trigger on malformed input.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When to Choose Which
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Use greedy when you want the longest possible match, e.g. matching an entire multi-line comment block</li>
            <li>Use lazy when you want the shortest possible match between two known delimiters, e.g. quoted strings, single HTML tags</li>
            <li>Prefer a negated character class (<code>{'[^x]*'}</code>) over a lazy dot when the stopping character is known and fixed</li>
            <li>Always test against your actual data — greedy vs lazy mistakes are one of the most common sources of subtle bugs in text-processing code</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between greedy and non-greedy regex matching?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A greedy quantifier like <code>.*</code> matches as many characters as possible, then
              backtracks if needed. A non-greedy (lazy) quantifier like <code>.*?</code> matches as few
              characters as possible, expanding only if the rest of the pattern requires it.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I make a regex quantifier non-greedy?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Add a question mark after the quantifier: <code>*?</code> for zero-or-more,{' '}
              <code>+?</code> for one-or-more, <code>??</code> for zero-or-one, and{' '}
              <code>{'{n,m}?'}</code> for a bounded range.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is non-greedy matching always slower than greedy matching?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Not necessarily. Performance depends on the input and how much backtracking each
              approach needs. In many cases a well-anchored non-greedy pattern is actually faster
              because it stops as soon as a match is found, rather than consuming the whole string and backtracking.
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
              <li><Link href="/blog/regex-lookahead-and-lookbehind-explained">Regex Lookahead and Lookbehind Explained</Link></li>
              <li><Link href="/blog/regex-performance-and-catastrophic-backtracking">Regex Performance and Catastrophic Backtracking</Link></li>
              <li><Link href="/blog/regex-for-html-tag-stripping">Regex for HTML Tag Stripping</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
