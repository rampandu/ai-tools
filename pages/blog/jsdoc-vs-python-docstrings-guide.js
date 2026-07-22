// pages/blog/jsdoc-vs-python-docstrings-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function JsDocVsPythonDocstringsGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSDoc vs Python Docstrings — How to Document Functions Properly',
        item: 'https://dev-brains-ai.com/blog/jsdoc-vs-python-docstrings-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JSDoc vs Python Docstrings: 3 Styles Compared',
    description:
      "JSDoc's @param/@returns tags vs Python's Google, NumPy, and reST docstring styles — worked examples for both plus rules for when detail is worth adding.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/jsdoc-vs-python-docstrings-guide',
    datePublished: '2026-07-12',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between JSDoc and Python docstrings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JSDoc is a comment-based annotation format for JavaScript that uses /** ... */ blocks with tags like @param and @returns, placed directly above a function. Python docstrings are string literals placed as the first statement inside a function body, commonly written in Google, NumPy, or reST style.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to generate JSDoc or Python docstrings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free Docstring Generator at dev-brains-ai.com/docstring-generator. Paste a function signature and it generates a JSDoc or Python docstring scaffold instantly, no signup required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Python docstring style should I use, Google or NumPy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Google style is generally recommended for most projects because it is compact and readable in plain text. NumPy style is more common in scientific and data-heavy codebases with many parameters, since its column layout handles long parameter lists more clearly.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JSDoc vs Python Docstrings: 3 Styles Compared | Dev Brains AI</title>
        <meta
          name="description"
          content="JSDoc's @param/@returns tags vs Python's Google, NumPy, and reST docstring styles — worked examples for both plus rules for when detail is worth adding."
        />
        <meta
          name="keywords"
          content="jsdoc vs docstring, python docstring guide, jsdoc tutorial, google style docstring, how to document functions, jsdoc @param @returns, python docstring examples"
        />
        <meta property="og:title" content="JSDoc vs Python Docstrings: 3 Styles Compared" />
        <meta property="og:description" content="JSDoc's @param/@returns tags vs Python's Google, NumPy, and reST docstring styles — worked examples for both plus rules for when detail is worth adding." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/jsdoc-vs-python-docstrings-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/jsdoc-vs-python-docstrings-guide" />
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
              <li aria-current="page">JSDoc vs Python Docstrings Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSDoc vs Python Docstrings — How to Document Functions Properly
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Six months from now, someone is going to open a function you wrote and ask "what does
            this even do, and what am I supposed to pass into it?" That someone is often you. Good
            inline documentation — JSDoc in JavaScript, docstrings in Python — answers that question
            before it gets asked, and it powers IDE autocomplete along the way. This guide compares
            JSDoc and Python docstring conventions side by side, with worked examples for each, and
            gives you practical rules for writing documentation that people actually read.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Documenting Functions Matters
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            It is tempting to think of docstrings and JSDoc comments as busywork, but they do three
            concrete things that plain code alone does not:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>IDE autocomplete and IntelliSense</strong> — editors like VS Code and PyCharm read JSDoc and docstrings to show parameter hints, types, and return values as you type, even without a full type-checking setup</li>
            <li><strong>Faster onboarding</strong> — a new teammate (or your future self) can understand what a function expects and returns without reading the entire implementation</li>
            <li><strong>Avoiding the "what does this even do" moment</strong> — a one-line summary answers the question immediately instead of forcing someone to trace through logic to reverse-engineer intent</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Both JSDoc and Python docstrings solve the same underlying problem — describing a
            function&apos;s contract in a structured, tool-readable way — but the syntax and
            placement differ between the two languages.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            JSDoc Syntax: /** ... */, @param, @returns, @throws
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JSDoc comments are written as a block comment starting with <code>/**</code> (two
            asterisks), placed directly above the function they describe. Editors and documentation
            generators parse the tags inside.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`/**
 * Calculates the total price of an order after tax and discount.
 *
 * @param {number} subtotal - The order subtotal before tax or discount.
 * @param {number} taxRate - Tax rate as a decimal, e.g. 0.18 for 18%.
 * @param {number} [discount=0] - Optional flat discount to subtract first.
 * @returns {number} The final total, rounded to 2 decimal places.
 * @throws {Error} If subtotal or taxRate is negative.
 */
function calculateTotal(subtotal, taxRate, discount = 0) {
  if (subtotal < 0 || taxRate < 0) {
    throw new Error('subtotal and taxRate must be non-negative');
  }
  const discounted = subtotal - discount;
  const total = discounted + discounted * taxRate;
  return Math.round(total * 100) / 100;
}`}
          </pre>
          <p className="small" style={{ marginBottom: 8 }}>
            The core tags you will use in almost every JSDoc block:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><code>@param {'{'}type{'}'} name - description</code> — one per parameter; square brackets around the name mark it optional, e.g. <code>[discount=0]</code></li>
            <li><code>@returns {'{'}type{'}'} description</code> — what the function sends back</li>
            <li><code>@throws {'{'}type{'}'} description</code> — what errors the function can raise and under what condition</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Because the type is written in curly braces before the name, editors can validate calls
            against the documented types even in plain JavaScript files, without needing TypeScript.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Python Docstring Conventions: Google, NumPy, and reST
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A Python docstring is a string literal — usually triple-quoted — placed as the very first
            statement inside a function, class, or module. Unlike JSDoc, it lives inside the function
            body and is accessible at runtime through <code>function.__doc__</code>. There are three
            common styles:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Google style</strong> — uses labeled sections like <code>Args:</code> and <code>Returns:</code>, indented under the label. Compact and easy to read as plain text.</li>
            <li><strong>NumPy style</strong> — uses underlined section headers and a column layout for parameters. More verbose, but handles long parameter lists clearly — common in scientific/data libraries.</li>
            <li><strong>reST (reStructuredText) style</strong> — uses <code>:param name:</code> and <code>:returns:</code> field syntax. Native to Sphinx, the documentation tool used for the official Python docs.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Google style is the most widely recommended default for general application code, so
            here it is as the primary worked example:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`def calculate_total(subtotal, tax_rate, discount=0):
    """Calculate the total price of an order after tax and discount.

    Args:
        subtotal (float): The order subtotal before tax or discount.
        tax_rate (float): Tax rate as a decimal, e.g. 0.18 for 18%.
        discount (float, optional): Flat discount to subtract first.
            Defaults to 0.

    Returns:
        float: The final total, rounded to 2 decimal places.

    Raises:
        ValueError: If subtotal or tax_rate is negative.
    """
    if subtotal < 0 or tax_rate < 0:
        raise ValueError("subtotal and tax_rate must be non-negative")
    discounted = subtotal - discount
    total = discounted + discounted * tax_rate
    return round(total, 2)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice the structural parallel to the JSDoc example: a one-line summary, then a blank
            line, then labeled sections for arguments, return value, and exceptions. The same
            information, just placed inside the function body as a string instead of above it as a
            comment.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            JSDoc vs Docstrings: Key Differences at a Glance
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`                JSDoc                       Python Docstring
--------------  --------------------------  ---------------------------
Placement       Comment block above the     String literal as first
                function                    statement inside function
Syntax          /** @tag {type} name */     Triple-quoted string with
                                             labeled sections
Runtime access  Not accessible at runtime   Accessible via __doc__
Type info       In curly braces per tag     In parentheses per arg
                                             (or via type hints instead)
Common styles   One dominant convention     Google, NumPy, or reST`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Writing a Good One-Line Summary vs When to Add More Detail
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every function deserves a one-line summary. Not every function needs a full Args/Returns
            breakdown. Use this rule of thumb:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Always write one line</strong> that states what the function does in plain language, starting with a verb: "Calculates...", "Fetches...", "Validates..."</li>
            <li><strong>Add parameter and return docs</strong> when the function takes more than one argument, when a parameter&apos;s meaning is not obvious from its name, or when the return value has a shape someone would need to look up otherwise</li>
            <li><strong>Skip the full breakdown</strong> for small, self-explanatory helpers where the signature already tells the whole story — <code>def is_even(n): """Return True if n is even."""</code> does not need an Args/Returns section</li>
            <li><strong>Document exceptions</strong> whenever a function can raise something a caller would reasonably need to catch, not just any internal assertion</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            The goal is a summary that lets a reader decide whether they need to keep reading. If the
            one-liner alone answers "what does this do and what do I pass in," you are done —
            padding it out with sections that repeat the function signature just adds noise.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between JSDoc and Python docstrings?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              JSDoc is a comment block above a JavaScript function using tags like @param and
              @returns. Python docstrings are string literals inside the function body, commonly
              written in Google, NumPy, or reST style.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to generate JSDoc or Python docstrings?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. The <Link href="/docstring-generator">Dev Brains AI Docstring Generator</Link>{' '}
              turns a pasted function signature into a JSDoc or Python docstring scaffold instantly,
              for free.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Which Python docstring style should I use, Google or NumPy?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Google style is recommended for most general-purpose code because it is compact and
              readable. NumPy style suits scientific or data-heavy codebases with long parameter
              lists.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Docstring Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste a function signature and get a JSDoc or Python docstring scaffold instantly.
              No signup, no cost.
            </p>
            <Link href="/docstring-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Docstring Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/how-ai-code-generators-work-explained">How AI Code Generators Work, Explained</Link></li>
              <li><Link href="/code-explainer">Free AI Code Explainer</Link></li>
              <li><Link href="/unit-test-generator">Free Unit Test Generator</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
