// pages/blog/common-password-attacks-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function CommonPasswordAttacksExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Common Password Attacks Explained',
        item: 'https://dev-brains-ai.com/blog/common-password-attacks-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '7 Common Password Attacks Explained (and How to Stop Them)',
    description:
      'Brute force, credential stuffing, phishing, rainbow tables, and 3 more password attacks explained — how each works and the exact defence that stops it.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/common-password-attacks-explained',
    datePublished: '2026-07-16',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is credential stuffing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Credential stuffing is when attackers take email/password pairs leaked from one breached site and automatically try them on many other sites. It works because people reuse passwords. Using a unique password per site completely neutralises it.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a rainbow table attack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A rainbow table is a precomputed mapping from hashes back to passwords, letting attackers reverse unsalted hashes almost instantly. Salting — adding a unique random value to each password before hashing — makes rainbow tables useless, which is why modern systems always salt.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I know if my password was in a breach?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check your email address on Have I Been Pwned (haveibeenpwned.com). If a password appears in a breach, change it everywhere it was used, make the replacements unique per site, and enable multi-factor authentication on important accounts.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>7 Common Password Attacks Explained (and How to Stop Them) | Dev Brains AI</title>
        <meta
          name="description"
          content="Brute force, credential stuffing, phishing, rainbow tables, and 3 more password attacks explained — how each works and the exact defence that stops it."
        />
        <meta
          name="keywords"
          content="common password attacks, credential stuffing explained, brute force attack defence, dictionary attack, rainbow table attack, phishing password theft, have i been pwned"
        />
        <meta property="og:title" content="7 Common Password Attacks Explained (and How to Stop Them)" />
        <meta property="og:description" content="Brute force, credential stuffing, phishing, rainbow tables, and 3 more password attacks explained — how each works and the exact defence that stops it." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/common-password-attacks-explained" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/common-password-attacks-explained" />
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
              <li aria-current="page">Common Password Attacks</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Common Password Attacks Explained — and the Defence Against Each One
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Password advice makes much more sense once you know what it is defending against. Each
            attack below has a specific mechanism and, importantly, a specific countermeasure —
            some belong to you as a user, others to you as the developer building the login system.
            Here are the seven attacks that account for nearly all password compromises.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            1. Brute Force — Trying Everything
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The simplest attack: systematically try every possible password. Online, against a live
            login form, brute force is nearly hopeless if the site does its job — which is why the
            defences here are server-side:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Rate limiting / throttling</strong> — cap attempts per account and per IP, with increasing delays</li>
            <li><strong>Account lockout or step-up challenges</strong> — after repeated failures, require a CAPTCHA or email verification rather than hard-locking (hard lockout invites denial-of-service against users)</li>
            <li><strong>MFA</strong> — even a guessed password fails without the second factor</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Offline brute force — against stolen hashes — is another matter entirely: billions of
            guesses per second are possible against fast hashes. There, the defence is password
            length (see <Link href="/blog/password-entropy-explained-length-vs-complexity">password
            entropy</Link>) and slow hashing on the server.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            2. Dictionary Attacks — Trying the Likely Things First
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Nobody brute-forces from "aaaaaaaa". Cracking tools start with wordlists — real leaked
            passwords, dictionary words, names, cricket teams, film stars — and apply mangling
            rules that mimic human habits:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`base word: "cricket"
rules applied automatically:
  Cricket  cricket1  cricket123  Cricket@2025
  cr1cket  Cr!cket   cricket!    CRICKET
→ thousands of variants tested in microseconds`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Defence: never base a password on any word or predictable pattern. A randomly generated
            password or a true diceware passphrase is not in any list.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            3. Credential Stuffing — Reuse Is the Sin
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The highest-volume attack on the internet today. Attackers take the billions of
            email/password pairs from past breaches and replay them against other sites with
            automated tools: login pairs from a breached forum tried against email providers,
            banks, food-delivery apps, everywhere. No cracking involved — the password is already
            known; the only question is where else it works.
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            Defence as a user: <strong>a unique password per site</strong> — this single habit makes
            stuffing impossible against you. Defence as a developer: monitor for bursts of failed
            logins from distributed IPs, check submitted passwords against breach corpora, and
            offer MFA.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            4. Phishing — Asking You for the Password
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Why crack a password when the user will type it into your fake page? Phishing mails and
            SMS ("your account will be suspended", "your parcel is held at customs") link to
            pixel-perfect copies of real login pages on lookalike domains. Entropy is irrelevant —
            a 130-bit password typed into a phishing page is 100% compromised.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Password manager autofill</strong> — fills only on the exact saved domain; a lookalike gets nothing (see <Link href="/blog/how-password-managers-work">how password managers work</Link>)</li>
            <li><strong>Phishing-resistant MFA</strong> — passkeys and hardware keys cryptographically bind the login to the real origin</li>
            <li><strong>Habit</strong> — navigate to sensitive sites yourself instead of clicking links in messages</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            5. Keyloggers — Capturing the Keystrokes
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Malware on a compromised device records everything typed, including passwords —
            strength and uniqueness cannot help once the device itself is hostile. Defences are
            about the device: keep the OS and browser updated, avoid pirated software and untrusted
            downloads, and use MFA so that a captured password alone is not enough. Autofill also
            helps at the margin, since credentials filled by a manager are not typed.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            6. Rainbow Tables — Precomputed Hash Reversal
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            When a site stores unsalted hashes, an attacker does not need to crack each one — they
            can precompute (or download) a table mapping hashes back to passwords and reverse
            millions of them instantly:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`unsalted:  md5("monkey123") = same hash for every user, every site
           → one table lookup reverses them all

salted:    hash = bcrypt("monkey123" + unique_random_salt)
           → same password, different hash per user
           → precomputed tables are useless`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This is a developer-side defence: salting plus a slow hash (bcrypt, scrypt, Argon2)
            is non-negotiable. Details in{' '}
            <Link href="/blog/password-hashing-bcrypt-vs-sha256">bcrypt vs SHA-256</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            7. Breached-Password Lists — and How to Respond
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every breach feeds the wordlists used by attacks 2 and 3. <strong>Have I Been Pwned
            (HIBP)</strong> aggregates known breaches so you can check exposure — by email address,
            or by password using a clever k-anonymity API that never sends your actual password.
            When you discover you are in a breach:
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>Change the password on the breached site immediately.</li>
            <li>Change it everywhere else the same or similar password was used — this is the step people skip and attackers count on.</li>
            <li>Make every replacement unique and generated.</li>
            <li>Enable MFA on the affected account and your email.</li>
            <li>Watch for targeted phishing — breached email addresses get more of it.</li>
          </ol>
          <p className="small" style={{ marginBottom: 14 }}>
            Developers can call the HIBP Pwned Passwords API at registration time and reject
            passwords that appear in breaches — one of the highest-value, lowest-effort security
            features you can ship.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            One Table to Remember
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Attack               Beaten by
brute force (online)  rate limiting + MFA
brute force (offline) length/entropy + slow hashing
dictionary            randomly generated passwords
credential stuffing   unique password per site
phishing              autofill domain match + passkeys
keyloggers            device hygiene + MFA
rainbow tables        salting (developer side)
breach lists          HIBP checks + rotate exposed passwords`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is credential stuffing?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Credential stuffing is when attackers take email/password pairs leaked from one breached site and automatically try them on many other sites. It works because people reuse passwords. Using a unique password per site completely neutralises it.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a rainbow table attack?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A rainbow table is a precomputed mapping from hashes back to passwords, letting attackers reverse unsalted hashes almost instantly. Salting — adding a unique random value to each password before hashing — makes rainbow tables useless, which is why modern systems always salt.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I know if my password was in a breach?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Check your email address on Have I Been Pwned (haveibeenpwned.com). If a password appears in a breach, change it everywhere it was used, make the replacements unique per site, and enable multi-factor authentication on important accounts.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Password Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Defeat dictionary attacks and stuffing with unique, cryptographically secure
              passwords — generated locally in your browser. No signup, no cost.
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
              <li><Link href="/blog/how-to-create-strong-passwords-guide">How to Create Strong Passwords — A Practical Guide</Link></li>
              <li><Link href="/blog/how-password-managers-work">How Password Managers Work</Link></li>
              <li><Link href="/blog/password-hashing-bcrypt-vs-sha256">Password Hashing: bcrypt vs SHA-256</Link></li>
              <li><Link href="/blog/hash-collisions-explained">Hash Collisions Explained</Link></li>
              <li><Link href="/blog/common-jwt-errors-and-how-to-fix-them">Common JWT Errors and How to Fix Them</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
