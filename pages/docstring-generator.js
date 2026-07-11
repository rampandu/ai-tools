// pages/docstring-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const EXAMPLES = [
  'function calculateTotalPrice(items, taxRate)',
  'function getUserById(id)',
  'def validate_email(email):',
  'const fetchOrderHistory = (userId, limit) => {}',
  'function hasPermission(user, action)'
];

const FAQ = [
  { q: 'Is this free?', a: 'Yes — the Docstring Generator is completely free, with no signup and no usage limits beyond basic rate limiting.' },
  { q: 'Does it understand what my function actually does?', a: 'No — this tool does not read your function body or understand its logic. It uses naming conventions like getX, isX, hasX, and createX to guess a plausible starting description based on the function name. You should always review and refine the generated text to accurately describe what your function really does.' },
  { q: 'Which languages are supported?', a: 'Currently JavaScript (JSDoc-style comments) and Python (docstrings) are supported. The tool auto-detects the language from your function signature.' }
];

export default function DocstringGenerator() {
  const [signature, setSignature] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/docstring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature })
      });
      const j = await res.json();
      if (!res.ok) throw j;
      setResult(j);
    } catch (err) {
      console.error(err);
      setError(err?.error || err?.details || (err?.message ?? 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  async function copyText() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.docstring);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dev-brains-ai.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Docstring Generator",
        "item": "https://dev-brains-ai.com/docstring-generator"
      }
    ]
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Docstring &amp; JSDoc Generator | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate JSDoc comments and Python docstrings instantly from a function signature. Paste your function, get a documentation template with a guessed description — free, no signup."
        />
        <meta
          name="keywords"
          content="docstring generator, jsdoc generator, python docstring generator, code comment generator, function documentation generator"
        />
        <meta property="og:title" content="Free Docstring &amp; JSDoc Generator" />
        <meta
          property="og:description"
          content="Paste a JavaScript or Python function signature and get an instant JSDoc comment or Python docstring template — free, no signup required."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/docstring-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/docstring-generator" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
              margin: 0
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Docstring Generator</li>
          </ol>
        </nav>

        <h1>Free Docstring &amp; JSDoc Generator</h1>
        <p className="small">
          Paste a function signature and get a ready-to-use <strong>JSDoc</strong> comment or{' '}
          <strong>Python docstring</strong> template instantly — complete with a parameter list
          and a heuristic one-line description guessed from your function name. No signup, no
          cost, no limit. Great for quickly scaffolding documentation before filling in the
          details.
        </p>

        <label htmlFor="signature"><strong>Function signature</strong></label>
        <textarea id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Docstring'}
          </button>
          <button onClick={() => { setSignature(''); setResult(null); setError(null); }}>Clear</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => setSignature(ex)} className="small">
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
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <button onClick={copyText}>{copied ? 'Copied!' : 'Copy'}</button>
                <div className="small" style={{ color: '#666' }}>
                  Language: {result.language === 'python' ? 'Python' : 'JavaScript'}
                </div>
              </div>
              <pre aria-label="Result output" style={{ whiteSpace: 'pre-wrap' }}>{result.docstring}</pre>
              <div className="small" style={{ marginTop: 8, color: '#666' }}>
                Guessed description: <strong>{result.description}</strong>
                <br />
                Auto-generated — edit this description to be more specific.
              </div>
            </div>
          )}
          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Generate Docstring</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content for AdSense & Google */}
      <div className="card">
        <h2>About this Docstring Generator</h2>
        <p>
          Documenting functions is easy to skip when you're moving fast, but it makes a huge
          difference for anyone reading your code later — including future you. This Docstring
          Generator takes a function signature and instantly produces a documentation template:
          a <strong>JSDoc</strong> comment block for JavaScript, or a <strong>docstring</strong>{' '}
          for Python, complete with a parameter list and a suggested one-line description.
        </p>
        <p>
          Just paste a signature like <code>function getUserById(id)</code> or{' '}
          <code>def validate_email(email):</code> and the tool detects the language, extracts the
          function name and parameters, and builds a ready-to-edit comment block around them.
        </p>

        <h3>JSDoc vs Python docstrings</h3>
        <p>
          JSDoc is the de-facto standard for documenting JavaScript functions using{' '}
          <code>/** ... */</code> block comments with tags like <code>@param</code> and{' '}
          <code>@returns</code>. Editors like VS Code read JSDoc comments to power autocomplete
          and inline type hints, even in plain JavaScript files. Python docstrings use triple
          quotes (<code>&quot;&quot;&quot;...&quot;&quot;&quot;</code>) placed directly under the
          function definition, typically following the Google or NumPy style with{' '}
          <code>Args:</code> and <code>Returns:</code> sections — this tool generates the
          Google-style format. Both formats are picked up automatically by documentation
          generators and IDE tooltips.
        </p>

        <h3>Why document functions</h3>
        <ul>
          <li>Saves reviewers and teammates from having to read the full implementation to understand intent</li>
          <li>Powers IDE autocomplete, inline hints, and type checking tools</li>
          <li>Makes onboarding new developers to a codebase faster</li>
          <li>Forms the basis for auto-generated API reference documentation</li>
          <li>Encourages you to think through parameters and return values while writing the function</li>
        </ul>

        <h3>How the description is guessed</h3>
        <p>
          The generator does not read or execute your function — it only looks at the function
          name. It splits camelCase, PascalCase, and snake_case names into individual words (for
          example <code>calculateTotalPrice</code> becomes "calculate total price"), then checks
          whether the first word is a common verb like <code>get</code>, <code>is</code>,{' '}
          <code>has</code>, <code>create</code>, <code>fetch</code>, or <code>validate</code>. If
          it recognizes the verb, it fills in a template sentence around the remaining words (for
          example <code>hasPermission</code> becomes "Checks whether it has permission."). If the
          verb isn't recognized, it falls back to capitalizing the words as a generic sentence.
          This is a simple naming-convention heuristic, not code analysis — it will not catch
          edge cases, side effects, or anything not reflected in the function's name.
        </p>

        <h3>Tips for better docs</h3>
        <ul>
          <li>Always review and rewrite the guessed description to reflect what the function actually does</li>
          <li>Replace the generic <code>{'{*}'}</code> types in JSDoc with real types like <code>{'{string}'}</code> or <code>{'{number}'}</code></li>
          <li>Fill in the <code>Returns:</code> / <code>@returns</code> section — the generator leaves it blank</li>
          <li>Mention side effects (network calls, mutations, thrown errors) that aren't obvious from the name</li>
          <li>Keep descriptions short and specific rather than restating the function name in words</li>
        </ul>
      </div>

      <div className="card">
        <h3>FAQ</h3>
        {FAQ.map((f, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{f.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>{f.a}</div>
          </div>
        ))}
      </div>

      <div className="card small">
        <h4>More developer tools &amp; guides</h4>
        <ul className="small">
          <li><Link href="/unit-test-generator">Unit Test Generator</Link></li>
          <li><Link href="/code-explainer">Code Explainer</Link></li>
          <li><Link href="/blog/ai-powered-code-documentation-generator-guide">AI-Powered Code Documentation Generator Guide</Link></li>
        </ul>
      </div>
    </div>
  );
}
