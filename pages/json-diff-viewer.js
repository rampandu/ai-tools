// pages/json-diff-viewer.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { diffJson, MAX_DIFFS } from '../lib/jsonDiff';

const EXAMPLES = [
  {
    label: 'API response before/after',
    original: `{
  "id": 1,
  "status": "pending",
  "customer": {
    "name": "Priya",
    "email": "priya@example.com"
  },
  "total": 49.99
}`,
    changed: `{
  "id": 1,
  "status": "shipped",
  "customer": {
    "name": "Priya",
    "email": "priya@example.com",
    "vip": true
  },
  "total": 49.99,
  "trackingNumber": "1Z999AA1"
}`,
  },
  {
    label: 'Config file (nested + array)',
    original: `{
  "server": {
    "host": "localhost",
    "port": 8080,
    "timeout": 30
  },
  "features": ["auth", "logging"]
}`,
    changed: `{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "timeout": 60
  },
  "features": ["auth", "logging", "rateLimit"]
}`,
  },
  {
    label: 'Array of objects',
    original: `[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]`,
    changed: `[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Robert" },
  { "id": 3, "name": "Cara" }
]`,
  },
];

const FAQ = [
  {
    q: 'Is this JSON diff tool free?',
    a: 'Yes — completely free, with no signup required and no limit on how many comparisons you can run.',
  },
  {
    q: 'Does it care about key order?',
    a: 'No. This is a structural diff — it parses both sides into real values and compares keys and values regardless of order, so {"a":1,"b":2} and {"b":2,"a":1} correctly show as identical. A plain text or JSON.stringify comparison would incorrectly flag those as different.',
  },
  {
    q: 'How is this different from the Text Diff Checker?',
    a: "The Text Diff Checker compares two texts line by line, so reformatting, re-indenting, or reordering keys shows up as noisy false differences. This tool parses both sides as JSON first, so only the actual data changes — added keys, removed keys, and changed values — are reported, regardless of formatting or key order. Use the Text Diff Checker for line-based text; use this for JSON specifically.",
  },
  {
    q: 'Is my JSON sent to a server?',
    a: 'No. Parsing and comparison both run entirely in your browser with JavaScript. Nothing you paste is uploaded, logged, or stored.',
  },
  {
    q: 'Does it handle arrays?',
    a: 'Yes, by comparing elements at the same index. Because it compares by position, inserting an element in the middle of an array will show every element after it as "changed" rather than recognizing a single insertion — the same limitation line-based diff tools have with moved blocks.',
  },
];

const typeColor = { added: '#16a34a', removed: '#dc2626', changed: '#d97706' };
const typeBg = { added: '#f0fdf4', removed: '#fef2f2', changed: '#fffbeb' };
const typeLabel = { added: '+ added', removed: '− removed', changed: '~ changed' };

function formatValue(v) {
  if (v === undefined) return 'undefined';
  const s = JSON.stringify(v);
  if (s === undefined) return String(v);
  return s.length > 120 ? s.slice(0, 120) + '…' : s;
}

export default function JsonDiffViewer() {
  const [original, setOriginal] = useState(EXAMPLES[0].original);
  const [changed, setChanged] = useState(EXAMPLES[0].changed);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function handleCompare() {
    setError(null);
    setResult(null);
    let a, b;
    try {
      a = JSON.parse(original);
    } catch (err) {
      setError(`Original JSON is invalid: ${err.message}`);
      return;
    }
    try {
      b = JSON.parse(changed);
    } catch (err) {
      setError(`Changed JSON is invalid: ${err.message}`);
      return;
    }
    setResult(diffJson(a, b));
  }

  function handleClear() {
    setOriginal('');
    setChanged('');
    setResult(null);
    setError(null);
  }

  const added = result ? result.filter((d) => d.type === 'added').length : 0;
  const removed = result ? result.filter((d) => d.type === 'removed').length : 0;
  const changedCount = result ? result.filter((d) => d.type === 'changed').length : 0;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dev Brains AI JSON Diff Viewer',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free structure-aware JSON diff tool that runs entirely in your browser. Paste two JSON payloads to see exactly which keys were added, removed, or changed, ignoring key order and formatting.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'JSON Diff Viewer', item: 'https://dev-brains-ai.com/json-diff-viewer' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free JSON Diff Viewer — Compare Two JSON Objects | Dev Brains AI</title>
        <meta
          name="description"
          content="Compare two JSON objects and see exactly which keys were added, removed, or changed — ignores key order and formatting. 100% client-side, free, no signup."
        />
        <meta
          name="keywords"
          content="json diff viewer, compare two json objects, json diff tool, json compare online, structural json diff, json diff checker, compare json free"
        />
        <meta property="og:title" content="Free JSON Diff Viewer — Compare Two JSON Objects" />
        <meta
          property="og:description"
          content="Compare two JSON objects and see exactly which keys were added, removed, or changed — ignores key order and formatting. Free, no signup."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/json-diff-viewer" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/json-diff-viewer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <div className="card" aria-live="polite">
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">JSON Diff Viewer</li>
          </ol>
        </nav>

        <h1>Free JSON Diff Viewer</h1>
        <p className="small">
          Paste the <strong>original</strong> JSON on the left and the <strong>changed</strong>{' '}
          version on the right, then click <strong>Compare</strong>. Unlike a text diff, this
          parses both sides first — reordering keys or reformatting whitespace never shows as a
          false difference, only real data changes do.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <label htmlFor="json-original"><strong>Original</strong></label>
            <textarea
              id="json-original"
              aria-label="Original JSON"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              style={{ minHeight: 220, width: '100%', fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
              placeholder="Paste the original JSON here..."
            />
          </div>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <label htmlFor="json-changed"><strong>Changed</strong></label>
            <textarea
              id="json-changed"
              aria-label="Changed JSON"
              value={changed}
              onChange={(e) => setChanged(e.target.value)}
              style={{ minHeight: 220, width: '100%', fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
              placeholder="Paste the changed JSON here..."
            />
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleCompare}>Compare</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                type="button"
                className="small"
                onClick={() => {
                  setOriginal(ex.original);
                  setChanged(ex.changed);
                  setResult(null);
                  setError(null);
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          {error && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && result.length === 0 && (
            <div className="small" style={{ color: '#16a34a', fontWeight: 600 }}>
              No differences — both JSON values are structurally identical.
            </div>
          )}

          {result && result.length > 0 && (
            <div style={{ marginTop: 4 }}>
              <p className="small">
                <strong style={{ color: typeColor.added }}>+{added} added</strong>
                {' / '}
                <strong style={{ color: typeColor.removed }}>&minus;{removed} removed</strong>
                {' / '}
                <strong style={{ color: typeColor.changed }}>~{changedCount} changed</strong>
              </p>
              <div style={{ fontFamily: 'ui-monospace, Menlo, Monaco, monospace', fontSize: '0.85rem', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                {result.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '6px 10px',
                      background: typeBg[d.type],
                      borderBottom: i < result.length - 1 ? '1px solid #e2e8f0' : 'none',
                    }}
                  >
                    <span style={{ color: typeColor[d.type], fontWeight: 700 }}>{typeLabel[d.type]}</span>{' '}
                    <span style={{ color: '#0f172a' }}>{d.path}</span>
                    {d.type === 'changed' ? (
                      <span style={{ color: '#475569' }}>
                        {': '}
                        <span style={{ color: typeColor.removed }}>{formatValue(d.from)}</span>
                        {' → '}
                        <span style={{ color: typeColor.added }}>{formatValue(d.to)}</span>
                      </span>
                    ) : (
                      <span style={{ color: '#475569' }}>{': '}{formatValue(d.value)}</span>
                    )}
                  </div>
                ))}
              </div>
              {result.length >= MAX_DIFFS && (
                <p className="small" style={{ marginTop: 6, color: '#64748b' }}>
                  Showing the first {MAX_DIFFS} differences — there may be more.
                </p>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Compare</strong>.
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>About the JSON Diff Viewer</h2>
        <p>
          Comparing two JSON payloads with a plain text diff produces a lot of noise: reordered
          keys, different indentation, or pretty-printing one side but not the other all show up
          as changes even when the underlying data is identical. This tool parses both sides into
          real JavaScript values first and walks them recursively, so it reports only genuine
          differences — a key that was added, a key that was removed, or a value that changed —
          each labeled with its exact path (e.g. <code>customer.email</code> or{' '}
          <code>items[2].price</code>).
        </p>
        <p>
          This is the same algorithm explained in{' '}
          <Link href="/blog/json-diff-comparing-two-json-objects">
            JSON Diff: How to Compare Two JSON Objects
          </Link>{' '}
          — if you want to build this into your own code (for snapshot testing, API regression
          checks, or webhook debugging) that guide walks through the recursive diff function step
          by step.
        </p>

        <h3>Common Uses</h3>
        <ul className="small">
          <li><strong>API regression checks</strong> — diff a "known good" response against a new deploy's response to confirm nothing unexpected changed.</li>
          <li><strong>Config drift</strong> — compare a staging config against production to find the setting responsible for a behavioral difference.</li>
          <li><strong>Webhook debugging</strong> — compare the payload your code expects against what a third-party service actually sent.</li>
          <li><strong>Test snapshots</strong> — see exactly which field broke a snapshot test instead of squinting at two giant stringified blobs.</li>
        </ul>
      </div>

      <div className="card">
        <h3>FAQ</h3>
        {FAQ.map((f, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{f.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>{f.a}</div>
          </div>
        ))}
      </div>

      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Need to pretty-print JSON first? Use the <Link href="/json-formatter">JSON Formatter</Link>.
          Comparing plain text or code instead of JSON? Use the{' '}
          <Link href="/diff-checker">Text Diff Checker</Link>. Validating structure against a
          schema? Try the <Link href="/json-schema-generator">JSON Schema Generator</Link>. Need
          TypeScript types for either side of the diff? Use the{' '}
          <Link href="/json-to-typescript">JSON to TypeScript Converter</Link>.
        </p>
      </div>

      <div className="card">
        <h3>JSON guides and tutorials</h3>
        <ul className="small">
          <li><Link href="/blog/json-diff-viewer-guide-how-it-works">JSON Diff Viewer Guide: How Structural Comparison Works</Link></li>
          <li><Link href="/blog/json-diff-comparing-two-json-objects">JSON Diff: How to Compare Two JSON Objects (With Code)</Link></li>
          <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
          <li><Link href="/blog/json-minify-vs-pretty-print-explained">JSON Minify vs Pretty Print Explained</Link></li>
          <li><Link href="/blog/nested-json-flattening-techniques">Nested JSON Flattening Techniques</Link></li>
          <li><Link href="/blog/rest-api-json-response-best-practices">REST API JSON Response Best Practices</Link></li>
          <li><Link href="/json-formatter">JSON Formatter</Link></li>
        </ul>
      </div>
    </div>
  );
}
