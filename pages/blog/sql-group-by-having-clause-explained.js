// pages/blog/sql-group-by-having-clause-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlGroupByHavingClauseExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL GROUP BY and HAVING Clause Explained',
        item: 'https://dev-brains-ai.com/blog/sql-group-by-having-clause-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL GROUP BY and HAVING Clause Explained with Examples',
    description:
      'Learn SQL GROUP BY and HAVING with SUM, COUNT, AVG, MIN, and MAX examples. Understand exactly why HAVING filters groups while WHERE filters rows.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-group-by-having-clause-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between WHERE and HAVING?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WHERE filters individual rows before they are grouped, and cannot reference aggregate functions like SUM or COUNT. HAVING filters groups after GROUP BY has run, and is used specifically to filter on aggregate results.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use HAVING without GROUP BY?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Without a GROUP BY clause, the entire result set is treated as a single group, so HAVING can filter based on an aggregate computed over all rows, such as HAVING COUNT(*) > 100.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can an AI SQL generator write GROUP BY and HAVING queries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI free AI SQL Query Builder at dev-brains-ai.com/sql-generator can generate GROUP BY queries with aggregate functions and HAVING filters directly from a plain English description like "customers with more than 5 orders".',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL GROUP BY and HAVING Clause Explained with Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn SQL GROUP BY and HAVING with SUM, COUNT, AVG, MIN, and MAX examples, and why HAVING filters groups while WHERE filters individual rows."
        />
        <meta
          name="keywords"
          content="sql group by, sql having clause, group by having, sql aggregate functions, where vs having, sql count group by, sql sum group by"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-group-by-having-clause-explained" />
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
              <li aria-current="page">GROUP BY and HAVING</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL GROUP BY and HAVING Clause Explained with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            GROUP BY and HAVING are the backbone of SQL reporting — every "total sales by region"
            or "customers with more than 5 orders" query relies on them. They're also one of the
            most common sources of confusion for beginners, especially the difference between
            WHERE and HAVING. This guide clears it up with practical, runnable examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What GROUP BY Does
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>GROUP BY</code> collapses multiple rows that share the same value in one or
            more columns into a single output row, so you can apply an aggregate function
            (SUM, COUNT, AVG, MIN, MAX) to each group separately.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT region, SUM(order_total) AS total_sales
FROM orders
GROUP BY region
ORDER BY total_sales DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Every column in the SELECT list that isn't wrapped in an aggregate function must
            appear in the GROUP BY clause — in standard SQL and PostgreSQL this is enforced;
            MySQL is more lenient by default but it's still best practice to follow this rule.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Five Core Aggregate Functions
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>COUNT(*)</strong> — number of rows in each group</li>
            <li><strong>SUM(column)</strong> — total of a numeric column across the group</li>
            <li><strong>AVG(column)</strong> — average value across the group</li>
            <li><strong>MIN(column)</strong> — smallest value in the group</li>
            <li><strong>MAX(column)</strong> — largest value in the group</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  customer_id,
  COUNT(*) AS order_count,
  SUM(order_total) AS total_spent,
  AVG(order_total) AS avg_order,
  MIN(order_total) AS smallest_order,
  MAX(order_total) AS largest_order
FROM orders
GROUP BY customer_id;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            WHERE vs HAVING — The Key Difference
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>WHERE</code> filters individual rows <em>before</em> grouping happens, so it
            cannot reference an aggregate function. <code>HAVING</code> filters entire groups
            <em> after</em> GROUP BY and the aggregates have been calculated:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- WHERE: filter rows before grouping (only completed orders count)
-- HAVING: filter groups after aggregation (only customers with 5+ orders)
SELECT
  customer_id,
  COUNT(*) AS order_count,
  SUM(order_total) AS total_spent
FROM orders
WHERE status = 'completed'
GROUP BY customer_id
HAVING COUNT(*) >= 5
ORDER BY total_spent DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Trying to write <code>WHERE COUNT(*) &gt;= 5</code> will raise an error in every major
            database — <code>COUNT(*)</code> doesn't exist yet at the point WHERE is evaluated,
            because the rows haven't been grouped.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Logical Order of Execution
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            SQL clauses are written in one order but executed in another. Understanding this order
            explains why WHERE can't see aggregates and HAVING can:
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>FROM — identify the source tables</li>
            <li>WHERE — filter individual rows</li>
            <li>GROUP BY — collapse remaining rows into groups</li>
            <li>HAVING — filter groups based on aggregate values</li>
            <li>SELECT — compute the final output columns</li>
            <li>ORDER BY — sort the final result</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Grouping by Multiple Columns
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            You can group by more than one column to get finer-grained subtotals — for example,
            sales per region per month:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  region,
  MONTH(order_date) AS order_month,
  SUM(order_total) AS monthly_total
FROM orders
GROUP BY region, MONTH(order_date)
HAVING SUM(order_total) > 10000
ORDER BY region, order_month;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            In PostgreSQL, replace <code>MONTH(order_date)</code> with
            <code> EXTRACT(MONTH FROM order_date)</code>. Each unique combination of
            <code> region</code> and <code>order_month</code> becomes its own group.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Combining WHERE and HAVING in One Query
          </h2>
          <p className="small" style={{ marginBottom: 14 }}>
            It's common — and efficient — to use both in the same query: WHERE trims down rows
            early (cheaper), and HAVING filters the smaller set of resulting groups:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT product_id, AVG(rating) AS avg_rating, COUNT(*) AS review_count
FROM reviews
WHERE created_at >= '2025-01-01'
GROUP BY product_id
HAVING AVG(rating) >= 4.0 AND COUNT(*) >= 10
ORDER BY avg_rating DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This finds well-reviewed products (average rating 4.0+) with enough reviews (10+) to
            be statistically meaningful, considering only reviews from 2025 onward.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between WHERE and HAVING?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              WHERE filters individual rows before they are grouped, and cannot reference aggregate functions like SUM or COUNT. HAVING filters groups after GROUP BY has run, and is used specifically to filter on aggregate results.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I use HAVING without GROUP BY?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Without a GROUP BY clause, the entire result set is treated as a single group, so HAVING can filter based on an aggregate computed over all rows, such as HAVING COUNT(*) &gt; 100.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can an AI SQL generator write GROUP BY and HAVING queries?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI free AI SQL Query Builder can generate GROUP BY queries with aggregate functions and HAVING filters directly from a plain English description like "customers with more than 5 orders".
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the grouped report you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
              <li><Link href="/blog/50-sql-queries-for-freshers-in-india">50 SQL Queries for Freshers in India</Link></li>
              <li><Link href="/blog/sql-case-statement-examples">SQL CASE Statement Examples</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
              <li><Link href="/blog/top-sql-interview-questions-tcs-infosys-wipro">Top SQL Interview Questions — TCS, Infosys, Wipro</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
