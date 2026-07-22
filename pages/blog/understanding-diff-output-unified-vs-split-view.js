// pages/blog/understanding-diff-output-unified-vs-split-view.js
import Head from 'next/head';
import Link from 'next/link';

export default function UnderstandingDiffOutputUnifiedVsSplit() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Understanding Diff Output: Unified vs Split View',
        item: 'https://dev-brains-ai.com/blog/understanding-diff-output-unified-vs-split-view',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Unified vs Split Diff View — How to Read Any Diff',
    description:
      'Learn to read unified diff hunks (@@ headers, +/- lines) and split view side by side, when to use each in code review, and how to silence whitespace-only diff noise.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/understanding-diff-output-unified-vs-split-view',
    datePublished: '2026-07-15',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What do the @@ lines in a diff mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The @@ lines are hunk headers. A header like "@@ -12,5 +12,7 @@" means this hunk covers 5 lines starting at line 12 in the old file, and 7 lines starting at line 12 in the new file. Everything until the next @@ header belongs to that hunk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use unified or split view for code review?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use split view when reviewing heavily modified lines, since old and new versions sit side by side for easy comparison. Use unified view for small changes, narrow screens, or when you want to read the new code in its natural flow. GitHub lets you toggle between them per pull request.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I hide whitespace-only changes in a diff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In git, use "git diff -w" to ignore all whitespace. On GitHub, append ?w=1 to the diff URL or use the "Hide whitespace" checkbox in the Files changed tab. This is essential after reformatting or re-indenting code, where hundreds of lines change without any logic changing.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Unified vs Split Diff View — How to Read Any Diff | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn to read unified diff hunks (@@ headers, +/- lines) and split view side by side, when to use each in code review, and how to silence whitespace-only diff noise."
        />
        <meta
          name="keywords"
          content="unified diff format, split view diff, side by side diff, how to read a diff, diff hunk header, @@ in diff, github pr diff, ignore whitespace diff, diff output explained"
        />
        <meta property="og:title" content="Unified vs Split Diff View — How to Read Any Diff" />
        <meta property="og:description" content="Learn to read unified diff hunks (@@ headers, +/- lines) and split view side by side, when to use each in code review, and how to silence whitespace-only diff noise." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/understanding-diff-output-unified-vs-split-view" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/understanding-diff-output-unified-vs-split-view" />
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
              <li aria-current="page">Unified vs Split View Diffs</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Understanding Diff Output: Unified vs Split View
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Diffs are the lingua franca of software collaboration — every pull request, every code
            review, every &quot;what changed?&quot; conversation runs on them. Yet many developers
            read diffs by pattern-matching on red and green without ever learning what the headers
            and markers actually mean. This guide dissects the unified diff format line by line,
            explains how split (side-by-side) view presents the same information differently, and
            shows when each view makes you a faster reviewer.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Anatomy of a Unified Diff
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Unified format is what <code>git diff</code> and <code>diff -u</code> print. Here is a
            complete small example with every part labelled below:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`--- a/config/database.yml
+++ b/config/database.yml
@@ -12,6 +12,7 @@ production:
   adapter: postgresql
   host: db.internal
-  pool: 5
+  pool: 20
+  timeout: 5000
   encoding: utf8`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>The --- and +++ headers</strong> name the two versions being compared: <code>---</code> is the old file (conventionally prefixed <code>a/</code>), <code>+++</code> is the new file (<code>b/</code>).</li>
            <li><strong>The @@ hunk header</strong> — <code>@@ -12,6 +12,7 @@</code> — gives the coordinates: this hunk starts at line 12 and spans 6 lines in the old file, and starts at line 12 spanning 7 lines in the new file. The text after the second @@ (here <code>production:</code>) is a hint showing the enclosing section or function.</li>
            <li><strong>Lines starting with a minus</strong> exist only in the old version (removed).</li>
            <li><strong>Lines starting with a plus</strong> exist only in the new version (added).</li>
            <li><strong>Lines starting with a space</strong> are unchanged context, included so you can orient yourself. Git shows 3 context lines by default (<code>-U5</code> shows five).</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            A key insight: unified diffs have no concept of a &quot;changed&quot; line. Changing{' '}
            <code>pool: 5</code> to <code>pool: 20</code> is expressed as remove-old plus add-new.
            When you see a minus line immediately followed by a similar plus line, mentally merge
            them into &quot;modified&quot;.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Split View: The Same Data, Side by Side
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Split view (also called side-by-side view) draws the old file in a left column and the
            new file in a right column, aligning unchanged lines horizontally:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`OLD (left)                    | NEW (right)
------------------------------+------------------------------
  adapter: postgresql         |   adapter: postgresql
  host: db.internal           |   host: db.internal
- pool: 5                     | + pool: 20
                              | + timeout: 5000
  encoding: utf8              |   encoding: utf8`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Nothing new is being computed — it is the same set of additions and removals rendered
            in two columns. The win is that modified lines sit directly opposite each other, so
            your eyes compare them without jumping between a red block above and a green block
            below.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When Each View Shines
          </h2>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>Unified wins for small, scattered changes</strong> — a one-line fix in five files reads faster as a compact vertical stream.</li>
            <li><strong>Unified wins on narrow screens</strong> — split view halves your horizontal space, which forces wrapping or scrolling on laptops and phones.</li>
            <li><strong>Unified reads like the final code</strong> — ignore the minus lines and you are reading the new file in order, which helps when judging overall flow.</li>
            <li><strong>Split wins for heavily edited lines</strong> — renamed variables, changed parameters, and reworded sentences are much easier to compare side by side.</li>
            <li><strong>Split wins for config and data files</strong> — aligned columns make value changes (5 → 20) pop out instantly.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Most reviewers settle on split view for focused review of big changes and unified for
            quick scans — and switch freely between them.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reading GitHub Pull Request Diffs
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            GitHub&apos;s &quot;Files changed&quot; tab renders unified view by default, with a
            toggle to split view in the settings gear (your choice is remembered). A few features
            worth knowing:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Word-level highlighting</strong> — within a modified line pair, GitHub shades the exact characters that changed, doing the remove/add merging for you.</li>
            <li><strong>Expandable context</strong> — click the arrows on hunk headers to reveal the hidden unchanged lines between or around hunks.</li>
            <li><strong>Viewed checkboxes</strong> — mark files as viewed to collapse them and track review progress in large PRs.</li>
            <li><strong>Rich diffs</strong> — for Markdown and some formats, GitHub can show a rendered before/after instead of raw text.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Whitespace-Only Noise and How to Silence It
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Re-indent a file or convert tabs to spaces, and the diff explodes: hundreds of lines
            marked changed with zero change in meaning. Real logic changes drown in the noise.
            Every serious diff tool has a mute button for this:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# git: ignore all whitespace differences
git diff -w

# ignore only changes in the amount of whitespace
git diff -b

# classic diff
diff -u -w old.txt new.txt`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>On GitHub, tick <strong>Hide whitespace</strong> in the Files changed settings, or append <code>?w=1</code> to the URL.</li>
            <li>Better still, keep reformatting commits separate from logic commits so reviewers can skip the noisy one entirely.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            If you are comparing two pasted texts rather than commits, the{' '}
            <Link href="/diff-checker">Dev Brains AI Diff Checker</Link> gives you a clean
            line-by-line comparison in your browser. And if you are curious how the tool decides
            what is added and removed in the first place, read{' '}
            <Link href="/blog/how-diff-algorithms-work-lcs-explained">how diff algorithms work</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What do the @@ lines in a diff mean?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The @@ lines are hunk headers. A header like <code>@@ -12,5 +12,7 @@</code> means this hunk covers 5 lines starting at line 12 in the old file, and 7 lines starting at line 12 in the new file. Everything until the next @@ header belongs to that hunk.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use unified or split view for code review?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use split view when reviewing heavily modified lines, since old and new versions sit side by side for easy comparison. Use unified view for small changes, narrow screens, or when you want to read the new code in its natural flow. GitHub lets you toggle between them per pull request.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I hide whitespace-only changes in a diff?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In git, use <code>git diff -w</code> to ignore all whitespace. On GitHub, append ?w=1 to the diff URL or use the &quot;Hide whitespace&quot; checkbox in the Files changed tab. This is essential after reformatting or re-indenting code, where hundreds of lines change without any logic changing.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Diff Checker</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Compare two texts line by line in your browser with clear added/removed highlighting.
              No signup, no cost.
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
              <li><Link href="/blog/git-diff-explained-for-beginners">Git Diff Explained for Beginners</Link></li>
              <li><Link href="/blog/how-diff-algorithms-work-lcs-explained">How Diff Algorithms Work: LCS Explained</Link></li>
              <li><Link href="/blog/how-to-compare-two-text-files-online">How to Compare Two Text Files Online</Link></li>
              <li><Link href="/blog/common-git-errors-and-how-to-fix-them">Common Git Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/json-diff-comparing-two-json-objects">JSON Diff: Comparing Two JSON Objects</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
