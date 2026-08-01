import Head from 'next/head';
import Link from 'next/link';

export default function RegexForEmailValidationJavascriptExample() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Email Validation in JavaScript',
        item: 'https://dev-brains-ai.com/blog/regex-for-email-validation-javascript-example',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Email Validation in JS — Patterns & Edge Cases',
    description:
      'How to validate email addresses using regex in JavaScript, with a practical pattern, edge case handling, and why full RFC 5322 compliance is not worth chasing.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-email-validation-javascript-example',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What regex should I use to validate emails in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A practical, widely used pattern is /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/. It checks for a local part, an @ symbol, a domain, and a dot-separated TLD, without whitespace, which covers the vast majority of real email addresses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why not use a full RFC 5322 compliant email regex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The full RFC 5322 specification is extremely complex and technically allows addresses most mail providers reject anyway (like quoted strings with spaces). A full-spec regex is hundreds of characters long, hard to maintain, and offers little practical benefit over a simpler pattern combined with a confirmation email.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is regex enough to confirm an email address is deliverable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex only validates that the string is shaped like an email address. It cannot confirm the domain exists, has a mail server, or that the mailbox is active. The only reliable way to confirm deliverability is to send a verification email and require the user to click a confirmation link.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Email Validation in JS — Patterns &amp; Edge Cases | Dev Brains AI</title>
        <meta
          name="description"
          content="How to validate email addresses using regex in JavaScript, with a practical pattern, edge case handling, and why full RFC 5322 compliance is not worth chasing."
        />
        <meta
          name="keywords"
          content="regex for email validation javascript, email validation regex, javascript email regex example, validate email javascript, email regex pattern"
        />
        <meta property="og:title" content="Regex for Email Validation in JS — Patterns &amp; Edge Cases" />
        <meta property="og:description" content="How to validate email addresses using regex in JavaScript, with a practical pattern, edge case handling, and why full RFC 5322 compliance is not worth chasing." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-email-validation-javascript-example" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-email-validation-javascript-example" />
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
              <li aria-current="page">Email Validation in JavaScript</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Email Validation in JS — Patterns &amp; Edge Cases
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Email validation is one of the first regex problems every JavaScript developer runs into, and also one
            of the most over-engineered. The truth is that no regex can fully guarantee an email address is real —
            but a well-chosen pattern catches typos and malformed input before you waste a signup or send an email
            that bounces. This guide gives you a practical pattern, explains its trade-offs, and shows how to pair
            it with real-world verification.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>A practical email regex</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This breaks down into three parts: <code>[^\s@]+</code> for the local part before the @ (any
            characters except whitespace and another @), a literal <code>@</code>, and
            <code> [^\s@]+\.[^\s@]+</code> for a domain that contains at least one dot. It's permissive by design
            — good email validation should almost never reject a real user, and this pattern strikes that
            balance.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email.trim());
}

console.log(isValidEmail("dev@dev-brains-ai.com"));    // true
console.log(isValidEmail("first.last+tag@sub.co.in")); // true
console.log(isValidEmail("no-at-symbol.com"));          // false
console.log(isValidEmail("user@no-dot"));                // false - no TLD`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>A stricter pattern for form validation</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If you want to reject a few more obviously malformed edge cases — like consecutive dots or a domain
            starting with a hyphen — this pattern adds more structure while remaining readable:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This mirrors the character set the HTML5 spec recommends for <code>&lt;input type=&quot;email&quot;&gt;</code>
            and correctly handles domain labels that can't start or end with a hyphen.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>React form example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function EmailField() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleBlur = () => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    setError(emailRegex.test(email) ? "" : "Enter a valid email address");
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Edge cases worth knowing</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Plus-addressing like <code>user+newsletter@gmail.com</code> is valid and widely used — don't strip
              or reject the <code>+</code> character.</li>
            <li>Subdomains like <code>user@mail.example.co.in</code> are valid; your regex needs to allow multiple
              dot-separated segments in the domain, not just one.</li>
            <li>Case sensitivity: the local part is technically case-sensitive per spec, but nearly every real
              mail provider treats it as case-insensitive. Store emails as-is but compare them lowercase to avoid
              duplicate-account bugs.</li>
            <li>Internationalized email addresses (with non-ASCII characters) exist but are rare in practice —
              decide early whether your product needs to support them, since it changes the character classes
              significantly.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Regex is not the same as deliverability</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            No regex, however strict, can tell you whether an email address actually exists or can receive mail.
            The only reliable way to confirm that is to send a verification email and require the user to click a
            confirmation link — treat regex validation as a fast, cheap first filter, not the final check.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What regex should I use to validate emails in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A practical, widely used pattern is <code>/^[^\s@]+@[^\s@]+\.[^\s@]+$/</code>. It checks for a local
              part, an @ symbol, a domain, and a dot-separated TLD, without whitespace, which covers the vast
              majority of real email addresses.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why not use a full RFC 5322 compliant email regex?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The full RFC 5322 specification is extremely complex and technically allows addresses most mail
              providers reject anyway (like quoted strings with spaces). A full-spec regex is hundreds of
              characters long, hard to maintain, and offers little practical benefit over a simpler pattern
              combined with a confirmation email.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is regex enough to confirm an email address is deliverable?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex only validates that the string is shaped like an email address. It cannot confirm the
              domain exists, has a mail server, or that the mailbox is active. The only reliable way to confirm
              deliverability is to send a verification email and require the user to click a confirmation link.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need a custom validation pattern for another field type? Describe it in plain English and get a
              tested regex instantly with Dev Brains AI&apos;s free AI Regex Generator.
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
              <li><Link href="/blog/regex-for-url-validation-javascript">Regex for URL Validation in JavaScript</Link></li>
              <li><Link href="/blog/regex-for-username-validation-rules">Regex for Username Validation Rules</Link></li>
              <li><Link href="/blog/regex-for-password-validation-rules">Regex for Password Validation Rules</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">How the AI Regex Generator Works</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
