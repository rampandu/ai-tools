// pages/blog/json-to-csv-conversion-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function JsonToCsvConversionGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON to CSV Conversion Guide',
        item: 'https://dev-brains-ai.com/blog/json-to-csv-conversion-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JSON to CSV in JavaScript: Working Code and 4 Libraries',
    description:
      'Convert JSON arrays to CSV with a copy-paste JavaScript function that handles RFC 4180 escaping, plus json2csv, papaparse, pandas, and csv-writer — and 5 pitfalls to avoid.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/json-to-csv-conversion-guide',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I convert JSON to CSV in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To convert a JSON array of objects to CSV in JavaScript, extract the column headers from the object keys, then map each object to a comma-separated row, making sure to escape values containing commas, quotes, or newlines.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if JSON objects have different fields when converting to CSV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CSV requires a consistent set of columns across all rows. When JSON objects have different fields, you must first collect the union of all keys across every object, then fill in empty values for any object missing a given key.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to format JSON before converting it to CSV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free JSON Formatter at dev-brains-ai.com/json-formatter that validates and pretty-prints JSON so you can confirm the structure and fields before writing a conversion script.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JSON to CSV in JavaScript: Working Code + 4 Libraries | Dev Brains AI</title>
        <meta
          name="description"
          content="Convert JSON arrays to CSV with a copy-paste JavaScript function that handles RFC 4180 escaping, plus json2csv, papaparse, pandas, and csv-writer — and 5 pitfalls to avoid."
        />
        <meta
          name="keywords"
          content="json to csv, convert json to csv javascript, json to csv nodejs, json to csv python, json2csv vs papaparse, csv escaping rfc 4180, export json as csv"
        />
        <meta property="og:title" content="JSON to CSV in JavaScript: Working Code + 4 Libraries" />
        <meta property="og:description" content="Convert JSON arrays to CSV with a copy-paste JavaScript function that handles RFC 4180 escaping, plus json2csv, papaparse, pandas, and csv-writer — and 5 pitfalls to avoid." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/json-to-csv-conversion-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/json-to-csv-conversion-guide" />
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
              <li aria-current="page">JSON to CSV Conversion Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSON to CSV Conversion Guide — Manual Code and Libraries
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            An API returns JSON, but the person who needs the data wants an Excel file. Converting
            a JSON array of objects into CSV is a common task for exports, reports, and data
            handoffs. This guide covers a manual JavaScript implementation you fully control, plus
            the libraries most teams reach for in production.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Basic Shape of the Problem
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// JSON input
[
  { "id": 1, "name": "Priya Sharma", "city": "Bengaluru", "total": 1499 },
  { "id": 2, "name": "Rahul Verma", "city": "Pune", "total": 899 }
]

// CSV output
id,name,city,total
1,Priya Sharma,Bengaluru,1499
2,Rahul Verma,Pune,899`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Manual JSON-to-CSV Function
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This handles the tricky part correctly: escaping values that contain commas, quotes,
            or newlines, per the CSV spec (RFC 4180):
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function jsonToCsv(records) {
  if (records.length === 0) return '';

  // Collect the union of all keys across every record
  const columns = [...new Set(records.flatMap(r => Object.keys(r)))];

  const escapeCell = (value) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    // Quote the cell if it contains a comma, quote, or newline
    if (/[",\\n]/.test(str)) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const header = columns.map(escapeCell).join(',');
  const rows = records.map(record =>
    columns.map(col => escapeCell(record[col])).join(',')
  );

  return [header, ...rows].join('\\n');
}

const orders = [
  { id: 1, name: "Priya Sharma", note: "Deliver, please call first" },
  { id: 2, name: "Rahul Verma", note: null }
];

console.log(jsonToCsv(orders));
// id,name,note
// 1,Priya Sharma,"Deliver, please call first"
// 2,Rahul Verma,`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Handling Nested Objects
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            CSV has no concept of nested structures, so nested objects must be flattened first —
            see our <Link href="/blog/nested-json-flattening-techniques">flattening guide</Link>{' '}
            for the recursive function. A quick example:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const nested = [
  { id: 1, customer: { name: "Priya", city: "Bengaluru" } }
];

// Flatten first: { id: 1, "customer.name": "Priya", "customer.city": "Bengaluru" }
// Then run jsonToCsv() on the flattened records.`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using a Library Instead
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>json2csv (Node.js)</strong> — handles nested fields, custom delimiters, and streaming for large datasets.</li>
            <li><strong>papaparse (browser + Node.js)</strong> — widely used for both parsing and generating CSV, works well client-side too.</li>
            <li><strong>pandas (Python)</strong> — <code>pd.DataFrame(data).to_csv('output.csv', index=False)</code> converts JSON-derived data to CSV in one line.</li>
            <li><strong>csv-writer (Node.js)</strong> — simple, promise-based CSV writing for Node.js scripts.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Python example with pandas
import pandas as pd
import json

with open('orders.json') as f:
    data = json.load(f)

df = pd.DataFrame(data)
df.to_csv('orders.csv', index=False)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Pitfalls When Converting JSON to CSV
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Inconsistent fields across records</strong> — always compute the full column set first, not just the first record's keys.</li>
            <li><strong>Commas and quotes in values</strong> — unescaped values silently corrupt the CSV structure; always quote and escape properly.</li>
            <li><strong>Numbers with leading zeros</strong> — Excel may strip leading zeros from values like PIN codes or account numbers unless the cell is explicitly quoted as text.</li>
            <li><strong>UTF-8 encoding</strong> — save the output file with a UTF-8 BOM if it needs to open correctly in Excel with Indian language characters.</li>
            <li><strong>Arrays inside a field</strong> — decide upfront whether to join them with a delimiter (e.g. semicolon) or expand them into separate rows.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert JSON to CSV in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              To convert a JSON array of objects to CSV in JavaScript, extract the column headers from the object keys, then map each object to a comma-separated row, making sure to escape values containing commas, quotes, or newlines.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What happens if JSON objects have different fields when converting to CSV?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              CSV requires a consistent set of columns across all rows. When JSON objects have different fields, you must first collect the union of all keys across every object, then fill in empty values for any object missing a given key.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to format JSON before converting it to CSV?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. <Link href="/json-formatter">Dev Brains AI JSON Formatter</Link> validates and pretty-prints JSON so you can confirm the structure and fields before writing a conversion script.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Validate and inspect your JSON before converting it to CSV. No signup, no cost.
            </p>
            <Link href="/json-formatter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open JSON Formatter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/nested-json-flattening-techniques">Nested JSON Flattening Techniques</Link></li>
              <li><Link href="/blog/json-formatter-for-indian-gst-apis">JSON Formatter for Indian GST APIs</Link></li>
              <li><Link href="/blog/working-with-large-json-files-nodejs">Working with Large JSON Files in Node.js</Link></li>
              <li><Link href="/blog/json-serialization-python-guide">JSON Serialization in Python — Complete Guide</Link></li>
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
