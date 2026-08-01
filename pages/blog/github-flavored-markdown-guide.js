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
        name: 'GFM (GitHub Flavored Markdown) Guide',
        item: 'https://dev-brains-ai.com/blog/github-flavored-markdown-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'GFM Cheat Sheet: GitHub Flavored Markdown Tables & Alerts',
    description:
      'The GFM (GitHub Flavored Markdown) cheat sheet with real GitHub examples: tables, task lists, alerts, and a clear comparison to plain CommonMark.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/github-flavored-markdown-guide',
    datePublished: '2026-07-15',
    dateModified: '2026-08-01',
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
      {
        '@type': 'Question',
        name: 'What does GFM stand for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GFM stands for GitHub Flavored Markdown — the specific Markdown dialect GitHub uses across the whole platform. It is a superset of CommonMark, meaning every standard Markdown document is also valid GFM.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is GFM different from regular Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Regular Markdown (CommonMark) covers headings, lists, links, and emphasis. GFM adds tables, task lists, strikethrough, autolinked issue references, syntax-highlighted code fences, footnotes, and alert boxes on top of that base.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will GFM tables and alerts work on GitLab or a static site?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tables usually work on GitLab and most static site generators, since they were widely copied. Alerts ([!NOTE], [!WARNING]) will not — that syntax is GitHub-specific and renders as a plain blockquote with the literal "[!NOTE]" text everywhere else. Always test on the actual target platform before relying on GFM-only features.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does CommonMark support tables or task lists?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Tables, task-list checkboxes, strikethrough, footnotes, and alerts are all GFM extensions, not part of the core CommonMark specification. A CommonMark-only renderer will show GFM table syntax as plain text with pipe characters rather than an actual table.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>GFM Cheat Sheet: GitHub Flavored Markdown Tables &amp; Alerts | Dev Brains AI</title>
        <meta
          name="description"
          content="The GFM (GitHub Flavored Markdown) cheat sheet with real GitHub examples: tables, task lists, alerts, and a clear comparison to plain CommonMark."
        />
        <meta
          name="keywords"
          content="gfm, gfm github, github flavored markdown, gfm cheat sheet, github markdown table, markdown task list, markdown alerts, gfm vs commonmark, github readme markdown, markdown syntax highlighting"
        />
        <meta property="og:title" content="GFM Cheat Sheet: GitHub Flavored Markdown Tables &amp; Alerts" />
        <meta
          property="og:description"
          content="The GFM cheat sheet with real GitHub examples: tables, task lists, alerts, and a clear comparison to plain CommonMark."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/github-flavored-markdown-guide" />
        <meta property="og:type" content="article" />
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
            GFM Cheat Sheet: GitHub Flavored Markdown Tables, Alerts &amp; Syntax
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            GitHub's own spec for GFM is the authoritative reference, but it reads like a grammar
            document — precise, and not exactly built for someone who just needs to remember the
            table syntax before a PR deadline. This page is the version built for that moment:{' '}
            <strong>every GFM extension with a copy-paste example</strong>, what it looks like once
            GitHub actually renders it, and where it silently stops working outside GitHub.
          </p>

          <p className="small" style={{ marginBottom: 16 }}>
            <strong>GFM</strong> is short for <strong>GitHub Flavored Markdown</strong> — the exact
            Markdown dialect GitHub uses everywhere on the platform. Standard Markdown (CommonMark)
            covers headings, lists, links, and emphasis, but the moment you write a README, open an
            issue, or review a pull request on GitHub, you are using GFM's extensions on top of that
            base: tables, task lists, strikethrough, autolinks, syntax-highlighted code fences,
            footnotes, and alert boxes.
          </p>

          <svg viewBox="0 0 640 190" style={{ width: '100%', height: 'auto', marginBottom: 18, borderRadius: 8, background: '#0f172a' }} role="img" aria-label="Diagram showing GFM as CommonMark plus GitHub extensions">
            <rect x="24" y="30" width="280" height="130" rx="10" fill="#1e293b" stroke="#334155" />
            <text x="164" y="60" textAnchor="middle" fill="#94a3b8" fontSize="13" fontFamily="ui-monospace, monospace">CommonMark (base)</text>
            <text x="164" y="88" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace"># Headings   *emphasis*</text>
            <text x="164" y="108" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">- lists      [links](url)</text>
            <text x="164" y="128" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">`code`      &gt; blockquote</text>
            <text x="330" y="100" textAnchor="middle" fill="#34d399" fontSize="22" fontFamily="ui-monospace, monospace">+</text>
            <rect x="356" y="18" width="260" height="154" rx="10" fill="#0d3b34" stroke="#14b8a6" />
            <text x="486" y="42" textAnchor="middle" fill="#5eead4" fontSize="13" fontFamily="ui-monospace, monospace">GFM extensions</text>
            <text x="486" y="66" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Tables · Task lists</text>
            <text x="486" y="86" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Strikethrough · Autolinks</text>
            <text x="486" y="106" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Syntax-highlighted fences</text>
            <text x="486" y="126" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">Footnotes · Alerts</text>
            <text x="486" y="152" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">= GFM</text>
          </svg>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            GFM vs. Plain CommonMark: Feature by Feature
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every GFM document is valid CommonMark's superset, not the other way around — write
            plain CommonMark and it works everywhere; write GFM tables or alerts and they degrade
            to plain text (or a plain blockquote) anywhere that isn't GitHub.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table className="small" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>Feature</th>
                  <th style={{ padding: '8px 10px' }}>CommonMark</th>
                  <th style={{ padding: '8px 10px' }}>GFM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Headings, emphasis, links, lists', 'Yes', 'Yes (inherited)'],
                  ['Fenced code blocks', 'Yes (parsing only)', 'Yes + Linguist syntax highlighting'],
                  ['Tables', 'No', 'Yes'],
                  ['Task list checkboxes', 'No', 'Yes (interactive in issues/PRs)'],
                  ['Strikethrough (~~text~~)', 'No', 'Yes'],
                  ['Autolinked bare URLs', 'No (needs <angle brackets>)', 'Yes (automatic)'],
                  ['Footnotes', 'No', 'Yes (added 2021)'],
                  ['Alerts ([!NOTE], [!WARNING])', 'No', 'Yes, GitHub-only (added 2023)'],
                  ['@mentions and #issue autolinks', 'No', 'Yes, GitHub-only'],
                ].map((row) => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>{row[0]}</td>
                    <td style={{ padding: '8px 10px', color: '#64748b' }}>{row[1]}</td>
                    <td style={{ padding: '8px 10px' }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
          <p className="small" style={{ marginBottom: 8 }}>
            Here is what that source actually renders to on GitHub:
          </p>
          <div style={{ border: '1px solid #d0d7de', borderRadius: 6, overflow: 'hidden', marginBottom: 6, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#f6f8fa' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>Status</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>Coverage</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>Login</td><td style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>Done</td><td style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>95%</td></tr>
                <tr><td style={{ padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>Payments</td><td style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>Review</td><td style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid #d0d7de', color: '#1f2328' }}>80%</td></tr>
                <tr><td style={{ padding: '8px 12px', color: '#1f2328' }}>Notifications</td><td style={{ textAlign: 'center', padding: '8px 12px', color: '#1f2328' }}>Planned</td><td style={{ textAlign: 'right', padding: '8px 12px', color: '#1f2328' }}>0%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="small" style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 14 }}>
            ↑ Rendered example (GitHub's actual UI, reproduced here — not a live GitHub page)
          </p>
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
          <p className="small" style={{ marginBottom: 8 }}>
            Rendered, that becomes a real checklist with a progress count GitHub tracks automatically:
          </p>
          <div style={{ border: '1px solid #d0d7de', borderRadius: 6, padding: 12, marginBottom: 6, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '0.8rem', color: '#1f2328' }}>
            <div style={{ color: '#656d76', marginBottom: 8, fontSize: '0.75rem' }}>2 of 4 tasks</div>
            <div style={{ marginBottom: 4 }}><span style={{ marginRight: 6 }}>☑</span>Write the migration script</div>
            <div style={{ marginBottom: 4 }}><span style={{ marginRight: 6 }}>☑</span>Add unit tests</div>
            <div style={{ marginBottom: 4 }}><span style={{ marginRight: 6, border: '1px solid #d0d7de', display: 'inline-block', width: 12, height: 12, borderRadius: 3 }}></span>Update the API docs</div>
            <div><span style={{ marginRight: 6, border: '1px solid #d0d7de', display: 'inline-block', width: 12, height: 12, borderRadius: 3 }}></span>Deploy to staging</div>
          </div>
          <p className="small" style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 14 }}>
            ↑ Rendered example — on an issue or PR, each box is clickable and the "2 of 4" count updates live
          </p>
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
            Putting It Together: A Real PR Description
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here is what most of these extensions look like combined in a single, realistic pull
            request description — the kind of GFM you would actually write day to day:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`## Summary
Fixes #128 — checkout was failing when \`discountCode\` was empty.

## Changes
- [x] Guard against empty discount codes in \`applyDiscount()\`
- [x] Add unit tests for the empty and null cases
- [ ] Update the API docs (follow-up PR)

## Before / after

| Input          | Before        | After     |
| :------------- | :-----------: | --------: |
| \`""\`           | 500 error     | No-op     |
| \`null\`         | 500 error     | No-op     |
| \`"SAVE10"\`      | Applied       | Applied   |

> [!WARNING]
> This changes the return type of \`applyDiscount()\` from \`void\` to \`Result\`. cc @teammate

\`\`\`diff
- function applyDiscount(code) {
+ function applyDiscount(code) {
+   if (!code) return { applied: false };
    ...
\`\`\``}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice how little of this is prose — the task list gives reviewers a progress checklist,
            the table replaces a paragraph of "before this bug, X happened," the alert calls out the
            one thing a reviewer must not miss, and the diff fence shows the fix without linking out
            to the full file.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Second Example: A Bug Report Issue
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            PR descriptions lean on tables and diffs; a good bug report leans harder on footnotes
            and autolinked references instead:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`## Bug: export button silently does nothing on Safari

**Steps to reproduce**
1. Open the dashboard on Safari 17[^1]
2. Click "Export CSV"
3. Nothing happens — no download, no error in console

**Expected:** a CSV file downloads
**Actual:** the click is silently swallowed

Related to #204, which fixed the same symptom on Firefox last month.
Introduced somewhere around @teammate's PR #198.

[^1]: Not reproducible on Chrome or Firefox — appears Safari-specific.`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The footnote keeps the "which browsers" caveat out of the main flow without deleting it,
            and <code>#204</code> / <code>#198</code> autolink straight to those issues and PRs —
            anyone reading this six months later can follow the whole history in two clicks.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common GFM Mistakes
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Missing blank line before a table.</strong> GFM tables must be preceded by a blank line, or GitHub renders the pipes as plain text instead of a table.</li>
            <li><strong>No space inside task-list brackets.</strong> <code>-[x]</code> does not render as a checkbox — it must be <code>- [x]</code> with a space after the dash.</li>
            <li><strong>Forgetting the code fence language.</strong> Triple backticks with no language tag (just <code>```</code>) still renders a code block, but without syntax highlighting — always add <code>js</code>, <code>python</code>, <code>diff</code>, etc.</li>
            <li><strong>Using tabs instead of spaces for nested lists.</strong> GFM's parser is inconsistent with tab-indented nested lists across contexts; use spaces (typically 2 or 4) to avoid list items silently un-nesting.</li>
            <li><strong>Expecting alerts to work outside GitHub.</strong> <code>{'> [!NOTE]'}</code> syntax is GitHub-specific — on GitLab, npm, or a static site it just renders as a plain blockquote starting with the literal text "[!NOTE]".</li>
            <li><strong>Single tilde for strikethrough.</strong> GFM strikethrough needs double tildes — <code>~~text~~</code> — a single tilde does nothing.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Where GFM Works (and Where It Does Not)
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>README and docs files</strong> — tables, fences, footnotes, and alerts all render; task lists show as static checkboxes. See our <Link href="/blog/how-to-write-a-great-readme">guide to writing a great README</Link> for how to structure one.</li>
            <li><strong>Issues and pull requests</strong> — everything works, and task lists plus mentions become interactive. For a deeper walkthrough, see <Link href="/blog/writing-github-issues-and-prs-with-markdown">writing GitHub issues and PRs with Markdown</Link>.</li>
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
          <div style={{ marginBottom: 10 }}>
            <strong>What does GFM stand for?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              GFM stands for GitHub Flavored Markdown — the specific Markdown dialect GitHub uses across the whole platform. It is a superset of CommonMark, meaning every standard Markdown document is also valid GFM.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is GFM different from regular Markdown?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Regular Markdown (CommonMark) covers headings, lists, links, and emphasis. GFM adds tables, task lists, strikethrough, autolinked issue references, syntax-highlighted code fences, footnotes, and alert boxes on top of that base.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Will GFM tables and alerts work on GitLab or a static site?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Tables usually work on GitLab and most static site generators, since they were widely copied. Alerts (<code>[!NOTE]</code>, <code>[!WARNING]</code>) will not — that syntax is GitHub-specific and renders as a plain blockquote with the literal &quot;[!NOTE]&quot; text everywhere else. Always test on the actual target platform before relying on GFM-only features.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does CommonMark support tables or task lists?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Tables, task-list checkboxes, strikethrough, footnotes, and alerts are all GFM extensions, not part of the core CommonMark specification. A CommonMark-only renderer will show GFM table syntax as plain text with pipe characters rather than an actual table.
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
