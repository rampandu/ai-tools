// pages/blog/how-to-write-conventional-commit-messages.js
import Head from 'next/head';
import Link from 'next/link';

export default function ConventionalCommitMessagesGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Write Conventional Commit Messages — A Practical Guide',
        item: 'https://dev-brains-ai.com/blog/how-to-write-conventional-commit-messages',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Conventional Commits: The 8 Types + Breaking Changes',
    description:
      'The Conventional Commits spec explained: all 8 commit types, imperative mood rules, breaking change syntax, and how semantic-release picks your next version.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-to-write-conventional-commit-messages',
    datePublished: '2026-07-12',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Conventional Commits format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conventional Commits is a specification for writing commit messages in the format type(scope): description, using a standard set of types like feat, fix, docs, and chore. It makes commit history readable and machine-parseable for tools like changelog generators and semantic-release.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to generate Conventional Commit messages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free Commit Message Generator at dev-brains-ai.com/commit-message-generator. Describe your change in plain English and it returns a properly formatted Conventional Commit message, no signup required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I indicate a breaking change in a Conventional Commit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Add an exclamation mark after the type or scope, like feat!: or feat(api)!:, and/or add a BREAKING CHANGE: footer to the commit body describing the change. Tools like semantic-release read this to trigger a major version bump.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Conventional Commits: The 8 Types + Breaking Changes | Dev Brains AI</title>
        <meta
          name="description"
          content="The Conventional Commits spec explained: all 8 commit types, imperative mood rules, breaking change syntax, and how semantic-release picks your next version."
        />
        <meta
          name="keywords"
          content="conventional commits, git commit message format, commit message convention, semantic-release, feat fix chore, breaking change commit, git commit best practices"
        />
        <meta property="og:title" content="Conventional Commits: The 8 Types + Breaking Changes" />
        <meta property="og:description" content="The Conventional Commits spec explained: all 8 commit types, imperative mood rules, breaking change syntax, and how semantic-release picks your next version." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/how-to-write-conventional-commit-messages" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-to-write-conventional-commit-messages" />
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
              <li aria-current="page">Conventional Commit Messages Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Write Conventional Commit Messages — A Practical Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            "fixed stuff", "updates", "wip" — if your git log looks like this, you are not alone.
            Most developers write commit messages as an afterthought, until the day they need to
            find when a bug was introduced, generate a changelog, or figure out what actually
            shipped in the last release. Conventional Commits is a lightweight specification that
            fixes this by giving every commit message a predictable structure. This guide covers the
            exact spec, the standard commit types, how to write in imperative mood, and how tools
            like semantic-release use this format to automatically version your releases.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Commit Message Format Matters
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A commit message is not just a note to yourself — it is a permanent, searchable record of
            why the codebase changed, and it has three real audiences beyond the person writing it:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Your teammates</strong> — reading <code>git log</code> or a pull request diff should tell them what changed and why, without opening every file</li>
            <li><strong>Future you</strong> — six months from now, <code>git blame</code> on a confusing line should lead to a message that explains the reasoning, not just "fix"</li>
            <li><strong>Automated tooling</strong> — changelog generators and release automation tools like semantic-release parse your commit messages to decide what goes in the changelog and what version number to publish next</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            A consistent format turns your commit history from a diary into structured data that
            both humans and tools can rely on.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Conventional Commits Spec
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The format is simple: a type, an optional scope in parentheses, a colon, and a short
            description.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`type(scope): short description

[optional longer body]

[optional footer(s)]`}
          </pre>
          <p className="small" style={{ marginBottom: 8 }}>
            Real examples:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`feat(auth): add password reset via email
fix(api): handle null response from payment gateway
docs(readme): add local setup instructions
chore(deps): bump next from 14.1 to 14.2`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The scope is optional and describes what part of the codebase the change touches — a
            module name, a folder, a feature area. Skip it if the change is broad or the project is
            small.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The 8 Standard Commit Types
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Type       Use for
---------  ------------------------------------------------
feat       A new feature for the user
fix        A bug fix for the user
docs       Documentation changes only
style      Formatting, whitespace, semicolons — no logic change
refactor   Code change that neither fixes a bug nor adds a feature
perf       A change that improves performance
test       Adding or correcting tests
chore      Build process, tooling, dependency updates, config`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <code>feat</code> and <code>fix</code> are the two types that directly drive semantic
            versioning — the other six matter for changelog organization and searchability but do
            not trigger a version bump on their own.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Write in Imperative Mood
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The description should complete the sentence "If applied, this commit will
            ___________." That means imperative present tense — "add", "fix", "remove" — not past
            tense or a description of what you did.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Wrong:  fix(api): fixed the bug where users couldn't log in
Wrong:  fix(api): fixes login bug
Right:  fix(api): resolve login failure for OAuth users

Wrong:  feat(cart): added a discount code field
Right:  feat(cart): add discount code field to checkout`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This matches the convention git itself uses for auto-generated messages (like "Merge
            branch..."), and it reads naturally in a changelog: "This release will add discount code
            field to checkout" flows better than "This release will added a discount code field."
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Good vs Bad Commit Messages
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Bad:   "stuff"
Bad:   "fix bug"
Bad:   "update code"
Bad:   "asdasd wip"

Good:  fix(cart): prevent negative quantity in cart update
Good:  feat(export): add CSV export for order history
Good:  perf(search): cache tag lookup to cut query time by 60%
Good:  refactor(auth): extract token validation into helper`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The difference is specificity. A good message tells you the type of change, the area it
            touches, and the effect — you should rarely need to open the diff just to understand what
            a commit did.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How semantic-release Uses This Format
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Tools like <code>semantic-release</code> read your commit history since the last release
            and decide the next version number automatically, based entirely on the commit types
            used:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><code>fix:</code> commits trigger a <strong>patch</strong> release (1.0.0 → 1.0.1)</li>
            <li><code>feat:</code> commits trigger a <strong>minor</strong> release (1.0.0 → 1.1.0)</li>
            <li>A <code>BREAKING CHANGE</code> footer (or <code>!</code> after the type) triggers a <strong>major</strong> release (1.0.0 → 2.0.0)</li>
            <li><code>docs</code>, <code>style</code>, <code>chore</code>, and <code>test</code> commits do not trigger a release on their own</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            This means once your team commits to the format, you never have to manually decide "is
            this a minor or a patch release" again — the answer is derived directly from your commit
            log, and the changelog is generated from the same messages.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Breaking Change Footer Syntax
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            There are two ways to mark a breaking change, and you can use either or both:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`feat(api)!: remove support for API key auth

BREAKING CHANGE: API key authentication has been removed.
Use OAuth 2.0 tokens instead. Existing API keys will stop
working after this release.`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The <code>!</code> right after the scope (or type, if there is no scope) is a quick
            visual flag in the git log. The <code>BREAKING CHANGE:</code> footer in the commit body
            is what tooling actually parses to write the "Breaking Changes" section of your
            changelog and to force a major version bump — always include both for anything that
            genuinely breaks a public API or contract.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the Conventional Commits format?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              It is a specification for commit messages in the form <code>type(scope):
              description</code>, using standard types like feat, fix, docs, and chore, so history is
              readable by humans and parseable by tools.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to generate Conventional Commit messages?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. The <Link href="/commit-message-generator">Dev Brains AI Commit Message
              Generator</Link> turns a plain English description of your change into a properly
              formatted commit message, for free.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I indicate a breaking change in a Conventional Commit?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Add <code>!</code> after the type or scope (e.g. <code>feat!:</code>) and include a{' '}
              <code>BREAKING CHANGE:</code> footer describing the change. Tools like semantic-release
              use this to trigger a major version bump.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Commit Message Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe your change in plain English and get a properly formatted Conventional Commit
              message instantly. No signup, no cost.
            </p>
            <Link href="/commit-message-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Commit Message Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/common-git-errors-and-how-to-fix-them">Common Git Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/how-to-crack-technical-interviews-at-product-companies">How to Crack Technical Interviews at Product Companies</Link></li>
              <li><Link href="/docstring-generator">Free Docstring Generator</Link></li>
              <li><Link href="/readme-generator">Free README Generator</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
