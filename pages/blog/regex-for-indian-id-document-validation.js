import Head from 'next/head';
import Link from 'next/link';

export default function RegexForIndianIdDocumentValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Indian ID & Document Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-indian-id-document-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Indian ID & Document Validation — Aadhaar, PAN, GST, IFSC & More',
    description:
      'A working regex pattern for every major Indian ID format — Aadhaar, PAN, GSTIN, IFSC, passport, phone, PIN code, and driving license — plus which ones regex genuinely cannot validate.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-indian-id-document-validation',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can regex fully validate an Aadhaar, PAN, or GSTIN number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex can only confirm the shape of the number is correct — the right length, the right mix of letters and digits, in the right positions. Aadhaar, PAN, and GSTIN all end in a checksum character computed by an algorithm (Verhoeff for Aadhaar, a weighted-sum scheme for PAN/GSTIN) that regex cannot execute. A string can pass every regex check and still be a fabricated number. Passport, phone, and PIN code have no checksum, so for those, regex format validation is the whole job.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex pattern for an Aadhaar number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '/^[2-9][0-9]{11}$/ — 12 digits total, and the first digit is never 0 or 1 because UIDAI only issues Aadhaar numbers starting from 2 through 9.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex pattern for a PAN card?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '/^[A-Z]{5}[0-9]{4}[A-Z]$/ — five uppercase letters (the 4th indicates holder type: P for individual, C for company, H for HUF), four digits, then one uppercase check letter.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex pattern for a GSTIN?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/ — a 2-digit state code followed by a full 10-character PAN, an entity number, the fixed letter Z, and a checksum character. A GSTIN literally has a PAN embedded inside it.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do I validate an Indian phone number with regex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '/^(?:\\+91|91)?[6-9][0-9]{9}$/ — an optional +91 or 91 prefix, then 10 digits starting with 6, 7, 8, or 9, the only leading digits India\'s Department of Telecommunications allocates for mobile numbers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does a valid-looking GSTIN or PAN mean the business or person is real?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex and even checksum validation only confirm the number is well-formed — not that it was actually issued, or that it is still active. For anything transaction-critical, confirm status against the official GST Portal or PAN verification API rather than trusting format validation alone.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Indian ID &amp; Document Validation — Aadhaar, PAN, GST | Dev Brains AI</title>
        <meta
          name="description"
          content="Working regex patterns for every major Indian ID: Aadhaar, PAN, GSTIN, IFSC, passport, phone, PIN code, driving license — plus which ones regex can't fully validate."
        />
        <meta
          name="keywords"
          content="regex for indian id validation, aadhaar regex, pan card regex, gstin regex, ifsc regex, indian phone number regex, pin code regex, indian passport regex, driving license regex"
        />
        <meta property="og:title" content="Regex for Indian ID & Document Validation — Aadhaar, PAN, GST" />
        <meta
          property="og:description"
          content="Working regex patterns for every major Indian ID — Aadhaar, PAN, GSTIN, IFSC, passport, phone, PIN code, driving license — plus which ones regex can't fully validate."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-indian-id-document-validation" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-indian-id-document-validation" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 820, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Regex for Indian ID &amp; Document Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Indian ID &amp; Document Validation
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every major Indian identity document — Aadhaar, PAN, GSTIN, IFSC, passport, phone
            number, PIN code, driving license — has a fixed, documented format, which makes them
            some of the most regex-friendly IDs in the world. But they split into two genuinely
            different problems: some formats are <strong>protected by a checksum digit</strong> that
            regex cannot verify, and some are <strong>pure format</strong>, where a regex match is
            the whole validation. Confusing the two is the single most common mistake in KYC and
            signup forms — this guide draws the line clearly, then gives you a tested pattern for
            each.
          </p>

          <svg viewBox="0 0 640 210" style={{ width: '100%', height: 'auto', marginBottom: 20, borderRadius: 8, background: '#0f172a' }} role="img" aria-label="Diagram splitting Indian ID formats into checksum-protected and format-only categories">
            <text x="320" y="26" textAnchor="middle" fill="#5eead4" fontSize="13" fontWeight="700" fontFamily="ui-monospace, monospace">Two kinds of Indian ID formats</text>

            <rect x="30" y="46" width="270" height="140" rx="10" fill="#134e4a" stroke="#0d9488" strokeWidth="1.5" />
            <text x="165" y="70" textAnchor="middle" fill="#5eead4" fontSize="12" fontWeight="700" fontFamily="ui-monospace, monospace">Checksum-protected</text>
            <text x="165" y="88" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="ui-monospace, monospace">regex confirms shape only</text>
            <text x="50" y="112" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• Aadhaar (Verhoeff)</text>
            <text x="50" y="132" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• PAN (check letter)</text>
            <text x="50" y="152" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• GSTIN (check char)</text>
            <text x="50" y="172" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• IFSC (fixed 5th digit)</text>

            <rect x="340" y="46" width="270" height="140" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <text x="475" y="70" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="700" fontFamily="ui-monospace, monospace">Format-only</text>
            <text x="475" y="88" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">regex IS the validation</text>
            <text x="360" y="112" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• Passport</text>
            <text x="360" y="132" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• Mobile phone</text>
            <text x="360" y="152" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• PIN code</text>
            <text x="360" y="172" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace">• Driving license</text>
          </svg>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>All 8 formats at a glance</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <Link href="/blog/regex-for-indian-vehicle-number-validation">Vehicle registration numbers</Link>{' '}
            get their own dedicated guide since the RTO-series and newer BH-series formats need more
            room than a table row — everything else is here.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table className="small" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>ID</th>
                  <th style={{ padding: '8px 10px' }}>Length</th>
                  <th style={{ padding: '8px 10px' }}>Checksum?</th>
                  <th style={{ padding: '8px 10px' }}>Pattern</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Aadhaar', '12 digits', 'Yes (Verhoeff)', '/^[2-9][0-9]{11}$/'],
                  ['PAN', '10 chars', 'Yes (check letter)', '/^[A-Z]{5}[0-9]{4}[A-Z]$/'],
                  ['GSTIN', '15 chars', 'Yes (check char)', '/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/'],
                  ['IFSC', '11 chars', 'No (fixed 5th char)', '/^[A-Z]{4}0[A-Z0-9]{6}$/'],
                  ['Phone', '10–13 chars', 'No', '/^(?:\\+91|91)?[6-9][0-9]{9}$/'],
                  ['PIN code', '6 digits', 'No', '/^[1-9][0-9]{5}$/'],
                  ['Passport', '8 chars', 'No', '/^[A-Z][0-9]{7}$/'],
                  ['Driving license', '15–16 chars', 'No', '/^[A-Z]{2}[0-9]{2}[ -]?(19|20)[0-9]{2}[0-9]{7}$/'],
                ].map((row) => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>{row[0]}</td>
                    <td style={{ padding: '8px 10px' }}>{row[1]}</td>
                    <td style={{ padding: '8px 10px' }}>{row[2]}</td>
                    <td style={{ padding: '8px 10px', fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 28 }}>Checksum-protected IDs</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            These four all embed a check character — a digit or letter mathematically derived from
            the rest of the number. Regex confirms the shape is right; it cannot confirm the check
            character is mathematically valid, so a random string that happens to fit the pattern
            will still pass.
          </p>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>Aadhaar (12 digits)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            UIDAI never issues an Aadhaar number starting with 0 or 1, and the last digit is a
            Verhoeff-algorithm checksum — a scheme specifically designed to catch transposed and
            adjacent-digit typos, which is why UIDAI uses it instead of a simple digit sum.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const aadhaarRegex = /^[2-9][0-9]{11}$/;
aadhaarRegex.test('234567890123'); // true — shape is valid
// A regex pass here does NOT mean the number was ever issued.`}
          </pre>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>PAN (10 characters)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            The 4th letter isn't random — it encodes the holder type (P for an individual, C for a
            company, H for a Hindu Undivided Family, and several others), so <code>ABCPD1234E</code> and{' '}
            <code>ABCCD1234E</code> are structurally different kinds of PAN, not just different numbers.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
panRegex.test('ABCPD1234E'); // true`}
          </pre>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>GSTIN (15 characters)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            A GSTIN is the most structured Indian ID because it isn't really its own identifier — it's
            a 2-digit state code (01 for Jammu &amp; Kashmir through 38 for Ladakh) wrapped around a
            full 10-character PAN, followed by an entity count, the fixed letter <code>Z</code>, and a
            checksum. Example: <code>27AAPFU0939F1ZV</code>.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
gstinRegex.test('27AAPFU0939F1ZV'); // true
gstinRegex.test('27AAPFU0939F1XV'); // false — 14th char must be Z`}
          </pre>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>IFSC (11 characters)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            Grouped here for its fixed 5th character rather than a true mathematical checksum: RBI
            reserves that position as the digit <code>0</code> for every bank, so it acts as a
            structural sanity check even though it isn't derived from the surrounding characters.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
ifscRegex.test('HDFC0001234'); // true`}
          </pre>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 28 }}>Format-only IDs</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            No embedded checksum in any of these four — a regex match genuinely is a complete
            structural validation. What still varies is exactly which characters are legal in which
            position, which is where copy-pasted "close enough" patterns tend to go wrong.
          </p>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>Mobile phone (10–13 characters)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            India's Department of Telecommunications only allocates mobile numbers starting with 6,
            7, 8, or 9 — a number starting with 5 or below is never a valid Indian mobile number,
            regardless of length.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const phoneRegex = /^(?:\\+91|91)?[6-9][0-9]{9}$/;
phoneRegex.test('+919876543210'); // true
phoneRegex.test('9876543210');    // true
phoneRegex.test('5876543210');    // false — DoT never allocates a leading 5`}
          </pre>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>PIN code (6 digits)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            The first digit is the postal zone (1 through 9 — there is no zone 0), the second is the
            sub-zone, the third is the sorting district, and the last three identify the specific
            post office.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const pinRegex = /^[1-9][0-9]{5}$/;
pinRegex.test('110001'); // true — New Delhi GPO`}
          </pre>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>Passport (8 characters)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            The simplest format on this list — one uppercase letter, seven digits, nothing more.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const passportRegex = /^[A-Z][0-9]{7}$/;
passportRegex.test('A1234567'); // true`}
          </pre>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 18 }}>Driving license (15–16 characters)</h3>
          <p className="small" style={{ marginBottom: 8 }}>
            The only ID here without one nationwide format — the state code (MH, DL, KA, and so on),
            RTO code, and separator vary enough by issuing state that this pattern should be treated
            as "matches the common case," not a guarantee.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const dlRegex = /^[A-Z]{2}[0-9]{2}[ -]?(19|20)[0-9]{2}[0-9]{7}$/;
dlRegex.test('MH1220230012345'); // true`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 28 }}>One validator for all eight</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Instead of eight separate copy-pasted functions, a single dispatcher keeps every pattern
            in one place — easier to update if a format changes, and it forces you to name the ID
            type explicitly at every call site instead of guessing from context.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const INDIAN_ID_PATTERNS = {
  aadhaar: /^[2-9][0-9]{11}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  phone: /^(?:\\+91|91)?[6-9][0-9]{9}$/,
  pinCode: /^[1-9][0-9]{5}$/,
  passport: /^[A-Z][0-9]{7}$/,
  drivingLicense: /^[A-Z]{2}[0-9]{2}[ -]?(19|20)[0-9]{2}[0-9]{7}$/,
};

function isValidIndianId(type, value) {
  const pattern = INDIAN_ID_PATTERNS[type];
  if (!pattern) throw new Error(\`Unknown ID type: \${type}\`);
  return pattern.test(String(value).trim().toUpperCase());
}

isValidIndianId('pan', 'abcpd1234e');      // true
isValidIndianId('gstin', '27AAPFU0939F1ZV'); // true
isValidIndianId('aadhaar', '123456789012'); // false — starts with 1`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common Mistakes</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><strong>Treating a regex pass as proof the ID is real.</strong> For Aadhaar, PAN, GSTIN, and IFSC, a regex match is a necessary but not sufficient check — the checksum (or fixed digit) still needs separate verification if it matters for your use case.</li>
            <li><strong>Forgetting to normalize case before testing.</strong> All eight formats use uppercase letters; users routinely type PAN or IFSC in lowercase, so <code>.toUpperCase()</code> before testing avoids false negatives.</li>
            <li><strong>Not trimming whitespace.</strong> Copy-pasted Aadhaar numbers often carry the UIDAI-style spacing (<code>2345 6789 0123</code>) — strip spaces before testing, don't bake them into the regex unless you specifically want to accept that format.</li>
            <li><strong>Assuming one driving license format covers every state.</strong> The pattern here matches the common case; some states use different separators or field orders, so treat a non-match as "needs manual review," not "definitely invalid."</li>
            <li><strong>Skipping the DoT leading-digit rule for phone numbers.</strong> <code>{'^[0-9]{10}$'}</code> alone accepts numbers starting with 0–5, which no telecom operator has ever issued as a mobile number.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Can regex fully validate an Aadhaar, PAN, or GSTIN number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex confirms the shape — length, and which characters are allowed where — but
              Aadhaar, PAN, and GSTIN all end in a checksum computed by an algorithm regex cannot
              run. A fabricated number that happens to fit the pattern will still pass. Passport,
              phone, and PIN code have no checksum, so for those, regex format validation is the
              whole job.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex pattern for a GSTIN?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              <code>{'^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$'}</code> — a 2-digit state
              code, a full 10-character PAN embedded inside it, an entity number, the fixed letter
              Z, and a checksum character.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I validate an Indian phone number with regex?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              <code>{'^(?:\\+91|91)?[6-9][0-9]{9}$'}</code> — an optional +91 or 91 prefix, then 10
              digits starting with 6, 7, 8, or 9, the only leading digits DoT allocates for mobile
              numbers.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does a valid-looking GSTIN or PAN mean the business or person is real?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Even checksum validation only confirms the number is well-formed, not that it was
              actually issued or is still active. For anything transaction-critical, confirm status
              against the official GST Portal or a PAN verification API instead of trusting format
              validation alone.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Need a pattern for a custom ID or compliance field?</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the format in plain English and get a tested regex instantly with the free
              Dev Brains AI Regex Generator — no signup required.
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
              <li><Link href="/blog/regex-for-indian-vehicle-number-validation">Regex for Indian Vehicle Number Validation (RTO + BH Series)</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">50 Ready-to-Use Regex Patterns for Developers</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">AI Regex Generator Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
