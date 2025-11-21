// pages/blog/ai-sql-practical.js
import Head from 'next/head';
import Link from 'next/link';

export default function AISqlPractical() {
  return (
    <>
      <Head>
        <title>How AI Can Speed Up SQL Writing: Practical Examples & Prompts | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how AI can help you write SQL faster with practical prompt examples and patterns for common queries."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/ai-sql-practical" />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article
          className="card"
          style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How AI Can Speed Up SQL Writing: Practical Examples & Prompts
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Writing SQL is part art and part chemistry — combining the right joins, filters and
            aggregations to get the desired dataset. AI can accelerate this process by converting
            plain English into runnable SQL, giving developers a reliable starting point and saving
            time during exploratory data work.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Why use AI for SQL?
          </h2>
          <p className="small">
            AI models trained for text generation are particularly effective for tasks with
            structured outputs like SQL. They are good at learning recurring syntactic patterns and
            translating natural language intent into SELECT, JOIN and GROUP BY statements. This
            reduces context-switching and helps non-SQL-savvy stakeholders express queries in plain
            English.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Practical prompt examples
          </h2>
          <p className="small">
            Here are a few prompts that give good, reliable outputs when used with a SQL-focused
            generator:
          </p>

          <h3 style={{ marginTop: 16, fontWeight: 600 }}>1. Top N aggregation</h3>
          <pre className="small" style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
            "List the top 5 customers by total purchase amount in the last 30 days"
          </pre>
          <p className="small" style={{ marginTop: 6 }}>Expected produced SQL:</p>
          <pre className="small" style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
{`SELECT customer_id, SUM(amount) AS total
FROM orders
WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY customer_id
ORDER BY total DESC
LIMIT 5;`}
          </pre>

          <h3 style={{ marginTop: 16, fontWeight: 600 }}>2. Time-series grouping</h3>
          <pre className="small" style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
            "Show daily signups for the past two weeks"
          </pre>
          <p className="small" style={{ marginTop: 6 }}>Expected produced SQL (MySQL):</p>
          <pre className="small" style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
{`SELECT DATE(created_at) AS day, COUNT(*) AS signups
FROM users
WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
GROUP BY day
ORDER BY day;`}
          </pre>

          <h3 style={{ marginTop: 16, fontWeight: 600 }}>3. Join with filters</h3>
          <pre className="small" style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
            "Get orders with customer name and total, for orders over $100"
          </pre>
          <p className="small" style={{ marginTop: 6 }}>Expected produced SQL:</p>
          <pre className="small" style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
{`SELECT o.order_id, c.name, SUM(oi.quantity * oi.price) AS total
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, c.name
HAVING total > 100;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Tips to get better AI results
          </h2>
          <ul className="small" style={{ paddingLeft: 18 }}>
            <li>
              <strong>Specify dialect:</strong> Mention "Postgres" or "MySQL" if using
              dialect-specific functions.
            </li>
            <li>
              <strong>Provide schema</strong> when possible — column names and types help generate
              precise queries.
            </li>
            <li>
              <strong>Ask for explanation:</strong> Request a short human-readable explanation after
              the query so you can understand and adjust it.
            </li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Limitations and safety
          </h2>
          <p className="small">
            AI-generated SQL is a starting point — always validate queries, watch for incorrect
            assumptions about nullability or indexing, and use parameterized queries to prevent
            injection risks. For complex optimizations, use EXPLAIN and performance testing.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Putting it into practice
          </h2>
          <p className="small">
            Use the AI SQL Generator as part of exploratory analysis and team collaboration: let
            business users phrase questions naturally, then refine output with engineers. This
            reduces the time from question to answer and helps non-technical stakeholders get
            insights faster.
          </p>

          <p className="small" style={{ marginTop: 20 }}>
            Try these prompts on our{' '}
            <Link href="/sql-generator" className="text-blue-600 underline">
              AI SQL Generator
            </Link>{' '}
            to see real outputs and tweak prompts interactively.
          </p>
        </article>
      </main>
    </>
  );
}
