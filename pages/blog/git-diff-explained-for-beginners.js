// pages/blog/git-diff-explained-for-beginners.js
import Head from 'next/head';
import Link from 'next/link';

export default function GitDiffExplainedForBeginners() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Git Diff Explained for Beginners',
        item: 'https://dev-brains-ai.com/blog/git-diff-explained-for-beginners',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Git Diff Explained for Beginners: Every Variant You Actually Need',
    description:
      'A beginner-friendly tour of git diff: working tree vs --staged, comparing commits and branches, diffing a single file, --stat summaries, --word-diff, ignoring whitespace with -w, and how to read the unified output.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/git-diff-explained-for-beginners',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does git diff show nothing after I run git add?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plain git diff compares your working tree against the staging area (index). Once you stage changes with git add, they move into the index, so plain git diff sees no difference. Use git diff --staged to see what is staged and about to be committed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I see the difference between two branches in git?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use git diff main..feature to see the full difference between the tips of the two branches. Add --stat for a per-file summary instead of full content, or append a path (git diff main..feature -- src/app.js) to limit the diff to one file.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I compare two files that are not in a git repository?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use git diff --no-index file1 file2, which works on any two files anywhere on disk. If you would rather not use a terminal, the free Dev Brains AI Diff Checker compares two pasted texts line by line entirely in your browser.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Git Diff Explained for Beginners: Every Variant You Need | Dev Brains AI</title>
        <meta
          name="description"
          content="Beginner-friendly git diff guide: working tree vs --staged, comparing commits and branches, single files, --stat, --word-diff, -w, and reading unified output."
        />
        <meta
          name="keywords"
          content="git diff explained, git diff staged, git diff between branches, git diff two commits, git diff single file, git diff stat, git word diff, git diff tutorial for beginners"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/git-diff-explained-for-beginners" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Git Diff Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Git Diff Explained for Beginners: Every Variant You Actually Need
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            <code>git diff</code> answers the most important question in version control:
            &quot;what exactly changed?&quot; But the command behaves differently depending on what
            you compare — working tree, staging area, commits, or branches — and that trips up
            almost every beginner. This guide walks through each variant with a short, real
            example, then shows you how to read the output git prints.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Three Places Your Code Lives
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            To understand which diff you are looking at, remember that git tracks three snapshots
            of your project at all times:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Working tree</strong> — the files on disk you are editing right now.</li>
            <li><strong>Staging area (index)</strong> — what you have marked with <code>git add</code> to go into the next commit.</li>
            <li><strong>Last commit (HEAD)</strong> — the most recent saved snapshot.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Every git diff variant is just a choice of which two snapshots to compare.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Working Tree vs Staged: git diff and git diff --staged
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# Unstaged changes: working tree vs staging area
git diff

# Staged changes: staging area vs last commit
git diff --staged        # (--cached is the same thing)

# Everything since the last commit: working tree vs HEAD
git diff HEAD`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The classic beginner confusion: you edit a file, run <code>git add</code>, then run{' '}
            <code>git diff</code> — and see nothing. That is correct behaviour. Plain{' '}
            <code>git diff</code> shows only <em>unstaged</em> changes; your edit is now staged, so
            it appears under <code>git diff --staged</code> instead. A practical workflow:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Run <code>git diff</code> while working, to see what you have touched.</li>
            <li>Run <code>git diff --staged</code> right before committing — this is exactly what will go into the commit.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Between Commits and Branches
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# Between two specific commits (older first reads naturally)
git diff 4f2a91c..8de77b0

# Between two branches (what feature adds on top of main)
git diff main..feature-login

# Between your last two commits
git diff HEAD~1..HEAD

# Against the remote after a fetch
git fetch
git diff main..origin/main`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Read <code>a..b</code> as &quot;what changed going from a to b&quot;: lines added in{' '}
            <code>b</code> show as plus lines. Swap the order and every plus becomes a minus. (For
            diffs, <code>git diff a..b</code> and <code>git diff a b</code> are the same; the
            two-dot syntax means something different for <code>git log</code>, which is a story for
            another day.)
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Narrowing to a Single File and Summarising with --stat
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# Only one file (the -- separates paths from revisions)
git diff -- src/utils/auth.js
git diff main..feature -- src/utils/auth.js

# Per-file summary instead of full content
git diff --stat main..feature

 src/utils/auth.js    | 41 ++++++++++++++++-------
 src/pages/login.js   | 12 ++++--
 package.json         |  2 +-
 3 files changed, 38 insertions(+), 17 deletions(-)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <code>--stat</code> is the right first move on any big diff: see which files changed
            and how much, then drill into the interesting ones individually.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Two Flags That Save Real Time: --word-diff and -w
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>--word-diff</strong> highlights changes within lines instead of whole lines —
            ideal for prose, documentation, and long config lines:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`git diff --word-diff README.md

The API rate limit is [-100-]{+500+} requests per minute.`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>-w</strong> ignores whitespace differences entirely — essential after
            re-indenting or reformatting, when the normal diff shows hundreds of changed lines but
            nothing meaningful:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# Show only changes that are not pure whitespace
git diff -w

# Bonus: diff any two files, no repository required
git diff --no-index old-config.env new-config.env`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reading the Output
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every variant prints the same unified format:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`diff --git a/src/app.js b/src/app.js
--- a/src/app.js
+++ b/src/app.js
@@ -8,4 +8,5 @@ function startServer() {
   const app = express();
-  const port = 3000;
+  const port = process.env.PORT || 3000;
+  app.use(express.json());
   app.listen(port);`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><code>a/</code> and <code>b/</code> are the old and new versions of the file.</li>
            <li>The <code>@@ -8,4 +8,5 @@</code> header means: 4 lines starting at line 8 in the old file became 5 lines starting at line 8 in the new one.</li>
            <li>Minus lines were removed, plus lines were added, space-prefixed lines are unchanged context.</li>
            <li>A minus line directly followed by a similar plus line is a <em>modified</em> line — here, the port became configurable.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            For a deeper dive into this format and side-by-side rendering, see{' '}
            <Link href="/blog/understanding-diff-output-unified-vs-split-view">unified vs split view</Link>.
            And when you just have two blobs of text rather than commits, paste them into the{' '}
            <Link href="/diff-checker">Dev Brains AI Diff Checker</Link> for an instant in-browser
            comparison.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does git diff show nothing after I run git add?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Plain git diff compares your working tree against the staging area (index). Once you stage changes with git add, they move into the index, so plain git diff sees no difference. Use <code>git diff --staged</code> to see what is staged and about to be committed.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I see the difference between two branches in git?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use <code>git diff main..feature</code> to see the full difference between the tips of the two branches. Add <code>--stat</code> for a per-file summary instead of full content, or append a path (<code>git diff main..feature -- src/app.js</code>) to limit the diff to one file.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How can I compare two files that are not in a git repository?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use <code>git diff --no-index file1 file2</code>, which works on any two files anywhere on disk. If you would rather not use a terminal, the free <Link href="/diff-checker">Dev Brains AI Diff Checker</Link> compares two pasted texts line by line entirely in your browser.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Diff Checker</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Compare two texts line by line in your browser — no repository, no terminal, no
              signup required.
            </p>
            <Link href="/diff-checker">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Diff Checker →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/understanding-diff-output-unified-vs-split-view">Understanding Diff Output: Unified vs Split View</Link></li>
              <li><Link href="/blog/common-git-errors-and-how-to-fix-them">Common Git Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/how-to-write-conventional-commit-messages">How to Write Conventional Commit Messages</Link></li>
              <li><Link href="/blog/how-to-compare-two-text-files-online">How to Compare Two Text Files Online</Link></li>
              <li><Link href="/blog/how-diff-algorithms-work-lcs-explained">How Diff Algorithms Work: LCS Explained</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
