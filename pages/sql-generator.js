// pages/sql-generator.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ResultBox from '../components/ResultBox';

const EXAMPLES = [
  'select name, salary from employees where salary > 50000',
  'get all users where age less than 30 and country is India',
  'list order id and total from orders where total between 100 and 200',
  'show all columns from customers'
];

const FAQ = [
  { q: 'Is this SQL generator free?', a: 'Yes — the basic SQL generator is free. It is deterministic and suited for common SELECT queries.' },
  { q: 'Can I run generated SQL directly?', a: 'Always review generated SQL before running it against production databases to avoid unsafe queries.' }
];

export default function SQLGenerator() {
  const [prompt, setPrompt] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => { try { setHistory(JSON.parse(localStorage.getItem('ai_sql_history') || '[]')); } catch {} }, []);

  function pushHistory(prompt, out) {
    try {
      const h = JSON.parse(localStorage.getItem('ai_sql_history') || '[]');
      const entry = { prompt, out, ts: Date.now() };
      const newH = [entry, ...h].slice(0, 20);
      localStorage.setItem('ai_sql_history', JSON.stringify(newH));
      setHistory(newH);
    } catch {}
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/sql', {
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
import Head from "next/head";

<Head>
  <title>AI SQL Query Generator — Free SQL Builder | Dev Brains AI</title>
  <meta
    name="description"
    content="Turn plain English into SQL queries using our free AI SQL Generator. Generate SELECT, JOIN, and filter queries instantly — no coding required."
  />
  <meta property="og:title" content="AI SQL Query Generator — Free SQL Builder" />
  <meta
    property="og:description"
    content="Quickly build SQL queries from text prompts. Free, fast, and powered by open AI models."
  />
  <meta property="og:url" content="https://dev-brains-ai.com/sql-generator" />
  <meta property="og:type" content="article" />
</Head>


      <div className="card" aria-live="polite">
        <h1>SQL Query Generator</h1>
        <p className="small">Describe the data you need and get a ready-to-run SQL query. Always review before running in production.</p>

        <label htmlFor="prompt"><strong>Prompt</strong></label>
        <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate SQL'}</button>
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
          {result && <ResultBox data={result} isSQL />}
          {!result && !error && <div className="small">No result yet — press <strong>Generate SQL</strong>.</div>}
        </div>
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
