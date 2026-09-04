// pages/blog/sql-union-vs-union-all-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlUnionVsUnionAllExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL UNION vs UNION ALL Explained',
        item: 'https://dev-brains-ai.com/blog/sql-union-vs-union-all-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL UNION vs UNION ALL: Differences & Performance',
    description:
      "See why UNION ALL is faster than UNION, when UNION's deduplication step can silently drop real rows, and a quick decision guide for picking the right one.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-union-vs-union-all-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between UNION and UNION ALL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UNION combines the results of two or more SELECT statements and removes duplicate rows from the combined result. UNION ALL combines the results the same way but keeps every row, including duplicates. Use UNION ALL when you know there are no duplicates or you do not care about them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is UNION ALL faster than UNION?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UNION ALL is faster because it simply appends the result sets together with no extra work. UNION has to additionally sort or hash the combined rows to find and remove duplicates, which adds CPU and memory overhead, especially on large result sets.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do the columns have to match in a UNION query?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every SELECT statement combined with UNION or UNION ALL must return the same number of columns, and the data types of corresponding columns must be compatible. Column names in the final result come from the first SELECT statement.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL UNION vs UNION ALL: Differences & Performance | Dev Brains AI</title>
        <meta
          name="description"
          content="See why UNION ALL is faster than UNION, when UNION's deduplication step can silently drop real rows, and a quick decision guide for picking the right one."
        />
        <meta
          name="keywords"
          content="sql union vs union all, sql union all, sql union example, union all performance sql, combine select statements sql, sql union duplicates"
        />
        <meta property="og:title" content="SQL UNION vs UNION ALL: Differences & Performance" />
        <meta property="og:description" content="See why UNION ALL is faster than UNION, when UNION's deduplication step can silently drop real rows, and a quick decision guide for picking the right one." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-union-vs-union-all-explained" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-union-vs-union-all-explained" />
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
              <li aria-current="page">SQL UNION vs UNION ALL</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL UNION vs UNION ALL Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            UNION and UNION ALL both stack the results of multiple SELECT statements into a single
            result set, but they behave very differently once duplicate rows show up — and that
            difference has a real performance cost. This guide explains exactly what each keyword
            does, walks through concrete examples, and shows why picking the wrong one can silently
            slow down a query on a large dataset.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Basic Rules for Combining SELECT Statements
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Both UNION and UNION ALL combine two or more SELECT statements vertically — stacking
            rows on top of each other rather than joining columns side by side. Two rules apply to
            both:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Each SELECT must return the <strong>same number of columns</strong></li>
            <li>Corresponding columns must have <strong>compatible data types</strong> (e.g. both numeric, or both text)</li>
            <li>Final column names come from the <strong>first</strong> SELECT statement</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT customer_name, email FROM online_customers
UNION
SELECT customer_name, email FROM store_customers;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            UNION — Removes Duplicate Rows
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>UNION</code> combines the result sets and then removes any rows that are exact
            duplicates across the whole combined set:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- online_customers has: ('Aisha Khan', 'aisha@example.com')
-- store_customers has:   ('Aisha Khan', 'aisha@example.com')  -- same person, both channels

SELECT customer_name, email FROM online_customers
UNION
SELECT customer_name, email FROM store_customers;

-- Result: 'Aisha Khan' appears only ONCE, even though she is
-- in both source tables`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            To eliminate duplicates, the database must compare every row against every other row —
            typically by sorting the combined result set or building a hash table of rows seen so
            far. This is exactly the extra work that UNION ALL skips.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            UNION ALL — Keeps Every Row, Including Duplicates
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>UNION ALL</code> simply appends the result sets one after another. No comparison,
            no deduplication — every row from every SELECT is kept:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT customer_name, email FROM online_customers
UNION ALL
SELECT customer_name, email FROM store_customers;

-- Result: 'Aisha Khan' appears TWICE — once from each table`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This matters for correctness, not just speed. If you are summing amounts across two
            tables, UNION ALL is usually what you actually want — UNION could silently drop a
            legitimate row that happens to look identical to another one:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Two separate $50 payments that happen to share the same
-- customer_id, amount, and payment_date would be MERGED into
-- one row by UNION -- silently losing a real payment.

SELECT customer_id, amount, payment_date FROM card_payments
UNION ALL
SELECT customer_id, amount, payment_date FROM bank_payments;

-- UNION ALL preserves both real payments correctly.`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Performance: Why UNION ALL Is Faster
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            UNION ALL is almost always faster than UNION on the same data, because of the extra
            work UNION does internally:
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li><strong>UNION ALL</strong> — reads rows from each SELECT and streams them straight into the output. No extra pass over the data.</li>
            <li><strong>UNION</strong> — reads rows from each SELECT, then performs a sort or builds a hash set over the entire combined result to detect and drop duplicates, before returning the final rows.</li>
            <li>The deduplication cost in UNION grows with the size of the combined result set — the bigger the tables, the bigger the performance gap.</li>
          </ol>
          <p className="small" style={{ marginBottom: 14 }}>
            The rule of thumb: if you already know the result sets cannot overlap (for example, two
            tables partitioned by region, or you have already filtered out matches), use{' '}
            <code>UNION ALL</code>. Only pay for deduplication with <code>UNION</code> when
            duplicates are actually possible and unwanted.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Ordering and Filtering a UNION Result
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            ORDER BY and LIMIT apply to the final combined result, not to each individual SELECT.
            Put them after the last SELECT statement:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT product_name, price, 'clearance' AS source FROM clearance_items
UNION ALL
SELECT product_name, price, 'regular' AS source FROM regular_items
ORDER BY price DESC
LIMIT 10;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Adding a literal label column like <code>'clearance' AS source</code> is a common
            pattern — it lets you tell which original table each row came from after the results
            are merged together.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick Decision Guide
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Combining sales from two regional tables into one report, no risk of overlap → <strong>UNION ALL</strong></li>
            <li>Merging a mailing list from two sources where the same email might appear in both → <strong>UNION</strong></li>
            <li>Need every transaction row preserved for an accurate SUM/COUNT → <strong>UNION ALL</strong></li>
            <li>Building a distinct list of unique product categories across two catalogs → <strong>UNION</strong></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between UNION and UNION ALL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              UNION combines the results of two or more SELECT statements and removes duplicate rows from the combined result. UNION ALL combines the results the same way but keeps every row, including duplicates. Use UNION ALL when you know there are no duplicates or you do not care about them.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why is UNION ALL faster than UNION?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              UNION ALL is faster because it simply appends the result sets together with no extra work. UNION has to additionally sort or hash the combined rows to find and remove duplicates, which adds CPU and memory overhead, especially on large result sets.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Do the columns have to match in a UNION query?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Every SELECT statement combined with UNION or UNION ALL must return the same number of columns, and the data types of corresponding columns must be compatible. Column names in the final result come from the first SELECT statement.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the combined query you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/sql-subqueries-vs-joins-explained">SQL Subqueries vs JOINs Explained</Link></li>
              <li><Link href="/blog/sql-group-by-having-clause-explained">SQL GROUP BY and HAVING Clause Explained</Link></li>
              <li><Link href="/blog/sql-interview-questions-complete-guide">SQL Interview Questions: The Complete Guide</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
