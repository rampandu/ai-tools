// pages/code-explainer.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const DEFAULT_CODE = `function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    if (item.price > 0) {
      total += item.price * item.quantity;
    }
  }
  return total;
}`;

const EXAMPLES = [
  {
    label: 'JS array processing',
    language: 'javascript',
    code: DEFAULT_CODE,
  },
  {
    label: 'Python loop',
    language: 'python',
    code: `def total_price(items):
    total = 0
    for item in items:
        if item['price'] > 0:
            total += item['price'] * item['quantity']
    return total`,
  },
  {
    label: 'JS class',
    language: 'javascript',
    code: `class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async getUserById(id) {
    return this.db.users.find(id);
  }
}`,
  },
  {
    label: 'JS try/catch',
    language: 'javascript',
    code: `async function fetchUserProfile(userId) {
  try {
    const res = await fetch('/api/users/' + userId);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}`,
  },
];

const FAQ = [
  {
    q: 'Is this Code Explainer free?',
    a: 'Yes — the Code Explainer on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Does it explain business logic or just structure?',
    a: 'It explains structure and gives naming-based guesses for what each function likely does — it detects functions, classes, loops, conditionals, try/catch blocks, and imports. For deep understanding of complex business logic, you still need to read the code, but this tool helps you get oriented fast.',
  },
  {
    q: 'Which languages are supported?',
    a: 'JavaScript, Python, and Java are supported, either auto-detected or manually selected from the dropdown.',
  },
];

export default function CodeExplainerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleExplain() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/code-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
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
      { '@type': 'ListItem', position: 2, name: 'Code Explainer', item: 'https://dev-brains-ai.com/code-explainer' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Code Explainer — Understand Any Code Snippet | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste a JavaScript, Python, or Java code snippet and get a structural, plain-English breakdown: functions, loops, conditionals, imports, and more. Free."
        />
        <meta
          name="keywords"
          content="code explainer, explain code, understand code snippet, code breakdown, what does this code do, Dev Brains AI"
        />
        <meta property="og:title" content="Free Code Explainer — Understand Any Code Snippet" />
        <meta
          property="og:description"
          content="Paste code and get a structural breakdown of functions, loops, conditionals, and imports — free code explainer for developers."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/code-explainer" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/code-explainer" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <div className="card" aria-live="polite">
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Code Explainer</li>
          </ol>
        </nav>

        <h1>Free Code Explainer</h1>
        <p className="small">
          Paste a code snippet below and click <strong>Explain Code</strong> to get a structural,
          plain-English breakdown — functions, classes, loops, conditionals, try/catch blocks, and
          imports. Works for <strong>JavaScript</strong>, <strong>Python</strong>, and{' '}
          <strong>Java</strong>.
        </p>

        <label htmlFor="code-input"><strong>Code</strong></label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ minHeight: 220, fontFamily: 'ui-monospace, Menlo, Monaco, monospace' }}
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <label htmlFor="language-select" className="small" style={{ fontWeight: 600 }}>Language</label>
          <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: 'auto' }}>
            <option value="auto">Auto-detect</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleExplain} disabled={loading}>
            {loading ? 'Explaining...' : 'Explain Code'}
          </button>
          <button type="button" onClick={() => { setCode(''); setResult(null); setError(null); }}>Clear</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                className="small"
                onClick={() => { setCode(ex.code); setLanguage(ex.language); setResult(null); setError(null); }}
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
                Detected language: {result.language}
              </h2>

              <h3 style={{ marginTop: 16, marginBottom: 6 }}>Summary</h3>
              <ul className="small" style={{ paddingLeft: 20 }}>
                {result.summaryLines?.map((line, i) => <li key={i}>{line}</li>)}
              </ul>

              {result.functionDetails && result.functionDetails.length > 0 && (
                <>
                  <h3 style={{ marginTop: 16, marginBottom: 6 }}>Functions found</h3>
                  <ul className="small" style={{ paddingLeft: 20 }}>
                    {result.functionDetails.map((f, i) => (
                      <li key={i}><code>{f.name}</code> — {f.oneLiner}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Explain Code</strong>.
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>About this Code Explainer</h2>
        <p>
          Jumping into an unfamiliar codebase — a legacy file, a coworker's pull request, or a
          snippet from Stack Overflow — usually means reading line by line just to understand what
          it does before you can even start reviewing or reusing it. This Code Explainer speeds up
          that first pass. Paste a snippet and it scans the structure to tell you what functions
          and classes it defines, how many loops and conditionals it contains, whether it handles
          errors with try/catch, and which modules it imports.
        </p>
        <p>
          For each detected function, the tool also makes an educated guess at what it does based
          on its name — a function called <code>getUserById</code> is guessed as "gets user by id,"
          for example. This is a heuristic, not true code comprehension, but naming conventions are
          consistent enough in most real codebases that it gives a genuinely useful head start.
        </p>

        <h3>What it detects</h3>
        <ul>
          <li><strong>Functions and methods</strong>, with a guessed one-line description based on naming conventions</li>
          <li><strong>Classes</strong> defined in the snippet</li>
          <li><strong>Loops</strong> — <code>for</code> and <code>while</code> constructs</li>
          <li><strong>Conditionals</strong> — <code>if</code> statements</li>
          <li><strong>Error handling</strong> — <code>try</code>/<code>catch</code> (or <code>try</code>/<code>except</code>) blocks</li>
          <li><strong>Imports</strong> — <code>import</code>, <code>from ... import</code>, and <code>require()</code> statements</li>
          <li><strong>Return statements</strong> and overall line count</li>
        </ul>

        <h3>How it's different from an AI code assistant</h3>
        <p>
          To be transparent: this tool uses structural pattern detection, not a language model with
          deep semantic understanding. It won't explain intricate business logic or subtle bugs the
          way a senior engineer reading the code carefully would. What it's good at is orientation —
          quickly answering "what is even in this file?" before you dive into the details yourself.
        </p>

        <h3>Supported languages</h3>
        <p>
          JavaScript, Python, and Java are supported. Use auto-detect for a quick guess based on
          syntax patterns (like <code>def</code> and Python-style imports, or <code>public class</code>
          for Java), or select the language manually if auto-detection picks the wrong one.
        </p>

        <h3>Tips for getting a useful breakdown</h3>
        <ul>
          <li>Paste a complete function or class rather than a fragment — the parser looks for full declarations.</li>
          <li>If auto-detect guesses the wrong language, select it manually from the dropdown.</li>
          <li>Use the function list as a table of contents before reading the full snippet line by line.</li>
        </ul>
      </div>

      <div className="card">
        <h3>FAQ: Code Explainer</h3>
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
          Have a full error and want the origin traced? Try the{' '}
          <Link href="/stack-trace-analyzer">Stack Trace Analyzer</Link>. Need to document a
          function you just understood? Use the{' '}
          <Link href="/docstring-generator">Docstring Generator</Link>. Related guide:{' '}
          <Link href="/blog/how-ai-code-generators-work-explained">How AI Code Generators Work, Explained</Link>.
        </p>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: reading code</h3>
        <ul className="small">
          <li><Link href="/blog/how-to-quickly-understand-unfamiliar-code">How to Quickly Understand Unfamiliar Code</Link></li>
          <li><Link href="/blog/how-ai-code-generators-work-explained">How AI Code Generators Work, Explained</Link></li>
          <li><Link href="/blog/ai-code-review-tools-for-developers">AI Code Review Tools for Developers — What They Catch and What They Miss</Link></li>
        </ul>
      </div>

    </div>
  );
}
