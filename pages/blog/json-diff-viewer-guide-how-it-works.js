// pages/blog/json-diff-viewer-guide-how-it-works.js
import Head from 'next/head';
import Link from 'next/link';

export default function JsonDiffViewerGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON Diff Viewer Guide: How Structural Comparison Works',
        item: 'https://dev-brains-ai.com/blog/json-diff-viewer-guide-how-it-works',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JSON Diff Viewer Guide: How Structural Comparison Works',
    description:
      "Why a JSON diff isn't the same as a text diff, a worked example showing added/removed/changed paths, and what the array-by-index limitation means for your results.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/json-diff-viewer-guide-how-it-works',
    datePublished: '2026-08-01',
    dateModified: '2026-08-01',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does the JSON Diff Viewer show different results than a text diff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A text diff compares two strings line by line, so reordered keys or different indentation show up as changes even when the data is identical. The JSON Diff Viewer parses both sides into real values first and compares the data itself, so only genuine additions, removals, and value changes are reported.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does a path like items[2].price mean in the results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is the location of the difference inside the JSON structure: the third element (index 2) of the items array, then its price key. Dot notation is used for object keys and bracket notation for array indices, matching how you would access that value in JavaScript.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why did inserting one array element show up as many changes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The tool compares array elements by index, not by matching similar objects. Inserting an element in the middle of an array shifts every element after it by one position, so each of those shifts shows as a "changed" entry rather than a single "added" entry. This is a known tradeoff shared by most index-based diff tools.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JSON Diff Viewer Guide: How Structural Comparison Works | Dev Brains AI</title>
        <meta
          name="description"
          content="Why a JSON diff isn't the same as a text diff, a worked example showing added/removed/changed paths, and what the array-by-index limitation means for your results."
        />
        <meta
          name="keywords"
          content="json diff viewer guide, how json diff works, json diff path notation, structural json comparison, json diff array limitation, compare json objects tutorial"
        />
        <meta property="og:title" content="JSON Diff Viewer Guide: How Structural Comparison Works" />
        <meta property="og:description" content="Why a JSON diff isn't the same as a text diff, a worked example showing added/removed/changed paths, and what the array-by-index limitation means for your results." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/json-diff-viewer-guide-how-it-works" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/json-diff-viewer-guide-how-it-works" />
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
              <li aria-current="page">JSON Diff Viewer Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSON Diff Viewer Guide: How Structural Comparison Works
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Paste two JSON payloads into a generic text diff tool and you will often see a wall of
            red and green even when the underlying data barely changed — because a text diff
            compares strings, not data. The{' '}
            <Link href="/json-diff-viewer">JSON Diff Viewer</Link> takes a different approach: it
            parses both sides first, then walks the resulting values and reports only real
            differences. This guide walks through exactly what it does with a worked example.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why "Structural" Diffing Matters
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            These two JSON objects represent identical data, but differ in key order and
            formatting:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Left
{"name": "Priya", "role": "admin"}

// Right
{
  "role": "admin",
  "name": "Priya"
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            A line-based text diff would flag both lines as changed. The JSON Diff Viewer parses
            each side with <code>JSON.parse</code> first, compares the resulting objects key by
            key regardless of order, and correctly reports <strong>zero differences</strong>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Worked Example: Reading the Result List
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Take this before/after pair — a typical API response after a status update:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Original
{
  "id": 1,
  "status": "pending",
  "customer": { "name": "Priya", "email": "priya@example.com" },
  "total": 49.99
}

// Changed
{
  "id": 1,
  "status": "shipped",
  "customer": { "name": "Priya", "email": "priya@example.com", "vip": true },
  "total": 49.99,
  "trackingNumber": "1Z999AA1"
}`}
          </pre>
          <p className="small" style={{ marginBottom: 8 }}>The tool reports exactly three differences:</p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>~ changed</strong> <code>status</code>: <code>&quot;pending&quot;</code> → <code>&quot;shipped&quot;</code></li>
            <li><strong>+ added</strong> <code>customer.vip</code>: <code>true</code></li>
            <li><strong>+ added</strong> <code>trackingNumber</code>: <code>&quot;1Z999AA1&quot;</code></li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice <code>id</code> and <code>total</code> are absent from the results entirely —
            they didn&apos;t change, so nothing about them is reported. The path{' '}
            <code>customer.vip</code> tells you exactly where inside the nested structure the
            addition happened, without you having to scan the whole object by eye.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How Path Notation Works
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><code>customer.email</code> — an object key, one level deep</li>
            <li><code>items[2].price</code> — the <code>price</code> key of the third element (index 2) of the <code>items</code> array</li>
            <li><code>(root)</code> — used when the entire top-level value changed type, e.g. an object replaced by an array</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Array Limitation: Index-Based Comparison
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Arrays are compared element by element at the same index — there's no attempt to
            detect that "this object moved from index 1 to index 2." That means inserting an
            element in the middle of an array produces a cascade of changes:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Original: ["a", "b", "c"]
// Changed:  ["a", "x", "b", "c"]

// Reported diffs:
// ~ changed [1]: "b" -> "x"
// ~ changed [2]: "c" -> "b"
// + added   [3]: "c"`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The end result (four elements, the right values) is correct, but the diff reads as
            three changes instead of one clean insertion. This is the same tradeoff line-based diff
            tools make with moved blocks of text — see{' '}
            <Link href="/blog/how-diff-algorithms-work-lcs-explained">
              how diff algorithms work
            </Link>{' '}
            for the equivalent limitation in line diffing. For arrays of objects with a stable{' '}
            <code>id</code> field, sorting both arrays by that id before pasting them in avoids
            this noise.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does the JSON Diff Viewer show different results than a text diff?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A text diff compares strings line by line; the JSON Diff Viewer parses both sides
              first and compares the actual data, so key order and formatting never cause false
              differences.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What does a path like items[2].price mean in the results?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              It's the location of the difference: the third element of the <code>items</code>{' '}
              array, then its <code>price</code> key — the same syntax you'd use to access that
              value in JavaScript.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why did inserting one array element show up as many changes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Arrays are compared by index, not by matching similar objects, so an insertion shifts
              every following element and each shift reports as a change.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Diff Viewer</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste two JSON objects and see exactly which keys were added, removed, or changed.
              No signup, no cost.
            </p>
            <Link href="/json-diff-viewer">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open JSON Diff Viewer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/json-diff-comparing-two-json-objects">JSON Diff: How to Compare Two JSON Objects (With Code)</Link></li>
              <li><Link href="/blog/how-diff-algorithms-work-lcs-explained">How Diff Algorithms Work: LCS Explained</Link></li>
              <li><Link href="/blog/json-minify-vs-pretty-print-explained">JSON Minify vs Pretty Print Explained</Link></li>
              <li><Link href="/blog/nested-json-flattening-techniques">Nested JSON Flattening Techniques</Link></li>
              <li><Link href="/diff-checker">Text Diff Checker</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
