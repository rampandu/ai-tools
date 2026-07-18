// pages/password-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?~';
const AMBIGUOUS = new Set(['0', 'O', '1', 'l', 'I']);

function buildPool({ lower, upper, digits, symbols, excludeAmbiguous }) {
  let pool = '';
  if (lower) pool += LOWER;
  if (upper) pool += UPPER;
  if (digits) pool += DIGITS;
  if (symbols) pool += SYMBOLS;
  if (excludeAmbiguous) {
    pool = pool
      .split('')
      .filter((ch) => !AMBIGUOUS.has(ch))
      .join('');
  }
  return pool;
}

function generatePassword(length, pool) {
  const poolSize = pool.length;
  if (poolSize === 0) return '';
  // Rejection sampling: discard bytes >= limit so every pool character
  // is equally likely (avoids modulo bias).
  const limit = Math.floor(256 / poolSize) * poolSize;
  const chars = [];
  const buf = new Uint8Array(length * 2);
  while (chars.length < length) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < buf.length && chars.length < length; i++) {
      if (buf[i] < limit) {
        chars.push(pool[buf[i] % poolSize]);
      }
    }
  }
  return chars.join('');
}

function entropyInfo(length, poolSize) {
  if (poolSize === 0) return { bits: 0, label: 'No charset selected', color: 'crimson', pct: 0 };
  const bits = Math.round(length * Math.log2(poolSize));
  let label;
  let color;
  if (bits < 50) {
    label = 'Weak';
    color = 'crimson';
  } else if (bits < 70) {
    label = 'Fair';
    color = '#b45309';
  } else if (bits < 90) {
    label = 'Strong';
    color = '#16a34a';
  } else {
    label = 'Very strong';
    color = '#0d9488';
  }
  const pct = Math.min(100, Math.round((bits / 128) * 100));
  return { bits, label, color, pct };
}

const FAQ = [
  {
    q: 'Is this Password Generator free?',
    a: 'Yes — the Password Generator on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Are the generated passwords sent to a server?',
    a: 'No. Passwords are generated entirely in your browser using the Web Crypto API (crypto.getRandomValues). Nothing is uploaded, logged, or stored on our servers — the password never leaves your device unless you copy it somewhere yourself.',
  },
  {
    q: 'How random are these passwords?',
    a: 'The generator uses crypto.getRandomValues, the browser’s cryptographically secure random number generator, combined with rejection sampling so every character in the pool is equally likely (no modulo bias). This is the same class of randomness used for cryptographic keys.',
  },
  {
    q: 'Should I still use a password manager?',
    a: 'Yes, absolutely. A generator solves the "create a strong password" problem, but a password manager solves the bigger one: remembering a unique password for every account. Generate here if you like, but store the result in a reputable password manager rather than reusing it across sites.',
  },
  {
    q: 'What matters more — length or complexity?',
    a: 'Length. Each extra character multiplies the search space by the whole pool size, while adding a symbol set only enlarges the pool slightly. A 20-character lowercase-only password (about 94 bits) is far stronger than an 8-character password using every character class (about 52 bits).',
  },
];

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const options = { lower, upper, digits, symbols, excludeAmbiguous };
  const pool = buildPool(options);
  const noCharset = pool.length === 0;
  const entropy = entropyInfo(length, pool.length);

  function handleGenerate() {
    setCopied(false);
    const p = buildPool({ lower, upper, digits, symbols, excludeAmbiguous });
    if (p.length === 0) {
      setPassword('');
      return;
    }
    setPassword(generatePassword(length, p));
  }

  // Generate the first password only after mount — never during render —
  // so the server-rendered HTML matches the client (no hydration mismatch).
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, lower, upper, digits, symbols, excludeAmbiguous]);

  async function handleCopy() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Clipboard API unavailable; nothing else to do client-side.
    }
  }

  function toggleCharset(setter, value, others) {
    // Require at least one charset to stay enabled.
    if (value && others.every((o) => !o)) return;
    setter(!value);
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dev Brains AI Password Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free strong password generator that runs entirely in your browser using the Web Crypto API. Choose length and character sets, exclude ambiguous characters, and see an entropy-based strength meter.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Password Generator', item: 'https://dev-brains-ai.com/password-generator' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Strong Password Generator — Secure &amp; Client-Side | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate strong random passwords in your browser with crypto.getRandomValues. Choose length (8-64), character sets, exclude ambiguous characters, and see the entropy in bits. 100% client-side — nothing is uploaded."
        />
        <meta
          name="keywords"
          content="password generator, strong password generator, random password, secure password generator online, password entropy, crypto random password, Dev Brains AI"
        />
        <meta property="og:title" content="Free Strong Password Generator — Secure &amp; Client-Side" />
        <meta
          property="og:description"
          content="Generate cryptographically secure random passwords with a live entropy meter. Runs 100% in your browser — nothing is uploaded or stored."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/password-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/password-generator" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="card" aria-live="polite">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Password Generator</li>
          </ol>
        </nav>

        <h1>Free Strong Password Generator</h1>
        <p className="small">
          Generate a cryptographically secure random password right in your browser. Pick a length
          and character sets, and the tool uses <code>crypto.getRandomValues</code> with rejection
          sampling for unbiased, high-entropy output. Everything runs locally; nothing is uploaded
          or stored.
        </p>

        <label htmlFor="pw-output">
          <strong>Generated password</strong>
        </label>
        <input
          id="pw-output"
          type="text"
          readOnly
          aria-label="Generated password"
          value={password}
          style={{
            width: '100%',
            fontFamily: 'monospace',
            fontSize: 18,
            padding: '10px 12px',
            marginTop: 6,
          }}
          onFocus={(e) => e.target.select()}
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleGenerate} disabled={noCharset}>
            Regenerate
          </button>
          <button type="button" onClick={handleCopy} disabled={!password}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Entropy meter */}
        <div style={{ marginTop: 14 }}>
          <div className="small" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              Entropy: <strong>{entropy.bits} bits</strong>
            </span>
            <strong style={{ color: entropy.color }}>{entropy.label}</strong>
          </div>
          <div
            role="progressbar"
            aria-label="Password strength"
            aria-valuenow={entropy.bits}
            aria-valuemin={0}
            aria-valuemax={128}
            style={{
              height: 10,
              background: '#e6eef2',
              borderRadius: 6,
              marginTop: 6,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${entropy.pct}%`,
                height: '100%',
                background: entropy.color,
                borderRadius: 6,
                transition: 'width 0.2s, background 0.2s',
              }}
            />
          </div>
        </div>

        {/* Options */}
        <div style={{ marginTop: 16 }}>
          <label htmlFor="pw-length">
            <strong>Length: {length}</strong>
          </label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6 }}>
            <input
              id="pw-length"
              type="range"
              min={8}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ flex: 1 }}
              aria-label="Password length"
            />
            <input
              type="number"
              min={8}
              max={64}
              value={length}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v)) setLength(Math.min(64, Math.max(8, v)));
              }}
              style={{ width: 70 }}
              aria-label="Password length (number)"
            />
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 12 }} className="small">
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={lower}
                onChange={() => toggleCharset(setLower, lower, [upper, digits, symbols])}
              />
              lowercase (a-z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={upper}
                onChange={() => toggleCharset(setUpper, upper, [lower, digits, symbols])}
              />
              UPPERCASE (A-Z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={digits}
                onChange={() => toggleCharset(setDigits, digits, [lower, upper, symbols])}
              />
              digits (0-9)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={symbols}
                onChange={() => toggleCharset(setSymbols, symbols, [lower, upper, digits])}
              />
              symbols (!@#$…)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={() => setExcludeAmbiguous(!excludeAmbiguous)}
              />
              exclude ambiguous (0/O, 1/l/I)
            </label>
          </div>
          <p className="small" style={{ marginTop: 8 }}>
            At least one character set must stay enabled. Current pool size:{' '}
            <strong>{pool.length}</strong> characters.
          </p>
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this Password Generator</h2>
        <p>
          Humans are famously bad at inventing random passwords. We reach for words, dates, and
          keyboard patterns — exactly the things password-cracking tools try first. This free
          Password Generator removes the human from the loop: it asks your browser&apos;s
          cryptographically secure random number generator (<code>crypto.getRandomValues</code>,
          part of the Web Crypto API) for random bytes and maps them onto your chosen character
          pool. The result is a password with no structure to exploit, whose strength can be
          measured precisely in bits of entropy.
        </p>
        <p>
          Everything happens on your device. There is no API call, no analytics event carrying the
          password, and no storage — the password exists only in the box above until you copy it.
          Refreshing the page discards it forever.
        </p>

        <h3>How the generator avoids modulo bias</h3>
        <p>
          A common mistake in homemade generators is mapping a random byte (0-255) onto a character
          pool with <code>byte % poolSize</code>. Unless the pool size divides 256 evenly, the
          first few characters of the pool come up slightly more often — a small but real bias
          that reduces effective entropy. This tool uses <strong>rejection sampling</strong>
          instead: any byte greater than or equal to the largest multiple of the pool size below
          256 is simply discarded and a fresh byte is drawn. Every character in the pool is exactly
          equally likely.
        </p>

        <h3>Reading the entropy meter</h3>
        <p>
          Entropy measures how many guesses an attacker would need on average. It is calculated as{' '}
          <code>length × log2(poolSize)</code> — each character contributes{' '}
          <code>log2(poolSize)</code> bits. The meter uses these bands:
        </p>
        <ul>
          <li>
            <strong>Weak (under 50 bits)</strong> — crackable offline in hours to days with modern
            GPU rigs. Avoid for anything that matters.
          </li>
          <li>
            <strong>Fair (50-69 bits)</strong> — acceptable for low-value accounts protected by
            rate limiting, but not for offline-attackable secrets.
          </li>
          <li>
            <strong>Strong (70-89 bits)</strong> — a good default for most accounts.
          </li>
          <li>
            <strong>Very strong (90+ bits)</strong> — appropriate for password-manager master
            passwords, disk encryption, and long-lived secrets.
          </li>
        </ul>
        <p>
          Notice how the meter responds as you drag the length slider: going from 12 to 20
          characters does far more than toggling the symbols checkbox. Length multiplies the search
          space per character; complexity only enlarges the pool a little. When in doubt, make it
          longer.
        </p>

        <h3>Why exclude ambiguous characters?</h3>
        <p>
          The characters <code>0</code>/<code>O</code> and <code>1</code>/<code>l</code>/
          <code>I</code> look nearly identical in many fonts. If a password will ever be read
          aloud, printed, or typed from a screen (Wi-Fi passwords, temporary credentials shared
          over a call), excluding them prevents frustrating transcription errors. The entropy cost
          is tiny — the meter updates so you can see exactly how tiny. For passwords that live
          only in a password manager, there is no reason to exclude anything.
        </p>

        <h3>Tips for using generated passwords well</h3>
        <ul>
          <li>
            <strong>Use a password manager.</strong> A unique random password per site is only
            practical if software remembers them for you. Generate, store, forget.
          </li>
          <li>
            <strong>Never reuse a password</strong> — credential-stuffing attacks replay leaked
            passwords against every popular service.
          </li>
          <li>
            <strong>Enable two-factor authentication</strong> where offered; even a very strong
            password benefits from a second factor.
          </li>
          <li>
            <strong>Prefer length over rules.</strong> If a site forces short passwords with
            complexity rules, max out the allowed length anyway.
          </li>
          <li>
            <strong>Regenerate freely.</strong> Passwords here are free and instant — if one gets
            pasted somewhere questionable, just make a new one.
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: Password Generator</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Need other random identifiers? Try the <Link href="/uuid-generator">UUID Generator</Link>,
          or hash data with the <Link href="/hash-generator">Hash Generator</Link>. To go deeper,
          read{' '}
          <Link href="/blog/password-entropy-explained-length-vs-complexity">
            Password Entropy Explained: Length vs Complexity
          </Link>
          ,{' '}
          <Link href="/blog/how-to-create-strong-passwords-guide">
            How to Create Strong Passwords
          </Link>
          , and{' '}
          <Link href="/blog/regex-for-password-validation-rules">
            Regex for Password Validation Rules
          </Link>
          .
        </p>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: password security</h3>
        <ul className="small">
          <li><Link href="/blog/how-to-create-strong-passwords-guide">How to Create Strong Passwords — A Practical Guide</Link></li>
          <li><Link href="/blog/password-entropy-explained-length-vs-complexity">Password Entropy Explained — Length vs Complexity</Link></li>
          <li><Link href="/blog/passphrases-vs-random-passwords">Passphrases vs Random Passwords — Which Should You Use?</Link></li>
          <li><Link href="/blog/how-password-managers-work">How Password Managers Work — Under the Hood</Link></li>
          <li><Link href="/blog/common-password-attacks-explained">Common Password Attacks Explained</Link></li>
        </ul>
      </div>

    </div>
  );
}
