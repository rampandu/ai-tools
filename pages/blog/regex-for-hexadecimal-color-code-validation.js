// pages/blog/regex-for-hexadecimal-color-code-validation.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForHexadecimalColorCodeValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Hexadecimal Color Code Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-hexadecimal-color-code-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Hexadecimal Color Code Validation — 3, 6, and 8-Digit Hex',
    description:
      'Regex patterns to validate 3-digit and 6-digit hex color codes, with and without #, plus the 8-digit alpha-channel format, with practical CSS and JavaScript examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-hexadecimal-color-code-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex for validating a hex color code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The pattern ^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$ matches both 3-digit and 6-digit hex color codes with an optional leading #.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I validate hex colors with an alpha channel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use ^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$ to match 8-digit (RRGGBBAA) and 4-digit (RGBA shorthand) hex codes that include an alpha/transparency channel.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert a 3-digit hex shorthand to 6-digit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each character in the 3-digit shorthand is duplicated: #abc becomes #aabbcc. In JavaScript this can be done by matching each character and repeating it twice before joining the string back together.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Hexadecimal Color Code Validation (3, 6, 8-Digit) | Dev Brains AI</title>
        <meta
          name="description"
          content="Regex patterns to validate 3-digit and 6-digit hex color codes, with and without #, plus the 8-digit alpha-channel format, with CSS and JS examples."
        />
        <meta
          name="keywords"
          content="hex color regex, hex code validation regex, css hex color regex, rgba hex regex, validate hex color javascript"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-hexadecimal-color-code-validation" />
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
              <li aria-current="page">Regex for Hex Color Code Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Hexadecimal Color Code Validation — 3, 6, and 8-Digit Hex
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Hex color inputs show up in theme builders, design tools, and CSS-in-JS configuration —
            and users paste them in every possible shape: with or without the leading{' '}
            <code>#</code>, shorthand or full length, sometimes uppercase. This guide covers the
            regex patterns for all common hex color formats, including the alpha-channel variants.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Hex Color Formats
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>3-digit shorthand</strong> — <code>#abc</code> — each digit represents a doubled hex pair (R, G, B)</li>
            <li><strong>6-digit standard</strong> — <code>#aabbcc</code> — two hex digits each for red, green, blue</li>
            <li><strong>4-digit shorthand with alpha</strong> — <code>#abcd</code> — RGB shorthand plus one alpha digit</li>
            <li><strong>8-digit with alpha</strong> — <code>#aabbccdd</code> — full RGB plus a two-digit alpha channel</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Basic Regex (3 or 6 Digits)
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const hexColor = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

hexColor.test('#1a2b3c');  // true
hexColor.test('1a2b3c');   // true — # is optional
hexColor.test('#abc');     // true — 3-digit shorthand
hexColor.test('#1a2b3');   // false — 5 digits is not a valid length
hexColor.test('#gghhii');  // false — g, h, i are not valid hex characters`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extended Regex with Alpha Channel (4 or 8 Digits)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            CSS Color Module Level 4 supports an alpha channel appended directly to the hex string.
            This pattern covers all four valid lengths — 3, 4, 6, and 8 digits:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const hexColorWithAlpha = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$/;

hexColorWithAlpha.test('#1a2b3c80');  // true — 6-digit color + 2-digit alpha
hexColorWithAlpha.test('#abcd');      // true — 3-digit color + 1-digit alpha
hexColorWithAlpha.test('#1a2b3c8');   // false — 7 digits is not valid`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Normalizing and Expanding Shorthand Hex
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Once validated, it is often useful to normalize every hex value to the full 6-digit form
            before storing it, so comparisons and downstream tooling stay consistent:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function normalizeHex(input) {
  const value = input.replace('#', '');

  if (!/^[A-Fa-f0-9]{3}$|^[A-Fa-f0-9]{6}$/.test(value)) {
    throw new Error('Invalid hex color');
  }

  if (value.length === 3) {
    return '#' + value.split('').map((c) => c + c).join('').toLowerCase();
  }

  return '#' + value.toLowerCase();
}

normalizeHex('#abc');     // '#aabbcc'
normalizeHex('1A2B3C');   // '#1a2b3c'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using the Pattern in a Form Field (React Example)
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function ColorInput({ value, onChange }) {
  const isValid = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#1a2b3c"
        style={{ borderColor: isValid ? '#16a34a' : '#dc2626' }}
      />
      {!isValid && <span>Enter a valid hex color, e.g. #1a2b3c</span>}
    </div>
  );
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Mistakes
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Forgetting the shorthand 3-digit and 4-digit forms are valid — many patterns online only check for 6 digits</li>
            <li>Not making the <code>#</code> optional, which rejects valid values pasted without it</li>
            <li>Using <code>[0-9a-fA-F]</code> without anchors (<code>^</code>/<code>$</code>), which lets partial matches inside longer strings pass validation</li>
            <li>Confusing CSS named colors ("red", "tomato") with hex codes — validate those separately against a known color-name list if you need to support them</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for validating a hex color code?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The pattern <code>{'^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'}</code> matches both 3-digit and
              6-digit hex color codes with an optional leading #.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I validate hex colors with an alpha channel?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use <code>{'^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$'}</code> to match 8-digit (RRGGBBAA) and
              4-digit (RGBA shorthand) hex codes that include an alpha/transparency channel.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert a 3-digit hex shorthand to 6-digit?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Each character in the 3-digit shorthand is duplicated: #abc becomes #aabbcc. In
              JavaScript this can be done by matching each character and repeating it twice before
              joining the string back together.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe any validation rule in plain English and get a working regex instantly —
              no signup required.
            </p>
            <Link href="/regex-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open AI Regex Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-non-greedy-vs-greedy-matching">Regex Non-Greedy vs Greedy Matching</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">AI Regex Generator Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
