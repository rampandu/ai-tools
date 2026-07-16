// pages/blog/markdown-for-technical-documentation-tips.js
import Head from 'next/head';
import Link from 'next/link';

export default function MarkdownForTechnicalDocumentationTips() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Markdown for Technical Documentation — 7 Tips That Keep Docs Readable',
        item: 'https://dev-brains-ai.com/blog/markdown-for-technical-documentation-tips',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Markdown for Technical Documentation — 7 Tips That Keep Docs Readable',
    description:
      'Practical Markdown tips for technical documentation: heading hierarchy, code block language tags, relative links, alt text, tables vs lists, diff-friendly lines, and a docs-as-code workflow.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/markdown-for-technical-documentation-tips',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is Markdown good for technical documentation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Markdown is plain text, so it works with git: docs can be versioned, diffed, reviewed in pull requests, and validated in CI alongside the code they describe. It is also readable in its raw form, unlike HTML or XML-based formats.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should docs use relative or absolute links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use relative links between documents in the same repository, such as ../guides/setup.md. They keep working across branches, forks, and clones, and most static site generators resolve them correctly. Reserve absolute URLs for external resources.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a docs-as-code workflow?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Docs-as-code means treating documentation like source code: stored in git, edited in Markdown, reviewed through pull requests, and checked by CI jobs that catch broken links, invalid syntax, and stale references before they reach readers.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Markdown for Technical Documentation — 7 Tips That Keep Docs Readable | Dev Brains AI</title>
        <meta
          name="description"
          content="Practical Markdown tips for technical docs: heading hierarchy discipline, code block language tags, relative links, alt text, tables vs lists, and a docs-as-code CI workflow."
        />
        <meta
          name="keywords"
          content="markdown technical documentation, docs as code, markdown best practices, markdown heading hierarchy, markdown relative links, documentation workflow, markdown docs tips"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/markdown-for-technical-documentation-tips" />
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
              <li aria-current="page">Markdown for Technical Documentation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Markdown for Technical Documentation — 7 Tips That Keep Docs Readable
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Markdown won the documentation format war because it is plain text: easy to write, easy
            to diff, and readable even without rendering. But a docs folder can still rot into an
            unnavigable mess if every author formats things differently. These seven habits —
            drawn from maintaining real docs-as-code repositories — keep Markdown documentation
            consistent, reviewable, and pleasant to read for years, not weeks.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            1. Keep Heading Hierarchy Disciplined
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every document gets exactly one H1 — the title. Sections are H2, subsections H3, and
            you never skip a level (an H4 directly under an H2 breaks screen readers and
            auto-generated tables of contents). Headings should be scannable answers, not clever
            phrases: "Configure the database connection" beats "Getting hooked up".
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Payment Service           <- one H1: the doc title
## Configuration            <- major section
### Environment variables   <- subsection
### Secrets management
## Running locally           <- back to H2 for the next section`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Many static site generators build sidebars and anchors straight from this hierarchy, so
            discipline here pays off twice: in the raw file and in the rendered site.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            2. Always Tag Code Blocks with a Language
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A bare fence renders as flat gray text. Adding the language identifier gives readers
            syntax highlighting and tells tools (linters, snippet extractors, copy buttons) what
            they are looking at:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`\`\`\`bash
npm run migrate -- --env=staging
\`\`\`

\`\`\`json
{ "retries": 3, "timeoutMs": 5000 }
\`\`\``}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Use <code>text</code> or <code>console</code> for output that is not code — an untagged
            block is ambiguous, but a wrongly tagged one is misleading.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            3. Link Between Docs with Relative Paths
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Absolute URLs to your own docs break the moment someone reads them on a branch, a fork,
            or a self-hosted mirror. Relative links survive all of that:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Good:  See the [setup guide](../guides/setup.md) first.
Good:  Details in [API reference](./api-reference.md#authentication).
Avoid: See https://github.com/acme/repo/blob/main/docs/guides/setup.md`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            GitHub, GitLab, and most doc generators resolve relative <code>.md</code> links
            correctly, including heading anchors. Keep file names lowercase-with-hyphens so links
            never break on case-sensitive filesystems.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            4. Give Every Image Meaningful Alt Text
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Alt text is not optional metadata — it is what screen-reader users hear, what renders
            when the image fails to load, and what search engines index. Describe what the image
            shows, not that it is an image:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Good:  ![Deploy pipeline: build, test, staging, production](./img/pipeline.png)
Avoid: ![screenshot](./img/pipeline.png)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Prefer diagrams that can live as text (Mermaid, ASCII) over screenshots — text diagrams
            diff cleanly and never go stale in a way reviewers cannot see.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            5. Choose Tables and Lists Deliberately
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Tables are for data that readers compare across two dimensions — parameters with types
            and defaults, feature matrices, environment differences. Lists are for everything else.
            A common mistake is forcing prose into a table because it "looks organised":
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Use a table</strong> when every row has the same 2-4 short attributes (name, type, default, description)</li>
            <li><strong>Use a list</strong> for steps, options with long explanations, or anything with nested detail</li>
            <li><strong>Never</strong> put multi-sentence paragraphs or code blocks inside table cells — the source becomes unreadable and the diff unreviewable</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            6. Write Diff-Friendly Lines
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Documentation lives in pull requests, and a 400-character line makes a one-word change
            look like a total rewrite. Two popular conventions fix this:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Hard wrap</strong> at around 80-100 characters, so diffs highlight only the changed line</li>
            <li><strong>One sentence per line</strong> (semantic line breaks) — Markdown joins consecutive lines into one paragraph, so rendering is unchanged, but each sentence diffs independently</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Either convention works; the important thing is that the team picks one and a formatter
            or lint rule enforces it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            7. Treat Docs as Code — Review and CI Checks
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The biggest quality lever is process, not syntax. In a docs-as-code workflow,
            documentation changes ship through the same pipeline as source code:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Pull request review</strong> — docs changes get a reviewer, ideally someone who did not write the feature</li>
            <li><strong>Link checking in CI</strong> — tools like lychee or markdown-link-check fail the build on broken internal and external links</li>
            <li><strong>Linting</strong> — markdownlint enforces heading hierarchy, consistent list markers, and fenced-block language tags automatically</li>
            <li><strong>Docs with the change</strong> — a PR that alters behaviour updates the relevant doc in the same PR, so docs never lag the code</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Before committing, preview your Markdown to catch rendering surprises — a free
            side-by-side tool like the <Link href="/markdown-preview">Dev Brains AI Markdown
            Previewer</Link> shows exactly what readers will see as you type.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why is Markdown good for technical documentation?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Markdown is plain text, so it works with git: docs can be versioned, diffed, reviewed in pull requests, and validated in CI alongside the code they describe. It is also readable in its raw form, unlike HTML or XML-based formats.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should docs use relative or absolute links?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use relative links between documents in the same repository, such as <code>../guides/setup.md</code>. They keep working across branches, forks, and clones, and most static site generators resolve them correctly. Reserve absolute URLs for external resources.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a docs-as-code workflow?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Docs-as-code means treating documentation like source code: stored in git, edited in Markdown, reviewed through pull requests, and checked by CI jobs that catch broken links, invalid syntax, and stale references before they reach readers.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Markdown Previewer</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Edit Markdown with a live side-by-side preview in your browser — perfect for checking
              docs before you commit. No signup, no cost.
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
              <li><Link href="/blog/github-flavored-markdown-guide">GitHub Flavored Markdown (GFM) Guide</Link></li>
              <li><Link href="/blog/how-to-write-a-great-readme">How to Write a Great README</Link></li>
              <li><Link href="/blog/how-to-document-a-rest-api-endpoint">How to Document a REST API Endpoint</Link></li>
              <li><Link href="/blog/markdown-vs-html-when-to-use-which">Markdown vs HTML — When to Use Which</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
