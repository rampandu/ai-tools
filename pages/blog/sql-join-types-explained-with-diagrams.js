// pages/blog/sql-join-types-explained-with-diagrams.js
import Head from 'next/head';
import Link from 'next/link';

const JOIN_COLORS = {
  inner: '#0d9488',
  left: '#2563eb',
  right: '#d97706',
  full: '#7c3aed',
};

function JoinVenn({ mode, idSuffix }) {
  const clipId = `clip-${idSuffix}`;
  const color = JOIN_COLORS[mode];
  return (
    <svg viewBox="0 0 200 140" width="180" height="126" style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="75" cy="70" r="55" />
        </clipPath>
      </defs>
      <circle cx="75" cy="70" r="55" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="125" cy="70" r="55" fill="none" stroke="#94a3b8" strokeWidth="1.5" />

      {mode === 'inner' && (
        <g clipPath={`url(#${clipId})`}>
          <circle cx="125" cy="70" r="55" fill={color} fillOpacity="0.8" />
        </g>
      )}
      {mode === 'left' && <circle cx="75" cy="70" r="55" fill={color} fillOpacity="0.55" />}
      {mode === 'right' && <circle cx="125" cy="70" r="55" fill={color} fillOpacity="0.55" />}
      {mode === 'full' && (
        <>
          <circle cx="75" cy="70" r="55" fill={color} fillOpacity="0.45" />
          <circle cx="125" cy="70" r="55" fill={color} fillOpacity="0.45" />
        </>
      )}

      <text x="42" y="20" fontSize="11" fill="#334155" fontFamily="monospace">customers</text>
      <text x="118" y="20" fontSize="11" fill="#334155" fontFamily="monospace">orders</text>
    </svg>
  );
}

const resultTableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.85rem',
  marginTop: 8,
  marginBottom: 4,
};
const thStyle = { textAlign: 'left', padding: '6px 10px', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' };
const tdStyle = { padding: '6px 10px', borderBottom: '1px solid #e2e8f0' };
const nullStyle = { padding: '6px 10px', borderBottom: '1px solid #e2e8f0', color: '#94a3b8', fontStyle: 'italic' };

function ResultTable({ rows }) {
  return (
    <table style={resultTableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>name</th>
          <th style={thStyle}>order_id</th>
          <th style={thStyle}>amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={r.name === null ? nullStyle : tdStyle}>{r.name === null ? 'NULL' : r.name}</td>
            <td style={r.order_id === null ? nullStyle : tdStyle}>{r.order_id === null ? 'NULL' : r.order_id}</td>
            <td style={r.amount === null ? nullStyle : tdStyle}>{r.amount === null ? 'NULL' : r.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SqlJoinTypesGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL JOIN Types Explained With Diagrams',
        item: 'https://dev-brains-ai.com/blog/sql-join-types-explained-with-diagrams',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL JOIN Types Explained: INNER, LEFT, RIGHT, FULL (With Diagrams)',
    description:
      'See exactly which rows each SQL JOIN type returns using one shared example: INNER, LEFT, RIGHT, FULL, CROSS, and SELF JOIN, each with a diagram and worked result set.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-join-types-explained-with-diagrams',
    datePublished: '2026-08-01',
    dateModified: '2026-08-01',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between LEFT JOIN and RIGHT JOIN?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LEFT JOIN keeps every row from the left (first-listed) table, filling in NULLs where there is no match on the right. RIGHT JOIN does the mirror image: it keeps every row from the right table, filling in NULLs where there is no match on the left. A RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping the table order, which is why most style guides recommend sticking to LEFT JOIN for consistency.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does MySQL support FULL OUTER JOIN?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. MySQL does not have native FULL OUTER JOIN syntax. You simulate it by combining a LEFT JOIN and a RIGHT JOIN with UNION, which merges matched rows with both sets of unmatched rows and removes the duplicate matched rows. PostgreSQL, SQL Server, and Oracle all support FULL OUTER JOIN directly.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I forget the ON clause in a JOIN?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Without an ON clause, most databases either throw a syntax error or, if you wrote a comma-separated FROM list, silently perform a CROSS JOIN — every row in the first table paired with every row in the second. On tables with thousands of rows this produces millions of rows and can lock up a query. Always pair JOIN with an explicit ON condition unless a cartesian product is genuinely what you want.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to visualize SQL JOINs from my own query?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Dev Brains AI SQL Query Visualizer at dev-brains-ai.com/sql-query-visualizer parses a pasted query and diagrams its table JOINs and clause execution order automatically, for free, with no signup.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL JOIN Types Explained: INNER, LEFT, RIGHT, FULL (Diagrams) | Dev Brains AI</title>
        <meta
          name="description"
          content="See exactly which rows each SQL JOIN type returns — INNER, LEFT, RIGHT, FULL, CROSS, SELF — with diagrams, one shared example, and the exact result set for each."
        />
        <meta
          name="keywords"
          content="sql join types, inner join vs left join, sql join diagram, left join vs right join, full outer join mysql, cross join sql, self join example, sql join venn diagram"
        />
        <meta property="og:title" content="SQL JOIN Types Explained: INNER, LEFT, RIGHT, FULL (Diagrams)" />
        <meta
          property="og:description"
          content="See exactly which rows each SQL JOIN type returns — INNER, LEFT, RIGHT, FULL, CROSS, SELF — with diagrams, one shared example, and the exact result set for each."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-join-types-explained-with-diagrams" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-join-types-explained-with-diagrams" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">SQL JOIN Types Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL JOIN Types Explained: INNER, LEFT, RIGHT, FULL, CROSS (With Diagrams)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every JOIN type answers the same question differently: "when a row on one side has no
            match on the other side, do I keep it, drop it, or fill it with NULL?" Rather than
            explain each JOIN in isolation, this guide runs the <em>same two tables</em> through
            every JOIN type — INNER, LEFT, RIGHT, FULL, CROSS, and SELF — so you can compare the
            exact result set side by side. Each section has a diagram and a result table you can
            verify by hand.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The Two Tables Used Throughout</h2>
          <p className="small" style={{ marginBottom: 10 }}>
            Three customers, four orders. Notice <strong>Cara has no orders</strong>, and{' '}
            <strong>order 104 belongs to customer_id 9</strong>, which does not exist in the
            customers table — these two "orphan" rows are what make LEFT, RIGHT, and FULL JOIN
            behave differently from INNER JOIN.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
            <div>
              <strong className="small">customers</strong>
              <table style={resultTableStyle}>
                <thead><tr><th style={thStyle}>id</th><th style={thStyle}>name</th></tr></thead>
                <tbody>
                  <tr><td style={tdStyle}>1</td><td style={tdStyle}>Alice</td></tr>
                  <tr><td style={tdStyle}>2</td><td style={tdStyle}>Bob</td></tr>
                  <tr><td style={tdStyle}>3</td><td style={tdStyle}>Cara</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <strong className="small">orders</strong>
              <table style={resultTableStyle}>
                <thead><tr><th style={thStyle}>id</th><th style={thStyle}>customer_id</th><th style={thStyle}>amount</th></tr></thead>
                <tbody>
                  <tr><td style={tdStyle}>101</td><td style={tdStyle}>1</td><td style={tdStyle}>250</td></tr>
                  <tr><td style={tdStyle}>102</td><td style={tdStyle}>1</td><td style={tdStyle}>80</td></tr>
                  <tr><td style={tdStyle}>103</td><td style={tdStyle}>2</td><td style={tdStyle}>400</td></tr>
                  <tr><td style={tdStyle}>104</td><td style={tdStyle}>9</td><td style={tdStyle}>150</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>
            <span style={{ color: JOIN_COLORS.inner }}>■</span> INNER JOIN
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Returns only rows that have a match on <em>both</em> sides. Cara (no orders) and order
            104 (no matching customer) are both dropped.
          </p>
          <JoinVenn mode="inner" idSuffix="1" />
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginTop: 10, marginBottom: 4 }}>
{`SELECT c.name, o.id AS order_id, o.amount
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;`}
          </pre>
          <ResultTable rows={[
            { name: 'Alice', order_id: 101, amount: 250 },
            { name: 'Alice', order_id: 102, amount: 80 },
            { name: 'Bob', order_id: 103, amount: 400 },
          ]} />

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>
            <span style={{ color: JOIN_COLORS.left }}>■</span> LEFT JOIN (LEFT OUTER JOIN)
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Keeps <em>every</em> row from the left table (customers), even without a match. Cara
            now appears with NULL order fields. Order 104 is still dropped — it isn't in the left
            table.
          </p>
          <JoinVenn mode="left" idSuffix="2" />
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginTop: 10, marginBottom: 4 }}>
{`SELECT c.name, o.id AS order_id, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;`}
          </pre>
          <ResultTable rows={[
            { name: 'Alice', order_id: 101, amount: 250 },
            { name: 'Alice', order_id: 102, amount: 80 },
            { name: 'Bob', order_id: 103, amount: 400 },
            { name: 'Cara', order_id: null, amount: null },
          ]} />

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>
            <span style={{ color: JOIN_COLORS.right }}>■</span> RIGHT JOIN (RIGHT OUTER JOIN)
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            The mirror image of LEFT JOIN: keeps every row from the right table (orders). Order
            104 now appears with a NULL customer name. Cara is dropped — she isn't in the right
            table.
          </p>
          <JoinVenn mode="right" idSuffix="3" />
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginTop: 10, marginBottom: 4 }}>
{`SELECT c.name, o.id AS order_id, o.amount
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id;`}
          </pre>
          <ResultTable rows={[
            { name: 'Alice', order_id: 101, amount: 250 },
            { name: 'Alice', order_id: 102, amount: 80 },
            { name: 'Bob', order_id: 103, amount: 400 },
            { name: null, order_id: 104, amount: 150 },
          ]} />
          <p className="small" style={{ marginBottom: 14 }}>
            Since a RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping the table order
            (<code>FROM orders o LEFT JOIN customers c ON ...</code>), most style guides —
            including this site's — recommend sticking to LEFT JOIN everywhere for consistency and
            dropping RIGHT JOIN entirely.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>
            <span style={{ color: JOIN_COLORS.full }}>■</span> FULL JOIN (FULL OUTER JOIN)
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Keeps every row from <em>both</em> tables. Both Cara and order 104 appear, each with
            NULLs on the side that has no match.
          </p>
          <JoinVenn mode="full" idSuffix="4" />
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginTop: 10, marginBottom: 4 }}>
{`-- PostgreSQL, SQL Server, Oracle:
SELECT c.name, o.id AS order_id, o.amount
FROM customers c
FULL OUTER JOIN orders o ON c.id = o.customer_id;`}
          </pre>
          <ResultTable rows={[
            { name: 'Alice', order_id: 101, amount: 250 },
            { name: 'Alice', order_id: 102, amount: 80 },
            { name: 'Bob', order_id: 103, amount: 400 },
            { name: 'Cara', order_id: null, amount: null },
            { name: null, order_id: 104, amount: 150 },
          ]} />
          <p className="small" style={{ marginBottom: 6 }}>
            <strong>MySQL has no FULL OUTER JOIN keyword.</strong> Simulate it with a LEFT JOIN and
            a RIGHT JOIN combined by UNION, which de-duplicates the matched rows both sides agree on:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL workaround:
SELECT c.name, o.id AS order_id, o.amount
FROM customers c LEFT JOIN orders o ON c.id = o.customer_id
UNION
SELECT c.name, o.id AS order_id, o.amount
FROM customers c RIGHT JOIN orders o ON c.id = o.customer_id;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>CROSS JOIN</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            No ON condition — every row in the first table is paired with every row in the second.
            3 customers × 4 orders = <strong>12 rows</strong>, almost all of them meaningless
            pairings. CROSS JOIN is rarely written on purpose; it's far more often an{' '}
            <em>accident</em> from a missing or mistyped ON clause (see the FAQ below).
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT c.name, o.id AS order_id
FROM customers c
CROSS JOIN orders o;
-- 3 customers x 4 orders = 12 rows`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>SELF JOIN</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Not a distinct JOIN type — it's an INNER or LEFT JOIN where a table is joined to
            itself, usually to compare rows within the same table. The classic example: finding
            each employee's manager, where both are rows in the same <code>employees</code> table.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>JOIN Types at a Glance</h2>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table style={{ ...resultTableStyle, minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={thStyle}>JOIN type</th>
                  <th style={thStyle}>Keeps unmatched rows from</th>
                  <th style={thStyle}>Result size (this example)</th>
                  <th style={thStyle}>Native in MySQL?</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={tdStyle}>INNER JOIN</td><td style={tdStyle}>Neither side</td><td style={tdStyle}>3 rows</td><td style={tdStyle}>Yes</td></tr>
                <tr><td style={tdStyle}>LEFT JOIN</td><td style={tdStyle}>Left table</td><td style={tdStyle}>4 rows</td><td style={tdStyle}>Yes</td></tr>
                <tr><td style={tdStyle}>RIGHT JOIN</td><td style={tdStyle}>Right table</td><td style={tdStyle}>4 rows</td><td style={tdStyle}>Yes</td></tr>
                <tr><td style={tdStyle}>FULL OUTER JOIN</td><td style={tdStyle}>Both tables</td><td style={tdStyle}>5 rows</td><td style={tdStyle}>No — use UNION workaround</td></tr>
                <tr><td style={tdStyle}>CROSS JOIN</td><td style={tdStyle}>N/A — no matching</td><td style={tdStyle}>12 rows</td><td style={tdStyle}>Yes</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between LEFT JOIN and RIGHT JOIN?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              LEFT JOIN keeps every row from the first-listed table; RIGHT JOIN keeps every row
              from the second. A RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping
              table order, which is why most codebases standardize on LEFT JOIN only.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does MySQL support FULL OUTER JOIN?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No — simulate it with a LEFT JOIN UNION RIGHT JOIN, shown above. PostgreSQL, SQL
              Server, and Oracle all support it natively.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What happens if I forget the ON clause in a JOIN?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Most databases error out, or — with old comma-separated FROM syntax — silently
              produce a CROSS JOIN: every row paired with every row. On large tables this can
              generate millions of rows and hang the query.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to visualize SQL JOINs from my own query?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. The <Link href="/sql-query-visualizer">Dev Brains AI SQL Query Visualizer</Link>{' '}
              parses a pasted query and diagrams its table JOINs and clause execution order
              automatically, for free.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free SQL Query Visualizer</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste your own multi-JOIN query and get an instant diagram of its table joins plus
              logical execution order. No signup, no cost.
            </p>
            <Link href="/sql-query-visualizer">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open SQL Query Visualizer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/sql-subqueries-vs-joins-explained">SQL Subqueries vs JOINs: Which Should You Use?</Link></li>
              <li><Link href="/blog/sql-explainer-guide-how-it-works">How to Read Any SQL Query: Execution Order Explained</Link></li>
              <li><Link href="/blog/sql-cte-common-table-expressions-guide">SQL CTE Guide: WITH Clause, Chaining & Recursion</Link></li>
              <li><Link href="/blog/sql-interview-questions-complete-guide">SQL Interview Questions: The Complete Guide</Link></li>
              <li><Link href="/sql-generator">Free AI SQL Query Builder</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
