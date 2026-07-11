// pages/blog/sql-date-functions-cheat-sheet.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlDateFunctionsCheatSheet() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Date Functions Cheat Sheet — MySQL vs PostgreSQL',
        item: 'https://dev-brains-ai.com/blog/sql-date-functions-cheat-sheet',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Date Functions Cheat Sheet — MySQL vs PostgreSQL Syntax',
    description:
      'A side-by-side cheat sheet of common SQL date functions in MySQL and PostgreSQL: current date/time, adding dates, date differences, formatting, and extracting parts.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-date-functions-cheat-sheet',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I get the current date and time in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In MySQL, use NOW() for the current date and time, or CURDATE() for just the date. In PostgreSQL, use NOW() or CURRENT_TIMESTAMP for date and time, or CURRENT_DATE for just the date.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add days to a date in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In MySQL, use DATE_ADD(order_date, INTERVAL 7 DAY) or the shorthand order_date + INTERVAL 7 DAY. In PostgreSQL, use order_date + INTERVAL \'7 days\', which works because PostgreSQL supports direct arithmetic between a date and an interval.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I format a date in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In MySQL, use DATE_FORMAT(order_date, \'%Y-%m-%d\') with format codes like %Y, %m, %d, %H, %i. In PostgreSQL, use TO_CHAR(order_date, \'YYYY-MM-DD\') with format patterns like YYYY, MM, DD, HH24, MI.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Date Functions Cheat Sheet — MySQL vs PostgreSQL | Dev Brains AI</title>
        <meta
          name="description"
          content="A side-by-side cheat sheet of common SQL date functions in MySQL and PostgreSQL: current date/time, adding dates, date differences, formatting, and extracting parts."
        />
        <meta
          name="keywords"
          content="sql date functions, mysql date functions, postgresql date functions, date_add sql, datediff sql, date_format sql, extract sql, current_date sql"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-date-functions-cheat-sheet" />
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
              <li aria-current="page">SQL Date Functions Cheat Sheet</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Date Functions Cheat Sheet — MySQL vs PostgreSQL
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Date handling is one of the biggest sources of "why doesn't this work" moments when
            switching between databases — the concepts are the same, but the function names and
            syntax differ. This cheat sheet lines up the most common date operations — getting the
            current date, adding or subtracting time, finding the difference between dates,
            formatting output, and extracting parts — side by side for MySQL and PostgreSQL.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Current Date and Time
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL
SELECT NOW();          -- current date + time: 2026-07-11 14:30:00
SELECT CURDATE();      -- current date only: 2026-07-11
SELECT CURTIME();      -- current time only: 14:30:00

-- PostgreSQL
SELECT NOW();                 -- current date + time (with timezone)
SELECT CURRENT_TIMESTAMP;     -- same as NOW()
SELECT CURRENT_DATE;          -- current date only: 2026-07-11
SELECT CURRENT_TIME;          -- current time only`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Adding and Subtracting Dates
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Both databases support interval arithmetic, but the syntax shape differs:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL: add/subtract with DATE_ADD / DATE_SUB, or shorthand +/- INTERVAL
SELECT DATE_ADD(order_date, INTERVAL 7 DAY) FROM orders;
SELECT DATE_SUB(order_date, INTERVAL 1 MONTH) FROM orders;
SELECT order_date + INTERVAL 7 DAY FROM orders;   -- shorthand, same result

-- PostgreSQL: date/timestamp arithmetic with INTERVAL directly
SELECT order_date + INTERVAL '7 days' FROM orders;
SELECT order_date - INTERVAL '1 month' FROM orders;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Difference Between Two Dates
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL: DATEDIFF returns whole days between two dates
SELECT DATEDIFF(shipped_date, order_date) AS days_to_ship
FROM orders;

-- For finer granularity, use TIMESTAMPDIFF
SELECT TIMESTAMPDIFF(HOUR, order_date, shipped_date) AS hours_to_ship
FROM orders;

-- PostgreSQL: subtracting two dates returns an integer number of days
SELECT (shipped_date - order_date) AS days_to_ship
FROM orders;

-- For timestamps, subtraction returns an INTERVAL; extract a unit with EXTRACT
SELECT EXTRACT(EPOCH FROM (shipped_at - order_at)) / 3600 AS hours_to_ship
FROM orders;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Formatting Dates for Display
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL: DATE_FORMAT with %-prefixed codes
SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS iso_date FROM orders;
SELECT DATE_FORMAT(order_date, '%d %b %Y') AS pretty_date FROM orders;
-- Example output: 11 Jul 2026

-- PostgreSQL: TO_CHAR with named format patterns
SELECT TO_CHAR(order_date, 'YYYY-MM-DD') AS iso_date FROM orders;
SELECT TO_CHAR(order_date, 'DD Mon YYYY') AS pretty_date FROM orders;
-- Example output: 11 Jul 2026`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Common format codes side by side:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>4-digit year: MySQL <code>%Y</code> — PostgreSQL <code>YYYY</code></li>
            <li>2-digit month: MySQL <code>%m</code> — PostgreSQL <code>MM</code></li>
            <li>2-digit day: MySQL <code>%d</code> — PostgreSQL <code>DD</code></li>
            <li>24-hour hour: MySQL <code>%H</code> — PostgreSQL <code>HH24</code></li>
            <li>Minutes: MySQL <code>%i</code> — PostgreSQL <code>MI</code></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extracting Parts of a Date
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>EXTRACT()</code> is standard SQL and works in both databases, though MySQL also
            offers dedicated shortcut functions:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL: EXTRACT works, plus dedicated functions
SELECT EXTRACT(YEAR FROM order_date) AS yr FROM orders;
SELECT YEAR(order_date), MONTH(order_date), DAY(order_date) FROM orders;
SELECT DAYNAME(order_date) AS weekday FROM orders;   -- 'Saturday'

-- PostgreSQL: EXTRACT is the standard approach
SELECT EXTRACT(YEAR FROM order_date) AS yr FROM orders;
SELECT EXTRACT(MONTH FROM order_date) AS mo FROM orders;
SELECT TO_CHAR(order_date, 'Day') AS weekday FROM orders;  -- 'Saturday '`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Filtering by Date Range — A Portable Pattern
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Regardless of dialect, comparing against explicit boundary dates is the most reliable
            and index-friendly way to filter by date, since it avoids wrapping the indexed column
            in a function:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Works the same in MySQL and PostgreSQL
SELECT * FROM orders
WHERE order_date >= '2026-01-01'
  AND order_date <  '2026-02-01';

-- Avoid this -- wrapping the column in a function blocks index usage:
-- WHERE YEAR(order_date) = 2026 AND MONTH(order_date) = 1`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick Reference Table
          </h2>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>Current timestamp: MySQL <code>NOW()</code> — PostgreSQL <code>NOW()</code> / <code>CURRENT_TIMESTAMP</code></li>
            <li>Current date only: MySQL <code>CURDATE()</code> — PostgreSQL <code>CURRENT_DATE</code></li>
            <li>Add interval: MySQL <code>DATE_ADD(d, INTERVAL n UNIT)</code> — PostgreSQL <code>d + INTERVAL 'n unit'</code></li>
            <li>Date difference (days): MySQL <code>DATEDIFF(d1, d2)</code> — PostgreSQL <code>d1 - d2</code></li>
            <li>Format for display: MySQL <code>DATE_FORMAT(d, fmt)</code> — PostgreSQL <code>TO_CHAR(d, fmt)</code></li>
            <li>Extract a part: MySQL <code>EXTRACT(unit FROM d)</code> or <code>YEAR(d)</code> — PostgreSQL <code>EXTRACT(unit FROM d)</code></li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I get the current date and time in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In MySQL, use NOW() for the current date and time, or CURDATE() for just the date. In PostgreSQL, use NOW() or CURRENT_TIMESTAMP for date and time, or CURRENT_DATE for just the date.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I add days to a date in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In MySQL, use DATE_ADD(order_date, INTERVAL 7 DAY) or the shorthand order_date + INTERVAL 7 DAY. In PostgreSQL, use order_date + INTERVAL '7 days', which works because PostgreSQL supports direct arithmetic between a date and an interval.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I format a date in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In MySQL, use DATE_FORMAT(order_date, '%Y-%m-%d') with format codes like %Y, %m, %d, %H, %i. In PostgreSQL, use TO_CHAR(order_date, 'YYYY-MM-DD') with format patterns like YYYY, MM, DD, HH24, MI.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the date filter or calculation you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/mysql-vs-postgresql-performance-comparison">MySQL vs PostgreSQL Performance Comparison</Link></li>
              <li><Link href="/blog/sql-query-for-employee-attendance-report">SQL Query for Employee Attendance Report</Link></li>
              <li><Link href="/blog/free-mysql-query-generator-online">Free MySQL Query Generator Online</Link></li>
              <li><Link href="/blog/sql-case-statement-examples">SQL CASE Statement Examples</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
