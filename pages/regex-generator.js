// pages/regex-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResultBox from '../components/ResultBox';
import RegexTester from '../components/RegexTester';

const EXAMPLES = [
  'regex for valid Indian mobile number',
  'regex to match email address',
  'regex for date in DD-MM-YYYY',
  'regex to validate IPv4 address',
  'exactly 4 digits'
];

const FAQ = [
  { q: 'Is this regex generator free?', a: 'Yes — the basic regex generator is free and deterministic (rule-based).' },
  { q: 'Is the output always accurate?', a: 'The generator handles common patterns reliably. Always test and review the regex for edge cases before production use.' },
  { q: 'Can I use the regex in my app?', a: 'Yes — use the Copy or Use in my app buttons to paste snippets into your code.' },
  { q: 'Is there a free online regex builder?', a: 'Yes — this is a completely free online regex builder. Describe your pattern in plain English (for example "match a valid email address") and it generates a working regular expression instantly, with no signup, no account, and no daily limit.' },
  { q: 'What is an AI regex generator?', a: 'An AI regex generator turns a plain-English description of what you want to match into a working regular expression automatically, so you do not have to memorise regex syntax or hand-write character classes and quantifiers yourself.' },
  { q: 'Does this tool test my regex too?', a: 'Yes. Every pattern this generator produces is fed straight into the built-in Regex Tester below the results — paste sample text, set flags like i or g, and see a live match result and captured groups without leaving the page.' },
  { q: "What's the difference between a regex builder and a regex tester?", a: 'A regex builder (or generator) creates a brand-new pattern from a description. A regex tester checks whether an existing pattern matches specific input text. This page includes both — use the builder to generate a pattern, then the tester below it to validate that pattern against your own sample data.' },
  { q: 'How is this different from asking ChatGPT for a regex?', a: 'This generator is deterministic and rule-based rather than a live language model call — the same prompt always produces the same pattern, instantly, with no signup, rate limit, or risk of a hallucinated pattern that looks plausible but is subtly wrong. It covers common, well-defined pattern types reliably; for a pattern this tool does not recognise, a general-purpose AI chat tool may still be worth trying.' },
  { q: 'Can I generate a regex for Indian ID formats like Aadhaar or PAN?', a: 'This generator includes common formats like Indian phone numbers out of the box. For the full set of Indian ID and document formats — Aadhaar, PAN, GSTIN, IFSC, passport, PIN code, and driving license — see the dedicated guide to regex for Indian ID and document validation, which covers which of these have a checksum digit regex cannot verify.' }
];

export default function RegexGenerator() {
  const [prompt, setPrompt] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem('ai_regex_history') || '[]')); } catch {}
  }, []);

  function pushHistory(prompt, out) {
    try {
      const h = JSON.parse(localStorage.getItem('ai_regex_history') || '[]');
      const entry = { prompt, out, ts: Date.now() };
      const newH = [entry, ...h].slice(0, 20);
      localStorage.setItem('ai_regex_history', JSON.stringify(newH));
      setHistory(newH);
    } catch {}
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/regex', {
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

  // JSON-LD structured data for FAQ
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
        "name": "Regex Generator",
        "item": "https://dev-brains-ai.com/regex-generator"
      }
    ]
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>AI Regex Generator — Free Online Regex Builder &amp; Tester | Dev Brains AI</title>
        <meta
          name="description"
          content="Free AI regex generator and online regex builder. Describe a pattern in plain English, get a working regex with a clear explanation, then test it live."
        />
        <meta
          name="keywords"
          content="regex generator, ai regex, regex builder, online regex builder, online regex expression builder, regular expression generator, regex ai generator, automatic regex generator, regular expression builder, regex pattern generator, regex tester"
        />
        <meta property="og:title" content="AI Regex Generator — Free Online Regex Builder &amp; Tester" />
        <meta
          property="og:description"
          content="Describe a pattern in plain English and get a working regular expression instantly — free AI regex generator with a built-in live tester. Works for JavaScript, Python, and all major languages."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/regex-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/regex-generator" />

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
            <li aria-current="page">Regex Generator</li>
          </ol>
        </nav>

        <h1>Free AI Regex Generator — Online Regex Builder</h1>
        <p className="small">
          Type a plain English description and get an accurate regular expression instantly — with a
          full explanation and live tester. Works for <strong>JavaScript</strong>,{" "}
          <strong>Python</strong>, <strong>Java</strong>, and all languages that support standard
          regex. No signup, no cost, no limit. Great for email validation, phone numbers, date
          formats, URL matching, and custom patterns.
        </p>

        <label htmlFor="prompt"><strong>Prompt</strong></label>
        <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Regex'}
          </button>
          <button onClick={() => { setPrompt(''); setResult(null); setError(null); }}>Clear</button>
          <button onClick={() => { navigator.clipboard?.writeText(prompt); }}>Copy Prompt</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
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
          {result && <ResultBox data={result} />}
          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Generate Regex</strong>.
            </div>
          )}
        </div>

        {/* Regex Tester — interactive */}
        <RegexTester pattern={result?.regex ?? result?.out ?? null} />
      </div>

      {/* SEO Content for AdSense & Google */}
      <div className="card">
        <h2>About this AI Regex Generator</h2>
        <p>
          Regular expressions (regex) are a compact and powerful way to match text patterns, but
          they can be confusing and difficult to write correctly. This free <strong>AI regex
          generator</strong> and <strong>online regex builder</strong> is built to help you create
          accurate, production-ready patterns without memorising complex syntax — see the full{' '}
          <Link href="/blog/ai-regex-generator-guide">guide to using an AI regex generator</Link>{' '}
          for a step-by-step walkthrough.
        </p>

        <p>
          Simply describe your requirement in plain English — for example,
          <i> "match valid email addresses"</i> or <i>"extract phone numbers from text"</i> — and this tool
          will instantly generate a clean, usable regular expression along with a plain-English
          explanation. Once you have a pattern, the built-in <strong>Regex Tester</strong> above lets
          you paste sample text and see live match results and captured groups, so this single page
          works as both a regex builder and a regex tester.
        </p>

        <svg
          viewBox="0 0 640 210"
          style={{ width: '100%', height: 'auto', marginBottom: 18, borderRadius: 8, background: '#0f172a' }}
          role="img"
          aria-label="Diagram labeling the anchor, group, character class, quantifier, and literal parts of a sample regex pattern"
        >
          <rect x="0" y="0" width="640" height="210" rx="10" fill="#0f172a" />
          <text x="320" y="34" textAnchor="middle" fill="#94a3b8" fontSize="13" fontFamily="ui-monospace, monospace">Anatomy of a regex pattern (US phone number)</text>
          <text x="320" y="78" textAnchor="middle" fontSize="22" fontFamily="ui-monospace, monospace">
            <tspan fill="#34d399" fontWeight="700">^</tspan>
            <tspan fill="#5eead4">(</tspan>
            <tspan fill="#e2e8f0">\d</tspan>
            <tspan fill="#fbbf24">{'{3}'}</tspan>
            <tspan fill="#5eead4">)</tspan>
            <tspan fill="#94a3b8">-</tspan>
            <tspan fill="#5eead4">(</tspan>
            <tspan fill="#e2e8f0">\d</tspan>
            <tspan fill="#fbbf24">{'{3}'}</tspan>
            <tspan fill="#5eead4">)</tspan>
            <tspan fill="#94a3b8">-</tspan>
            <tspan fill="#5eead4">(</tspan>
            <tspan fill="#e2e8f0">\d</tspan>
            <tspan fill="#fbbf24">{'{4}'}</tspan>
            <tspan fill="#5eead4">)</tspan>
            <tspan fill="#34d399" fontWeight="700">$</tspan>
          </text>
          <rect x="30" y="112" width="12" height="12" fill="#34d399" />
          <text x="48" y="122" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Anchor — ^ start, $ end</text>
          <rect x="230" y="112" width="12" height="12" fill="#5eead4" />
          <text x="248" y="122" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Group — parentheses</text>
          <rect x="420" y="112" width="12" height="12" fill="#e2e8f0" />
          <text x="438" y="122" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Character class — \d</text>
          <rect x="30" y="140" width="12" height="12" fill="#fbbf24" />
          <text x="48" y="150" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Quantifier — {'{3}'} means exactly 3</text>
          <rect x="300" y="140" width="12" height="12" fill="#94a3b8" />
          <text x="318" y="150" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Literal character — the hyphen</text>
          <text x="320" y="185" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="ui-monospace, monospace">^ and $ anchor the match to the full string, so partial matches inside longer text are rejected</text>
        </svg>

        <h3>Why use an AI-powered regex generator?</h3>
        <ul>
          <li>✅ Saves time by eliminating trial and error — no more tweaking a pattern character by character</li>
          <li>✅ Reduces regex mistakes and syntax errors that are easy to miss by eye</li>
          <li>✅ Provides readable explanations for learning, so you understand the pattern instead of just copying it</li>
          <li>✅ Works for beginners and professionals alike, from a first email-validation regex to a complex log-parsing pattern</li>
          <li>✅ Pairs generation with a live tester, so "build" and "verify" happen on the same page instead of switching tools</li>
        </ul>
        <p>
          Already have a pattern and just want to understand it? Use the free{' '}
          <Link href="/regex-explainer">Regex Explainer</Link> — paste any regex and get a
          plain-English, token-by-token breakdown instead of generating a new one.
        </p>

        <h3>Common use cases</h3>
        <ul>
          <li>Email and phone number validation</li>
          <li>Extracting data from logs or files</li>
          <li>Verifying password formats</li>
          <li>Matching dates, URLs and file names</li>
          <li>Cleaning and filtering large text blocks</li>
        </ul>

        <h3>How to write a good prompt</h3>
        <p>
          To get the best results, be specific in your prompt. Mention what you want to match, any
          special conditions, and whether it should match the full string or part of it.
        </p>

        <ul>
          <li><code>regex for Indian mobile number starting with 9, 8 or 7</code></li>
          <li><code>match YYYY-MM-DD date format</code></li>
          <li><code>email validation excluding gmail.com</code></li>
        </ul>

        <h3>Tips &amp; best practices</h3>
        <ul>
          <li>Use <code>^</code> and <code>$</code> to anchor a pattern to the whole string instead of matching anywhere inside it</li>
          <li>Prefer specific classes like <code>\d</code> or <code>[A-Za-z]</code> instead of the catch-all <code>.</code></li>
          <li>Avoid overly greedy patterns like <code>.*</code> — a stray greedy quantifier can match far more text than you intended</li>
          <li>Always test your regex — including edge cases like empty strings, extra whitespace, and unicode input — before production use</li>
          <li>Add the <code>g</code> flag when you need every match in a string, not just the first one, and <code>m</code> when <code>^</code>/<code>$</code> should match per line rather than the whole string</li>
        </ul>

        <h3>Common regex mistakes</h3>
        <ul>
          <li><strong>Unescaped special characters.</strong> Characters like <code>.</code>, <code>(</code>, <code>)</code>, <code>+</code>, and <code>?</code> mean something special in regex. To match them literally, escape them — <code>{'\\.'}</code> matches a literal dot, not "any character."</li>
          <li><strong>Forgetting anchors.</strong> Without <code>^</code> and <code>$</code>, a pattern matches anywhere inside a string — <code>\d{'{3}'}</code> alone matches the digits inside "abc123def" even though the whole string is not numeric.</li>
          <li><strong>Greedy vs lazy quantifiers.</strong> <code>.*</code> is greedy and grabs as much text as possible before backtracking; <code>.*?</code> is lazy and grabs as little as possible. Picking the wrong one is a common cause of matches spanning far more text than intended.</li>
          <li><strong>Not testing edge cases.</strong> A pattern that works on one example can still fail on empty strings, leading or trailing whitespace, extra punctuation, or unicode characters — run a few edge cases through the tester below before shipping.</li>
          <li><strong>Forgetting the global or multiline flag.</strong> Without <code>g</code>, methods like <code>replace()</code> only touch the first match; without <code>m</code>, <code>^</code> and <code>$</code> match the start and end of the whole string rather than each line.</li>
        </ul>

        <p>
          For a curated list of patterns you can reuse directly, see{' '}
          <Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link>{' '}
          or the more backend-focused{' '}
          <Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link>.
        </p>

        <p>
          If you're new to regular expressions, this tool is a great way to learn by doing.
          Experiment with different prompts and observe how patterns change.
        </p>

        <h3>Using the Generated Pattern in Your Code</h3>
        <p>
          Once you have a pattern, here is exactly how to drop it into the three most common
          languages:
        </p>
        <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// JavaScript
const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
re.test("user@example.com"); // true

# Python
import re
pattern = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
bool(pattern.match("user@example.com"))  # True

// Java
Pattern p = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$");
p.matcher("user@example.com").matches(); // true`}
        </pre>
        <p className="small" style={{ marginBottom: 0 }}>
          One thing that trips people up moving between languages: JavaScript and Java both need
          the pattern wrapped as a string literal with backslashes escaped, while Python's raw
          string prefix (<code>r"..."</code>) lets you paste the pattern as-is without doubling
          the backslashes.
        </p>
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
        <h4>Recent prompts</h4>
        {history.length === 0 && (
          <div className="small">No history yet — your recent prompts will appear here.</div>
        )}
        <ul>
          {history.map((h, idx) => (
            <li key={h.ts + idx} style={{ marginBottom: 8 }}>
              <button className="small" onClick={() => { setPrompt(h.prompt); setResult(h.out); }}>Reuse</button>
              <code style={{ marginLeft: 8 }}>{h.prompt}</code>
              <div className="small" style={{ color: '#666' }}>{new Date(h.ts).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="card small">
        <h4>Regex guides and tutorials</h4>
        <ul className="small">
          <li><Link href="/blog/ai-regex-generator-guide">AI Regex Generator Guide — How to Use Automatic Regex Generation</Link></li>
          <li><Link href="/regex-explainer">Regex Explainer — Understand Any Regex Pattern</Link></li>
          <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
          <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
          <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
          <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation in JavaScript</Link></li>
          <li><Link href="/blog/regex-for-password-validation-rules">Regex for Password Validation Rules</Link></li>
          <li><Link href="/blog/regex-for-credit-card-validation">Regex for Credit Card Validation — Visa, Mastercard, Amex, RuPay</Link></li>
          <li><Link href="/blog/regex-for-indian-id-document-validation">Regex for Indian ID & Document Validation (Aadhaar, PAN, GST & More)</Link></li>
        </ul>
      </div>
    </div>
  );
}
