// pages/curl-converter.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const DEFAULT_CURL = `curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d '{"name":"Priya","email":"priya@example.com"}'`;

const EXAMPLES = [
  { label: 'Simple GET with header', command: `curl https://api.example.com/status -H "Accept: application/json"` },
  { label: 'POST with JSON body', command: DEFAULT_CURL },
  { label: 'Basic auth', command: `curl -u admin:secret https://api.example.com/private` },
  { label: 'Multiple headers', command: `curl https://api.example.com/data -H "Authorization: Bearer TOKEN123" -H "Accept: application/json"` },
];

const TARGETS = [
  { value: 'fetch', label: 'JavaScript (fetch)' },
  { value: 'axios', label: 'JavaScript (axios)' },
  { value: 'python', label: 'Python (requests)' },
];

const FAQ = [
  {
    q: 'Is this cURL to Code Converter free?',
    a: 'Yes — the cURL to Code Converter on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Which curl flags are supported?',
    a: 'The method (-X/--request), headers (-H/--header), request body (-d/--data, --data-raw, --data-binary), basic auth (-u/--user), and the plain URL argument are all supported. Less common flags like --cookie-jar or multipart form flags are not yet supported.',
  },
  {
    q: 'Is my curl command sent to a server?',
    a: 'Yes — the command is sent to our API so the parsing logic can run, but it is not stored or logged beyond what is needed to return the result.',
  },
];

export default function CurlConverterPage() {
  const [command, setCommand] = useState(DEFAULT_CURL);
  const [target, setTarget] = useState('fetch');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function runConvert(cmd, tgt) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/curl-convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, target: tgt }),
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
    } catch (err) {
      console.error(err);
      setError(err?.error || err?.details || err?.message || 'Unknown error');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function handleConvert() {
    runConvert(command, target);
  }

  function handleTargetChange(newTarget) {
    setTarget(newTarget);
    if (result) runConvert(command, newTarget);
  }

  function copyCode() {
    if (!result?.code) return;
    navigator.clipboard?.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'cURL to Code Converter', item: 'https://dev-brains-ai.com/curl-converter' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free cURL to Code Converter — fetch, axios, Python | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste a curl command and instantly get equivalent JavaScript fetch, axios, or Python requests code. Free, no signup required."
        />
        <meta
          name="keywords"
          content="curl to code, curl converter, curl to fetch, curl to axios, curl to python requests, Dev Brains AI"
        />
        <meta property="og:title" content="Free cURL to Code Converter — fetch, axios, Python" />
        <meta
          property="og:description"
          content="Convert curl commands to fetch, axios, or Python requests code instantly — free curl converter for developers."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/curl-converter" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/curl-converter" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <div className="card" aria-live="polite">
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">cURL to Code Converter</li>
          </ol>
        </nav>

        <h1>Free cURL to Code Converter</h1>
        <p className="small">
          Paste a <code>curl</code> command below, pick a target, and click{' '}
          <strong>Convert</strong> to get equivalent <strong>JavaScript fetch</strong>,{' '}
          <strong>axios</strong>, or <strong>Python requests</strong> code.
        </p>

        <label htmlFor="curl-input"><strong>curl command</strong></label>
        <textarea
          id="curl-input"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          style={{ minHeight: 100, fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <label htmlFor="target-select" className="small" style={{ fontWeight: 600 }}>Target</label>
          <select id="target-select" value={target} onChange={(e) => handleTargetChange(e.target.value)} style={{ width: 'auto' }}>
            {TARGETS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleConvert} disabled={loading}>
            {loading ? 'Converting...' : 'Convert'}
          </button>
          <button type="button" onClick={() => { setCommand(''); setResult(null); setError(null); }}>Clear</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex.label} type="button" className="small" onClick={() => { setCommand(ex.command); setResult(null); setError(null); }}>
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

          {result && (
            <div style={{ marginTop: 4 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <button type="button" onClick={copyCode}>{copied ? 'Copied!' : 'Copy'}</button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{result.code}</pre>
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Convert</strong>.
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>About this cURL to Code Converter</h2>
        <p>
          API documentation, Postman, and browser DevTools all love exporting requests as{' '}
          <code>curl</code> commands — but curl syntax isn't the code you actually want to run in
          your application. This converter bridges that gap: paste a curl command copied from
          anywhere and get working JavaScript or Python code in seconds, instead of hand-translating
          flags into fetch options or a requests call.
        </p>

        <h3>Why convert curl commands to code</h3>
        <ul>
          <li>Turn a "copy as curl" export from Postman or browser DevTools into working application code</li>
          <li>Quickly prototype an API integration from documentation examples</li>
          <li>Avoid manually mapping <code>-H</code>, <code>-d</code>, and <code>-X</code> flags to the right SDK options</li>
        </ul>

        <h3>Supported curl flags</h3>
        <ul>
          <li><code>-X</code> / <code>--request</code> — HTTP method</li>
          <li><code>-H</code> / <code>--header</code> — request headers (multiple allowed)</li>
          <li><code>-d</code> / <code>--data</code> / <code>--data-raw</code> / <code>--data-binary</code> — request body</li>
          <li><code>-u</code> / <code>--user</code> — basic auth credentials</li>
          <li>A plain URL argument (with or without a preceding flag)</li>
        </ul>

        <h3>fetch vs axios vs requests — which to pick</h3>
        <p>
          Use <strong>fetch</strong> if you want zero dependencies and are targeting modern browsers
          or Node.js 18+. Use <strong>axios</strong> if your project already depends on it, or you
          want automatic JSON parsing and simpler error handling. Use <strong>Python requests</strong>{' '}
          for any Python script, backend service, or automation task.
        </p>
      </div>

      <div className="card">
        <h3>FAQ: cURL to Code Converter</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>{item.a}</div>
          </div>
        ))}
      </div>

      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Documenting the endpoint you just converted? Try the{' '}
          <Link href="/api-docs-generator">API Docs Generator</Link>. Need to inspect or format the
          JSON body? Use the <Link href="/json-formatter">JSON Formatter</Link>.
        </p>
      </div>
    </div>
  );
}
