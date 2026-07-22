// pages/blog/sql-case-statement-examples.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlCaseStatementExamples() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL CASE Statement Examples — Conditional Logic in SELECT',
        item: 'https://dev-brains-ai.com/blog/sql-case-statement-examples',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL CASE Statement Examples: 4 Real-World Patterns',
    description:
      'Four copy-paste SQL CASE WHEN examples — age bands, order status labels, letter grades, and conditional SUM aggregation — plus CASE inside ORDER BY.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-case-statement-examples',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does CASE WHEN do in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CASE WHEN is a conditional expression that evaluates a list of conditions in order and returns a value for the first condition that is true, similar to if/else logic in programming languages. It can be used inside SELECT, WHERE, ORDER BY, and GROUP BY.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between simple CASE and searched CASE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A simple CASE compares one expression against a list of exact values, like CASE status WHEN 1 THEN "active" END. A searched CASE evaluates independent boolean conditions, like CASE WHEN age < 18 THEN "minor" END, which allows ranges, comparisons, and multiple columns.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use CASE WHEN for conditional aggregation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. A common pattern is SUM(CASE WHEN condition THEN 1 ELSE 0 END) to count rows matching a condition, or SUM(CASE WHEN status = "paid" THEN amount ELSE 0 END) to total only matching rows, all within a single GROUP BY query instead of separate queries.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL CASE Statement Examples: 4 Real-World Patterns | Dev Brains AI</title>
        <meta
          name="description"
          content="Four copy-paste SQL CASE WHEN examples — age bands, order status labels, letter grades, and conditional SUM aggregation — plus CASE inside ORDER BY."
        />
        <meta
          name="keywords"
          content="sql case statement, case when sql, sql case when example, conditional logic sql, sql if else, case statement sql select, conditional aggregation sql, case in order by sql"
        />
        <meta property="og:title" content="SQL CASE Statement Examples: 4 Real-World Patterns" />
        <meta property="og:description" content="Four copy-paste SQL CASE WHEN examples — age bands, order status labels, letter grades, and conditional SUM aggregation — plus CASE inside ORDER BY." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-case-statement-examples" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-case-statement-examples" />
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
              <li aria-current="page">SQL CASE Statement Examples</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL CASE Statement Examples — Conditional Logic in SELECT
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            SQL is a declarative language, but you still need if/else logic constantly — labeling
            an order as "shipped" or "pending", grouping customers into age bands, or converting a
            numeric score into a letter grade. The <code>CASE WHEN</code> expression is how SQL
            does conditional logic inside a query. This guide covers the syntax and walks through
            practical, copy-paste-ready examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            CASE WHEN Syntax
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A CASE expression checks a list of conditions in order and returns the value for the
            first one that matches. If none match, it falls back to the optional ELSE branch, or
            NULL if ELSE is omitted:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ELSE default_result
END`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            SQL also supports a shorter "simple CASE" form when you are comparing one expression
            against exact values:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Simple CASE: compares order_status directly
CASE order_status
  WHEN 'P' THEN 'Pending'
  WHEN 'S' THEN 'Shipped'
  WHEN 'D' THEN 'Delivered'
  ELSE 'Unknown'
END AS status_label`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Example 1: Age Bands
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The "searched CASE" form supports ranges and comparisons, which is what you need for
            bucketing continuous values like age:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  customer_name,
  age,
  CASE
    WHEN age < 18 THEN 'Minor'
    WHEN age BETWEEN 18 AND 25 THEN '18-25'
    WHEN age BETWEEN 26 AND 40 THEN '26-40'
    WHEN age BETWEEN 41 AND 60 THEN '41-60'
    ELSE '60+'
  END AS age_band
FROM customers;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Conditions are checked top to bottom and stop at the first match, so put the most
            specific or most restrictive condition first when ranges could overlap.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Example 2: Order Status Labels
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  order_id,
  order_total,
  shipped_date,
  CASE
    WHEN shipped_date IS NOT NULL THEN 'Shipped'
    WHEN order_total = 0 THEN 'Cancelled'
    WHEN created_at < NOW() - INTERVAL '3 day' THEN 'Delayed'
    ELSE 'Processing'
  END AS status_label
FROM orders;

-- MySQL date arithmetic equivalent:
-- WHEN created_at < NOW() - INTERVAL 3 DAY THEN 'Delayed'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Example 3: Grading Scores
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  student_name,
  score,
  CASE
    WHEN score >= 90 THEN 'A'
    WHEN score >= 80 THEN 'B'
    WHEN score >= 70 THEN 'C'
    WHEN score >= 60 THEN 'D'
    ELSE 'F'
  END AS letter_grade
FROM exam_results
ORDER BY score DESC;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Example 4: Conditional Aggregation with SUM and CASE
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Combining CASE with an aggregate function lets you compute multiple conditional totals
            in a single query, avoiding several separate queries:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  region,
  COUNT(*) AS total_orders,
  SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_orders,
  SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END) AS refunded_orders,
  SUM(CASE WHEN status = 'paid' THEN order_total ELSE 0 END) AS paid_revenue
FROM orders
GROUP BY region
ORDER BY paid_revenue DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This "pivot with CASE" pattern turns row values into separate summary columns and is
            one of the most common uses of CASE in reporting queries.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using CASE in WHERE and ORDER BY
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>CASE can drive custom sort order — put priority statuses first regardless of alphabetical order</li>
            <li>CASE can appear in WHERE, though a plain condition is usually simpler and more index-friendly</li>
            <li>CASE cannot span multiple SELECT statements — each query needs its own CASE expression</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Custom sort: show 'Urgent' orders first, then 'Normal', then 'Low'
SELECT order_id, priority, order_total
FROM orders
ORDER BY
  CASE priority
    WHEN 'Urgent' THEN 1
    WHEN 'Normal' THEN 2
    WHEN 'Low' THEN 3
    ELSE 4
  END,
  order_total DESC;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What does CASE WHEN do in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              CASE WHEN is a conditional expression that evaluates a list of conditions in order and returns a value for the first condition that is true, similar to if/else logic in programming languages. It can be used inside SELECT, WHERE, ORDER BY, and GROUP BY.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between simple CASE and searched CASE?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A simple CASE compares one expression against a list of exact values, like CASE status WHEN 1 THEN "active" END. A searched CASE evaluates independent boolean conditions, like CASE WHEN age &lt; 18 THEN "minor" END, which allows ranges, comparisons, and multiple columns.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I use CASE WHEN for conditional aggregation?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. A common pattern is SUM(CASE WHEN condition THEN 1 ELSE 0 END) to count rows matching a condition, or SUM(CASE WHEN status = "paid" THEN amount ELSE 0 END) to total only matching rows, all within a single GROUP BY query instead of separate queries.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the conditional logic you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/sql-group-by-having-clause-explained">SQL GROUP BY and HAVING Clause Explained</Link></li>
              <li><Link href="/blog/sql-null-handling-best-practices">SQL NULL Handling Best Practices</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
              <li><Link href="/blog/50-sql-queries-for-freshers-in-india">50 SQL Queries for Freshers in India</Link></li>
              <li><Link href="/blog/top-sql-interview-questions-tcs-infosys-wipro">Top SQL Interview Questions — TCS, Infosys, Wipro</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
