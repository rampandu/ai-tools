// pages/blog/regex-for-indian-passport-number-validation.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForIndianPassportNumberValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Indian Passport Number Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-indian-passport-number-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Indian Passport Numbers (1 Letter + 7 Digits)',
    description:
      'A regex pattern for validating Indian passport numbers — one uppercase letter followed by seven digits — with JavaScript examples and real KYC-form edge cases.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-indian-passport-number-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the format of an Indian passport number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An Indian passport number consists of one uppercase letter followed by seven digits, for example A1234567. The letter is not restricted to a specific set and can vary by issuing office and passport series.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex for validating an Indian passport number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The pattern ^[A-Z][0-9]{7}$ validates the structure — one uppercase letter followed by exactly seven digits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does matching this regex confirm the passport number is real?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The regex only confirms the string follows the correct format. Verifying that a passport number actually exists and is valid requires checking against the Ministry of External Affairs Passport Seva database, which is not something regex or client-side code can do.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Indian Passport Numbers (1 Letter + 7 Digits) | Dev Brains AI</title>
        <meta
          name="description"
          content="A regex pattern for validating Indian passport numbers — one uppercase letter followed by seven digits — with JavaScript examples and real KYC-form edge cases."
        />
        <meta
          name="keywords"
          content="indian passport number regex, passport number format india, regex passport validation, validate passport number javascript, kyc passport regex"
        />
        <meta property="og:title" content="Regex for Indian Passport Numbers (1 Letter + 7 Digits)" />
        <meta property="og:description" content="A regex pattern for validating Indian passport numbers — one uppercase letter followed by seven digits — with JavaScript examples and real KYC-form edge cases." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-indian-passport-number-validation" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-indian-passport-number-validation" />
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
              <li aria-current="page">Regex for Indian Passport Number Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Indian Passport Number Validation
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Indian passport numbers follow a simple, consistent structure, which makes them one of
            the easier government-issued ID formats to validate with regex. This guide gives you the
            pattern, a working JavaScript validator, and the edge cases worth handling in a real
            KYC or travel-booking form.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Indian Passport Number Format
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An Indian passport number is one uppercase letter followed by seven digits — for example{' '}
            <code>A1234567</code> or <code>M7654321</code>. Unlike PAN or Aadhaar, there is no
            checksum digit embedded in the number, so validation is purely a format check.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Regex Pattern
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const passportRegex = /^[A-Z][0-9]{7}$/;

function isValidIndianPassport(input) {
  return passportRegex.test(input.trim().toUpperCase());
}

isValidIndianPassport('A1234567');  // true
isValidIndianPassport('a1234567');  // true — normalized to uppercase first
isValidIndianPassport('AB123456');  // false — two letters instead of one
isValidIndianPassport('A123456');   // false — only 6 digits`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using It in a Form Validator
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function PassportInput({ value, onChange }) {
  const normalized = value.trim().toUpperCase();
  const isValid = /^[A-Z][0-9]{7}$/.test(normalized);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A1234567"
        maxLength={8}
        style={{ borderColor: isValid ? '#16a34a' : '#dc2626' }}
      />
      {!isValid && value.length > 0 && (
        <span>Enter a valid passport number, e.g. A1234567</span>
      )}
    </div>
  );
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Edge Cases and Practical Notes
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Always trim whitespace and convert to uppercase before validating — users often paste numbers with trailing spaces or type in lowercase</li>
            <li>Passport numbers alone don't include a checksum, so regex validation is purely structural — it cannot detect a mistyped but format-valid number</li>
            <li>Combine passport number validation with a date-of-issue and date-of-expiry check when building travel/KYC forms, since airlines and visa portals typically validate all three together</li>
            <li>Do not assume the pattern applies to other countries' passports — formats vary widely (e.g. UK passports are 9 digits, US passports can be 9 digits with no letters)</li>
            <li>Never attempt to "verify" a passport number's authenticity client-side — that requires an official government API/database lookup, not a regex check</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Combining with Other Indian ID Validators
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            KYC forms in India often collect multiple ID types together. Here's how a passport check
            fits alongside PAN and Aadhaar validators:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const validators = {
  passport: /^[A-Z][0-9]{7}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  aadhaar: /^[2-9][0-9]{11}$/,
};

function validateIdField(type, value) {
  const pattern = validators[type];
  return pattern ? pattern.test(value.trim().toUpperCase()) : false;
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the format of an Indian passport number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              An Indian passport number consists of one uppercase letter followed by seven digits,
              for example A1234567. The letter is not restricted to a specific set and can vary by
              issuing office and passport series.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for validating an Indian passport number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The pattern <code>{'^[A-Z][0-9]{7}$'}</code> validates the structure — one uppercase
              letter followed by exactly seven digits.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does matching this regex confirm the passport number is real?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. The regex only confirms the string follows the correct format. Verifying that a
              passport number actually exists and is valid requires checking against the Ministry of
              External Affairs Passport Seva database, which is not something regex or client-side code can do.
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
              <li><Link href="/blog/regex-for-pan-card-validation">Regex for PAN Card Validation</Link></li>
              <li><Link href="/blog/regex-for-aadhaar-card-validation">Regex for Aadhaar Card Validation</Link></li>
              <li><Link href="/blog/regex-for-driving-license-number-validation-india">Regex for Driving License Number Validation in India</Link></li>
              <li><Link href="/blog/regex-for-indian-vehicle-number-validation">Regex for Indian Vehicle Number Validation</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
