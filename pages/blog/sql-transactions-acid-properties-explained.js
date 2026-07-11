// pages/blog/sql-transactions-acid-properties-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlTransactionsAcidPropertiesExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Transactions and ACID Properties Explained',
        item: 'https://dev-brains-ai.com/blog/sql-transactions-acid-properties-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Transactions and ACID Properties Explained (With a Bank Transfer Example)',
    description:
      'Learn SQL transactions — BEGIN, COMMIT, ROLLBACK — and the four ACID properties (Atomicity, Consistency, Isolation, Durability) using a real bank-transfer example.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-transactions-acid-properties-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a SQL transaction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A SQL transaction is a group of one or more statements executed as a single unit of work. Either every statement in the transaction succeeds and is saved with COMMIT, or if something fails, every statement is undone with ROLLBACK — the database never ends up partially updated.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do the four ACID properties stand for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ACID stands for Atomicity (all-or-nothing execution), Consistency (the database moves from one valid state to another valid state), Isolation (concurrent transactions do not interfere with each other), and Durability (once committed, changes survive crashes and power loss).',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I forget to COMMIT a transaction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If a transaction is never committed, its changes remain uncommitted and are typically invisible to other connections. If the session disconnects or the database restarts before a COMMIT, those changes are lost and automatically rolled back.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Transactions and ACID Properties Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn SQL transactions — BEGIN, COMMIT, ROLLBACK — and the four ACID properties (Atomicity, Consistency, Isolation, Durability) with a bank-transfer example."
        />
        <meta
          name="keywords"
          content="sql transactions, acid properties sql, begin commit rollback, sql transaction example, atomicity consistency isolation durability, sql start transaction"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-transactions-acid-properties-explained" />
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
              <li aria-current="page">SQL Transactions and ACID Properties</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Transactions and ACID Properties Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every time money moves between two bank accounts, two things must happen together: one
            account is debited and the other is credited. If only one of those steps succeeds, the
            bank's books no longer balance. SQL transactions exist to prevent exactly this kind of
            half-finished update. This guide explains BEGIN, COMMIT, and ROLLBACK, walks through a
            bank-transfer example that goes wrong without transactions, and breaks down the four
            ACID properties that make transactions reliable.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What is a SQL Transaction?
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A transaction groups multiple SQL statements into a single unit of work. The database
            guarantees that either all statements in the group succeed, or none of them do. You
            control the boundaries of a transaction with three commands:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>BEGIN</strong> (or <code>START TRANSACTION</code>) — marks the start of a transaction</li>
            <li><strong>COMMIT</strong> — permanently saves every change made since BEGIN</li>
            <li><strong>ROLLBACK</strong> — undoes every change made since BEGIN, as if it never happened</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL / PostgreSQL
START TRANSACTION;   -- or: BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;

COMMIT;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Bank Transfer Example: What Goes Wrong Without Transactions
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Imagine transferring $500 from Account 1 to Account 2 using two separate, unprotected
            statements:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- No transaction wrapping these two statements
UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;

-- App crashes, network drops, or server restarts right here

UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            If the application crashes between the two statements, Account 1 has already lost $500
            but Account 2 never received it. The $500 has vanished from the system entirely — a
            bug that is very hard to detect and even harder to explain to an auditor. Wrapping the
            same two statements in a transaction eliminates this risk:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;

-- If anything failed above, run ROLLBACK instead of COMMIT:
-- ROLLBACK;

COMMIT;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            If the crash happens before COMMIT runs, the entire transaction is automatically rolled
            back when the connection drops. Account 1 keeps its original balance, and no money is
            lost. A common real-world safeguard is to check business rules before committing:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`START TRANSACTION;

UPDATE accounts SET balance = balance - 500
WHERE account_id = 1 AND balance >= 500;

-- Application checks ROW_COUNT() / affected rows here.
-- If 0 rows were updated (insufficient funds), roll back:
-- ROLLBACK;

UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;

COMMIT;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Four ACID Properties
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            ACID is the set of guarantees that make transactions trustworthy. Every production-grade
            relational database — MySQL (InnoDB), PostgreSQL, SQL Server, Oracle — implements all four:
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>
              <strong>Atomicity</strong> — the transaction is all-or-nothing. The debit and credit
              in the bank example either both happen or neither happens. There is no partial state.
            </li>
            <li>
              <strong>Consistency</strong> — a transaction moves the database from one valid state
              to another valid state, respecting constraints, foreign keys, and triggers. Total
              money in the system before and after the transfer remains the same.
            </li>
            <li>
              <strong>Isolation</strong> — concurrent transactions do not see each other's
              uncommitted changes. If two transfers happen at the same time, each one behaves as if
              it were running alone, preventing race conditions like double-spending.
            </li>
            <li>
              <strong>Durability</strong> — once COMMIT succeeds, the change is permanent, even if
              the server crashes or loses power one millisecond later. The database writes changes
              to a durable transaction log before confirming the commit.
            </li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Isolation Levels and Why They Matter
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Isolation is configurable because stricter isolation costs performance. Most databases
            support four standard levels, from loosest to strictest:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>READ UNCOMMITTED</strong> — can see other transactions' uncommitted changes ("dirty reads")</li>
            <li><strong>READ COMMITTED</strong> — only sees committed data; PostgreSQL's default</li>
            <li><strong>REPEATABLE READ</strong> — same query returns the same rows throughout the transaction; MySQL InnoDB's default</li>
            <li><strong>SERIALIZABLE</strong> — behaves as if transactions ran one at a time, strongest but slowest</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- PostgreSQL
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using SAVEPOINT for Partial Rollbacks
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Within a long transaction, <code>SAVEPOINT</code> lets you roll back part of the work
            without discarding everything:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;

SAVEPOINT before_credit;

UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;

-- Something about the credit step failed validation:
ROLLBACK TO SAVEPOINT before_credit;

-- Retry the credit differently, then:
COMMIT;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a SQL transaction?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A SQL transaction is a group of one or more statements executed as a single unit of work. Either every statement in the transaction succeeds and is saved with COMMIT, or if something fails, every statement is undone with ROLLBACK — the database never ends up partially updated.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What do the four ACID properties stand for?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              ACID stands for Atomicity (all-or-nothing execution), Consistency (the database moves from one valid state to another valid state), Isolation (concurrent transactions do not interfere with each other), and Durability (once committed, changes survive crashes and power loss).
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What happens if I forget to COMMIT a transaction?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              If a transaction is never committed, its changes remain uncommitted and are typically invisible to other connections. If the session disconnects or the database restarts before a COMMIT, those changes are lost and automatically rolled back.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the transaction logic you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL Guide</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/sql-null-handling-best-practices">SQL NULL Handling Best Practices</Link></li>
              <li><Link href="/blog/sql-stored-procedures-vs-functions">SQL Stored Procedures vs Functions</Link></li>
              <li><Link href="/blog/mysql-vs-postgresql-performance-comparison">MySQL vs PostgreSQL Performance Comparison</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
