// pages/blog/regex-for-html-tag-stripping.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForHtmlTagStripping() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for HTML Tag Stripping',
        item: 'https://dev-brains-ai.com/blog/regex-for-html-tag-stripping',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for HTML Tag Stripping — and Why It Is Not Safe for Untrusted Input',
    description:
      'How to strip HTML tags from strings using regex for plain-text previews, and why a proper HTML parser must be used instead for untrusted or security-sensitive input.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-html-tag-stripping',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What regex strips HTML tags from a string?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A simple pattern is /<[^>]*>/g used with String.replace to remove anything between angle brackets. It works for quick plain-text previews of trusted, well-formed HTML.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to use regex to sanitize untrusted HTML input?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex-based tag stripping can be bypassed with malformed or nested tags and does not understand HTML parsing rules, which can leave XSS vectors intact. Use a dedicated sanitization library like DOMPurify, or parse with the DOM/an HTML parser, for any untrusted input.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I use instead of regex to safely remove HTML in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a library such as sanitize-html or DOMPurify (with jsdom on the server) which parses the HTML into a real DOM tree and removes disallowed tags and attributes based on an allow-list, rather than pattern-matching text.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for HTML Tag Stripping — and Its Security Risks | Dev Brains AI</title>
        <meta
          name="description"
          content="How to strip HTML tags with regex for plain-text previews, and why a proper HTML parser is required instead for untrusted, security-sensitive input."
        />
        <meta
          name="keywords"
          content="regex strip html tags, remove html tags regex javascript, strip tags xss risk, html sanitization vs regex, regex html parser"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-html-tag-stripping" />
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
              <li aria-current="page">Regex for HTML Tag Stripping</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for HTML Tag Stripping — and Why It Is Not Safe for Untrusted Input
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Stripping HTML tags with regex is one of the most common "quick fix" snippets developers
            reach for — generating a plain-text preview, trimming a description for a meta tag, or
            cleaning up copy-pasted content. It works fine for trusted, well-formed HTML, but it is
            a genuine security risk when the input comes from users. This guide shows both sides.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Basic Tag Stripping
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The simplest approach removes anything between <code>&lt;</code> and <code>&gt;</code>:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function stripTags(html) {
  return html.replace(/<[^>]*>/g, '');
}

stripTags('<p>Hello <strong>world</strong>!</p>');
// 'Hello world!'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Stripping Tags but Keeping Text Spacing
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Block-level tags like <code>&lt;p&gt;</code> and <code>&lt;div&gt;</code> should leave a
            space or line break behind, or words from adjacent elements will run together:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function stripTagsWithSpacing(html) {
  return html
    .replace(/<\\/(p|div|li|h[1-6]|br)>/gi, ' ')  // add space after block-level closing tags
    .replace(/<[^>]*>/g, '')                       // strip remaining tags
    .replace(/\\s+/g, ' ')                          // collapse extra whitespace
    .trim();
}

stripTagsWithSpacing('<div>Hello</div><div>World</div>');
// 'Hello World'  (not 'HelloWorld')`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Where This Breaks Down
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The naive <code>{'<[^>]*>'}</code> pattern assumes tags are well-formed and never
            contain a <code>&gt;</code> inside an attribute value. Real-world (or adversarial) HTML
            frequently violates that assumption:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// A > inside an attribute breaks the naive regex
const tricky = '<img src="x" onerror="alert(1)" title="1 > 0">';
tricky.replace(/<[^>]*>/g, '');
// Result may leave a fragment behind or match incorrectly depending on nesting

// Script tags without a clean closing structure
const nested = '<scr<script>ipt>alert(1)</scr</script>ipt>';
// Regex-based filters historically failed on nested/broken tags like this,
// letting the payload survive the "sanitization" step`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This is exactly how many historical XSS filter bypasses worked: an attacker crafts input
            that looks stripped to a regex but reassembles into an executable tag once the browser's
            real HTML parser gets hold of it. Regex has no concept of nesting, attribute quoting, or
            parser state — it is fundamentally the wrong tool for security-sensitive HTML handling.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Safe Alternative — Real Parsers
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For anything user-submitted (comments, bios, rich-text editor output), use a library
            that actually parses HTML into a tree and applies an allow-list:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Node.js — using sanitize-html
const sanitizeHtml = require('sanitize-html');

const clean = sanitizeHtml(userInput, {
  allowedTags: [],       // strip all tags — plain text only
  allowedAttributes: {},
});

// Browser — using the DOM itself for text extraction (safe, no execution)
function stripTagsSafely(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <code>DOMParser</code> parses the string exactly like a browser would when rendering it,
            so <code>textContent</code> reliably reflects only the text nodes — no script execution,
            no partial-tag leakage.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When Regex Stripping Is Actually Fine
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>The HTML source is fully trusted — e.g. generated by your own CMS or markdown renderer, never user-submitted</li>
            <li>You only need a rough plain-text preview (like a search result snippet) where perfect correctness doesn't matter</li>
            <li>The output is never re-rendered as HTML anywhere — it is stored/displayed strictly as plain text</li>
            <li>For anything else — comments, chat messages, profile bios, uploaded content — use a real parser or sanitizer</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What regex strips HTML tags from a string?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A simple pattern is <code>{'/<[^>]*>/g'}</code> used with <code>String.replace</code> to
              remove anything between angle brackets. It works for quick plain-text previews of
              trusted, well-formed HTML.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is it safe to use regex to sanitize untrusted HTML input?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex-based tag stripping can be bypassed with malformed or nested tags and does
              not understand HTML parsing rules, which can leave XSS vectors intact. Use a dedicated
              sanitization library like DOMPurify, or parse with the DOM/an HTML parser, for any
              untrusted input.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What should I use instead of regex to safely remove HTML in Node.js?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use a library such as sanitize-html or DOMPurify (with jsdom on the server) which parses
              the HTML into a real DOM tree and removes disallowed tags and attributes based on an
              allow-list, rather than pattern-matching text.
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
              <li><Link href="/blog/regex-vs-string-methods-when-to-use-which">Regex vs String Methods — When to Use Which</Link></li>
              <li><Link href="/blog/regex-for-extracting-hashtags-and-mentions">Regex for Extracting Hashtags and Mentions</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-performance-and-catastrophic-backtracking">Regex Performance and Catastrophic Backtracking</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">AI Regex Generator Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
