// pages/blog/writing-github-issues-and-prs-with-markdown.js
import Head from 'next/head';
import Link from 'next/link';

export default function WritingGithubIssuesAndPrsWithMarkdown() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Writing GitHub Issues and PRs with Markdown',
        item: 'https://dev-brains-ai.com/blog/writing-github-issues-and-prs-with-markdown',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Writing GitHub Issues and PRs with Markdown — A Practical Guide',
    description:
      'Write GitHub issues and pull requests that get fixed faster: minimal repros in fenced code blocks, task-list acceptance criteria, collapsible logs, environment tables, and issue templates.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/writing-github-issues-and-prs-with-markdown',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I make a collapsible section in a GitHub issue?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the HTML details and summary tags, which GitHub renders as a collapsible block. Put your long logs or stack traces inside, with a blank line after the summary tag so Markdown inside still renders. This keeps issues scannable while preserving full detail.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I link a commit or another issue in GitHub Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Type # followed by the issue or PR number (for example #142) and GitHub auto-links it. Paste a full commit SHA or its first 7 characters and GitHub links the commit. Keywords like "Fixes #142" in a PR description automatically close the issue when the PR merges.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should a good bug report contain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A good bug report has a specific title, a minimal reproducible example in a fenced code block, expected versus actual behavior, an environment table (OS, runtime version, package version), and any relevant logs in a collapsible section. If a maintainer can reproduce the bug in under two minutes, it gets fixed much faster.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Writing GitHub Issues and PRs with Markdown | Dev Brains AI</title>
        <meta
          name="description"
          content="Write GitHub issues and PRs that get fixed faster: minimal repros in fenced code blocks, task-list acceptance criteria, collapsible logs, environment tables, and templates."
        />
        <meta
          name="keywords"
          content="github issue markdown, writing good github issues, pull request description template, github task list, collapsible section github, issue template github, bug report format, github pr best practices"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/writing-github-issues-and-prs-with-markdown" />
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
              <li aria-current="page">GitHub Issues &amp; PRs with Markdown</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Writing GitHub Issues and PRs with Markdown — A Practical Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            The difference between an issue that gets fixed in a day and one that sits untouched
            for months is usually not the bug — it is the write-up. GitHub issues and pull
            requests are rendered with GitHub Flavored Markdown, and a handful of its features
            (fenced code blocks, task lists, collapsible sections, tables, and auto-linking) can
            turn a wall of text into something a maintainer can act on in minutes. This guide
            covers each technique with copy-paste examples, plus a before/after of a real bug
            report.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Minimal Repro in a Fenced Code Block
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The single highest-value part of any bug report is a minimal reproducible example:
            the smallest snippet that triggers the problem. Put it in a fenced block with a
            language tag so it gets syntax highlighting, and pair it with expected vs actual
            behaviour:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`## Steps to reproduce

\`\`\`js
const cache = new LRUCache({ max: 2 });
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);   // evicts 'a'
console.log(cache.get('b')); // expected 2, got undefined
\`\`\`

**Expected:** \`cache.get('b')\` returns \`2\`
**Actual:** returns \`undefined\` — 'b' was evicted instead of 'a'`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Strip everything not needed to trigger the bug: no framework boilerplate, no real
            business data, no 400-line file. If the maintainer can paste your snippet into a REPL
            and see the failure, you have done most of their debugging for them.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Task Lists for Acceptance Criteria
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            GitHub renders <code>- [ ]</code> as a real checkbox that anyone with write access can
            tick without editing the text. Use them for acceptance criteria in feature issues and
            for reviewer checklists in PRs — GitHub even shows the completion count
            (&quot;3 of 5 tasks&quot;) in issue lists:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`## Acceptance criteria

- [x] Export button visible on the reports page
- [x] CSV includes all filtered rows, not just the current page
- [ ] Dates exported in ISO 8601 format
- [ ] Export of 50k rows completes in under 10 seconds
- [ ] Unit tests cover empty-result export`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This turns a vague request into a definition of done. In a PR description, the same
            pattern works as a self-review checklist: tests added, docs updated, migration
            included, changelog entry written.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Collapsible Sections for Logs and Long Output
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Full stack traces and verbose logs are essential evidence but terrible reading. Wrap
            them in a details/summary block — GitHub renders it collapsed by default. Note the
            blank line after the summary tag; without it, Markdown inside will not render:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`<details>
<summary>Full stack trace (142 lines)</summary>

\`\`\`text
TypeError: Cannot read properties of undefined (reading 'id')
    at UserService.resolve (src/services/user.js:88:31)
    at async Router.handle (src/router.js:52:12)
    ...
\`\`\`

</details>`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The issue stays scannable — summary, repro, environment — while the full detail is one
            click away for whoever needs it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Linking, Tables, and Templates
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Auto-linking.</strong> GitHub links references for you: <code>#142</code>{' '}
            becomes a link to issue or PR 142, a pasted commit SHA becomes a commit link, and{' '}
            <code>owner/repo#57</code> links across repositories. In a PR description, closing
            keywords wire the whole workflow together:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Fixes #142
Related to #98, follow-up planned in #150
Regression introduced in a1b2c3d`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            When the PR merges, issue #142 closes automatically and both threads are permanently
            cross-referenced.
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Tables for environment info.</strong> A small GFM table beats a prose
            paragraph for version details:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`| Field       | Value            |
|-------------|------------------|
| OS          | Ubuntu 24.04     |
| Node        | 22.11.0          |
| Package     | lru-cache 11.0.2 |
| Reproduced  | 10/10 runs       |`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <strong>Issue templates.</strong> To make this structure the default for your whole
            repo, add templates under <code>.github/ISSUE_TEMPLATE/</code> (Markdown or YAML
            forms) and a <code>.github/PULL_REQUEST_TEMPLATE.md</code>. Contributors then start
            from your headings — Steps to reproduce, Expected, Actual, Environment — instead of a
            blank box, and the quality floor of your issue tracker rises overnight.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Before and After: A Bad Issue vs a Great One
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Before</strong> — technically a bug report, practically useless:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Title: cache broken

it doesnt work. i set values and get undefined back sometimes.
using latest version. please fix asap this is blocking us`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>After</strong> — same bug, five minutes more effort:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Title: Wrong entry evicted when max=2 and get() precedes set()

## Steps to reproduce
\`\`\`js
const cache = new LRUCache({ max: 2 });
cache.set('a', 1); cache.set('b', 2);
cache.get('a');       // touch 'a'
cache.set('c', 3);    // should evict 'b'
cache.get('a');       // returns undefined ❌
\`\`\`

**Expected:** 'b' is evicted (least recently used)
**Actual:** 'a' is evicted

## Environment
| Field   | Value            |
|---------|------------------|
| Node    | 22.11.0          |
| Package | lru-cache 11.0.2 |

Possibly related to #131 (recency not updated on get).`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The second version has a searchable title, a two-minute repro, a clear expected/actual
            contrast, exact versions, and a lead for the maintainer to follow. That is the issue
            that gets fixed first.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I make a collapsible section in a GitHub issue?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use the HTML details and summary tags, which GitHub renders as a collapsible block.
              Put your long logs or stack traces inside, with a blank line after the summary tag
              so Markdown inside still renders. This keeps issues scannable while preserving full
              detail.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I link a commit or another issue in GitHub Markdown?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Type # followed by the issue or PR number (for example #142) and GitHub auto-links
              it. Paste a full commit SHA or its first 7 characters and GitHub links the commit.
              Keywords like &quot;Fixes #142&quot; in a PR description automatically close the
              issue when the PR merges.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What should a good bug report contain?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A good bug report has a specific title, a minimal reproducible example in a fenced
              code block, expected versus actual behavior, an environment table (OS, runtime
              version, package version), and any relevant logs in a collapsible section. If a
              maintainer can reproduce the bug in under two minutes, it gets fixed much faster.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Markdown Previewer</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Draft your issue or PR description and preview the rendered GFM — tables, task
              lists, and collapsible sections — before you post it. No signup, no cost.
            </p>
            <Link href="/markdown-preview">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Markdown Previewer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/github-flavored-markdown-guide">GitHub Flavored Markdown Guide</Link></li>
              <li><Link href="/blog/markdown-syntax-cheat-sheet">Markdown Syntax Cheat Sheet</Link></li>
              <li><Link href="/blog/markdown-vs-html-when-to-use-which">Markdown vs HTML — When to Use Which</Link></li>
              <li><Link href="/blog/markdown-for-technical-documentation-tips">Markdown for Technical Documentation — Tips</Link></li>
              <li><Link href="/blog/how-to-write-a-great-readme">How to Write a Great README</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
