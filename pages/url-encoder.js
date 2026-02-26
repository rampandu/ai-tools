// pages/url-encoder.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const FAQ = [
  {
    q: 'Is this URL encoder free?',
    a: 'Yes — the URL encoder and decoder on Dev Brains AI is completely free to use with no signup required.',
  },
  {
    q: 'Does my data get uploaded to a server?',
    a: 'No. All encoding and decoding runs entirely in your browser using native JavaScript. Your data never leaves your device.',
  },
  {
    q: 'What is the difference between encodeURI and encodeURIComponent?',
    a: 'encodeURI encodes a full URL, preserving characters like /, ?, &, = that have structural meaning. encodeURIComponent encodes a single query parameter value, encoding those structural characters too. Use Component mode for encoding individual parameter values.',
  },
  {
    q: 'When should I use URL encoding?',
    a: 'Use URL encoding whenever you include user input, special characters, or non-ASCII text in a URL — such as search queries, API parameters, redirect paths, or filenames in URLs.',
  },
];

const EXAMPLES_ENCODE = [
  'hello world & more',
  'price=₹1,500.00',
  'search?q=regex for email',
  'path/with spaces/and&special=chars',
];

const EXAMPLES_DECODE = [
  'hello%20world%20%26%20more',
  'price%3D%E2%82%B91%2C500.00',
  'search%3Fq%3Dregex%20for%20email',
];

export default function UrlEncoder() {
  const [input, setInput] = useState(EXAMPLES_ENCODE[0]);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
  const [encodeMode, setEncodeMode] = useState('component'); // 'component' | 'uri'
  const [copied, setCopied] = useState(false);

  function handleEncode() {
    setError('');
    try {
      const fn = encodeMode === 'component' ? encodeURIComponent : encodeURI;
      setOutput(fn(input));
    } catch (err) {
      setError(err?.message || 'Encoding failed');
      setOutput('');
    }
  }

  function handleDecode() {
    setError('');
    try {
      const fn = encodeMode === 'component' ? decodeURIComponent : decodeURI;
      setOutput(fn(input));
    } catch (err) {
      setError('Invalid percent-encoded input. Ensure % characters are followed by two hex digits.');
      setOutput('');
    }
  }

  function handleRun() {
    mode === 'encode' ? handleEncode() : handleDecode();
  }

  function handleCopy() {
    if (output) {
      navigator.clipboard?.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleSwap() {
    setInput(output);
    setOutput('');
    setError('');
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
  }

  const examples = mode === 'encode' ? EXAMPLES_ENCODE : EXAMPLES_DECODE;

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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'URL Encoder / Decoder',
        item: 'https://dev-brains-ai.com/url-encoder',
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>URL Encoder / Decoder — Free Online Tool | Dev Brains AI</title>
        <meta
          name="description"
          content="Encode and decode URL strings instantly with our free browser-based URL encoder. Supports encodeURIComponent and encodeURI modes. Runs entirely in your browser."
        />
        <meta
          name="keywords"
          content="url encoder, url decoder, percent encoding, urlencode online, encodeURIComponent, Dev Brains AI"
        />
        <meta property="og:title" content="URL Encoder / Decoder — Free Online Tool" />
        <meta
          property="og:description"
          content="Encode and decode percent-encoded URLs in your browser. Supports both encodeURI and encodeURIComponent. No data uploaded."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/url-encoder" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/url-encoder" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Ads Conversion Tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17753334820"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17753334820');
            `,
          }}
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
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">URL Encoder / Decoder</li>
          </ol>
        </nav>

        <h1>URL Encoder / Decoder</h1>
        <p className="small">
          Percent-encode or decode URL strings entirely in your browser. Supports both{' '}
          <code>encodeURIComponent</code> (for query params) and <code>encodeURI</code> (for full
          URLs).
        </p>

        {/* Mode + type toggles */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
            style={mode === 'encode' ? { fontWeight: 700 } : { opacity: 0.6 }}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
            style={mode === 'decode' ? { fontWeight: 700 } : { opacity: 0.6 }}
          >
            Decode
          </button>

          <div
            style={{
              marginLeft: 8,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <input
                type="radio"
                name="encodeMode"
                value="component"
                checked={encodeMode === 'component'}
                onChange={() => setEncodeMode('component')}
              />
              encodeURIComponent
            </label>
            <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <input
                type="radio"
                name="encodeMode"
                value="uri"
                checked={encodeMode === 'uri'}
                onChange={() => setEncodeMode('uri')}
              />
              encodeURI
            </label>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 4 }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <label htmlFor="url-input">
              <strong>{mode === 'encode' ? 'Plain text / URL input' : 'Encoded URL input'}</strong>
            </label>
            <textarea
              id="url-input"
              value={input}
              onChange={(e) => { setInput(e.target.value); setOutput(''); setError(''); }}
              style={{ minHeight: 160 }}
              placeholder={
                mode === 'encode'
                  ? 'Type or paste text to encode…'
                  : 'Paste percent-encoded string here…'
              }
            />
          </div>

          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{mode === 'encode' ? 'Encoded output' : 'Decoded output'}</strong>
              <button type="button" className="small" onClick={handleCopy} disabled={!output}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              style={{ minHeight: 160, marginTop: 4 }}
              placeholder="Result will appear here."
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleRun}>
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </button>
          <button type="button" onClick={handleSwap} disabled={!output}>
            ⇄ Swap &amp; {mode === 'encode' ? 'Decode' : 'Encode'}
          </button>
          <button
            type="button"
            onClick={() => { setInput(''); setOutput(''); setError(''); }}
          >
            Clear
          </button>
        </div>

        {/* Examples */}
        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => { setInput(ex); setOutput(''); setError(''); }}
                className="small"
              >
                {ex.length > 32 ? ex.slice(0, 32) + '…' : ex}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div role="alert" className="small" style={{ marginTop: 10, color: 'crimson' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* SEO content */}
      <div className="card">
        <h2>What is URL Encoding?</h2>
        <p>
          URL encoding (percent-encoding) converts characters that are not allowed or have special
          meaning in URLs into a <code>%XX</code> format where <code>XX</code> is the hexadecimal
          value of the byte. For example, a space becomes <code>%20</code>, and <code>&amp;</code>{' '}
          becomes <code>%26</code>.
        </p>

        <h3>encodeURIComponent vs encodeURI</h3>
        <ul>
          <li>
            <strong>encodeURIComponent</strong> — encodes everything except letters, digits, and{' '}
            <code>- _ . ! ~ * ' ( )</code>. Use this for individual query parameter values.
          </li>
          <li>
            <strong>encodeURI</strong> — preserves URL-structural characters like{' '}
            <code>:// / ? # [ ] @ ! $ &amp; ' ( ) * + , ; =</code>. Use this when encoding a full
            URL.
          </li>
        </ul>

        <h3>Common use cases</h3>
        <ul>
          <li>Encoding search query parameters: <code>q=regex+for+email</code></li>
          <li>Building API request URLs with user-supplied values</li>
          <li>Decoding parameters from incoming HTTP request logs</li>
          <li>Preparing redirect URLs with encoded return paths</li>
          <li>Encoding non-ASCII filenames for use in URLs</li>
        </ul>

        <h3>Quick reference</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 8,
            marginTop: 8,
          }}
        >
          {[
            [' ', '%20'],
            ['!', '%21'],
            ['#', '%23'],
            ['$', '%24'],
            ['&', '%26'],
            ['+', '%2B'],
            ['/', '%2F'],
            [':', '%3A'],
            ['=', '%3D'],
            ['?', '%3F'],
            ['@', '%40'],
          ].map(([char, encoded]) => (
            <div
              key={char}
              style={{
                background: '#f8fafc',
                borderRadius: 6,
                padding: '6px 10px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              }}
            >
              <code>{char}</code> → <code>{encoded}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>FAQ: URL Encoder / Decoder</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>{item.a}</div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Try our <Link href="/base64-tool">Base64 Encoder / Decoder</Link> for binary-to-text
          encoding, our <Link href="/json-formatter">JSON Formatter</Link> for pretty-printing
          JSON, or the <Link href="/regex-generator">AI Regex Generator</Link> to build regex
          patterns from plain English.
        </p>
      </div>
    </div>
  );
}
