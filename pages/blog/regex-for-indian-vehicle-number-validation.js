// pages/blog/regex-for-indian-vehicle-number-validation.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForIndianVehicleNumberValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Indian Vehicle Number Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-indian-vehicle-number-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Indian Vehicle Number Validation — RTO Format & BH Series Explained',
    description:
      'A complete regex pattern for validating Indian vehicle registration numbers (state code, RTO code, series, number), including the newer BH series format.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-indian-vehicle-number-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the format of an Indian vehicle registration number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard format is two letters for the state code, one or two digits for the RTO code, one to two (sometimes up to four) letters for the series, and four digits for the unique number, e.g. MH12AB1234.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex for a standard Indian vehicle number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A practical pattern is ^[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,3}[ -]?[0-9]{4}$, applied to the uppercase, trimmed string. It allows optional spaces or hyphens between segments.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the BH series and how is its format different?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The BH (Bharat) series, introduced in 2021, uses the format YY BH #### XX — a 2-digit year of registration, the fixed code BH, four digits, and two letters. It allows a vehicle to move between states without re-registration and needs a separate regex pattern.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Indian Vehicle Number Validation (RTO + BH Series) | Dev Brains AI</title>
        <meta
          name="description"
          content="A complete regex pattern for validating Indian vehicle registration numbers (state code, RTO code, series, number), including the BH series format."
        />
        <meta
          name="keywords"
          content="indian vehicle number regex, rto number validation regex, vehicle registration number regex, bh series regex, number plate validation javascript"
        />
        <meta property="og:title" content="Regex for Indian Vehicle Number Validation (RTO + BH Series)" />
        <meta property="og:description" content="A complete regex pattern for validating Indian vehicle registration numbers (state code, RTO code, series, number), including the BH series format." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-indian-vehicle-number-validation" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-indian-vehicle-number-validation" />
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
              <li aria-current="page">Regex for Indian Vehicle Number Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Indian Vehicle Number Validation — RTO Format & BH Series Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Indian vehicle registration numbers follow a format issued by the Regional Transport
            Office (RTO), but forms that collect them rarely validate the structure properly. This
            guide breaks down the standard format, gives you a working regex, and covers the newer
            BH (Bharat) series that many teams forget to handle.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Standard RTO Format
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A typical Indian number plate looks like <code>MH12AB1234</code> and breaks down into
            four segments:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>State code</strong> — 2 letters, e.g. MH (Maharashtra), DL (Delhi), KA (Karnataka)</li>
            <li><strong>RTO code</strong> — 1 or 2 digits identifying the district RTO office, e.g. 12</li>
            <li><strong>Series</strong> — 1 to 3 letters (sometimes just 1, sometimes 2), assigned sequentially as registrations are issued, e.g. AB</li>
            <li><strong>Unique number</strong> — always 4 digits, e.g. 1234</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Plates are printed without spaces, but many forms and older records store them with
            spaces or hyphens (<code>MH 12 AB 1234</code> or <code>MH-12-AB-1234</code>), so your
            regex should tolerate both.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Regex for the Standard Format
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Matches MH12AB1234, MH 12 AB 1234, MH-12-AB-1234
const vehicleRegex = /^[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,3}[ -]?[0-9]{4}$/;

function isValidVehicleNumber(input) {
  const normalized = input.trim().toUpperCase();
  return vehicleRegex.test(normalized);
}

isValidVehicleNumber('MH12AB1234');   // true
isValidVehicleNumber('DL-3C-AA-0001'); // true
isValidVehicleNumber('KA 05 MJ 2311'); // true
isValidVehicleNumber('MH1AB123');      // false — too few digits`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The BH (Bharat) Series Format
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Since 2021, vehicle owners with jobs that require frequent inter-state transfers
            (defence personnel, central government employees, employees of companies with offices
            in 4+ states) can opt for the BH series, which does not need re-registration when moving
            states. Its format is different: <code>YY BH #### XX</code>, e.g. <code>22 BH 1234 AB</code>.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Matches 22BH1234AB, 22 BH 1234 AB, 22-BH-1234-AB
const bhSeriesRegex = /^[0-9]{2}[ -]?BH[ -]?[0-9]{4}[ -]?[A-Z]{1,2}$/;

isValidVehicleNumber = (input) => bhSeriesRegex.test(input.trim().toUpperCase());

isValidVehicleNumber('22BH1234AB');      // true
isValidVehicleNumber('23 BH 5678 A');    // true`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Combined Validator for Both Formats
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            In most real applications (insurance forms, parking apps, fleet management systems) you
            want to accept either format:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidIndianVehicleNumber(input) {
  const value = input.replace(/[\\s-]/g, '').toUpperCase();

  const standard = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
  const bhSeries = /^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;

  return standard.test(value) || bhSeries.test(value);
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Edge Cases to Handle
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Some older plates use a single-letter series instead of two (e.g. <code>DL1CA1234</code>)</li>
            <li>Government vehicles sometimes use series like "GJ" without a numeric RTO code — always double-check against your actual data sample before shipping a strict pattern</li>
            <li>Diplomatic and military vehicles follow entirely different numbering systems and will fail both patterns above — treat them as a separate allow-list if your app must support them</li>
            <li>Always normalize casing and strip spaces/hyphens before matching so formatting differences don't cause false rejections</li>
            <li>Regex confirms format only — it does not verify the vehicle actually exists in the VAHAN database; use the government's VAHAN e-services API for that</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the format of an Indian vehicle registration number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The standard format is two letters for the state code, one or two digits for the RTO
              code, one to two (sometimes up to four) letters for the series, and four digits for
              the unique number, e.g. MH12AB1234.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for a standard Indian vehicle number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A practical pattern is <code>{'^[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,3}[ -]?[0-9]{4}$'}</code>,
              applied to the uppercase, trimmed string. It allows optional spaces or hyphens between segments.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the BH series and how is its format different?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The BH (Bharat) series, introduced in 2021, uses the format YY BH #### XX — a 2-digit
              year of registration, the fixed code BH, four digits, and two letters. It allows a
              vehicle to move between states without re-registration and needs a separate regex pattern.
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
              <li><Link href="/blog/regex-for-indian-id-document-validation">Regex for Indian ID & Document Validation (Aadhaar, PAN, GST &amp; More)</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
