// pages/cron-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const EXAMPLES = [
  'every day at 9am',
  'every weekday at 6:30pm',
  'every Monday at midnight',
  'every 15 minutes',
  'first day of the month at 8am',
];

const FAQ = [
  {
    q: 'Is this cron generator free?',
    a: 'Yes — the cron expression generator on Dev Brains AI is completely free to use with no signup required.',
  },
  {
    q: 'What format is the output in?',
    a: 'The output is a standard 5-field cron expression: minute hour day-of-month month day-of-week. This format is compatible with Unix cron, GitHub Actions, AWS EventBridge, and most schedulers.',
  },
  {
    q: 'Can I use the result directly in GitHub Actions or AWS?',
    a: 'Yes. The 5-field format works in GitHub Actions (schedule), AWS EventBridge, GCP Cloud Scheduler, and standard Linux/macOS crontabs.',
  },
  {
    q: 'What if my expression is not generated correctly?',
    a: 'Try a more specific prompt, e.g. "every Monday and Wednesday at 9:30am". If unsure, use the explanation field to verify the meaning before applying it.',
  },
];

const FIELD_LABELS = ['Minute', 'Hour', 'Day (month)', 'Month', 'Day (week)'];

function parseCronFields(cron) {
  if (!cron) return null;
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  return parts;
}

export default function CronGenerator() {
  const [prompt, setPrompt] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem('ai_cron_history') || '[]'));
    } catch {}
  }, []);

  function pushHistory(prompt, out) {
    try {
      const h = JSON.parse(localStorage.getItem('ai_cron_history') || '[]');
      const entry = { prompt, out, ts: Date.now() };
      const newH = [entry, ...h].slice(0, 20);
      localStorage.setItem('ai_cron_history', JSON.stringify(newH));
      setHistory(newH);
    } catch {}
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
      if (j.cron) pushHistory(prompt, j);
    } catch (err) {
      console.error(err);
      setError(err?.error || err?.details || (err?.message ?? 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (result?.cron) {
      navigator.clipboard?.writeText(result.cron);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const fields = parseCronFields(result?.cron);

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
        name: 'Cron Expression Generator',
        item: 'https://dev-brains-ai.com/cron-generator',
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Cron Expression Generator — Free Online Cron Builder | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate cron expressions instantly with our free AI Cron Generator. Describe your schedule in plain English and get accurate cron expressions with explanations."
        />
        <meta
          name="keywords"
          content="cron generator, cron expression generator, cron builder, online cron, cron syntax, Dev Brains AI"
        />
        <meta property="og:title" content="Cron Expression Generator — Free Online Cron Builder" />
        <meta
          property="og:description"
          content="Convert plain English schedules into cron expressions. Supports GitHub Actions, AWS EventBridge, and standard crontab."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/cron-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/cron-generator" />

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
            <li aria-current="page">Cron Generator</li>
          </ol>
        </nav>

        <h1>Cron Expression Generator</h1>
        <p className="small">
          Describe your schedule in plain English (e.g.{' '}
          <code>every weekday at 9am</code>) and get a ready-to-use cron expression with an
          explanation.
        </p>

        <label htmlFor="prompt">
          <strong>Schedule description</strong>
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. every Monday at 8:30am"
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Cron'}
          </button>
          <button onClick={() => { setPrompt(''); setResult(null); setError(null); }}>Clear</button>
          <button onClick={() => navigator.clipboard?.writeText(prompt)}>Copy Prompt</button>
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

          {result && (
            <div>
              {result.cron ? (
                <>
                  {/* Cron string output */}
                  <div
                    style={{
                      background: '#0f172a',
                      borderRadius: 8,
                      padding: '14px 18px',
                      marginBottom: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    <code
                      style={{
                        fontSize: '1.25rem',
                        color: '#34d399',
                        letterSpacing: '0.05em',
                        fontFamily: 'monospace',
                      }}
                    >
                      {result.cron}
                    </code>
                    <button
                      className="small"
                      onClick={handleCopy}
                      style={{ flexShrink: 0 }}
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>

                  {/* Field breakdown */}
                  {fields && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 8,
                        marginBottom: 12,
                        flexWrap: 'wrap',
                      }}
                    >
                      {fields.map((f, i) => (
                        <div
                          key={i}
                          style={{
                            background: '#f3f4f6',
                            borderRadius: 6,
                            padding: '6px 10px',
                            textAlign: 'center',
                            minWidth: 60,
                          }}
                        >
                          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'monospace' }}>
                            {f}
                          </div>
                          <div className="small" style={{ color: '#6b7280', marginTop: 2 }}>
                            {FIELD_LABELS[i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="small" style={{ color: '#374151' }}>
                    <strong>Meaning:</strong> {result.explanation}
                  </div>
                </>
              ) : (
                <div className="small" style={{ color: '#6b7280' }}>
                  {result.explanation}
                </div>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Generate Cron</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO content */}
      <div className="card">
        <h2>About this Cron Expression Generator</h2>
        <p>
          Cron is a time-based scheduler used in Unix-like systems, GitHub Actions, AWS EventBridge,
          GCP Cloud Scheduler, and many other platforms. Writing cron syntax from scratch is
          error-prone — a small typo like <code>0 9 * * 1-5</code> vs <code>0 9 * * 1-5</code> can
          mean the difference between "every weekday at 9am" and something completely different.
        </p>
        <p>
          This free Cron Generator lets you describe your schedule in plain English and instantly
          converts it to the correct 5-field cron expression, complete with a human-readable
          explanation so you can verify it before use.
        </p>

        <h3>Understanding cron field order</h3>
        <p>
          A standard cron expression has five fields separated by spaces:
        </p>
        <div
          style={{
            background: '#f8fafc',
            borderRadius: 8,
            padding: '12px 16px',
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            marginBottom: 12,
          }}
        >
          ┌─ minute (0–59)<br />
          │ ┌─ hour (0–23)<br />
          │ │ ┌─ day of month (1–31)<br />
          │ │ │ ┌─ month (1–12)<br />
          │ │ │ │ ┌─ day of week (0–6, 0=Sunday)<br />
          │ │ │ │ │<br />
          * * * * *
        </div>

        <h3>Common cron expression examples</h3>
        <ul>
          <li><code>* * * * *</code> — every minute</li>
          <li><code>0 * * * *</code> — every hour on the hour</li>
          <li><code>0 9 * * 1-5</code> — weekdays at 9:00 AM</li>
          <li><code>0 0 1 * *</code> — first day of every month at midnight</li>
          <li><code>*/15 * * * *</code> — every 15 minutes</li>
          <li><code>30 18 * * 5</code> — every Friday at 6:30 PM</li>
        </ul>

        <h3>Platform compatibility</h3>
        <ul>
          <li>✅ Linux / macOS <code>crontab</code></li>
          <li>✅ GitHub Actions (<code>schedule</code> trigger)</li>
          <li>✅ AWS EventBridge Scheduler</li>
          <li>✅ GCP Cloud Scheduler</li>
          <li>✅ Node.js <code>node-cron</code> and <code>cron</code> packages</li>
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

      {/* Recent history */}
      <div className="card small">
        <h4>Recent expressions</h4>
        {history.length === 0 && (
          <div className="small">No history yet — your recent prompts will appear here.</div>
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
              {h.out?.cron && (
                <code style={{ marginLeft: 8, color: '#059669' }}>{h.out.cron}</code>
              )}
              <div className="small" style={{ color: '#666' }}>
                {new Date(h.ts).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Try our <Link href="/regex-generator">AI Regex Generator</Link> to build regex patterns
          from plain English, or <Link href="/sql-generator">AI SQL Generator</Link> to convert
          natural language into SQL queries.
        </p>
      </div>
    </div>
  );
}
