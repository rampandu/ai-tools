// pages/blog/sql-keywords-uppercase-or-lowercase.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlKeywordsUppercaseOrLowercase() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Keywords: Uppercase or Lowercase?',
        item: 'https://dev-brains-ai.com/blog/sql-keywords-uppercase-or-lowercase',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Keywords: Uppercase or Lowercase? The Casing Debate Settled',
    description:
      'Should you write SELECT or select? Explore the history of SQL keyword casing, arguments on both sides, what popular style guides recommend, and why consistency matters more than the choice itself.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-keywords-uppercase-or-lowercase',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does SQL keyword casing affect how a query runs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. SQL keywords are case-insensitive in every major database. SELECT, select, and Select all execute identically. Casing is purely a readability and style decision, which is exactly why the debate has lasted so long.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do most SQL style guides recommend for keywords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Older and enterprise-leaning guides such as Joe Celko’s conventions favour uppercase keywords. Newer guides like the GitLab SQL style guide and many dbt community conventions favour lowercase, arguing that syntax highlighting already distinguishes keywords. Both camps agree that one style should be applied consistently across a codebase.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert SQL keyword casing automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a SQL formatter. The free Dev Brains AI SQL Formatter at dev-brains-ai.com/sql-formatter reformats queries in your browser, applying consistent keyword casing and indentation instantly with no signup.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Keywords: Uppercase or Lowercase? The Casing Debate | Dev Brains AI</title>
        <meta
          name="description"
          content="SELECT or select? The history of SQL keyword casing, arguments for both styles, what popular style guides choose, and why consistency beats either option."
        />
        <meta
          name="keywords"
          content="sql keywords uppercase or lowercase, sql capitalization, sql keyword casing, sql style guide, should sql be uppercase, sql formatting conventions, sql best practices"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-keywords-uppercase-or-lowercase" />
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
              <li aria-current="page">SQL Keywords: Uppercase or Lowercase?</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Keywords: Uppercase or Lowercase? The Casing Debate Settled
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Few style arguments in programming have run as long as this one: should SQL keywords be
            written as SELECT, FROM, and WHERE — or as select, from, and where? The database does
            not care. Every major engine treats keywords as case-insensitive, so both versions run
            identically. Yet teams still argue about it in code reviews, and style guides still
            take opposite sides. This article walks through where the uppercase convention came
            from, the honest arguments for each style, what popular guides actually recommend, and
            the one rule that matters more than the choice itself.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Where the Uppercase Convention Came From
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            SQL was designed in the 1970s and spread through terminals, printed manuals, and plain
            monochrome text editors. There was no syntax highlighting. On a green-on-black screen,
            the only way to make keywords visually distinct from table and column names was to
            change their shape — and uppercase letters do that very effectively:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- On a 1980s terminal, this structure is instantly visible:
SELECT customer_name, SUM(order_total)
FROM orders
WHERE order_date >= '1989-01-01'
GROUP BY customer_name;

-- Without casing or colour, this is a wall of words:
select customer_name, sum(order_total)
from orders
where order_date >= '1989-01-01'
group by customer_name;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Textbooks, vendor documentation, and certification exams all adopted uppercase keywords
            because it genuinely was the best readability tool available. Generations of developers
            learned SQL from those materials, and the convention became self-reinforcing: uppercase
            looked &quot;professional&quot; because everything professional used uppercase.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Case for Uppercase Keywords
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Structure survives anywhere</strong> — log files, error messages, plain-text emails, chat messages, and terminal output rarely have highlighting. Uppercase keywords keep the query skeleton visible in all of them.</li>
            <li><strong>Matches most documentation</strong> — official docs for MySQL, PostgreSQL, SQL Server, and Oracle overwhelmingly use uppercase, so your code visually matches the references your team reads.</li>
            <li><strong>Clear keyword/identifier split</strong> — when keywords are uppercase and identifiers are lowercase snake_case, you can tell at a glance that <code>order</code> is a column but ORDER is part of ORDER BY.</li>
            <li><strong>Easier scanning of long scripts</strong> — in a 500-line migration file, uppercase SELECT and UPDATE act like headings you can skim for.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Case for Lowercase Keywords
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Highlighting already does the job</strong> — every modern editor, IDE, and code host colours keywords. The original problem uppercase solved largely no longer exists.</li>
            <li><strong>Less typing friction</strong> — no hammering Shift or toggling Caps Lock while writing exploratory queries. Small, but it adds up over hundreds of queries a week.</li>
            <li><strong>Reads like prose</strong> — some developers find all-caps words visually loud, like scattered shouting in an otherwise calm paragraph.</li>
            <li><strong>Consistent with host languages</strong> — SQL embedded in Python, JavaScript, or Go sits inside codebases that are almost entirely lowercase; lowercase SQL blends in rather than jumping out.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What Popular Style Guides Choose
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The published guides split roughly along generational lines:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Joe Celko&apos;s SQL Programming Style</strong> — the classic enterprise reference: uppercase keywords, lowercase identifiers.</li>
            <li><strong>Simon Holywell&apos;s sqlstyle.guide</strong> — one of the most-cited modern guides: uppercase keywords, aligned rivers of whitespace.</li>
            <li><strong>GitLab&apos;s SQL style guide</strong> — lowercase keywords throughout, on the grounds that highlighting makes uppercase redundant.</li>
            <li><strong>dbt community conventions</strong> — most public dbt projects and linters like SQLFluff default to lowercase, though SQLFluff lets you enforce either with a single config line.</li>
            <li><strong>Most ORMs and query builders</strong> — generated SQL is typically uppercase, so teams that read a lot of generated queries often stick with uppercase for consistency.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice the pattern: guides written for printed books and heterogeneous tooling choose
            uppercase; guides written for modern analytics codebases with enforced linting choose
            lowercase. Both are defensible because both are optimising for the environment their
            authors work in.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Consistency Beats Either Choice
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here is the uncomfortable truth for both camps: mixed casing is worse than either pure
            style. A query like this forces the reader to stop and check whether the inconsistency
            means something:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Mixed casing: was "Select" edited by a different person?
-- Is "LEFT JOIN" uppercase because it is important? (No.)
Select u.name, count(o.id) AS order_count
FROM users u
LEFT JOIN orders o on o.user_id = u.id
where u.status = 'active'
Group By u.name;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Inconsistency creates noise in code review diffs, makes grep-style searching harder,
            and signals that nobody owns the codebase&apos;s standards. The fix is procedural, not
            philosophical:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Pick one style as a team — flip a coin if you must, the decision matters less than making it.</li>
            <li>Write it down in your style guide or CONTRIBUTING file.</li>
            <li>Enforce it with tooling — a formatter or linter — so humans never argue about it in review again.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Teams that automate formatting stop having the debate entirely, which is the real win.
            If you want a deeper look at team-wide standards, see our guide on{' '}
            <Link href="/blog/why-consistent-sql-style-matters-for-teams">why consistent SQL style matters for teams</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Balanced Conclusion
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If your SQL lives mostly in modern editors with highlighting, reviewed on GitHub or
            GitLab, lowercase is a perfectly rational modern default. If your SQL regularly appears
            in logs, plain-text runbooks, terminal sessions, or documentation — or your team simply
            grew up on uppercase — uppercase remains a solid choice that costs nothing. What is not
            rational is letting each developer choose per file. Choose once, automate enforcement,
            and spend your review energy on logic instead of letter shapes.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Does SQL keyword casing affect how a query runs?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. SQL keywords are case-insensitive in every major database. SELECT, select, and Select all execute identically. Casing is purely a readability and style decision, which is exactly why the debate has lasted so long.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What do most SQL style guides recommend for keywords?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Older and enterprise-leaning guides such as Joe Celko&apos;s conventions favour uppercase keywords. Newer guides like the GitLab SQL style guide and many dbt community conventions favour lowercase, arguing that syntax highlighting already distinguishes keywords. Both camps agree that one style should be applied consistently across a codebase.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert SQL keyword casing automatically?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use a SQL formatter. The free <Link href="/sql-formatter">Dev Brains AI SQL Formatter</Link> reformats queries in your browser, applying consistent keyword casing and indentation instantly with no signup.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free SQL Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any query and get consistent keyword casing and clean indentation in one click.
              Runs entirely in your browser — no signup, no cost.
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
              <li><Link href="/blog/sql-formatting-best-practices-style-guide">SQL Formatting Best Practices: A Style Guide</Link></li>
              <li><Link href="/blog/why-consistent-sql-style-matters-for-teams">Why Consistent SQL Style Matters for Teams</Link></li>
              <li><Link href="/blog/how-to-format-long-sql-queries-for-readability">How to Format Long SQL Queries for Readability</Link></li>
              <li><Link href="/blog/sql-code-review-checklist">SQL Code Review Checklist</Link></li>
              <li><Link href="/blog/sql-cte-common-table-expressions-guide">SQL CTEs (Common Table Expressions) Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
