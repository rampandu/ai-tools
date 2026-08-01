// pages/cron-explainer.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const EXAMPLES = [
  { label: 'Every 5 minutes', expr: '*/5 * * * *' },
  { label: 'Weekdays at 9 AM', expr: '0 9 * * 1-5' },
  { label: 'Every 15 min, business hours', expr: '*/15 9-17 * * 1-5' },
  { label: 'Midnight on the 1st of the month', expr: '0 0 1 * *' },
  { label: 'Every Sunday at 2:30 PM', expr: '30 14 * * 0' },
];

const TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New_York (ET)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PT)' },
  { value: 'Europe/London', label: 'Europe/London' },
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney' },
];

const FAQ = [
  {
    q: 'Is this cron expression explainer free?',
    a: 'Yes — completely free, with no signup required and no limit on how many expressions you can check.',
  },
  {
    q: 'Does this support 6-field cron expressions with seconds?',
    a: 'Yes. Both standard 5-field cron (minute hour day-of-month month day-of-week) and 6-field cron with a leading seconds field (used by Quartz, Spring, and node-cron) are supported.',
  },
  {
    q: 'Why do the next run times change when I switch the timezone?',
    a: "A cron expression has no timezone of its own — it runs in whatever timezone the machine or scheduler that executes it is configured with. \"0 9 * * *\" means 9 AM server time, which could be 9 AM UTC on one server and 9 AM IST on another, producing completely different actual moments. Switching the timezone dropdown shows you what the same expression means as a real-world time in that zone.",
  },
  {
    q: 'Is this different from the Cron Generator?',
    a: 'Yes — they run in opposite directions. The Cron Generator turns a plain-English description into a cron expression; this tool takes a cron expression you already have and explains what it means in plain English, plus shows you exactly when it will next run.',
  },
];

export default function CronExplainer() {
  const [expression, setExpression] = useState(EXAMPLES[0].expr);
  const [tz, setTz] = useState('UTC');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleExplain() {
    setLoading(true);
    try {
      const res = await fetch('/api/cron-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression, tz }),
      });
      const j = await res.json();
      if (!res.ok) {
        setResult({ valid: false, error: j.error || 'Could not explain this expression.' });
      } else {
        setResult(j);
      }
    } catch (err) {
      setResult({ valid: false, error: 'Network error — please try again.' });
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setExpression('');
    setResult(null);
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
    name: 'Dev Brains AI Cron Expression Explainer',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free cron expression explainer. Paste any cron expression to get a plain-English description and its next 10 run times in any timezone, with nothing stored.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Cron Expression Explainer', item: 'https://dev-brains-ai.com/cron-explainer' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Cron Expression Explainer — What Does This Cron Mean? | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste any cron expression and get a plain-English description plus its next 10 run times in any timezone. Free, no signup, nothing stored."
        />
        <meta
          name="keywords"
          content="cron expression explainer, cron describer, what does this cron mean, cron expression to english, cron next run time, cron expression parser, crontab explained"
        />
        <meta property="og:title" content="Free Cron Expression Explainer — What Does This Cron Mean?" />
        <meta
          property="og:description"
          content="Paste any cron expression and get a plain-English description plus its next 10 run times in any timezone. Free, nothing stored."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/cron-explainer" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/cron-explainer" />
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
            <li aria-current="page">Cron Expression Explainer</li>
          </ol>
        </nav>

        <h1>Free Cron Expression Explainer</h1>
        <p className="small">
          Paste a cron expression below to see exactly what it means in plain English, plus its
          next 10 scheduled run times. Not sure what timezone your cron job actually runs in? Use
          the timezone selector below to check.
        </p>

        <label htmlFor="cron-input"><strong>Cron expression</strong></label>
        <input
          id="cron-input"
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          style={{ width: '100%', fontFamily: 'ui-monospace, Menlo, Monaco, monospace', fontSize: '1rem', padding: '8px 10px' }}
          placeholder="*/5 * * * *"
        />

        <div style={{ marginTop: 10 }}>
          <label htmlFor="cron-tz"><strong>Timezone</strong></label>
          <select
            id="cron-tz"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            style={{ display: 'block', marginTop: 4, padding: '6px 8px' }}
          >
            {TIMEZONES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleExplain} disabled={loading}>
            {loading ? 'Explaining...' : 'Explain'}
          </button>
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
                onClick={() => { setExpression(ex.expr); setResult(null); }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          {result && !result.valid && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {result.error}
            </div>
          )}

          {result && result.valid && (
            <div style={{ marginTop: 4 }}>
              <div style={{ padding: 14, background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: 8, marginBottom: 14 }}>
                <strong style={{ color: '#0d9488' }}>{result.description || expression}</strong>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>
                Next 10 run times ({result.timezone})
              </h3>
              <div style={{ fontFamily: 'ui-monospace, Menlo, Monaco, monospace', fontSize: '0.85rem', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                {result.nextRuns.map((iso, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '6px 10px',
                      background: i % 2 === 0 ? '#f8fafc' : 'white',
                      borderBottom: i < result.nextRuns.length - 1 ? '1px solid #e2e8f0' : 'none',
                    }}
                  >
                    {new Date(iso).toLocaleString('en-US', { timeZone: result.timezone, dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && (
            <div className="small">
              No result yet — press <strong>Explain</strong>.
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>About the Cron Expression Explainer</h2>
        <p>
          Cron syntax is dense on purpose — five terse fields pack in a full recurrence rule — which
          means reading someone else's cron expression (or one you wrote six months ago) usually
          means mentally decoding each field one at a time. This tool does that decoding for you:
          paste an expression and it returns a plain-English sentence describing exactly when it
          runs, plus the next 10 actual run times so you can sanity-check it before deploying.
        </p>
        <p>
          Need to go the other direction — describe a schedule in plain English and get the cron
          syntax? Use the <Link href="/cron-generator">Cron Generator</Link>. For a deeper reference
          on cron field syntax itself, see the{' '}
          <Link href="/blog/cron-expression-complete-guide">complete cron expression guide</Link>.
        </p>

        <h3>Why the Timezone Matters</h3>
        <p>
          A cron expression has no timezone baked into it. <code>0 9 * * *</code> means "9 AM in
          whatever timezone the machine running it is set to" — on a UTC server that's 9:00 UTC,
          which is 2:30 PM in India or 4 AM Pacific time. This is one of the most common sources of
          "why did my cron job run at the wrong time" bugs. Use the timezone selector above to see
          what a given expression actually means in a specific zone, and read{' '}
          <Link href="/blog/cron-expression-timezone-handling-guide">
            the cron timezone handling guide
          </Link>{' '}
          for how to configure this correctly in Linux crontab, Docker, and cloud schedulers.
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

      <div className="card">
        <h3>Cron guides and tutorials</h3>
        <ul className="small">
          <li><Link href="/blog/cron-expression-explainer-guide-how-it-works">Cron Expression Explainer Guide: How to Read the Output</Link></li>
          <li><Link href="/blog/cron-expression-complete-guide">Cron Expression Complete Guide: Every Field Explained</Link></li>
          <li><Link href="/blog/cron-expression-timezone-handling-guide">Cron Expression Timezone Handling Guide</Link></li>
          <li><Link href="/blog/cron-expression-examples-every-5-minutes">Cron Expression Examples: Every 5 Minutes and More</Link></li>
          <li><Link href="/blog/debugging-cron-jobs-that-are-not-running">Cron Job Not Running? 5 Fixes That Actually Work</Link></li>
          <li><Link href="/blog/top-10-cron-schedule-patterns-developers">Top 10 Cron Schedule Patterns Developers Actually Use</Link></li>
          <li><Link href="/cron-generator">AI Cron Generator</Link></li>
        </ul>
      </div>
    </div>
  );
}
