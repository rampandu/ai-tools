// pages/commit-message-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const EXAMPLES = [
  'fixed the bug where login button was unresponsive on mobile',
  'added dark mode support to settings page',
  'fixed crash when uploading files over 10MB',
  'refactored the payment service to use async/await',
  'updated README with new setup instructions'
];

const TYPE_OPTIONS = [
  { value: '', label: 'Auto-detect' },
  { value: 'feat', label: 'feat — A new feature' },
  { value: 'fix', label: 'fix — A bug fix' },
  { value: 'docs', label: 'docs — Documentation only changes' },
  { value: 'style', label: 'style — Formatting, whitespace' },
  { value: 'refactor', label: 'refactor — Code change, no bug fix or feature' },
  { value: 'perf', label: 'perf — Performance improvement' },
  { value: 'test', label: 'test — Adding or correcting tests' },
  { value: 'chore', label: 'chore — Build, tooling, dependencies' }
];

const TYPE_TABLE = [
  { type: 'feat', desc: 'A new feature for the user' },
  { type: 'fix', desc: 'A bug fix' },
  { type: 'docs', desc: 'Documentation only changes' },
  { type: 'style', desc: 'Changes that do not affect meaning (whitespace, formatting, semicolons)' },
  { type: 'refactor', desc: 'A code change that neither fixes a bug nor adds a feature' },
  { type: 'perf', desc: 'A code change that improves performance' },
  { type: 'test', desc: 'Adding missing tests or correcting existing tests' },
  { type: 'chore', desc: 'Build process, tooling, or dependency changes' }
];

const FAQ = [
  { q: 'Is this free?', a: 'Yes — the Commit Message Generator is completely free, with no signup and no usage limits beyond basic rate limiting.' },
  { q: 'What is Conventional Commits format?', a: 'Conventional Commits is a lightweight convention for commit messages: type(scope): description — for example feat(auth): add password reset flow. Following this format lets tools like semantic-release automatically generate changelogs and determine version bumps (major/minor/patch) based on your commit history.' },
  { q: 'Can I override the detected type?', a: 'Yes — the tool auto-detects a type from your description, but you can pick any of the 8 Conventional Commits types from the dropdown to override it.' }
];

export default function CommitMessageGenerator() {
  const [description, setDescription] = useState(EXAMPLES[0]);
  const [type, setType] = useState('');
  const [scope, setScope] = useState('');
  const [breaking, setBreaking] = useState(false);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/commit-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, type: type || undefined, scope, breaking, body })
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
      await navigator.clipboard.writeText(result.full);
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
        "name": "Commit Message Generator",
        "item": "https://dev-brains-ai.com/commit-message-generator"
      }
    ]
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free AI Commit Message Generator — Conventional Commits | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate properly formatted Conventional Commits messages instantly. Describe what you changed in plain English and get a clean feat/fix/docs/refactor commit message — free, no signup."
        />
        <meta
          name="keywords"
          content="commit message generator, conventional commits, git commit message generator, ai commit message, commit message format, git commit generator"
        />
        <meta property="og:title" content="Free AI Commit Message Generator — Conventional Commits" />
        <meta
          property="og:description"
          content="Describe your change in plain English and get a properly formatted Conventional Commits message — free, instant, no signup required."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/commit-message-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/commit-message-generator" />

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
            <li aria-current="page">Commit Message Generator</li>
          </ol>
        </nav>

        <h1>Free AI Commit Message Generator — Conventional Commits</h1>
        <p className="small">
          Describe what you changed in plain English and get a properly formatted{' '}
          <strong>Conventional Commits</strong> message instantly — complete with the right{' '}
          <code>type(scope): description</code> header, an optional body, and BREAKING CHANGE
          footer. No signup, no cost, no limit. Great for keeping your git history clean and
          compatible with changelog and semantic-versioning tools.
        </p>

        <label htmlFor="description"><strong>What did you change?</strong></label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 220px' }}>
            <label htmlFor="type"><strong>Type (optional)</strong></label>
            <br />
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              {TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: '1 1 160px' }}>
            <label htmlFor="scope"><strong>Scope (optional)</strong></label>
            <br />
            <input
              id="scope"
              type="text"
              placeholder="e.g. auth, api"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            <input
              type="checkbox"
              checked={breaking}
              onChange={(e) => setBreaking(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Breaking change
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="body"><strong>Extended body (optional)</strong></label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Additional details about the change (optional)" />
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Commit Message'}
          </button>
          <button onClick={() => { setDescription(''); setResult(null); setError(null); setScope(''); setBreaking(false); setBody(''); setType(''); }}>Clear</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => setDescription(ex)} className="small">
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
              </div>
              <pre aria-label="Result output" style={{ whiteSpace: 'pre-wrap' }}>{result.full}</pre>
              <div className="small" style={{ marginTop: 8, color: '#666' }}>
                Type used: <strong>{result.type}</strong> ({result.typeDescription}) &middot; Header length:{' '}
                {result.headerLength} chars
                {result.tooLong && (
                  <span style={{ color: 'crimson' }}> &mdash; exceeds the recommended 72-character limit</span>
                )}
              </div>
            </div>
          )}
          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Generate Commit Message</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content for AdSense & Google */}
      <div className="card">
        <h2>About this Commit Message Generator</h2>
        <p>
          Writing clear, consistent commit messages is one of those small habits that pays off
          enormously over the life of a project. This Commit Message Generator takes a plain
          English description of what you changed and turns it into a properly formatted{' '}
          <strong>Conventional Commits</strong> message — the type, an optional scope, an
          imperative-mood subject line, and an optional body or breaking-change footer.
        </p>

        <p>
          Just describe your change — for example <i>"fixed the bug where login button was
          unresponsive on mobile"</i> — and the tool will detect the right commit type, rewrite
          the description in imperative mood, and assemble a header that follows the standard{' '}
          <code>type(scope): description</code> format.
        </p>

        <h3>What is Conventional Commits and why it matters</h3>
        <p>
          Conventional Commits is a specification for adding human- and machine-readable meaning
          to commit messages. Every commit header follows the same shape:{' '}
          <code>type(scope): description</code>. Because the format is predictable, tooling like{' '}
          <code>semantic-release</code>, <code>standard-version</code>, and changelog generators
          can parse your git history automatically to determine the next version number (major,
          minor, or patch) and to build a changelog without any manual bookkeeping.
        </p>
        <p>
          Teams that adopt Conventional Commits also get a more readable <code>git log</code> —
          skimming the history quickly tells you which commits were bug fixes, which added
          features, and which were just internal cleanup, without opening every diff.
        </p>

        <h3>The 8 commit types explained</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px 8px' }}>Type</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px 8px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {TYPE_TABLE.map((row) => (
              <tr key={row.type}>
                <td style={{ padding: '6px 8px', borderBottom: '1px solid #eee' }}><code>{row.type}</code></td>
                <td style={{ padding: '6px 8px', borderBottom: '1px solid #eee' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Tips for writing good commit messages</h3>
        <ul>
          <li>Use the imperative mood in the subject line: "add", "fix", "update" — not "added", "fixed", "updated"</li>
          <li>Keep the header under 72 characters so it renders cleanly in <code>git log --oneline</code> and most git UIs</li>
          <li>Add a scope when a change is limited to one area, e.g. <code>fix(auth): ...</code> or <code>feat(api): ...</code></li>
          <li>Use the extended body to explain <i>why</i> a change was made, not just what changed</li>
          <li>Mark breaking changes explicitly with a <code>!</code> and a <code>BREAKING CHANGE:</code> footer</li>
        </ul>

        <h3>How this tool decides the type automatically</h3>
        <p>
          When you don't pick a type from the dropdown, the generator scans your description for
          keywords associated with each Conventional Commits type. Words like "fix", "bug", or
          "crash" map to <code>fix</code>; words like "add", "new", or "implement" map to{' '}
          <code>feat</code>; words like "refactor" or "cleanup" map to <code>refactor</code>, and
          so on. If nothing matches, it falls back to <code>chore</code>. This is a simple
          keyword heuristic, not natural-language understanding — you can always override the
          detected type using the dropdown if it picks the wrong one.
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
        <h4>More developer tools &amp; guides</h4>
        <ul className="small">
          <li><Link href="/docstring-generator">Docstring / Code Comment Generator</Link></li>
          <li><Link href="/readme-generator">README Generator</Link></li>
          <li><Link href="/blog/common-git-errors-and-how-to-fix-them">Common Git Errors and How to Fix Them</Link></li>
        </ul>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: git and commits</h3>
        <ul className="small">
          <li><Link href="/blog/how-to-write-conventional-commit-messages">How to Write Conventional Commit Messages — A Practical Guide</Link></li>
          <li><Link href="/blog/common-git-errors-and-how-to-fix-them">Common Git Errors and How to Fix Them</Link></li>
          <li><Link href="/blog/git-diff-explained-for-beginners">Git Diff Explained for Beginners: Every Variant You Need</Link></li>
        </ul>
      </div>

    </div>
  );
}
