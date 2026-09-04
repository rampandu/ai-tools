// pages/sql-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResultBox from '../components/ResultBox';

const EXAMPLES = [
  'select name, salary from employees where salary > 50000',
  'get all users where age less than 30 and country is India',
  'list order id and total from orders where total between 100 and 200',
  'show all columns from customers'
];

const FAQ = [
  {
    q: 'Is this SQL generator free?',
    a: 'Yes — the basic SQL generator is free. It is deterministic and suited for common SELECT queries. You can generate as many SQL examples as you like for learning, prototyping, and daily work.'
  },
  {
    q: 'Can I run generated SQL directly?',
    a: 'Always review generated SQL before running it against production databases to avoid unsafe queries. Double-check table names, WHERE filters, and JOIN conditions, and test on a staging or backup database first.'
  },
  {
    q: 'Which SQL dialects does this AI SQL generator support?',
    a: 'The tool is designed to produce standard ANSI SQL that works with most relational databases such as MySQL, PostgreSQL, SQL Server, SQLite, and MariaDB. For advanced vendor-specific features, you may need to tweak the query manually.'
  },
  {
    q: 'Do I need to know SQL to use this tool?',
    a: 'You can use natural language prompts like “get total sales by month for 2024” and the AI SQL generator will suggest a query. Basic SQL knowledge helps you review the output, but it is not strictly required to get started.'
  },
  {
    q: 'Can I use these SQL queries for commercial projects?',
    a: 'Yes, you can use the generated SQL in your work or commercial projects, but you are responsible for validating correctness, performance, and security before deploying it in production.'
  },
  {
    q: 'Is there a free SQL query generator online with no signup?',
    a: 'Yes. This SQL query generator runs entirely in your browser, is free to use, and does not require creating an account, signing up, or entering payment details. You can generate unlimited SQL queries.'
  },
  {
    q: 'What is an AI SQL query builder?',
    a: 'An AI SQL query builder is a tool that reads a plain-English description of the data you want and writes the matching SQL statement for you — the SELECT columns, FROM table, and WHERE filters — so you do not have to recall exact syntax or click through a dropdown-based query builder UI.'
  },
  {
    q: 'Can I generate MySQL, PostgreSQL, and SQLite queries?',
    a: 'Yes. This generator produces standard SQL (SELECT and WHERE clauses, comparisons, BETWEEN, IN, and LIKE conditions) that runs on MySQL, PostgreSQL, SQLite, SQL Server, and MariaDB without modification for common queries. Highly dialect-specific syntax, such as vendor-only functions, may still need manual adjustment.'
  },
  {
    q: 'Can this tool generate INSERT, UPDATE, or DELETE queries?',
    a: 'No — this generator is focused specifically on SELECT queries for reading and reporting on data, which is the safest and most common daily need. INSERT, UPDATE, and DELETE carry real risk if generated incorrectly, so we deliberately keep this tool read-only; write those statements by hand and double-check the WHERE clause before running them.'
  },
  {
    q: 'How is this different from asking ChatGPT for SQL?',
    a: 'This generator is deterministic rather than a live language-model call — the same prompt always produces the same query, instantly, with no signup, no rate limit, and no risk of a hallucinated column or table name that looks right but is not. It reliably handles common SELECT patterns; for something highly unusual or vendor-specific, a general-purpose AI chat tool may still be worth a try alongside it.'
  }
];

export default function SQLGenerator() {
  const [prompt, setPrompt] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem('ai_sql_history') || '[]'));
    } catch {}
  }, []);

  function pushHistory(prompt, out) {
    try {
      const h = JSON.parse(localStorage.getItem('ai_sql_history') || '[]');
      const entry = { prompt, out, ts: Date.now() };
      const newH = [entry, ...h].slice(0, 20);
      localStorage.setItem('ai_sql_history', JSON.stringify(newH));
      setHistory(newH);
    } catch {}
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
      pushHistory(prompt, j);
    } catch (err) {
      console.error(err);
      setError(err?.error || err?.details || (err?.message ?? 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dev Brains AI SQL Query Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free AI SQL query generator that converts plain English into SQL. Supports SELECT statements, WHERE filters, JOINS, and GROUP BY for popular databases.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dev-brains-ai.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'SQL Generator',
        item: 'https://dev-brains-ai.com/sql-generator'
      }
    ]
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free SQL Query Generator — AI SQL Query Builder Online | Dev Brains AI</title>
        <meta
          name="description"
          content="Free SQL query generator and AI SQL query builder. Turn plain English into MySQL, PostgreSQL, SQL Server, and SQLite queries instantly — no signup, no cost."
        />
        <meta
          name="keywords"
          content="sql query generator, sql generator, ai sql query builder, mysql query generator, AI sql generator, natural language to sql, free sql builder, online sql generator, sql query builder free"
        />
        <meta property="og:title" content="Free SQL Query Generator — AI SQL Query Builder Online" />
        <meta
          property="og:description"
          content="Free AI SQL query builder that turns plain English into MySQL, PostgreSQL, SQL Server, and SQLite queries instantly. No signup needed."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/sql-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/sql-generator" />

        {/* Structured data for FAQ, software/app listing & breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
 <meta name="viewport" content="width=device-width, initial-scale=1" />

</Head>

      {/* Main tool card */}
      <div className="card" aria-live="polite">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">SQL Generator</li>
          </ol>
        </nav>

        <h1>Free MySQL & SQL Query Generator — AI SQL Builder</h1>
        <p className="small">
          Use this free AI SQL query generator to convert plain English into clean SQL instantly.
          Works with <strong>MySQL</strong>, <strong>PostgreSQL</strong>, <strong>SQL Server</strong>,
          <strong> SQLite</strong>, and <strong>MariaDB</strong>. Describe the data you need — the AI
          builds a ready-to-use query including SELECT, WHERE, JOIN, GROUP BY, and ORDER BY. No
          signup, no cost, no limit. Always review generated SQL before running on production.
        </p>

        <label htmlFor="prompt">
          <strong>Prompt</strong>
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: show total sales by month for 2024 for each country"
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate SQL'}
          </button>
          <button
            onClick={() => {
              setPrompt('');
              setResult(null);
              setError(null);
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(prompt);
            }}
          >
            Copy Prompt
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Example prompts for the SQL generator</strong>
          <p className="small" style={{ marginTop: 4 }}>
            Click on any example to quickly test the AI SQL generator and understand how to describe
            your data in natural language.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => setPrompt(ex)} className="small">
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          {error && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {String(error)}
            </div>
          )}
          {result && <ResultBox data={result} isSQL />}
          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Generate SQL</strong> to let the AI build a query for
              you.
            </div>
          )}
        </div>
      </div>

      {/* SEO content: what / why / how */}
      <div className="card">
        <h2>What is an AI SQL Generator?</h2>
        <p className="small">
          An AI SQL generator is a tool that turns natural language into valid SQL queries. Instead
          of remembering complex syntax, table names, and JOIN conditions, you can write what you
          want in English and let the AI suggest the query. This is especially useful for:
        </p>

        <svg viewBox="0 0 640 190" style={{ width: '100%', height: 'auto', margin: '12px 0', borderRadius: 8, background: '#0f172a' }} role="img" aria-label="Diagram showing plain English converted into a SQL query">
          <rect x="24" y="30" width="260" height="130" rx="10" fill="#1e293b" stroke="#334155" />
          <text x="154" y="58" textAnchor="middle" fill="#94a3b8" fontSize="13" fontFamily="ui-monospace, monospace">Plain English</text>
          <text x="154" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">"users where age less</text>
          <text x="154" y="108" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">than 30 and country is India"</text>
          <text x="316" y="102" textAnchor="middle" fill="#34d399" fontSize="22" fontFamily="ui-monospace, monospace">→</text>
          <rect x="352" y="30" width="264" height="130" rx="10" fill="#0d3b34" stroke="#14b8a6" />
          <text x="484" y="58" textAnchor="middle" fill="#5eead4" fontSize="13" fontFamily="ui-monospace, monospace">AI SQL query builder</text>
          <text x="484" y="86" textAnchor="middle" fill="#d1fae5" fontSize="10.5" fontFamily="ui-monospace, monospace">SELECT * FROM users</text>
          <text x="484" y="104" textAnchor="middle" fill="#d1fae5" fontSize="10.5" fontFamily="ui-monospace, monospace">WHERE age &lt; 30</text>
          <text x="484" y="122" textAnchor="middle" fill="#d1fae5" fontSize="10.5" fontFamily="ui-monospace, monospace">AND country = 'India';</text>
        </svg>

        <ul className="small">
          <li>Developers who write SQL occasionally and want to move faster.</li>
          <li>Data analysts who need to explore datasets without memorising every column.</li>
          <li>Product managers or business users who want to self-serve simple reports.</li>
          <li>Students who are learning SQL and need examples and practice queries.</li>
        </ul>
        <p className="small">
          Dev Brains AI focuses on practical, developer-friendly tools. This SQL query generator is
          designed to be fast, predictable, and easy to integrate into your daily workflow. For a
          closer look at how the plain-English-to-SQL conversion works, see our{' '}
          <Link href="/blog/natural-language-to-sql-guide">natural language to SQL guide</Link>.
        </p>
      </div>

      <div className="card">
        <h2>How to Use This Free SQL Builder</h2>
        <ol className="small">
          <li>
            <strong>Describe your data:</strong> In the prompt box, type what you want, such as
            “get total revenue by month for 2024”.
          </li>
          <li>
            <strong>Include filters or sorting:</strong> Add conditions like “only for India and
            sort by revenue in descending order”.
          </li>
          <li>
            <strong>Click “Generate SQL”:</strong> The AI will create a SELECT query with WHERE,
            GROUP BY, ORDER BY, and JOIN clauses if needed.
          </li>
          <li>
            <strong>Review the query:</strong> Check column names, table names, and logic against
            your actual schema.
          </li>
          <li>
            <strong>Run safely:</strong> Test on a staging environment or with a limited dataset
            before using it on production.
          </li>
        </ol>
        <p className="small">
          For even faster results, start from one of the example prompts, adjust it to match your
          tables, and regenerate the SQL query.
        </p>
      </div>

      <div className="card">
        <h2>Supported SQL Queries and Use Cases</h2>
        <p className="small">
          The Dev Brains AI SQL generator focuses on the most common queries that developers and
          analysts write every day:
        </p>
        <ul className="small">
          <li>Simple <code>SELECT</code> queries from a single table.</li>
          <li>
            Queries with <code>WHERE</code> filters, ranges, and multiple conditions.
          </li>
          <li>
            Aggregations using <code>GROUP BY</code> and functions like <code>SUM</code>,{' '}
            <code>COUNT</code>, and <code>AVG</code>.
          </li>
          <li>
            <code>JOIN</code> queries across related tables (customers, orders, products, etc.).
          </li>
          <li>
            Sorting and pagination with <code>ORDER BY</code> and <code>LIMIT</code>.
          </li>
        </ul>
        <p className="small">
          For advanced database-specific features (CTEs, window functions, stored procedures), you
          can still use the generated SQL as a starting point and then extend it manually. If you
          specifically need MySQL syntax and MySQL-only functions, see our dedicated{' '}
          <Link href="/blog/free-mysql-query-generator-online">free MySQL query generator guide</Link>.
          And once a query works, most list views also need paging — see our guide to{' '}
          <Link href="/blog/sql-query-for-pagination-limit-offset">SQL pagination with LIMIT and OFFSET</Link>{' '}
          for the keyset pagination pattern that stays fast on large tables.
        </p>
      </div>

      <div className="card">
        <h2>Best Practices and Safety Tips</h2>
        <p className="small">
          AI can save a lot of time, but it is not a replacement for careful review. To use this SQL
          generator safely:
        </p>
        <ul className="small">
          <li>
            Never run generated queries directly on production without checking.
          </li>
          <li>
            Verify that filters like <code>WHERE</code> and <code>LIMIT</code> are present to avoid
            scanning entire tables by mistake.
          </li>
          <li>
            Confirm that JOIN conditions match your foreign keys and do not create duplicate rows.
          </li>
          <li>
            For sensitive data, ensure that only authorised users can run the final queries.
          </li>
        </ul>

        <h3 style={{ marginTop: 16 }}>Common Mistakes to Avoid</h3>
        <ul className="small">
          <li>
            <strong>Assuming the AI knows your schema.</strong> It only knows what you type — always
            name real table and column names in your prompt to avoid guessed placeholders like
            <code> my_table</code>.
          </li>
          <li>
            <strong>Skipping the review step.</strong> Read every generated WHERE and JOIN condition
            before running anything beyond a read-only <code>SELECT</code> against real data.
          </li>
          <li>
            <strong>Not naming the SQL dialect.</strong> If your query depends on dialect-specific
            syntax — date formatting, string concatenation, <code>LIMIT</code> vs <code>TOP</code> —
            say which database you are targeting so you know what to adjust manually.
          </li>
          <li>
            <strong>Pasting straight into a production console.</strong> Run new queries through a
            tool that shows an execution plan or row count first, rather than executing directly
            against a live database.
          </li>
          <li>
            <strong>Forgetting a WHERE clause on UPDATE or DELETE.</strong> This generator only
            produces read-only <code>SELECT</code> queries, but the same discipline applies to any
            AI-assisted SQL — always double-check for a WHERE clause before running an UPDATE or
            DELETE anywhere.
          </li>
        </ul>
        <p className="small">
          Used correctly, the Dev Brains AI SQL generator can speed up development, reduce syntax
          errors, and help you focus on the actual business logic instead of boilerplate code.
        </p>

        <h3 style={{ marginTop: 16 }}>Running the Generated Query in Your Code</h3>
        <p className="small">
          Once the query looks right, here is how to actually run it from the two most common
          backend stacks:
        </p>
        <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Node.js (mysql2)
const [rows] = await connection.execute(
  'SELECT name, salary FROM employees WHERE salary > ?',
  [50000]
);

# Python (psycopg2, PostgreSQL)
cur.execute("SELECT name, salary FROM employees WHERE salary > %s", (50000,))
rows = cur.fetchall()`}
        </pre>
        <p className="small" style={{ marginBottom: 0 }}>
          Notice both examples pass the value as a parameter (<code>?</code> or{' '}
          <code>%s</code>) instead of string-concatenating it into the query — that's what
          prevents SQL injection. If you take a generated query and paste a value directly into
          the WHERE clause instead of parameterizing it, you've reintroduced the exact risk this
          tool's read-only design was meant to avoid.
        </p>
      </div>

      {/* FAQ section */}
      <div className="card">
        <h3>FAQ: AI SQL Generator by Dev Brains AI</h3>
        {FAQ.map((f, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <strong>{f.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {f.a}
            </div>
          </div>
        ))}
      </div>

      {/* History block for UX + extra content */}
      <div className="card small">
        <h4>Recent prompts</h4>
        <p className="small">
          Your recent natural language prompts are stored locally in your browser so you can quickly
          reuse or refine them. This helps you build a personal library of SQL ideas and reports.
        </p>
        {history.length === 0 && (
          <div className="small">
            No history yet — your recent prompts will appear here after you generate a few queries.
          </div>
        )}
        <ul>
          {history.map((h, idx) => (
            <li key={h.ts + idx} style={{ marginBottom: 8 }}>
              <button
                className="small"
                onClick={() => {
                  setPrompt(h.prompt);
                  setResult(h.out);
                }}
              >
                Reuse
              </button>
              <code style={{ marginLeft: 8 }}>{h.prompt}</code>
              <div className="small" style={{ color: '#666' }}>
                {new Date(h.ts).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card small">
        <h4>More AI tools from Dev Brains AI</h4>
        <p className="small">
          We are building a collection of small, practical AI tools for developers, including code
          helpers, API testers, and content generators. Check the other pages on this site to
          explore more utilities as they become available.
        </p>
      </div>

      {/* Internal linking to blog posts — boosts crawl + relevance signals */}
      <div className="card small">
        <h4>SQL guides and tutorials</h4>
        <ul className="small">
          <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
          <li><Link href="/blog/sql-interview-questions-complete-guide">SQL Interview Questions: The Complete Guide</Link></li>

          <li><Link href="/blog/common-sql-errors-and-fix-using-ai">Common SQL Errors and How to Fix Them with AI</Link></li>
          <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
          <li><Link href="/blog/mysql-vs-postgresql-performance-comparison">MySQL vs PostgreSQL Performance Comparison</Link></li>
          <li><Link href="/blog/ai-sql-practical">Practical AI SQL Use Cases for Developers</Link></li>
        </ul>
      </div>
    </div>
  );
}
