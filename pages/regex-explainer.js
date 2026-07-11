// pages/regex-explainer.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const EXAMPLES = [
  '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  '^((25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d?\\d)$',
  '^\\+?[1-9]\\d{1,14}$',
  '^(?=.*[A-Z])(?=.*\\d).{8,}$',
  '^(https?:\\/\\/)?([\\w-]+)\\.([\\w.]{2,})([\\w\\-./?%&=]*)?$'
];

const FLAG_MEANINGS = {
  g: 'global — find all matches, not just the first',
  i: 'case-insensitive — ignore upper/lower case',
  m: 'multiline — ^ and $ match start/end of each line',
  s: 'dotall — "." also matches newline characters',
  u: 'unicode — treat pattern as a sequence of Unicode code points',
  y: 'sticky — match starting only at the current position (lastIndex)'
};

const FAQ = [
  {
    q: 'Is this regex explainer free?',
    a: 'Yes — it is completely free to use, with no signup required and no limit on how many patterns you can explain.'
  },
  {
    q: 'Does it support all regex features?',
    a: 'It covers the most common ECMAScript/PCRE-style syntax: anchors, character classes, shorthand classes, groups (capturing, non-capturing, named), lookaheads and lookbehinds, quantifiers, and alternation. Very advanced features such as backreferences or Unicode property escapes may not be fully broken down.'
  },
  {
    q: 'Is my regex sent to a server?',
    a: 'Yes, briefly — your pattern is sent to our API for parsing and is not stored or logged beyond what is needed to generate the explanation.'
  }
];

export default function RegexExplainer() {
  const [pattern, setPattern] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleExplain() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/regex-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pattern })
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

  async function copyExplanation() {
    if (!result) return;
    const flagsLine = result.flags
      ? `Flags: ${result.flags} (${[...result.flags].map((f) => FLAG_MEANINGS[f] || f).join('; ')})\n\n`
      : '';
    const lines = result.tokens.map((tok) => `${tok.t}  —  ${tok.d}`).join('\n');
    const text = `Regex: ${result.original}\n\n${flagsLine}${lines}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
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
        "name": "Regex Explainer",
        "item": "https://dev-brains-ai.com/regex-explainer"
      }
    ]
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Regex Explainer — Understand Any Regex Pattern | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste any regex pattern and get a plain-English, token-by-token breakdown instantly. Free online regex explainer and analyzer — no signup required."
        />
        <meta
          name="keywords"
          content="regex explainer, explain regex, regex breakdown, what does this regex mean, regex analyzer, regex decoder, understand regex pattern"
        />
        <meta property="og:title" content="Free Regex Explainer — Understand Any Regex Pattern" />
        <meta
          property="og:description"
          content="Paste a regex pattern and get a clear, token-by-token plain-English explanation instantly. Free, no signup."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/regex-explainer" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/regex-explainer" />

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
            <li aria-current="page">Regex Explainer</li>
          </ol>
        </nav>

        <h1>Free Regex Explainer — Understand Any Regex Pattern</h1>
        <p className="small">
          Paste any regular expression and get an instant, plain-English, token-by-token breakdown
          of exactly what it matches. Perfect for understanding regex you found online, inherited
          from a teammate, or wrote a while ago and forgot how it works. No signup, no cost, no
          limit.
        </p>

        <label htmlFor="pattern"><strong>Regex Pattern</strong></label>
        <textarea id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} rows={3} />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleExplain} disabled={loading}>
            {loading ? 'Explaining...' : 'Explain Regex'}
          </button>
          <button onClick={() => { setPattern(''); setResult(null); setError(null); }}>Clear</button>
          <button onClick={() => { navigator.clipboard?.writeText(pattern); }}>Copy Pattern</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => setPattern(ex)} className="small">
                {ex.length > 28 ? ex.slice(0, 28) + '…' : ex}
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
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                <button onClick={copyExplanation}>{copied ? 'Copied!' : 'Copy explanation as text'}</button>
                <div className="small" style={{ color: '#666' }}>Source: rule-engine</div>
              </div>

              {result.flags && (
                <div style={{ marginBottom: 12 }}>
                  <strong>Flags: </strong>
                  <code>{result.flags}</code>
                  <ul className="small" style={{ marginTop: 6 }}>
                    {[...result.flags].map((f) => (
                      <li key={f}><code>{f}</code> — {FLAG_MEANINGS[f] || 'unknown flag'}</li>
                    ))}
                  </ul>
                </div>
              )}

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #e6eef2' }}>
                    <th style={{ padding: '6px 8px', width: '30%' }}>Token</th>
                    <th style={{ padding: '6px 8px' }}>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {result.tokens.map((tok, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0f4f7' }}>
                      <td style={{ padding: '6px 8px', verticalAlign: 'top' }}><code>{tok.t}</code></td>
                      <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>{tok.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {result.tokens.length === 0 && (
                <div className="small">No tokens found — the pattern may be empty.</div>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Explain Regex</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content for AdSense & Google */}
      <div className="card">
        <h2>About this Regex Explainer</h2>
        <p>
          Regular expressions are compact, but that compactness comes at a cost: a pattern like
          <code> ^(?=.*[A-Z])(?=.*\d).{'{8,}'}$</code> is unreadable at a glance, even for experienced
          developers. This Regex Explainer takes any pattern you paste in and breaks it apart into
          individual tokens, explaining each one in plain English so you can understand exactly what
          the whole expression matches.
        </p>

        <p>
          Unlike a regex tester, which only tells you whether a specific string matches, this tool
          explains the pattern itself — the structure, the anchors, the character classes, the
          quantifiers, and the groups — so you understand the &quot;why&quot; behind the match, not just the
          &quot;yes/no&quot;.
        </p>

        <h3>Why explain a regex instead of just running it</h3>
        <p>
          Running a regex against sample input tells you whether it works for that one case, but it
          does not tell you why it works, or what edge cases it might silently fail on. Reading and
          understanding the pattern token by token is the only reliable way to know its true
          behavior — especially for regexes inherited from old code, copied from Stack Overflow, or
          generated by a tool. A quick breakdown also helps during code review, when you need to
          verify that a regex actually does what a pull request claims it does.
        </p>

        <h3>How the token breakdown works</h3>
        <p>
          The explainer scans your pattern from left to right, one logical unit at a time. Each unit
          — an anchor like <code>^</code> or <code>$</code>, a character class like <code>[a-z0-9]</code>,
          a shorthand class like <code>\d</code> or <code>\s</code>, a group opener like <code>(</code> or
          <code> (?:</code>, or a quantifier like <code>+</code>, <code>*</code>, or <code>{'{2,4}'}</code>
          — is identified and paired with a plain-English description. Flags after the closing slash
          (such as <code>/pattern/gi</code>) are parsed separately and explained in their own section.
        </p>

        <h3>Common regex symbols reference table</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #e6eef2' }}>
              <th style={{ padding: '6px 8px' }}>Symbol</th>
              <th style={{ padding: '6px 8px' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '6px 8px' }}><code>^</code></td><td style={{ padding: '6px 8px' }}>Start of string/line</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>$</code></td><td style={{ padding: '6px 8px' }}>End of string/line</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>.</code></td><td style={{ padding: '6px 8px' }}>Any character except newline</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>\d \w \s</code></td><td style={{ padding: '6px 8px' }}>Digit, word character, whitespace (and their uppercase negations)</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>[...]</code></td><td style={{ padding: '6px 8px' }}>Character class — matches one character from the set</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>( ) (?: )</code></td><td style={{ padding: '6px 8px' }}>Capturing / non-capturing group</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>(?= ) (?! )</code></td><td style={{ padding: '6px 8px' }}>Positive / negative lookahead</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>* + ? {'{n,m}'}</code></td><td style={{ padding: '6px 8px' }}>Quantifiers — how many times the preceding token repeats</td></tr>
            <tr><td style={{ padding: '6px 8px' }}><code>|</code></td><td style={{ padding: '6px 8px' }}>Alternation (OR)</td></tr>
          </tbody>
        </table>

        <h3>Tips for reading complex regex</h3>
        <ul>
          <li>Work through the pattern left to right, one token at a time — don&apos;t try to read it all at once</li>
          <li>Identify anchors (<code>^</code>, <code>$</code>) first to understand whether the whole string or a substring is being matched</li>
          <li>Break groups apart mentally — a group is just a smaller regex nested inside the bigger one</li>
          <li>Watch for quantifiers immediately after a group or character class — they change the meaning significantly</li>
          <li>When in doubt, test the pattern against real sample strings after you understand its structure</li>
        </ul>

        <p>
          If you need to build a new pattern from a plain-English description rather than decode an
          existing one, try the{' '}
          <Link href="/regex-generator">Regex Generator</Link> instead.
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
        <h4>Related tools and guides</h4>
        <ul className="small">
          <li><Link href="/regex-generator">Need to build a regex instead? Try the Regex Generator →</Link></li>
          <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
          <li><Link href="/blog/regex-lookahead-and-lookbehind-explained">Regex Lookahead and Lookbehind Explained</Link></li>
          <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
        </ul>
      </div>
    </div>
  );
}
