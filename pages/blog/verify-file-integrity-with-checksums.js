// pages/blog/verify-file-integrity-with-checksums.js
import Head from 'next/head';
import Link from 'next/link';

export default function VerifyFileIntegrityWithChecksums() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Verify File Integrity with Checksums',
        item: 'https://dev-brains-ai.com/blog/verify-file-integrity-with-checksums',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Verify File Integrity with Checksums on Linux and Windows',
    description:
      'How to verify downloaded files with sha256sum, certutil, and Get-FileHash, compare against published hashes, why checksums catch corrupted and tampered downloads, and how to automate verification in CI.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/verify-file-integrity-with-checksums',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I check the SHA-256 checksum of a file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On Linux and macOS run "sha256sum filename" (or "shasum -a 256 filename" on macOS). On Windows run "certutil -hashfile filename SHA256" in Command Prompt or "Get-FileHash filename" in PowerShell. Compare the output against the hash published by the file provider — they must match exactly.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does it mean if a checksum does not match?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The file you have is not byte-for-byte the file the publisher hashed. Most often the download was corrupted or truncated — re-download it. If it still fails from a clean source, treat the file as untrustworthy: it may have been tampered with, and you should not run or install it.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which checksum algorithm should I use for file verification?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SHA-256 is the standard choice: it detects both accidental corruption and deliberate tampering. MD5 and SHA-1 still detect accidental corruption but are broken against attackers who can craft collisions, so prefer SHA-256 whenever the publisher offers it.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Verify File Integrity with Checksums (Linux &amp; Windows) | Dev Brains AI</title>
        <meta
          name="description"
          content="Verify downloads with sha256sum, certutil, and Get-FileHash. Compare published hashes, understand why checksums catch corrupted or tampered files, and automate checks in CI."
        />
        <meta
          name="keywords"
          content="verify file integrity, sha256sum check, certutil hashfile, Get-FileHash powershell, file checksum verification, verify download hash, sha256 checksum windows, checksum in ci pipeline"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/verify-file-integrity-with-checksums" />
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
              <li aria-current="page">Verify File Integrity with Checksums</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Verify File Integrity with Checksums on Linux and Windows
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Next to every serious software download — a Linux ISO, a Node.js installer, a database
            release — you will find a string like
            <code> a1b2c3...</code> labelled SHA-256. Most people ignore it. That string is a
            checksum: a fingerprint of the exact bytes the publisher released, and comparing it
            against a hash of your downloaded copy is the only way to know you got those bytes and
            not a corrupted — or tampered — file. This guide shows the exact commands on Linux,
            macOS, and Windows, what a mismatch means, and how to automate verification in CI so
            it never depends on someone remembering to do it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Checksums Matter
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A hash function like SHA-256 maps any file to a fixed-size digest, and a change to
            even one bit of the file produces a completely different digest. That single property
            catches two very different failure modes:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Accidental corruption</strong> — interrupted downloads, flaky Wi-Fi, failing disks, proxy mangling. A 4 GB ISO that lost a few packets will hash differently, and you find out <em>before</em> a cryptic install failure at minute 40.</li>
            <li><strong>Deliberate tampering</strong> — compromised mirrors and supply-chain attacks are not hypothetical. In 2016, the official Linux Mint site was hacked and its ISO replaced with a backdoored version; users who checked the checksum caught it, users who did not got malware with root access. Package repositories and CDNs have had similar incidents.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            One caveat: if an attacker controls the same page that hosts both the file and the
            hash, they can replace both. Checksums are strongest when the hash comes from a
            different channel than the file (the project&apos;s HTTPS site vs a mirror), or when
            the checksum file itself is GPG-signed.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Linux and macOS: sha256sum
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# Hash a single file
sha256sum ubuntu-24.04.iso
# 8d1b...f3a9  ubuntu-24.04.iso

# macOS ships shasum instead
shasum -a 256 ubuntu-24.04.iso

# Best practice: verify against the publisher's checksum file
# SHA256SUMS contains lines like:  <hash>  <filename>
sha256sum -c SHA256SUMS --ignore-missing
# ubuntu-24.04.iso: OK

# Compare a pasted hash without eyeballing 64 characters
echo "8d1b...f3a9  ubuntu-24.04.iso" | sha256sum -c -`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The <code>-c</code> (check) mode is the safest workflow: the tool does the comparison
            and prints <code>OK</code> or <code>FAILED</code>, eliminating the very human mistake
            of comparing only the first and last few characters of a long hex string.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Windows: certutil and Get-FileHash
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`:: Command Prompt (built into every Windows version)
certutil -hashfile node-v22.11.0-x64.msi SHA256
:: SHA256 hash of node-v22.11.0-x64.msi:
:: 5f8c1e...9d2b

# PowerShell (cleaner output, defaults to SHA256)
Get-FileHash .\\node-v22.11.0-x64.msi

# Other algorithms
Get-FileHash .\\file.zip -Algorithm SHA512

# Automatic comparison — prints True or False
(Get-FileHash .\\file.zip).Hash -eq "5F8C1E...9D2B"`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note that <code>Get-FileHash</code> outputs uppercase hex while most published hashes
            are lowercase — PowerShell&apos;s <code>-eq</code> is case-insensitive for strings, so
            the comparison above works either way.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reading a Mismatch Correctly
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>First mismatch:</strong> almost always a corrupted or incomplete download. Check the file size, then re-download.</li>
            <li><strong>Repeated mismatch from one mirror:</strong> try the project&apos;s primary site. Mirrors sometimes serve stale or broken files.</li>
            <li><strong>Mismatch from a clean primary source:</strong> stop. Do not run the file. Confirm you are hashing the right file with the right algorithm (SHA-256 hash compared against an SHA-512 value will obviously never match), then report it to the project.</li>
            <li><strong>Everything matches:</strong> you have byte-for-byte what the publisher hashed — corruption ruled out, and tampering ruled out to the extent you trust the channel the hash came from.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Automating Checksum Verification in CI
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Build pipelines download tools, binaries, and base artifacts constantly, and CI is
            exactly where a poisoned download does the most damage. Pin the expected hash in the
            repository and fail the build on mismatch:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# GitHub Actions / any bash-based CI
- name: Download and verify tool
  run: |
    curl -sSLo tool.tar.gz https://example.com/tool-1.4.2.tar.gz
    echo "d3ab...77e1  tool.tar.gz" | sha256sum -c - \\
      || { echo "CHECKSUM MISMATCH — aborting build"; exit 1; }
    tar -xzf tool.tar.gz

# Node.js script version (cross-platform)
const crypto = require('crypto');
const fs = require('fs');

const EXPECTED = 'd3ab...77e1';
const hash = crypto.createHash('sha256')
  .update(fs.readFileSync('tool.tar.gz'))
  .digest('hex');

if (hash !== EXPECTED) {
  console.error('Checksum mismatch:', hash);
  process.exit(1);
}`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Commit expected hashes to the repo so changes go through code review — a bumped hash in a diff is a visible, auditable event</li>
            <li>This is the same idea behind lockfile integrity: npm&apos;s <code>package-lock.json</code> stores an SHA-512 hash per package and refuses tampered tarballs automatically</li>
            <li>Publish checksums for your own release artifacts too — <code>sha256sum dist/* &gt; SHA256SUMS</code> as a release step costs one line</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I check the SHA-256 checksum of a file?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              On Linux and macOS run <code>sha256sum filename</code> (or <code>shasum -a 256 filename</code> on macOS). On Windows run <code>certutil -hashfile filename SHA256</code> or <code>Get-FileHash filename</code> in PowerShell. Compare the output with the publisher&apos;s hash — they must match exactly.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What does it mean if a checksum does not match?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Your file is not byte-for-byte the file the publisher hashed. Usually the download was corrupted — re-download it. If it still fails from a clean source, treat the file as untrustworthy and do not run it.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Which checksum algorithm should I use for file verification?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              SHA-256 is the standard: it detects both accidental corruption and deliberate tampering. MD5 and SHA-1 still catch accidental corruption but are broken against attackers who can craft collisions, so prefer SHA-256 whenever it is offered.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Hash Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly — computed entirely in
              your browser, nothing uploaded. No signup, no cost.
            </p>
            <Link href="/hash-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Hash Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/what-is-hashing-explained-for-beginners">What Is Hashing? Explained for Beginners</Link></li>
              <li><Link href="/blog/md5-vs-sha256-which-hash-should-you-use">MD5 vs SHA-256 — Which Hash Should You Use?</Link></li>
              <li><Link href="/blog/hash-collisions-explained">Hash Collisions Explained</Link></li>
              <li><Link href="/blog/password-hashing-bcrypt-vs-sha256">Password Hashing — bcrypt vs SHA-256</Link></li>
              <li><Link href="/blog/base64-encoding-vs-encryption-difference">Base64 Encoding vs Encryption — The Difference</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
