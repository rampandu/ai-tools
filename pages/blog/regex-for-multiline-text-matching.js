// pages/blog/regex-for-multiline-text-matching.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForMultilineTextMatching() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Multiline Text Matching',
        item: 'https://dev-brains-ai.com/blog/regex-for-multiline-text-matching',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex Multiline Matching in JS: m vs s Flags Explained',
    description:
      "See exactly how JavaScript's m and s regex flags change ^, $, and . behavior, with copy-paste examples for parsing multi-line logs and YAML frontmatter.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-multiline-text-matching',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does the m flag do in JavaScript regex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The m (multiline) flag changes ^ and $ to match the start and end of each line within the string, instead of only the start and end of the entire string.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the s flag do in JavaScript regex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The s (dotall) flag makes the dot (.) match newline characters as well as every other character. Without it, . matches any character except line terminators.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use the m and s flags together?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. They control different things — m affects ^ and $ anchors, while s affects the dot (.) — and are commonly combined, e.g. /pattern/ms, when parsing multi-line log entries or blocks of text.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex Multiline Matching in JS: m vs s Flags Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="See exactly how JavaScript's m and s regex flags change ^, $, and . behavior, with copy-paste examples for parsing multi-line logs and YAML frontmatter."
        />
        <meta
          name="keywords"
          content="regex multiline flag, regex dotall flag, javascript regex m flag, regex s flag example, multiline regex matching javascript, regex log parsing"
        />
        <meta property="og:title" content="Regex Multiline Matching in JS: m vs s Flags Explained" />
        <meta property="og:description" content="See exactly how JavaScript's m and s regex flags change ^, $, and . behavior, with copy-paste examples for parsing multi-line logs and YAML frontmatter." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-multiline-text-matching" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-multiline-text-matching" />
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
              <li aria-current="page">Regex for Multiline Text Matching</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Multiline Text Matching — The m and s Flags Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            By default, JavaScript regex treats a string as one continuous line: <code>^</code> and{' '}
            <code>$</code> anchor to the very start and end, and <code>.</code> never matches a
            newline. When you're parsing multi-line log files, config blocks, or markdown, you need
            the <code>m</code> and <code>s</code> flags to change that behavior — and it's easy to
            reach for the wrong one.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Default Behavior (No Flags)
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'line one\\nline two\\nline three';

// Without 'm', ^ and $ only match the start/end of the WHOLE string
text.match(/^line/g);   // ['line']  — only matches "line one" at the very start
text.match(/^line/gm);  // ['line', 'line', 'line']  — matches every line's start`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The m (Multiline) Flag
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            With <code>m</code>, <code>^</code> matches right after every newline, and{' '}
            <code>$</code> matches right before every newline — effectively per-line anchors instead
            of whole-string anchors.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const log = \`INFO: server started
ERROR: connection failed
INFO: retrying
ERROR: timeout\`;

const errorLines = log.match(/^ERROR:.*$/gm);
console.log(errorLines);
// ['ERROR: connection failed', 'ERROR: timeout']`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The s (Dotall) Flag
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            By default, <code>.</code> matches "any character except line terminators." The{' '}
            <code>s</code> flag makes it match literally any character, including <code>\n</code> —
            essential when you need to capture a block that spans multiple lines.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const config = \`START
key1=value1
key2=value2
END\`;

// Without 's', .* cannot cross newlines, so this fails to match the whole block
config.match(/START(.*)END/);       // null

// With 's', .* happily crosses newlines
config.match(/START(.*)END/s)[1];
// '\\nkey1=value1\\nkey2=value2\\n'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Combining m and s
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            These flags solve different problems and are often used together — for example,
            extracting a multi-line block that itself starts with a line-anchored marker:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const doc = \`---
title: My Post
date: 2026-07-11
---
Body content goes here.
More body text.\`;

// Extract YAML frontmatter: starts at line-start '---', ends at line-start '---'
const frontmatter = doc.match(/^---$(.*?)^---$/ms);
console.log(frontmatter[1]);
// '\\ntitle: My Post\\ndate: 2026-07-11\\n'`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Here <code>m</code> lets <code>^---$</code> match the delimiter lines anywhere in the
            document, while <code>s</code> lets <code>.*?</code> (lazy) cross the newlines between them.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Practical Use Cases
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Log parsing</strong> — extract every line matching a pattern with <code>m</code></li>
            <li><strong>Config/frontmatter extraction</strong> — grab a block between two markers with <code>s</code></li>
            <li><strong>Comment stripping</strong> — match <code>/\/\*.*?\*\//s</code> to remove multi-line <code>/* ... */</code> comments</li>
            <li><strong>Markdown code fences</strong> — match content between ```` ``` ```` markers spanning several lines</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What does the m flag do in JavaScript regex?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The m (multiline) flag changes <code>^</code> and <code>$</code> to match the start and
              end of each line within the string, instead of only the start and end of the entire string.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What does the s flag do in JavaScript regex?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The s (dotall) flag makes the dot (<code>.</code>) match newline characters as well as
              every other character. Without it, <code>.</code> matches any character except line terminators.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I use the m and s flags together?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. They control different things — m affects ^ and $ anchors, while s affects the dot
              (.) — and are commonly combined, e.g. <code>/pattern/ms</code>, when parsing multi-line
              log entries or blocks of text.
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
              <li><Link href="/blog/regex-lookahead-and-lookbehind-explained">Regex Lookahead and Lookbehind Explained</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-for-date-format-validation">Regex for Date Format Validation</Link></li>
              <li><Link href="/blog/regex-performance-and-catastrophic-backtracking">Regex Performance and Catastrophic Backtracking</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
