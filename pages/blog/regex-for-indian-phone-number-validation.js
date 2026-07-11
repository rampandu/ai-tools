import Head from 'next/head';
import Link from 'next/link';

export default function RegexForIndianPhoneNumberValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Indian Phone Number Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-indian-phone-number-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Indian Phone Number Validation — +91, 91, and 10-Digit Formats',
    description:
      'Validate Indian mobile numbers with regex, covering +91, 91, and plain 10-digit formats. JavaScript and Python examples plus common formatting pitfalls.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-indian-phone-number-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex for validating an Indian mobile number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A common pattern is ^(?:\\+91|91)?[6-9][0-9]{9}$. It optionally allows a +91 or 91 country-code prefix, then requires a 10-digit number starting with 6, 7, 8, or 9, which covers every active Indian mobile prefix.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do Indian mobile numbers only start with 6, 7, 8, or 9?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Department of Telecommunications allocates mobile number series only in the 6xxxxxxxxx to 9xxxxxxxxx range. Numbers starting with 0-5 are reserved for landlines, short codes, or are not in use, so restricting the first digit improves validation accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle spaces or hyphens in a phone number field?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Strip spaces, hyphens, and parentheses from the input before running the regex, using a replace step like value.replace(/[\\s-()]/g, ""). This lets users type numbers in a natural format like +91 98765-43210 while your validation still checks the underlying digits.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Indian Phone Number Validation — +91, 91, and 10-Digit Formats | Dev Brains AI</title>
        <meta
          name="description"
          content="Validate Indian mobile numbers with regex, covering +91, 91, and plain 10-digit formats. JavaScript and Python examples plus common formatting pitfalls."
        />
        <meta
          name="keywords"
          content="regex for indian phone number validation, indian mobile number regex, validate phone number javascript, +91 regex, 10 digit mobile number regex"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-indian-phone-number-validation" />
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
              <li aria-current="page">Indian Phone Number Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Indian Phone Number Validation — +91, 91, and 10-Digit Formats
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Indian users enter their mobile number in a handful of common ways — sometimes with the +91 country
            code, sometimes with a plain 91 prefix, and often as just the bare 10-digit number. A validation regex
            that only supports one of these formats will reject a large share of legitimate users. This guide gives
            you a pattern that handles all three, plus JavaScript and Python examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Understanding the number format</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An Indian mobile number has two parts that matter for validation:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>An optional country code — either <code>+91</code> or bare <code>91</code>.</li>
            <li>A 10-digit subscriber number that must start with 6, 7, 8, or 9 — the only digits DoT allocates
              for mobile number series.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Valid examples include <code>9876543210</code>, <code>919876543210</code>, and
            <code> +919876543210</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The phone number regex pattern</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^(?:\\+91|91)?[6-9][0-9]{9}$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The non-capturing group <code>(?:\+91|91)?</code> makes the country code optional, and
            <code> [6-9][0-9]{'{9}'}</code> enforces the correct starting digit and total length of 10 digits.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidIndianMobile(number) {
  const cleaned = number.replace(/[\\s()-]/g, "");
  const phoneRegex = /^(?:\\+91|91)?[6-9][0-9]{9}$/;
  return phoneRegex.test(cleaned);
}

console.log(isValidIndianMobile("+91 98765-43210")); // true
console.log(isValidIndianMobile("9876543210"));       // true
console.log(isValidIndianMobile("5876543210"));       // false - starts with 5
console.log(isValidIndianMobile("+91987654321"));     // false - only 9 digits after code`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Python example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import re

PHONE_REGEX = re.compile(r"^(?:\\+91|91)?[6-9][0-9]{9}$")

def is_valid_indian_mobile(number: str) -> bool:
    cleaned = re.sub(r"[\\s()-]", "", number)
    return bool(PHONE_REGEX.match(cleaned))

print(is_valid_indian_mobile("+91-98765-43210"))  # True
print(is_valid_indian_mobile("098765 43210"))      # False - leading 0 not allowed`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Extracting just the 10-digit number</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For storage, it's usually best to normalize every valid input down to the bare 10-digit form rather
            than keeping the country code inconsistently:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function normalizeIndianMobile(number) {
  const cleaned = number.replace(/[\\s()-]/g, "");
  const match = cleaned.match(/^(?:\\+91|91)?([6-9][0-9]{9})$/);
  return match ? match[1] : null;
}

console.log(normalizeIndianMobile("+91 98765 43210")); // "9876543210"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common mistakes to avoid</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Hardcoding only the +91 prefix and rejecting bare 91 or plain 10-digit input — all three are valid
              user-facing formats.</li>
            <li>Forgetting to restrict the first digit to 6-9, which lets invalid landline-range numbers slip
              through as "valid" mobile numbers.</li>
            <li>Not stripping spaces, hyphens, or parentheses before validating, which causes naturally formatted
              input like <code>98765 43210</code> to fail unnecessarily.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex for validating an Indian mobile number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A common pattern is <code>^(?:\+91|91)?[6-9][0-9]{'{9}'}$</code>. It optionally allows a +91 or 91
              country-code prefix, then requires a 10-digit number starting with 6, 7, 8, or 9, which covers every
              active Indian mobile prefix.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why do Indian mobile numbers only start with 6, 7, 8, or 9?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The Department of Telecommunications allocates mobile number series only in the 6xxxxxxxxx to
              9xxxxxxxxx range. Numbers starting with 0-5 are reserved for landlines, short codes, or are not in
              use, so restricting the first digit improves validation accuracy.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I handle spaces or hyphens in a phone number field?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Strip spaces, hyphens, and parentheses from the input before running the regex, using a replace step
              like value.replace(/[\s-()]/g, ""). This lets users type numbers in a natural format like
              +91 98765-43210 while your validation still checks the underlying digits.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need a regex for another phone format or custom validation rule? Describe it in plain English and get
              a tested pattern instantly with Dev Brains AI&apos;s free AI Regex Generator.
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
              <li><Link href="/blog/regex-for-indian-pin-code-validation">Regex for Indian PIN Code Validation</Link></li>
              <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation in JavaScript</Link></li>
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
