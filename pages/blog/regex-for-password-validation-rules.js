import Head from 'next/head';
import Link from 'next/link';

export default function RegexForPasswordValidationRules() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Password Validation Rules',
        item: 'https://dev-brains-ai.com/blog/regex-for-password-validation-rules',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Password Validation Regex: 4 Rules, One Line (JS & Python)',
    description:
      'Enforce password strength — length, case, digits, symbols — with a single regex lookahead pattern. Includes ready-to-use JavaScript and Python code.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-password-validation-rules',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good regex for strong password validation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A common pattern is ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$. It uses lookaheads to require at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why use lookaheads instead of separate checks for password rules?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lookaheads let you enforce multiple independent conditions (uppercase present, digit present, length met) within a single regex without consuming characters, so all rules apply to the whole string at once instead of requiring a fixed character order.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should password strength be validated with regex on the frontend only?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Frontend regex validation improves user experience by giving instant feedback, but the same rules must be enforced on the backend too, since client-side JavaScript can be bypassed entirely by a direct API request.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Password Validation Regex: 4 Rules, One Line (JS & Python) | Dev Brains AI</title>
        <meta
          name="description"
          content="Enforce password strength — length, case, digits, symbols — with a single regex lookahead pattern. Includes ready-to-use JavaScript and Python code."
        />
        <meta
          name="keywords"
          content="regex for password validation, password strength regex, strong password regex javascript, password validation rules, regex lookahead password, password regex python"
        />
        <meta property="og:title" content="Password Validation Regex: 4 Rules, One Line (JS & Python)" />
        <meta property="og:description" content="Enforce password strength — length, case, digits, symbols — with a single regex lookahead pattern. Includes ready-to-use JavaScript and Python code." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-for-password-validation-rules" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-password-validation-rules" />
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
              <li aria-current="page">Password Validation Rules</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Password Validation Rules — Strength Checks That Work
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Enforcing password strength rules — minimum length, mixed case, digits, and special characters — is one
            of the most common form-validation tasks in any signup or account-settings flow. Regex lookaheads make
            this a one-line check instead of a chain of if-statements. This guide breaks down a production-ready
            password regex piece by piece and shows how to apply it in JavaScript and Python.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common password rules</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Most applications require some combination of the following:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Minimum length, usually 8 characters or more.</li>
            <li>At least one lowercase letter (a-z).</li>
            <li>At least one uppercase letter (A-Z).</li>
            <li>At least one digit (0-9).</li>
            <li>At least one special character (e.g. <code>!@#$%^&amp;*</code>).</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The password regex pattern</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Each <code>(?=...)</code> block is a positive lookahead — it checks that a condition exists somewhere
            ahead in the string without consuming characters, which is why you can stack four of them and still
            match the whole password with <code>.{'{8,}'}</code> at the end.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Breaking down each lookahead</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li><code>(?=.*[a-z])</code> — requires at least one lowercase letter anywhere in the string.</li>
            <li><code>(?=.*[A-Z])</code> — requires at least one uppercase letter anywhere in the string.</li>
            <li><code>(?=.*\d)</code> — requires at least one digit anywhere in the string.</li>
            <li><code>(?=.*[^A-Za-z0-9])</code> — requires at least one character that is not a letter or digit,
              covering symbols and punctuation.</li>
            <li><code>.{'{8,}'}</code> — the actual match, requiring at least 8 characters total.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>JavaScript example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isStrongPassword(password) {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return strongRegex.test(password);
}

console.log(isStrongPassword("Passw0rd!"));  // true
console.log(isStrongPassword("password1"));  // false - no uppercase, no symbol
console.log(isStrongPassword("Pass1!"));     // false - only 6 characters`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Python example</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import re

PASSWORD_REGEX = re.compile(
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$"
)

def is_strong_password(password: str) -> bool:
    return bool(PASSWORD_REGEX.match(password))

print(is_strong_password("Passw0rd!"))  # True
print(is_strong_password("PASSWORD1")) # False - no lowercase, no symbol`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Adjusting the rules for your app</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            You can tune the pattern to match your product's actual password policy:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Increase minimum length by changing <code>{'{8,}'}</code> to <code>{'{12,}'}</code> for stricter
              policies.</li>
            <li>Add an upper bound with <code>{'{8,64}'}</code> to reject unreasonably long input that could be
              used for denial-of-service attacks on your hashing function.</li>
            <li>Drop the special-character lookahead if your product intentionally allows simpler passwords in
              favor of passphrase-style, length-based strength (NIST's newer guidance leans this way).</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Also remember: regex validates format, not whether a password has been leaked in a breach. For serious
            account security, pair regex rules with a breached-password check (e.g. the HaveIBeenPwned API) and
            always hash passwords with bcrypt or Argon2 before storing them.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a good regex for strong password validation?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A common pattern is <code>^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{'{8,}'}$</code>. It uses
              lookaheads to require at least one lowercase letter, one uppercase letter, one digit, one special
              character, and a minimum length of 8.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why use lookaheads instead of separate checks for password rules?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Lookaheads let you enforce multiple independent conditions (uppercase present, digit present, length
              met) within a single regex without consuming characters, so all rules apply to the whole string at
              once instead of requiring a fixed character order.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should password strength be validated with regex on the frontend only?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Frontend regex validation improves user experience by giving instant feedback, but the same
              rules must be enforced on the backend too, since client-side JavaScript can be bypassed entirely by
              a direct API request.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Need a custom password policy or another validation pattern? Describe your rules in plain English and
              get a tested regex instantly with Dev Brains AI&apos;s free AI Regex Generator.
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
              <li><Link href="/blog/regex-lookahead-and-lookbehind-explained">Regex Lookahead and Lookbehind Explained</Link></li>
              <li><Link href="/blog/regex-for-username-validation-rules">Regex for Username Validation Rules</Link></li>
              <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation in JavaScript</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">How the AI Regex Generator Works</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
