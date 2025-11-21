// pages/sql-generator.js
import Head from 'next/head';
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

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>AI SQL Query Generator — Free SQL Builder | Dev Brains AI</title>
        <meta
          name="description"
          content="Turn plain English into SQL queries using our free AI SQL Generator. Generate SELECT, JOIN, and filter queries instantly — no coding required."
        />
        <meta
          name="keywords"
          content="AI SQL generator, SQL query generator, natural language to SQL, free SQL builder, online SQL generator, Dev Brains AI"
        />
        <meta property="og:title" content="AI SQL Query Generator — Free SQL Builder" />
        <meta
          property="og:description"
          content="Quickly build SQL queries from text prompts. Free, fast, and powered by AI models to help developers and analysts write better SQL."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/sql-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/sql-generator" />

        {/* Structured data for FAQ and software/app listing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </Head>

      {/* Main tool card */}
      <div className="card" aria-live="polite">
        <h1>AI SQL Query Generator</h1>
        <p className="small">
          Use this free AI SQL query generator to convert plain English into clean SQL. Describe the
          data you need and get a ready-to-run SQL query for popular databases like MySQL,
          PostgreSQL, SQL Server, SQLite, and more. Always review the output before running it in
          production.
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
        <ul className="small">
          <li>Developers who write SQL occasionally and want to move faster.</li>
          <li>Data analysts who need to explore datasets without memorising every column.</li>
          <li>Product managers or business users who want to self-serve simple reports.</li>
          <li>Students who are learning SQL and need examples and practice queries.</li>
        </ul>
        <p className="small">
          Dev Brains AI focuses on practical, developer-friendly tools. This SQL query generator is
          designed to be fast, predictable, and easy to integrate into your daily workflow.
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
          can still use the generated SQL as a starting point and then extend it manually.
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
        <p className="small">
          Used correctly, the Dev Brains AI SQL generator can speed up development, reduce syntax
          errors, and help you focus on the actual business logic instead of boilerplate code.
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

      {/* Simple internal navigation / cross-link hint for SEO (optional text only, no actual links if not ready) */}
      <div className="card small">
        <h4>More AI tools from Dev Brains AI</h4>
        <p className="small">
          We are building a collection of small, practical AI tools for developers, including code
          helpers, API testers, and content generators. Check the other pages on this site to
          explore more utilities as they become available.
        </p>
      </div>
    </div>
  );
}
