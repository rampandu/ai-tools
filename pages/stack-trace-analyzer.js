// pages/stack-trace-analyzer.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const DEFAULT_TRACE = `TypeError: Cannot read properties of undefined (reading 'map')
    at renderList (app.js:42:18)
    at Object.render (app.js:12:5)
    at main (app.js:3:1)`;

const EXAMPLES = [
  {
    label: 'JS TypeError',
    trace: `TypeError: Cannot read properties of undefined (reading 'map')
    at renderList (app.js:42:18)
    at Object.render (app.js:12:5)
    at main (app.js:3:1)`,
  },
  {
    label: 'Python Traceback (KeyError)',
    trace: `Traceback (most recent call last):
  File "app.py", line 22, in <module>
    main()
  File "app.py", line 15, in main
    user = users['admin']
KeyError: 'admin'`,
  },
  {
    label: 'Node ECONNREFUSED',
    trace: `Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1146:16)
    at Pool.connect (db.js:20:10)
    at startServer (server.js:8:3)`,
  },
  {
    label: 'Java NullPointerException',
    trace: `Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "name" is null
    at com.example.App.printName(App.java:14)
    at com.example.App.main(App.java:6)`,
  },
  {
    label: 'JS Module Not Found',
    trace: `Error: Cannot find module './utils/helpers'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:815:15)
    at Function.Module._load (internal/modules/cjs/loader.js:667:27)
    at Module.require (internal/modules/cjs/loader.js:887:19)`,
  },
];

const FAQ = [
  {
    q: 'Is this Stack Trace Analyzer free?',
    a: 'Yes — the Stack Trace Analyzer on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Which languages/runtimes does it support?',
    a: 'It pattern-matches common JavaScript/Node.js, Python, and Java error signatures. It is not a full multi-language parser, so highly unusual or custom exception formats may not be recognized — but the general debugging steps still apply.',
  },
  {
    q: 'Is my stack trace sent to a server?',
    a: 'Yes — the trace is sent to our API for analysis so the pattern-matching logic can run, but it is not stored or logged beyond what is needed to return the result.',
  },
];

export default function StackTraceAnalyzerPage() {
  const [trace, setTrace] = useState(DEFAULT_TRACE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/stack-trace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trace }),
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
    } catch (err) {
      console.error(err);
      setError(err?.error || err?.details || err?.message || 'Unknown error');
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
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Stack Trace Analyzer', item: 'https://dev-brains-ai.com/stack-trace-analyzer' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Stack Trace Analyzer — Debug Errors Fast | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste a full multi-line stack trace and instantly get the error type, the likely origin frame, a plain-English explanation, and suggested fixes. Free, no signup."
        />
        <meta
          name="keywords"
          content="stack trace analyzer, stack trace explainer, debug stack trace, error trace analyzer, Dev Brains AI"
        />
        <meta property="og:title" content="Free Stack Trace Analyzer — Debug Errors Fast" />
        <meta
          property="og:description"
          content="Paste a full stack trace and get the error type, origin frame, explanation, and fixes — free stack trace analyzer for developers."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/stack-trace-analyzer" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/stack-trace-analyzer" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            <li aria-current="page">Stack Trace Analyzer</li>
          </ol>
        </nav>

        <h1>Free Stack Trace Analyzer</h1>
        <p className="small">
          Paste a <strong>full multi-line stack trace</strong> below and click{' '}
          <strong>Analyze Trace</strong> to extract the error type, the likely origin frame, a
          plain-English explanation, and suggested fixes. Works best for JavaScript/Node.js,
          Python, and Java traces.
        </p>

        <label htmlFor="trace-input">
          <strong>Stack trace</strong>
        </label>
        <textarea
          id="trace-input"
          value={trace}
          onChange={(e) => setTrace(e.target.value)}
          style={{ minHeight: 220 }}
          placeholder="Paste your full stack trace here..."
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleAnalyze} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Trace'}
          </button>
          <button
            type="button"
            onClick={() => {
              setTrace('');
              setResult(null);
              setError(null);
            }}
          >
            Clear
          </button>
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
                  setTrace(ex.trace);
                  setResult(null);
                  setError(null);
                }}
              >
                {ex.label}
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

          {result && (
            <div style={{ marginTop: 4 }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 8 }}>
                {result.errorType || 'Error'}
              </h2>
              <p className="small">{result.message}</p>

              {result.originFrame && (
                <>
                  <h3 style={{ marginTop: 16, marginBottom: 6 }}>Likely origin</h3>
                  <pre
                    style={{
                      background: '#0f172a',
                      color: '#e2e8f0',
                      padding: 12,
                      borderRadius: 8,
                      overflowX: 'auto',
                    }}
                  >
                    <code>{result.originFrame}</code>
                  </pre>
                </>
              )}

              <h3 style={{ marginTop: 16, marginBottom: 6 }}>Explanation</h3>
              <p className="small">{result.explanation}</p>

              {result.fixes && result.fixes.length > 0 && (
                <>
                  <h3 style={{ marginTop: 16, marginBottom: 6 }}>Suggested fixes</h3>
                  <ul className="small" style={{ paddingLeft: 20 }}>
                    {result.fixes.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Analyze Trace</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this Stack Trace Analyzer</h2>
        <p>
          A single error message often only tells part of the story. The full stack trace shows
          the entire call chain that led to the failure, which is essential for tracking down the
          real cause instead of just the symptom. This Stack Trace Analyzer is built for exactly
          that: paste a complete, multi-line trace and it will extract the error type, the
          message, and the frame where the problem most likely originated, then match it against a
          library of common error patterns to give you a plain-English explanation and concrete
          fixes.
        </p>
        <p>
          Unlike a general error-message explainer, this tool is designed around the structure of
          a real stack trace — the header line, the indented frames below it, and the file/line
          references that pinpoint where things went wrong. It works entirely through fast,
          deterministic pattern matching, so results are instant and consistent.
        </p>

        <h3>How to read a stack trace</h3>
        <p>
          Stack traces can look intimidating, but they follow a predictable structure once you
          know what to look for:
        </p>
        <ul>
          <li>
            <strong>The first line</strong> usually contains the error type (like{' '}
            <code>TypeError</code> or <code>NullPointerException</code>) and a message describing
            what went wrong.
          </li>
          <li>
            <strong>The frames below it</strong> show the call chain, with the topmost frame being
            the innermost, most recent call — the place closest to where the error actually
            occurred.
          </li>
          <li>
            <strong>Frames further down</strong> show the callers that led to that point, tracing
            back through your application until the entry point (like <code>main</code> or a
            request handler).
          </li>
          <li>
            In Python, the trace is read in reverse: the last line has the error type and message,
            and the frames above it are listed from the outermost call down to the innermost.
          </li>
        </ul>
        <p>
          In most cases, focus your attention on the topmost frame that points to code you
          actually wrote (as opposed to library or framework internals) — that is usually the most
          useful place to start debugging.
        </p>

        <h3>Common error patterns this tool recognizes</h3>
        <ul>
          <li>
            <strong>TypeErrors</strong> — calling something that is not a function, or using a
            value in a way that does not match its type.
          </li>
          <li>
            <strong>Null/undefined access</strong> — reading a property on a value that was never
            initialized or that turned out to be null.
          </li>
          <li>
            <strong>Module resolution errors</strong> — a required file or package could not be
            found.
          </li>
          <li>
            <strong>JSON parsing errors</strong> — malformed JSON or a non-JSON response being
            parsed as JSON.
          </li>
          <li>
            <strong>Recursion/stack overflow errors</strong> — a function calling itself without a
            proper base case.
          </li>
          <li>
            <strong>Network and port errors</strong> — connection refused, address already in use,
            and permission-denied issues.
          </li>
          <li>
            <strong>Java NullPointerExceptions</strong> — dereferencing a null object reference.
          </li>
          <li>
            <strong>Python IndexError and KeyError</strong> — accessing a list index or dictionary
            key that does not exist.
          </li>
        </ul>

        <h3>Tips for pasting a useful trace</h3>
        <ul>
          <li>Paste the full trace, not just the first line — the frames matter for context.</li>
          <li>
            Do not truncate or trim the middle of the trace; the origin frame is usually near the
            top.
          </li>
          <li>
            Remove any sensitive data first (API keys, tokens, internal hostnames, customer data)
            before pasting anywhere, including here.
          </li>
          <li>
            If the trace spans multiple errors (e.g. a caused-by chain), paste the most relevant
            one, or the first error in the chain.
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: Stack Trace Analyzer</h3>
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
          Just have a single error line? Try the{' '}
          <Link href="/ai-error-explainer">AI Error Message Explainer</Link> instead. Need to
          understand a code snippet? Check out the{' '}
          <Link href="/code-explainer">Code Explainer</Link>. You might also like these guides:{' '}
          <Link href="/blog/common-nodejs-npm-errors-and-fixes">
            Common Node.js &amp; npm Errors and Fixes
          </Link>{' '}
          and{' '}
          <Link href="/blog/debugging-memory-leaks-in-nodejs">
            Debugging Memory Leaks in Node.js
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
