// pages/blog/sql-code-review-checklist.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlCodeReviewChecklist() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Code Review Checklist',
        item: 'https://dev-brains-ai.com/blog/sql-code-review-checklist',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Code Review Checklist: Correctness, Performance, Safety, and Style',
    description:
      'An actionable SQL code review checklist covering correctness (JOIN types, NULL handling, GROUP BY), performance (SELECT *, missing WHERE, indexes, implicit casts), safety (SQL injection, UPDATE/DELETE without WHERE), and style — with examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-code-review-checklist',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What should I check first when reviewing SQL code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check correctness first: is the JOIN type right, are NULLs handled with IS NULL and COALESCE rather than equality, and does the GROUP BY include every non-aggregated column? A fast wrong query is worse than a slow correct one, so correctness always comes before performance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most dangerous SQL mistake to catch in review?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Two candidates: SQL injection through string concatenation of user input, and UPDATE or DELETE statements without a WHERE clause. The first is a security breach waiting to happen; the second can wipe or corrupt an entire table in one statement. Both should block a merge immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should formatting be part of SQL code review?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Formatting should be automated, not debated in review. Run queries through a formatter such as the free Dev Brains AI SQL Formatter before opening a pull request, so reviewers spend their time on logic, performance, and safety instead of indentation.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Code Review Checklist: Correctness, Performance, Safety | Dev Brains AI</title>
        <meta
          name="description"
          content="Actionable SQL code review checklist: JOIN types, NULL handling, GROUP BY completeness, SELECT *, missing WHERE, index use, implicit casts, SQL injection, and style."
        />
        <meta
          name="keywords"
          content="sql code review checklist, sql review best practices, sql injection review, update without where, sql performance review, group by mistakes, null handling sql, reviewing sql queries"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-code-review-checklist" />
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
              <li aria-current="page">SQL Code Review Checklist</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Code Review Checklist: Correctness, Performance, Safety, and Style
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            SQL slips through code review more easily than application code. It often arrives
            embedded in strings, migrations, or ORM escape hatches, and many reviewers skim it
            because &quot;it&apos;s just a query&quot;. Yet a single bad query can leak data, lock
            a table, or silently return wrong numbers to a dashboard for months. This checklist
            gives you a repeatable order of attack: correctness first, then performance, then
            safety, then style — with concrete examples of what to look for at each stage.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            1. Correctness: Does It Return the Right Rows?
          </h2>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>Is the JOIN type intentional?</strong> An INNER JOIN silently drops rows with no match. If the requirement is &quot;all customers, with orders if any&quot;, it must be a LEFT JOIN.</li>
            <li><strong>Do WHERE conditions on the right table of a LEFT JOIN belong in the ON clause?</strong> A filter like <code>o.status = &apos;paid&apos;</code> in WHERE turns a LEFT JOIN back into an INNER JOIN, because NULL rows fail the condition.</li>
            <li><strong>Are NULLs handled explicitly?</strong> <code>col = NULL</code> is never true; it must be <code>col IS NULL</code>. Watch for NOT IN against a subquery that can return NULL — it returns no rows at all.</li>
            <li><strong>Is the GROUP BY complete?</strong> Every non-aggregated column in the SELECT list must appear in GROUP BY. MySQL&apos;s legacy mode used to pick arbitrary values silently.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- BUG: WHERE filter defeats the LEFT JOIN
SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.status = 'paid';        -- drops customers with no orders

-- FIX: move the filter into the ON clause
SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.id
 AND o.status = 'paid';`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            NULL traps deserve their own review pass — our guide on{' '}
            <Link href="/blog/sql-null-handling-best-practices">SQL NULL handling best practices</Link>{' '}
            covers the full list.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            2. Performance: Will It Scale Past the Test Database?
          </h2>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>SELECT * in production code</strong> — fetches columns nobody uses, breaks when the schema changes, and can prevent index-only scans. Ask for an explicit column list.</li>
            <li><strong>Missing or too-broad WHERE clause</strong> — a query that scans a whole table works fine on 10,000 test rows and times out on 50 million production rows.</li>
            <li><strong>Can an index actually be used?</strong> Wrapping an indexed column in a function — <code>WHERE UPPER(email) = ...</code> or <code>WHERE DATE(created_at) = ...</code> — usually disables the index. Rewrite as a range: created_at &gt;= start AND created_at &lt; end.</li>
            <li><strong>Implicit type casts</strong> — comparing a VARCHAR column to a number (<code>WHERE phone = 9876543210</code>) forces a cast on every row and skips the index. Match the types.</li>
            <li><strong>Leading-wildcard LIKE</strong> — <code>LIKE &apos;%term%&apos;</code> cannot use a normal B-tree index; flag it on large tables.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Index on created_at is unusable:
WHERE DATE(created_at) = '2026-07-01'

-- Index-friendly rewrite:
WHERE created_at >= '2026-07-01'
  AND created_at <  '2026-07-02'`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            When in doubt, ask the author to attach an EXPLAIN plan from a realistic dataset. More
            techniques in <Link href="/blog/sql-optimization-techniques-for-large-tables">SQL optimization for large tables</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            3. Safety: Can It Destroy Data or Leak It?
          </h2>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>SQL injection via string concatenation</strong> — any query built by gluing user input into a string is a blocking issue, full stop. Require parameterised queries or prepared statements.</li>
            <li><strong>UPDATE or DELETE without WHERE</strong> — even when intentional (a full-table backfill), it should be called out in the PR description and ideally wrapped in a transaction with a row-count sanity check.</li>
            <li><strong>Migrations that lock big tables</strong> — adding a NOT NULL column with a default, or building an index without CONCURRENTLY in PostgreSQL, can freeze production traffic.</li>
            <li><strong>Overly broad grants or exposed PII</strong> — does the query return columns (emails, phone numbers) the consuming service does not need?</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- BLOCK THIS: injection via concatenation
query = "SELECT * FROM users WHERE name = '" + userInput + "'";

-- REQUIRE THIS: parameterised query
query = "SELECT id, name FROM users WHERE name = ?";
db.execute(query, [userInput]);

-- BLOCK THIS unless explicitly justified:
DELETE FROM sessions;   -- no WHERE clause`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            4. Style: Is It Readable and Consistent?
          </h2>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li>Consistent keyword casing per your team standard (see <Link href="/blog/sql-keywords-uppercase-or-lowercase">the casing debate</Link>).</li>
            <li>Meaningful table aliases — <code>customers c</code> is fine; <code>t1, t2, t3</code> is not.</li>
            <li>One JOIN and one condition per line for anything non-trivial.</li>
            <li>CTEs instead of deeply nested subqueries in long queries.</li>
            <li>Comments that explain business rules (&quot;refunds excluded per finance policy&quot;), not syntax.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Style feedback is the cheapest to automate: agree on a format, run every query through
            a formatter before the PR, and reviewers never need to comment on layout again.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Checklist in One Place
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`CORRECTNESS
[ ] JOIN types match the requirement (INNER vs LEFT)
[ ] Right-table filters in ON, not WHERE, for LEFT JOINs
[ ] NULLs: IS NULL / COALESCE used; no "= NULL"; NOT IN checked
[ ] GROUP BY lists every non-aggregated column

PERFORMANCE
[ ] No SELECT * in production code
[ ] WHERE clause present and selective
[ ] No functions wrapping indexed columns
[ ] No implicit casts (types match on both sides)
[ ] EXPLAIN plan attached for heavy queries

SAFETY
[ ] Parameterised queries only — no string concatenation
[ ] UPDATE/DELETE have WHERE (or explicit justification)
[ ] Migrations checked for long locks
[ ] No unnecessary PII columns returned

STYLE
[ ] Formatted with the team formatter before review
[ ] Meaningful aliases, comments explain "why"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What should I check first when reviewing SQL code?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Check correctness first: is the JOIN type right, are NULLs handled with IS NULL and COALESCE rather than equality, and does the GROUP BY include every non-aggregated column? A fast wrong query is worse than a slow correct one, so correctness always comes before performance.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the most dangerous SQL mistake to catch in review?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Two candidates: SQL injection through string concatenation of user input, and UPDATE or DELETE statements without a WHERE clause. The first is a security breach waiting to happen; the second can wipe or corrupt an entire table in one statement. Both should block a merge immediately.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should formatting be part of SQL code review?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Formatting should be automated, not debated in review. Run queries through a formatter such as the free <Link href="/sql-formatter">Dev Brains AI SQL Formatter</Link> before opening a pull request, so reviewers spend their time on logic, performance, and safety instead of indentation.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free SQL Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Format every query before it hits review — consistent casing, clean indentation, one
              clause per line. Runs entirely in your browser, no signup.
            </p>
            <Link href="/sql-formatter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open SQL Formatter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/sql-null-handling-best-practices">SQL NULL Handling Best Practices</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/how-to-format-long-sql-queries-for-readability">How to Format Long SQL Queries for Readability</Link></li>
              <li><Link href="/blog/why-consistent-sql-style-matters-for-teams">Why Consistent SQL Style Matters for Teams</Link></li>
              <li><Link href="/blog/sql-explainer-guide-how-it-works">SQL Explainer Guide: How It Works</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
