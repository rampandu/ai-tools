// pages/blog/sql-cte-common-table-expressions-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlCteCommonTableExpressionsGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL CTE (Common Table Expressions) Guide',
        item: 'https://dev-brains-ai.com/blog/sql-cte-common-table-expressions-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL CTE (Common Table Expressions) Guide — The WITH Clause Explained',
    description:
      'Learn SQL Common Table Expressions (CTEs) with the WITH clause: why they beat nested subqueries for readability, multiple CTEs, and a simple recursive CTE example.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-cte-common-table-expressions-guide',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a CTE in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A CTE (Common Table Expression) is a named, temporary result set defined with a WITH clause that you can reference later in the same query, like SELECT, INSERT, UPDATE, or DELETE. It exists only for the duration of that single statement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are CTEs faster than subqueries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not necessarily. In most modern databases (PostgreSQL 12+, MySQL 8+), the query optimizer treats a CTE much like a subquery and performance is usually similar. The main benefit of a CTE is readability and reuse, not guaranteed speed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I write CTE queries using an AI SQL generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI free AI SQL Query Builder at dev-brains-ai.com/sql-generator can generate WITH clause queries from a plain English description — describe the intermediate result you need named, and it will structure the CTE for you.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL CTE (Common Table Expressions) Guide — The WITH Clause Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn SQL Common Table Expressions (CTEs) with the WITH clause: why they beat nested subqueries for readability, multiple CTEs, and a recursive CTE example."
        />
        <meta
          name="keywords"
          content="sql cte, common table expressions, sql with clause, recursive cte, sql cte example, cte vs subquery, mysql cte, postgresql cte"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-cte-common-table-expressions-guide" />
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
              <li aria-current="page">SQL CTE Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL CTE (Common Table Expressions) Guide — The WITH Clause Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Nested subqueries get hard to read fast — three levels deep, and even the person who
            wrote the query struggles to follow it a week later. Common Table Expressions (CTEs),
            introduced with the <code>WITH</code> clause, solve this by letting you name an
            intermediate result set and reference it like a temporary table. This guide covers the
            syntax, why CTEs improve readability, chaining multiple CTEs, and a simple recursive
            CTE example.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What is a CTE?
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A CTE is a named temporary result set defined with <code>WITH name AS (...)</code>
            that exists only for the duration of the query that follows it. It is not stored on
            disk and is not visible to other queries — think of it as giving a subquery a label
            so you can reference it (even multiple times) later in the same statement.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH high_value_orders AS (
  SELECT customer_id, order_total
  FROM orders
  WHERE order_total > 500
)
SELECT customer_id, COUNT(*) AS big_order_count
FROM high_value_orders
GROUP BY customer_id
ORDER BY big_order_count DESC;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            CTE vs Nested Subquery — Why Readability Wins
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The same query written as a nested subquery works identically, but reads top-down in
            reverse — you have to find the innermost query first to understand what the outer
            query is filtering on:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Same result, as a subquery
SELECT customer_id, COUNT(*) AS big_order_count
FROM (
  SELECT customer_id, order_total
  FROM orders
  WHERE order_total > 500
) AS high_value_orders
GROUP BY customer_id
ORDER BY big_order_count DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            With a CTE, you read the query in the order you'd explain it out loud: "first define
            high-value orders, then count them per customer." This matters even more once you
            have several steps chained together.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Chaining Multiple CTEs
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            You can define several CTEs in one <code>WITH</code> clause, separated by commas, and
            each later CTE can reference the ones defined before it. This turns a multi-step
            analysis into a readable pipeline:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH monthly_sales AS (
  SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    SUM(order_total) AS total_sales
  FROM orders
  GROUP BY DATE_FORMAT(order_date, '%Y-%m')
),
avg_monthly AS (
  SELECT AVG(total_sales) AS avg_sales
  FROM monthly_sales
)
SELECT m.month, m.total_sales, a.avg_sales
FROM monthly_sales m
CROSS JOIN avg_monthly a
WHERE m.total_sales > a.avg_sales
ORDER BY m.month;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This finds every month where sales beat the overall average — without a single nested
            subquery. In PostgreSQL, use <code>TO_CHAR(order_date, 'YYYY-MM')</code> instead of
            <code> DATE_FORMAT</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Simple Recursive CTE
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            CTEs can also be recursive — referencing themselves to walk through hierarchical data
            like org charts, category trees, or number sequences. A recursive CTE has two parts
            joined by <code>UNION ALL</code>: an anchor member (the starting point) and a
            recursive member (which refers back to the CTE name).
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Generate the numbers 1 through 5
WITH RECURSIVE counter AS (
  SELECT 1 AS n              -- anchor member
  UNION ALL
  SELECT n + 1                -- recursive member
  FROM counter
  WHERE n < 5
)
SELECT n FROM counter;
-- Result: 1, 2, 3, 4, 5`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This same pattern scales to a manager-to-employee reporting chain: the anchor selects
            top-level managers (<code>WHERE manager_id IS NULL</code>), and the recursive member
            joins <code>employees</code> back to <code>counter</code> on
            <code> manager_id = counter.id</code>. MySQL requires 8.0+ for
            <code> WITH RECURSIVE</code>; PostgreSQL has supported it since version 8.4.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When to Use a CTE
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>You need to reference the same derived result set more than once in a query</li>
            <li>The query has several logical steps and reads better top-down</li>
            <li>You are replacing a deeply nested subquery that is hard to debug</li>
            <li>You need recursion to walk a tree or hierarchy</li>
            <li>You want to break a complex report into named, testable pieces</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            CTE vs Temporary Table vs View
          </h2>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li><strong>CTE</strong> — scoped to a single statement, not indexed, not reusable across queries</li>
            <li><strong>Temporary table</strong> — persists for the session, can be indexed, useful when the same result is queried many times</li>
            <li><strong>View</strong> — a saved, reusable query definition available to any query, but still recomputed each time it's used (unless materialized)</li>
          </ol>
          <p className="small" style={{ marginBottom: 14 }}>
            Reach for a CTE first for readability. Move to a temporary table only if you notice
            the optimizer re-evaluating the same CTE multiple times in a way that hurts performance
            on large data.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a CTE in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A CTE (Common Table Expression) is a named, temporary result set defined with a WITH clause that you can reference later in the same query, like SELECT, INSERT, UPDATE, or DELETE. It exists only for the duration of that single statement.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Are CTEs faster than subqueries?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Not necessarily. In most modern databases (PostgreSQL 12+, MySQL 8+), the query optimizer treats a CTE much like a subquery and performance is usually similar. The main benefit of a CTE is readability and reuse, not guaranteed speed.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I write CTE queries using an AI SQL generator?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI free AI SQL Query Builder can generate WITH clause queries from a plain English description — describe the intermediate result you need named, and it will structure the CTE for you.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the multi-step query you need in plain English and get a clean, readable CTE instantly.
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
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
              <li><Link href="/blog/sql-query-for-hierarchical-data-recursive-cte">SQL Query for Hierarchical Data with Recursive CTE</Link></li>
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL Guide</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
