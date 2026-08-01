// pages/sql-query-visualizer.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const EXAMPLES = [
  `SELECT o.id, c.name, p.product_name
FROM orders o
JOIN customers c ON o.customer_id = c.id
LEFT JOIN products p ON o.product_id = p.id
WHERE o.status = 'shipped'
GROUP BY c.name
ORDER BY o.id DESC
LIMIT 10`,
  `SELECT department, COUNT(*) AS total
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING COUNT(*) > 5`,
  `SELECT e.name, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id`,
];

const FAQ = [
  {
    q: 'Is this SQL query visualizer free?',
    a: 'Yes — completely free, with no signup required and no limit on how many queries you can visualize.',
  },
  {
    q: 'What kinds of queries does it support?',
    a: 'Single SELECT statements — including JOINs of any type (INNER, LEFT, RIGHT, FULL), WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT. INSERT/UPDATE/DELETE, multiple statements, and deeply vendor-specific syntax are not supported.',
  },
  {
    q: 'Does this connect to my real database?',
    a: 'No. This tool only parses the SQL text you paste — it never connects to a database, runs the query, or sees your data. Nothing you paste in is stored.',
  },
  {
    q: 'How is this different from an EXPLAIN plan?',
    a: "An EXPLAIN plan comes from your actual database engine and shows how it will physically execute the query (index usage, row estimates, scan type) — this tool can't produce that without a live connection. What it shows instead is the query's logical structure: which tables join to which, how, and the order clauses are logically evaluated in, which is useful for understanding a query before you ever run it.",
  },
];

export default function SqlQueryVisualizer() {
  const [query, setQuery] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleVisualize() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/sql-visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
    } catch (err) {
      setError(err?.details || err?.error || err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  const JOIN_COLORS = {
    'INNER JOIN': '#0d9488',
    'LEFT JOIN': '#2563eb',
    'RIGHT JOIN': '#d97706',
    'FULL JOIN': '#7c3aed',
    'FULL OUTER JOIN': '#7c3aed',
  };

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
    name: 'Dev Brains AI SQL Query Visualizer',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: 'Free tool that parses a SQL SELECT query and diagrams its table joins and logical clause execution order.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'SQL Query Visualizer', item: 'https://dev-brains-ai.com/sql-query-visualizer' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free SQL Query Visualizer — Diagram JOINs &amp; Execution Order | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste a SQL SELECT query and see its table JOINs diagrammed and its clauses broken down in logical execution order — free, no signup, nothing stored."
        />
        <meta
          name="keywords"
          content="sql query visualizer, sql join visualizer, visualize sql query, sql query diagram, sql execution order, sql join diagram tool"
        />
        <meta property="og:title" content="Free SQL Query Visualizer — Diagram JOINs & Execution Order" />
        <meta
          property="og:description"
          content="Paste a SQL SELECT query and see its table JOINs diagrammed and its clauses broken down in logical execution order — free, no signup."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/sql-query-visualizer" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/sql-query-visualizer" />
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
            <li aria-current="page">SQL Query Visualizer</li>
          </ol>
        </nav>

        <h1>Free SQL Query Visualizer</h1>
        <p className="small">
          Paste a <code>SELECT</code> query below to see its table JOINs diagrammed and its
          clauses broken down in the order your database actually evaluates them — not the order
          you type them in.
        </p>

        <label htmlFor="sql-input"><strong>SQL query</strong></label>
        <textarea
          id="sql-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ minHeight: 140, fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleVisualize} disabled={loading}>
            {loading ? 'Parsing...' : 'Visualize Query'}
          </button>
          <button type="button" onClick={() => { setQuery(''); setResult(null); setError(null); }}>Clear</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex, i) => (
              <button key={i} type="button" className="small" onClick={() => { setQuery(ex); setResult(null); setError(null); }}>
                Example {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          {error && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {String(error)}
            </div>
          )}

          {result && (
            <div style={{ marginTop: 8 }}>
              {result.tables?.length > 1 && (
                <>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Table Join Diagram</h3>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0, background: '#0f172a', borderRadius: 8, padding: 20, marginBottom: 8, overflowX: 'auto' }}>
                    {result.tables.map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                        {i > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px', minWidth: 140 }}>
                            <span style={{
                              fontSize: '0.7rem', fontFamily: 'ui-monospace, monospace', fontWeight: 700,
                              color: JOIN_COLORS[t.joinType] || '#94a3b8',
                              border: `1px solid ${JOIN_COLORS[t.joinType] || '#94a3b8'}`,
                              borderRadius: 999, padding: '2px 8px', marginBottom: 4,
                            }}>
                              {t.joinType || 'JOIN'}
                            </span>
                            <div style={{ width: '100%', height: 2, background: JOIN_COLORS[t.joinType] || '#94a3b8' }} />
                            {t.on && (
                              <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontFamily: 'ui-monospace, monospace', marginTop: 4, textAlign: 'center' }}>
                                ON {t.on}
                              </span>
                            )}
                          </div>
                        )}
                        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '10px 16px', textAlign: 'center', flexShrink: 0 }}>
                          <div style={{ color: '#5eead4', fontFamily: 'ui-monospace, monospace', fontWeight: 700, fontSize: '0.9rem' }}>{t.table}</div>
                          {t.alias && <div style={{ color: '#64748b', fontSize: '0.7rem', fontFamily: 'ui-monospace, monospace' }}>as {t.alias}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Logical Execution Order</h3>
              <div style={{ marginBottom: 8 }}>
                {result.clauses?.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < result.clauses.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{
                      flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: '#0d9488', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700,
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem' }}>{c.step}</span>
                      {c.text && <span className="small" style={{ marginLeft: 8, color: '#475569' }}>{c.text}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <p className="small" style={{ color: '#64748b' }}>
                Note this is the order your database <em>logically</em> evaluates the query in —
                SELECT runs after FROM/JOIN/WHERE/GROUP BY/HAVING even though you type it first.
                See <Link href="/blog/sql-explainer-guide-how-it-works">how SQL execution order works</Link> for
                the full explanation of why.
              </p>
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Visualize Query</strong>.
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>About the SQL Query Visualizer</h2>
        <p>
          Reading someone else's SQL query — especially one with two or three JOINs — often means
          mentally tracing which table connects to which and how, before you can even start
          reasoning about the WHERE clause. This tool does that tracing for you: paste a query and
          it diagrams the join graph and lays out every clause in the order the database actually
          evaluates it, not the order you typed it in.
        </p>
        <p>
          It parses your SQL with a real SQL parser rather than pattern-matching keywords, so it
          correctly handles table aliases, mixed JOIN types in the same query, and multi-condition
          ON clauses. Need to build a query from scratch instead of visualizing an existing one?
          Try the <Link href="/sql-generator">AI SQL Generator</Link>, or get a plain-English
          explanation of a query with the <Link href="/sql-explainer">SQL Query Explainer</Link>.
        </p>

        <h3>Common Mistakes This Diagram Helps Catch</h3>
        <ul className="small">
          <li><strong>An accidental cross join.</strong> If a JOIN is missing its ON condition, the diagram will show a join with no condition label — a strong sign the query will return a much larger result set than intended.</li>
          <li><strong>The wrong join type for the intent.</strong> Seeing "INNER JOIN" highlighted in the diagram when you actually wanted every row from the left table (which needs LEFT JOIN) is easier to catch visually than by reading the raw SQL text.</li>
          <li><strong>Filtering in the wrong clause.</strong> The execution-order panel makes it visible when a condition that should be in WHERE (filtering rows before grouping) was accidentally written as HAVING (which filters groups after aggregation), or the reverse.</li>
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

      <div className="card small">
        <h4>SQL guides and tutorials</h4>
        <ul className="small">
          <li><Link href="/blog/sql-join-types-explained-with-diagrams">SQL JOIN Types Explained: INNER, LEFT, RIGHT, FULL (Diagrams)</Link></li>
          <li><Link href="/blog/sql-explainer-guide-how-it-works">How to Read Any SQL Query: Execution Order Explained</Link></li>
          <li><Link href="/blog/sql-subqueries-vs-joins-explained">SQL Subqueries vs JOINs: Which Should You Use?</Link></li>
          <li><Link href="/blog/sql-cte-common-table-expressions-guide">SQL CTE Guide: WITH Clause, Chaining & Recursion</Link></li>
          <li><Link href="/blog/sql-query-for-hierarchical-data-recursive-cte">SQL Recursive CTE for Org Charts and Category Trees</Link></li>
          <li><Link href="/sql-generator">AI SQL Generator</Link></li>
          <li><Link href="/sql-formatter">SQL Formatter</Link></li>
        </ul>
      </div>
    </div>
  );
}
