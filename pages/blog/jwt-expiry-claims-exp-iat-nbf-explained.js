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
    headline: 'JWT exp, iat & nbf Explained — Avoid the Silent Token Expiry Bugs',
    description:
      'JWT time claims explained in plain English: why exp, iat, and nbf are unix seconds not milliseconds, how clock skew silently rejects valid tokens, and how to pick a safe token lifetime — with Node.js examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/jwt-expiry-claims-exp-iat-nbf-explained',
    datePublished: '2026-07-14',
    dateModified: '2026-07-22',
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
      {
        '@type': 'Question',
        name: 'What happens if a JWT is used before its nbf time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The token is rejected with a "not before" or "jwt not active" error, the same way an expired token is rejected — just for the opposite reason. This is easy to miss because nbf is optional and silent: if you forget it exists, an unexpectedly-rejected fresh token looks like a bug rather than the not-yet-valid claim working as intended.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I trust the exp claim from a JWT decoded on the client?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Decoding a JWT with base64 only reveals its claims — it does not check the signature. Anyone can edit an unsigned decode of the payload, including exp, before sending it back. The server must always call the library verify function with the secret or public key; client-side decoding is for display purposes only, never for authorization decisions.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JWT exp, iat &amp; nbf Explained — Avoid the Silent Expiry Bugs | Dev Brains AI</title>
        <meta
          name="description"
          content="JWT exp, iat, and nbf explained: why they're unix seconds not milliseconds, how clock skew silently rejects valid tokens, and picking a safe token lifetime."
        />
        <meta
          name="keywords"
          content="jwt exp claim, jwt iat, jwt nbf, jwt expiry, jwt expiration time, jwt clock skew, jwt leeway, jwt seconds or milliseconds, jsonwebtoken expiresIn, refresh token rotation"
        />
        <meta property="og:title" content="JWT exp, iat &amp; nbf Explained — Avoid the Silent Expiry Bugs" />
        <meta
          property="og:description"
          content="Why JWT time claims are unix seconds not milliseconds, how clock skew silently rejects valid tokens, and how to design safe access and refresh token lifetimes — with Node.js examples."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/jwt-expiry-claims-exp-iat-nbf-explained" />
        <meta property="og:type" content="article" />
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

          <svg
            viewBox="0 0 640 200"
            style={{ width: '100%', height: 'auto', marginBottom: 18, borderRadius: 8, background: '#0f172a' }}
            role="img"
            aria-label="Timeline diagram showing nbf, iat, now, and exp positioned along a JWT token's validity window"
          >
            <rect x="0" y="0" width="640" height="200" rx="10" fill="#0f172a" />
            <text x="320" y="28" textAnchor="middle" fill="#94a3b8" fontSize="13" fontFamily="ui-monospace, monospace">Where nbf, iat, now, and exp sit on the timeline</text>

            <rect x="160" y="85" width="400" height="30" rx="4" fill="#0d3b34" stroke="#14b8a6" />
            <text x="360" y="104" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">token is valid in this window</text>

            <line x1="40" y1="100" x2="600" y2="100" stroke="#334155" strokeWidth="2" />

            <circle cx="100" cy="100" r="6" fill="#94a3b8" />
            <text x="100" y="132" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="ui-monospace, monospace">iat</text>
            <text x="100" y="148" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">issued</text>

            <circle cx="160" cy="100" r="6" fill="#34d399" />
            <text x="160" y="132" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="ui-monospace, monospace">nbf</text>
            <text x="160" y="148" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">valid from</text>

            <circle cx="340" cy="100" r="6" fill="#fbbf24" />
            <text x="340" y="74" textAnchor="middle" fill="#fde68a" fontSize="12" fontFamily="ui-monospace, monospace">now</text>
            <text x="340" y="148" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">verification time</text>

            <circle cx="560" cy="100" r="6" fill="#f87171" />
            <text x="560" y="132" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="ui-monospace, monospace">exp</text>
            <text x="560" y="148" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">expires</text>

            <text x="320" y="178" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="ui-monospace, monospace">Valid only when nbf &lt;= now &lt; exp — outside that window, verification fails</text>
          </svg>

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
            Practical Example: Decoding a Token and Computing Time Remaining
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Decoding a token is only half the job — reading its claims does not verify the
            signature, so treat a client-side decode as display information only, never as an
            authorization check. See <Link href="/blog/how-to-decode-a-jwt-token-safely">How to
            Decode a JWT Token Safely</Link> for the full distinction between decoding and
            verifying. With that caveat in mind, here is a self-contained decoder plus a
            human-readable &quot;time remaining&quot; calculation, the kind you would use to show
            a &quot;session expires in 4m 12s&quot; banner in a UI:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Decode the payload only — this does NOT verify the signature.
function decodePayload(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
  return JSON.parse(json);
}

const payload = decodePayload(token);
const nowInSeconds = Math.floor(Date.now() / 1000);

// nbf check first — a token can be decodable but not yet active
if (payload.nbf && nowInSeconds < payload.nbf) {
  console.log('Token not active yet, valid in', payload.nbf - nowInSeconds, 'seconds');
} else {
  const secondsLeft = payload.exp - nowInSeconds;
  if (secondsLeft <= 0) {
    console.log('Token already expired', -secondsLeft, 'seconds ago');
  } else {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    console.log(\`Token expires in \${minutes}m \${seconds}s\`);
  }
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            You can try this decoding step interactively with the free{' '}
            <Link href="/jwt-decoder">JWT Decoder</Link> — paste a token and it shows exp, iat,
            and nbf as both raw unix seconds and human-readable dates, all decoded locally in
            your browser without ever sending the token anywhere.
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
            of theft, at which point the server revokes the whole session family. For a broader
            checklist beyond time claims — storage, transport, and signature algorithm choices —
            see <Link href="/blog/jwt-security-best-practices-for-developers">JWT Security Best
            Practices for Developers</Link>.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Internal admin dashboard: access token 5m, refresh 8h (one working day).</li>
            <li>Consumer web app: access token 15m, refresh 7 to 30 days with rotation.</li>
            <li>Machine-to-machine API: access token 30 to 60m, no refresh token — clients simply request a new token with their credentials.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Mistakes with exp, iat, and nbf
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Confusing seconds and milliseconds.</strong> exp, iat, and nbf are unix seconds; Date.now() is unix milliseconds. Compare the two without converting and every check is wrong by a factor of 1000, in either direction.</li>
            <li><strong>Trusting a client-decoded exp instead of validating server-side.</strong> Decoding a token reveals its claims but does not verify the signature — an attacker can hand-edit an unsigned decode of the payload, including exp, before sending it back. Authorization decisions must always go through the library&apos;s verify function with the real secret or public key.</li>
            <li><strong>Ignoring clock skew.</strong> Auth and API servers rarely share a perfectly synced clock. Without a small clockTolerance, valid tokens near their exp — or freshly issued tokens near their nbf — get rejected simply because one machine&apos;s clock drifted by a few seconds.</li>
            <li><strong>Forgetting that nbf silently rejects &quot;not yet valid&quot; tokens.</strong> nbf is optional and rarely used, so it is easy to forget it exists. When a token is verified before its nbf time, the request fails with the same kind of error as an expired token, which can look like an unrelated bug if you are not expecting it.</li>
          </ul>
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
          <div style={{ marginBottom: 10 }}>
            <strong>What happens if a JWT is used before its nbf time?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The token is rejected with a &quot;not before&quot; or &quot;jwt not active&quot;
              error, the same way an expired token is rejected — just for the opposite reason. This
              is easy to miss because nbf is optional and silent: if you forget it exists, an
              unexpectedly-rejected fresh token looks like a bug rather than the not-yet-valid
              claim working as intended.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I trust the exp claim from a JWT decoded on the client?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Decoding a JWT with base64 only reveals its claims — it does not check the
              signature. Anyone can edit an unsigned decode of the payload, including exp, before
              sending it back. The server must always call the library verify function with the
              secret or public key; client-side decoding is for display purposes only, never for
              authorization decisions.
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
