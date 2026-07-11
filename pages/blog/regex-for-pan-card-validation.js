import Head from 'next/head';
import Link from 'next/link';

export default function RegexForPanCardValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for PAN Card Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-pan-card-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for PAN Card Validation in JavaScript and Python',
    description:
      'Validate Indian PAN card numbers with a reliable regex pattern. Includes JavaScript and Python examples, format breakdown, and common validation mistakes.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-pan-card-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the correct regex for validating a PAN card number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard regex is ^[A-Z]{5}[0-9]{4}[A-Z]{1}$. It matches five uppercase letters, four digits, and one uppercase letter, which is the fixed structure the Income Tax Department uses for every PAN.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does a regex match mean the PAN number is real?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex only confirms the PAN follows the correct format (10 characters in the AAAAA9999A pattern). It cannot confirm the PAN was actually issued or belongs to a real taxpayer — that requires the official NSDL or Income Tax e-filing verification API.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should PAN validation be case-sensitive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PAN numbers are always uppercase in official records, but user input is often lowercase or mixed case. Convert the input to uppercase with toUpperCase() (JavaScript) or .upper() (Python) before running the regex, rather than adding a case-insensitive flag.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for PAN Card Validation in JavaScript and Python | Dev Brains AI</title>
        <meta
          name="description"
          content="Validate Indian PAN card numbers with a reliable regex pattern. Includes JavaScript and Python examples, format breakdown, and common mistakes to avoid."
        />
        <meta
          name="keywords"
          content="regex for pan card validation, pan card regex, validate pan number javascript, pan number regex python, indian pan card format regex"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-pan-card-validation" />
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
              <li aria-current="page">PAN Card Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for PAN Card Validation in JavaScript and Python
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every Indian Permanent Account Number (PAN) follows a strict 10-character format defined by the Income
            Tax Department. Because the structure never changes, a regular expression is the fastest and most
            reliable way to validate PAN input in a signup form, KYC flow, or backend API before you spend an API
            call on a real verification service. This guide breaks down the PAN format, gives you a copy-paste
            regex for JavaScript and Python, and covers the edge cases that trip up naive implementations.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Understanding the PAN format</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A PAN is always 10 characters long and follows the pattern AAAAA9999A. Each part of the string has a
            defined meaning:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>First 5 characters — uppercase letters (A-Z). The 4th letter indicates the holder type (P for
              individual, C for company, H for HUF, and so on).</li>
            <li>Next 4 characters — digits (0-9), a sequential number unique to that letter series.</li>
            <li>Last character — an uppercase alphabetic check character.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Because every PAN follows this exact 5-4-1 structure with no separators, spaces, or hyphens, the regex
            is short and unambiguous.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The PAN regex pattern</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^[A-Z]{5}[0-9]{4}[A-Z]{1}$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This anchors the match to the full string with <code>^</code> and <code>$</code>, so partial matches
            inside a longer string are rejected. A valid example is <code>ABCDE1234F</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript example</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Always normalize the input to uppercase and trim whitespace before testing it against the regex — users
            frequently paste PAN numbers with extra spaces or in lowercase.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidPAN(pan) {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const normalized = pan.trim().toUpperCase();
  return panRegex.test(normalized);
}

console.log(isValidPAN("abcde1234f")); // true
console.log(isValidPAN("ABCDE12345")); // false - last char must be a letter
console.log(isValidPAN("ABCD1234F"));  // false - only 4 letters at start`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Python example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import re

PAN_REGEX = re.compile(r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$")

def is_valid_pan(pan: str) -> bool:
    normalized = pan.strip().upper()
    return bool(PAN_REGEX.match(normalized))

print(is_valid_pan("abcde1234f"))  # True
print(is_valid_pan("ABCDE123F"))   # False - only 3 digits`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common mistakes to avoid</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Skipping the <code>^</code> and <code>$</code> anchors — without them, a regex engine may match a
              valid 10-character substring inside a longer, invalid string.</li>
            <li>Forgetting to uppercase user input, which causes valid lowercase PANs to fail validation.</li>
            <li>Treating a regex match as proof the PAN is genuine. Format validation only checks structure — use
              it as a first-line client-side check, then confirm with a real verification API server-side for
              anything KYC-related.</li>
            <li>Allowing spaces or hyphens in the pattern. Real PAN numbers never contain separators, so building
              that flexibility into the regex just weakens validation.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the correct regex for validating a PAN card number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The standard regex is <code>^[A-Z]{'{5}'}[0-9]{'{4}'}[A-Z]{'{1}'}$</code>. It matches five uppercase
              letters, four digits, and one uppercase letter, which is the fixed structure the Income Tax Department
              uses for every PAN.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does a regex match mean the PAN number is real?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex only confirms the PAN follows the correct format (10 characters in the AAAAA9999A pattern).
              It cannot confirm the PAN was actually issued or belongs to a real taxpayer — that requires the
              official NSDL or Income Tax e-filing verification API.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should PAN validation be case-sensitive?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              PAN numbers are always uppercase in official records, but user input is often lowercase or mixed case.
              Convert the input to uppercase with toUpperCase() (JavaScript) or .upper() (Python) before running the
              regex, rather than adding a case-insensitive flag.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need a regex for a different Indian document format or custom validation rule? Describe it in plain
              English and get a tested pattern instantly with Dev Brains AI&apos;s free AI Regex Generator.
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
              <li><Link href="/blog/regex-for-aadhaar-card-validation">Regex for Aadhaar Card Validation</Link></li>
              <li><Link href="/blog/regex-for-gst-number-validation">Regex for GST Number Validation in India</Link></li>
              <li><Link href="/blog/regex-for-ifsc-code-validation">Regex for IFSC Code Validation</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">How the AI Regex Generator Works</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
