// pages/blog/password-hashing-bcrypt-vs-sha256.js
import Head from 'next/head';
import Link from 'next/link';

export default function PasswordHashingBcryptVsSha256() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Password Hashing — bcrypt vs SHA-256',
        item: 'https://dev-brains-ai.com/blog/password-hashing-bcrypt-vs-sha256',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Password Hashing — Why bcrypt Beats SHA-256 for Storing Passwords',
    description:
      'Why fast hashes like SHA-256 fail for passwords: GPU brute-force economics, salting, and work factors explained. bcrypt vs scrypt vs Argon2 compared, with a Node.js bcrypt example and cost-factor guidance.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/password-hashing-bcrypt-vs-sha256',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is SHA-256 bad for password hashing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SHA-256 is designed to be fast, and speed helps the attacker: a single modern GPU can compute billions of SHA-256 hashes per second, so a leaked table of SHA-256 password hashes can be brute-forced quickly. Password hashing needs deliberately slow, salted, tunable algorithms like bcrypt, scrypt, or Argon2.',
        },
      },
      {
        '@type': 'Question',
        name: 'What bcrypt cost factor should I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose the highest cost your server can afford per login — commonly 10 to 12 in 2026, targeting roughly 100 to 300 milliseconds per hash. Each +1 doubles the work. Benchmark on your production hardware and re-evaluate every couple of years as hardware gets faster.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Argon2 better than bcrypt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Argon2id is the current recommendation for new systems: it is memory-hard, which makes GPU and ASIC attacks far more expensive than bcrypt does. bcrypt remains a solid, battle-tested choice, and migrating existing bcrypt hashes is rarely urgent. Avoid rolling your own combination of fast hashes.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Password Hashing — bcrypt vs SHA-256 | Dev Brains AI</title>
        <meta
          name="description"
          content="Why fast hashes like SHA-256 fail for passwords: GPU brute-force economics, salting, work factors, bcrypt vs scrypt vs Argon2, a Node.js bcrypt example with cost guidance, and common mistakes."
        />
        <meta
          name="keywords"
          content="bcrypt vs sha256, password hashing best practices, bcrypt cost factor, argon2 vs bcrypt, salt password hash, nodejs bcrypt example, secure password storage, scrypt vs argon2"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/password-hashing-bcrypt-vs-sha256" />
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
              <li aria-current="page">Password Hashing: bcrypt vs SHA-256</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Password Hashing — Why bcrypt Beats SHA-256 for Storing Passwords
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            &quot;We hash passwords with SHA-256, so we&apos;re secure&quot; is one of the most
            common — and most dangerous — misconceptions in web development. SHA-256 is an
            excellent cryptographic hash, but it was never designed for passwords, and using it
            (with or without a salt) leaves user accounts one database leak away from mass
            compromise. This article explains the economics that make fast hashes fail, what
            salting and work factors actually do, how bcrypt, scrypt, and Argon2 compare, and how
            to use bcrypt correctly in Node.js.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Problem: Fast Hashes Meet Cheap GPUs
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            When a database leaks, attackers do not &quot;reverse&quot; the hashes — they guess.
            They take wordlists of billions of real passwords from past breaches, hash each guess,
            and compare against the stolen table. The only thing standing between a leaked hash
            and the original password is <em>how many guesses per second</em> the attacker can make:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`Rough single-GPU cracking speeds (consumer hardware):

MD5            tens of billions of guesses/second
SHA-256        billions of guesses/second
bcrypt (c=12)  tens of thousands of guesses/second

An 8-character lowercase+digit password (~2.8 trillion combos):
  SHA-256:  cracked in minutes to hours
  bcrypt:   years — per password`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            SHA-256 is fast because file checksums and TLS need it fast. That same property hands
            attackers a roughly million-fold advantage over a properly configured bcrypt. The
            defense is not a stronger fast hash — SHA-512 has the same flaw — it is an algorithm
            that is <em>deliberately expensive</em> to compute.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Salting: Killing Rainbow Tables and Batch Attacks
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A salt is a random value generated per user and stored alongside the hash. It fixes
            two problems that unsalted hashes have:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>Precomputation.</strong> Without salts, attackers use rainbow tables — precomputed hash lookups — so common passwords fall instantly. A unique salt makes every user&apos;s hash unique, so precomputation is useless.</li>
            <li><strong>Batch cracking.</strong> Without salts, identical passwords produce identical hashes, so one guess tests every user at once. With salts, each guess must be recomputed per user.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Important: a salt does <em>not</em> slow down guessing an individual password. Salted
            SHA-256 is still crackable at billions of guesses per second — which is why salting
            alone is not enough. You need salt <em>plus</em> a slow algorithm. bcrypt, scrypt, and
            Argon2 all generate and embed the salt for you automatically.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Work Factors: Security You Can Tune
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Purpose-built password hashes expose a cost parameter that controls how expensive each
            hash is. bcrypt&apos;s cost is logarithmic — cost 12 means 2^12 internal rounds, and
            every +1 <em>doubles</em> the work for you and the attacker equally. Your server pays
            the price once per login; the attacker pays it billions of times. As hardware
            improves, you simply raise the cost — no algorithm change needed.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            bcrypt vs scrypt vs Argon2
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>
              <strong>bcrypt (1999).</strong> CPU-hard, battle-tested, available everywhere.
              Weaknesses: only 72 bytes of password are used, and it is not memory-hard, so GPUs
              still get some advantage. Still a perfectly defensible choice today.
            </li>
            <li>
              <strong>scrypt (2009).</strong> Adds memory-hardness — each hash needs significant
              RAM, which GPUs and ASICs have little of per core. Parameters (N, r, p) are more
              fiddly to tune than bcrypt&apos;s single cost.
            </li>
            <li>
              <strong>Argon2 (2015).</strong> Winner of the Password Hashing Competition and the
              current OWASP first choice. Tunable across time, memory, and parallelism; use the
              <strong> Argon2id</strong> variant. Best pick for new systems where a good library
              exists for your stack.
            </li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Practical guidance: new project with good Argon2 support — use Argon2id. Existing
            bcrypt system — keep it, keep the cost current, and do not lose sleep. The gap
            between bcrypt and Argon2 is tiny compared with the gap between either of them and
            SHA-256.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Node.js bcrypt Example with Cost Guidance
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`npm install bcrypt

const bcrypt = require('bcrypt');

// Registration: hash with a cost factor (salt is generated & embedded)
const COST = 12; // ~200-300ms on typical 2026 server hardware
const hash = await bcrypt.hash(plainPassword, COST);
await db.users.update(userId, { passwordHash: hash });
// Stored value looks like: $2b$12$N9qo8uLOickgx2ZMRZoMye...
//                            alg cost  salt(22) + hash(31)

// Login: compare — never hash-and-string-compare yourself
const ok = await bcrypt.compare(inputPassword, user.passwordHash);
if (!ok) return res.status(401).json({ error: 'invalid credentials' });

// Benchmark to pick your cost
for (let cost = 10; cost <= 14; cost++) {
  const t = Date.now();
  await bcrypt.hash('benchmark-password', cost);
  console.log('cost', cost, Date.now() - t, 'ms');
}`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Target roughly <strong>100–300 ms per hash</strong> on your production hardware; cost 10–12 is typical today</li>
            <li>Use the async API (<code>bcrypt.hash</code>/<code>bcrypt.compare</code>), not <code>hashSync</code>, so logins do not block the event loop</li>
            <li>Re-hash on login when a user&apos;s stored cost is below your current target — the stored hash records the cost it was created with</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Mistakes to Avoid
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Salted SHA-256 as &quot;good enough&quot;</strong> — the salt stops rainbow tables, not GPU brute force. Still billions of guesses per second.</li>
            <li><strong>A single global salt (a &quot;pepper&quot; misused)</strong> — one leak and every user shares the weakness. Salts must be per-user; a pepper is an optional extra kept out of the database, not a replacement.</li>
            <li><strong>Rolling your own scheme</strong> — sha256(sha256(password)) or 1000 manual rounds is still GPU-friendly and adds subtle bugs. Use a vetted library.</li>
            <li><strong>Truncation surprises</strong> — bcrypt ignores everything past 72 bytes. If you allow very long passphrases, validate length rather than silently truncating.</li>
            <li><strong>Cost set once in 2018 and never revisited</strong> — hardware doubles; your cost should climb with it.</li>
            <li><strong>Storing the salt &quot;secretly&quot;</strong> — salts are not secrets; they live next to the hash by design. The secrecy lives in the password, the slowness in the algorithm.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why is SHA-256 bad for password hashing?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              SHA-256 is designed to be fast, and speed helps the attacker: one modern GPU computes billions of SHA-256 hashes per second, so leaked hashes fall quickly to brute force. Passwords need deliberately slow, salted, tunable algorithms like bcrypt, scrypt, or Argon2.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What bcrypt cost factor should I use?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The highest cost your server can afford per login — commonly 10 to 12 in 2026, targeting roughly 100–300 ms per hash. Each +1 doubles the work. Benchmark on production hardware and re-evaluate every couple of years.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is Argon2 better than bcrypt?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Argon2id is the current recommendation for new systems because its memory-hardness makes GPU attacks far more expensive. bcrypt remains solid and battle-tested; migrating existing bcrypt hashes is rarely urgent.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Hash Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Explore how MD5, SHA-1, SHA-256, and SHA-512 digests behave — generated instantly in
              your browser, nothing sent to a server. No signup, no cost.
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
              <li><Link href="/blog/md5-vs-sha256-which-hash-should-you-use">MD5 vs SHA-256 — Which Hash Should You Use?</Link></li>
              <li><Link href="/blog/what-is-hashing-explained-for-beginners">What Is Hashing? Explained for Beginners</Link></li>
              <li><Link href="/blog/hash-collisions-explained">Hash Collisions Explained</Link></li>
              <li><Link href="/blog/regex-for-password-validation-rules">Regex for Password Validation Rules</Link></li>
              <li><Link href="/password-generator">Free Password Generator Tool</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
