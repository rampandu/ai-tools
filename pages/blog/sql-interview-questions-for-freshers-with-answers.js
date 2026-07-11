// pages/blog/sql-interview-questions-for-freshers-with-answers.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlInterviewQuestionsForFreshers() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Interview Questions for Freshers with Answers',
        item: 'https://dev-brains-ai.com/blog/sql-interview-questions-for-freshers-with-answers',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Interview Questions for Freshers with Answers',
    description:
      'A practical set of beginner-level SQL interview questions and answers covering SELECT basics, JOIN types, keys, normalization, and DELETE vs TRUNCATE vs DROP.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-interview-questions-for-freshers-with-answers',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What SQL topics should a fresher prepare for an interview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Freshers should be comfortable with SELECT queries and filtering, all JOIN types (INNER, LEFT, RIGHT, FULL), primary and foreign keys, basic normalization (1NF, 2NF, 3NF), aggregate functions with GROUP BY, and the differences between DELETE, TRUNCATE, and DROP.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between DELETE, TRUNCATE, and DROP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DELETE removes rows one at a time, can use a WHERE clause, is logged, and can be rolled back. TRUNCATE removes all rows at once, resets auto-increment counters, is minimally logged, and is faster than DELETE. DROP removes the entire table structure along with its data, indexes, and constraints permanently.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can an AI SQL generator help me practice for interviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI free AI SQL Query Builder at dev-brains-ai.com/sql-generator lets you type a question in plain English and see the matching SQL query, which is a fast way to check your own answers while practicing for interviews.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Interview Questions for Freshers with Answers | Dev Brains AI</title>
        <meta
          name="description"
          content="A practical set of beginner-level SQL interview questions and answers covering SELECT basics, JOIN types, keys, normalization, and DELETE vs TRUNCATE vs DROP."
        />
        <meta
          name="keywords"
          content="sql interview questions for freshers, sql interview questions with answers, basic sql interview questions, sql questions for beginners, sql interview prep, entry level sql interview questions"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-interview-questions-for-freshers-with-answers" />
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
              <li aria-current="page">SQL Interview Questions for Freshers</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Interview Questions for Freshers with Answers
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Most entry-level SQL interviews stick to a predictable core: basic querying, JOINs,
            keys, normalization, and the differences between commands that sound similar. This
            guide walks through the questions freshers get asked most often, grouped by topic,
            with clear answers and runnable examples so you can practice out loud before the
            real thing.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            1. SELECT Basics
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <strong>Q: How do you retrieve specific columns from a table with a condition?</strong>
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            Use SELECT with a column list and a WHERE clause. Avoid <code>SELECT *</code> in real
            applications — it pulls more data than needed and breaks if columns are added later.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT first_name, last_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary > 50000
ORDER BY salary DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 8 }}>
            <strong>Q: What is the difference between WHERE and HAVING?</strong>
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            WHERE filters individual rows before grouping happens. HAVING filters groups after
            GROUP BY has aggregated them. You cannot use an aggregate function like{' '}
            <code>COUNT()</code> or <code>SUM()</code> inside WHERE, but you can inside HAVING.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT department, COUNT(*) AS employee_count
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING COUNT(*) > 5;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            2. JOIN Types
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <strong>Q: What are the main types of JOINs and how do they differ?</strong>
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>INNER JOIN</strong> — returns only rows that match in both tables</li>
            <li><strong>LEFT JOIN</strong> — returns all rows from the left table, with NULLs where there is no match in the right table</li>
            <li><strong>RIGHT JOIN</strong> — returns all rows from the right table, with NULLs where there is no match in the left table</li>
            <li><strong>FULL OUTER JOIN</strong> — returns all rows from both tables, with NULLs where there is no match on either side (not directly supported in MySQL; simulate with UNION of LEFT and RIGHT JOIN)</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Customers who have never placed an order
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            3. Primary Keys and Foreign Keys
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <strong>Q: What is the difference between a primary key and a foreign key?</strong>
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            A primary key uniquely identifies each row in its own table — it cannot be NULL and
            cannot repeat. A foreign key is a column in one table that references the primary key
            of another table, enforcing a relationship between the two and preventing orphaned
            rows.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`CREATE TABLE customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT,
  order_total DECIMAL(10,2),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);`}
          </pre>
          <p className="small" style={{ marginBottom: 8 }}>
            <strong>Q: Can a table have more than one foreign key?</strong>
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            Yes. A table can have as many foreign keys as it needs — an <code>orders</code> table
            might reference both a <code>customers</code> table and a <code>shipping_addresses</code>{' '}
            table. It can only have one primary key, though that key can span multiple columns
            (a composite key).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            4. Normalization Basics
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <strong>Q: What are 1NF, 2NF, and 3NF in simple terms?</strong>
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li><strong>1NF (First Normal Form)</strong> — every column holds a single, atomic value; no repeating groups or comma-separated lists in one cell</li>
            <li><strong>2NF (Second Normal Form)</strong> — the table is in 1NF, and every non-key column depends on the whole primary key, not just part of a composite key</li>
            <li><strong>3NF (Third Normal Form)</strong> — the table is in 2NF, and no non-key column depends on another non-key column (no transitive dependency)</li>
          </ol>
          <p className="small" style={{ marginBottom: 14 }}>
            Example: storing <code>customer_city</code> and <code>customer_zip</code> directly on an{' '}
            <code>orders</code> table violates 3NF, because those columns depend on the customer,
            not the order. They belong in the <code>customers</code> table instead.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            5. DELETE vs TRUNCATE vs DROP
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <strong>Q: What is the difference between DELETE, TRUNCATE, and DROP?</strong>
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>DELETE</strong> — removes rows one at a time, supports a WHERE clause, is fully logged (row by row), and can be rolled back inside a transaction</li>
            <li><strong>TRUNCATE</strong> — removes all rows instantly, cannot use WHERE, resets AUTO_INCREMENT, is minimally logged, and is much faster than DELETE for clearing a whole table</li>
            <li><strong>DROP</strong> — deletes the table itself, including its structure, indexes, and constraints, not just the data</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`DELETE FROM orders WHERE order_status = 'cancelled';  -- selective, rollback-able

TRUNCATE TABLE staging_orders;                          -- clears entire table fast

DROP TABLE old_orders_backup;                            -- removes the table entirely`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick Reference: More Common Fresher Questions
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>UNIQUE vs PRIMARY KEY</strong> — a table can have multiple UNIQUE constraints but only one PRIMARY KEY; UNIQUE columns can allow one NULL, PRIMARY KEY cannot allow any NULL</li>
            <li><strong>WHERE vs HAVING with GROUP BY</strong> — WHERE filters before grouping, HAVING filters after</li>
            <li><strong>DISTINCT</strong> — removes duplicate rows from a result set, applied across all selected columns together</li>
            <li><strong>NULL comparisons</strong> — use <code>IS NULL</code> / <code>IS NOT NULL</code>, never <code>= NULL</code>, since NULL is not equal to anything, including itself</li>
            <li><strong>Aggregate functions</strong> — COUNT, SUM, AVG, MIN, MAX all ignore NULL values except COUNT(*), which counts every row</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What SQL topics should a fresher prepare for an interview?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Freshers should be comfortable with SELECT queries and filtering, all JOIN types (INNER, LEFT, RIGHT, FULL), primary and foreign keys, basic normalization (1NF, 2NF, 3NF), aggregate functions with GROUP BY, and the differences between DELETE, TRUNCATE, and DROP.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between DELETE, TRUNCATE, and DROP?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              DELETE removes rows one at a time, can use a WHERE clause, is logged, and can be rolled back. TRUNCATE removes all rows at once, resets auto-increment counters, is minimally logged, and is faster than DELETE. DROP removes the entire table structure along with its data, indexes, and constraints permanently.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can an AI SQL generator help me practice for interviews?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI free AI SQL Query Builder lets you type a question in plain English and see the matching SQL query, which is a fast way to check your own answers while practicing for interviews.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Type a question in plain English and see the matching SQL query instantly — great for interview practice.
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
              <li><Link href="/blog/top-sql-interview-questions-tcs-infosys-wipro">Top SQL Interview Questions — TCS, Infosys, Wipro</Link></li>
              <li><Link href="/blog/sql-join-interview-questions-with-examples">SQL JOIN Interview Questions with Examples</Link></li>
              <li><Link href="/blog/sql-normalization-explained-1nf-2nf-3nf">SQL Normalization Explained — 1NF, 2NF, 3NF</Link></li>
              <li><Link href="/blog/50-sql-queries-for-freshers-in-india">50 SQL Queries for Freshers in India</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
