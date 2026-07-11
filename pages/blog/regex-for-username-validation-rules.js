// pages/blog/regex-for-username-validation-rules.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForUsernameValidationRules() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Username Validation Rules',
        item: 'https://dev-brains-ai.com/blog/regex-for-username-validation-rules',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Username Validation Rules — Length, Characters, and Common Patterns',
    description:
      'Common username validation rules — length limits, allowed characters, no leading digits, no consecutive special characters — with working regex examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-username-validation-rules',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good regex for basic username validation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A common pattern is ^[a-zA-Z][a-zA-Z0-9_]{2,19}$, which requires the username to start with a letter and be 3-20 characters total, allowing letters, digits, and underscores.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prevent consecutive special characters in a username?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a negative lookahead like ^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}$, which rejects any username containing two dots, two underscores, or a dot-underscore pair next to each other.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should username validation be case-sensitive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most platforms treat usernames as case-insensitive for uniqueness (storing a lowercase version for comparison) while still allowing the user to pick their preferred display casing. Validate the pattern normally, but compare/store a lowercased copy for duplicate checks.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Username Validation Rules (Length, Characters) | Dev Brains AI</title>
        <meta
          name="description"
          content="Common username validation rules — length limits, allowed characters, no leading digits, no consecutive special characters — with regex examples."
        />
        <meta
          name="keywords"
          content="username regex, username validation regex, regex for username javascript, valid username pattern, username rules regex"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-username-validation-rules" />
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
              <li aria-current="page">Regex for Username Validation Rules</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Username Validation Rules — Length, Characters, and Common Patterns
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every signup form needs username rules, but the "right" rules vary by platform. This
            guide walks through the most common constraints — length, allowed characters, leading
            character rules, and consecutive special characters — with regex you can drop straight
            into a form validator.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Username Rules
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Length</strong> — typically 3 to 20 or 3 to 30 characters</li>
            <li><strong>Allowed characters</strong> — letters, digits, underscore, sometimes a dot or hyphen</li>
            <li><strong>No leading digit</strong> — many systems require the first character to be a letter</li>
            <li><strong>No consecutive special characters</strong> — reject things like <code>john..doe</code> or <code>john__doe</code></li>
            <li><strong>No leading/trailing special characters</strong> — reject <code>_john</code> or <code>john_</code></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Basic Username Regex
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A simple rule: start with a letter, 3-20 characters total, letters/digits/underscore allowed:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const basicUsername = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

basicUsername.test('john_doe99');  // true
basicUsername.test('9johndoe');    // false — cannot start with a digit
basicUsername.test('jo');          // false — too short (needs 3+)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Allowing Dots and Hyphens (Social Platform Style)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Platforms like Instagram and GitHub allow dots or hyphens but disallow them at the start,
            end, or consecutively. This needs a negative lookahead:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// 3-20 chars, letters/digits/dot/underscore, no leading/trailing/consecutive special chars
const socialUsername = /^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[_.]$)[a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$/;

socialUsername.test('john.doe');    // true
socialUsername.test('john..doe');   // false — two dots in a row
socialUsername.test('.johndoe');    // false — cannot start with a dot
socialUsername.test('johndoe.');    // false — cannot end with a dot
socialUsername.test('john_doe-99'); // false — hyphen not in the allowed set here`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Breaking this down: <code>(?!.*[_.]{'{2}'})</code> is a negative lookahead that rejects
            any string containing two special characters in a row anywhere; the surrounding groups
            enforce that the first and last characters are alphanumeric.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            GitHub-Style Username Rules
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            GitHub usernames may only contain alphanumeric characters or single hyphens, and cannot
            begin or end with a hyphen:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const githubStyle = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

githubStyle.test('dev-brains-ai');  // true
githubStyle.test('-devbrains');     // false — starts with hyphen
githubStyle.test('dev--brains');    // false — consecutive hyphens`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Building a Configurable Validator
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            In practice it's cleaner to validate rules separately rather than cramming everything
            into one giant regex — easier to test and to show specific error messages:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function validateUsername(username) {
  const errors = [];

  if (!/^.{3,20}$/.test(username)) errors.push('Must be 3-20 characters');
  if (!/^[a-zA-Z]/.test(username)) errors.push('Must start with a letter');
  if (!/^[a-zA-Z0-9_]+$/.test(username)) errors.push('Only letters, digits, and underscores allowed');
  if (/[_]{2,}/.test(username)) errors.push('No consecutive underscores');

  return { valid: errors.length === 0, errors };
}

validateUsername('john__doe');
// { valid: false, errors: ['No consecutive underscores'] }`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a good regex for basic username validation?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A common pattern is <code>{'^[a-zA-Z][a-zA-Z0-9_]{2,19}$'}</code>, which requires the
              username to start with a letter and be 3-20 characters total, allowing letters, digits,
              and underscores.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I prevent consecutive special characters in a username?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use a negative lookahead like <code>{'^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}$'}</code>, which
              rejects any username containing two dots, two underscores, or a dot-underscore pair
              next to each other.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should username validation be case-sensitive?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Most platforms treat usernames as case-insensitive for uniqueness (storing a lowercase
              version for comparison) while still allowing the user to pick their preferred display
              casing. Validate the pattern normally, but compare/store a lowercased copy for duplicate checks.
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
              <li><Link href="/blog/regex-for-password-validation-rules">Regex for Password Validation Rules</Link></li>
              <li><Link href="/blog/regex-lookahead-and-lookbehind-explained">Regex Lookahead and Lookbehind Explained</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-for-email-validation-javascript-example">Regex for Email Validation (JavaScript Example)</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
