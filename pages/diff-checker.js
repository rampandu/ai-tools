// pages/diff-checker.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { diffLines } from '../lib/diffLines';

const EXAMPLE_ORIGINAL = `server:
  host: localhost
  port: 8080
  timeout: 30
logging:
  level: info
  file: app.log`;

const EXAMPLE_CHANGED = `server:
  host: 0.0.0.0
  port: 8080
  timeout: 60
  retries: 3
logging:
  level: debug
  file: app.log`;

const FAQ = [
  {
    q: 'Is this Diff Checker free?',
    a: 'Yes — the Text Diff Checker on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Is my text sent to a server?',
    a: 'No. The comparison runs entirely in your browser using a JavaScript implementation of the classic LCS (longest common subsequence) diff algorithm. Nothing you paste is uploaded, logged, or stored on our servers.',
  },
  {
    q: 'How does the diff algorithm work?',
    a: 'It compares the two texts line by line and computes the longest common subsequence of lines. Lines present in both texts are shown unchanged; lines only in the original are marked as removed, and lines only in the changed text are marked as added.',
  },
  {
    q: 'Is there a size limit?',
    a: 'Yes — each side is limited to 5,000 lines. The LCS algorithm compares every line of one text against every line of the other, so very large inputs would freeze the browser tab. For bigger files, use a local tool like git diff.',
  },
  {
    q: 'What does "ignore trailing whitespace" do?',
    a: 'When enabled, spaces and tabs at the end of each line are trimmed before comparing. This hides noisy differences caused by editors that strip (or add) trailing whitespace on save, so you only see meaningful changes.',
  },
];

export default function DiffCheckerPage() {
  const [original, setOriginal] = useState(EXAMPLE_ORIGINAL);
  const [changed, setChanged] = useState(EXAMPLE_CHANGED);
  const [ignoreTrailing, setIgnoreTrailing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function handleCompare() {
    setError(null);
    setResult(null);
    let a = original;
    let b = changed;
    if (ignoreTrailing) {
      a = a
        .split('\n')
        .map((l) => l.replace(/[ \t]+$/, ''))
        .join('\n');
      b = b
        .split('\n')
        .map((l) => l.replace(/[ \t]+$/, ''))
        .join('\n');
    }
    const diff = diffLines(a, b);
    if (diff && !Array.isArray(diff) && diff.error) {
      setError(diff.error);
      return;
    }
    setResult(diff);
  }

  function handleClear() {
    setOriginal('');
    setChanged('');
    setResult(null);
    setError(null);
  }

  const added = result ? result.filter((r) => r.type === 'added').length : 0;
  const removed = result ? result.filter((r) => r.type === 'removed').length : 0;

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
    name: 'Dev Brains AI Text Diff Checker',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free text diff checker that runs entirely in your browser. Paste two versions of any text to see added and removed lines highlighted, with an optional trailing-whitespace filter.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Diff Checker', item: 'https://dev-brains-ai.com/diff-checker' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Text Diff Checker — Compare Two Texts Online | Dev Brains AI</title>
        <meta
          name="description"
          content="Compare two versions of any text or code and see added and removed lines highlighted instantly. LCS line diff, 100% client-side — nothing is uploaded. Free, no signup."
        />
        <meta
          name="keywords"
          content="diff checker, text compare, compare two texts online, line diff tool, text difference checker, code diff, Dev Brains AI"
        />
        <meta property="og:title" content="Free Text Diff Checker — Compare Two Texts Online" />
        <meta
          property="og:description"
          content="Paste two versions of any text and instantly see added and removed lines highlighted. Runs 100% in your browser."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/diff-checker" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/diff-checker" />

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
            <li aria-current="page">Diff Checker</li>
          </ol>
        </nav>

        <h1>Free Text Diff Checker</h1>
        <p className="small">
          Paste the <strong>original</strong> text on the left and the <strong>changed</strong>{' '}
          version on the right, then click <strong>Compare</strong> to see every added and removed
          line highlighted. Works for code, configs, SQL, JSON, prose — any line-based text.
          Everything runs in your browser; nothing is uploaded.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <label htmlFor="diff-original">
              <strong>Original</strong>
            </label>
            <textarea
              id="diff-original"
              aria-label="Original text"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              style={{ minHeight: 200, width: '100%', fontFamily: 'monospace' }}
              placeholder="Paste the original text here..."
            />
          </div>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <label htmlFor="diff-changed">
              <strong>Changed</strong>
            </label>
            <textarea
              id="diff-changed"
              aria-label="Changed text"
              value={changed}
              onChange={(e) => setChanged(e.target.value)}
              style={{ minHeight: 200, width: '100%', fontFamily: 'monospace' }}
              placeholder="Paste the changed text here..."
            />
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={handleCompare}>
            Compare
          </button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
          <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={ignoreTrailing}
              onChange={(e) => setIgnoreTrailing(e.target.checked)}
            />
            Ignore trailing whitespace
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="small"
              onClick={() => {
                setOriginal(EXAMPLE_ORIGINAL);
                setChanged(EXAMPLE_CHANGED);
                setResult(null);
                setError(null);
              }}
            >
              Two versions of a config
            </button>
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
              <p className="small">
                <strong style={{ color: '#16a34a' }}>+{added} added</strong>
                {' / '}
                <strong style={{ color: 'crimson' }}>&minus;{removed} removed</strong>
              </p>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  overflowX: 'auto',
                  whiteSpace: 'pre',
                }}
              >
                {result.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1px 10px',
                      background:
                        row.type === 'added'
                          ? '#e3f6e9'
                          : row.type === 'removed'
                          ? '#fdeaea'
                          : 'transparent',
                    }}
                  >
                    {row.type === 'added' ? '+ ' : row.type === 'removed' ? '− ' : '  '}
                    {row.line === '' ? ' ' : row.line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="small">
              No result yet — press <strong>Compare</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this Text Diff Checker</h2>
        <p>
          &quot;What changed?&quot; is one of the most common questions in software work — between
          two config files, two API responses, two deploy manifests, two drafts of a document. This
          free Text Diff Checker answers it instantly: paste both versions and it highlights every
          line that was added (green, prefixed with +) or removed (red, prefixed with &minus;),
          with unchanged lines shown in place so you keep the surrounding context.
        </p>
        <p>
          The comparison runs entirely in your browser using a classic LCS (longest common
          subsequence) line diff — the same family of algorithm behind <code>git diff</code> and
          most code review tools. There is no API call, no upload, and no storage, which makes it
          safe to compare configs and internal files without them ever leaving your machine.
        </p>

        <h3>How line diffing works</h3>
        <p>
          A line diff treats each text as a sequence of lines and finds the longest subsequence of
          lines the two texts have in common. Everything in that common subsequence is
          &quot;same&quot;; lines in the original that fall outside it are &quot;removed&quot;, and
          lines in the changed text outside it are &quot;added&quot;. A few consequences worth
          knowing:
        </p>
        <ul>
          <li>
            <strong>A modified line shows as remove + add.</strong> Line diffs have no concept of
            &quot;edited in place&quot; — changing one character on a line produces a red removed
            line followed by a green added line.
          </li>
          <li>
            <strong>Whitespace counts.</strong> Two lines that differ only by a trailing space are
            different lines. Enable <em>Ignore trailing whitespace</em> above to filter out that
            noise (common when editors auto-strip whitespace on save).
          </li>
          <li>
            <strong>Moved blocks show as remove + add.</strong> If a block of lines moves from the
            top of a file to the bottom, a line diff reports it as removed in one place and added
            in another — it does not track movement.
          </li>
        </ul>
        <p>
          If you want to understand the algorithm itself, our post on{' '}
          <Link href="/blog/how-diff-algorithms-work-lcs-explained">
            how diff algorithms work (LCS explained)
          </Link>{' '}
          walks through the dynamic-programming table step by step.
        </p>

        <h3>Common uses for a diff checker</h3>
        <ul>
          <li>
            <strong>Config drift</strong> — compare the config running in staging against the one
            in production to find the setting that explains a behavioral difference.
          </li>
          <li>
            <strong>Before/after refactors</strong> — sanity-check that a generated file, SQL
            export, or build artifact changed only where you expected.
          </li>
          <li>
            <strong>API responses</strong> — paste two JSON or XML responses to spot the field that
            appeared, disappeared, or changed. For JSON specifically, structure-aware comparison
            catches more than a line diff can — reordered keys or different indentation won't show
            as false differences. Use the <Link href="/json-diff-viewer">JSON Diff Viewer</Link>{' '}
            instead, or read{' '}
            <Link href="/blog/json-diff-comparing-two-json-objects">
              comparing two JSON objects
            </Link>{' '}
            to see how it works under the hood.
          </li>
          <li>
            <strong>Documents and prose</strong> — compare two drafts of a README, policy, or
            email to see exactly which sentences changed.
          </li>
          <li>
            <strong>Log excerpts</strong> — diff a healthy request log against a failing one to
            find the first line where the paths diverge.
          </li>
        </ul>

        <h3>Reading the output</h3>
        <p>
          The result is a unified view: lines flow in order, with removals shown where they used to
          be and additions where they now are. The summary line above the diff counts added and
          removed lines. This is the same mental model as <code>git diff</code> output — if you are
          new to reading diffs, our beginner guide to{' '}
          <Link href="/blog/git-diff-explained-for-beginners">git diff</Link> explains hunks,
          prefixes, and context lines in more depth.
        </p>

        <h3>Limits</h3>
        <p>
          Each side is capped at 5,000 lines. The LCS algorithm builds a table proportional to the
          product of the two line counts, so unbounded inputs could lock up the browser tab. Within
          the limit, comparisons are effectively instant. For multi-megabyte files, a local tool
          (<code>git diff --no-index a b</code>, <code>diff -u</code>, or your editor&apos;s
          compare mode) is the right choice.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: Text Diff Checker</h3>
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
          Comparing JSON? Use the structure-aware{' '}
          <Link href="/json-diff-viewer">JSON Diff Viewer</Link> instead, which ignores key order
          and formatting. To go deeper, read{' '}
          <Link href="/blog/how-diff-algorithms-work-lcs-explained">
            How Diff Algorithms Work: LCS Explained
          </Link>
          ,{' '}
          <Link href="/blog/git-diff-explained-for-beginners">
            Git Diff Explained for Beginners
          </Link>
          , and{' '}
          <Link href="/blog/json-diff-comparing-two-json-objects">
            JSON Diff: Comparing Two JSON Objects
          </Link>
          .
        </p>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: diff and comparison</h3>
        <ul className="small">
          <li><Link href="/blog/how-to-compare-two-text-files-online">How to Compare Two Text Files Online (Safely)</Link></li>
          <li><Link href="/blog/understanding-diff-output-unified-vs-split-view">Understanding Diff Output: Unified vs Split View</Link></li>
          <li><Link href="/blog/git-diff-explained-for-beginners">Git Diff Explained for Beginners: Every Variant You Need</Link></li>
          <li><Link href="/blog/how-diff-algorithms-work-lcs-explained">How Diff Algorithms Work: LCS Explained</Link></li>
          <li><Link href="/blog/compare-config-files-across-environments">Compare Config Files Across Environments: Find Drift</Link></li>
        </ul>
      </div>

    </div>
  );
}
