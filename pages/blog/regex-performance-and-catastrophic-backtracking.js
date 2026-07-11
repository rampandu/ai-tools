// pages/blog/regex-performance-and-catastrophic-backtracking.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexPerformanceAndCatastrophicBacktracking() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex Performance and Catastrophic Backtracking',
        item: 'https://dev-brains-ai.com/blog/regex-performance-and-catastrophic-backtracking',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex Performance and Catastrophic Backtracking — Causes and Fixes',
    description:
      'How catastrophic backtracking happens with nested quantifiers like (a+)+, why it can freeze your app (ReDoS), and how to write safer, more efficient regex patterns.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-performance-and-catastrophic-backtracking',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is catastrophic backtracking in regex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Catastrophic backtracking happens when a regex engine, unable to find a match, tries an exponential number of ways to split the input among nested or overlapping quantifiers, causing execution time to blow up on certain inputs — sometimes freezing the process entirely.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is ReDoS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ReDoS (Regular Expression Denial of Service) is an attack where a malicious user submits input specifically crafted to trigger catastrophic backtracking in a vulnerable regex, causing the server to hang or consume excessive CPU, effectively denying service to other users.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I fix a regex that has catastrophic backtracking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Remove nested quantifiers like (a+)+ or (a*)*, replace ambiguous overlapping patterns with mutually exclusive character classes, add atomic grouping or possessive quantifiers where supported, and anchor patterns tightly so the engine has fewer positions to try.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex Performance and Catastrophic Backtracking (ReDoS) | Dev Brains AI</title>
        <meta
          name="description"
          content="How catastrophic backtracking happens with nested quantifiers like (a+)+, why it causes ReDoS, and how to write safer, more efficient regex patterns."
        />
        <meta
          name="keywords"
          content="catastrophic backtracking regex, redos, regex performance, nested quantifiers regex, regex denial of service, safe regex patterns"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-performance-and-catastrophic-backtracking" />
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
              <li aria-current="page">Regex Performance and Catastrophic Backtracking</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex Performance and Catastrophic Backtracking — Causes and Fixes
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            A regex that works perfectly in testing can freeze your Node.js server in production
            when it hits the wrong input — sometimes for seconds, sometimes indefinitely. This is
            catastrophic backtracking, and it is a real, well-documented denial-of-service vector
            (ReDoS). This guide explains why it happens and how to write patterns that avoid it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How Backtracking Works Normally
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JavaScript's regex engine (like most engines outside of RE2) is "backtracking" —  when a
            match attempt fails partway through, it rewinds and tries a different way of splitting
            the input among the quantifiers, repeating until it finds a match or exhausts all
            possibilities. For most patterns this is fast. The problem starts with{' '}
            <strong>nested or ambiguous quantifiers</strong>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Minimal Catastrophic Example
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// DANGEROUS — nested quantifier (a+)+
const evil = /^(a+)+$/;

evil.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
// This single test can hang the process for seconds to minutes!`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Why this explodes: for a string of 30 "a"s followed by a character that breaks the
            match, the engine tries every possible way to partition those 30 a's among the outer and
            inner <code>+</code> quantifiers — that's 2^30 combinations before it can conclude "no
            match." Add a few more characters and the runtime becomes effectively infinite.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Other Common Culprits
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Overlapping alternation — both branches can match the same characters
/^(a|a)+$/

// Star of star
/^(a*)*$/

// Two adjacent quantifiers matching overlapping character sets
/^([a-zA-Z]+)*$/

// A real-world example that has bitten many projects — validating emails
// with an overly complex pattern combining nested groups and quantifiers
/^([a-zA-Z0-9])(([\\-.]|[_]+)?([a-zA-Z0-9]+))*(@)/`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How to Fix It
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Remove nested quantifiers</strong> — rewrite <code>{'(a+)+'}</code> as simply <code>{'a+'}</code> when the outer grouping adds no value</li>
            <li><strong>Make alternatives mutually exclusive</strong> — ensure branches in an alternation can't both match the same substring</li>
            <li><strong>Anchor and be specific</strong> — use negated character classes (<code>{'[^x]*'}</code>) instead of a generic <code>{'.*'}</code> wherever the stopping character is known</li>
            <li><strong>Use possessive quantifiers or atomic groups where supported</strong> — not available in standard JS regex, but supported via the <code>RegExp</code> alternatives in some libraries, or can be simulated with lookahead tricks</li>
            <li><strong>Set an execution timeout</strong> — for regex applied to untrusted input, run it in a way that can be aborted (e.g. a worker thread with a timeout) as a defense-in-depth measure</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// BEFORE — nested quantifier, vulnerable
const badPattern = /^(a+)+$/;

// AFTER — equivalent, safe
const goodPattern = /^a+$/;

// BEFORE — ambiguous inner grouping
const badWhitespace = /^(\\s*)*$/;

// AFTER — simplified, no ambiguity
const goodWhitespace = /^\\s*$/;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Detecting Risky Patterns Before They Ship
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Run static analysis with tools like <code>eslint-plugin-security</code> or <code>safe-regex</code>, which flag known-dangerous constructs</li>
            <li>Test every user-input regex against a long repetitive string plus one breaking character (like the example above) as part of your test suite</li>
            <li>Avoid writing complex regex from scratch for high-risk validation (emails, URLs) — prefer well-tested, widely-used patterns or built-in parsers</li>
            <li>Consider Node.js's V8 regex engine limitations — it does not use RE2 by default, so it is fully susceptible to backtracking blowups, unlike some other language runtimes</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is catastrophic backtracking in regex?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Catastrophic backtracking happens when a regex engine, unable to find a match, tries an
              exponential number of ways to split the input among nested or overlapping quantifiers,
              causing execution time to blow up on certain inputs — sometimes freezing the process entirely.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is ReDoS?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              ReDoS (Regular Expression Denial of Service) is an attack where a malicious user submits
              input specifically crafted to trigger catastrophic backtracking in a vulnerable regex,
              causing the server to hang or consume excessive CPU, effectively denying service to other users.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I fix a regex that has catastrophic backtracking?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Remove nested quantifiers like <code>{'(a+)+'}</code> or <code>{'(a*)*'}</code>, replace
              ambiguous overlapping patterns with mutually exclusive character classes, add atomic
              grouping or possessive quantifiers where supported, and anchor patterns tightly so the
              engine has fewer positions to try.
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
              <li><Link href="/blog/regex-non-greedy-vs-greedy-matching">Regex Non-Greedy vs Greedy Matching</Link></li>
              <li><Link href="/blog/regex-for-ipv4-address-validation">Regex for IPv4 Address Validation</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation (JavaScript Example)</Link></li>
              <li><Link href="/blog/regex-vs-string-methods-when-to-use-which">Regex vs String Methods — When to Use Which</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
