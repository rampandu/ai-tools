// pages/yaml-json-converter.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import yaml from 'js-yaml';

const DEFAULT_YAML = `version: "3.8"
services:
  web:
    image: nginx:1.27
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:
`;

const K8S_YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  labels:
    app: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: registry.example.com/api:2.4.1
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: "128Mi"
              cpu: "250m"
`;

const JSON_API_RESPONSE = `{
  "status": "ok",
  "data": {
    "user": {
      "id": 4821,
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "roles": ["admin", "editor"],
      "active": true
    },
    "pagination": {
      "page": 1,
      "perPage": 20,
      "total": 143
    }
  }
}`;

const EXAMPLES = [
  { label: 'Kubernetes-style YAML', text: K8S_YAML, direction: 'y2j' },
  { label: 'JSON API response', text: JSON_API_RESPONSE, direction: 'j2y' },
];

const FAQ = [
  {
    q: 'Is this YAML ↔ JSON Converter free?',
    a: 'Yes — the YAML ↔ JSON Converter on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Is my YAML or JSON sent to a server?',
    a: 'No. Conversion happens entirely in your browser using the js-yaml JavaScript library. Nothing you paste is uploaded, logged, or stored on our servers.',
  },
  {
    q: 'Will comments in my YAML be preserved?',
    a: 'No. JSON has no comment syntax, so YAML comments are dropped during YAML → JSON conversion, and converting back will not restore them. The data itself — mappings, sequences, scalars — converts losslessly in both directions.',
  },
  {
    q: 'What happens to YAML anchors and aliases?',
    a: 'Anchors (&) and aliases (*) are resolved during parsing, so the JSON output contains the fully expanded data. Converting that JSON back to YAML produces plain repeated values rather than recreating the anchors.',
  },
  {
    q: 'Why does my YAML fail to parse?',
    a: 'The most common causes are inconsistent indentation (YAML forbids tabs), a missing space after a colon, and unquoted values that YAML interprets specially (like versions such as 3.10 becoming the number 3.1, or "no" becoming false in older YAML versions). The error message shown includes the line number reported by the parser to help you find the problem.',
  },
];

export default function YamlJsonConverterPage() {
  const [input, setInput] = useState(DEFAULT_YAML);
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState('y2j'); // 'y2j' | 'j2y'
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleConvert() {
    setCopied(false);
    setError(null);
    setOutput('');
    const src = input.trim();
    if (!src) {
      setError('Please paste some input first.');
      return;
    }
    if (direction === 'y2j') {
      try {
        const parsed = yaml.load(src);
        setOutput(JSON.stringify(parsed, null, 2));
      } catch (e) {
        setError(`YAML parse error: ${e.message}`);
      }
    } else {
      try {
        const parsed = JSON.parse(src);
        setOutput(yaml.dump(parsed, { lineWidth: 100 }));
      } catch (e) {
        setError(`JSON parse error: ${e.message}`);
      }
    }
  }

  function handleSwap() {
    // Move the output into the input box and flip direction.
    setDirection(direction === 'y2j' ? 'j2y' : 'y2j');
    if (output) {
      setInput(output);
      setOutput('');
    }
    setError(null);
    setCopied(false);
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Clipboard API unavailable; nothing else to do client-side.
    }
  }

  function handleClear() {
    setInput('');
    setOutput('');
    setError(null);
    setCopied(false);
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
    name: 'Dev Brains AI YAML ↔ JSON Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free two-way YAML and JSON converter that runs entirely in your browser. Convert docker-compose, Kubernetes manifests, and CI configs to JSON — or turn JSON API responses into clean YAML.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'YAML ↔ JSON Converter', item: 'https://dev-brains-ai.com/yaml-json-converter' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free YAML ↔ JSON Converter — Convert Both Ways Online | Dev Brains AI</title>
        <meta
          name="description"
          content="Convert YAML to JSON and JSON to YAML instantly in your browser. Handles docker-compose files, Kubernetes manifests, and API responses with clear parse errors. 100% client-side — nothing is uploaded."
        />
        <meta
          name="keywords"
          content="yaml to json, json to yaml, yaml json converter, convert yaml online, yaml parser online, docker compose to json, Dev Brains AI"
        />
        <meta property="og:title" content="Free YAML ↔ JSON Converter — Convert Both Ways Online" />
        <meta
          property="og:description"
          content="Paste YAML or JSON and convert in either direction, with line-numbered parse errors. Runs 100% in your browser."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/yaml-json-converter" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/yaml-json-converter" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="card" aria-live="polite">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">YAML ↔ JSON Converter</li>
          </ol>
        </nav>

        <h1>Free YAML ↔ JSON Converter</h1>
        <p className="small">
          Paste <strong>YAML</strong> or <strong>JSON</strong> below, pick a direction, and click{' '}
          <strong>Convert</strong>. YAML is parsed with the battle-tested <code>js-yaml</code>{' '}
          library and parse errors include line information. Everything runs in your browser;
          nothing is uploaded.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 10 }} className="small">
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="radio"
              name="direction"
              value="y2j"
              checked={direction === 'y2j'}
              onChange={() => {
                setDirection('y2j');
                setError(null);
              }}
            />
            YAML → JSON
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="radio"
              name="direction"
              value="j2y"
              checked={direction === 'j2y'}
              onChange={() => {
                setDirection('j2y');
                setError(null);
              }}
            />
            JSON → YAML
          </label>
        </div>

        <label htmlFor="yj-input">
          <strong>{direction === 'y2j' ? 'YAML input' : 'JSON input'}</strong>
        </label>
        <textarea
          id="yj-input"
          aria-label={direction === 'y2j' ? 'YAML to convert' : 'JSON to convert'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ minHeight: 220, fontFamily: 'monospace' }}
          placeholder={direction === 'y2j' ? 'key: value' : '{ "key": "value" }'}
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleConvert}>
            Convert
          </button>
          <button type="button" onClick={handleSwap}>
            Swap ⇄
          </button>
          <button type="button" onClick={handleCopy} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                className="small"
                onClick={() => {
                  setInput(ex.text);
                  setDirection(ex.direction);
                  setOutput('');
                  setError(null);
                  setCopied(false);
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
              <strong>Error:</strong> {String(error)}
            </div>
          )}

          {output ? (
            <>
              <h3 style={{ marginBottom: 6 }}>
                {direction === 'y2j' ? 'JSON output' : 'YAML output'}
              </h3>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: 12,
                  borderRadius: 8,
                  overflowX: 'auto',
                }}
              >
                <code>{output}</code>
              </pre>
            </>
          ) : (
            !error && (
              <div className="small">
                No result yet — press <strong>Convert</strong>.
              </div>
            )
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this YAML ↔ JSON Converter</h2>
        <p>
          YAML and JSON describe the same data model — mappings, sequences, and scalars — with very
          different syntax. Modern infrastructure lives in YAML (Kubernetes manifests,
          docker-compose files, GitHub Actions workflows, Helm values), while application code and
          APIs overwhelmingly speak JSON. Moving between the two is a daily chore: you want to feed
          a compose file into a script that expects JSON, or inspect an API response as YAML
          because the braces are hurting your eyes. This converter does both directions in one
          click, entirely in your browser.
        </p>
        <p>
          YAML parsing uses <code>js-yaml</code>, the most widely used YAML library in the
          JavaScript ecosystem, so edge cases behave the way your tooling expects. JSON output is
          pretty-printed with two-space indentation; YAML output wraps long lines at 100
          characters. There is no API call, no upload, and no storage.
        </p>

        <h3>YAML → JSON: what to expect</h3>
        <ul>
          <li>
            <strong>Comments are dropped.</strong> JSON simply has no place for them. If your file
            relies on comments for documentation, keep the YAML as the source of truth.
          </li>
          <li>
            <strong>Anchors and aliases are expanded.</strong> <code>&amp;defaults</code> /{' '}
            <code>*defaults</code> references are resolved into full copies of the data.
          </li>
          <li>
            <strong>Types are resolved.</strong> Unquoted <code>true</code>, <code>null</code>, and
            numbers become real JSON booleans, nulls, and numbers. This is where surprises hide:
            an unquoted version like <code>3.10</code> parses as the number <code>3.1</code>. Quote
            values that must stay strings.
          </li>
          <li>
            <strong>Key order is preserved</strong> as written, which keeps diffs sane.
          </li>
        </ul>

        <h3>JSON → YAML: what to expect</h3>
        <p>
          Every valid JSON document is representable in YAML, so this direction never loses data.
          The converter emits block-style YAML — indented mappings and dash-prefixed sequences —
          which is what humans expect to read. Strings that could be misread as numbers or booleans
          are automatically quoted by the emitter, so round-tripping is safe.
        </p>

        <h3>Common YAML pitfalls this tool helps you catch</h3>
        <ul>
          <li>
            <strong>Tabs for indentation.</strong> YAML forbids tab characters in indentation; the
            parser reports the exact line so you can replace them with spaces.
          </li>
          <li>
            <strong>Missing space after a colon.</strong> <code>port:8080</code> is one scalar
            string, not a key-value pair. Convert to JSON and the mistake becomes obvious.
          </li>
          <li>
            <strong>Inconsistent nesting.</strong> A list item indented one space too far silently
            changes the structure. The JSON view shows you exactly what the parser understood.
          </li>
          <li>
            <strong>Accidental type coercion.</strong> Country code <code>NO</code>, git SHAs made
            of digits, or octal-looking IDs — converting to JSON reveals what type each value
            actually parsed as.
          </li>
        </ul>
        <p>
          If a manifest fails in CI or a cluster rejects it, converting it here is a fast sanity
          check: a parse error with a line number points at the syntax problem, and clean JSON
          output confirms the structure is what you intended. For a tour of the usual suspects, see
          our guide to{' '}
          <Link href="/blog/common-yaml-errors-in-kubernetes-and-ci">
            common YAML errors in Kubernetes and CI
          </Link>
          .
        </p>

        <h3>When to use which format</h3>
        <p>
          Use YAML where humans edit files by hand and comments matter: configuration,
          infrastructure manifests, CI pipelines. Use JSON where machines exchange data: APIs,
          logs, storage. Both formats express the same structures, so pick per audience — and use
          this tool at the boundary. For a fuller comparison, read{' '}
          <Link href="/blog/yaml-vs-json-differences-explained">
            YAML vs JSON: the differences explained
          </Link>
          .
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: YAML ↔ JSON Converter</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Working with JSON? Try the <Link href="/json-formatter">JSON Formatter</Link> or the{' '}
          <Link href="/json-schema-generator">JSON Schema Generator</Link>. To go deeper, read{' '}
          <Link href="/blog/yaml-vs-json-differences-explained">
            YAML vs JSON: Differences Explained
          </Link>
          ,{' '}
          <Link href="/blog/common-yaml-errors-in-kubernetes-and-ci">
            Common YAML Errors in Kubernetes and CI
          </Link>
          , and{' '}
          <Link href="/blog/json-parsing-errors-common-causes-and-fixes">
            JSON Parsing Errors: Common Causes and Fixes
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
