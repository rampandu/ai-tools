// pages/hash-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { md5 } from '../lib/md5';

const DEFAULT_INPUT = 'hello world';

const EXAMPLES = [
  { label: 'hello world', text: 'hello world' },
  { label: 'Pangram sentence', text: 'The quick brown fox jumps over the lazy dog' },
  { label: 'JSON snippet', text: '{"id":42,"name":"Dev Brains AI","active":true}' },
];

const ALGORITHMS = [
  { key: 'md5', label: 'MD5', note: '128-bit — checksums only, not secure' },
  { key: 'sha1', label: 'SHA-1', note: '160-bit — deprecated for security' },
  { key: 'sha256', label: 'SHA-256', note: '256-bit — recommended default' },
  { key: 'sha512', label: 'SHA-512', note: '512-bit — larger digest, SHA-2 family' },
];

const FAQ = [
  {
    q: 'Is this Hash Generator free?',
    a: 'Yes — the Hash Generator on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Is my text sent to a server?',
    a: 'No. All four hashes are computed entirely in your browser — MD5 via a small JavaScript implementation and SHA-1/SHA-256/SHA-512 via the built-in Web Crypto API. Nothing you type is uploaded, logged, or stored on our servers.',
  },
  {
    q: 'Can I reverse a hash to get the original text back?',
    a: 'No. Hashing is a one-way function: it maps input of any size to a fixed-size digest, and there is no algorithm to compute the input from the digest. Attackers can only guess inputs and compare hashes (brute force, dictionaries, rainbow tables), which is why short or common inputs are effectively crackable even though the hash itself is irreversible.',
  },
  {
    q: 'Are MD5 and SHA-1 still safe to use?',
    a: 'Not for anything security-related. Both have practical collision attacks — two different inputs can be crafted to produce the same hash — so they must not be used for signatures, certificates, or password storage. They remain acceptable for non-security purposes like checksums, cache keys, and deduplication. For security, use SHA-256 or stronger.',
  },
  {
    q: 'Should I hash passwords with SHA-256?',
    a: 'No. Plain fast hashes (even SHA-256 or SHA-512) are the wrong tool for passwords because they can be brute-forced at billions of guesses per second on GPUs. Passwords should be hashed with a slow, salted, purpose-built algorithm such as bcrypt, scrypt, or Argon2, which are deliberately expensive to compute.',
  },
];

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [hashes, setHashes] = useState(null);
  const [uppercase, setUppercase] = useState(false);
  const [error, setError] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  async function computeHashes(text) {
    setError(null);
    try {
      const data = new TextEncoder().encode(text);
      const [sha1Buf, sha256Buf, sha512Buf] = await Promise.all([
        crypto.subtle.digest('SHA-1', data),
        crypto.subtle.digest('SHA-256', data),
        crypto.subtle.digest('SHA-512', data),
      ]);
      setHashes({
        md5: md5(text),
        sha1: bufferToHex(sha1Buf),
        sha256: bufferToHex(sha256Buf),
        sha512: bufferToHex(sha512Buf),
        inputLength: text.length,
      });
    } catch (err) {
      console.error(err);
      setError(
        'Could not compute hashes. Your browser must support the Web Crypto API (all modern browsers do) and the page must be served over HTTPS.'
      );
    }
  }

  // Auto-compute for the prefilled example on first mount (client-side only).
  useEffect(() => {
    computeHashes(DEFAULT_INPUT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function displayHash(hex) {
    return uppercase ? hex.toUpperCase() : hex;
  }

  async function handleCopy(key, value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (err) {
      console.error(err);
    }
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
    name: 'Dev Brains AI Hash Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free hash generator that computes MD5, SHA-1, SHA-256, and SHA-512 digests entirely in your browser. Paste text and get all four hex hashes instantly with copy buttons.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hash Generator', item: 'https://dev-brains-ai.com/hash-generator' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Hash Generator — MD5, SHA-1, SHA-256, SHA-512 | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text instantly. All four digests computed in your browser with copy buttons and an uppercase toggle. 100% client-side — nothing is uploaded."
        />
        <meta
          name="keywords"
          content="hash generator, md5 generator, sha256 generator, sha1 hash online, sha512 hash, checksum generator, online hash calculator, Dev Brains AI"
        />
        <meta property="og:title" content="Free Hash Generator — MD5, SHA-1, SHA-256, SHA-512" />
        <meta
          property="og:description"
          content="Paste any text and instantly get its MD5, SHA-1, SHA-256, and SHA-512 hex digests. Runs 100% in your browser — nothing is uploaded."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/hash-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/hash-generator" />

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
            <li aria-current="page">Hash Generator</li>
          </ol>
        </nav>

        <h1>Free Hash Generator</h1>
        <p className="small">
          Type or paste any text below and click <strong>Generate Hashes</strong> to compute its{' '}
          <strong>MD5</strong>, <strong>SHA-1</strong>, <strong>SHA-256</strong>, and{' '}
          <strong>SHA-512</strong> digests as hex strings. Everything runs in your browser —
          nothing you type is uploaded or stored.
        </p>

        <label htmlFor="hash-input">
          <strong>Text to hash</strong>
        </label>
        <textarea
          id="hash-input"
          aria-label="Text to hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ minHeight: 140, fontFamily: 'monospace' }}
          placeholder="Type or paste the text you want to hash..."
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={() => computeHashes(input)}>
            Generate Hashes
          </button>
          <button
            type="button"
            onClick={() => {
              setInput('');
              setHashes(null);
              setError(null);
            }}
          >
            Clear
          </button>
          <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase hex
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                className="small"
                onClick={() => {
                  setInput(ex.text);
                  computeHashes(ex.text);
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          {error && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {String(error)}
            </div>
          )}

          {hashes && (
            <div style={{ marginTop: 4 }}>
              <p className="small">
                Hashes for the current input ({hashes.inputLength} character
                {hashes.inputLength === 1 ? '' : 's'}):
              </p>
              {ALGORITHMS.map((algo) => (
                <div key={algo.key} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      marginBottom: 4,
                    }}
                  >
                    <strong>{algo.label}</strong>
                    <span className="small" style={{ color: '#64748b' }}>
                      {algo.note}
                    </span>
                    <button
                      type="button"
                      className="small"
                      onClick={() => handleCopy(algo.key, displayHash(hashes[algo.key]))}
                    >
                      {copiedKey === algo.key ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre
                    style={{
                      background: '#0f172a',
                      color: '#e2e8f0',
                      padding: 12,
                      borderRadius: 8,
                      overflowX: 'auto',
                      margin: 0,
                    }}
                  >
                    <code>{displayHash(hashes[algo.key])}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {!hashes && !error && (
            <div className="small">
              No result yet — press <strong>Generate Hashes</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this Hash Generator</h2>
        <p>
          A cryptographic hash function takes an input of any length and produces a fixed-size
          fingerprint called a digest. Change a single character in the input and the digest
          changes completely — a property called the avalanche effect. That makes hashes ideal for
          verifying file downloads, detecting accidental corruption, generating cache keys,
          deduplicating data, and (with the right algorithms) securing passwords and signatures.
          This free Hash Generator computes the four digests developers reach for most —{' '}
          <strong>MD5</strong>, <strong>SHA-1</strong>, <strong>SHA-256</strong>, and{' '}
          <strong>SHA-512</strong> — side by side, so you can compare, copy, and paste whichever
          format the task requires.
        </p>
        <p>
          Everything happens locally in your browser. MD5 is computed by a small JavaScript
          implementation of RFC 1321, while SHA-1, SHA-256, and SHA-512 use the browser&apos;s
          built-in Web Crypto API (<code>crypto.subtle.digest</code>), the same primitives that
          power TLS in your browser. There is no API call, no upload, and no storage — the text in
          the box never leaves your machine. Input is encoded as UTF-8 before hashing, which is
          the convention used by virtually every command-line tool and library, so the results
          here match what you would get from <code>sha256sum</code>, Python&apos;s{' '}
          <code>hashlib</code>, or Node.js&apos;s <code>crypto</code> module for the same text.
        </p>

        <h3>Hashing is one-way</h3>
        <p>
          Unlike encoding (reversible by design) and encryption (reversible with the key), hashing
          has no inverse. A digest is a deterministic summary, not a container: given only{' '}
          <code>5eb63bbbe01eeed093cb22bb8f5acdc3</code>, there is no computation that yields
          &quot;hello world&quot; back. The only way to &quot;reverse&quot; a hash is to guess
          candidate inputs, hash each one, and compare — which is exactly what brute-force and
          rainbow-table attacks do. This is why hashing short, predictable inputs (like plain
          passwords) provides far less protection than the math suggests: the attacker does not
          break the hash, they simply guess the input.
        </p>

        <h3>Which algorithm should you use?</h3>
        <ul>
          <li>
            <strong>MD5 (128-bit)</strong> — cryptographically broken. Practical collision attacks
            have existed since 2004, meaning attackers can construct two different inputs with the
            same MD5 digest. Never use it for signatures, certificates, or passwords. It remains
            fine for non-adversarial jobs: quick checksums, cache keys, ETags, and detecting
            accidental corruption.
          </li>
          <li>
            <strong>SHA-1 (160-bit)</strong> — also broken for security. Google demonstrated a
            practical collision (&quot;SHAttered&quot;) in 2017, and browsers and CAs have long
            rejected SHA-1 certificates. Like MD5, it is acceptable only for legacy compatibility
            and non-security checksums (Git historically used it for object IDs, paired with
            collision detection).
          </li>
          <li>
            <strong>SHA-256 (256-bit)</strong> — the current general-purpose default. Part of the
            SHA-2 family, with no practical attacks known. Use it for integrity verification,
            digital signatures, HMACs, and content addressing.
          </li>
          <li>
            <strong>SHA-512 (512-bit)</strong> — SHA-2 with a larger digest and 64-bit internal
            operations, which often makes it <em>faster</em> than SHA-256 on 64-bit CPUs. Choose
            it when you want a bigger security margin or your protocol specifies it.
          </li>
        </ul>

        <h3>Never store passwords as plain hashes</h3>
        <p>
          A common and dangerous mistake is storing user passwords as MD5 or SHA-256 digests. Fast
          hashes are designed to be fast — modern GPUs compute billions of SHA-256 hashes per
          second, so an unsalted fast hash of a typical password falls in seconds to dictionary
          attacks. Password storage needs the opposite: algorithms that are deliberately slow and
          memory-hard, with a unique salt per user. Use <strong>bcrypt</strong>,{' '}
          <strong>scrypt</strong>, or <strong>Argon2</strong> (the current recommendation from the
          Password Hashing Competition). If you are generating passwords rather than storing them,
          our <Link href="/password-generator">Password Generator</Link> creates strong random
          ones locally.
        </p>

        <h3>Common uses for this tool</h3>
        <ul>
          <li>
            <strong>Verify a download</strong> — hash the file&apos;s published test string or
            compare a vendor&apos;s published SHA-256 against your local <code>sha256sum</code>{' '}
            output, using this tool to sanity-check small text fixtures.
          </li>
          <li>
            <strong>Debug HMAC/signature code</strong> — confirm your code&apos;s intermediate
            digest for a known input matches the expected value before adding keys into the mix.
          </li>
          <li>
            <strong>Generate deterministic IDs</strong> — hash a canonical string (like a URL or a
            normalized JSON document) to get a stable identifier or cache key.
          </li>
          <li>
            <strong>Compare environments</strong> — hash configuration text on two machines to
            check whether the contents are byte-identical without eyeballing diffs.
          </li>
        </ul>
        <p>
          One caveat when comparing results across tools: whitespace counts. A trailing newline
          (which <code>echo</code> adds by default on the command line — use <code>echo -n</code>{' '}
          to suppress it) produces a completely different digest. If your hashes do not match
          another tool&apos;s, check for invisible characters first.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: Hash Generator</h3>
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
          Need reversible encoding instead? Try the{' '}
          <Link href="/base64-tool">Base64 Encoder/Decoder</Link>. Generating secrets? Use the{' '}
          <Link href="/password-generator">Password Generator</Link> or the{' '}
          <Link href="/uuid-generator">UUID Generator</Link>. To go deeper, read{' '}
          <Link href="/blog/md5-vs-sha256-which-hash-should-you-use">
            MD5 vs SHA-256: Which Hash Should You Use?
          </Link>
          ,{' '}
          <Link href="/blog/what-is-hashing-explained-for-beginners">
            What Is Hashing? Explained for Beginners
          </Link>
          , and{' '}
          <Link href="/blog/base64-encoding-vs-encryption-difference">
            Base64 Encoding vs Encryption: What&apos;s the Difference?
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
