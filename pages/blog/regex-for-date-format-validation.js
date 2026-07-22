// pages/blog/regex-for-date-format-validation.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForDateFormatValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Date Format Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-date-format-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Date Format Validation — DD/MM/YYYY, MM-DD-YYYY, and ISO 8601',
    description:
      'Regex patterns for validating DD/MM/YYYY, MM-DD-YYYY, and ISO 8601 (YYYY-MM-DD) dates, plus why regex alone cannot catch impossible dates like Feb 30.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-date-format-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex for DD/MM/YYYY date format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A practical pattern is ^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/](19|20)\\d{2}$, which restricts the day to 01-31 and the month to 01-12, but still cannot catch invalid combinations like 31/04.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex for ISO 8601 date format (YYYY-MM-DD)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The pattern ^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$ validates the YYYY-MM-DD structure used by ISO 8601, SQL DATE columns, and most APIs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why can regex not fully validate a date?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Regex works on fixed character patterns and has no concept of calendar rules, so it cannot know that April has 30 days, that February has 28 or 29 depending on leap years, or that a specific day-month combination like 30 February is impossible. Use a date library like the built-in Date object, date-fns, or Luxon after the regex format check to confirm the date is real.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Date Format Validation — DD/MM/YYYY, ISO 8601 | Dev Brains AI</title>
        <meta
          name="description"
          content="Regex patterns for validating DD/MM/YYYY, MM-DD-YYYY, and ISO 8601 (YYYY-MM-DD) dates, plus why regex alone cannot catch impossible dates like Feb 30."
        />
        <meta
          name="keywords"
          content="regex date validation, dd/mm/yyyy regex, iso 8601 regex, date format regex javascript, validate date string regex"
        />
        <meta property="og:title" content="Regex for Date Format Validation — DD/MM/YYYY, ISO 8601" />
        <meta property="og:description" content="Regex patterns for validating DD/MM/YYYY, MM-DD-YYYY, and ISO 8601 (YYYY-MM-DD) dates, plus why regex alone cannot catch impossible dates like Feb 30." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-date-format-validation" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-date-format-validation" />
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
              <li aria-current="page">Regex for Date Format Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Date Format Validation — DD/MM/YYYY, MM-DD-YYYY, and ISO 8601
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Date formats differ by region and system — India defaults to DD/MM/YYYY, the US uses
            MM/DD/YYYY, and APIs/databases standardize on ISO 8601's YYYY-MM-DD. This guide gives
            you regex patterns for each format and explains exactly where regex validation stops
            being sufficient.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            DD/MM/YYYY (India, UK, most of the world)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This format is the default in India. The pattern below restricts the day to 01-31 and
            month to 01-12, and accepts either <code>/</code> or <code>-</code> as a separator:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const ddmmyyyy = /^(0[1-9]|[12][0-9]|3[01])[/-](0[1-9]|1[0-2])[/-](19|20)\\d{2}$/;

ddmmyyyy.test('25/12/2025');  // true
ddmmyyyy.test('31-04-2025');  // true — regex accepts it, but April has only 30 days!
ddmmyyyy.test('32/01/2025');  // false — day out of range 01-31`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            MM-DD-YYYY (United States)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Same structure, month and day swapped — easy to confuse with DD/MM/YYYY when working with
            US-based APIs or CSV exports:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const mmddyyyy = /^(0[1-9]|1[0-2])[/-](0[1-9]|[12][0-9]|3[01])[/-](19|20)\\d{2}$/;

mmddyyyy.test('12/25/2025');  // true
mmddyyyy.test('25/12/2025');  // false — 25 is not a valid month`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            ISO 8601 (YYYY-MM-DD)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This is the unambiguous format used by SQL <code>DATE</code> columns, JSON APIs, and log
            timestamps — always prefer it internally, even if your UI displays DD/MM/YYYY:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const iso8601 = /^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/;

iso8601.test('2025-06-01');  // true
iso8601.test('2025-13-01');  // false — month 13 doesn't exist
iso8601.test('2025-6-1');    // false — requires zero-padded month/day`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Regex Cannot Fully Validate a Real Calendar Date
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Regex only checks that digits fall within fixed numeric ranges — it has no concept of
            "April has 30 days" or "2025 is not a leap year." That means patterns above will happily
            accept impossible dates like <code>31/04/2025</code> or <code>29/02/2025</code> (2025 is
            not a leap year). To fully validate a date, follow the regex check with an actual date
            library check:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isRealDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

isRealDate(31, 4, 2025);  // false — April only has 30 days, JS rolls it to May 1
isRealDate(29, 2, 2024);  // true  — 2024 is a leap year
isRealDate(29, 2, 2025);  // false — 2025 is not a leap year`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This trick works because JavaScript's <code>Date</code> constructor "rolls over" invalid
            day/month combinations into the next valid date instead of throwing — so comparing the
            parsed components back against your input reliably detects the rollover.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Recommended Validation Pipeline
          </h2>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>Run the regex first to reject obviously malformed strings fast (wrong separators, wrong digit counts)</li>
            <li>Extract day, month, year as numbers from the regex match groups</li>
            <li>Construct a <code>Date</code> object and compare components back, as shown above, to catch impossible dates</li>
            <li>For business rules (e.g. "date must be in the future", "age must be 18+"), add explicit comparisons after parsing</li>
            <li>Always store and transmit dates in ISO 8601 internally — only format to DD/MM/YYYY at the UI layer</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for DD/MM/YYYY date format?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A practical pattern is{' '}
              <code>{'^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/](19|20)\\d{2}$'}</code>, which
              restricts the day to 01-31 and the month to 01-12, but still cannot catch invalid
              combinations like 31/04.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for ISO 8601 date format (YYYY-MM-DD)?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The pattern <code>{'^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$'}</code> validates
              the YYYY-MM-DD structure used by ISO 8601, SQL DATE columns, and most APIs.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why can regex not fully validate a date?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Regex works on fixed character patterns and has no concept of calendar rules, so it
              cannot know that April has 30 days, that February has 28 or 29 depending on leap years,
              or that a specific day-month combination like 30 February is impossible. Use a date
              library like the built-in Date object, date-fns, or Luxon after the regex format check
              to confirm the date is real.
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
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/regex-for-multiline-text-matching">Regex for Multiline Text Matching</Link></li>
              <li><Link href="/blog/regex-vs-string-methods-when-to-use-which">Regex vs String Methods — When to Use Which</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
