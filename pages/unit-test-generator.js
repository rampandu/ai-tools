// pages/unit-test-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const DEFAULT_SIGNATURE = 'function add(a, b)';

const EXAMPLES = [
  'function add(a, b)',
  'function isValidEmail(email)',
  'def calculate_discount(price, percent):',
  'const mergeArrays = (a, b) => {}',
  'function fetchUserProfile(userId)',
];

const FAQ = [
  {
    q: 'Is this Unit Test Generator free?',
    a: 'Yes — the Unit Test Generator on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Does it generate real assertions automatically?',
    a: 'No — it creates a correctly structured scaffold (imports, describe/it blocks or test functions) with clear TODOs. You fill in real inputs and expected outputs, since the tool cannot know your function’s actual behavior.',
  },
  {
    q: 'Which test frameworks are supported?',
    a: 'Jest for JavaScript and pytest for Python. The language is auto-detected from the signature you paste.',
  },
];

export default function UnitTestGeneratorPage() {
  const [signature, setSignature] = useState(DEFAULT_SIGNATURE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/unit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature }),
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

  function copyTest() {
    if (!result?.testCode) return;
    navigator.clipboard?.writeText(result.testCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
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
      { '@type': 'ListItem', position: 2, name: 'Unit Test Generator', item: 'https://dev-brains-ai.com/unit-test-generator' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Unit Test Generator — Jest &amp; pytest Scaffolds | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste a JavaScript or Python function signature and get a ready-to-run Jest or pytest test scaffold with clear TODOs. Free, no signup."
        />
        <meta
          name="keywords"
          content="unit test generator, jest test generator, pytest test generator, generate unit tests, test scaffold, Dev Brains AI"
        />
        <meta property="og:title" content="Free Unit Test Generator — Jest &amp; pytest Scaffolds" />
        <meta
          property="og:description"
          content="Generate a Jest or pytest test scaffold from a function signature — free unit test generator for developers."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/unit-test-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/unit-test-generator" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <div className="card" aria-live="polite">
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Unit Test Generator</li>
          </ol>
        </nav>

        <h1>Free Unit Test Generator</h1>
        <p className="small">
          Paste a function signature below and click <strong>Generate Test</strong> to get a
          ready-to-run test scaffold — <strong>Jest</strong> for JavaScript, <strong>pytest</strong>{' '}
          for Python — with clear TODOs for the real inputs and expected outputs.
        </p>

        <label htmlFor="signature-input"><strong>Function signature</strong></label>
        <textarea
          id="signature-input"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          style={{ minHeight: 80, fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Test'}
          </button>
          <button type="button" onClick={() => { setSignature(''); setResult(null); setError(null); }}>Clear</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex} type="button" className="small" onClick={() => { setSignature(ex); setResult(null); setError(null); }}>
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

          {result && (
            <div style={{ marginTop: 4 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <button type="button" onClick={copyTest}>{copied ? 'Copied!' : 'Copy'}</button>
                <div className="small" style={{ color: '#666' }}>Framework: {result.framework}</div>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{result.testCode}</pre>
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Generate Test</strong>.
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>About this Unit Test Generator</h2>
        <p>
          Starting a test file from a completely blank page is one of the most common reasons tests
          get skipped. This Unit Test Generator removes that friction: paste a function signature
          and it instantly produces a correctly structured test file — imports, a describe/it block
          for Jest, or properly named test functions for pytest — with the plumbing already in
          place so you can focus on the part that actually matters: real inputs and expected
          outputs.
        </p>
        <p>
          This is intentionally a scaffold, not a claim of automatically-generated coverage. The
          tool cannot know what your function is supposed to return for a given input, so every
          scaffold includes clear <code>TODO</code> markers where you fill in the specifics.
        </p>

        <h3>Why start from a scaffold instead of writing tests from scratch</h3>
        <ul>
          <li>Removes the "blank file" friction that causes tests to be skipped or postponed</li>
          <li>Guarantees correct file structure and naming conventions for the framework</li>
          <li>Reminds you to cover edge cases, not just the happy path</li>
        </ul>

        <h3>Jest vs pytest basics</h3>
        <p>
          Jest is the default test framework for most JavaScript and TypeScript projects: tests are
          grouped in <code>describe()</code> blocks and individual cases use <code>it()</code> or{' '}
          <code>test()</code>, with assertions via <code>expect(value).toBe(...)</code>. pytest is
          the equivalent for Python: test files and functions are prefixed with <code>test_</code>,
          and assertions use the plain <code>assert</code> keyword rather than a matcher API.
        </p>

        <h3>How to fill in the TODOs</h3>
        <ul>
          <li>Pick a realistic "typical" input for your function and manually compute (or run it) the expected output.</li>
          <li>Add edge cases: empty input, <code>null</code>/<code>None</code>, zero, negative numbers, very large inputs.</li>
          <li>If the function throws on invalid input, add a test that asserts it throws/raises.</li>
        </ul>

        <h3>Tips for good test coverage</h3>
        <p>
          Aim for at least one happy-path test and one edge-case test per function, and prefer many
          small, focused tests over one large test that checks everything at once — it makes
          failures much easier to diagnose.
        </p>
      </div>

      <div className="card">
        <h3>FAQ: Unit Test Generator</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>{item.a}</div>
          </div>
        ))}
      </div>

      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Need to document the same function first? Try the{' '}
          <Link href="/docstring-generator">Docstring Generator</Link>. Want a structural breakdown
          of existing code before testing it? Use the{' '}
          <Link href="/code-explainer">Code Explainer</Link>.
        </p>
      </div>
    </div>
  );
}
