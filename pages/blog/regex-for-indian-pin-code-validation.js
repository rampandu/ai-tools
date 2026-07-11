import Head from 'next/head';
import Link from 'next/link';

export default function RegexForIndianPinCodeValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Indian PIN Code Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-indian-pin-code-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Indian PIN Code Validation — 6-Digit Postal Codes',
    description:
      'Validate 6-digit Indian postal PIN codes using regex in JavaScript and Python. Covers the zone-digit rule, common mistakes, and address-form best practices.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-indian-pin-code-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex for validating an Indian PIN code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A reliable pattern is ^[1-9][0-9]{5}$. It requires exactly 6 digits where the first digit is between 1 and 9, since Indian PIN codes never start with 0.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why cant an Indian PIN code start with zero?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The first digit of a PIN code represents one of nine postal zones in India, numbered 1 through 9 (zone 0 is not used). The second digit represents the sub-zone, and the following digits identify the specific sorting district and delivery office.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use regex alone to validate a delivery address PIN code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Regex confirms the PIN code is correctly formatted but not that it is a real, currently active code. For shipping or logistics forms, pair regex validation with a PIN code lookup API or a local dataset of valid Indian PIN codes to also auto-fill city and state.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Indian PIN Code Validation — 6-Digit Postal Codes | Dev Brains AI</title>
        <meta
          name="description"
          content="Validate 6-digit Indian postal PIN codes using regex in JavaScript and Python. Covers the zone-digit rule, common mistakes, and address-form best practices."
        />
        <meta
          name="keywords"
          content="regex for indian pin code validation, pin code regex, validate pincode javascript, india postal code regex, 6 digit pincode pattern"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-indian-pin-code-validation" />
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
              <li aria-current="page">PIN Code Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Indian PIN Code Validation — 6-Digit Postal Codes
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            India Post's Postal Index Number (PIN) system uses a 6-digit code to route mail to one of over 19,000
            delivery post offices. Any address form, e-commerce checkout, or logistics app built for Indian users
            needs to validate this field reliably. This guide covers the PIN code structure, a solid regex
            pattern, and implementation examples in JavaScript and Python.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Understanding the PIN code format</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An Indian PIN code is always 6 digits, and each digit position carries meaning:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>1st digit — the postal zone (1 through 9; there is no zone 0).</li>
            <li>2nd digit — the sub-zone within that region.</li>
            <li>3rd digit — the sorting district within the sub-zone.</li>
            <li>Last 3 digits — identify the specific post office or delivery point.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            An example valid PIN code is <code>110001</code> (Connaught Place, New Delhi).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The PIN code regex pattern</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^[1-9][0-9]{5}$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This requires exactly 6 digits total, with the first digit restricted to 1-9 so codes like
            <code> 012345</code> are correctly rejected.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidPinCode(pin) {
  const pinRegex = /^[1-9][0-9]{5}$/;
  return pinRegex.test(pin.trim());
}

console.log(isValidPinCode("110001")); // true
console.log(isValidPinCode("012345")); // false - starts with 0
console.log(isValidPinCode("11000"));  // false - only 5 digits`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Python example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import re

PINCODE_REGEX = re.compile(r"^[1-9][0-9]{5}$")

def is_valid_pincode(pin: str) -> bool:
    return bool(PINCODE_REGEX.match(pin.strip()))

print(is_valid_pincode("560001"))  # True - Bengaluru GPO
print(is_valid_pincode("56000"))   # False - only 5 digits`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>HTML input example</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For a checkout or address form, you can pair the pattern attribute with numeric input restrictions to
            guide mobile keyboards and give instant browser-level feedback:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`<input
  type="text"
  inputMode="numeric"
  maxLength={6}
  pattern="[1-9][0-9]{5}"
  placeholder="e.g. 400001"
  title="Enter a valid 6-digit PIN code"
/>`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common mistakes to avoid</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Allowing the first digit to be 0 — no Indian postal zone uses 0 as the leading digit.</li>
            <li>Accepting PIN codes with a space in the middle, like <code>110 001</code>. If you want to support
              that display format, strip spaces before validating rather than baking them into the regex.</li>
            <li>Assuming a syntactically valid PIN code exists in the India Post database. For critical delivery
              flows, verify against a real PIN code dataset or lookup API.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for validating an Indian PIN code?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A reliable pattern is <code>^[1-9][0-9]{'{5}'}$</code>. It requires exactly 6 digits where the first
              digit is between 1 and 9, since Indian PIN codes never start with 0.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why can&apos;t an Indian PIN code start with zero?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The first digit of a PIN code represents one of nine postal zones in India, numbered 1 through 9
              (zone 0 is not used). The second digit represents the sub-zone, and the following digits identify
              the specific sorting district and delivery office.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use regex alone to validate a delivery address PIN code?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Regex confirms the PIN code is correctly formatted but not that it is a real, currently active code.
              For shipping or logistics forms, pair regex validation with a PIN code lookup API or a local dataset
              of valid Indian PIN codes to also auto-fill city and state.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need a regex for another address field or custom validation rule? Describe it in plain English and
              get a tested pattern instantly with Dev Brains AI&apos;s free AI Regex Generator.
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
              <li><Link href="/blog/regex-for-indian-phone-number-validation">Regex for Indian Phone Number Validation</Link></li>
              <li><Link href="/blog/regex-for-aadhaar-card-validation">Regex for Aadhaar Card Validation</Link></li>
              <li><Link href="/blog/regex-for-ipv4-address-validation">Regex for IPv4 Address Validation</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">How the AI Regex Generator Works</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
