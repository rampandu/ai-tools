// pages/blog/regex-for-credit-card-validation.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForCreditCardValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Credit Card Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-credit-card-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Credit Card Validation — Patterns for Visa, Mastercard, Amex & RuPay',
    description:
      'Regex patterns to validate major credit card number formats — Visa, Mastercard, Amex, RuPay, Discover — plus why you also need the Luhn algorithm for real validity.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-credit-card-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can regex fully validate a credit card number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Regex can only confirm that a number matches the expected prefix and length pattern for a card network. It cannot verify that the number is a real, issuable card — that requires the Luhn checksum algorithm and, ultimately, the issuing bank.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Luhn algorithm and why is it needed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Luhn algorithm is a checksum formula used to validate a range of identification numbers, including credit cards. It catches accidental single-digit errors and transpositions that a regex pattern cannot detect, since regex only checks format, not the mathematical checksum digit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What regex matches a Visa card number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visa card numbers start with 4 and are 13 or 16 digits long. The regex ^4[0-9]{12}(?:[0-9]{3})?$ matches both lengths.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Credit Card Validation — Visa, Mastercard, Amex, RuPay | Dev Brains AI</title>
        <meta
          name="description"
          content="Regex patterns to validate major credit card formats — Visa, Mastercard, Amex, RuPay, Discover — plus why you also need the Luhn algorithm for real validity."
        />
        <meta
          name="keywords"
          content="regex credit card validation, credit card number regex, visa mastercard amex regex, luhn algorithm, rupay card regex, javascript credit card validation"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-credit-card-validation" />
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
              <li aria-current="page">Regex for Credit Card Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Credit Card Validation — Patterns for Visa, Mastercard, Amex & RuPay
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every major card network uses a different prefix range (the "IIN" or "BIN") and a
            different total digit length. Regex is a fast first-line check for these formats —
            useful for client-side UX before you hit a payment gateway — but it can never confirm
            that a card number is real. This guide covers the regex patterns for each network and
            explains why you still need the Luhn algorithm on top.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Card Number Formats by Network
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Card networks are identified by the first one to six digits, and each network has a
            fixed set of valid lengths:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Visa</strong> — starts with 4, length 13 or 16 digits</li>
            <li><strong>Mastercard</strong> — starts with 51–55 or 2221–2720, length 16 digits</li>
            <li><strong>American Express (Amex)</strong> — starts with 34 or 37, length 15 digits</li>
            <li><strong>Discover</strong> — starts with 6011, 65, or 644–649, length 16 digits</li>
            <li><strong>RuPay (India)</strong> — starts with 60, 6521, 6522, 508, 353, or 356, length 16 digits</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Regex Patterns for Each Network
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Visa: starts with 4, 13 or 16 digits
const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;

// Mastercard: 51-55 or 2221-2720, 16 digits
const mastercard = /^(5[1-5][0-9]{14}|222[1-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12})$/;

// American Express: 34 or 37, 15 digits
const amex = /^3[47][0-9]{13}$/;

// Discover: 6011, 65, or 644-649, 16 digits
const discover = /^6(?:011|5[0-9]{2}|4[4-9][0-9])[0-9]{12}$/;

// RuPay (common issuer ranges): 60, 6521, 6522, 508, 353, 356
const rupay = /^(60|6521|6522|508|353|356)[0-9]{13,14}$/;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Combined Detection Function
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            In practice you usually want to detect which network a number belongs to, then show the
            matching card logo in your UI:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function detectCardNetwork(number) {
  const clean = number.replace(/[\\s-]/g, '');

  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    rupay: /^(60|6521|6522|508|353|356)[0-9]{13,14}$/,
  };

  for (const [network, pattern] of Object.entries(patterns)) {
    if (pattern.test(clean)) return network;
  }
  return 'unknown';
}

detectCardNetwork('4111 1111 1111 1111'); // 'visa'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Regex Alone Is Not Enough — the Luhn Algorithm
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A regex match only proves the number "looks like" a card from a given network — it does
            not prove the number is mathematically valid. Every real card number includes a check
            digit computed with the Luhn algorithm. If a user mistypes a digit or transposes two
            digits, the Luhn check will almost always catch it, while a regex pattern will happily
            accept the typo as long as the length and prefix still match.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function isValidLuhn(number) {
  const digits = number.replace(/\\D/g, '').split('').reverse().map(Number);

  const sum = digits.reduce((acc, digit, i) => {
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    return acc + digit;
  }, 0);

  return sum % 10 === 0;
}

isValidLuhn('4111111111111111'); // true  (Visa test number)
isValidLuhn('4111111111111112'); // false (fails checksum)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The correct validation pipeline is: strip spaces/dashes → check length and prefix with
            regex → run the Luhn check → then, for actual payments, let your payment gateway (Razorpay,
            Stripe, PayU) do the real authorization. Never rely on client-side checks alone for
            security-sensitive decisions.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Best Practices for Card Input Fields
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Strip all non-digit characters before validating (users type spaces and dashes)</li>
            <li>Run network detection first so you can show real-time card branding as they type</li>
            <li>Apply the Luhn check only after the full length is entered, not on every keystroke</li>
            <li>Never log or store raw card numbers — use tokenization from your payment provider</li>
            <li>Always validate server-side too; client regex is only a UX convenience, not security</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Can regex fully validate a credit card number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Regex can only confirm that a number matches the expected prefix and length pattern
              for a card network. It cannot verify that the number is a real, issuable card — that
              requires the Luhn checksum algorithm and, ultimately, the issuing bank.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the Luhn algorithm and why is it needed?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The Luhn algorithm is a checksum formula used to validate a range of identification
              numbers, including credit cards. It catches accidental single-digit errors and
              transpositions that a regex pattern cannot detect, since regex only checks format, not
              the mathematical checksum digit.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What regex matches a Visa card number?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Visa card numbers start with 4 and are 13 or 16 digits long. The regex{' '}
              <code>{'^4[0-9]{12}(?:[0-9]{3})?$'}</code> matches both lengths.
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
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/regex-for-ipv4-address-validation">Regex for IPv4 Address Validation</Link></li>
              <li><Link href="/blog/regex-performance-and-catastrophic-backtracking">Regex Performance and Catastrophic Backtracking</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
