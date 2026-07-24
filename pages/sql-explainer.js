// pages/sql-explainer.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const EXAMPLES = [
  "SELECT name, email FROM users WHERE status = 'active' ORDER BY created_at DESC LIMIT 10",
  "SELECT o.id, c.name FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE o.total > 100",
  "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5",
  "SELECT product_name, price FROM products ORDER BY price DESC LIMIT 20",
  "SELECT * FROM orders WHERE status = 'pending' AND total > 500"
];

const FAQ = [
  {
    q: 'Is this SQL query explainer free?',
    a: 'Yes — it is completely free to use, with no signup required and no limit on how many queries you can explain.'
  },
  {
    q: 'What kinds of queries does it support?',
    a: 'It works best for single SELECT statements — including WHERE, JOIN, GROUP BY, HAVING, ORDER BY, and LIMIT clauses. Deeply nested subqueries, multiple statements, or vendor-specific extensions may not be broken down perfectly.'
  },
  {
    q: 'Is my SQL query sent to a server?',
    a: 'Yes, briefly — your query is sent to our API for parsing and is not stored or logged beyond what is needed to generate the explanation.'
  }
];

export default function SqlExplainer() {
  const [query, setQuery] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleExplain() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/sql-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
    } catch (err) {
      console.error(err);
      setError(err?.error || err?.details || (err?.message ?? 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  async function copyExplanation() {
    if (!result) return;
    const lines = (result.explanations || []).map((e) => `${e.clause}: ${e.explain}`).join('\n');
    const text = `Query: ${result.original}\n\nSummary: ${result.summary}\n\n${lines}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
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
        "name": "SQL Query Explainer",
        "item": "https://dev-brains-ai.com/sql-explainer"
      }
    ]
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free SQL Query Explainer — Understand Any SQL Query | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste any SQL query and get a plain-English, clause-by-clause explanation instantly. Free online SQL query explainer for SELECT, JOIN, GROUP BY, and more."
        />
        <meta
          name="keywords"
          content="sql explainer, explain sql query, sql breakdown, what does this query do, sql analyzer, sql query decoder, understand sql query"
        />
        <meta property="og:title" content="Free SQL Query Explainer — Understand Any SQL Query" />
        <meta
          property="og:description"
          content="Paste a SQL query and get a clear, clause-by-clause plain-English explanation instantly. Free, no signup."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/sql-explainer" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/sql-explainer" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            <li aria-current="page">SQL Query Explainer</li>
          </ol>
        </nav>

        <h1>Free SQL Query Explainer — Understand Any SQL Query</h1>
        <p className="small">
          Paste any SQL query and get an instant, plain-English, clause-by-clause explanation of
          exactly what it does. Perfect for understanding queries you found in old code, inherited
          from a teammate, or need to review before running against production. No signup, no cost,
          no limit.
        </p>

        <label htmlFor="query"><strong>SQL Query</strong></label>
        <textarea id="query" value={query} onChange={(e) => setQuery(e.target.value)} rows={4} />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleExplain} disabled={loading}>
            {loading ? 'Explaining...' : 'Explain Query'}
          </button>
          <button onClick={() => { setQuery(''); setResult(null); setError(null); }}>Clear</button>
          <button onClick={() => { navigator.clipboard?.writeText(query); }}>Copy Query</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => setQuery(ex)} className="small">
                {ex.length > 34 ? ex.slice(0, 34) + '…' : ex}
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
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                <button onClick={copyExplanation}>{copied ? 'Copied!' : 'Copy explanation as text'}</button>
                <div className="small" style={{ color: '#666' }}>Source: rule-engine</div>
              </div>

              {result.summary && (
                <div style={{ marginBottom: 14, padding: 12, background: '#f0fdf9', borderRadius: 8 }}>
                  <strong>Summary</strong>
                  <p style={{ margin: '6px 0 0' }}>{result.summary}</p>
                </div>
              )}

              {(result.explanations || []).map((e, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e6eef2',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 8
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      background: '#0ea5a6',
                      color: 'white',
                      borderRadius: 6,
                      padding: '2px 8px',
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 6
                    }}
                  >
                    {e.clause}
                  </span>
                  <div className="small" style={{ color: '#666', marginBottom: 4 }}>
                    <code>{e.text}</code>
                  </div>
                  <div>{e.explain}</div>
                </div>
              ))}

              {(!result.explanations || result.explanations.length === 0) && (
                <div className="small">No recognizable SQL clauses were found in this query.</div>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Explain Query</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content for AdSense & Google */}
      <div className="card">
        <h2>About this SQL Query Explainer</h2>
        <p>
          SQL queries can grow long and hard to parse at a glance, especially once joins, grouping,
          and filtering conditions start stacking up. This SQL Query Explainer takes any query you
          paste in and breaks it apart clause by clause — <code>SELECT</code>, <code>FROM</code>,
          <code> JOIN</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>,
          <code> ORDER BY</code>, and <code>LIMIT</code> — explaining what each part does in plain
          English, plus a short overall summary.
        </p>

        <p>
          This is especially useful when reviewing a pull request, debugging a slow report, or
          picking up a query someone else wrote months ago. Instead of mentally simulating the SQL
          engine, you get an immediate plain-language description of what the query retrieves,
          filters, groups, and returns.
        </p>

        <h3>Why explain a SQL query instead of just running it</h3>
        <p>
          Running a query against a database tells you what rows come back, but it does not tell you
          why, or whether the logic actually matches the intent behind it. A query might run
          successfully and still be wrong — for example, filtering on the wrong column, joining on a
          mismatched key, or forgetting a condition in the <code>WHERE</code> clause. Reading the
          query clause by clause, in plain English, is a fast way to sanity-check the logic before it
          touches production data.
        </p>

        <h3>How the clause breakdown works</h3>
        <p>
          The explainer scans your query for standard SQL keywords in the order they typically
          appear — <code>SELECT</code>, <code>FROM</code>, join variants, <code>WHERE</code>,
          <code> GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>, and <code>LIMIT</code>
          — and splits the query into segments at each keyword boundary. Each segment is then
          translated into a plain-English sentence: <code>SELECT</code> becomes a list of columns
          being retrieved, <code>WHERE</code> becomes the filtering conditions, <code>JOIN</code>
          becomes which tables are being combined and how, and so on. The tool also produces a
          combined summary paragraph stitching all the clause explanations together.
        </p>

        <h3>Common SQL clauses reference table</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #e6eef2' }}>
              <th style={{ padding: '6px 8px' }}>Clause</th>
              <th style={{ padding: '6px 8px' }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '6px 8px' }}><code>SELECT</code></td><td style={{ padding: '6px 8px' }}>Chooses which columns or expressions to return</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>FROM</code></td><td style={{ padding: '6px 8px' }}>Specifies the source table (and optional alias)</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>JOIN</code></td><td style={{ padding: '6px 8px' }}>Combines rows from another table based on a matching condition</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>WHERE</code></td><td style={{ padding: '6px 8px' }}>Filters rows before any grouping happens</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>GROUP BY</code></td><td style={{ padding: '6px 8px' }}>Groups rows that share the same values in given columns</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>HAVING</code></td><td style={{ padding: '6px 8px' }}>Filters groups after aggregation (unlike WHERE, which filters rows)</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>ORDER BY</code></td><td style={{ padding: '6px 8px' }}>Sorts the final result set, ascending or descending</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>LIMIT</code></td><td style={{ padding: '6px 8px' }}>Restricts how many rows are returned</td></tr>
          </tbody>
        </table>

        <h3>Tips for reading complex queries</h3>
        <ul>
          <li>Read clauses in logical execution order: <code>FROM</code> and <code>JOIN</code> first, then <code>WHERE</code>, then <code>GROUP BY</code>, then <code>HAVING</code>, then <code>SELECT</code>, then <code>ORDER BY</code>, then <code>LIMIT</code></li>
          <li>Remember <code>WHERE</code> filters individual rows, while <code>HAVING</code> filters aggregated groups</li>
          <li>For joins, identify the two tables and the matching key in the <code>ON</code> condition before worrying about anything else</li>
          <li>Break long <code>WHERE</code> conditions apart at each <code>AND</code>/<code>OR</code> to understand them one piece at a time</li>
          <li>When a query looks too complex to read at once, run it in stages against a small sample table to confirm your understanding</li>
        </ul>

        <p>
          If you need to write a new query from a plain-English description rather than decode an
          existing one, try the{' '}
          <Link href="/sql-generator">SQL Generator</Link> instead.
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
        <h4>Related tools and guides</h4>
        <ul className="small">
          <li><Link href="/sql-generator">Need to write a query instead? Try the SQL Generator →</Link></li>
          <li><Link href="/blog/sql-interview-questions-complete-guide">SQL Interview Questions: The Complete Guide</Link></li>
          <li><Link href="/blog/sql-group-by-having-clause-explained">SQL GROUP BY and HAVING Clause Explained</Link></li>
          <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL: A Complete Guide</Link></li>
        </ul>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: SQL</h3>
        <ul className="small">
          <li><Link href="/blog/sql-explainer-guide-how-it-works">How to Read a SQL Query You Did Not Write — A Step-by-Step Guide</Link></li>
          <li><Link href="/blog/sql-interview-questions-complete-guide">SQL Interview Questions: The Complete Guide</Link></li>
          <li><Link href="/blog/sql-group-by-having-clause-explained">SQL GROUP BY and HAVING Clause Explained with Examples</Link></li>
          <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
        </ul>
      </div>

    </div>
  );
}
