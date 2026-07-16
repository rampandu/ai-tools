// pages/blog/how-diff-algorithms-work-lcs-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowDiffAlgorithmsWorkLcsExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How Diff Algorithms Work: LCS Explained',
        item: 'https://dev-brains-ai.com/blog/how-diff-algorithms-work-lcs-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How Diff Algorithms Work: Longest Common Subsequence Explained',
    description:
      'The algorithm behind every diff tool: longest common subsequence intuition with a worked matrix example, why diffs are minimal-ish, a brief look at the Myers algorithm, why moved blocks show as delete plus add, and performance notes.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-diff-algorithms-work-lcs-explained',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What algorithm do diff tools use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most diff tools are built on the longest common subsequence (LCS) problem: find the longest sequence of lines that appears in both files in the same order. Everything not in that sequence is reported as added or removed. In practice, most tools including git use the Myers algorithm, an efficient way of solving this problem.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does a moved block of code show as deleted and added?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Classic diff algorithms only find lines that stay in the same relative order in both files. A block that moves from the top to the bottom breaks that order, so the algorithm reports it as removed from the old location and added at the new one. Some tools, like git with --color-moved, detect this afterwards and colour moved blocks differently.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is diff output always the smallest possible set of changes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The change count is minimal for the line-based model, but the choice of which lines to pair is not always the most human-readable one, especially with repetitive lines like braces or blank lines. Several minimal diffs can exist, and heuristics such as git diff --histogram often pick more readable ones.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How Diff Algorithms Work: LCS Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="The algorithm behind diff tools: longest common subsequence intuition with a worked matrix, the Myers algorithm, why moved blocks show as delete+add, and performance notes."
        />
        <meta
          name="keywords"
          content="how diff algorithms work, longest common subsequence, lcs algorithm explained, myers diff algorithm, diff algorithm tutorial, how git diff works internally, edit distance, text comparison algorithm"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-diff-algorithms-work-lcs-explained" />
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
              <li aria-current="page">How Diff Algorithms Work</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How Diff Algorithms Work: Longest Common Subsequence Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every time you open a pull request or paste two texts into a diff checker, an algorithm
            decides which lines to call added, which removed, and which unchanged. It feels like
            magic, but the core idea fits in one sentence: <strong>find the longest sequence of
            lines that both files share in the same order — everything else is a change.</strong>{' '}
            This article builds that intuition with a small worked example, explains why real
            tools use the Myers algorithm, and answers the classic question of why moved code
            shows up as delete-plus-add.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Core Idea: Longest Common Subsequence
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A <em>subsequence</em> keeps items in order but does not require them to be adjacent.
            In the word DEVELOPER, &quot;DVLP&quot; is a subsequence; &quot;LEVED&quot; is not,
            because the order is broken. The longest common subsequence (LCS) of two files is the
            longest list of lines that appears in both, in the same order.
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            Why does that solve diffing? Because the LCS is exactly the set of lines the diff can
            mark as unchanged. Once you know it, the rest falls out mechanically:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Lines in the old file but not in the LCS are <strong>removals</strong>.</li>
            <li>Lines in the new file but not in the LCS are <strong>additions</strong>.</li>
            <li>The longer the LCS, the fewer changes reported — so finding the <em>longest</em> one gives the smallest diff.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Worked Example with the LCS Matrix
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The textbook way to compute an LCS is a dynamic-programming grid. Compare old file
            lines A B C B with new file lines B C A B. Each cell holds the LCS length of the
            prefixes ending at that row and column: if the two lines match, take the diagonal
            neighbour plus one; otherwise take the larger of the cell above and the cell to the
            left.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`            NEW:   B   C   A   B
             +---+---+---+---+---+
             | 0 | 0 | 0 | 0 | 0 |
      OLD: A + 0 | 0 | 0 | 1 | 1 |
           B + 0 | 1 | 1 | 1 | 2 |
           C + 0 | 1 | 2 | 2 | 2 |
           B + 0 | 1 | 2 | 2 | 3 |
             +---+---+---+---+---+

Bottom-right cell = 3, so the LCS has length 3: B C B`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Tracing back through the matrix recovers the LCS itself — B C B — and with it the diff:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`- A        (in old, not in LCS: removed)
  B        (in LCS: unchanged)
  C        (in LCS: unchanged)
+ A        (in new, not in LCS: added)
  B        (in LCS: unchanged)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice something interesting: the line A did not really disappear — it moved after C.
            But the algorithm has no concept of movement, only of order-preserving matches, so it
            reports a removal and an addition. Hold that thought.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Diffs Are Minimal-ish, Not Perfect
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            LCS guarantees the <em>fewest</em> changed lines, but several different diffs can be
            equally minimal, and the algorithm has no taste for which reads better. The classic
            offender is repetitive lines — braces, blank lines, <code>END</code> statements. The
            algorithm may match a closing brace from one function with a closing brace from a
            completely different function, producing a technically minimal but confusing diff that
            appears to splice two functions together.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Git offers alternative heuristics: <code>git diff --patience</code> and <code>--histogram</code> anchor matching on rare, distinctive lines first, which usually yields more human-readable output.</li>
            <li>Minimal is a property of the count, not the pairing — two tools can both be &quot;correct&quot; and still show different diffs.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Myers Algorithm, Briefly
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The full LCS matrix needs N×M cells — for two 10,000-line files, that is 100 million
            comparisons, mostly wasted, because real file pairs are nearly identical. Eugene Myers&apos;
            1986 algorithm exploits this: it explores &quot;how far can I get through both files
            with 0 differences? with 1? with 2?&quot; expanding outward until the ends of both
            files are reached.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Its cost is O((N+M)·D), where D is the number of differences — tiny when files are similar, which is the overwhelmingly common case.</li>
            <li>It greedily follows &quot;diagonals&quot; (runs of matching lines) as far as possible before spending an edit.</li>
            <li>It is the default algorithm in git and the basis of most diff libraries, including the ones running inside browser-based tools like our <Link href="/diff-checker">Diff Checker</Link>.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Moved Blocks Appear as Delete + Add
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Now the earlier observation becomes a general rule. A subsequence must preserve order,
            so when a block of code moves from the top of a file to the bottom, the algorithm
            cannot count it in the LCS twice or out of order. It must choose: match the block in
            its old position or its new one. Either way, the other occurrence becomes a removal
            plus an addition.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>This is a limitation of the model, not a bug in your tool.</li>
            <li>Git can post-process the result: <code>git diff --color-moved</code> scans the delete/add pairs for identical blocks and colours them as moves.</li>
            <li>Reviewers should stay alert: a &quot;moved&quot; block in a PR may also contain a sneaky one-line edit hiding inside the move.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Performance Notes
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Lines, not characters</strong> — diffing line-by-line first shrinks the problem enormously; character-level comparison is applied only within changed line pairs.</li>
            <li><strong>Hashing</strong> — tools compare line hashes rather than full strings, making each comparison O(1).</li>
            <li><strong>Trimming common ends</strong> — identical prefixes and suffixes are stripped before the algorithm runs, since most edits touch the middle of a file.</li>
            <li><strong>Bail-out heuristics</strong> — on pathological inputs (huge files with massive differences), git switches to faster approximate modes rather than computing a perfect minimal diff.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            These optimisations are why a diff of two large files feels instant — including
            client-side, in your browser. To see the output side of the story, read{' '}
            <Link href="/blog/understanding-diff-output-unified-vs-split-view">unified vs split view</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What algorithm do diff tools use?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Most diff tools are built on the longest common subsequence (LCS) problem: find the longest sequence of lines that appears in both files in the same order. Everything not in that sequence is reported as added or removed. In practice, most tools including git use the Myers algorithm, an efficient way of solving this problem.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does a moved block of code show as deleted and added?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Classic diff algorithms only find lines that stay in the same relative order in both files. A block that moves from the top to the bottom breaks that order, so the algorithm reports it as removed from the old location and added at the new one. Some tools, like git with <code>--color-moved</code>, detect this afterwards and colour moved blocks differently.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is diff output always the smallest possible set of changes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The change count is minimal for the line-based model, but the choice of which lines to pair is not always the most human-readable one, especially with repetitive lines like braces or blank lines. Several minimal diffs can exist, and heuristics such as <code>git diff --histogram</code> often pick more readable ones.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Diff Checker</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              See these algorithms in action — compare two texts line by line in your browser,
              instantly and for free.
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
              <li><Link href="/blog/git-diff-explained-for-beginners">Git Diff Explained for Beginners</Link></li>
              <li><Link href="/blog/how-to-compare-two-text-files-online">How to Compare Two Text Files Online</Link></li>
              <li><Link href="/blog/json-diff-comparing-two-json-objects">JSON Diff: Comparing Two JSON Objects</Link></li>
              <li><Link href="/blog/compare-config-files-across-environments">Compare Config Files Across Environments</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
