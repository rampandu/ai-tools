// pages/blog/sql-window-functions-explained-with-examples.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlWindowFunctionsExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Window Functions Explained with Examples',
        item: 'https://dev-brains-ai.com/blog/sql-window-functions-explained-with-examples',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Window Functions: ROW_NUMBER, RANK, LAG, LEAD',
    description:
      'Learn ROW_NUMBER, RANK, DENSE_RANK, LAG, and LEAD with runnable OVER (PARTITION BY ... ORDER BY ...) examples, including running totals and moving averages.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-window-functions-explained-with-examples',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a window function in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A window function performs a calculation across a set of rows related to the current row, defined by an OVER() clause, without collapsing the rows like GROUP BY does. Each row keeps its own identity while still seeing aggregate or ranking context.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between RANK and DENSE_RANK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RANK() leaves gaps in the ranking sequence after ties (1, 2, 2, 4), while DENSE_RANK() does not leave gaps (1, 2, 2, 3). ROW_NUMBER() ignores ties entirely and assigns a unique sequential number to every row.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I write window functions using an AI SQL generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI free AI SQL Query Builder at dev-brains-ai.com/sql-generator can generate window function queries like ROW_NUMBER and RANK from a plain English description — you just need to review the PARTITION BY and ORDER BY columns for accuracy.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Window Functions: ROW_NUMBER, RANK, LAG, LEAD | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn ROW_NUMBER, RANK, DENSE_RANK, LAG, and LEAD with runnable OVER (PARTITION BY ... ORDER BY ...) examples, including running totals and moving averages."
        />
        <meta
          name="keywords"
          content="sql window functions, row_number sql, rank sql, dense_rank sql, lag lead sql, partition by sql, over clause sql, sql window functions examples"
        />
        <meta property="og:title" content="SQL Window Functions: ROW_NUMBER, RANK, LAG, LEAD" />
        <meta property="og:description" content="Learn ROW_NUMBER, RANK, DENSE_RANK, LAG, and LEAD with runnable OVER (PARTITION BY ... ORDER BY ...) examples, including running totals and moving averages." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-window-functions-explained-with-examples" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-window-functions-explained-with-examples" />
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
              <li aria-current="page">SQL Window Functions</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Window Functions Explained with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Window functions let you run calculations across a set of related rows — rankings,
            running totals, comparisons to the previous or next row — without collapsing your
            result set the way GROUP BY does. They are one of the most useful and most
            misunderstood parts of SQL. This guide breaks down ROW_NUMBER, RANK, DENSE_RANK,
            LAG, and LEAD with practical, runnable examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What is a Window Function?
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A window function performs a calculation "over" a window of rows related to the
            current row, using the <code>OVER()</code> clause. Unlike GROUP BY, which merges
            rows into a single output row per group, a window function keeps every input row
            and simply attaches a calculated value to it.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  employee_name,
  department,
  salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary
FROM employees;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Every employee row is preserved, but each row also shows the average salary of its
            department — something a plain GROUP BY query cannot do in a single pass.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            ROW_NUMBER() — Unique Sequential Numbering
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>ROW_NUMBER()</code> assigns a unique, sequential integer to each row within a
            partition, based on the ORDER BY clause. Even if two rows tie on the ordering
            column, they still get different numbers.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  customer_id,
  order_date,
  order_total,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
FROM orders;

-- Get each customer's most recent order:
SELECT * FROM (
  SELECT
    customer_id,
    order_date,
    order_total,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
  FROM orders
) t
WHERE rn = 1;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This "latest row per group" pattern is one of the most common real-world uses of
            ROW_NUMBER — it replaces slower correlated subqueries.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            RANK() vs DENSE_RANK() — Handling Ties
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            RANK and DENSE_RANK both assign a rank based on ORDER BY, but they treat tied values
            differently:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>RANK()</strong> — leaves a gap after ties: 1, 2, 2, 4, 5</li>
            <li><strong>DENSE_RANK()</strong> — no gap after ties: 1, 2, 2, 3, 4</li>
            <li><strong>ROW_NUMBER()</strong> — ignores ties completely: 1, 2, 3, 4, 5</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  student_name,
  score,
  RANK() OVER (ORDER BY score DESC) AS rnk,
  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rnk
FROM exam_results;

-- score 95, 95, 90, 85
-- RANK:       1, 1, 3, 4
-- DENSE_RANK: 1, 1, 2, 3`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Use DENSE_RANK for "top N distinct score bands" and RANK when you want the gap to
            reflect exactly how many rows tied for a position.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            LAG() and LEAD() — Comparing Rows
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>LAG()</code> looks at a previous row's value, and <code>LEAD()</code> looks at
            a following row's value, within the same partition and order. They are ideal for
            month-over-month comparisons, detecting changes, and calculating differences between
            consecutive rows.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS mom_change
FROM monthly_revenue
ORDER BY month;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Both functions accept an optional offset and default value:
            <code> LAG(revenue, 1, 0)</code> looks one row back and returns 0 instead of NULL if
            there is no previous row.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Running Totals and Moving Averages
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Aggregate functions like SUM and AVG also work as window functions. Combined with a
            frame clause, they can compute running totals or moving averages:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  order_date,
  daily_sales,
  SUM(daily_sales) OVER (ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
  AVG(daily_sales) OVER (ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7day
FROM daily_sales_summary
ORDER BY order_date;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The <code>ROWS BETWEEN ... AND CURRENT ROW</code> frame clause controls exactly which
            rows are included in each calculation — this works the same in MySQL 8+, PostgreSQL,
            and SQL Server.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Window Functions vs GROUP BY — Key Difference
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>GROUP BY</strong> — collapses rows into one row per group, loses row-level detail</li>
            <li><strong>Window functions</strong> — keeps every row, attaches group-level or ranked context to each</li>
            <li>You can use both together: aggregate with GROUP BY first, then rank the aggregated results with a window function in an outer query</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a window function in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A window function performs a calculation across a set of rows related to the current row, defined by an OVER() clause, without collapsing the rows like GROUP BY does. Each row keeps its own identity while still seeing aggregate or ranking context.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between RANK and DENSE_RANK?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              RANK() leaves gaps in the ranking sequence after ties (1, 2, 2, 4), while DENSE_RANK() does not leave gaps (1, 2, 2, 3). ROW_NUMBER() ignores ties entirely and assigns a unique sequential number to every row.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I write window functions using an AI SQL generator?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI free AI SQL Query Builder can generate window function queries like ROW_NUMBER and RANK from a plain English description — you just need to review the PARTITION BY and ORDER BY columns for accuracy.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the ranking or running total you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/sql-cte-common-table-expressions-guide">SQL CTE (Common Table Expressions) Guide</Link></li>
              <li><Link href="/blog/sql-query-for-hierarchical-data-recursive-cte">SQL Query for Hierarchical Data with Recursive CTE</Link></li>
              <li><Link href="/blog/sql-join-interview-questions-with-examples">SQL JOIN Interview Questions with Examples</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
