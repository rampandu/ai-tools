// pages/blog/jwt-expiry-claims-exp-iat-nbf-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function JwtExpiryClaimsExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JWT Expiry Claims Explained: exp, iat, and nbf',
        item: 'https://dev-brains-ai.com/blog/jwt-expiry-claims-exp-iat-nbf-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JWT Expiry Claims Explained: exp, iat, and nbf (With Node.js Examples)',
    description:
      'Understand JWT time claims — exp, iat, and nbf — in unix seconds, handle clock skew with leeway, avoid the ms-vs-seconds bug, and design token lifetimes.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/jwt-expiry-claims-exp-iat-nbf-explained',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is JWT exp in seconds or milliseconds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JWT exp is always in unix seconds, as defined by RFC 7519. JavaScript Date.now() returns milliseconds, so divide by 1000 before comparing. Mixing the two units is one of the most common JWT bugs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between exp, iat, and nbf in a JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'exp (expiration time) is the moment after which the token must be rejected. iat (issued at) records when the token was created. nbf (not before) is the moment before which the token must not be accepted. All three are unix timestamps in seconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long should a JWT access token live?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most production systems use short-lived access tokens of 5 to 15 minutes, paired with a longer-lived refresh token. Short expiry limits the damage window if a token leaks, while refresh tokens keep the user logged in.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JWT Expiry Claims Explained: exp, iat, and nbf | Dev Brains AI</title>
        <meta
          name="description"
          content="Understand JWT time claims — exp, iat, and nbf — in unix seconds, handle clock skew with leeway, avoid the ms-vs-seconds bug, and design token lifetimes."
        />
        <meta
          name="keywords"
          content="jwt exp claim, jwt iat, jwt nbf, jwt expiry, jwt expiration time, jwt clock skew, jwt leeway, jwt seconds or milliseconds, jsonwebtoken expiresIn, refresh token rotation"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/jwt-expiry-claims-exp-iat-nbf-explained" />
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
              <li aria-current="page">JWT Expiry Claims: exp, iat, nbf</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JWT Expiry Claims Explained: exp, iat, and nbf (With Node.js Examples)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every JSON Web Token carries a handful of time-related claims that decide when it is
            valid, when it stops working, and when it starts working. Get them right and your
            authentication feels seamless. Get them wrong and you ship one of the most common bugs
            in web development: tokens that expire instantly, tokens that never expire, or a login
            that breaks only for users whose laptop clock is two minutes fast. This guide explains
            exp, iat, and nbf in plain language, shows how to handle them with the Node.js
            jsonwebtoken library, and covers the millisecond-versus-second trap that catches
            almost every developer at least once.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Three Time Claims: exp, iat, and nbf
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            RFC 7519, the JWT specification, defines three registered claims that deal with time.
            All three hold a <strong>NumericDate</strong> value — a unix timestamp counted in
            <strong> seconds</strong> (not milliseconds) since 1 January 1970 UTC.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>exp (expiration time)</strong> — the moment after which the token must be rejected. A verifier compares the current time against exp and fails validation once the current time is past it.</li>
            <li><strong>iat (issued at)</strong> — the moment the token was created. Useful for auditing, for computing token age, and for invalidating all tokens issued before a certain event (for example, a password change).</li>
            <li><strong>nbf (not before)</strong> — the moment before which the token must not be accepted. Rarely set manually, but handy for tokens that should activate in the future, such as a scheduled access grant.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            A decoded payload with all three claims looks like this:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`{
  "sub": "user_9182",
  "role": "admin",
  "iat": 1784197800,   // issued at:  2026-07-16 10:30:00 UTC
  "nbf": 1784197800,   // valid from: same moment it was issued
  "exp": 1784198700    // expires:    15 minutes later
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            You can paste any token into a <Link href="/jwt-decoder">JWT decoder</Link> to see
            these claims and check whether the token has already expired — the decoding happens
            entirely in your browser.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Setting and Verifying Time Claims in Node.js
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            With the popular jsonwebtoken library you rarely set exp by hand. The
            <strong> expiresIn</strong> option computes it for you, and iat is added automatically:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const jwt = require('jsonwebtoken');

// Sign: expiresIn accepts '15m', '1h', '7d', or a number of SECONDS
const token = jwt.sign(
  { sub: 'user_9182', role: 'admin' },
  process.env.JWT_SECRET,
  { expiresIn: '15m', notBefore: 0 }   // exp = now + 900s, nbf = now
);

// Verify: exp and nbf are checked automatically
try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Valid until', new Date(payload.exp * 1000).toISOString());
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    console.log('Token expired at', err.expiredAt);
  }
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note the multiplication by 1000 when converting exp back to a JavaScript Date. That
            single detail is where most JWT time bugs are born, so let us look at it directly.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Milliseconds vs Seconds Bug
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JWT claims use unix <strong>seconds</strong>. JavaScript&apos;s Date.now() returns unix
            <strong> milliseconds</strong>. Mix the two and you get spectacular failures in both
            directions:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// BUG 1: token that "never expires"
// Date.now() is ~1784197800000 (ms). Interpreted as seconds,
// that is the year 58514. The check passes forever.
const bad = jwt.sign(
  { sub: 'u1', exp: Date.now() + 900 },  // WRONG: ms + seconds
  secret
);

// BUG 2: client thinks a fresh token is already expired
// payload.exp is in seconds; comparing it to ms makes
// every token look ancient.
if (payload.exp < Date.now()) {          // WRONG comparison
  logout();                              // fires immediately
}

// CORRECT: convert one side
const nowInSeconds = Math.floor(Date.now() / 1000);
if (payload.exp < nowInSeconds) logout();

// or convert exp to ms
if (payload.exp * 1000 < Date.now()) logout();`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            A reliable habit: whenever you touch exp, iat, or nbf manually, immediately ask
            &quot;seconds or milliseconds?&quot; and add the conversion in the same line. Better
            still, let the library compute exp via expiresIn and never write the raw math yourself.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Clock Skew and Leeway
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Your auth server and your API servers do not share a clock. Even with NTP, machines
            drift by a few seconds; user devices can be off by minutes. This causes two classic
            symptoms:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li>A freshly issued token is rejected with &quot;jwt not active&quot; because the verifying server&apos;s clock is slightly behind the issuing server (nbf appears to be in the future).</li>
            <li>A token is rejected as expired a few seconds before its real exp because the verifier&apos;s clock runs fast.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            The fix is <strong>leeway</strong> (also called clock tolerance): a small grace window
            applied to time-claim checks. In jsonwebtoken it is the clockTolerance option:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Accept up to 30 seconds of clock drift for exp and nbf checks
const payload = jwt.verify(token, process.env.JWT_SECRET, {
  clockTolerance: 30   // seconds
});`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Keep leeway small — 30 to 60 seconds is typical. A large leeway silently extends every
            token&apos;s lifetime, which defeats the point of a short exp.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Choosing a Token Lifetime Strategy
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            There is a permanent tension in picking exp: long lifetimes are convenient but risky
            (a stolen token works until it expires, and JWTs are hard to revoke), while short
            lifetimes are safe but would log users out constantly. The standard resolution is a
            two-token design:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>Access token</strong> — short-lived (5 to 15 minutes). Sent with every API request. If it leaks, the damage window is minutes.</li>
            <li><strong>Refresh token</strong> — long-lived (days to weeks). Stored more carefully (for example in an httpOnly cookie), sent only to one dedicated endpoint, and used solely to mint a new access token when the old one expires.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Production systems add <strong>refresh token rotation</strong>: every time a refresh
            token is used, the server issues a brand-new refresh token and invalidates the old one.
            If an attacker steals a refresh token and uses it, the legitimate user&apos;s next
            refresh attempt fails — and that reuse of an already-rotated token is a strong signal
            of theft, at which point the server revokes the whole session family.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Internal admin dashboard: access token 5m, refresh 8h (one working day).</li>
            <li>Consumer web app: access token 15m, refresh 7 to 30 days with rotation.</li>
            <li>Machine-to-machine API: access token 30 to 60m, no refresh token — clients simply request a new token with their credentials.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Is JWT exp in seconds or milliseconds?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              JWT exp is always in unix seconds, as defined by RFC 7519. JavaScript Date.now()
              returns milliseconds, so divide by 1000 before comparing. Mixing the two units is one
              of the most common JWT bugs.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between exp, iat, and nbf in a JWT?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              exp (expiration time) is the moment after which the token must be rejected. iat
              (issued at) records when the token was created. nbf (not before) is the moment before
              which the token must not be accepted. All three are unix timestamps in seconds.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How long should a JWT access token live?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Most production systems use short-lived access tokens of 5 to 15 minutes, paired with
              a longer-lived refresh token. Short expiry limits the damage window if a token leaks,
              while refresh tokens keep the user logged in.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JWT Decoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any JWT to inspect its exp, iat, and nbf claims, see them as human-readable
              dates, and check whether the token has expired — all decoded locally in your browser.
            </p>
            <Link href="/jwt-decoder">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open JWT Decoder →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/jwt-structure-explained-header-payload-signature">JWT Structure Explained: Header, Payload, and Signature</Link></li>
              <li><Link href="/blog/jwt-security-best-practices-for-developers">JWT Security Best Practices for Developers</Link></li>
              <li><Link href="/blog/common-jwt-errors-and-how-to-fix-them">Common JWT Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/jwt-authentication-explained-for-beginners">JWT Authentication Explained for Beginners</Link></li>
              <li><Link href="/blog/how-to-decode-a-jwt-token-safely">How to Decode a JWT Token Safely</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
