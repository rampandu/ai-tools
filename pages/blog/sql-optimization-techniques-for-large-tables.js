// pages/blog/sql-optimization-techniques-for-large-tables.js
import Head from 'next/head';
import Link from 'next/link';

const FAQ = [
  {
    q: 'What is the single highest-impact thing to check first on a slow query?',
    a: 'Run EXPLAIN (or EXPLAIN ANALYZE) on it before changing anything. Guessing at fixes without seeing the actual execution plan often means optimizing the wrong thing — the plan tells you whether the database is doing a full table scan, which index (if any) it\'s using, and roughly how many rows it expects to touch.',
  },
  {
    q: 'Does adding an index always make queries faster?',
    a: "No. Indexes speed up reads that use them but slow down every INSERT, UPDATE, and DELETE on that table, since the index has to be maintained too. A table with heavy write traffic and too many indexes can end up slower overall. Index the columns your queries actually filter, join, or sort on — not every column.",
  },
  {
    q: 'What is the N+1 query problem and how do I fix it?',
    a: 'It happens when code loops over a result set and runs one additional query per row — e.g., fetching 100 orders, then querying for each order\'s customer separately, for 101 total queries instead of 2. Fix it with a JOIN, or by batching the follow-up query with WHERE id IN (...) instead of querying inside the loop.',
  },
  {
    q: 'Is table partitioning worth it for a mid-sized table?',
    a: "Usually not below a few million rows. Partitioning adds real operational complexity (partition maintenance, queries that don't include the partition key can scan every partition) for a benefit that mostly shows up at genuinely large scale. Try indexing, query rewrites, and caching first — they're simpler and often solve the problem outright.",
  },
];

export default function SqlOptimizationTechniquesForLargeTables() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Optimization Techniques for Large Tables',
        item: 'https://dev-brains-ai.com/blog/sql-optimization-techniques-for-large-tables',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '7 SQL Optimization Techniques for Large Tables',
    description:
      'Speed up slow queries on multi-million row tables: sargable WHERE clauses, JOIN order, the N+1 query problem, partitioning trade-offs, and reading EXPLAIN output.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-optimization-techniques-for-large-tables',
    datePublished: '2026-02-26',
    dateModified: '2026-08-25',
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

  return (
    <>
      <Head>
        <title>7 SQL Optimization Techniques for Large Tables | Dev Brains AI</title>
        <meta
          name="description"
          content="Speed up slow queries on multi-million row tables: sargable WHERE clauses, JOIN order, the N+1 query problem, partitioning trade-offs, and reading EXPLAIN output."
        />
        <meta
          name="keywords"
          content="sql optimization, large table performance, sargable queries, sql explain output, n+1 query problem, table partitioning, slow query fix"
        />
        <meta property="og:title" content="7 SQL Optimization Techniques for Large Tables" />
        <meta property="og:description" content="Speed up slow queries on multi-million row tables: sargable WHERE clauses, JOIN order, the N+1 query problem, partitioning trade-offs, and reading EXPLAIN output." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-optimization-techniques-for-large-tables" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-optimization-techniques-for-large-tables" />
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
              <li aria-current="page">SQL Optimization Techniques for Large Tables</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Optimization Techniques for Large Tables
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            A query that runs fine on a 10,000-row test table can crawl once it hits a few million
            real rows — a common surprise once a system moves past its early stage. Most fixes fall
            into a handful of categories: making sure the database can actually use an index for
            your filter, not fetching more data than you need, and understanding what the query
            planner is actually doing instead of guessing. This guide covers the practical ones,
            each with a working example.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            1. Index the Columns You Actually Filter, Join, and Sort On
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Without an index, the database checks every row (a full table scan) to find matches.
            With the right index, it can jump straight to them.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 8 }}>
{`CREATE INDEX idx_employees_salary ON employees(salary);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Indexing isn't free — every index speeds up reads but slows down writes, since it has
            to be maintained on every INSERT, UPDATE, and DELETE. For composite indexes, covering
            indexes, and how to read an index in an EXPLAIN plan, see the dedicated{' '}
            <Link href="/blog/sql-indexing-strategies-for-faster-queries">
              SQL indexing strategies guide
            </Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            2. Avoid SELECT *
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Fetching every column costs more network transfer and memory than fetching only what
            you need — and if a covering index exists for your query, selecting a column outside
            it can force the database to fall back to a slower lookup.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Slower: fetches every column, even ones you'll never use
SELECT * FROM employees;

-- Faster: fetches only what the caller needs
SELECT name, salary FROM employees;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            3. Write Sargable WHERE Clauses
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            "Sargable" (Search ARGument ABLE) means the database can use an index to evaluate the
            condition. Wrapping an indexed column in a function usually breaks that — the database
            has to compute the function for every row instead of doing an index lookup.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Not sargable: YEAR(join_date) must be computed for every row,
-- so an index on join_date can't be used
SELECT * FROM employees WHERE YEAR(join_date) = 2024;

-- Sargable: join_date is compared directly, so an index on it can be used
SELECT * FROM employees
WHERE join_date >= '2024-01-01' AND join_date < '2025-01-01';`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The same applies to <code>LOWER(email) = '...'</code>, <code>col + 1 = 5</code>, or any
            other transformation on the column itself — where possible, transform the value you're
            comparing against instead of the column.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            4. Optimize JOINs
          </h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 8 }}>
            <li>Join on indexed columns — an unindexed JOIN condition forces a full scan of one side</li>
            <li>Filter before joining where possible, so the database has fewer rows to match</li>
            <li>Avoid joining tables you don't actually select or filter on</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT o.id, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.order_date > '2024-01-01';`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            For a full breakdown of JOIN types and when each one applies, see{' '}
            <Link href="/blog/sql-join-types-explained-with-diagrams">
              the SQL JOIN types guide
            </Link>, or diagram your own query's join graph with the{' '}
            <Link href="/sql-query-visualizer">SQL Query Visualizer</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            5. Watch for the N+1 Query Problem
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            This is an application-code problem, not a query-syntax one — it happens when code
            loops over a result set and fires one additional query per row:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// N+1: 1 query for orders, then 1 more per order = 101 queries for 100 orders
const orders = await db.query('SELECT * FROM orders LIMIT 100');
for (const order of orders) {
  order.customer = await db.query('SELECT * FROM customers WHERE id = ?', [order.customer_id]);
}

// Fixed: 1 query total, using a JOIN
const orders = await db.query(\`
  SELECT o.*, c.name AS customer_name
  FROM orders o JOIN customers c ON o.customer_id = c.id
  LIMIT 100
\`);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            A query that's individually fast can still make a page slow if it's run 100 times in a
            loop — this is one of the most common real-world performance bugs, and it doesn't show
            up in EXPLAIN because each individual query looks fine on its own.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            6. Paginate Instead of Loading Everything
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT * FROM logs ORDER BY created_at DESC LIMIT 100;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            LIMIT alone is fine for a first page, but plain <code>LIMIT/OFFSET</code> pagination
            gets slower the deeper you page, since the database still has to scan and discard every
            earlier row. For pages 50+ deep, see{' '}
            <Link href="/blog/sql-query-for-pagination-limit-offset">
              the keyset pagination pattern
            </Link>{' '}
            that stays fast regardless of page depth.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            7. Consider Table Partitioning — But Only at Real Scale
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Partitioning splits one large table into smaller physical pieces (commonly by date range),
            so queries that target one partition don't have to scan the whole table:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- PostgreSQL example: declarative range partitioning
CREATE TABLE sales_2025 PARTITION OF sales
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This is worth reaching for at genuinely large scale (tens of millions of rows and up) —
            below that, it adds real maintenance overhead (partition creation, and queries that
            don't filter on the partition key end up scanning every partition anyway) for a benefit
            indexing alone usually already covers. Try indexing and query rewrites first.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            8. Read EXPLAIN Before Guessing
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 8 }}>
{`EXPLAIN SELECT * FROM employees WHERE salary > 50000;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The output shows the query plan the database actually chose. The three things worth
            checking first: whether it says <strong>seq scan</strong> (full table scan) or{' '}
            <strong>index scan</strong> on a large table, the <strong>estimated row count</strong>{' '}
            (wildly wrong estimates often mean stale statistics), and, if your database supports it,
            running <code>EXPLAIN ANALYZE</code> to compare the estimate against what actually ran.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Mistakes
          </h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 14 }}>
            <li>Adding indexes reactively per-query instead of reviewing which columns are actually filtered/joined/sorted across the whole app</li>
            <li>Wrapping indexed columns in functions inside WHERE, silently disabling the index</li>
            <li>Using SELECT * out of habit in code that only needs 2-3 columns</li>
            <li>Not noticing an N+1 pattern because each individual query is fast</li>
            <li>Reaching for partitioning or caching before checking whether a missing index would fix it outright</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          {FAQ.map((f, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{f.q}</strong>
              <p className="small" style={{ marginTop: 6 }}>{f.a}</p>
            </div>
          ))}

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Build or Diagram a Query Instead of Writing One by Hand</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe what you need in plain English with the SQL Generator, or paste an existing
              query into the SQL Query Visualizer to see its JOIN structure and execution order.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/sql-generator">
                <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                  Open SQL Generator →
                </button>
              </Link>
              <Link href="/sql-query-visualizer">
                <button style={{ background: '#0d9488', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                  Open SQL Query Visualizer →
                </button>
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/sql-indexing-strategies-for-faster-queries">SQL Indexing Strategies: B-Tree, Composite Keys, EXPLAIN</Link></li>
              <li><Link href="/blog/sql-join-types-explained-with-diagrams">SQL JOIN Types Explained: INNER, LEFT, RIGHT, FULL (Diagrams)</Link></li>
              <li><Link href="/blog/sql-query-for-pagination-limit-offset">SQL Pagination: LIMIT/OFFSET vs Keyset</Link></li>
              <li><Link href="/blog/sql-explainer-guide-how-it-works">How to Read Any SQL Query: Execution Order Explained</Link></li>
              <li><Link href="/ai-error-explainer">AI Error Explainer</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
