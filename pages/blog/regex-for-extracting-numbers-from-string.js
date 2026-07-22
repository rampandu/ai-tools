// pages/blog/regex-for-extracting-numbers-from-string.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForExtractingNumbersFromString() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Extracting Numbers from a String',
        item: 'https://dev-brains-ai.com/blog/regex-for-extracting-numbers-from-string',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Extracting Numbers from a String — Integers, Decimals, and Negatives',
    description:
      'How to extract integers, decimals, and negative numbers from mixed text using JavaScript regex, with working code for common real-world formats.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-extracting-numbers-from-string',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex to extract all numbers from a string?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The pattern /-?\\d+\\.?\\d*/g extracts integers, decimals, and negative numbers from mixed text in one pass using JavaScript\'s String.match method.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I extract only integers and ignore decimals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use /-?\\b\\d+\\b/g with word boundaries, or if you specifically need to avoid matching the integer part of a decimal number, use a negative lookahead: /-?\\d+(?!\\.\\d)/g.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does regex extract numbers with thousands separators like 1,234?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not by default — a comma breaks the digit sequence. Use a pattern like /-?\\d{1,3}(,\\d{3})*(\\.\\d+)?/g to match numbers with comma thousands separators, then strip the commas before converting to a numeric type.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Extracting Numbers from a String (JS Examples) | Dev Brains AI</title>
        <meta
          name="description"
          content="How to extract integers, decimals, and negative numbers from mixed text using JavaScript regex, with working code for common real-world formats."
        />
        <meta
          name="keywords"
          content="regex extract numbers, extract numbers from string javascript, regex match decimal numbers, regex negative numbers, extract digits regex"
        />
        <meta property="og:title" content="Regex for Extracting Numbers from a String (JS Examples)" />
        <meta property="og:description" content="How to extract integers, decimals, and negative numbers from mixed text using JavaScript regex, with working code for common real-world formats." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-extracting-numbers-from-string" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-extracting-numbers-from-string" />
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
              <li aria-current="page">Regex for Extracting Numbers from a String</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Extracting Numbers from a String — Integers, Decimals, and Negatives
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Pulling numeric values out of free text — prices from product descriptions, quantities
            from chat messages, measurements from log lines — is a task every backend and scraping
            project runs into. This guide covers the regex for each numeric format you'll encounter.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extracting Plain Integers
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'Order #4521 has 3 items totaling 12 kg';
const integers = text.match(/\\d+/g);
console.log(integers);
// ['4521', '3', '12']  — note these are strings, convert with Number() as needed`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extracting Decimals
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'Price: 499.99, discount: 10.5%, rating 4.8 out of 5';
const decimals = text.match(/\\d+\\.?\\d*/g);
console.log(decimals);
// ['499.99', '10.5', '4.8', '5']`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extracting Negative Numbers
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A plain digit pattern ignores a leading minus sign — you need to explicitly allow it:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'Temperature dropped to -5.2°C, from a high of 21°C, change: -26.2';
const numbers = text.match(/-?\\d+\\.?\\d*/g);
console.log(numbers);
// ['-5.2', '21', '-26.2']`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Be careful: this pattern treats any digit sequence preceded directly by a hyphen as
            negative — including hyphens used as separators, like in <code>order-42</code>, which
            would incorrectly extract <code>-42</code>. Add a lookbehind or boundary check if your
            text contains hyphenated IDs.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Safer: only treat '-' as a sign if preceded by whitespace, start of string, or another operator
const safeNegative = /(?<![a-zA-Z0-9])-?\\d+\\.?\\d*/g;

'order-42 costs -5.50'.match(safeNegative);
// ['42', '-5.50']  — '-' in 'order-42' is correctly ignored as a sign`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Extracting Numbers with Thousands Separators
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'Revenue was ₹1,25,000 last month, up from ₹98,500';

// Indian numbering system uses irregular comma grouping (lakh/crore),
// so match any digit-comma sequence and clean up afterward
const raw = text.match(/[\\d,]+/g);
console.log(raw);
// ['1,25,000', '98,500']

const asNumbers = raw.map((n) => Number(n.replace(/,/g, '')));
console.log(asNumbers);
// [125000, 98500]`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note the Indian numbering system groups digits as 2-2-3 (lakh/crore style) rather than
            the Western 3-3-3 pattern, so a fixed <code>{'\\d{1,3}(,\\d{3})*'}</code> pattern built
            for Western grouping will not match Indian-formatted numbers like <code>1,25,000</code>.
            Matching any digit-comma run and stripping commas afterward, as above, sidesteps that issue.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Converting Matches to Actual Numbers
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function extractNumbers(text) {
  const matches = text.match(/-?\\d+\\.?\\d*/g) || [];
  return matches.map(Number);
}

extractNumbers('3 apples cost 45.50, discount -5');
// [3, 45.5, -5]`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Pitfalls
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Forgetting matches are always strings — always wrap with <code>Number()</code> or <code>parseFloat()</code></li>
            <li>Not handling the case where <code>match()</code> returns <code>null</code> when there are zero matches — always default to an empty array</li>
            <li>Trailing dots — a plain <code>{'\\d+\\.?\\d*'}</code> can match a lone trailing period as part of a sentence (e.g. "the total is 5."); tighten to <code>{'\\d+(\\.\\d+)?'}</code> to require digits after the dot</li>
            <li>Locale differences — some locales use a comma as the decimal separator instead of a dot; know your data source before choosing a pattern</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex to extract all numbers from a string?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The pattern <code>{'/-?\\d+\\.?\\d*/g'}</code> extracts integers, decimals, and negative
              numbers from mixed text in one pass using JavaScript's String.match method.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I extract only integers and ignore decimals?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use <code>{'/-?\\b\\d+\\b/g'}</code> with word boundaries, or if you specifically need to
              avoid matching the integer part of a decimal number, use a negative lookahead:{' '}
              <code>{'/-?\\d+(?!\\.\\d)/g'}</code>.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does regex extract numbers with thousands separators like 1,234?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Not by default — a comma breaks the digit sequence. Use a pattern like{' '}
              <code>{'/-?\\d{1,3}(,\\d{3})*(\\.\\d+)?/g'}</code> to match numbers with comma thousands
              separators, then strip the commas before converting to a numeric type.
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
              <li><Link href="/blog/regex-for-extracting-hashtags-and-mentions">Regex for Extracting Hashtags and Mentions</Link></li>
              <li><Link href="/blog/regex-lookahead-and-lookbehind-explained">Regex Lookahead and Lookbehind Explained</Link></li>
              <li><Link href="/blog/regex-vs-string-methods-when-to-use-which">Regex vs String Methods — When to Use Which</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
