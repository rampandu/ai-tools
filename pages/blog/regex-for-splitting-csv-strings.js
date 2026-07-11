// pages/blog/regex-for-splitting-csv-strings.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForSplittingCsvStrings() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Splitting CSV Strings',
        item: 'https://dev-brains-ai.com/blog/regex-for-splitting-csv-strings',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Splitting CSV Strings — Handling Quoted Fields Correctly',
    description:
      'Regex to split CSV lines correctly, including handling quoted fields that contain commas, and why a real CSV parser is safer for production use.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-splitting-csv-strings',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does string.split(",") break on CSV data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because CSV fields can contain commas inside quoted values, such as "Doe, John". A naive split(",") breaks that single field into two, misaligning every column after it.',
        },
      },
      {
        '@type': 'Question',
        name: 'What regex can split a CSV line while respecting quoted fields?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A common pattern is ,(?=(?:(?:[^"]*"){2})*[^"]*$), a comma split that uses a lookahead to only split on commas outside an even number of quotes, meaning commas inside quoted fields are preserved.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use regex or a library to parse CSV files in production?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a dedicated library such as PapaParse (browser/Node.js) or csv-parse (Node.js) for production. They correctly handle escaped quotes, embedded newlines inside quoted fields, different delimiters, and encoding issues that a hand-written regex will not.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Splitting CSV Strings (Handling Quoted Commas) | Dev Brains AI</title>
        <meta
          name="description"
          content="Regex to split CSV lines correctly, including handling quoted fields that contain commas, and why a real CSV parser is safer for production."
        />
        <meta
          name="keywords"
          content="regex split csv, csv regex javascript, split csv with quoted commas, csv parsing regex, javascript csv parser regex"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-splitting-csv-strings" />
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
              <li aria-current="page">Regex for Splitting CSV Strings</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Splitting CSV Strings — Handling Quoted Fields Correctly
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            <code>line.split(',')</code> is the first thing every developer tries on CSV data, and
            it works right up until a field contains a comma inside quotes — then every column after
            it shifts by one. This guide shows the regex fix, its limits, and when to reach for a
            real CSV parsing library instead.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Problem with a Plain Comma Split
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const row = 'John,"Doe, Jr.",Mumbai,India';

row.split(',');
// ['John', '"Doe', ' Jr."', 'Mumbai', 'India']
// WRONG — the quoted "Doe, Jr." field got split into two columns`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Splitting with a Lookahead-Aware Regex
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The trick is to only split on a comma when it is followed by an even number of quote
            characters for the rest of the line — meaning it is outside any open quote:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const row = 'John,"Doe, Jr.",Mumbai,India';

const fields = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
console.log(fields);
// ['John', '"Doe, Jr."', 'Mumbai', 'India']  — correct!

// Strip the surrounding quotes afterward
const cleaned = fields.map((f) => f.replace(/^"|"$/g, ''));
// ['John', 'Doe, Jr.', 'Mumbai', 'India']`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The lookahead <code>{'(?=(?:(?:[^"]*"){2})*[^"]*$)'}</code> counts quote characters
            ahead of each comma in pairs — if there's an even number of quotes remaining, the comma
            is "outside" a quoted field and safe to split on.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extracting Fields Directly with a Match Regex
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An alternative approach matches each field directly instead of splitting, which is often
            easier to reason about:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function parseCsvLine(line) {
  const fieldRegex = /(?:^|,)("(?:[^"]|"")*"|[^,]*)/g;
  const fields = [];
  let match;

  while ((match = fieldRegex.exec(line)) !== null) {
    if (match[0] === '' && match.index === line.length) break;
    let value = match[1];
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/""/g, '"'); // unescape doubled quotes
    }
    fields.push(value);
  }
  return fields;
}

parseCsvLine('John,"Doe, Jr.",Mumbai,"Says ""hi""!"');
// ['John', 'Doe, Jr.', 'Mumbai', 'Says "hi"!']`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Where Regex-Based CSV Parsing Still Falls Short
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Embedded newlines</strong> — a quoted field can legally contain a line break, which breaks any line-by-line regex approach that splits on <code>\n</code> first</li>
            <li><strong>Different encodings</strong> — UTF-8 BOM markers, non-UTF-8 files, and mixed line endings (CRLF vs LF) need dedicated handling</li>
            <li><strong>Alternate delimiters</strong> — semicolon-delimited "CSV" (common in European locales) or tab-delimited TSV need the pattern rewritten</li>
            <li><strong>Performance on large files</strong> — regex-per-line parsing of a multi-million-row file is far slower than a streaming parser built for the format</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            For any production import/export feature, use a library:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Node.js — using csv-parse
const { parse } = require('csv-parse/sync');

const records = parse(csvString, {
  columns: true,
  skip_empty_lines: true,
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When the Regex Approach Is Fine
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>You control the data source and know it never contains embedded newlines in fields</li>
            <li>You are doing a quick one-off script or a small admin tool, not a production import pipeline</li>
            <li>You need zero dependencies for a small serverless function with tight bundle size limits</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does string.split(",") break on CSV data?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Because CSV fields can contain commas inside quoted values, such as "Doe, John". A naive
              split(",") breaks that single field into two, misaligning every column after it.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What regex can split a CSV line while respecting quoted fields?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A common pattern is <code>{',(?=(?:(?:[^"]*"){2})*[^"]*$)'}</code>, a comma split that
              uses a lookahead to only split on commas outside an even number of quotes, meaning
              commas inside quoted fields are preserved.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use regex or a library to parse CSV files in production?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use a dedicated library such as PapaParse (browser/Node.js) or csv-parse (Node.js) for
              production. They correctly handle escaped quotes, embedded newlines inside quoted
              fields, different delimiters, and encoding issues that a hand-written regex will not.
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
              <li><Link href="/blog/regex-vs-string-methods-when-to-use-which">Regex vs String Methods — When to Use Which</Link></li>
              <li><Link href="/blog/json-formatter-for-indian-gst-apis">JSON Formatter for Indian GST APIs</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-performance-and-catastrophic-backtracking">Regex Performance and Catastrophic Backtracking</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
