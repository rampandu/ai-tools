// pages/blog/sql-query-for-pagination-limit-offset.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlQueryForPaginationLimitOffset() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Query for Pagination — LIMIT, OFFSET, and Keyset Pagination',
        item: 'https://dev-brains-ai.com/blog/sql-query-for-pagination-limit-offset',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Pagination Guide — LIMIT/OFFSET vs Keyset Pagination (with Copy-Paste SQL)',
    description:
      'SQL pagination explained: LIMIT/OFFSET syntax, why OFFSET gets slow at scale, and the keyset (cursor-based) pagination pattern that keeps every page fast — with MySQL and PostgreSQL examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-query-for-pagination-limit-offset',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I paginate SQL query results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use LIMIT to control how many rows to return and OFFSET to skip a number of rows before returning results, for example LIMIT 20 OFFSET 40 to get page 3 of 20 rows per page. For large tables, keyset pagination using WHERE id > last_seen_id is faster than OFFSET.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is OFFSET slow on large tables?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'OFFSET does not skip rows for free — the database still has to scan and discard every row before the offset position. On page 10,000 with 50 rows per page, the database scans and throws away 500,000 rows before returning the 50 you actually want, which gets slower as the offset grows.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is keyset pagination?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keyset pagination, also called cursor-based pagination, fetches the next page using a WHERE condition on the last row seen, such as WHERE id > last_seen_id ORDER BY id LIMIT 20, instead of counting through OFFSET rows. It uses an index to jump directly to the right spot, so performance stays constant regardless of page number.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fastest way to paginate a large SQL table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For tables with more than a few hundred thousand rows, keyset (cursor-based) pagination is fastest because it uses an index to jump directly to the next page instead of scanning and discarding rows. LIMIT/OFFSET is fine for small tables or when users need to jump to an arbitrary page number.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does LIMIT OFFSET work the same in MySQL and PostgreSQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Both MySQL and PostgreSQL use the same LIMIT n OFFSET m syntax, so pagination queries are portable between them. SQL Server instead uses OFFSET m ROWS FETCH NEXT n ROWS ONLY, and older SQL Server versions need a subquery workaround.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Pagination Guide — LIMIT/OFFSET vs Keyset (Copy-Paste SQL) | Dev Brains AI</title>
        <meta
          name="description"
          content="SQL pagination explained: LIMIT/OFFSET syntax, why deep OFFSET pages get slow, and the keyset (cursor) pattern that keeps every page fast — with examples."
        />
        <meta
          name="keywords"
          content="sql pagination, limit offset sql, sql pagination query, keyset pagination, cursor based pagination sql, sql offset performance, paginate sql results"
        />
        <meta property="og:title" content="SQL Pagination Guide — LIMIT/OFFSET vs Keyset Pagination" />
        <meta
          property="og:description"
          content="Learn SQL pagination with LIMIT/OFFSET, why deep pages get slow, and the keyset (cursor-based) pattern that keeps performance flat at any page depth."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-query-for-pagination-limit-offset" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-query-for-pagination-limit-offset" />
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
              <li aria-current="page">SQL Pagination with LIMIT and OFFSET</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Query for Pagination — LIMIT, OFFSET, and Keyset Pagination
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Almost every list view in an application — search results, product catalogs, order
            history — needs pagination. SQL makes basic pagination easy with LIMIT and OFFSET, but
            that same simplicity becomes a performance trap once a table grows into the millions of
            rows. This guide covers the standard LIMIT/OFFSET syntax, explains exactly why OFFSET
            slows down at scale, and shows the keyset pagination pattern that fixes it. If you're
            still writing the base SELECT query itself, the free{' '}
            <Link href="/sql-generator">AI SQL query generator</Link> can draft the SELECT and WHERE
            clauses from plain English — this guide picks up where that leaves off, adding LIMIT,
            OFFSET, and keyset pagination on top.
          </p>

          <svg viewBox="0 0 640 200" style={{ width: '100%', height: 'auto', marginBottom: 18, borderRadius: 8, background: '#0f172a' }} role="img" aria-label="Diagram comparing OFFSET scanning and discarding rows versus keyset pagination seeking directly with an index">
            <rect x="24" y="20" width="280" height="160" rx="10" fill="#1e293b" stroke="#334155" />
            <text x="164" y="44" textAnchor="middle" fill="#94a3b8" fontSize="13" fontFamily="ui-monospace, monospace">OFFSET 500000</text>
            <text x="164" y="66" textAnchor="middle" fill="#f87171" fontSize="11" fontFamily="ui-monospace, monospace">scans + discards</text>
            <text x="164" y="84" textAnchor="middle" fill="#f87171" fontSize="11" fontFamily="ui-monospace, monospace">500,000 rows first</text>
            <rect x="44" y="98" width="240" height="14" rx="3" fill="#7f1d1d" />
            <rect x="44" y="116" width="240" height="14" rx="3" fill="#7f1d1d" />
            <rect x="44" y="134" width="240" height="14" rx="3" fill="#7f1d1d" />
            <rect x="44" y="152" width="60" height="14" rx="3" fill="#16a34a" />
            <text x="74" y="163" textAnchor="middle" fill="#ecfdf5" fontSize="9" fontFamily="ui-monospace, monospace">20 rows</text>
            <text x="330" y="105" textAnchor="middle" fill="#34d399" fontSize="18" fontFamily="ui-monospace, monospace">vs</text>
            <rect x="356" y="20" width="260" height="160" rx="10" fill="#0d3b34" stroke="#14b8a6" />
            <text x="486" y="44" textAnchor="middle" fill="#5eead4" fontSize="13" fontFamily="ui-monospace, monospace">WHERE id &gt; 500000</text>
            <text x="486" y="66" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">index seeks directly</text>
            <text x="486" y="84" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">to the right spot</text>
            <rect x="376" y="120" width="220" height="14" rx="3" fill="#16a34a" />
            <text x="486" y="131" textAnchor="middle" fill="#ecfdf5" fontSize="9" fontFamily="ui-monospace, monospace">20 rows — no scan</text>
            <text x="486" y="158" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">same speed on page 1</text>
            <text x="486" y="174" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">or page 25,000</text>
          </svg>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Basic Pagination with LIMIT and OFFSET
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>LIMIT</code> caps the number of rows returned, and <code>OFFSET</code> skips a
            number of rows before starting to return results. Together they implement "page N of
            the results":
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL / PostgreSQL: page 1, 20 rows per page
SELECT id, title, created_at
FROM articles
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

-- Page 2 (skip the first 20 rows)
SELECT id, title, created_at
FROM articles
ORDER BY created_at DESC
LIMIT 20 OFFSET 20;

-- Page 3 (skip the first 40 rows)
SELECT id, title, created_at
FROM articles
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The general formula for page <code>p</code> with <code>pageSize</code> rows is:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`LIMIT pageSize OFFSET (p - 1) * pageSize`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            An ORDER BY clause is required for reliable pagination — without it, the database gives
            no guarantee that rows come back in the same order across requests, and pages could
            show duplicate or missing rows.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why OFFSET Gets Slow on Large Tables
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            OFFSET is deceptively expensive. The database cannot jump straight to row 500,000 — it
            has to walk through and discard every row before that position, every single time you
            request that page:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Page 1 (<code>OFFSET 0</code>) — fast, no rows to skip</li>
            <li>Page 1,000 (<code>OFFSET 20000</code>) — scans and discards 20,000 rows before returning 20</li>
            <li>Page 25,000 (<code>OFFSET 500000</code>) — scans and discards 500,000 rows before returning 20</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            The deeper the page, the more wasted work — query time grows roughly linearly with the
            offset value, even though the result set size never changes. On a table with millions
            of rows, deep pages can take seconds instead of milliseconds, and the cost lands on
            every single page request as users click "next."
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Keyset (Cursor-Based) Pagination
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Keyset pagination replaces OFFSET with a WHERE condition based on the last row the
            client already saw. Instead of counting rows, it uses an indexed column to jump
            directly to the right position:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- First page
SELECT id, title, created_at
FROM articles
ORDER BY id ASC
LIMIT 20;

-- Client remembers the last id from the previous page, e.g. 20
-- Next page: no OFFSET needed
SELECT id, title, created_at
FROM articles
WHERE id > 20
ORDER BY id ASC
LIMIT 20;

-- Next page after that, last id was 40
SELECT id, title, created_at
FROM articles
WHERE id > 40
ORDER BY id ASC
LIMIT 20;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Because <code>id</code> is indexed (typically the primary key), the database seeks
            directly to <code>WHERE id &gt; 40</code> using the index instead of scanning from the
            start. Page 25,000 costs the same as page 1 — performance stays flat regardless of how
            deep you page.
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            For pagination ordered by a non-unique column like <code>created_at</code>, add the
            primary key as a tiebreaker to keep the cursor stable when timestamps repeat:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Cursor is (last_created_at, last_id) from the previous page
SELECT id, title, created_at
FROM articles
WHERE (created_at, id) < ('2026-07-01 10:15:00', 583)
ORDER BY created_at DESC, id DESC
LIMIT 20;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            More Pagination Examples: Filters and Off-by-One Safety
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Keyset pagination works fine alongside a WHERE filter — just add the filter condition
            with AND, keeping the cursor comparison on the indexed column:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Keyset pagination combined with a status filter
SELECT id, customer_id, total, created_at
FROM orders
WHERE status = 'active'
  AND id > 4820
ORDER BY id ASC
LIMIT 20;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The most common LIMIT/OFFSET bug in application code is an off-by-one page-size error —
            mixing up whether page 1 means "skip zero rows" or "skip one page":
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Correct: page 1 => OFFSET 0
const offset = (page - 1) * pageSize;

// Bug: page 1 => OFFSET pageSize (silently skips the first page)
const offset = page * pageSize; // WRONG`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            LIMIT/OFFSET vs Keyset Pagination — When to Use Each
          </h2>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li><strong>Use LIMIT/OFFSET</strong> when the table is small to medium sized, or users need to jump to an arbitrary page number (like "go to page 47")</li>
            <li><strong>Use keyset pagination</strong> for large tables, infinite scroll, or API feeds where users only move forward/backward sequentially</li>
            <li><strong>Keyset limitation</strong> — you cannot easily jump to an arbitrary page number, since there is no concept of "skip N rows"</li>
            <li><strong>Hybrid approach</strong> — some products show page numbers using an approximate/cached count, but fetch actual rows with keyset pagination underneath</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Practical Tips for Reliable Pagination
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Always index the column(s) used in ORDER BY for pagination — without an index, both LIMIT/OFFSET and keyset queries force a full sort</li>
            <li>Avoid <code>SELECT COUNT(*)</code> on every page load for large tables — cache the total count or estimate it periodically</li>
            <li>Use a stable, unique tiebreaker column (usually the primary key) so rows never get skipped or duplicated across pages</li>
            <li>MySQL and PostgreSQL both use <code>LIMIT ... OFFSET ...</code>; older SQL Server uses <code>OFFSET ... ROWS FETCH NEXT ... ROWS ONLY</code> instead</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            OFFSET performance is just one piece of large-table performance — see our full guide to{' '}
            <Link href="/blog/sql-optimization-techniques-for-large-tables">SQL optimization techniques for large tables</Link>{' '}
            for indexing and query-plan tips beyond pagination. If you're generating the base MySQL
            query itself, our{' '}
            <Link href="/blog/free-mysql-query-generator-online">free MySQL query generator guide</Link>{' '}
            shows how to produce the SELECT and WHERE clauses from plain English before you add
            pagination on top.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Pagination Mistakes
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Using OFFSET on a large, frequently-paged table.</strong> Deep OFFSET values force a full scan-and-discard of every earlier row — if a table is likely to grow past a few hundred thousand rows, plan for keyset pagination early instead of retrofitting it later.</li>
            <li><strong>Off-by-one page-size math.</strong> Page 1 should use OFFSET 0, not OFFSET pageSize — a common bug computes <code>OFFSET = page * pageSize</code> instead of <code>OFFSET = (page - 1) * pageSize</code>, which silently skips the first page of results.</li>
            <li><strong>Forgetting ORDER BY entirely.</strong> Without an explicit ORDER BY, the database gives no guarantee of row order between requests — pages can return duplicate rows or skip rows entirely as the underlying data or query plan changes.</li>
            <li><strong>Sorting on a column with no index.</strong> Both LIMIT/OFFSET and keyset pagination need an index on the ORDER BY column(s) — without one, every page request triggers a full table sort, which gets slower as the table grows.</li>
            <li><strong>Using a non-unique sort column alone for keyset pagination.</strong> If two rows share the same <code>created_at</code> timestamp, a cursor based only on that column can skip or repeat rows — always add a unique tiebreaker like the primary key.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I paginate SQL query results?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use LIMIT to control how many rows to return and OFFSET to skip a number of rows before returning results, for example LIMIT 20 OFFSET 40 to get page 3 of 20 rows per page. For large tables, keyset pagination using WHERE id &gt; last_seen_id is faster than OFFSET.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why is OFFSET slow on large tables?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              OFFSET does not skip rows for free — the database still has to scan and discard every row before the offset position. On page 10,000 with 50 rows per page, the database scans and throws away 500,000 rows before returning the 50 you actually want, which gets slower as the offset grows.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is keyset pagination?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Keyset pagination, also called cursor-based pagination, fetches the next page using a WHERE condition on the last row seen, such as WHERE id &gt; last_seen_id ORDER BY id LIMIT 20, instead of counting through OFFSET rows. It uses an index to jump directly to the right spot, so performance stays constant regardless of page number.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the fastest way to paginate a large SQL table?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              For tables with more than a few hundred thousand rows, keyset (cursor-based) pagination is fastest because it uses an index to jump directly to the next page instead of scanning and discarding rows. LIMIT/OFFSET is fine for small tables or when users need to jump to an arbitrary page number.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does LIMIT OFFSET work the same in MySQL and PostgreSQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes — both MySQL and PostgreSQL use the same LIMIT n OFFSET m syntax, so pagination queries are portable between them. SQL Server instead uses OFFSET m ROWS FETCH NEXT n ROWS ONLY, and older SQL Server versions need a subquery workaround.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the paginated query you need in plain English and get a ready-to-run query instantly.
            </p>
            <Link href="/sql-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open AI SQL Query Builder →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/sql-indexing-strategies-for-faster-queries">SQL Indexing Strategies for Faster Queries</Link></li>
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
              <li><Link href="/blog/mysql-vs-postgresql-performance-comparison">MySQL vs PostgreSQL Performance Comparison</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
