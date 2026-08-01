// pages/json-to-typescript.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { jsonToTypeScript } from '../lib/jsonToTs';

const EXAMPLES = [
  {
    label: 'API response (nested + array)',
    name: 'Order',
    json: `{
  "id": 1,
  "status": "pending",
  "customer": {
    "name": "Priya",
    "email": "priya@example.com",
    "vip": true
  },
  "tags": ["priority", "gift-wrap"],
  "total": 49.99
}`,
  },
  {
    label: 'Array of records',
    name: 'User',
    json: `[
  { "id": 1, "name": "Alice", "active": true },
  { "id": 2, "name": "Bob", "active": false }
]`,
  },
  {
    label: 'Config file',
    name: 'Config',
    json: `{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "timeout": 30
  },
  "features": ["auth", "logging"],
  "debug": false
}`,
  },
];

const FAQ = [
  {
    q: 'Is this JSON to TypeScript converter free?',
    a: 'Yes — completely free, with no signup required and no limit on how many times you use it.',
  },
  {
    q: 'How does it handle arrays of objects?',
    a: "It uses the first element of the array as the representative shape for the generated interface. If your array's objects vary — some have an extra optional field, for example — that field won't be captured. Review the output against your actual data and add optional fields (key?: type) by hand if needed.",
  },
  {
    q: 'What happens to keys that aren’t valid TypeScript identifiers?',
    a: 'Keys with spaces, hyphens, or other characters that would be invalid as bare property names (like "user-id" or "full name") are automatically quoted in the output, e.g. "user-id": number;, which is valid TypeScript.',
  },
  {
    q: 'Is my JSON sent to a server?',
    a: 'No. The entire type inference runs in your browser with JavaScript. Nothing you paste is uploaded, logged, or stored.',
  },
];

export default function JsonToTypeScript() {
  const [json, setJson] = useState(EXAMPLES[0].json);
  const [rootName, setRootName] = useState(EXAMPLES[0].name);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    setCopied(false);
    setResult(jsonToTypeScript(json, rootName || 'Root'));
  }

  function handleClear() {
    setJson('');
    setResult(null);
    setCopied(false);
  }

  function handleCopy() {
    if (!result?.valid) return;
    navigator.clipboard.writeText(result.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

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
    name: 'Dev Brains AI JSON to TypeScript Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free JSON to TypeScript interface generator that runs entirely in your browser. Paste example JSON and get matching TypeScript interfaces, including nested objects and arrays.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'JSON to TypeScript', item: 'https://dev-brains-ai.com/json-to-typescript' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free JSON to TypeScript Converter — Generate Interfaces | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste example JSON and instantly get matching TypeScript interfaces, including nested objects and arrays. Free, 100% client-side, no signup."
        />
        <meta
          name="keywords"
          content="json to typescript, json to typescript interface, json to ts converter, generate typescript interface from json, json to interface, typescript type from json"
        />
        <meta property="og:title" content="Free JSON to TypeScript Converter — Generate Interfaces" />
        <meta
          property="og:description"
          content="Paste example JSON and instantly get matching TypeScript interfaces, including nested objects and arrays. Free, 100% client-side."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/json-to-typescript" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/json-to-typescript" />
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
            <li aria-current="page">JSON to TypeScript</li>
          </ol>
        </nav>

        <h1>Free JSON to TypeScript Converter</h1>
        <p className="small">
          Paste example JSON below and get matching TypeScript interfaces — nested objects become
          their own named interfaces, arrays become <code>Type[]</code>. Runs entirely in your
          browser; nothing is uploaded.
        </p>

        <label htmlFor="root-name"><strong>Root interface name</strong></label>
        <input
          id="root-name"
          type="text"
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          style={{ width: 220, marginBottom: 10, padding: '6px 8px' }}
          placeholder="Root"
        />

        <label htmlFor="json-input"><strong>Example JSON</strong></label>
        <textarea
          id="json-input"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          style={{ minHeight: 220, width: '100%', fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
          placeholder="Paste example JSON here..."
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleGenerate}>Generate Interfaces</button>
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
                  setJson(ex.json);
                  setRootName(ex.name);
                  setResult(null);
                  setCopied(false);
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          {result && !result.valid && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {result.error}
            </div>
          )}

          {result && result.valid && (
            <div style={{ marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
                <button type="button" className="small" onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{ background: '#0f172a', color: '#5eead4', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', margin: 0 }}>
                {result.code}
              </pre>
            </div>
          )}

          {!result && (
            <div className="small">
              No result yet — press <strong>Generate Interfaces</strong>.
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>About the JSON to TypeScript Converter</h2>
        <p>
          Hand-writing TypeScript interfaces to match an API response or config file is tedious and
          error-prone — it's easy to miss a nested field or get an array type wrong. This tool
          infers the shape directly from real example data: paste JSON, and every nested object
          becomes its own named interface (so <code>customer</code> gets a <code>Customer</code>{' '}
          interface, not an inline blob), arrays become <code>Type[]</code>, and property names
          that aren't valid TypeScript identifiers are automatically quoted.
        </p>
        <p>
          Want to pretty-print or validate the JSON first? Use the{' '}
          <Link href="/json-formatter">JSON Formatter</Link>. Comparing two JSON payloads instead?
          Try the <Link href="/json-diff-viewer">JSON Diff Viewer</Link>. Need a formal JSON Schema
          instead of TypeScript types? Use the{' '}
          <Link href="/json-schema-generator">JSON Schema Generator</Link>.
        </p>

        <h3>A Note on Arrays</h3>
        <p>
          Real-world API arrays don't always have perfectly consistent objects — some items might
          have an extra optional field. This tool uses the <strong>first element</strong> of an
          array as the representative shape, so a field that only appears on the second or third
          item won't show up in the generated interface. For anything you're about to ship, double
          check the output against a few different example items, not just one.
        </p>
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
          Pretty-print or validate JSON with the <Link href="/json-formatter">JSON Formatter</Link>,
          compare two JSON payloads with the <Link href="/json-diff-viewer">JSON Diff Viewer</Link>,
          or generate a formal schema with the{' '}
          <Link href="/json-schema-generator">JSON Schema Generator</Link>.
        </p>
      </div>

      <div className="card">
        <h3>JSON guides and tutorials</h3>
        <ul className="small">
          <li><Link href="/blog/json-diff-comparing-two-json-objects">JSON Diff: How to Compare Two JSON Objects (With Code)</Link></li>
          <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
          <li><Link href="/blog/nested-json-flattening-techniques">Nested JSON Flattening Techniques</Link></li>
          <li><Link href="/blog/rest-api-json-response-best-practices">REST API JSON Response Best Practices</Link></li>
          <li><Link href="/blog/working-with-large-json-files-nodejs">Working with Large JSON Files in Node.js</Link></li>
        </ul>
      </div>
    </div>
  );
}
