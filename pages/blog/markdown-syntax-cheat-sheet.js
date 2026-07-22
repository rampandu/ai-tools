// pages/blog/markdown-syntax-cheat-sheet.js
import Head from 'next/head';
import Link from 'next/link';

export default function MarkdownSyntaxCheatSheet() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Markdown Syntax Cheat Sheet — Every Element with Examples',
        item: 'https://dev-brains-ai.com/blog/markdown-syntax-cheat-sheet',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Markdown Syntax Cheat Sheet — Every Element with Examples',
    description:
      'A complete markdown syntax reference: headings, emphasis, lists, links, images, inline and fenced code, blockquotes, horizontal rules, and escaping — each with copy-paste examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/markdown-syntax-cheat-sheet',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is markdown used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Markdown is a lightweight markup language used to format plain text. Developers use it for README files, documentation, GitHub issues and pull requests, blog posts, wikis, and chat messages. It converts to HTML for display.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I write a code block in markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wrap inline code in single backticks. For multi-line code blocks, use three backticks (a fenced code block) on the lines before and after the code, optionally followed by a language name like js or python for syntax highlighting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to preview markdown online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free markdown previewer at dev-brains-ai.com/markdown-preview. You type markdown on one side and see the rendered output live on the other — no signup required.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Markdown Syntax Cheat Sheet — Every Element with Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="Complete markdown cheat sheet: headings, bold, italic, lists, links, images, inline and fenced code, blockquotes, horizontal rules, and escaping — with examples."
        />
        <meta
          name="keywords"
          content="markdown cheat sheet, markdown syntax, markdown guide, markdown examples, markdown headings, markdown code block, markdown lists, markdown links"
        />
        <meta property="og:title" content="Markdown Syntax Cheat Sheet — Every Element with Examples" />
        <meta property="og:description" content="Complete markdown cheat sheet: headings, bold, italic, lists, links, images, inline and fenced code, blockquotes, horizontal rules, and escaping — with examples." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/markdown-syntax-cheat-sheet" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/markdown-syntax-cheat-sheet" />
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
              <li aria-current="page">Markdown Syntax Cheat Sheet</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Markdown Syntax Cheat Sheet — Every Element with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Markdown is the formatting language behind almost everything a developer writes: README
            files, GitHub issues, documentation sites, wikis, and chat messages. It is designed to be
            readable as plain text and to convert cleanly to HTML. This cheat sheet covers every core
            markdown element — headings, emphasis, lists, links, images, code, blockquotes,
            horizontal rules, and escaping — with the exact syntax you can copy and paste. Keep it
            bookmarked, or open our free <Link href="/markdown-preview">markdown previewer</Link> in
            another tab and try each example live.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Headings
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Headings start with hash characters. One hash is an H1, two hashes an H2, and so on down
            to six hashes for an H6. Always put a space between the hashes and the heading text —
            some renderers refuse to parse the heading without it.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Heading 1 (alternate style)
===========================

Heading 2 (alternate style)
---------------------------`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The alternate "setext" style with equals signs and dashes only supports two levels, so
            most teams standardise on the hash style. Use exactly one H1 per document and do not skip
            levels — an H2 should not jump straight to an H4.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Emphasis: Bold, Italic, and Combinations
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Wrap text in one asterisk or underscore for italic, and two for bold. Three gives you
            bold italic. Asterisks are the safer choice because underscores can misbehave inside
            words like snake_case identifiers.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`*italic*        or  _italic_
**bold**        or  __bold__
***bold italic***
**bold with *nested italic* inside**`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Lists: Unordered, Ordered, and Nested
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Unordered lists use a dash, plus, or asterisk followed by a space. Ordered lists use a
            number and a period — the actual numbers do not matter, because the renderer renumbers
            them automatically. Nest items by indenting two to four spaces.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`- First item
- Second item
  - Nested item
  - Another nested item
- Third item

1. Step one
2. Step two
   1. Sub-step
3. Step three

1. You can also write every line as "1."
1. The renderer numbers them 1, 2, 3 anyway
1. Handy when you reorder steps often`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The "all ones" trick in the last example is popular in documentation teams: inserting a
            new step in the middle never forces you to renumber the rest of the list.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Links and Images
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A link is text in square brackets followed by a URL in parentheses. An image is the same
            thing with an exclamation mark in front — the bracket text becomes the alt text. You can
            also define reference-style links, which keep long URLs out of your paragraphs.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`[Link text](https://example.com)
[Link with title](https://example.com "Shown on hover")

![Alt text for the image](https://example.com/diagram.png)

Reference style:
Read the [official docs][docs] and the [API guide][api].

[docs]: https://example.com/docs
[api]: https://example.com/api`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Always write meaningful alt text for images — it is what screen readers announce and what
            appears if the image fails to load.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Code: Inline and Fenced Blocks
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Wrap inline code in single backticks so commands and identifiers stand out from prose.
            For multi-line code, use a fenced block: three backticks on their own line before and
            after the code. Add a language name right after the opening fence to get syntax
            highlighting on GitHub and most documentation sites.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Run \`npm install\` before starting the dev server.

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

To show a backtick inside inline code, use double backticks:
\`\` code with a \` backtick \`\``}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Blockquotes, Horizontal Rules, and Escaping
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A blockquote line starts with a greater-than sign followed by a space. Quotes can be
            nested and can contain other markdown such as lists and bold text. A horizontal rule is
            three or more dashes, asterisks, or underscores on a line by themselves.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`> This is a blockquote.
> It can span multiple lines.
>
> > And blockquotes can be nested.

---

Escaping special characters with a backslash:
\\*not italic\\*
\\# not a heading
\\[not a link\\]
1\\. not a list item`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Escaping matters whenever your text happens to start with a markdown trigger character.
            A line that begins with an asterisk, hash, or a number and period will otherwise be
            interpreted as formatting. The backslash tells the renderer to treat the character as
            plain text.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Characters worth escaping:</strong> asterisk, underscore, hash, backtick, square brackets, and the pipe character inside tables</li>
            <li><strong>Line breaks:</strong> end a line with two spaces (or a backslash) to force a break without starting a new paragraph</li>
            <li><strong>Paragraphs:</strong> separate them with one blank line — a single newline is usually collapsed into the same paragraph</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is markdown used for?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Markdown is a lightweight markup language used to format plain text. Developers use it
              for README files, documentation, GitHub issues and pull requests, blog posts, wikis,
              and chat messages. It converts to HTML for display.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I write a code block in markdown?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Wrap inline code in single backticks. For multi-line code blocks, use three backticks
              (a fenced code block) on the lines before and after the code, optionally followed by a
              language name like js or python for syntax highlighting.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to preview markdown online?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI offers a free <Link href="/markdown-preview">markdown previewer</Link>.
              You type markdown on one side and see the rendered output live on the other — no signup
              required.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Markdown Previewer</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any example from this cheat sheet and watch it render instantly with live
              side-by-side markdown editing in your browser. No signup, no cost.
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
              <li><Link href="/blog/github-flavored-markdown-guide">GitHub Flavored Markdown — Tables, Task Lists, and More</Link></li>
              <li><Link href="/blog/markdown-for-technical-documentation-tips">Markdown for Technical Documentation — Practical Tips</Link></li>
              <li><Link href="/blog/markdown-vs-html-when-to-use-which">Markdown vs HTML — When to Use Which</Link></li>
              <li><Link href="/blog/how-to-write-a-great-readme">How to Write a Great README</Link></li>
              <li><Link href="/blog/writing-github-issues-and-prs-with-markdown">Writing Great GitHub Issues and PRs with Markdown</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
