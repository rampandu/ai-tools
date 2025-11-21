// pages/regex-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResultBox from '../components/ResultBox';
import RegexTester from '../components/RegexTester';

const EXAMPLES = [
  'regex for valid Indian mobile number',
  'regex to match email address',
  'regex for date in DD-MM-YYYY',
  'regex to validate IPv4 address',
  'exactly 4 digits'
];

const FAQ = [
  { q: 'Is this regex generator free?', a: 'Yes — the basic regex generator is free and deterministic (rule-based).' },
  { q: 'Is the output always accurate?', a: 'The generator handles common patterns reliably. Always test and review the regex for edge cases before production use.' },
  { q: 'Can I use the regex in my app?', a: 'Yes — use the Copy or Use in my app buttons to paste snippets into your code.' }
];

export default function RegexGenerator() {
  const [prompt, setPrompt] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem('ai_regex_history') || '[]')); } catch {}
  }, []);

  function pushHistory(prompt, out) {
    try {
      const h = JSON.parse(localStorage.getItem('ai_regex_history') || '[]');
      const entry = { prompt, out, ts: Date.now() };
      const newH = [entry, ...h].slice(0, 20);
      localStorage.setItem('ai_regex_history', JSON.stringify(newH));
      setHistory(newH);
    } catch {}
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/regex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
      pushHistory(prompt, j);
    } catch (err) {
      console.error(err);
      setError(err?.error || err?.details || (err?.message ?? 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  // JSON-LD structured data for FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dev-brains-ai.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Regex Generator",
        "item": "https://dev-brains-ai.com/regex-generator"
      }
    ]
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>AI Regex Generator — Free Online Regex Builder | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate regular expressions instantly with our free AI Regex Generator. Describe your pattern in plain English and get accurate regex results with explanations."
        />
        <meta property="og:title" content="AI Regex Generator — Free Online Regex Builder" />
        <meta
          property="og:description"
          content="Easily build regex patterns using AI. Perfect for developers and testers — no manual regex writing needed."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/regex-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/regex-generator" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
              margin: 0
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Regex Generator</li>
          </ol>
        </nav>

        <h1>Regex Generator</h1>
        <p className="small">
          Type a short request (e.g., <code>regex for Indian mobile number</code>) and get a
          ready-to-use regular expression.
        </p>

        <label htmlFor="prompt"><strong>Prompt</strong></label>
        <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Regex'}
          </button>
          <button onClick={() => { setPrompt(''); setResult(null); setError(null); }}>Clear</button>
          <button onClick={() => { navigator.clipboard?.writeText(prompt); }}>Copy Prompt</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => setPrompt(ex)} className="small">
                {ex}
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
          {result && <ResultBox data={result} />}
          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Generate Regex</strong>.
            </div>
          )}
        </div>

        {/* Regex Tester — interactive */}
        <RegexTester pattern={result?.regex ?? result?.out ?? null} />
      </div>

      {/* SEO Content for AdSense & Google */}
      <div className="card">
        <h2>About this AI Regex Generator</h2>
        <p>
          Regular expressions (regex) are a compact and powerful way to match text patterns, but
          they can be confusing and difficult to write correctly. This AI Regex Generator is built
          to help you create accurate, production-ready patterns without memorising complex syntax.
        </p>

        <p>
          Simply describe your requirement in plain English — for example,
          <i> "match valid email addresses"</i> or <i>"extract phone numbers from text"</i> — and this tool
          will instantly generate a clean and usable regex along with an explanation.
        </p>

        <h3>Why use an AI-powered regex generator?</h3>
        <ul>
          <li>✅ Saves time by eliminating trial and error</li>
          <li>✅ Reduces regex mistakes and syntax errors</li>
          <li>✅ Provides readable explanations for learning</li>
          <li>✅ Works for beginners and professionals alike</li>
        </ul>

        <h3>Common use cases</h3>
        <ul>
          <li>Email and phone number validation</li>
          <li>Extracting data from logs or files</li>
          <li>Verifying password formats</li>
          <li>Matching dates, URLs and file names</li>
          <li>Cleaning and filtering large text blocks</li>
        </ul>

        <h3>How to write a good prompt</h3>
        <p>
          To get the best results, be specific in your prompt. Mention what you want to match, any
          special conditions, and whether it should match the full string or part of it.
        </p>

        <ul>
          <li><code>regex for Indian mobile number starting with 9, 8 or 7</code></li>
          <li><code>match YYYY-MM-DD date format</code></li>
          <li><code>email validation excluding gmail.com</code></li>
        </ul>

        <h3>Tips &amp; best practices</h3>
        <ul>
          <li>Use <code>^</code> and <code>$</code> for full string matches</li>
          <li>Prefer specific classes like <code>\d</code> instead of <code>.</code></li>
          <li>Avoid overly greedy patterns like <code>.*</code></li>
          <li>Always test your regex before production use</li>
        </ul>

        <p>
          If you're new to regular expressions, this tool is a great way to learn by doing.
          Experiment with different prompts and observe how patterns change.
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
        <h4>Recent prompts</h4>
        {history.length === 0 && (
          <div className="small">
            No history yet — your recent prompts will appear here.
          </div>
        )}
        <ul>
          {history.map((h, idx) => (
            <li key={h.ts + idx} style={{ marginBottom: 8 }}>
              <button
                className="small"
                onClick={() => { setPrompt(h.prompt); setResult(h.out); }}
              >
                Reuse
              </button>
              <code style={{ marginLeft: 8 }}>{h.prompt}</code>
              <div className="small" style={{ color: '#666' }}>
                {new Date(h.ts).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
