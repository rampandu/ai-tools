import Head from 'next/head';
import Link from 'next/link';

export default function TopSqlInterviewQuestionsTcsInfosysWipro() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Top SQL Interview Questions: TCS, Infosys, Wipro',
        item: 'https://dev-brains-ai.com/blog/top-sql-interview-questions-tcs-infosys-wipro',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Top SQL Interview Questions: TCS, Infosys, Wipro',
    description:
      'SQL interview preparation for IT services companies like TCS, Infosys, and Wipro — common questions, expected answers, and query walkthroughs.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/top-sql-interview-questions-tcs-infosys-wipro',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What SQL topics do TCS, Infosys, and Wipro focus on in interviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'These companies typically test SELECT fundamentals, JOIN types, GROUP BY with HAVING, subqueries, the difference between DELETE, TRUNCATE, and DROP, and basic normalization concepts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SQL asked in the technical round or only in the coding round?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SQL is usually asked in both — as theory questions in the technical interview round, and sometimes as a hands-on query-writing exercise in the coding or written test round.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I practice SQL interview questions before an IT services interview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Practice writing queries by hand on sample tables covering joins, aggregation, and subqueries, and use an AI SQL generator to check your query against the plain English version of the question.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Top SQL Interview Questions: TCS, Infosys, Wipro | Dev Brains AI</title>
        <meta
          name="description"
          content="SQL interview preparation for IT services companies: TCS, Infosys, and Wipro. Common questions, expected answers, and query walkthroughs."
        />
        <meta
          name="keywords"
          content="sql interview questions tcs, sql interview questions infosys, sql interview questions wipro, sql interview for freshers, it services sql interview"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/top-sql-interview-questions-tcs-infosys-wipro" />
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
              <li aria-current="page">Top SQL Interview Questions: TCS, Infosys, Wipro</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Top SQL Interview Questions: TCS, Infosys, Wipro
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            TCS, Infosys, Wipro, and similar IT services companies ask a fairly predictable set of SQL questions in
            their technical rounds — they favor fundamentals over trick questions. This guide covers the most
            frequently asked questions with expected answers and worked query examples, based on patterns commonly
            reported by candidates in campus and lateral hiring interviews.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q1: What is the difference between DELETE, TRUNCATE, and DROP?</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This is one of the most commonly asked SQL theory questions. DELETE removes rows one at a time, can use a
            WHERE clause, is logged, and can be rolled back inside a transaction. TRUNCATE removes all rows at once,
            resets identity columns, and cannot use WHERE. DROP removes the entire table structure along with its data.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`DELETE FROM employees WHERE department = 'HR';   -- removes matching rows
TRUNCATE TABLE employees;                          -- removes all rows, keeps structure
DROP TABLE employees;                               -- removes table and data entirely`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q2: Write a query to find the second highest salary</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A classic query-writing question. The most portable solution uses a subquery with LIMIT and OFFSET:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            An alternative that also works in older MySQL versions without OFFSET:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q3: Explain the different types of JOIN</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Interviewers expect you to explain INNER JOIN (only matching rows in both tables), LEFT JOIN (all rows
            from the left table plus matches from the right), RIGHT JOIN (all rows from the right table plus matches
            from the left), and FULL OUTER JOIN (all rows from both tables, matched where possible).
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q4: What is normalization? Name the first three normal forms</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Normalization organizes tables to reduce redundancy and prevent update anomalies. First Normal Form (1NF)
            requires atomic column values with no repeating groups. Second Normal Form (2NF) requires 1NF plus every
            non-key column depending on the entire primary key. Third Normal Form (3NF) requires 2NF plus removing
            transitive dependencies, where non-key columns should not depend on other non-key columns.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Q5: Common query-writing round questions</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Write a query to count employees in each department using GROUP BY.</li>
            <li>Find departments with more than 5 employees using GROUP BY and HAVING.</li>
            <li>Write a query using a subquery to find employees earning above the company average salary.</li>
            <li>Write a query to list employee names along with their manager's name using a self-join.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Example of the self-join pattern, which frequently appears in these interviews:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What SQL topics do TCS, Infosys, and Wipro focus on in interviews?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              These companies typically test SELECT fundamentals, JOIN types, GROUP BY with HAVING, subqueries, the
              difference between DELETE, TRUNCATE, and DROP, and basic normalization concepts.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is SQL asked in the technical round or only in the coding round?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              SQL is usually asked in both — as theory questions in the technical interview round, and sometimes as
              a hands-on query-writing exercise in the coding or written test round.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How can I practice SQL interview questions before an IT services interview?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Practice writing queries by hand on sample tables covering joins, aggregation, and subqueries, and use
              an AI SQL generator to check your query against the plain English version of the question.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Practice interview questions faster — describe a query in plain English and compare it against the generated SQL.
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
              <li><Link href="/blog/50-sql-queries-for-freshers-in-india">50 SQL Queries for Freshers in India</Link></li>
              <li><Link href="/blog/sql-interview-questions-for-freshers-with-answers">SQL Interview Questions for Freshers with Answers</Link></li>
              <li><Link href="/blog/sql-join-interview-questions-with-examples">SQL JOIN Interview Questions with Examples</Link></li>
              <li><Link href="/blog/sql-queries-asked-in-accenture-capgemini-interviews">SQL Queries Asked in Accenture &amp; Capgemini Interviews</Link></li>
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL — How AI SQL Generators Work</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
