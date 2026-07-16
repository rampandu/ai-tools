// pages/blog/how-password-managers-work.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowPasswordManagersWork() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How Password Managers Work — Under the Hood',
        item: 'https://dev-brains-ai.com/blog/how-password-managers-work',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How Password Managers Work — KDFs, Encrypted Vaults, and Zero-Knowledge Explained',
    description:
      'A technical but readable tour of password manager internals: master password to KDF (PBKDF2/Argon2) to AES-256 encrypted vault, zero-knowledge architecture, sync, and why autofill blocks phishing.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-password-managers-work',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can a password manager company see my passwords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not in a zero-knowledge design. Your master password never leaves your device; it is run through a key-derivation function locally, and only the already-encrypted vault is synced. The company stores ciphertext it cannot decrypt.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if my password manager gets breached?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Attackers obtain encrypted vault blobs. To read yours, they must brute-force your master password through the KDF — which is deliberately slow. A strong 6-word passphrase master password keeps the vault computationally out of reach; a weak master password is the real risk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is browser autofill safe to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Manager autofill is a security feature: it fills credentials only when the page domain matches the saved entry, so a phishing lookalike domain gets nothing. That domain check catches attacks that fool human eyes.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How Password Managers Work — Under the Hood | Dev Brains AI</title>
        <meta
          name="description"
          content="Master password → KDF (PBKDF2/Argon2) → AES-256 encrypted vault. Zero-knowledge architecture, sync and breach implications, and why autofill blocks phishing."
        />
        <meta
          name="keywords"
          content="how password managers work, zero knowledge encryption, PBKDF2, Argon2, AES-256 vault, password manager security, autofill phishing protection, master password"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-password-managers-work" />
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
              <li aria-current="page">How Password Managers Work</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How Password Managers Work — KDFs, Encrypted Vaults, and Zero-Knowledge Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            "Put all your passwords in one place" sounds like the worst security advice possible —
            until you look at how that place is built. A modern password manager is a carefully
            engineered cryptographic system in which even the company running it cannot read your
            data. This post walks through the pipeline from master password to encrypted vault,
            what actually happens during sync and breaches, and why autofill is a phishing defence
            rather than a convenience.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Pipeline: Master Password → KDF → Vault Key
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Your master password is never used directly as an encryption key, and it is never sent
            to a server. Instead it goes through a <strong>key-derivation function (KDF)</strong> on
            your own device:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`master password ("ferry-cactus-nylon-orbit-squad-lava")
        │
        ▼
KDF: PBKDF2 (600,000+ iterations) or Argon2id
  + per-user random salt
        │
        ▼
256-bit vault key  ──►  AES-256 encrypt/decrypt vault
        │
        ▼ (separately derived)
auth hash  ──►  sent to server to prove identity
                (server never sees the vault key)`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The KDF's job is to be <strong>deliberately slow</strong>. PBKDF2 repeats a hash
            hundreds of thousands of times; Argon2id additionally demands large amounts of memory,
            which neutralises GPU farms. For you, unlocking costs a fraction of a second. For an
            attacker trying billions of master-password guesses, the same cost per guess turns a
            weekend of cracking into centuries.
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            The salt — a random value unique to your account — ensures two users with the same
            master password get completely different keys, and makes precomputed tables useless
            (the same trick that defeats{' '}
            <Link href="/blog/hash-collisions-explained">rainbow-table style attacks</Link>).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Vault: AES-256 Ciphertext
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The vault itself — every username, password, note, and URL — is encrypted with
            AES-256, the same symmetric cipher used for government classified data. Decryption
            happens only in memory on your device after you unlock. On disk and on the sync server,
            the vault is an opaque blob:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Without the vault key, AES-256 ciphertext is computationally unreadable — a brute-force of the key itself is physically infeasible</li>
            <li>Each entry is typically encrypted individually, so partial corruption doesn't destroy the vault</li>
            <li>Locking the manager wipes the decrypted data and key from memory</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Zero-Knowledge: What the Server Never Learns
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            "Zero-knowledge" (or "end-to-end encrypted") architecture means all cryptography
            happens client-side. The server stores and syncs ciphertext; it authenticates you with
            a separately derived hash that cannot be reversed into the vault key. Consequences:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>The company cannot read your passwords, even under legal compulsion — it holds nothing readable</li>
            <li>Support cannot reset a forgotten master password — there is nothing to reset it against (this is why recovery kits exist; store yours safely)</li>
            <li>A malicious or compromised employee sees only encrypted blobs</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Sync and What a Breach Actually Means
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Cloud sync just replicates the encrypted blob across your devices; each device derives
            the key locally when you unlock. So what happens when a password manager company is
            breached — as has genuinely happened in the industry?
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            Attackers get encrypted vaults. To open yours they must guess your master password,
            paying the full KDF cost per guess. Run the numbers: at roughly 100,000 guesses per
            second against a well-configured KDF (an expensive rig), a 77-bit diceware master
            passphrase would take on the order of 10^10 years. A weak master password like
            "Monkey@123", though, could fall in hours. The lesson from real breaches is consistent:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>The architecture held</strong> — vaults with strong master passwords were not cracked</li>
            <li><strong>Weak master passwords were the casualty</strong> — short, human-invented ones were crackable offline</li>
            <li><strong>Old accounts with low KDF iteration counts suffered</strong> — check your settings and raise iterations if your account predates current defaults</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Autofill Is a Phishing Defence
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The most underrated feature is domain matching. A manager saves the exact origin along
            with each credential and only offers autofill when the current page matches:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Saved entry:  https://accounts.google.com  →  autofill offered
Phishing:     https://accounts-google.com  →  no match, nothing fills
Phishing:     https://google.com.verify-login.in  →  no match`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Humans are fooled by lookalike domains, Unicode homoglyphs, and urgent-looking emails.
            String comparison is not. When your manager unexpectedly refuses to fill a login page,
            treat it as an alarm, not an annoyance — you may be looking at a phish. Manually
            copy-pasting the password into the page defeats this protection.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Local vs Cloud, and the Common Objections
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Local-only managers</strong> (KeePass family) keep the vault file entirely on
            your devices — nothing to breach centrally, but you manage sync and backups yourself.{' '}
            <strong>Cloud managers</strong> (Bitwarden, 1Password, and similar) handle sync and
            sharing, relying on the zero-knowledge design above. Both are sound; the choice is
            about convenience versus self-reliance.
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            The usual objections, answered honestly:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>"One basket for all my eggs?"</strong> — Yes, but a basket built of AES-256 and a slow KDF, versus the real alternative: reused variations of one password across fifty sites, where one breached site opens all of them.</li>
            <li><strong>"What if I forget the master password?"</strong> — Genuine risk. Use a memorable diceware passphrase, and store the emergency/recovery kit on paper somewhere physically secure.</li>
            <li><strong>"Malware on my device could steal everything."</strong> — True, and equally true of typed passwords; a keylogger captures those too. Device compromise defeats every scheme, so this is not an argument against managers specifically.</li>
            <li><strong>"The built-in browser manager is enough?"</strong> — Far better than reuse. Dedicated managers add cross-browser sync, secure sharing, breach monitoring, and stronger vault-lock behaviour, but the browser manager plus unique generated passwords already beats 95% of setups.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Can a password manager company see my passwords?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Not in a zero-knowledge design. Your master password never leaves your device; it is run through a key-derivation function locally, and only the already-encrypted vault is synced. The company stores ciphertext it cannot decrypt.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What happens if my password manager gets breached?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Attackers obtain encrypted vault blobs. To read yours, they must brute-force your master password through the KDF — which is deliberately slow. A strong 6-word passphrase master password keeps the vault computationally out of reach; a weak master password is the real risk.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is browser autofill safe to use?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Manager autofill is a security feature: it fills credentials only when the page domain matches the saved entry, so a phishing lookalike domain gets nothing. That domain check catches attacks that fool human eyes.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Password Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Fill your vault with cryptographically secure passwords — generated locally in your
              browser, never sent anywhere. No signup, no cost.
            </p>
            <Link href="/password-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Password Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/passphrases-vs-random-passwords">Passphrases vs Random Passwords</Link></li>
              <li><Link href="/blog/password-entropy-explained-length-vs-complexity">Password Entropy Explained — Length vs Complexity</Link></li>
              <li><Link href="/blog/common-password-attacks-explained">Common Password Attacks Explained</Link></li>
              <li><Link href="/blog/password-hashing-bcrypt-vs-sha256">Password Hashing: bcrypt vs SHA-256</Link></li>
              <li><Link href="/blog/jwt-authentication-explained-for-beginners">JWT Authentication Explained for Beginners</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
