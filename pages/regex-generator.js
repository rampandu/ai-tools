// pages/regex-generator.js
import Head from 'next/head';
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

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Regex Generator — AI Dev Tools</title>
        <meta name="description" content="Convert plain English to regular expressions. Test and copy regex patterns instantly." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <div className="card" aria-live="polite">
        <h1>Regex Generator</h1>
        <p className="small">Type a short request (e.g., <code>regex for Indian mobile number</code>) and get a ready-to-use regular expression.</p>

        <label htmlFor="prompt"><strong>Prompt</strong></label>
        <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate Regex'}</button>
          <button onClick={() => { setPrompt(''); setResult(null); setError(null); }}>Clear</button>
          <button onClick={() => { navigator.clipboard?.writeText(prompt); }}>Copy Prompt</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (<button key={ex} onClick={() => setPrompt(ex)} className="small">{ex}</button>))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          {error && <div role="alert" style={{ color: 'crimson' }}><strong>Error:</strong> {String(error)}</div>}
          {result && <ResultBox data={result} />}
          {!result && !error && <div className="small">No result yet — press <strong>Generate Regex</strong>.</div>}
        </div>

        {/* Regex Tester — interactive */}
        <RegexTester pattern={result?.regex ?? result?.out ?? null} />
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
        {history.length === 0 && <div className="small">No history yet — your recent prompts will appear here.</div>}
        <ul>
          {history.map((h, idx) => (
            <li key={h.ts + idx} style={{ marginBottom: 8 }}>
              <button className="small" onClick={() => { setPrompt(h.prompt); setResult(h.out); }}>{'Reuse'}</button>
              <code style={{ marginLeft: 8 }}>{h.prompt}</code>
              <div className="small" style={{ color: '#666' }}>{new Date(h.ts).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
