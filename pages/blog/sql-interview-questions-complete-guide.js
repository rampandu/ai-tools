import Head from 'next/head';
import Link from 'next/link';

export default function SqlInterviewQuestionsCompleteGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Interview Questions: The Complete Guide',
        item: 'https://dev-brains-ai.com/blog/sql-interview-questions-complete-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Interview Questions: The Complete Guide (TCS, Infosys, Wipro, Accenture, Capgemini)',
    description:
      'Every SQL question Indian IT services companies actually ask, organized by topic instead of by company — JOINs, keys, normalization, Nth highest salary, and DELETE vs TRUNCATE vs DROP, with worked queries.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-interview-questions-complete-guide',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do TCS, Infosys, Wipro, Accenture, and Capgemini ask different SQL questions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Mostly no — they draw from the same core pool: JOIN types, WHERE vs HAVING, primary/foreign keys, normalization, DELETE vs TRUNCATE vs DROP, and the Nth highest salary query. TCS/Infosys/Wipro tend to stay closer to fundamentals; Accenture and Capgemini are slightly more likely to add a date-filtering or self-join query on top. Preparing by topic covers all five.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most commonly asked SQL interview question in Indian IT companies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Nth (or second) highest salary query and the WHERE vs HAVING distinction are the two most consistently reported questions across TCS, Infosys, Wipro, Accenture, and Capgemini interviews.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SQL asked in the technical round or the written test?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually both. Written or online assessments often include SQL multiple-choice questions, and the technical interview round follows up with conceptual questions and live query-writing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between WHERE and HAVING?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WHERE filters individual rows before any grouping happens and cannot reference aggregate functions. HAVING filters groups after GROUP BY has run, and is typically used with aggregates like COUNT, SUM, or AVG.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Interview Questions: The Complete Guide | Dev Brains AI</title>
        <meta
          name="description"
          content="Every SQL question TCS, Infosys, Wipro, Accenture, and Capgemini actually ask, organized by topic — JOINs, keys, normalization, Nth highest salary."
        />
        <meta
          name="keywords"
          content="sql interview questions, tcs sql interview questions, infosys sql interview questions, wipro sql interview questions, accenture sql interview questions, capgemini sql interview questions, sql join interview questions, nth highest salary sql"
        />
        <meta property="og:title" content="SQL Interview Questions: The Complete Guide" />
        <meta
          property="og:description"
          content="Every SQL question Indian IT services companies actually ask, organized by topic — JOINs, keys, normalization, Nth highest salary — with worked queries."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-interview-questions-complete-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-interview-questions-complete-guide" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 820, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">SQL Interview Questions Complete Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Interview Questions: The Complete Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Search "SQL interview questions" with a company name in front and you'll find pages for
            TCS, Infosys, Wipro, Accenture, and Capgemini that all cover almost the same ground —
            because they genuinely do ask the same core SQL fundamentals. Rather than repeat one
            question pool five times with a different logo, this guide organizes every commonly
            reported question by <em>topic</em>, with a short note at the end on which companies
            lean on which topics.
          </p>

          <div style={{ marginBottom: 16, padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <strong className="small">Jump to a topic:</strong>
            <ul className="small" style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, columns: 2 }}>
              <li>WHERE vs HAVING</li>
              <li>JOIN types</li>
              <li>Primary vs foreign vs unique key</li>
              <li>Normalization (1NF–3NF)</li>
              <li>DELETE vs TRUNCATE vs DROP</li>
              <li>Nth highest salary</li>
              <li>Self-joins &amp; date filtering</li>
            </ul>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>WHERE vs HAVING</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Asked in nearly every service-company interview. WHERE filters individual rows before
            any grouping happens and cannot reference aggregate functions. HAVING filters groups
            after GROUP BY has run, and is typically paired with COUNT, SUM, or AVG.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT department, COUNT(*) AS emp_count
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING COUNT(*) > 10;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JOIN types</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Interviewers expect you to name all four and then write at least one from memory:{' '}
            <strong>INNER JOIN</strong> (only matching rows in both tables), <strong>LEFT JOIN</strong>{' '}
            (every row from the left table plus matches from the right), <strong>RIGHT JOIN</strong>{' '}
            (every row from the right table plus matches from the left), and{' '}
            <strong>FULL JOIN</strong> (every row from both tables, matched where possible).
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- LEFT JOIN: every customer, even with zero orders
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;   -- customers with NO orders

-- Joining 3 tables
SELECT o.id, c.name, p.product_name
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id;

-- Self-join: employee alongside their manager
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The most common JOIN mistakes in interviews: forgetting the <code>ON</code> condition
            (which silently produces a cross join), picking the wrong join type when the question
            says "including rows with no match," not recognizing when a self-join is the right tool,
            and forgetting <code>GROUP BY</code> after adding an aggregate like <code>COUNT()</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Primary key vs foreign key vs unique key</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A primary key uniquely identifies each row and cannot be NULL. A foreign key references
            another table's primary key to enforce referential integrity. A unique key also enforces
            uniqueness, but a table can have several unique keys, and most databases allow one NULL
            value in a unique column — a distinction that trips people up if they haven't seen it
            asked directly.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Normalization: 1NF, 2NF, 3NF</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Normalization organizes tables to cut redundancy and prevent update anomalies.{' '}
            <strong>1NF</strong> requires atomic column values with no repeating groups.{' '}
            <strong>2NF</strong> is 1NF plus every non-key column depending on the entire primary
            key (matters once you have composite keys). <strong>3NF</strong> is 2NF plus removing
            transitive dependencies — a non-key column should not depend on another non-key column.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>DELETE vs TRUNCATE vs DROP</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            One of the most reliably asked theory questions. DELETE removes rows one at a time, can
            use a WHERE clause, is logged, and can be rolled back inside a transaction. TRUNCATE
            removes every row at once, resets identity/auto-increment columns, and cannot take a
            WHERE clause. DROP removes the entire table structure along with its data.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`DELETE FROM employees WHERE department = 'HR';  -- removes matching rows, logged
TRUNCATE TABLE employees;                        -- removes all rows, keeps structure
DROP TABLE employees;                             -- removes table and data entirely`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Nth (or second) highest salary</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The single most-reported SQL interview question across every company in this guide.
            Three approaches come up, each worth knowing:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- 1. LIMIT/OFFSET — simplest, but doesn't handle tied salaries correctly
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- 2. Correlated subquery — works even on older MySQL without OFFSET
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- 3. DENSE_RANK — the correct choice when ties must rank identically,
--    and the only one that generalizes cleanly to "Nth highest"
WITH ranked AS (
  SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT name, salary FROM ranked WHERE rnk = 3; -- change 3 to N`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>More query-writing round questions</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Find employees who joined in the last 6 months (date filtering — syntax differs between MySQL's <code>DATE_SUB(CURDATE(), INTERVAL 6 MONTH)</code> and PostgreSQL's <code>CURRENT_DATE - INTERVAL '6 months'</code>).</li>
            <li>Count employees per department using GROUP BY.</li>
            <li>Find departments with more than 5 employees using GROUP BY and HAVING together.</li>
            <li>Find employees earning above the company average using a subquery.</li>
            <li>Explain a correlated subquery vs a regular subquery.</li>
            <li>Explain indexing and how it speeds up a query.</li>
            <li>Explain UNION vs UNION ALL.</li>
            <li>Explain the ACID properties and why they matter for transactions.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Which companies focus on what</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The overlap is large, but reported interview patterns lean slightly differently:{' '}
            <strong>TCS, Infosys, and Wipro</strong> stay closest to core fundamentals — SELECT
            basics, JOIN types, GROUP BY/HAVING, subqueries, DELETE/TRUNCATE/DROP, and normalization.{' '}
            <strong>Accenture and Capgemini</strong> ask the same fundamentals but more often layer
            on a date-filtering query or a "common conceptual questions" round covering ACID,
            correlated subqueries, and self-joins. None of the five reliably ask anything outside
            this shared pool — treat company-specific prep as a matter of emphasis, not different
            material.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Do TCS, Infosys, Wipro, Accenture, and Capgemini ask different SQL questions?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Mostly no — they draw from the same core pool: JOIN types, WHERE vs HAVING, primary and
              foreign keys, normalization, DELETE vs TRUNCATE vs DROP, and the Nth highest salary
              query. TCS, Infosys, and Wipro tend to stay closer to fundamentals; Accenture and
              Capgemini are slightly more likely to add a date-filtering or self-join question.
              Preparing by topic covers all five.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the most commonly asked SQL interview question in Indian IT companies?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The Nth (or second) highest salary query and the WHERE vs HAVING distinction are the
              two most consistently reported questions across all five companies.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is SQL asked in the technical round or the written test?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Usually both — written or online assessments often include SQL multiple-choice
              questions, and the technical interview round follows up with conceptual questions and
              live query-writing.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Practice These Patterns with the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe an interview question in plain English and compare your own query against the
              generated one — no signup required.
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
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
              <li><Link href="/blog/sql-normalization-explained-1nf-2nf-3nf">SQL Normalization Explained: 1NF, 2NF, 3NF</Link></li>
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL — How AI SQL Generators Work</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
