// pages/blog/sql-stored-procedures-vs-functions.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlStoredProceduresVsFunctions() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Stored Procedures vs Functions',
        item: 'https://dev-brains-ai.com/blog/sql-stored-procedures-vs-functions',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Stored Procedures vs Functions — Key Differences with Examples',
    description:
      'Understand the difference between stored procedures and user-defined functions in SQL, with MySQL syntax examples, PostgreSQL notes, and guidance on when to use each.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-stored-procedures-vs-functions',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the main difference between a stored procedure and a function in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A stored procedure performs an action and may or may not return a value, and it is called with CALL. A function must return exactly one value (or a table in some databases), cannot always modify data in MySQL, and can be used directly inside a SELECT statement, WHERE clause, or other expression.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a function be used inside a SELECT statement but a stored procedure cannot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. A user-defined function can be called inline inside a SELECT column list, WHERE clause, or ORDER BY, just like a built-in function. A stored procedure cannot be called this way — it must be invoked with the CALL statement as its own step.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use a stored procedure or a function for a reporting query?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a function when you need a reusable calculation you can embed inside other queries, such as computing a discounted price per row. Use a stored procedure when you need to run multiple statements, handle transactions, or return a full result set for a report, since procedures are better suited to multi-step logic.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Stored Procedures vs Functions — Key Differences with Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="Understand the difference between stored procedures and user-defined functions in SQL, with MySQL syntax examples, PostgreSQL notes, and when to use each."
        />
        <meta
          name="keywords"
          content="stored procedure vs function sql, create procedure sql, create function sql, sql user defined function, mysql stored procedure example, sql procedure vs function differences"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-stored-procedures-vs-functions" />
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
              <li aria-current="page">Stored Procedures vs Functions</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Stored Procedures vs Functions — Key Differences with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Stored procedures and user-defined functions both let you save reusable SQL logic
            inside the database, but they are built for different jobs. Mixing them up leads to
            code that either can't be called where you need it, or can't do what you're asking
            it to do. This guide compares their syntax, capabilities, and ideal use cases with
            working MySQL examples and PostgreSQL notes.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Core Differences at a Glance
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Return value</strong> — a function must return exactly one value (or a table); a procedure can return zero, one, or multiple result sets, and can use OUT parameters instead</li>
            <li><strong>Calling syntax</strong> — a procedure is invoked with <code>CALL proc_name()</code>; a function is called inline, like <code>SELECT func_name(column) FROM table</code></li>
            <li><strong>Use inside SELECT</strong> — functions can be used directly in a SELECT list, WHERE clause, or ORDER BY; procedures cannot</li>
            <li><strong>Data modification</strong> — procedures freely run INSERT, UPDATE, DELETE, and manage transactions; in MySQL, functions cannot modify data if they are called from a SELECT statement, and in general are meant to be side-effect-free</li>
            <li><strong>Parameters</strong> — procedures support IN, OUT, and INOUT parameters; functions only support IN parameters</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Creating a Stored Procedure (MySQL)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A stored procedure that gives a raise to every employee in a department and reports
            how many rows were affected using an OUT parameter:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`DELIMITER $$

CREATE PROCEDURE give_department_raise(
  IN dept_name VARCHAR(100),
  IN raise_percent DECIMAL(5,2),
  OUT rows_updated INT
)
BEGIN
  UPDATE employees
  SET salary = salary * (1 + raise_percent / 100)
  WHERE department = dept_name;

  SET rows_updated = ROW_COUNT();
END $$

DELIMITER ;

-- Call it:
CALL give_department_raise('Engineering', 5.0, @updated);
SELECT @updated AS rows_updated;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The procedure runs an UPDATE statement — something a MySQL function is not allowed to
            do when called from a SELECT context. It communicates the result back through the{' '}
            <code>OUT</code> parameter rather than a return value.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Creating a Function (MySQL)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A function that calculates a discounted price and can be dropped straight into a
            SELECT statement:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`DELIMITER $$

CREATE FUNCTION calculate_discounted_price(
  original_price DECIMAL(10,2),
  discount_percent DECIMAL(5,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  RETURN original_price - (original_price * discount_percent / 100);
END $$

DELIMITER ;

-- Use it directly inside a query:
SELECT
  product_name,
  price,
  calculate_discounted_price(price, 15) AS sale_price
FROM products
WHERE category = 'Electronics';`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice the function is used exactly like a built-in function such as{' '}
            <code>ROUND()</code> or <code>UPPER()</code> — inline, inside the column list. A
            stored procedure could never appear there.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            PostgreSQL Differences
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            PostgreSQL historically only had functions, and used them for both roles (a function
            with no return value acted like a procedure). Since PostgreSQL 11, true{' '}
            <code>CREATE PROCEDURE</code> support was added, called with <code>CALL</code>, and
            procedures there can manage their own transactions with COMMIT/ROLLBACK — something
            functions still cannot do.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- PostgreSQL function
CREATE FUNCTION calculate_discounted_price(original_price NUMERIC, discount_percent NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  RETURN original_price - (original_price * discount_percent / 100);
END;
$$ LANGUAGE plpgsql;

-- PostgreSQL procedure (11+)
CREATE PROCEDURE give_department_raise(dept_name TEXT, raise_percent NUMERIC)
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE employees
  SET salary = salary * (1 + raise_percent / 100)
  WHERE department = dept_name;
  COMMIT;
END;
$$;

CALL give_department_raise('Engineering', 5.0);`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When to Use Which
          </h2>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>Use a <strong>function</strong> when you need a small, reusable calculation embedded inside SELECT, WHERE, or ORDER BY — like formatting, discounting, or scoring a value per row.</li>
            <li>Use a <strong>stored procedure</strong> when you need to run multiple statements as a unit, manage transactions explicitly, or perform batch INSERT/UPDATE/DELETE operations.</li>
            <li>Use a <strong>procedure</strong> when the caller needs multiple outputs via OUT parameters, or multiple result sets returned at once.</li>
            <li>Use a <strong>function</strong> when the logic needs to compose with other SQL, since it behaves like any other expression.</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Pitfalls
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Trying to call a stored procedure from inside a SELECT — this is not allowed in MySQL or PostgreSQL; procedures are called as a standalone statement</li>
            <li>Forgetting <code>DETERMINISTIC</code> or <code>NOT DETERMINISTIC</code> in MySQL function definitions when binary logging is enabled with strict mode</li>
            <li>Overusing functions for heavy row-by-row logic in large SELECTs, which can hurt performance since the function executes once per row</li>
            <li>Assuming functions can freely write data in MySQL — they generally cannot when invoked from a SQL statement, unlike procedures</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the main difference between a stored procedure and a function in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A stored procedure performs an action and may or may not return a value, and it is called with CALL. A function must return exactly one value (or a table in some databases), cannot always modify data in MySQL, and can be used directly inside a SELECT statement, WHERE clause, or other expression.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can a function be used inside a SELECT statement but a stored procedure cannot?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. A user-defined function can be called inline inside a SELECT column list, WHERE clause, or ORDER BY, just like a built-in function. A stored procedure cannot be called this way — it must be invoked with the CALL statement as its own step.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use a stored procedure or a function for a reporting query?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use a function when you need a reusable calculation you can embed inside other queries, such as computing a discounted price per row. Use a stored procedure when you need to run multiple statements, handle transactions, or return a full result set for a report, since procedures are better suited to multi-step logic.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the query logic you need in plain English and get ready-to-run SQL instantly.
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
              <li><Link href="/blog/sql-transactions-acid-properties-explained">SQL Transactions and ACID Properties Explained</Link></li>
              <li><Link href="/blog/sql-case-statement-examples">SQL CASE Statement Examples</Link></li>
              <li><Link href="/blog/mysql-vs-postgresql-performance-comparison">MySQL vs PostgreSQL Performance Comparison</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
