import Head from 'next/head';
import Link from 'next/link';

export default function RegexForAadhaarCardValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Aadhaar Card Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-aadhaar-card-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Aadhaar Card Validation — 12-Digit Format and Edge Cases',
    description:
      'Validate Aadhaar card numbers with regex. Covers the 12-digit format, spaced input handling, JavaScript and Python examples, and why Verhoeff checksum matters.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-aadhaar-card-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex for validating an Aadhaar number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A basic pattern is ^[2-9]{1}[0-9]{11}$. It requires exactly 12 digits where the first digit is between 2 and 9, since Aadhaar numbers never start with 0 or 1.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle Aadhaar numbers that include spaces?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aadhaar numbers are often displayed in groups of four digits separated by spaces, like 2345 6789 0123. Strip all whitespace from the input with a replace step before running the 12-digit regex, or use a pattern that explicitly allows optional spaces between groups.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does passing the regex mean the Aadhaar number is valid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex only confirms the number has 12 digits and does not start with 0 or 1. Real Aadhaar numbers also satisfy a Verhoeff checksum algorithm on the last digit, which regex cannot compute — you need separate checksum logic or the official UIDAI verification API for that.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Aadhaar Card Validation — 12-Digit Format and Edge Cases | Dev Brains AI</title>
        <meta
          name="description"
          content="Validate Aadhaar card numbers with regex. Covers the 12-digit format, spaced input handling, JavaScript and Python examples, and Verhoeff checksum limits."
        />
        <meta
          name="keywords"
          content="regex for aadhaar card validation, aadhaar number regex, validate aadhaar javascript, aadhaar regex python, 12 digit aadhaar format"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-aadhaar-card-validation" />
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
              <li aria-current="page">Aadhaar Card Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Aadhaar Card Validation — 12-Digit Format and Edge Cases
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Aadhaar is India's 12-digit unique identity number issued by UIDAI to over a billion residents. Because
            it is purely numeric, validating an Aadhaar field looks trivial at first glance — but real-world input
            includes spaces, hyphens, and leading digits that break naive checks. This guide covers the correct
            Aadhaar format, a solid regex pattern, and how to handle the formatting quirks you'll actually see in
            forms and CSV uploads.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Understanding the Aadhaar format</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An Aadhaar number is exactly 12 digits with two structural rules that matter for validation:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>It must be exactly 12 digits long — no letters, no more, no fewer.</li>
            <li>The first digit is never 0 or 1. UIDAI only issues numbers starting from 2 through 9.</li>
            <li>The last digit is a checksum computed using the Verhoeff algorithm, which regex cannot validate.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            When displayed to users, Aadhaar numbers are usually formatted in three groups of four digits, such as
            <code> 2345 6789 0123</code>, but the underlying stored value should be the raw 12-digit string.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The Aadhaar regex pattern</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^[2-9]{1}[0-9]{11}$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            If you need to accept the space-grouped display format directly, use this variant, which allows
            optional single spaces between each group of four digits:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^[2-9]{1}[0-9]{3}\\s?[0-9]{4}\\s?[0-9]{4}$`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidAadhaar(aadhaar) {
  const cleaned = aadhaar.replace(/\\s|-/g, "");
  const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
  return aadhaarRegex.test(cleaned);
}

console.log(isValidAadhaar("2345 6789 0123")); // true
console.log(isValidAadhaar("1234-5678-9012")); // false - starts with 1
console.log(isValidAadhaar("234567890"));      // false - only 9 digits`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Python example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import re

AADHAAR_REGEX = re.compile(r"^[2-9]{1}[0-9]{11}$")

def is_valid_aadhaar(value: str) -> bool:
    cleaned = re.sub(r"[\\s-]", "", value)
    return bool(AADHAAR_REGEX.match(cleaned))

print(is_valid_aadhaar("2345 6789 0123"))  # True
print(is_valid_aadhaar("0345-6789-0123"))  # False - starts with 0`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Why regex is not enough on its own</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Regex validation is a good first filter, but treat it as necessary, not sufficient. Keep these limits
            in mind when handling Aadhaar data:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Regex cannot verify the Verhoeff checksum on the 12th digit — a random 12-digit string starting
              with 2-9 will pass the regex but may still be an invalid Aadhaar number.</li>
            <li>Aadhaar data is sensitive personal information under Indian law. Mask it in logs and UI (show only
              the last 4 digits) and follow UIDAI's data-handling guidelines.</li>
            <li>Never store raw Aadhaar numbers without encryption at rest if your application handles them at
              scale.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for validating an Aadhaar number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A basic pattern is <code>^[2-9]{'{1}'}[0-9]{'{11}'}$</code>. It requires exactly 12 digits where the
              first digit is between 2 and 9, since Aadhaar numbers never start with 0 or 1.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I handle Aadhaar numbers that include spaces?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Aadhaar numbers are often displayed in groups of four digits separated by spaces, like 2345 6789
              0123. Strip all whitespace from the input with a replace step before running the 12-digit regex, or
              use a pattern that explicitly allows optional spaces between groups.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does passing the regex mean the Aadhaar number is valid?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex only confirms the number has 12 digits and does not start with 0 or 1. Real Aadhaar numbers
              also satisfy a Verhoeff checksum algorithm on the last digit, which regex cannot compute — you need
              separate checksum logic or the official UIDAI verification API for that.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need a regex for another Indian ID format or a custom validation rule? Describe it in plain English
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
              <li><Link href="/blog/regex-for-indian-pin-code-validation">Regex for Indian PIN Code Validation</Link></li>
              <li><Link href="/blog/regex-for-indian-phone-number-validation">Regex for Indian Phone Number Validation</Link></li>
              <li><Link href="/blog/regex-for-username-validation-rules">Regex for Username Validation Rules</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top Regex Patterns Every Developer Should Know</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
