// pages/blog/regex-for-ipv4-address-validation.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForIpv4AddressValidation() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for IPv4 Address Validation',
        item: 'https://dev-brains-ai.com/blog/regex-for-ipv4-address-validation',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for IPv4 Address Validation — Getting the Octet Range Right',
    description:
      'A correct regex for validating IPv4 addresses, explaining the common mistake of allowing octets above 255 and how to fix it properly.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-ipv4-address-validation',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does \\d{1,3} for each octet not work for IPv4 validation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because \\d{1,3} matches any one-to-three digit number, including values above 255 like 999 or 256, which are not valid IPv4 octets (0-255). It needs to be replaced with an explicit numeric range pattern.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the correct regex for validating an IPv4 address?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A correct pattern is ^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$, which restricts each of the four octets to the valid 0-255 range.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this regex also validate IPv6 addresses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. IPv6 uses a completely different address format with hexadecimal groups separated by colons, such as 2001:0db8:85a3::8a2e:0370:7334, and needs its own dedicated regex or, better, the built-in URL/net parsing utilities in your language.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for IPv4 Address Validation (Correct Octet Range) | Dev Brains AI</title>
        <meta
          name="description"
          content="A correct regex for validating IPv4 addresses, explaining the common mistake of allowing octets above 255 and how to fix it properly."
        />
        <meta
          name="keywords"
          content="ipv4 regex, ip address validation regex, regex ip address javascript, valid ip regex, octet range regex"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-ipv4-address-validation" />
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
              <li aria-current="page">Regex for IPv4 Address Validation</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for IPv4 Address Validation — Getting the Octet Range Right
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            IPv4 validation looks trivial until you realize the naive "four groups of digits
            separated by dots" pattern accepts garbage like <code>999.999.999.999</code>. This guide
            walks through the common mistake, the correct fix, and a few real-world variations you
            will need for CIDR ranges and private IP detection.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Common Mistake
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            An IPv4 address is four "octets" (0-255) separated by dots. The tempting shortcut is to
            match 1-3 digits per octet — but digits alone don't enforce the 0-255 ceiling:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// WRONG — accepts invalid octets above 255
const naiveIp = /^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/;

naiveIp.test('192.168.1.1');       // true  (correct)
naiveIp.test('999.999.999.999');   // true  (WRONG — should be false!)
naiveIp.test('300.1.1.1');         // true  (WRONG — 300 is not a valid octet)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Correct Pattern
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Each octet needs an explicit alternation that covers three numeric ranges: 250-255,
            200-249, and 0-199 (with optional leading zero forms):
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const octet = '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
const ipv4Regex = new RegExp('^' + octet + '\\\\.' + octet + '\\\\.' + octet + '\\\\.' + octet + '$');

// Equivalent inline form:
const ipv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

ipv4.test('192.168.1.1');      // true
ipv4.test('255.255.255.255');  // true
ipv4.test('999.999.999.999');  // false — correctly rejected
ipv4.test('300.1.1.1');        // false — correctly rejected
ipv4.test('0.0.0.0');          // true`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Breaking down the octet group <code>{'(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'}</code>:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><code>25[0-5]</code> — matches 250 through 255</li>
            <li><code>2[0-4][0-9]</code> — matches 200 through 249</li>
            <li><code>[01]?[0-9][0-9]?</code> — matches 0 through 199 (with 1-3 digits, optional leading 0/1 hundreds digit)</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reusable Named-Group Version
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If you need to extract each octet individually (for logging, sorting, or CIDR math), use
            named capture groups:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const ipv4Named = /^(?<a>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?<b>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?<c>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?<d>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const match = '192.168.1.1'.match(ipv4Named);
console.log(match.groups); // { a: '192', b: '168', c: '1', d: '1' }`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Detecting Private / Reserved IP Ranges
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A common follow-up need is checking whether a validated IP falls in a private range
            (useful for firewall rules, log filtering, or access control):
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>10.0.0.0 – 10.255.255.255</strong> — <code>/^10\./</code></li>
            <li><strong>172.16.0.0 – 172.31.255.255</strong> — <code>/^172\.(1[6-9]|2[0-9]|3[01])\./</code></li>
            <li><strong>192.168.0.0 – 192.168.255.255</strong> — <code>/^192\.168\./</code></li>
            <li><strong>127.0.0.0 – 127.255.255.255 (loopback)</strong> — <code>/^127\./</code></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does \d{'{1,3}'} for each octet not work for IPv4 validation?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Because <code>{'\\d{1,3}'}</code> matches any one-to-three digit number, including
              values above 255 like 999 or 256, which are not valid IPv4 octets (0-255). It needs to
              be replaced with an explicit numeric range pattern.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the correct regex for validating an IPv4 address?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A correct pattern is{' '}
              <code>{'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'}</code>,
              which restricts each of the four octets to the valid 0-255 range.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does this regex also validate IPv6 addresses?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. IPv6 uses a completely different address format with hexadecimal groups separated
              by colons, such as 2001:0db8:85a3::8a2e:0370:7334, and needs its own dedicated regex
              or, better, the built-in URL/net parsing utilities in your language.
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
              <li><Link href="/blog/regex-cheat-sheet-for-backend-developers">Regex Cheat Sheet for Backend Developers</Link></li>
              <li><Link href="/blog/top-50-useful-regex-patterns-for-developers">Top 50 Useful Regex Patterns for Developers</Link></li>
              <li><Link href="/blog/regex-performance-and-catastrophic-backtracking">Regex Performance and Catastrophic Backtracking</Link></li>
              <li><Link href="/blog/regex-for-url-validation-javascript">Regex for URL Validation in JavaScript</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
