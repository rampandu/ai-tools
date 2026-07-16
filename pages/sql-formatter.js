// pages/sql-formatter.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { formatSql, minifySql } from '../lib/sqlFormat';

const DEFAULT_SQL = `select id, name, email from users where active = 1 and created_at > '2026-01-01' order by created_at desc limit 20`;

const EXAMPLES = [
  {
    label: 'SELECT with JOIN',
    sql: `select o.id, o.total, c.name, c.email from orders o inner join customers c on c.id = o.customer_id left join coupons cp on cp.id = o.coupon_id where o.status = 'paid' and o.total > 100 order by o.created_at desc limit 50`,
  },
  {
    label: 'INSERT statement',
    sql: `insert into products (sku, name, price, category_id, created_at) values ('SKU-1001', 'Wireless Mouse', 24.99, 3, '2026-07-01'), ('SKU-1002', 'USB-C Hub', 39.50, 3, '2026-07-02')`,
  },
  {
    label: 'WITH / CTE query',
    sql: `with recent_orders as (select customer_id, count(*) as order_count, sum(total) as revenue from orders where created_at > '2026-06-01' group by customer_id) select c.name, r.order_count, r.revenue from recent_orders r inner join customers c on c.id = r.customer_id where r.revenue > 500 order by r.revenue desc`,
  },
];

const FAQ = [
  {
    q: 'Is this SQL Formatter free?',
    a: 'Yes — the SQL Formatter on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Is my SQL sent to a server?',
    a: 'No. Formatting and minifying happen entirely in your browser using JavaScript. Nothing you paste is uploaded, logged, or stored on our servers.',
  },
  {
    q: 'Which SQL dialects does it support?',
    a: 'The formatter works on general ANSI-style SQL — SELECT, INSERT, UPDATE, DELETE, JOINs, GROUP BY, ORDER BY, CTEs, and so on. It does not execute or validate your query, so dialect-specific syntax (PostgreSQL, MySQL, SQL Server, etc.) passes through untouched.',
  },
  {
    q: 'Will it change my string literals or quoted identifiers?',
    a: 'No. Single-quoted string literals and double-quoted identifiers are treated as opaque and are never re-cased or reflowed. Only unquoted SQL keywords are re-cased.',
  },
  {
    q: 'What does Minify do?',
    a: 'Minify collapses all whitespace runs (including newlines) into single spaces, producing a compact one-line query. It is handy for embedding SQL in logs, config files, or code where formatting does not matter.',
  },
];

export default function SqlFormatterPage() {
  const [input, setInput] = useState(DEFAULT_SQL);
  const [output, setOutput] = useState('');
  const [keywordCase, setKeywordCase] = useState('upper');
  const [copied, setCopied] = useState(false);

  function handleFormat() {
    setCopied(false);
    setOutput(formatSql(input, { keywordCase }));
  }

  function handleMinify() {
    setCopied(false);
    setOutput(minifySql(input));
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Clipboard API unavailable; nothing else to do client-side.
    }
  }

  function handleClear() {
    setInput('');
    setOutput('');
    setCopied(false);
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dev Brains AI SQL Formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free SQL formatter and beautifier that runs entirely in your browser. Paste messy SQL to get clean, clause-per-line output with consistent keyword casing, or minify a query to one line.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'SQL Formatter', item: 'https://dev-brains-ai.com/sql-formatter' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free SQL Formatter &amp; Beautifier — Format SQL Online | Dev Brains AI</title>
        <meta
          name="description"
          content="Format messy SQL instantly in your browser: clause-per-line layout, UPPERCASE or lowercase keywords, and one-click minify. 100% client-side — nothing is uploaded. Free, no signup."
        />
        <meta
          name="keywords"
          content="sql formatter, sql beautifier, format sql online, sql minifier, prettify sql, sql keyword case, Dev Brains AI"
        />
        <meta property="og:title" content="Free SQL Formatter &amp; Beautifier — Format SQL Online" />
        <meta
          property="og:description"
          content="Paste messy SQL and get clean, readable output with consistent keyword casing — or minify it to one line. Runs 100% in your browser."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/sql-formatter" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/sql-formatter" />

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
      </Head>

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
              margin: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">SQL Formatter</li>
          </ol>
        </nav>

        <h1>Free SQL Formatter &amp; Beautifier</h1>
        <p className="small">
          Paste any SQL query below and click <strong>Format</strong> to get a clean, readable
          version with each major clause on its own line and consistent keyword casing — or click{' '}
          <strong>Minify</strong> to collapse it to a single line. Everything runs in your browser;
          nothing is uploaded.
        </p>

        <label htmlFor="sql-input">
          <strong>SQL query</strong>
        </label>
        <textarea
          id="sql-input"
          aria-label="SQL query to format"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ minHeight: 160, fontFamily: 'monospace' }}
          placeholder="select id, name from users where active = 1 order by name"
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={handleFormat}>
            Format
          </button>
          <button type="button" onClick={handleMinify}>
            Minify
          </button>
          <button type="button" onClick={handleCopy} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
          <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Keyword case:
            <select
              aria-label="Keyword case"
              value={keywordCase}
              onChange={(e) => setKeywordCase(e.target.value)}
            >
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                className="small"
                onClick={() => {
                  setInput(ex.sql);
                  setOutput('');
                  setCopied(false);
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          {output ? (
            <>
              <h3 style={{ marginBottom: 6 }}>Result</h3>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: 12,
                  borderRadius: 8,
                  overflowX: 'auto',
                }}
              >
                <code>{output}</code>
              </pre>
            </>
          ) : (
            <div className="small">
              No result yet — press <strong>Format</strong> or <strong>Minify</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this SQL Formatter</h2>
        <p>
          SQL is one of the few languages that most teams write in three different places at once:
          application code, migration files, and ad-hoc queries in a database console. That makes
          it especially prone to inconsistent formatting — a 400-character one-liner pasted from a
          log here, a carefully indented CTE there. This free SQL Formatter turns any of it into a
          consistent, readable layout in one click: each major clause (<code>SELECT</code>,{' '}
          <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>ORDER BY</code>) gets
          its own line, every <code>JOIN</code> starts a new line, and <code>AND</code>/
          <code>OR</code> conditions are indented beneath the clause they belong to.
        </p>
        <p>
          The formatter runs entirely in your browser with plain JavaScript — there is no API call,
          no upload, and no storage. It is also careful with your data: single-quoted string
          literals and double-quoted identifiers are treated as opaque tokens, so the values inside
          them are never re-cased or reflowed. Only unquoted SQL keywords are changed.
        </p>

        <h3>Why SQL formatting matters</h3>
        <p>
          A query does not run any faster because it is pretty — but the humans who maintain it
          work dramatically faster when it is. Consistent formatting pays off in several concrete
          ways:
        </p>
        <ul>
          <li>
            <strong>Reviews get sharper.</strong> When every clause sits on its own line, a code
            review diff shows exactly which condition changed. In a one-liner, a single added{' '}
            <code>AND</code> rewrites the entire line and hides the actual change.
          </li>
          <li>
            <strong>Bugs surface earlier.</strong> Misplaced parentheses in a{' '}
            <code>WHERE</code> clause, an accidental cross join, or an <code>OR</code> that should
            have been an <code>AND</code> are far easier to spot when the logic is laid out
            vertically.
          </li>
          <li>
            <strong>Onboarding is easier.</strong> New teammates can read a well-formatted 40-line
            report query top to bottom like prose. The same query as a wall of text takes several
            passes just to find the table names.
          </li>
          <li>
            <strong>Debugging production issues is calmer.</strong> Queries copied out of logs,
            ORMs, and slow-query reports usually arrive as unreadable one-liners. Reformatting them
            is the first step of every investigation — this tool makes that step instant.
          </li>
        </ul>

        <h3>Uppercase or lowercase keywords?</h3>
        <p>
          SQL keywords are case-insensitive, so <code>SELECT</code>, <code>select</code>, and even{' '}
          <code>SeLeCt</code> all work. The choice is purely a style convention — but it is worth
          making deliberately:
        </p>
        <ul>
          <li>
            <strong>UPPERCASE keywords</strong> are the classic convention. They make keywords
            stand out from table and column names even without syntax highlighting — useful in
            plain-text logs, terminals, and documentation.
          </li>
          <li>
            <strong>lowercase keywords</strong> are increasingly popular in modern codebases,
            where editors highlight keywords anyway. Lowercase is easier to type and some teams
            find it less &quot;shouty&quot; in large query files.
          </li>
        </ul>
        <p>
          Either choice is fine; mixing both in one codebase is not. Pick one, put it in your style
          guide, and use the keyword-case selector above to normalize existing queries. For a
          deeper look at the tradeoffs, see our guide on{' '}
          <Link href="/blog/sql-keywords-uppercase-or-lowercase">
            whether SQL keywords should be uppercase or lowercase
          </Link>
          .
        </p>

        <h3>The clause-per-line layout</h3>
        <p>
          This formatter follows the most widely adopted SQL layout: one major clause per line,
          with continuation conditions indented. For example:
        </p>
        <pre
          style={{
            background: '#0f172a',
            color: '#e2e8f0',
            padding: 12,
            borderRadius: 8,
            overflowX: 'auto',
          }}
        >
          <code>{`SELECT o.id, o.total, c.name
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'paid'
  AND o.total > 100
ORDER BY o.created_at DESC
LIMIT 50`}</code>
        </pre>
        <p>
          The vertical structure mirrors how you reason about a query: what am I selecting, from
          where, joined to what, filtered how, ordered by what. Each question gets its own line.
        </p>

        <h3>Consistency across a team</h3>
        <p>
          Formatting arguments waste review time; conventions end them. The most effective setup is
          a short, written SQL style guide (keyword case, clause layout, alias rules, comma
          placement) combined with tooling that applies it automatically, so no one has to format
          by hand or nitpick in review. Use this tool to normalize one-off queries, and see our{' '}
          <Link href="/blog/sql-formatting-best-practices-style-guide">
            SQL formatting best practices and style guide
          </Link>{' '}
          for a template you can adopt as-is. If you review SQL regularly, our{' '}
          <Link href="/blog/sql-code-review-checklist">SQL code review checklist</Link> covers what
          to look for beyond formatting.
        </p>

        <h3>When to minify instead</h3>
        <p>
          Sometimes you want the opposite of pretty: a compact single line. Minifying is useful
          when embedding SQL in a JSON config, a shell command, a log statement, or a code string
          where line breaks would need escaping. The <strong>Minify</strong> button collapses all
          whitespace runs to single spaces while leaving string literals untouched, so the query
          remains exactly equivalent.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: SQL Formatter</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Need to write a query from scratch? Try the <Link href="/sql-generator">SQL Generator</Link>,
          or paste a confusing query into the <Link href="/sql-explainer">SQL Explainer</Link>. To go
          deeper, read{' '}
          <Link href="/blog/sql-formatting-best-practices-style-guide">
            SQL Formatting Best Practices &amp; Style Guide
          </Link>
          ,{' '}
          <Link href="/blog/sql-keywords-uppercase-or-lowercase">
            SQL Keywords: Uppercase or Lowercase?
          </Link>
          , and the <Link href="/blog/sql-code-review-checklist">SQL Code Review Checklist</Link>.
        </p>
      </div>
    </div>
  );
}
