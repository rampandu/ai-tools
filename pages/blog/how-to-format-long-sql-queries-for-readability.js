// pages/blog/how-to-format-long-sql-queries-for-readability.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowToFormatLongSqlQueries() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Format Long SQL Queries for Readability',
        item: 'https://dev-brains-ai.com/blog/how-to-format-long-sql-queries-for-readability',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Format Long SQL Queries: 3-Step Refactor Example',
    description:
      'Turn a 150-line SQL nightmare into readable code: CTEs, one JOIN per line, comment headers, and a real 3-step before/after refactor of a messy query.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-to-format-long-sql-queries-for-readability',
    datePublished: '2026-07-15',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best way to make a long SQL query readable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Break the query into named CTEs where each CTE does one job, put each JOIN and each condition on its own line, extract deeply nested subqueries, and separate logical sections with blank lines and short comments. The goal is that a reader can understand each block in isolation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do CTEs make SQL queries slower?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually not. Modern optimisers in PostgreSQL 12+, SQL Server, and MySQL 8 inline most CTEs, producing the same execution plan as the nested-subquery version. Always check the execution plan for performance-critical queries, but readability is rarely a real performance trade-off today.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to format long SQL queries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Dev Brains AI SQL Formatter at dev-brains-ai.com/sql-formatter formats queries directly in your browser for free — it applies consistent indentation, casing, and line breaks in one click with no signup.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Format Long SQL Queries: 3-Step Refactor Example | Dev Brains AI</title>
        <meta
          name="description"
          content="Turn a 150-line SQL nightmare into readable code: CTEs, one JOIN per line, comment headers, and a real 3-step before/after refactor of a messy query."
        />
        <meta
          name="keywords"
          content="format long sql queries, sql readability, refactor sql query, sql cte formatting, break up complex sql, sql indentation, readable sql, sql formatter online"
        />
        <meta property="og:title" content="Format Long SQL Queries: 3-Step Refactor Example" />
        <meta property="og:description" content="Turn a 150-line SQL nightmare into readable code: CTEs, one JOIN per line, comment headers, and a real 3-step before/after refactor of a messy query." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/how-to-format-long-sql-queries-for-readability" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-to-format-long-sql-queries-for-readability" />
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
              <li aria-current="page">Format Long SQL Queries</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Format Long SQL Queries for Readability
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every team has one: the 150-line report query that everybody is afraid to touch. It
            works — probably — but nobody can say exactly why, and every change feels like defusing
            a bomb. Long queries do not have to be like this. This guide covers five techniques
            that turn sprawling SQL into something a new teammate can read top to bottom, and then
            applies all of them to one messy query in a step-by-step refactor.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Technique 1: Break the Query into CTEs
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The single most powerful readability tool in SQL is the common table expression. A CTE
            gives a name to an intermediate result, so instead of mentally unwinding nested
            subqueries from the inside out, the reader follows a top-to-bottom pipeline:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH active_users AS (
  SELECT id, name, signup_date
  FROM users
  WHERE status = 'active'
),
recent_orders AS (
  SELECT user_id, COUNT(*) AS order_count
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '90 days'
  GROUP BY user_id
)
SELECT au.name, COALESCE(ro.order_count, 0) AS orders_90d
FROM active_users au
LEFT JOIN recent_orders ro ON ro.user_id = au.id;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Each CTE should do one job and have a name that describes its output, not its
            mechanics: <code>recent_orders</code>, not <code>subquery_2</code>. For a full
            introduction, see our <Link href="/blog/sql-cte-common-table-expressions-guide">CTE guide</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Technique 2: One JOIN Per Line, One Condition Per Line
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Horizontal sprawl is the enemy. When three JOINs and their ON conditions share two
            lines, a missing condition is invisible. Give every JOIN its own line, its ON clause
            indented beneath it, and every AND in a WHERE clause its own line:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`FROM orders o
JOIN customers c
  ON c.id = o.customer_id
LEFT JOIN coupons cp
  ON cp.id = o.coupon_id
WHERE o.status = 'completed'
  AND o.order_date >= '2026-01-01'
  AND c.country = 'IN'`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This layout also produces clean diffs: adding a JOIN or a filter changes exactly one
            line, which makes code review dramatically easier.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Technique 3: Extract Deeply Nested Subqueries
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A subquery inside a subquery inside a WHERE clause forces the reader to hold three
            contexts at once. If a subquery is more than a couple of lines, promote it to a CTE.
            If it appears twice, promoting it also removes duplication — one definition, referenced
            by name wherever needed.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Nesting depth of 1 (a simple IN or EXISTS) is usually fine inline.</li>
            <li>Nesting depth of 2 or more is a strong signal to extract.</li>
            <li>Derived tables in the FROM clause (<code>FROM (SELECT ...) x</code>) almost always read better as CTEs.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Technique 4: Comment Headers and Vertical Whitespace
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Long queries deserve the same structure as long functions: a short header explaining
            purpose and gotchas, plus blank lines between logical sections. Comments should say
            <em> why</em>, not restate the SQL:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Monthly revenue report per region.
-- Note: refunds are excluded here; finance handles them separately.

WITH completed_orders AS (
  ...
),

-- Refunded orders are excluded above, so this is gross revenue.
regional_totals AS (
  ...
)

SELECT ...`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Worked Example: Refactoring a Messy Query
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here is a condensed version of the kind of query that accumulates in every reporting
            codebase — everything inline, everything on as few lines as possible:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`select c.region, count(distinct o.id) as orders, sum(o.total) as revenue,
(select avg(total) from orders where status='completed') as global_avg
from orders o join customers c on c.id=o.customer_id
where o.status='completed' and o.id not in (select order_id from refunds)
and c.id in (select customer_id from subscriptions where plan!='free')
group by c.region having sum(o.total)>10000 order by revenue desc;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Step 1 — name the filters as CTEs.</strong> The two IN/NOT IN subqueries are
            really business concepts: refunded orders and paying customers. Give them names.
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Step 2 — reshape the main query.</strong> One JOIN per line, one condition per
            line, uppercase keywords (or lowercase — just be consistent, as we discuss in{' '}
            <Link href="/blog/sql-keywords-uppercase-or-lowercase">the casing debate</Link>).
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Step 3 — add a header and whitespace.</strong> The result:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Revenue by region for paying customers, excluding refunded orders.
-- Only regions above 10k revenue are included (reporting threshold).

WITH refunded_orders AS (
  SELECT order_id
  FROM refunds
),

paying_customers AS (
  SELECT customer_id
  FROM subscriptions
  WHERE plan <> 'free'
),

global_avg AS (
  SELECT AVG(total) AS avg_order_value
  FROM orders
  WHERE status = 'completed'
)

SELECT
  c.region,
  COUNT(DISTINCT o.id)     AS orders,
  SUM(o.total)             AS revenue,
  g.avg_order_value        AS global_avg
FROM orders o
JOIN customers c
  ON c.id = o.customer_id
CROSS JOIN global_avg g
WHERE o.status = 'completed'
  AND o.id NOT IN (SELECT order_id FROM refunded_orders)
  AND c.id IN (SELECT customer_id FROM paying_customers)
GROUP BY c.region, g.avg_order_value
HAVING SUM(o.total) > 10000
ORDER BY revenue DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The refactored version is longer in lines but far shorter in reading time. Each block
            answers one question, and a reviewer can verify the refund exclusion or the paying
            customer filter without touching the rest of the query.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the best way to make a long SQL query readable?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Break the query into named CTEs where each CTE does one job, put each JOIN and each condition on its own line, extract deeply nested subqueries, and separate logical sections with blank lines and short comments. The goal is that a reader can understand each block in isolation.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Do CTEs make SQL queries slower?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Usually not. Modern optimisers in PostgreSQL 12+, SQL Server, and MySQL 8 inline most CTEs, producing the same execution plan as the nested-subquery version. Always check the execution plan for performance-critical queries, but readability is rarely a real performance trade-off today.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to format long SQL queries?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. The <Link href="/sql-formatter">Dev Brains AI SQL Formatter</Link> formats queries directly in your browser for free — it applies consistent indentation, casing, and line breaks in one click with no signup.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free SQL Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste your messiest 100-line query and get clean indentation, consistent casing, and
              one-clause-per-line layout instantly. Runs in your browser — no signup, no cost.
            </p>
            <Link href="/sql-formatter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open SQL Formatter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/sql-formatting-best-practices-style-guide">SQL Formatting Best Practices: A Style Guide</Link></li>
              <li><Link href="/blog/sql-cte-common-table-expressions-guide">SQL CTEs (Common Table Expressions) Guide</Link></li>
              <li><Link href="/blog/sql-keywords-uppercase-or-lowercase">SQL Keywords: Uppercase or Lowercase?</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/sql-code-review-checklist">SQL Code Review Checklist</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
