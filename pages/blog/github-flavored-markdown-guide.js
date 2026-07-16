// pages/blog/github-flavored-markdown-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function GithubFlavoredMarkdownGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'GitHub Flavored Markdown (GFM) — The Complete Guide',
        item: 'https://dev-brains-ai.com/blog/github-flavored-markdown-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'GitHub Flavored Markdown (GFM) — Tables, Task Lists, Alerts and More',
    description:
      'A complete guide to GitHub Flavored Markdown: tables with alignment, task lists, strikethrough, autolinks, mentions, syntax-highlighted code fences, footnotes, and alerts.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/github-flavored-markdown-guide',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is GitHub Flavored Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GitHub Flavored Markdown (GFM) is GitHub’s extension of standard Markdown. It adds tables, task lists, strikethrough, autolinks, syntax-highlighted code fences, footnotes, and alerts on top of the CommonMark specification.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I make a table in GitHub Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use pipes to separate columns and hyphens for the header row. Add colons to the separator row to control alignment: :--- for left, :---: for center, and ---: for right alignment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does GitHub Flavored Markdown work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GFM renders in README files, issues, pull requests, discussions, wikis, gists, and comments on GitHub. Some features like task lists and mentions are interactive only in issues and pull requests.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>GitHub Flavored Markdown (GFM) — The Complete Guide | Dev Brains AI</title>
        <meta
          name="description"
          content="Master GitHub Flavored Markdown: tables with alignment syntax, task lists, strikethrough, autolinks, mentions, code fences with syntax highlighting, footnotes, and alerts."
        />
        <meta
          name="keywords"
          content="github flavored markdown, gfm, github markdown table, markdown task list, markdown alerts, github readme markdown, markdown syntax highlighting, gfm guide"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/github-flavored-markdown-guide" />
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
              <li aria-current="page">GitHub Flavored Markdown Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            GitHub Flavored Markdown (GFM) — Tables, Task Lists, Alerts and More
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Standard Markdown covers headings, lists, links, and emphasis — but the moment you write
            a README, open an issue, or review a pull request on GitHub, you are actually using
            GitHub Flavored Markdown (GFM). GFM extends the CommonMark specification with tables,
            task lists, strikethrough, autolinks, syntax-highlighted code fences, footnotes, and
            alert boxes. This guide walks through every GFM extension with copy-paste examples, and
            explains where each one works.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Tables and Alignment Syntax
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Tables are the most-used GFM extension. Columns are separated by pipes, and the second
            row of hyphens marks the header. Colons in that separator row control alignment:
            <code> :--- </code> aligns left, <code> :---: </code> centers, and <code> ---: </code>
            aligns right.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`| Feature       | Status   | Coverage |
| :------------ | :------: | -------: |
| Login         | Done     |      95% |
| Payments      | Review   |      80% |
| Notifications | Planned  |       0% |`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            You do not need to line up the pipes perfectly — GitHub renders ragged tables fine —
            but aligned source is much easier to review in a diff. Outer pipes are optional, and
            you can use inline formatting (bold, code, links) inside cells. What you cannot do is
            merge cells or add multi-line content; for that you need HTML or a different structure.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Task Lists and Strikethrough
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Task lists turn bullet items into checkboxes. In issues and pull requests they are
            interactive — clicking the checkbox updates the source, and GitHub shows a progress
            count like "3 of 5 tasks" on the issue card.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`- [x] Write the migration script
- [x] Add unit tests
- [ ] Update the API docs
- [ ] Deploy to staging

Use ~~strikethrough~~ for text that is no longer valid.`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Strikethrough uses double tildes: <code>~~old plan~~</code> renders with a line through
            it. It is useful for showing superseded decisions without deleting the history of the
            discussion.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Autolinks, Mentions, and Issue References
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            GFM automatically converts several plain-text patterns into links, no bracket syntax
            required:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>URLs</strong> — pasting https://dev-brains-ai.com becomes a clickable link automatically</li>
            <li><strong>@mentions</strong> — typing <code>@username</code> links to a profile and notifies that person or team</li>
            <li><strong>Issue and PR references</strong> — <code>#42</code> links to issue or PR number 42 in the same repo; <code>owner/repo#42</code> works across repositories</li>
            <li><strong>Commit SHAs</strong> — pasting a full or short commit hash links to that commit</li>
            <li><strong>Closing keywords</strong> — writing "Fixes #42" in a PR description automatically closes issue 42 when the PR merges</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            These references are the glue of a GitHub workflow: they build a cross-linked trail
            between bugs, fixes, and releases without any manual effort.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Code Fences with Syntax Highlighting
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Fenced code blocks use three backticks. Add a language identifier immediately after the
            opening fence and GitHub applies full syntax highlighting:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`\`\`\`javascript
const total = items.reduce((sum, item) => sum + item.price, 0);
\`\`\`

\`\`\`diff
- const timeout = 3000;
+ const timeout = 10000;
\`\`\``}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            GitHub supports hundreds of languages via Linguist — <code>js</code>, <code>python</code>,
            <code> sql</code>, <code>bash</code>, <code>json</code>, <code>yaml</code>, and more. The
            <code> diff</code> language is especially handy in PR discussions: lines starting with a
            plus render green and lines starting with a minus render red.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Footnotes and Alerts
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Footnotes let you add references without cluttering the main text. Alerts (also called
            admonitions) render as colored callout boxes and are perfect for warnings in READMEs:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Here is a claim that needs a source.[^1]

[^1]: The footnote text appears at the bottom of the page.

> [!NOTE]
> Helpful information users should know.

> [!WARNING]
> Critical content demanding immediate attention.`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Five alert types are supported: <code>[!NOTE]</code>, <code>[!TIP]</code>,
            <code> [!IMPORTANT]</code>, <code>[!WARNING]</code>, and <code>[!CAUTION]</code>. Each
            renders with its own icon and color. Alerts are a GitHub-specific extension — other
            Markdown renderers will show them as plain blockquotes, so do not rely on them outside
            GitHub.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Where GFM Works (and Where It Does Not)
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>README and docs files</strong> — tables, fences, footnotes, and alerts all render; task lists show as static checkboxes</li>
            <li><strong>Issues and pull requests</strong> — everything works, and task lists plus mentions become interactive</li>
            <li><strong>Discussions, wikis, and gists</strong> — full GFM support</li>
            <li><strong>Commit messages</strong> — issue references link, but most formatting is not rendered in every view</li>
            <li><strong>Outside GitHub</strong> — GitLab and Bitbucket support most GFM; static site generators vary, so test tables and footnotes before publishing</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            When in doubt, preview before you publish. A live previewer such as the free
            <Link href="/markdown-preview"> Dev Brains AI Markdown Previewer</Link> shows exactly
            how tables, task lists, and code fences will render as you type.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is GitHub Flavored Markdown?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              GitHub Flavored Markdown (GFM) is GitHub&apos;s extension of standard Markdown. It adds tables, task lists, strikethrough, autolinks, syntax-highlighted code fences, footnotes, and alerts on top of the CommonMark specification.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I make a table in GitHub Markdown?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use pipes to separate columns and hyphens for the header row. Add colons to the separator row to control alignment: <code>:---</code> for left, <code>:---:</code> for center, and <code>---:</code> for right alignment.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Where does GitHub Flavored Markdown work?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              GFM renders in README files, issues, pull requests, discussions, wikis, gists, and comments on GitHub. Some features like task lists and mentions are interactive only in issues and pull requests.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Markdown Previewer</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Write GFM tables, task lists, and code fences with a live side-by-side preview in
              your browser. No signup, no cost.
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
              <li><Link href="/blog/markdown-syntax-cheat-sheet">Markdown Syntax Cheat Sheet</Link></li>
              <li><Link href="/blog/writing-github-issues-and-prs-with-markdown">Writing GitHub Issues and PRs with Markdown</Link></li>
              <li><Link href="/blog/markdown-vs-html-when-to-use-which">Markdown vs HTML — When to Use Which</Link></li>
              <li><Link href="/blog/how-to-write-a-great-readme">How to Write a Great README</Link></li>
              <li><Link href="/blog/how-to-write-conventional-commit-messages">How to Write Conventional Commit Messages</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
