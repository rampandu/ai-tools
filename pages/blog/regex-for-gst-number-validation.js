import Head from 'next/head';
import Link from 'next/link';

export default function RegexForGstNumberValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for GST Number Validation in India',
        item: 'https://dev-brains-ai.com/blog/regex-for-gst-number-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for GST Number Validation in India — GSTIN Format Explained',
    description:
      'Validate Indian GST Identification Numbers (GSTIN) with a precise regex pattern. Covers the 15-character format, JavaScript examples, and validation limits.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-gst-number-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex pattern for validating a GSTIN?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A commonly used pattern is ^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$. It matches the 2-digit state code, the embedded 10-character PAN, an entity code, the fixed letter Z, and a final checksum character.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many digits are in a GST number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A GSTIN is always 15 characters, not purely digits. It combines a 2-digit state code, a 10-character PAN, a 1-character entity number, the fixed letter Z, and a 1-character checksum digit or letter.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the state code in a GSTIN need extra validation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, ideally. The regex only confirms the first two characters are digits, not that they correspond to a real Indian state code. For stricter validation, cross-check the 2-digit prefix against the official list of GST state codes (01 to 38).',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for GST Number Validation in India — GSTIN Format Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="Validate Indian GST Identification Numbers (GSTIN) with a precise regex pattern. Covers the 15-character format, JavaScript examples, and validation limits."
        />
        <meta
          name="keywords"
          content="regex for gst number validation, gstin regex, validate gst number javascript, gst number format india, gstin validation pattern"
        />
        <meta property="og:title" content="Regex for GST Number Validation in India — GSTIN Format Explained" />
        <meta property="og:description" content="Validate Indian GST Identification Numbers (GSTIN) with a precise regex pattern. Covers the 15-character format, JavaScript examples, and validation limits." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-gst-number-validation" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-gst-number-validation" />
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
              <li aria-current="page">GST Number Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for GST Number Validation in India — GSTIN Format Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            The GST Identification Number (GSTIN) is a 15-character code assigned to every business registered
            under India's Goods and Services Tax regime. Because a GSTIN literally embeds a PAN inside it, its
            format is more structured — and more useful to validate with regex — than most Indian identifiers.
            This guide walks through the GSTIN structure, gives you a working regex, and shows JavaScript and SQL
            examples for validating GSTIN fields in invoicing or billing software.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Understanding the GSTIN format</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A GSTIN breaks down into five parts:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Characters 1-2 — a 2-digit state code (01 for Jammu &amp; Kashmir through 38 for Ladakh, per the
              GST Council's list).</li>
            <li>Characters 3-12 — the 10-character PAN of the registered business (AAAAA9999A format).</li>
            <li>Character 13 — entity number, representing the count of registrations for that PAN within the
              state (1-9, then A-Z).</li>
            <li>Character 14 — always the letter Z, reserved by default.</li>
            <li>Character 15 — a checksum character, either a digit or a letter.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            An example valid GSTIN is <code>27AAPFU0939F1ZV</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The GSTIN regex pattern</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This encodes all five segments in order: state code, PAN letters, PAN digits, PAN check letter, entity
            code, fixed Z, and final checksum character.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidGSTIN(gstin) {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const normalized = gstin.trim().toUpperCase();
  return gstinRegex.test(normalized);
}

console.log(isValidGSTIN("27aapfu0939f1zv")); // true
console.log(isValidGSTIN("27AAPFU0939F1XV")); // false - 14th char must be Z
console.log(isValidGSTIN("7AAPFU0939F1ZV"));  // false - state code needs 2 digits`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Validating GSTIN in PostgreSQL</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If you store GSTINs in a customer or vendor table, you can add a CHECK constraint so invalid values
            are rejected at the database level:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`ALTER TABLE vendors
ADD CONSTRAINT valid_gstin
CHECK (gstin ~ '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Limitations of regex validation</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Regex cannot verify the checksum digit is mathematically correct — that requires implementing the
              GSTIN checksum algorithm separately.</li>
            <li>Regex cannot confirm the state code prefix maps to a real, currently valid GST state code.</li>
            <li>Regex cannot tell you whether the GSTIN is active, cancelled, or suspended — only the official
              GST Portal search or a verification API can confirm registration status.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Use regex as a fast first-pass filter in your form, then confirm anything transaction-critical against
            the GST Portal.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex pattern for validating a GSTIN?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A commonly used pattern is <code>^[0-9]{'{2}'}[A-Z]{'{5}'}[0-9]{'{4}'}[A-Z]{'{1}'}[1-9A-Z]{'{1}'}Z[0-9A-Z]{'{1}'}$</code>.
              It matches the 2-digit state code, the embedded 10-character PAN, an entity code, the fixed letter
              Z, and a final checksum character.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How many digits are in a GST number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A GSTIN is always 15 characters, not purely digits. It combines a 2-digit state code, a 10-character
              PAN, a 1-character entity number, the fixed letter Z, and a 1-character checksum digit or letter.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does the state code in a GSTIN need extra validation?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes, ideally. The regex only confirms the first two characters are digits, not that they correspond
              to a real Indian state code. For stricter validation, cross-check the 2-digit prefix against the
              official list of GST state codes (01 to 38).
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need a regex for a custom tax ID, invoice number, or compliance field? Describe it in plain English
              and get a tested pattern instantly with Dev Brains AI&apos;s free AI Regex Generator.
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
              <li><Link href="/blog/regex-for-ifsc-code-validation">Regex for IFSC Code Validation</Link></li>
              <li><Link href="/blog/regex-for-aadhaar-card-validation">Regex for Aadhaar Card Validation</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top Regex Patterns Every Developer Should Know</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
