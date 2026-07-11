// pages/blog/json-diff-comparing-two-json-objects.js
import Head from 'next/head';
import Link from 'next/link';

export default function JsonDiffComparingTwoJsonObjects() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON Diff — How to Compare Two JSON Objects',
        item: 'https://dev-brains-ai.com/blog/json-diff-comparing-two-json-objects',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JSON Diff — How to Compare Two JSON Objects for Differences',
    description:
      'How to compare two JSON objects for differences — deep equality checks, key-by-key diffing, and using JSON diffing for API response regression testing.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/json-diff-comparing-two-json-objects',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is JSON diffing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JSON diffing is the process of comparing two JSON objects or documents to find what was added, removed, or changed between them. It is commonly used to detect changes in API responses, configuration files, and test snapshots.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JSON.stringify comparison work for deep equality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only if both objects have keys in the exact same order, since JSON.stringify preserves insertion order. For reliable deep equality regardless of key order, use a recursive comparison function or a library like lodash isEqual or fast-deep-equal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to format JSON before diffing it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free JSON Formatter at dev-brains-ai.com/json-formatter that pretty-prints two JSON payloads with consistent indentation, making manual or side-by-side diffing far easier.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JSON Diff — How to Compare Two JSON Objects | Dev Brains AI</title>
        <meta
          name="description"
          content="How to compare two JSON objects for differences — deep equality checks, key-by-key diffing, and using JSON diffing for API response regression testing."
        />
        <meta
          name="keywords"
          content="json diff, compare two json objects, json deep equal, json diff tool, compare json objects javascript, json regression testing, json object comparison"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/json-diff-comparing-two-json-objects" />
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
              <li aria-current="page">JSON Diff Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSON Diff — How to Compare Two JSON Objects for Differences
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Whether you are checking if an API response changed between deployments, verifying a
            test snapshot, or debugging why two "identical looking" config files behave
            differently, you need a reliable way to diff JSON. Naive string comparison fails the
            moment key order changes. This guide covers the right way to compare JSON objects.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why String Comparison Is Not Enough
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Two JSON objects can represent identical data but produce different strings if key
            order differs:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const a = { name: "Priya", age: 29 };
const b = { age: 29, name: "Priya" };

JSON.stringify(a) === JSON.stringify(b); // false — but the data is identical!

console.log(JSON.stringify(a)); // {"name":"Priya","age":29}
console.log(JSON.stringify(b)); // {"age":29,"name":"Priya"}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            To correctly say these are "the same", you need deep equality — a comparison that
            checks matching keys and values regardless of order, recursively into nested structures.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Writing a Deep Equality Check
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function deepEqual(a, b) {
  if (a === b) return true;

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(key =>
    Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key])
  );
}

deepEqual({ name: "Priya", age: 29 }, { age: 29, name: "Priya" }); // true
deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] }); // true
deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 4] }); // false`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Producing an Actual Diff (Not Just true/false)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For debugging, a boolean is not enough — you need to know exactly which keys changed.
            This function returns a list of differences:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function diffJson(obj1, obj2, path = '') {
  const diffs = [];
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of keys) {
    const fullPath = path ? \`\${path}.\${key}\` : key;
    const v1 = obj1[key];
    const v2 = obj2[key];

    if (!(key in obj1)) {
      diffs.push({ path: fullPath, type: 'added', value: v2 });
    } else if (!(key in obj2)) {
      diffs.push({ path: fullPath, type: 'removed', value: v1 });
    } else if (typeof v1 === 'object' && typeof v2 === 'object' && v1 !== null && v2 !== null) {
      diffs.push(...diffJson(v1, v2, fullPath));
    } else if (v1 !== v2) {
      diffs.push({ path: fullPath, type: 'changed', from: v1, to: v2 });
    }
  }
  return diffs;
}

const before = { id: 1, status: "pending", customer: { name: "Priya" } };
const after  = { id: 1, status: "shipped", customer: { name: "Priya", vip: true } };

console.log(diffJson(before, after));
// [
//   { path: 'status', type: 'changed', from: 'pending', to: 'shipped' },
//   { path: 'customer.vip', type: 'added', value: true }
// ]`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using JSON Diffing for API Regression Testing
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Snapshot testing</strong> — save a "known good" API response and diff future responses against it to catch unintended changes.</li>
            <li><strong>Contract testing</strong> — verify a backend still returns the exact shape a frontend expects after a refactor.</li>
            <li><strong>Migration verification</strong> — diff responses from an old and new version of an endpoint to confirm behavior parity.</li>
            <li><strong>Webhook debugging</strong> — compare the payload your code expects against what a third-party service actually sends.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Libraries That Do This for You
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>lodash.isEqual</strong> — battle-tested deep equality check for JavaScript objects.</li>
            <li><strong>fast-deep-equal</strong> — a minimal, fast alternative for hot code paths.</li>
            <li><strong>deep-diff</strong> (npm) — returns a structured list of additions, deletions, and edits, similar to the custom function above.</li>
            <li><strong>jest's toEqual matcher</strong> — built-in deep equality for test assertions in Jest.</li>
            <li><strong>DeepDiff / jsondiffpatch</strong> — libraries built specifically for visualizing and patching JSON diffs.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is JSON diffing?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              JSON diffing is the process of comparing two JSON objects or documents to find what was added, removed, or changed between them. It is commonly used to detect changes in API responses, configuration files, and test snapshots.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does JSON.stringify comparison work for deep equality?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Only if both objects have keys in the exact same order, since JSON.stringify preserves insertion order. For reliable deep equality regardless of key order, use a recursive comparison function or a library like lodash isEqual or fast-deep-equal.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to format JSON before diffing it?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. <Link href="/json-formatter">Dev Brains AI JSON Formatter</Link> pretty-prints two JSON payloads with consistent indentation, making manual or side-by-side diffing far easier.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Pretty-print JSON payloads before comparing them side by side. No signup, no cost.
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
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
              <li><Link href="/blog/rest-api-json-response-best-practices">REST API JSON Response Best Practices</Link></li>
              <li><Link href="/blog/json-minify-vs-pretty-print-explained">JSON Minify vs Pretty Print Explained</Link></li>
              <li><Link href="/blog/nested-json-flattening-techniques">Nested JSON Flattening Techniques</Link></li>
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
