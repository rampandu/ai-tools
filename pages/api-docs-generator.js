// pages/api-docs-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const FAQ = [
  {
    q: 'Is this API Docs Generator free?',
    a: 'Yes — the API Docs Generator on Dev Brains AI is completely free to use with no signup required.',
  },
  {
    q: 'Is my API data sent to a server?',
    a: 'No. The documentation is assembled entirely in your browser using JavaScript. Nothing you type is uploaded or stored on our servers.',
  },
  {
    q: 'Does this replace OpenAPI/Swagger?',
    a: 'No — it is a fast way to draft clean, human-readable Markdown docs for an endpoint. For machine-readable specs that power interactive API explorers, use a proper OpenAPI generator; this tool is for documentation humans read, like a README or wiki page.',
  },
];

function parseLines(text) {
  return (text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const idx = l.indexOf(':');
      return idx > -1 ? { key: l.slice(0, idx).trim(), value: l.slice(idx + 1).trim() } : { key: l, value: '' };
    });
}

function buildApiDocs(f) {
  const lines = [];
  lines.push(`## \`${f.method || 'GET'} ${f.path || '/api/resource'}\``);
  if (f.description) lines.push('', f.description);

  const pathParams = parseLines(f.pathParams);
  if (pathParams.length) {
    lines.push('', '### Path Parameters', '', '| Name | Description |', '| --- | --- |');
    pathParams.forEach((p) => lines.push(`| \`${p.key}\` | ${p.value} |`));
  }

  const queryParams = parseLines(f.queryParams);
  if (queryParams.length) {
    lines.push('', '### Query Parameters', '', '| Name | Description |', '| --- | --- |');
    queryParams.forEach((p) => lines.push(`| \`${p.key}\` | ${p.value} |`));
  }

  if (f.requestBody) {
    lines.push('', '### Request Body', '', '```json', f.requestBody, '```');
  }

  lines.push('', '### Response', '', '```json', f.responseExample || '{}', '```');

  const statusCodes = parseLines(f.statusCodes);
  if (statusCodes.length) {
    lines.push('', '### Status Codes', '', '| Code | Meaning |', '| --- | --- |');
    statusCodes.forEach((s) => lines.push(`| \`${s.key}\` | ${s.value} |`));
  }

  return lines.join('\n');
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export default function ApiDocsGeneratorPage() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/api/resource');
  const [description, setDescription] = useState('');
  const [pathParams, setPathParams] = useState('');
  const [queryParams, setQueryParams] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [responseExample, setResponseExample] = useState('');
  const [statusCodes, setStatusCodes] = useState('200: Success\n404: Not found');
  const [copied, setCopied] = useState(false);

  const markdown = buildApiDocs({
    method, path, description, pathParams, queryParams, requestBody, responseExample, statusCodes,
  });

  function handleCopy() {
    if (markdown) {
      navigator.clipboard?.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleReset() {
    setMethod('GET');
    setPath('/api/resource');
    setDescription('');
    setPathParams('');
    setQueryParams('');
    setRequestBody('');
    setResponseExample('');
    setStatusCodes('200: Success\n404: Not found');
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
    name: 'Dev Brains AI API Docs Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: 'Free API documentation generator that runs in your browser. Fill in a form and get clean Markdown endpoint docs instantly.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'API Docs Generator', item: 'https://dev-brains-ai.com/api-docs-generator' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free API Documentation Generator | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate clean Markdown API endpoint documentation instantly. Fill in method, path, parameters, and examples — entirely in your browser. Free, no signup."
        />
        <meta
          name="keywords"
          content="api docs generator, api documentation generator, generate api docs, markdown api docs, endpoint documentation, Dev Brains AI"
        />
        <meta property="og:title" content="Free API Documentation Generator" />
        <meta
          property="og:description"
          content="Fill in a form and instantly generate clean Markdown API endpoint documentation — free API docs generator for developers."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/api-docs-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/api-docs-generator" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="card" aria-live="polite">
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">API Docs Generator</li>
          </ol>
        </nav>

        <h1>API Documentation Generator</h1>
        <p className="small">
          Fill in the details of one API endpoint and get clean Markdown documentation instantly.
          The preview updates live as you type — nothing is uploaded to a server.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
          {/* Form column */}
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <label htmlFor="ad-method"><strong>Method</strong></label>
            <select id="ad-method" value={method} onChange={(e) => setMethod(e.target.value)} style={{ marginBottom: 10 }}>
              {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            <label htmlFor="ad-path"><strong>Path</strong></label>
            <input
              id="ad-path"
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/api/users/:id"
              style={{ marginBottom: 10, fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
            />

            <label htmlFor="ad-description"><strong>Description</strong></label>
            <textarea
              id="ad-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this endpoint do?"
              style={{ minHeight: 70, marginBottom: 10 }}
            />

            <label htmlFor="ad-path-params"><strong>Path parameters</strong> <span className="small">(one per line, "name: description")</span></label>
            <textarea
              id="ad-path-params"
              value={pathParams}
              onChange={(e) => setPathParams(e.target.value)}
              placeholder={'id: The unique user ID'}
              style={{ minHeight: 60, marginBottom: 10 }}
            />

            <label htmlFor="ad-query-params"><strong>Query parameters</strong> <span className="small">(optional)</span></label>
            <textarea
              id="ad-query-params"
              value={queryParams}
              onChange={(e) => setQueryParams(e.target.value)}
              placeholder={'limit: Max number of results to return'}
              style={{ minHeight: 60, marginBottom: 10 }}
            />

            <label htmlFor="ad-request-body"><strong>Request body</strong> <span className="small">(optional, raw JSON)</span></label>
            <textarea
              id="ad-request-body"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder={'{\n  "name": "Priya"\n}'}
              style={{ minHeight: 80, marginBottom: 10, fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
            />

            <label htmlFor="ad-response"><strong>Response example</strong> <span className="small">(raw JSON)</span></label>
            <textarea
              id="ad-response"
              value={responseExample}
              onChange={(e) => setResponseExample(e.target.value)}
              placeholder={'{\n  "id": 1,\n  "name": "Priya"\n}'}
              style={{ minHeight: 80, marginBottom: 10, fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
            />

            <label htmlFor="ad-status-codes"><strong>Status codes</strong> <span className="small">(one per line, "code: meaning")</span></label>
            <textarea
              id="ad-status-codes"
              value={statusCodes}
              onChange={(e) => setStatusCodes(e.target.value)}
              style={{ minHeight: 60, marginBottom: 10 }}
            />

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="button" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Markdown'}</button>
              <button type="button" onClick={handleReset}>Reset</button>
            </div>
          </div>

          {/* Preview column */}
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <strong>Preview</strong>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{markdown}</pre>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>About this API Docs Generator</h2>
        <p>
          Documenting an endpoint is easy to postpone — until a teammate has to guess what a field
          means, or a support ticket comes in asking how to call something that was never written
          down. This API Docs Generator turns a short form into clean, structured Markdown you can
          drop straight into a README, wiki, or internal docs site.
        </p>

        <h3>Why documented endpoints matter</h3>
        <ul>
          <li>Faster onboarding for new team members and external integrators</li>
          <li>Fewer repeat questions in support channels or pull request reviews</li>
          <li>A clear starting point if you later formalize things with an OpenAPI/Swagger spec</li>
        </ul>

        <h3>What to include in endpoint docs</h3>
        <ul>
          <li><strong>Method and path</strong> — the exact HTTP verb and URL pattern, including path parameters</li>
          <li><strong>Parameters</strong> — path and query parameters with a short description of each</li>
          <li><strong>Request/response examples</strong> — realistic JSON so consumers know the exact shape to expect</li>
          <li><strong>Status codes</strong> — what each response code means for this specific endpoint</li>
        </ul>

        <h3>Tips for writing clear API descriptions</h3>
        <p>
          Describe what the endpoint does from the caller's perspective ("Returns the current user's
          profile") rather than how it's implemented internally. Keep parameter descriptions short
          and specific — "The unique user ID" is more useful than just "ID".
        </p>
      </div>

      <div className="card">
        <h3>FAQ: API Docs Generator</h3>
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
          Writing the whole project README too? Try the{' '}
          <Link href="/readme-generator">README Generator</Link>. Converting a curl example into
          working code? Use the <Link href="/curl-converter">cURL to Code Converter</Link>.
        </p>
      </div>
    </div>
  );
}
