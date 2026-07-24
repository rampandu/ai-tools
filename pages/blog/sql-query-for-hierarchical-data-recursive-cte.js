// pages/blog/sql-query-for-hierarchical-data-recursive-cte.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlHierarchicalDataRecursiveCte() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Query for Hierarchical Data with Recursive CTE',
        item: 'https://dev-brains-ai.com/blog/sql-query-for-hierarchical-data-recursive-cte',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Recursive CTE for Org Charts and Category Trees',
    description:
      'Write a WITH RECURSIVE query that walks org charts and category trees of any depth, including the depth-counter trick that stops infinite loops on bad data.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-query-for-hierarchical-data-recursive-cte',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a recursive CTE in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A recursive CTE is a common table expression defined with WITH RECURSIVE that references itself. It consists of an anchor member that provides the starting rows and a recursive member that repeatedly joins back to the CTE until no more rows are produced, making it ideal for hierarchical or tree-structured data.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you prevent an infinite loop in a recursive CTE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The recursion stops naturally when the recursive member returns no new rows, but bad data (like a cycle where an employee reports to themselves through a chain) can cause an infinite loop. Add a depth counter and a WHERE depth < N guard in the recursive member, or use MySQL 8+ built-in cycle detection with CYCLE ... SET ... TO ... DEFAULT, to cap recursion safely.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can an AI SQL generator write recursive CTE queries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI free AI SQL Query Builder at dev-brains-ai.com/sql-generator can draft a WITH RECURSIVE query from a plain English description of your hierarchy, such as "find all employees under a manager" — review the anchor condition and join columns before running it.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Recursive CTE for Org Charts and Category Trees | Dev Brains AI</title>
        <meta
          name="description"
          content="Write a WITH RECURSIVE query that walks org charts and category trees of any depth, including the depth-counter trick that stops infinite loops on bad data."
        />
        <meta
          name="keywords"
          content="sql recursive cte, with recursive sql, hierarchical data sql, org chart sql query, recursive query sql, sql tree structure, recursive common table expression, sql category tree"
        />
        <meta property="og:title" content="SQL Recursive CTE for Org Charts and Category Trees" />
        <meta property="og:description" content="Write a WITH RECURSIVE query that walks org charts and category trees of any depth, including the depth-counter trick that stops infinite loops on bad data." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-query-for-hierarchical-data-recursive-cte" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-query-for-hierarchical-data-recursive-cte" />
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
              <li aria-current="page">Hierarchical Data with Recursive CTE</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Query for Hierarchical Data with Recursive CTE
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Org charts, category trees, bill-of-materials, and comment threads all share the same
            shape: rows that reference a parent row in the same table. A recursive CTE, written
            with <code>WITH RECURSIVE</code>, is the standard SQL tool for walking that structure
            without knowing how many levels deep it goes. This guide covers the anchor and
            recursive member pattern with a runnable employee-manager example and a category tree
            example.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Anatomy of a Recursive CTE
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A recursive CTE has two parts joined by <code>UNION ALL</code>: an <strong>anchor
            member</strong> that selects the starting row(s), and a <strong>recursive member</strong>{' '}
            that references the CTE's own name to fetch the next level. SQL repeatedly executes the
            recursive member, feeding it the rows produced in the previous iteration, until it
            returns zero rows.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH RECURSIVE cte_name AS (
  -- Anchor member: starting point
  SELECT ... FROM some_table WHERE <base condition>

  UNION ALL

  -- Recursive member: joins back to cte_name
  SELECT ... FROM some_table t
  JOIN cte_name c ON t.parent_id = c.id
)
SELECT * FROM cte_name;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            MySQL 8.0+, PostgreSQL, SQL Server, and SQLite (3.8.3+) all support this syntax with
            <code> WITH RECURSIVE</code>. SQL Server uses <code>WITH cte_name AS (...)</code> without
            the RECURSIVE keyword, but the anchor/recursive structure is identical.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Example 1: Employee-Manager Org Chart
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Consider an <code>employees</code> table where each row stores a reference to its own
            manager:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  manager_id INT NULL,
  title VARCHAR(100)
);
-- manager_id references employees.id; NULL means top of the org (CEO)`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            To find every employee who reports up to a specific manager, directly or indirectly:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH RECURSIVE org_chart AS (
  -- Anchor: start from the given manager
  SELECT id, name, manager_id, title, 0 AS depth
  FROM employees
  WHERE id = 101   -- the manager we're starting from

  UNION ALL

  -- Recursive: find direct reports of everyone already in org_chart
  SELECT e.id, e.name, e.manager_id, e.title, oc.depth + 1
  FROM employees e
  INNER JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT id, name, title, depth
FROM org_chart
ORDER BY depth, name;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The <code>depth</code> column tracks how many levels below the starting manager each
            row is — 0 for the manager, 1 for direct reports, 2 for their reports, and so on. You
            can use it to indent results in your application layer for a visual tree.
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            To find the reverse — an employee's full management chain up to the CEO — flip the
            join direction:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH RECURSIVE management_chain AS (
  SELECT id, name, manager_id, 0 AS depth
  FROM employees
  WHERE id = 245   -- the employee we're starting from

  UNION ALL

  SELECT e.id, e.name, e.manager_id, mc.depth + 1
  FROM employees e
  INNER JOIN management_chain mc ON e.id = mc.manager_id
)
SELECT id, name, depth
FROM management_chain
ORDER BY depth;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Example 2: Category Tree with Full Path
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            E-commerce and CMS platforms often store categories as a self-referencing tree — for
            example, Electronics &gt; Computers &gt; Laptops &gt; Gaming Laptops. Given:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`CREATE TABLE categories (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  parent_id INT NULL
);`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This query builds the full breadcrumb path for every category in one pass, using
            string concatenation to accumulate the path at each recursion step:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH RECURSIVE category_tree AS (
  -- Anchor: top-level categories with no parent
  SELECT id, name, parent_id, 0 AS depth, CAST(name AS CHAR(500)) AS full_path
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  -- Recursive: append child category name to the parent's path
  SELECT c.id, c.name, c.parent_id, ct.depth + 1,
         CONCAT(ct.full_path, ' > ', c.name)
  FROM categories c
  INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT id, name, depth, full_path
FROM category_tree
ORDER BY full_path;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            In PostgreSQL, replace <code>CAST(name AS CHAR(500))</code> with{' '}
            <code>name::TEXT</code> and <code>CONCAT()</code> works the same way. The explicit cast
            in the anchor member matters — without it, some databases infer a narrow column type
            from the anchor and then truncate longer concatenated paths in later recursion steps.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Preventing Infinite Loops
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Recursion normally terminates when the recursive member returns no new rows. But real
            data sometimes has cycles — a data entry error where employee A reports to B, and B's
            record was accidentally updated to report to A. Without a safeguard, this loops forever
            until the database hits a resource limit. Two ways to protect against it:
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>Add a depth counter and cap it: <code>WHERE depth &lt; 20</code> in the recursive member's join condition, which bounds the maximum recursion depth regardless of the data.</li>
            <li>In MySQL 8.0.14+ and PostgreSQL 14+, use the standard <code>CYCLE</code> clause to detect and stop revisiting the same row automatically.</li>
          </ol>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Depth-capped version (works everywhere)
WITH RECURSIVE org_chart AS (
  SELECT id, name, manager_id, 0 AS depth
  FROM employees
  WHERE id = 101

  UNION ALL

  SELECT e.id, e.name, e.manager_id, oc.depth + 1
  FROM employees e
  INNER JOIN org_chart oc ON e.manager_id = oc.id
  WHERE oc.depth < 20   -- safety cap
)
SELECT * FROM org_chart;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Most database engines also enforce a default recursion limit (MySQL's{' '}
            <code>cte_max_recursion_depth</code>, defaulting to 1000) as a last line of defense, but
            you should not rely on hitting that limit — add your own guard for predictable behavior.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When to Use a Recursive CTE vs Alternatives
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Recursive CTE</strong> — best when tree depth is unknown or variable, and you're on MySQL 8+, PostgreSQL, SQL Server, or SQLite</li>
            <li><strong>Adjacency list + application-side recursion</strong> — simpler for small trees fully loaded into memory, but does more round trips</li>
            <li><strong>Nested set model or materialized path column</strong> — faster reads for trees that change infrequently, at the cost of more complex writes</li>
            <li><strong>Closure table</strong> — a separate table storing every ancestor-descendant pair, ideal when you need very fast "all descendants" queries at scale</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a recursive CTE in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A recursive CTE is a common table expression defined with WITH RECURSIVE that references itself. It consists of an anchor member that provides the starting rows and a recursive member that repeatedly joins back to the CTE until no more rows are produced, making it ideal for hierarchical or tree-structured data.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do you prevent an infinite loop in a recursive CTE?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The recursion stops naturally when the recursive member returns no new rows, but bad data (like a cycle where an employee reports to themselves through a chain) can cause an infinite loop. Add a depth counter and a WHERE depth &lt; N guard in the recursive member, or use MySQL 8+ built-in cycle detection with CYCLE ... SET ... TO ... DEFAULT, to cap recursion safely.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can an AI SQL generator write recursive CTE queries?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI free AI SQL Query Builder can draft a WITH RECURSIVE query from a plain English description of your hierarchy, such as "find all employees under a manager" — review the anchor condition and join columns before running it.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe your org chart or tree structure in plain English and get a working recursive CTE instantly.
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
              <li><Link href="/blog/sql-cte-common-table-expressions-guide">SQL CTE (Common Table Expressions) Guide</Link></li>
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
              <li><Link href="/blog/sql-subqueries-vs-joins-explained">SQL Subqueries vs Joins Explained</Link></li>
              <li><Link href="/blog/sql-interview-questions-complete-guide">SQL Interview Questions: The Complete Guide</Link></li>
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
