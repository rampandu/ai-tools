// pages/jwt-decoder.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

function toBase64Url(json) {
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const SAMPLE_HEADER = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
const SAMPLE_PAYLOAD = toBase64Url(
  JSON.stringify({ sub: '1234567890', name: 'Priya Sharma', iat: 1752480000, exp: 1783929600 })
);
const SAMPLE_TOKEN = `${SAMPLE_HEADER}.${SAMPLE_PAYLOAD}.sample-signature`;

const EXPIRED_PAYLOAD = toBase64Url(
  JSON.stringify({ sub: '9876543210', name: 'Expired Session', iat: 1609459200, exp: 1612137600 })
);
const EXPIRED_TOKEN = `${SAMPLE_HEADER}.${EXPIRED_PAYLOAD}.sample-signature`;

const EXAMPLES = [
  { label: 'Valid sample token', token: SAMPLE_TOKEN },
  { label: 'Expired token', token: EXPIRED_TOKEN },
];

const STANDARD_CLAIMS = [
  { key: 'iss', label: 'Issuer (iss)' },
  { key: 'sub', label: 'Subject (sub)' },
  { key: 'aud', label: 'Audience (aud)' },
  { key: 'exp', label: 'Expiration (exp)' },
  { key: 'iat', label: 'Issued at (iat)' },
  { key: 'nbf', label: 'Not before (nbf)' },
  { key: 'jti', label: 'JWT ID (jti)' },
];

const TIME_CLAIMS = ['exp', 'iat', 'nbf'];

const FAQ = [
  {
    q: 'Is this JWT Decoder free?',
    a: 'Yes — the JWT Decoder on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Is my token sent to a server?',
    a: 'No. The token is decoded entirely in your browser using JavaScript (base64url decoding). Nothing you paste is uploaded, logged, or stored on our servers.',
  },
  {
    q: 'Does this tool verify the JWT signature?',
    a: 'No. It decodes the header and payload so you can read them, but it does NOT verify the signature. Signature verification requires the secret key (for HMAC algorithms like HS256) or the public key (for RSA/ECDSA algorithms like RS256), which this tool never asks for. Never treat a decoded token as trusted — always verify signatures on your server.',
  },
  {
    q: 'Is it safe to paste a production token here?',
    a: 'Even though decoding happens locally and nothing leaves your browser, we still discourage pasting production tokens that contain real user data or grant live access. Prefer test tokens, expired tokens, or tokens from a development environment.',
  },
  {
    q: 'Why can anyone decode my JWT without the secret?',
    a: 'The header and payload of a JWT are only base64url-encoded, not encrypted. Encoding is a reversible transformation, so anyone with the token can read its contents. The secret key protects the integrity of the token (via the signature), not its confidentiality — never put sensitive data in a JWT payload.',
  },
];

export default function JwtDecoderPage() {
  const [token, setToken] = useState(SAMPLE_TOKEN);
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState(null);

  function base64UrlDecode(part) {
    let s = part.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4 !== 0) s += '=';
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function handleDecode() {
    setError(null);
    setDecoded(null);
    const trimmed = token.trim();
    if (!trimmed) {
      setError('Please paste a JWT first.');
      return;
    }
    const parts = trimmed.split('.');
    if (parts.length < 2) {
      setError(
        'That does not look like a JWT. A JWT has three dot-separated parts: header.payload.signature.'
      );
      return;
    }
    let header;
    let payload;
    try {
      header = JSON.parse(base64UrlDecode(parts[0]));
    } catch (e) {
      setError('Could not decode the header — it is not valid base64url-encoded JSON.');
      return;
    }
    try {
      payload = JSON.parse(base64UrlDecode(parts[1]));
    } catch (e) {
      setError('Could not decode the payload — it is not valid base64url-encoded JSON.');
      return;
    }
    setDecoded({
      header,
      payload,
      signature: parts[2] || '',
      now: Date.now(),
    });
  }

  function formatClaimValue(key, value) {
    if (TIME_CLAIMS.includes(key) && typeof value === 'number') {
      return `${value} — ${new Date(value * 1000).toUTCString()}`;
    }
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object' && value !== null) return JSON.stringify(value);
    return String(value);
  }

  const presentClaims = decoded
    ? STANDARD_CLAIMS.filter((c) => decoded.payload && decoded.payload[c.key] !== undefined)
    : [];

  const expStatus =
    decoded && typeof decoded.payload?.exp === 'number'
      ? decoded.payload.exp * 1000 < decoded.now
        ? { expired: true, text: `Expired on ${new Date(decoded.payload.exp * 1000).toUTCString()}` }
        : { expired: false, text: `Valid until ${new Date(decoded.payload.exp * 1000).toUTCString()}` }
      : null;

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
    name: 'Dev Brains AI JWT Decoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free JWT decoder that runs entirely in your browser. Paste a token to inspect its header, payload, and standard claims with human-readable dates and expiry status.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'JWT Decoder', item: 'https://dev-brains-ai.com/jwt-decoder' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free JWT Decoder — Inspect Header, Payload &amp; Claims | Dev Brains AI</title>
        <meta
          name="description"
          content="Decode any JSON Web Token instantly in your browser. See the header, payload, standard claims (iss, sub, exp, iat), human-readable dates, and expiry status. 100% client-side — nothing is uploaded."
        />
        <meta
          name="keywords"
          content="jwt decoder, decode jwt online, jwt debugger, json web token decoder, jwt payload viewer, jwt expiry checker, Dev Brains AI"
        />
        <meta property="og:title" content="Free JWT Decoder — Inspect Header, Payload &amp; Claims" />
        <meta
          property="og:description"
          content="Paste a JWT and instantly see its decoded header, payload, and claims with human-readable dates and expiry status. Runs 100% in your browser."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/jwt-decoder" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/jwt-decoder" />

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
            <li aria-current="page">JWT Decoder</li>
          </ol>
        </nav>

        <h1>Free JWT Decoder</h1>
        <p className="small">
          Paste a <strong>JSON Web Token</strong> below and click <strong>Decode</strong> to see
          its header, payload, and standard claims — including human-readable dates for{' '}
          <code>exp</code>, <code>iat</code>, and <code>nbf</code>, and a clear expired/valid
          status. Everything runs in your browser; nothing is uploaded.
        </p>

        <p className="small" style={{ background: '#fef3c7', padding: 10, borderRadius: 8 }}>
          <strong>Note:</strong> this tool <strong>decodes</strong> the token so you can read it —
          it does <strong>not verify the signature</strong>. Verification requires the secret or
          public key. Also, even though nothing leaves your browser, avoid pasting live production
          tokens that grant real access or contain sensitive user data.
        </p>

        <label htmlFor="jwt-input">
          <strong>JWT token</strong>
        </label>
        <textarea
          id="jwt-input"
          aria-label="JWT token to decode"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ minHeight: 120, fontFamily: 'monospace', wordBreak: 'break-all' }}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature"
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={handleDecode}>
            Decode
          </button>
          <button
            type="button"
            onClick={() => {
              setToken('');
              setDecoded(null);
              setError(null);
            }}
          >
            Clear
          </button>
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
                  setToken(ex.token);
                  setDecoded(null);
                  setError(null);
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

          {decoded && (
            <div style={{ marginTop: 4 }}>
              <div
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}
              >
                <span
                  style={{
                    background: '#0f172a',
                    color: '#e2e8f0',
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontFamily: 'monospace',
                  }}
                >
                  alg: {String(decoded.header.alg || 'none')}
                </span>
                <span
                  style={{
                    background: '#0f172a',
                    color: '#e2e8f0',
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontFamily: 'monospace',
                  }}
                >
                  typ: {String(decoded.header.typ || 'n/a')}
                </span>
                {expStatus && (
                  <strong style={{ color: expStatus.expired ? 'crimson' : '#16a34a' }}>
                    {expStatus.expired ? '✗ ' : '✓ '}
                    {expStatus.text}
                  </strong>
                )}
              </div>

              <h3 style={{ marginTop: 12, marginBottom: 6 }}>Header</h3>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: 12,
                  borderRadius: 8,
                  overflowX: 'auto',
                }}
              >
                <code>{JSON.stringify(decoded.header, null, 2)}</code>
              </pre>

              <h3 style={{ marginTop: 16, marginBottom: 6 }}>Payload</h3>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: 12,
                  borderRadius: 8,
                  overflowX: 'auto',
                }}
              >
                <code>{JSON.stringify(decoded.payload, null, 2)}</code>
              </pre>

              {presentClaims.length > 0 && (
                <>
                  <h3 style={{ marginTop: 16, marginBottom: 6 }}>Standard claims</h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }} className="small">
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '6px 10px', borderBottom: '1px solid #cbd5e1' }}>
                            Claim
                          </th>
                          <th style={{ textAlign: 'left', padding: '6px 10px', borderBottom: '1px solid #cbd5e1' }}>
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {presentClaims.map((c) => (
                          <tr key={c.key}>
                            <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>
                              <strong>{c.label}</strong>
                            </td>
                            <td
                              style={{
                                padding: '6px 10px',
                                borderBottom: '1px solid #e2e8f0',
                                fontFamily: 'monospace',
                              }}
                            >
                              {formatClaimValue(c.key, decoded.payload[c.key])}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <h3 style={{ marginTop: 16, marginBottom: 6 }}>Signature (not verified)</h3>
              <p className="small" style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {decoded.signature || '(empty — unsecured token)'}
              </p>
            </div>
          )}

          {!decoded && !error && (
            <div className="small">
              No result yet — press <strong>Decode</strong>.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this JWT Decoder</h2>
        <p>
          JSON Web Tokens (JWTs) are the de facto standard for stateless authentication in modern
          web apps and APIs. When a login flow misbehaves, the fastest way to debug it is usually
          to look inside the token itself: which algorithm signed it, who issued it, which user it
          belongs to, and — most often — whether it has expired. This free JWT Decoder does exactly
          that. Paste any token and it instantly splits it into its three parts, base64url-decodes
          the header and payload, pretty-prints both as JSON, and lays out the standard claims in a
          readable table with human-friendly UTC dates.
        </p>
        <p>
          The entire tool runs client-side in your browser. There is no API call, no upload, and no
          storage — the decoding is plain JavaScript operating on the text in the box. That said,
          treat tokens like passwords: if a token is live and grants access to a production system,
          prefer decoding a test or expired token instead.
        </p>

        <h3>How a JWT is structured</h3>
        <p>
          A JWT is three base64url-encoded segments joined by dots:{' '}
          <code>header.payload.signature</code>.
        </p>
        <ul>
          <li>
            <strong>Header</strong> — metadata about the token, most importantly <code>alg</code>{' '}
            (the signing algorithm, e.g. HS256 or RS256) and <code>typ</code> (usually{' '}
            <code>JWT</code>).
          </li>
          <li>
            <strong>Payload</strong> — the claims: registered claims like <code>iss</code>,{' '}
            <code>sub</code>, <code>aud</code>, <code>exp</code>, <code>iat</code>,{' '}
            <code>nbf</code>, and <code>jti</code>, plus any custom claims your app adds (roles,
            email, tenant id, and so on).
          </li>
          <li>
            <strong>Signature</strong> — an HMAC or digital signature over the first two segments.
            It proves the token was issued by someone holding the key and has not been tampered
            with. This tool displays the raw signature but cannot check it without the key.
          </li>
        </ul>

        <h3>Understanding the time claims</h3>
        <ul>
          <li>
            <strong>exp (expiration)</strong> — the unix timestamp (in seconds) after which the
            token must be rejected. This tool compares it against your current clock and shows a
            green &quot;Valid until&quot; or red &quot;Expired&quot; status.
          </li>
          <li>
            <strong>iat (issued at)</strong> — when the token was created. Useful for spotting
            tokens with suspiciously long lifetimes.
          </li>
          <li>
            <strong>nbf (not before)</strong> — the token must not be accepted before this time.
            Less common, but occasionally the cause of mysterious &quot;invalid token&quot; errors
            when server clocks drift.
          </li>
        </ul>
        <p>
          All three are unix timestamps in <strong>seconds</strong>, not milliseconds — a classic
          source of bugs when JavaScript&apos;s <code>Date.now()</code> (milliseconds) is compared
          against them directly. If you need to convert timestamps by hand, our{' '}
          <Link href="/timestamp-converter">Unix Timestamp Converter</Link> handles both units.
        </p>

        <h3>Decoding is not verification</h3>
        <p>
          The most important thing to understand about JWTs: the header and payload are{' '}
          <strong>encoded, not encrypted</strong>. Base64url is a reversible text encoding — anyone
          who obtains a token can read every claim inside it, no secret required. What the secret
          (or private key) protects is the <strong>signature</strong>, which lets your server
          confirm the token is genuine and unmodified. Practical consequences:
        </p>
        <ul>
          <li>Never store passwords, card numbers, or other secrets in a JWT payload.</li>
          <li>
            Never trust claims from a token whose signature you have not verified server-side.
          </li>
          <li>
            Reject tokens whose header declares <code>alg: none</code> or an algorithm your server
            does not expect — algorithm-confusion attacks rely on servers being too permissive.
          </li>
          <li>Keep token lifetimes short and use refresh tokens for long-lived sessions.</li>
        </ul>

        <h3>Common JWT debugging scenarios</h3>
        <ul>
          <li>
            <strong>401 errors after login</strong> — decode the token and check <code>exp</code>;
            an expired token is the most common culprit.
          </li>
          <li>
            <strong>Wrong user or missing roles</strong> — inspect the payload to confirm the
            claims your backend actually put in the token match what the frontend expects.
          </li>
          <li>
            <strong>Audience/issuer mismatches</strong> — compare <code>aud</code> and{' '}
            <code>iss</code> against your API&apos;s configured values.
          </li>
          <li>
            <strong>Clock skew</strong> — if a fresh token is rejected as &quot;not yet
            valid&quot;, check <code>nbf</code> and <code>iat</code> against server time.
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: JWT Decoder</h3>
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
          Working with base64 directly? Try the <Link href="/base64-tool">Base64 Encoder/Decoder</Link>,
          or hash data with the <Link href="/hash-generator">Hash Generator</Link>. To go deeper on
          tokens, read{' '}
          <Link href="/blog/jwt-authentication-explained-for-beginners">
            JWT Authentication Explained for Beginners
          </Link>
          ,{' '}
          <Link href="/blog/decode-jwt-tokens-base64-javascript">
            How to Decode JWT Tokens with Base64 in JavaScript
          </Link>
          , and{' '}
          <Link href="/blog/json-web-token-vs-session-authentication">
            JWT vs Session Authentication
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
