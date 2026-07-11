import Head from 'next/head';
import Link from 'next/link';

export default function SqlQueriesAskedInAccentureCapgeminiInterviews() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Queries Asked in Accenture & Capgemini Interviews',
        item: 'https://dev-brains-ai.com/blog/sql-queries-asked-in-accenture-capgemini-interviews',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Queries Asked in Accenture & Capgemini Interviews',
    description:
      'Frequently asked SQL questions in Accenture, Capgemini, and similar service company interviews, with worked query examples and explanations.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-queries-asked-in-accenture-capgemini-interviews',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What kind of SQL questions does Accenture ask in interviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Accenture typically asks about JOIN types, subqueries, aggregate functions, primary and foreign keys, and simple query-writing tasks like finding duplicate or top N records.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Capgemini ask SQL in the technical interview or written test?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both. Capgemini often includes SQL multiple-choice questions in the written or online assessment, and follows up with query-writing or conceptual SQL questions in the technical interview round.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between WHERE and HAVING, and is it commonly asked?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, this is a very common question. WHERE filters individual rows before grouping, while HAVING filters groups after GROUP BY has been applied, typically used with aggregate functions like COUNT or SUM.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Queries Asked in Accenture & Capgemini Interviews | Dev Brains AI</title>
        <meta
          name="description"
          content="Frequently asked SQL questions in Accenture, Capgemini, and similar service company interviews, with worked query examples and explanations."
        />
        <meta
          name="keywords"
          content="sql interview questions accenture, sql interview questions capgemini, accenture sql interview, capgemini technical interview sql, service company sql interview"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-queries-asked-in-accenture-capgemini-interviews" />
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
              <li aria-current="page">SQL Queries Asked in Accenture &amp; Capgemini Interviews</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Queries Asked in Accenture &amp; Capgemini Interviews
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Accenture and Capgemini run high-volume technical interviews for both freshers and experienced hires,
            and SQL is one of the most consistently tested topics. This guide collects the SQL questions candidates
            most frequently report from these interviews, along with clear explanations and working query examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q1: Difference between WHERE and HAVING</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This is asked in nearly every service company interview. WHERE filters rows before any grouping happens
            and cannot use aggregate functions. HAVING filters groups after GROUP BY, and is typically used with
            aggregates like COUNT, SUM, or AVG.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT department, COUNT(*) AS emp_count
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING COUNT(*) > 10;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q2: Write a query to find the Nth highest salary</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A very common follow-up to the "second highest salary" question. Using DENSE_RANK() handles ties correctly:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH ranked_salaries AS (
  SELECT
    name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
  FROM employees
)
SELECT name, salary
FROM ranked_salaries
WHERE salary_rank = 3;  -- change 3 to N`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q3: Primary key vs foreign key vs unique key</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A primary key uniquely identifies each row in a table and cannot be NULL. A foreign key references the
            primary key of another table to enforce referential integrity. A unique key also enforces uniqueness like
            a primary key, but a table can have multiple unique keys and they can allow one NULL value (in most databases).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q4: Write a query to find employees who joined in the last 6 months</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Date filtering questions are common in both Accenture and Capgemini rounds:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL
SELECT name, join_date
FROM employees
WHERE join_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH);

-- PostgreSQL
SELECT name, join_date
FROM employees
WHERE join_date >= CURRENT_DATE - INTERVAL '6 months';`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q5: Common conceptual questions to prepare</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>What are ACID properties, and why do they matter for transactions?</li>
            <li>What is a correlated subquery, and how is it different from a regular subquery?</li>
            <li>Explain indexing and how it improves query performance.</li>
            <li>What is the difference between UNION and UNION ALL?</li>
            <li>What is a self-join, and give an example use case (such as an employee-manager relationship).</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What kind of SQL questions does Accenture ask in interviews?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Accenture typically asks about JOIN types, subqueries, aggregate functions, primary and foreign keys,
              and simple query-writing tasks like finding duplicate or top N records.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does Capgemini ask SQL in the technical interview or written test?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Both. Capgemini often includes SQL multiple-choice questions in the written or online assessment, and
              follows up with query-writing or conceptual SQL questions in the technical interview round.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between WHERE and HAVING, and is it commonly asked?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes, this is a very common question. WHERE filters individual rows before grouping, while HAVING
              filters groups after GROUP BY has been applied, typically used with aggregate functions like COUNT or SUM.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Practice these interview patterns faster — describe a question in plain English and check the generated SQL.
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
              <li><Link href="/blog/top-sql-interview-questions-tcs-infosys-wipro">Top SQL Interview Questions: TCS, Infosys, Wipro</Link></li>
              <li><Link href="/blog/sql-interview-questions-for-freshers-with-answers">SQL Interview Questions for Freshers with Answers</Link></li>
              <li><Link href="/blog/sql-join-interview-questions-with-examples">SQL JOIN Interview Questions with Examples</Link></li>
              <li><Link href="/blog/50-sql-queries-for-freshers-in-india">50 SQL Queries for Freshers in India</Link></li>
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
