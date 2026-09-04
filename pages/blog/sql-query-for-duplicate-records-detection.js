import Head from 'next/head';
import Link from 'next/link';

export default function SqlQueryForDuplicateRecordsDetection() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Query to Find and Remove Duplicate Records',
        item: 'https://dev-brains-ai.com/blog/sql-query-for-duplicate-records-detection',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Query to Find and Remove Duplicate Records',
    description:
      'Detect duplicate rows with GROUP BY and HAVING, then safely delete them using ROW_NUMBER() and PARTITION BY, plus a UNIQUE constraint to block repeats.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-query-for-duplicate-records-detection',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find duplicate rows in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use GROUP BY on the columns that define a duplicate, then filter groups with HAVING COUNT(*) greater than 1. This returns each duplicate value along with how many times it appears.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the safest way to delete duplicate records?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The safest method is to use ROW_NUMBER() with a PARTITION BY clause to rank duplicate rows, then delete only the rows where the rank is greater than 1, keeping one copy of each duplicate group.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prevent duplicate rows from being inserted in the future?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Add a UNIQUE constraint or UNIQUE index on the column or column combination that should not repeat. Once the constraint exists, the database rejects any INSERT that would create a duplicate.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Query to Find and Remove Duplicate Records | Dev Brains AI</title>

        <meta
          name="description"
          content="Detect duplicate rows with GROUP BY and HAVING, then safely delete them using ROW_NUMBER() and PARTITION BY, plus a UNIQUE constraint to block repeats."
        />
        <meta
          name="keywords"
          content="sql find duplicate records, sql remove duplicate rows, delete duplicate rows sql, group by having duplicates, row_number delete duplicates, sql duplicate detection"
        />
        <meta property="og:title" content="SQL Query to Find and Remove Duplicate Records" />
        <meta property="og:description" content="Detect duplicate rows with GROUP BY and HAVING, then safely delete them using ROW_NUMBER() and PARTITION BY, plus a UNIQUE constraint to block repeats." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-query-for-duplicate-records-detection" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-query-for-duplicate-records-detection" />
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
              <li aria-current="page">SQL Query for Duplicate Records Detection</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Query to Find and Remove Duplicate Records
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Duplicate rows are one of the most common data quality problems in production databases — they creep in
            from failed retries, missing unique constraints, or bad ETL jobs. This guide covers the exact SQL patterns
            to detect duplicates, count how many exist, and safely remove them in MySQL and PostgreSQL, without
            accidentally deleting rows you meant to keep.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Sample table</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Assume a <code>customers</code> table where the same email address was accidentally inserted more than once:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`customers
------------------------
id      INT PRIMARY KEY
name    VARCHAR(100)
email   VARCHAR(150)
city    VARCHAR(50)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Step 1: Find duplicate values with GROUP BY</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The simplest way to find duplicates is to group rows by the column that should be unique, then filter
            groups that appear more than once using HAVING:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT email, COUNT(*) AS occurrences
FROM customers
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY occurrences DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This returns each duplicated email along with how many times it occurs. It tells you there is a problem,
            but not which specific row IDs are duplicates.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Step 2: Show the actual duplicate rows</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            To see the full rows involved, join the grouped result back to the original table:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT c.*
FROM customers c
JOIN (
  SELECT email
  FROM customers
  GROUP BY email
  HAVING COUNT(*) > 1
) dupes ON c.email = dupes.email
ORDER BY c.email, c.id;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Step 3: Delete duplicates using ROW_NUMBER()</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The safest way to delete duplicates — supported in PostgreSQL, MySQL 8+, and SQL Server — is to rank rows
            within each duplicate group using ROW_NUMBER() and a PARTITION BY clause, keeping only the first occurrence:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY email ORDER BY id ASC
    ) AS rn
  FROM customers
)
DELETE FROM customers
WHERE id IN (
  SELECT id FROM ranked WHERE rn > 1
);`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Here, PARTITION BY email groups rows by the duplicate key, and ORDER BY id ASC keeps the row with the
            smallest id (the oldest record) and marks every later duplicate with rn greater than 1 for deletion.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Step 4: Prevent duplicates from coming back</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Once duplicates are cleaned up, add a UNIQUE constraint so the problem cannot recur:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`ALTER TABLE customers
ADD CONSTRAINT unique_email UNIQUE (email);`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Best practices to avoid re-introducing duplicates:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Always run duplicate-finding SELECT queries before running any DELETE.</li>
            <li>Wrap DELETE statements in a transaction (BEGIN / COMMIT) so you can roll back if the result is wrong.</li>
            <li>Take a backup or export the affected rows before deleting in production.</li>
            <li>Use INSERT ... ON CONFLICT DO NOTHING (PostgreSQL) or INSERT IGNORE (MySQL) once a unique constraint exists.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Generating this query without writing it by hand</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If you would rather describe the problem in plain English — "find duplicate emails in the customers table
            and keep only the oldest row" — an AI SQL generator can produce the ROW_NUMBER() query above instantly,
            adapted to your exact table and column names.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I find duplicate rows in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use GROUP BY on the columns that define a duplicate, then filter groups with HAVING COUNT(*) greater
              than 1. This returns each duplicate value along with how many times it appears.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the safest way to delete duplicate records?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The safest method is to use ROW_NUMBER() with a PARTITION BY clause to rank duplicate rows, then
              delete only the rows where the rank is greater than 1, keeping one copy of each duplicate group.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I prevent duplicate rows from being inserted in the future?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Add a UNIQUE constraint or UNIQUE index on the column or column combination that should not repeat.
              Once the constraint exists, the database rejects any INSERT that would create a duplicate.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe your duplicate-cleanup task in plain English and get a ready-to-run SQL query for MySQL or PostgreSQL.
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
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL — How AI SQL Generators Work</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
              <li><Link href="/blog/free-mysql-query-generator-online">Free MySQL Query Generator Online</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
