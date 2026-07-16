// pages/blog/how-to-decode-a-jwt-token-safely.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowToDecodeAJwtTokenSafely() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Decode a JWT Token Safely',
        item: 'https://dev-brains-ai.com/blog/how-to-decode-a-jwt-token-safely',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Decode a JWT Token Safely (JavaScript, Python, and Online)',
    description:
      'Learn how to decode a JWT token safely: the three base64url parts, decoding in JavaScript and Python, why decoding is not verifying, and why you should never paste production tokens into random websites.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-to-decode-a-jwt-token-safely',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I decode a JWT token without a library?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Split the token on the dot character, take the first two parts, convert base64url to base64 by replacing - with + and _ with /, then base64-decode and JSON.parse the result. The signature (third part) is binary and cannot be decoded to JSON.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to paste a JWT into an online decoder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only if the tool decodes entirely in your browser and never sends the token to a server. A JWT is a live credential — anyone who captures it can impersonate you until it expires. Use client-side tools like the Dev Brains AI JWT Decoder, and prefer expired or test tokens when possible.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does decoding a JWT verify that it is valid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Decoding only reads the base64url-encoded header and payload, which anyone can do. Verification requires checking the cryptographic signature against the secret or public key on the server. Never trust claims from a token you have only decoded.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How to Decode a JWT Token Safely | Dev Brains AI</title>
        <meta
          name="description"
          content="Decode a JWT token safely in JavaScript, Python, or your browser. Understand the three base64url parts, why decoding is not verifying, and how to protect live tokens."
        />
        <meta
          name="keywords"
          content="decode jwt token, jwt decoder, decode jwt javascript, decode jwt python, base64url decode, jwt payload, decode jwt online, jwt decode without verify"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-to-decode-a-jwt-token-safely" />
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
              <li aria-current="page">How to Decode a JWT Token Safely</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Decode a JWT Token Safely (JavaScript, Python, and Online)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every developer working with modern APIs eventually stares at a long string starting with
            <strong> eyJ</strong> and wonders what is inside it. That string is a JSON Web Token (JWT),
            and decoding it is easy — it is just base64url-encoded JSON. But there are two things many
            tutorials skip: decoding a token is <strong>not</strong> the same as verifying it, and a JWT
            is a live credential that should never be pasted into a website that ships it to a server.
            This guide covers how to decode a JWT in JavaScript and Python, and how to do it safely.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A JWT Is Three Base64url Parts Joined by Dots
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A JWT looks like <strong>xxxxx.yyyyy.zzzzz</strong> — three segments separated by dots:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Header</strong> — JSON describing the signing algorithm, e.g. <strong>{'{"alg":"HS256","typ":"JWT"}'}</strong></li>
            <li><strong>Payload</strong> — JSON claims: who the user is, when the token expires, custom data</li>
            <li><strong>Signature</strong> — raw bytes produced by signing the first two parts with a secret or private key</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            The header and payload are encoded with <strong>base64url</strong>, a URL-safe variant of
            base64. It replaces <strong>+</strong> with <strong>-</strong>, replaces <strong>/</strong> with
            <strong> _</strong>, and drops the trailing <strong>=</strong> padding. That is exactly why a
            naive <strong>atob()</strong> call sometimes throws an error on a valid token — you have to
            convert base64url back to standard base64 first.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9        <- header  (base64url JSON)
.eyJzdWIiOiIxMDAxIiwibmFtZSI6IlJhdmkiLCJleHAiOjE3ODM0MjU2MDB9   <- payload
.k5Jf3mZQx9VbW1cAqT0dO4nHc2xLmR8sYp6uE_wG1jU  <- signature (binary, not JSON)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Decoding a JWT in JavaScript (No Library Needed)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            In the browser or Node.js 16+, you can decode a JWT with a few lines. The key steps are:
            split on dots, fix the base64url characters, add padding back, then decode and parse.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function decodeJwtPart(part) {
  // 1. base64url -> base64
  let b64 = part.replace(/-/g, '+').replace(/_/g, '/');
  // 2. restore padding (length must be a multiple of 4)
  while (b64.length % 4 !== 0) b64 += '=';
  // 3. decode and handle UTF-8 correctly
  const json = decodeURIComponent(
    atob(b64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
  return JSON.parse(json);
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAxIiwibmFtZSI6IlJhdmkifQ.sig';
const [headerB64, payloadB64] = token.split('.');

console.log(decodeJwtPart(headerB64));   // { alg: 'HS256', typ: 'JWT' }
console.log(decodeJwtPart(payloadB64));  // { sub: '1001', name: 'Ravi' }`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            In Node.js you can skip <strong>atob()</strong> entirely, because <strong>Buffer</strong> understands
            base64url natively:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const payload = JSON.parse(
  Buffer.from(token.split('.')[1], 'base64url').toString('utf8')
);
console.log(payload);`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Decoding a JWT in Python
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Python&apos;s standard library handles this cleanly with <strong>base64.urlsafe_b64decode</strong>.
            The only trick is restoring the stripped padding:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import base64
import json

def decode_jwt_part(part: str) -> dict:
    padded = part + '=' * (-len(part) % 4)   # restore padding
    raw = base64.urlsafe_b64decode(padded)
    return json.loads(raw)

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAxIn0.sig"
header_b64, payload_b64, signature_b64 = token.split('.')

print(decode_jwt_part(header_b64))    # {'alg': 'HS256', 'typ': 'JWT'}
print(decode_jwt_part(payload_b64))   # {'sub': '1001'}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            If you already use the <strong>PyJWT</strong> library, you can decode without verification
            explicitly — note how the API forces you to acknowledge that signature checking is off:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import jwt  # pip install PyJWT

claims = jwt.decode(token, options={"verify_signature": False})
print(claims)  # payload dict — UNVERIFIED, for inspection only`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Decoding Is Not Verifying — Never Trust a Decoded Token
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This is the single most important thing to understand. Base64url is an <strong>encoding</strong>,
            not encryption and not a signature check. Anyone can decode a JWT, and anyone can
            <strong> construct</strong> one with any claims they like. What makes a JWT trustworthy is the
            signature, and checking the signature requires the secret key (HS256) or the public key (RS256).
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Decoding</strong> — reading the JSON inside. Safe for debugging, useless for security decisions.</li>
            <li><strong>Verifying</strong> — recomputing the signature and comparing it, plus checking expiry, issuer, and audience. This is what your server must do on every request.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            A classic vulnerability is a backend that calls <strong>jwt.decode()</strong> (or reads the payload
            manually) and trusts the <strong>role</strong> or <strong>userId</strong> claim without verification.
            An attacker just edits the payload, re-encodes it, and becomes an admin. Always use
            <strong> jwt.verify()</strong> in Node.js or <strong>jwt.decode(token, key, algorithms=[...])</strong> in
            PyJWT on the server side.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why You Should Not Paste Production Tokens into Random Websites
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A JWT is a <strong>bearer token</strong>: whoever holds it can use it. If you paste a live
            production token into an online decoder that sends it to a server — for logging, analytics,
            or worse — that token can be replayed against your API until it expires. Treat a JWT with the
            same care as a password that auto-expires.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Prefer client-side decoders</strong> — tools that decode with JavaScript in your browser and make no network request with the token. The <Link href="/jwt-decoder">Dev Brains AI JWT Decoder</Link> works this way.</li>
            <li><strong>Check the network tab</strong> — open DevTools while decoding; you should see zero requests containing the token.</li>
            <li><strong>Use expired or staging tokens</strong> — when sharing a token in a bug report or Slack message, use one from a test environment or one that has already expired.</li>
            <li><strong>Rotate if leaked</strong> — if a live token was pasted somewhere questionable, revoke the session or wait out the expiry, and rotate the signing secret if the token was long-lived.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick Reference: Safe JWT Decoding Checklist
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Split on <strong>.</strong> — expect exactly three parts</li>
            <li>Convert base64url to base64 (<strong>-</strong> to <strong>+</strong>, <strong>_</strong> to <strong>/</strong>) and re-add <strong>=</strong> padding</li>
            <li>Decode header and payload only — the signature is binary</li>
            <li>Remember: expiry (<strong>exp</strong>) is in unix <strong>seconds</strong>, so multiply by 1000 for JavaScript dates</li>
            <li>Never make authorization decisions from decoded-but-unverified claims</li>
            <li>Only paste tokens into client-side tools, and prefer non-production tokens</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I decode a JWT token without a library?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Split the token on the dot character, take the first two parts, convert base64url to base64 by replacing - with + and _ with /, then base64-decode and JSON.parse the result. The signature (third part) is binary and cannot be decoded to JSON.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is it safe to paste a JWT into an online decoder?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Only if the tool decodes entirely in your browser and never sends the token to a server. A JWT is a live credential — anyone who captures it can impersonate you until it expires. Use client-side tools like the <Link href="/jwt-decoder">Dev Brains AI JWT Decoder</Link>, and prefer expired or test tokens when possible.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does decoding a JWT verify that it is valid?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Decoding only reads the base64url-encoded header and payload, which anyone can do. Verification requires checking the cryptographic signature against the secret or public key on the server. Never trust claims from a token you have only decoded.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JWT Decoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Decode any JWT&apos;s header, payload, and expiry instantly — 100% in your browser.
              Your token never leaves your machine. No signup, no cost.
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
              <li><Link href="/blog/jwt-structure-explained-header-payload-signature">JWT Structure Explained: Header, Payload, Signature</Link></li>
              <li><Link href="/blog/jwt-expiry-claims-exp-iat-nbf-explained">JWT Expiry Claims: exp, iat, nbf Explained</Link></li>
              <li><Link href="/blog/jwt-authentication-explained-for-beginners">JWT Authentication Explained for Beginners</Link></li>
              <li><Link href="/blog/decode-jwt-tokens-base64-javascript">Decode JWT Tokens with Base64 in JavaScript</Link></li>
              <li><Link href="/blog/base64-encoding-vs-encryption-difference">Base64 Encoding vs Encryption: The Difference</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
