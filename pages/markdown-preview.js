// pages/markdown-preview.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { marked } from 'marked';

const SAMPLE_MARKDOWN = `# Project Notes

Welcome to the **Markdown Previewer**. Type on the left, see *rendered HTML* on the right.

## Features to try

- Bullet lists like this one
- **Bold**, *italic*, and \`inline code\`
- [Links](https://dev-brains-ai.com)

### Task list (GFM)

- [x] Write the README
- [ ] Add CI badge
- [ ] Publish v1.0

### Code block

\`\`\`js
function greet(name) {
  return \`Hello, \` + name + '!';
}
console.log(greet('world'));
\`\`\`

### Table

| Flag | Default | Description |
| ---- | ------- | ----------- |
| gfm | true | GitHub Flavored Markdown |
| breaks | true | Single newline = line break |

> Blockquote: everything on this page renders locally in your browser.
`;

const FAQ = [
  {
    q: 'Is this Markdown Previewer free?',
    a: 'Yes — the Markdown Previewer on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Is my markdown sent to a server?',
    a: 'No. Rendering happens entirely in your browser using the marked JavaScript library. Nothing you type is uploaded, logged, or stored on our servers — the preview only ever renders your own local input.',
  },
  {
    q: 'Which markdown flavor does the preview use?',
    a: 'GitHub Flavored Markdown (GFM), which is standard CommonMark plus tables, task lists, strikethrough, and autolinks. The breaks option is also enabled, so a single newline becomes a line break — like typing in a GitHub comment.',
  },
  {
    q: 'What does the Copy HTML button copy?',
    a: 'It copies the raw HTML produced by the markdown parser — the same HTML shown in the preview pane — so you can paste it into an email template, CMS, or static page.',
  },
  {
    q: 'Why does my preview look different on GitHub?',
    a: 'The markdown-to-HTML conversion is the same, but every site applies its own CSS. GitHub styles headings, tables, and code blocks with its own stylesheet, so spacing and fonts will differ even though the structure is identical.',
  },
];

export default function MarkdownPreviewPage() {
  const [text, setText] = useState(SAMPLE_MARKDOWN);
  const [copied, setCopied] = useState(false);

  const html = marked.parse(text, { gfm: true, breaks: true });

  async function handleCopyHtml() {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Clipboard API unavailable; nothing else to do client-side.
    }
  }

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
    name: 'Dev Brains AI Markdown Previewer',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free live markdown previewer that runs entirely in your browser. Type GitHub Flavored Markdown on the left and see rendered HTML instantly on the right, with one-click Copy HTML.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Markdown Previewer', item: 'https://dev-brains-ai.com/markdown-preview' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Markdown Previewer — Live GFM Preview Online | Dev Brains AI</title>
        <meta
          name="description"
          content="Preview markdown as you type with full GitHub Flavored Markdown support: tables, task lists, code blocks, and blockquotes. 100% client-side, nothing uploaded."
        />
        <meta
          name="keywords"
          content="markdown previewer, markdown preview online, live markdown editor, gfm preview, markdown to html, readme preview, Dev Brains AI"
        />
        <meta property="og:title" content="Free Markdown Previewer — Live GFM Preview Online" />
        <meta
          property="og:description"
          content="Type markdown on the left, see rendered output instantly on the right — tables, task lists, and code blocks included. Runs 100% in your browser."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/markdown-preview" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/markdown-preview" />

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

      <style>{`
        .md-preview h1 { font-size: 1.6em; margin: 0.6em 0 0.4em; border-bottom: 1px solid #e6eef2; padding-bottom: 0.2em; }
        .md-preview h2 { font-size: 1.35em; margin: 0.6em 0 0.4em; border-bottom: 1px solid #e6eef2; padding-bottom: 0.2em; }
        .md-preview h3 { font-size: 1.15em; margin: 0.6em 0 0.4em; }
        .md-preview p { margin: 0.5em 0; line-height: 1.6; }
        .md-preview ul, .md-preview ol { margin: 0.5em 0; padding-left: 1.6em; }
        .md-preview li { margin: 0.2em 0; }
        .md-preview code { background: #f3f4f6; padding: 2px 5px; border-radius: 4px; font-family: monospace; font-size: 0.92em; }
        .md-preview pre { background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: 8px; overflow-x: auto; margin: 0.6em 0; }
        .md-preview pre code { background: transparent; color: inherit; padding: 0; }
        .md-preview blockquote { border-left: 4px solid #e6eef2; color: #475569; margin: 0.6em 0; padding: 2px 0 2px 12px; }
        .md-preview table { border-collapse: collapse; margin: 0.6em 0; }
        .md-preview th, .md-preview td { border: 1px solid #e6eef2; padding: 6px 10px; text-align: left; }
        .md-preview a { color: #0d9488; }
        .md-preview img { max-width: 100%; }
      `}</style>

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
            <li aria-current="page">Markdown Previewer</li>
          </ol>
        </nav>

        <h1>Free Markdown Previewer</h1>
        <p className="small">
          Type or paste <strong>markdown</strong> on the left and see it rendered live on the
          right, with full GitHub Flavored Markdown support — tables, task lists, fenced code
          blocks, and blockquotes. The preview renders your own local input only; everything runs
          in your browser and nothing is uploaded.
        </p>

        <div style={{ marginTop: 10, marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleCopyHtml} disabled={!text.trim()}>
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
          <button
            type="button"
            onClick={() => {
              setText('');
              setCopied(false);
            }}
          >
            Clear
          </button>
          <button
            type="button"
            className="small"
            onClick={() => {
              setText(SAMPLE_MARKDOWN);
              setCopied(false);
            }}
          >
            Load sample
          </button>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'stretch' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <label htmlFor="md-input">
              <strong>Markdown</strong>
            </label>
            <textarea
              id="md-input"
              aria-label="Markdown source"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setCopied(false);
              }}
              style={{
                width: '100%',
                minHeight: 420,
                fontFamily: 'monospace',
                marginTop: 6,
                resize: 'vertical',
              }}
              placeholder="# Heading&#10;&#10;Write some **markdown** here..."
            />
          </div>
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <strong>Preview</strong>
            <div
              className="md-preview"
              aria-label="Rendered markdown preview"
              style={{
                border: '1px solid #e6eef2',
                borderRadius: 8,
                padding: '4px 14px',
                minHeight: 420,
                marginTop: 6,
                overflowX: 'auto',
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this Markdown Previewer</h2>
        <p>
          Markdown is the lingua franca of developer writing — READMEs, issues, pull requests,
          wikis, changelogs, and documentation sites all speak it. But markdown is written blind:
          you type asterisks and pipes and hope the renderer agrees with your intent. This free
          Markdown Previewer closes that loop. The left pane is a plain text editor; the right pane
          re-renders on every keystroke using <code>marked</code>, a fast, widely used markdown
          parser, with GitHub Flavored Markdown (GFM) and line-break handling enabled.
        </p>
        <p>
          The tool is honest about what it does: it renders <strong>your own local input</strong>{' '}
          and nothing else. There is no fetching of remote documents, no API call, no upload, and
          no storage — closing the tab discards everything.
        </p>

        <h3>What GitHub Flavored Markdown adds</h3>
        <p>
          GFM is CommonMark plus a handful of extensions you almost certainly rely on:
        </p>
        <ul>
          <li>
            <strong>Tables</strong> — pipe-delimited rows with a dash separator line. Notoriously
            fiddly to get right without a live preview.
          </li>
          <li>
            <strong>Task lists</strong> — <code>- [ ]</code> and <code>- [x]</code> render as
            checkboxes, perfect for tracking work in issues and READMEs.
          </li>
          <li>
            <strong>Strikethrough</strong> — <code>~~like this~~</code>.
          </li>
          <li>
            <strong>Autolinks</strong> — bare URLs become clickable links.
          </li>
          <li>
            <strong>Fenced code blocks</strong> — triple-backtick blocks with an optional language
            tag, which most renderers use for syntax highlighting.
          </li>
        </ul>
        <p>
          This previewer also enables the <code>breaks</code> option, so a single newline becomes a
          visible line break — matching how GitHub renders comments (though not README files, where
          you need two spaces or a blank line).
        </p>

        <h3>Common markdown mistakes a live preview catches</h3>
        <ul>
          <li>
            <strong>Missing blank lines.</strong> A heading or list glued directly to the previous
            paragraph often refuses to render. The preview shows the problem instantly.
          </li>
          <li>
            <strong>Broken tables.</strong> One missing pipe or a separator row with the wrong
            column count and the whole table degrades to plain text.
          </li>
          <li>
            <strong>Unclosed emphasis.</strong> A stray asterisk can italicize half your document.
          </li>
          <li>
            <strong>Indented code by accident.</strong> Four leading spaces start a code block in
            markdown — a frequent surprise when pasting indented text.
          </li>
          <li>
            <strong>Numbered list renumbering.</strong> Markdown renumbers ordered lists for you;
            the preview shows the final numbering, not what you typed.
          </li>
        </ul>

        <h3>Using the Copy HTML button</h3>
        <p>
          The <strong>Copy HTML</strong> button puts the parser&apos;s raw HTML output on your
          clipboard — the exact markup driving the preview pane. That is useful for pasting into
          email templates, CMS rich-text fields that accept HTML, or static pages. Remember that
          the HTML carries no styling of its own: headings, tables, and code blocks will pick up
          whatever CSS the destination page applies, which is why the same markdown looks different
          on GitHub, GitLab, and your docs site.
        </p>

        <h3>Tips for better markdown documents</h3>
        <ul>
          <li>Keep one blank line between blocks — paragraphs, lists, headings, code fences.</li>
          <li>
            Use fenced code blocks with a language tag (<code>```js</code>) rather than indented
            code; it is clearer and enables highlighting.
          </li>
          <li>
            Prefer reference-style links in long documents to keep paragraphs readable in source
            form.
          </li>
          <li>
            Preview tables here before committing — aligning pipes in source is optional, but
            column counts must match.
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: Markdown Previewer</h3>
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
          Writing project docs? Try the <Link href="/readme-generator">README Generator</Link> or
          the <Link href="/api-docs-generator">API Docs Generator</Link>. To go deeper, read the{' '}
          <Link href="/blog/markdown-syntax-cheat-sheet">Markdown Syntax Cheat Sheet</Link>, the{' '}
          <Link href="/blog/github-flavored-markdown-guide">
            GitHub Flavored Markdown Guide
          </Link>
          , and <Link href="/blog/how-to-write-a-great-readme">How to Write a Great README</Link>.
        </p>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: Markdown</h3>
        <ul className="small">
          <li><Link href="/blog/markdown-syntax-cheat-sheet">Markdown Syntax Cheat Sheet — Every Element with Examples</Link></li>
          <li><Link href="/blog/github-flavored-markdown-guide">GitHub Flavored Markdown (GFM) — The Complete Guide</Link></li>
          <li><Link href="/blog/markdown-for-technical-documentation-tips">Markdown for Technical Documentation — 7 Tips That Keep Docs Readable</Link></li>
          <li><Link href="/blog/markdown-vs-html-when-to-use-which">Markdown vs HTML — When to Use Which</Link></li>
          <li><Link href="/blog/writing-github-issues-and-prs-with-markdown">Writing GitHub Issues and PRs with Markdown</Link></li>
        </ul>
      </div>

    </div>
  );
}
