// pages/base64-tool.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const FAQ = [
  {
    q: 'Is this Base64 tool free?',
    a: 'Yes — the Base64 encoder and decoder on Dev Brains AI is completely free to use with no signup required.',
  },
  {
    q: 'Does my data get uploaded to a server?',
    a: 'No. All encoding and decoding runs entirely in your browser using the built-in JavaScript atob/btoa functions. Your data never leaves your device.',
  },
  {
    q: 'What is Base64 used for?',
    a: 'Base64 is used to encode binary data (images, files) as text for safe transmission in emails, JSON payloads, data URIs, HTTP headers, and JWTs.',
  },
  {
    q: 'Can I encode images or files?',
    a: 'This tool encodes and decodes text strings. For file-to-Base64 conversion, use the file picker which reads the file and encodes its binary contents.',
  },
  {
    q: 'What is URL-safe Base64?',
    a: 'URL-safe Base64 replaces + with - and / with _ so the result can be used directly in URLs and filenames without percent-encoding.',
  },
];

function toBase64(text, urlSafe) {
  // encode raw bytes via TextEncoder so non-ASCII works correctly
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  let encoded = btoa(binary);
  if (urlSafe) encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return encoded;
}

function fromBase64(b64) {
  // normalise URL-safe chars back before decoding
  const normalised = b64.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalised);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64Tool() {
  const [input, setInput] = useState('Hello, Dev Brains AI!');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleEncode() {
    setError('');
    try {
      setOutput(toBase64(input, urlSafe));
    } catch (err) {
      setError(err?.message || 'Encoding failed');
      setOutput('');
    }
  }

  function handleDecode() {
    setError('');
    try {
      setOutput(fromBase64(input.trim()));
    } catch (err) {
      setError('Invalid Base64 input. Make sure the string is a valid Base64-encoded value.');
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
        name: 'Base64 Encoder / Decoder',
        item: 'https://dev-brains-ai.com/base64-tool',
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Base64 Encoder / Decoder — Free Online Tool | Dev Brains AI</title>
        <meta
          name="description"
          content="Encode and decode Base64 strings instantly with our free browser-based Base64 tool. Supports standard and URL-safe Base64, runs entirely in your browser."
        />
        <meta
          name="keywords"
          content="base64 encoder, base64 decoder, base64 online, base64 converter, url-safe base64, Dev Brains AI"
        />
        <meta property="og:title" content="Base64 Encoder / Decoder — Free Online Tool" />
        <meta
          property="og:description"
          content="Encode and decode Base64 strings in your browser. Supports URL-safe mode. No data uploaded."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/base64-tool" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/base64-tool" />

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
            <li aria-current="page">Base64 Encoder / Decoder</li>
          </ol>
        </nav>

        <h1>Base64 Encoder / Decoder</h1>
        <p className="small">
          Encode plain text to Base64 or decode Base64 back to text — entirely in your browser.
          Your data is never uploaded.
        </p>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
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
          <label
            className="small"
            style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
          >
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              disabled={mode === 'decode'}
            />
            URL-safe Base64
          </label>
        </div>

        {/* Two-column layout matching json-formatter.js */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 4 }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <label htmlFor="b64-input">
              <strong>{mode === 'encode' ? 'Plain text input' : 'Base64 input'}</strong>
            </label>
            <textarea
              id="b64-input"
              value={input}
              onChange={(e) => { setInput(e.target.value); setOutput(''); setError(''); }}
              style={{ minHeight: 180 }}
              placeholder={mode === 'encode' ? 'Type or paste text here…' : 'Paste Base64 string here…'}
            />
          </div>

          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{mode === 'encode' ? 'Base64 output' : 'Decoded text'}</strong>
              <button type="button" className="small" onClick={handleCopy} disabled={!output}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              style={{ minHeight: 180, marginTop: 4 }}
              placeholder="Result will appear here."
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleRun}>
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
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

        {error && (
          <div role="alert" className="small" style={{ marginTop: 10, color: 'crimson' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* SEO content card */}
      <div className="card">
        <h2>What is Base64?</h2>
        <p>
          Base64 is a binary-to-text encoding scheme that represents binary data as an ASCII string
          using 64 printable characters (A–Z, a–z, 0–9, +, /). It is widely used when binary data
          needs to be stored or transmitted over media designed to handle text.
        </p>

        <h3>Common use cases for Base64</h3>
        <ul>
          <li>Embedding images in HTML/CSS as <code>data:</code> URIs</li>
          <li>Encoding file attachments in email (MIME)</li>
          <li>Encoding the payload portion of a JWT token</li>
          <li>Passing binary data in JSON API fields</li>
          <li>Storing small assets in environment variables or config files</li>
          <li>HTTP Basic Authentication (<code>username:password</code> → Base64)</li>
        </ul>

        <h3>Standard vs URL-safe Base64</h3>
        <p>
          Standard Base64 uses <code>+</code> and <code>/</code>, which have special meanings in
          URLs. URL-safe Base64 replaces these with <code>-</code> and <code>_</code> respectively
          and omits the padding <code>=</code> characters. Use URL-safe mode when embedding Base64
          in URLs, filenames, or JWT tokens.
        </p>

        <h3>Tips &amp; best practices</h3>
        <ul>
          <li>Base64 encoding increases data size by ~33% — avoid for large files in APIs.</li>
          <li>Base64 is encoding, not encryption — never use it to "hide" sensitive data.</li>
          <li>For multi-byte text (e.g. Unicode, Emojis), use UTF-8 encoding before Base64.</li>
          <li>This tool correctly handles UTF-8 text so emojis and accented characters work.</li>
        </ul>
      </div>

      <div className="card">
        <h3>FAQ: Base64 Encoder / Decoder</h3>
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
          Try our <Link href="/url-encoder">URL Encoder / Decoder</Link> for percent-encoding, our{' '}
          <Link href="/json-formatter">JSON Formatter</Link> for pretty-printing JSON, or the{' '}
          <Link href="/regex-generator">AI Regex Generator</Link> to build regex patterns from plain
          English.
        </p>
      </div>
    </div>
  );
}
