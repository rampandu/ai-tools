// pages/blog/common-jwt-errors-and-how-to-fix-them.js
import Head from 'next/head';
import Link from 'next/link';

export default function CommonJwtErrors() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Common JWT Errors and How to Fix Them',
        item: 'https://dev-brains-ai.com/blog/common-jwt-errors-and-how-to-fix-them',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '4 Common JWT Errors and How to Fix Them (Node.js)',
    description:
      'Fix "jwt malformed", "invalid signature", "jwt expired", and "invalid token" errors in Node.js jsonwebtoken. Get the exact cause and a working code fix for each error.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/common-jwt-errors-and-how-to-fix-them',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does "jwt malformed" mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The jsonwebtoken library throws "jwt malformed" when the string you passed to jwt.verify() is not a valid JWT — it does not have exactly three Base64Url sections separated by dots. Common causes are passing undefined, passing the whole "Bearer <token>" header instead of just the token, or passing an empty string.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I fix "invalid signature" in jsonwebtoken?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The signature check failed, which almost always means the secret or key used to verify does not match the one used to sign. Check that both services load the same JWT_SECRET, that there is no trailing whitespace or newline in the env value, and that the algorithm matches (HS256 secret vs RS256 key pair).',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I handle "jwt expired" errors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A TokenExpiredError means the exp claim is in the past. Return a 401 so the client can use its refresh token to obtain a new access token. Do not extend token lifetimes to hide the error, and use clockTolerance for small clock-skew differences between servers.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>4 Common JWT Errors and How to Fix Them (Node.js) | Dev Brains AI</title>
        <meta
          name="description"
          content="Fix jwt malformed, invalid signature, jwt expired, and invalid token errors in Node.js jsonwebtoken. Get the exact cause and a working code fix for each error."
        />
        <meta
          name="keywords"
          content="jwt malformed, invalid signature jwt, jwt expired error, invalid token jsonwebtoken, jsonwebtoken error fix, jwt verify error nodejs, TokenExpiredError, JsonWebTokenError"
        />
        <meta property="og:title" content="4 Common JWT Errors and How to Fix Them (Node.js)" />
        <meta property="og:description" content="Fix jwt malformed, invalid signature, jwt expired, and invalid token errors in Node.js jsonwebtoken. Get the exact cause and a working code fix for each error." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/common-jwt-errors-and-how-to-fix-them" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/common-jwt-errors-and-how-to-fix-them" />
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
              <li aria-current="page">Common JWT Errors</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Common JWT Errors and How to Fix Them (Node.js jsonwebtoken)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            If you build authentication with the Node.js <code>jsonwebtoken</code> library, you
            will eventually meet the same four errors every developer meets:
            <em> jwt malformed</em>, <em>invalid signature</em>, <em>jwt expired</em>, and the
            generic <em>invalid token</em>. Each one has a precise cause, and once you know what
            the library is actually checking, the fix is usually a one-liner. This guide covers
            the cause and the fix for each error, plus a clean error-handling pattern to use in
            production middleware.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 1: &quot;jwt malformed&quot;
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Cause:</strong> the value passed to <code>jwt.verify()</code> is not a JWT at
            all. A valid token has exactly three Base64Url sections separated by dots
            (header.payload.signature). This error means the library could not even split the
            string into three parts. The usual suspects:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li>Passing <code>undefined</code> or <code>null</code> because the header was missing</li>
            <li>Passing the full header value <code>&quot;Bearer eyJhbGci...&quot;</code> — including the word Bearer — instead of just the token</li>
            <li>Passing an empty string, a session id, or a token wrapped in quotes from JSON</li>
            <li>The client sending the token in the wrong header or cookie name</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Fix:</strong> extract and validate the token before verifying.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// BAD: verifies "Bearer eyJ..." — throws "jwt malformed"
const token = req.headers.authorization;
jwt.verify(token, SECRET);

// GOOD: strip the scheme and guard against missing headers
const authHeader = req.headers.authorization || '';
const [scheme, token] = authHeader.split(' ');

if (scheme !== 'Bearer' || !token) {
  return res.status(401).json({ error: 'Missing bearer token' });
}
const payload = jwt.verify(token, SECRET);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Still stuck? Paste the exact string you are verifying into a JWT decoder. If the
            decoder cannot parse it either, the problem is upstream — the client is not sending
            what you think it is sending.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 2: &quot;invalid signature&quot;
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Cause:</strong> the token parsed fine, but the signature computed with your
            key does not match the signature on the token. In practice this means one of:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li>The signing service and verifying service use different secrets (different <code>.env</code> files, staging vs production values)</li>
            <li>A trailing newline or space in the environment variable on one side</li>
            <li>Algorithm mismatch — signed with RS256 (private key) but verified as HS256 with a shared secret, or vice versa</li>
            <li>The secret was rotated, and old tokens signed with the previous secret are still in circulation</li>
            <li>The token was tampered with — the payload was edited, so the original signature no longer matches</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Fix:</strong> confirm both sides use byte-identical keys and the same
            algorithm, and pin the algorithm explicitly.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Debug: compare secrets on both services without printing them
const crypto = require('crypto');
console.log('secret fingerprint:',
  crypto.createHash('sha256').update(process.env.JWT_SECRET).digest('hex').slice(0, 12),
  'length:', process.env.JWT_SECRET.length); // catches trailing \\n

// Verify with the algorithm pinned
jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

// RS256 setups: sign with the PRIVATE key, verify with the PUBLIC key
jwt.verify(token, publicKeyPem, { algorithms: ['RS256'] });`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 3: &quot;jwt expired&quot;
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Cause:</strong> the token&apos;s <code>exp</code> claim (a Unix timestamp in
            seconds) is earlier than the current time. This is not a bug — it is the library doing
            its job. It becomes a bug when it happens unexpectedly:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li>Tokens issued with a very short <code>expiresIn</code> (for example <code>&apos;60&apos;</code> means 60 <em>seconds</em>, not minutes)</li>
            <li>Clock skew — the issuing server&apos;s clock is ahead of the verifying server&apos;s</li>
            <li><code>exp</code> set manually in milliseconds instead of seconds, making the token expire in 1970 from the verifier&apos;s point of view</li>
            <li>The client never refreshes — it keeps replaying an access token long past its lifetime</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            <strong>Fix:</strong> handle <code>TokenExpiredError</code> distinctly so the client
            knows to refresh, and allow a small clock tolerance.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`try {
  const payload = jwt.verify(token, SECRET, {
    algorithms: ['HS256'],
    clockTolerance: 10, // tolerate 10s of clock skew
  });
  req.user = payload;
  next();
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    // err.expiredAt tells you exactly when it died
    return res.status(401).json({ error: 'token_expired' }); // client should refresh
  }
  return res.status(401).json({ error: 'invalid_token' });
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Never &quot;fix&quot; this by setting <code>ignoreExpiration: true</code> in
            production — that turns every stolen token into a permanent credential.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 4: &quot;invalid token&quot; and Other JsonWebTokenError Messages
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>JsonWebTokenError: invalid token</code> is the catch-all for tokens that split
            into three parts but fail deeper checks. Related messages from the same family include
            <code> jwt audience invalid</code>, <code>jwt issuer invalid</code>,
            <code> invalid algorithm</code>, and <code>jwt signature is required</code>. Causes and fixes:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>Corrupted Base64 or JSON</strong> — the token was truncated in a database column or mangled by URL encoding. Store tokens in columns long enough (they can exceed 500 characters) and avoid double-encoding.</li>
            <li><strong>aud/iss mismatch</strong> — you passed <code>audience</code> or <code>issuer</code> options to <code>jwt.verify()</code> that do not match the claims in the token. Make sure sign and verify options agree exactly, including trailing slashes in URLs.</li>
            <li><strong>invalid algorithm</strong> — the token&apos;s <code>alg</code> is not in your <code>algorithms</code> whitelist. If you migrated from HS256 to RS256, old tokens will fail until they expire; that is expected.</li>
            <li><strong>signature is required</strong> — the token has an empty signature section (often an <code>alg: none</code> token). Reject it; this is an attack pattern, not a client bug.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// A complete middleware pattern that maps each error cleanly
function authMiddleware(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'missing_token' });
  }
  try {
    req.user = jwt.verify(token, SECRET, {
      algorithms: ['HS256'],
      issuer: 'https://api.example.com',
      audience: 'example-web-app',
    });
    return next();
  } catch (err) {
    const code =
      err.name === 'TokenExpiredError' ? 'token_expired' :
      err.name === 'NotBeforeError'    ? 'token_not_active_yet' :
      'invalid_token';
    return res.status(401).json({ error: code });
  }
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A 60-Second Debugging Checklist
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Log <code>typeof token</code> and its first 20 characters — is it really a token?</li>
            <li>Decode it in a JWT decoder — do the header, payload, and <code>exp</code> look right?</li>
            <li>Compare secret fingerprints (hash, not the secret itself) between signer and verifier</li>
            <li>Confirm the <code>alg</code> in the header matches your <code>algorithms</code> whitelist</li>
            <li>Check server clocks with <code>date</code> / NTP if expiry errors appear randomly</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What does &quot;jwt malformed&quot; mean?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The string passed to <code>jwt.verify()</code> is not a valid JWT — it does not have exactly three Base64Url sections separated by dots. Common causes are passing <code>undefined</code>, passing the whole &quot;Bearer ...&quot; header instead of just the token, or passing an empty string.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I fix &quot;invalid signature&quot; in jsonwebtoken?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The verification key does not match the signing key. Check that both services load the same JWT_SECRET, that there is no trailing whitespace or newline in the env value, and that the algorithm matches (HS256 shared secret vs RS256 key pair).
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How should I handle &quot;jwt expired&quot; errors?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A TokenExpiredError means the <code>exp</code> claim is in the past. Return a 401 so the client can use its refresh token to get a new access token. Use <code>clockTolerance</code> for small clock-skew differences, and never disable expiration checks in production.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JWT Decoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Debugging a token error? Paste the JWT and instantly see its header, payload, and
              expiry — decoded entirely in your browser. No signup, no cost.
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
              <li><Link href="/blog/jwt-structure-explained-header-payload-signature">JWT Structure Explained — Header, Payload, Signature</Link></li>
              <li><Link href="/blog/jwt-security-best-practices-for-developers">JWT Security Best Practices for Developers</Link></li>
              <li><Link href="/blog/jwt-expiry-claims-exp-iat-nbf-explained">JWT Expiry Claims — exp, iat, nbf Explained</Link></li>
              <li><Link href="/blog/decode-jwt-tokens-base64-javascript">Decode JWT Tokens with Base64 in JavaScript</Link></li>
              <li><Link href="/blog/how-to-decode-a-jwt-token-safely">How to Decode a JWT Token Safely</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
