// pages/blog/regex-for-driving-license-number-validation-india.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForDrivingLicenseNumberValidationIndia() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Driving License Number Validation in India',
        item: 'https://dev-brains-ai.com/blog/regex-for-driving-license-number-validation-india',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Driving License Number Validation in India',
    description:
      'A regex pattern for validating Indian driving license numbers (state code + RTO + year + unique number), and why the exact format varies by state.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-driving-license-number-validation-india',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the format of an Indian driving license number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The common format is a 2-letter state code, a 2-digit RTO code, a 4-digit year of issue, and a 7-digit unique serial number, e.g. MH1220230012345. Some states use slight variations in digit grouping.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex for a standard Indian driving license number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A practical pattern is ^[A-Z]{2}[0-9]{2}[ -]?(19|20)[0-9]{2}[0-9]{7}$, which matches the common state code + RTO code + year + serial number structure, allowing an optional space or hyphen after the RTO code.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does the driving license format vary by state in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because license numbers are issued by each state’s Regional Transport Office under a shared national guideline, but historically some states used slightly different digit groupings or serial lengths before standardization. A strict regex tuned for one state may reject valid numbers from another.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Driving License Number Validation in India | Dev Brains AI</title>
        <meta
          name="description"
          content="A regex pattern for validating Indian driving license numbers (state code + RTO + year + unique number), and why the format varies by state."
        />
        <meta
          name="keywords"
          content="driving license number regex india, dl number validation regex, indian driving license regex, rto license number format"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-driving-license-number-validation-india" />
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
              <li aria-current="page">Regex for Driving License Number Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Driving License Number Validation in India
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Indian driving license numbers loosely follow a national format, but because each state's
            RTO historically issued numbers with slightly different conventions, a single strict
            regex will reject some genuinely valid numbers. This guide gives you the common pattern
            plus a more permissive fallback for real-world data.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Standard Format
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A typical driving license number looks like <code>MH1220230012345</code> and breaks down as:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>State code</strong> — 2 letters, e.g. MH (Maharashtra), DL (Delhi), KA (Karnataka)</li>
            <li><strong>RTO code</strong> — 2 digits identifying the district transport office, e.g. 12</li>
            <li><strong>Year of issue</strong> — 4 digits, e.g. 2023</li>
            <li><strong>Unique serial number</strong> — typically 7 digits, e.g. 0012345</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Numbers are often printed without separators, but forms and scanned records sometimes
            store a space or hyphen after the state/RTO segment (<code>MH12 20230012345</code> or{' '}
            <code>MH12-20230012345</code>).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Regex for the Standard Format
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const dlRegex = /^[A-Z]{2}[0-9]{2}[ -]?(19|20)[0-9]{2}[0-9]{7}$/;

function isValidDrivingLicense(input) {
  const normalized = input.trim().toUpperCase();
  return dlRegex.test(normalized);
}

isValidDrivingLicense('MH1220230012345');    // true
isValidDrivingLicense('MH12 20230012345');   // true
isValidDrivingLicense('MH12-20230012345');   // true
isValidDrivingLicense('MH1220230012');       // false — serial too short`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why the Format Varies by State
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The Ministry of Road Transport and Highways standardized the DL number structure under
            the Sarathi system, but older licenses issued before full digitization — and some states'
            own numbering conventions — don't always match the modern 15-16 character layout exactly.
            You may encounter numbers with:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>A serial number with 6 digits instead of 7 in older records</li>
            <li>An extra space or slash between the RTO code and the rest of the number</li>
            <li>A 2-digit year instead of 4-digit in pre-2000s licenses</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Because of this, treat strict regex validation as a first-pass sanity check rather than
            the final word — pair it with a lenient fallback and a manual review path for anything
            that fails:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// More permissive: state code + RTO + 11-13 trailing digits, tolerant of separators
const dlLenient = /^[A-Z]{2}[0-9]{2}[ -]?[0-9]{11,13}$/;

dlLenient.test('MH1220230012345'); // true
dlLenient.test('KA0519850012345'); // true — older format, still passes`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Practical Validation Strategy
          </h2>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>Normalize input — strip spaces/hyphens, convert to uppercase</li>
            <li>Run the strict regex first for the common modern format</li>
            <li>If it fails, fall back to the lenient pattern rather than outright rejecting the input</li>
            <li>For anything used in a legal/compliance context (insurance, fleet onboarding), verify against the government's Sarathi/VAHAN Parivahan API rather than relying on format checks alone</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the format of an Indian driving license number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The common format is a 2-letter state code, a 2-digit RTO code, a 4-digit year of
              issue, and a 7-digit unique serial number, e.g. MH1220230012345. Some states use
              slight variations in digit grouping.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for a standard Indian driving license number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A practical pattern is <code>{'^[A-Z]{2}[0-9]{2}[ -]?(19|20)[0-9]{2}[0-9]{7}$'}</code>,
              which matches the common state code + RTO code + year + serial number structure,
              allowing an optional space or hyphen after the RTO code.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does the driving license format vary by state in India?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Because license numbers are issued by each state's Regional Transport Office under a
              shared national guideline, but historically some states used slightly different digit
              groupings or serial lengths before standardization. A strict regex tuned for one state
              may reject valid numbers from another.
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
              <li><Link href="/blog/regex-for-indian-vehicle-number-validation">Regex for Indian Vehicle Number Validation</Link></li>
              <li><Link href="/blog/regex-for-indian-passport-number-validation">Regex for Indian Passport Number Validation</Link></li>
              <li><Link href="/blog/regex-for-pan-card-validation">Regex for PAN Card Validation</Link></li>
              <li><Link href="/blog/regex-for-aadhaar-card-validation">Regex for Aadhaar Card Validation</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
