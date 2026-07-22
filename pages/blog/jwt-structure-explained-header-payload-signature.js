// pages/blog/jwt-structure-explained-header-payload-signature.js
import Head from 'next/head';
import Link from 'next/link';

export default function JwtStructureExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JWT Structure Explained: Header, Payload, Signature',
        item: 'https://dev-brains-ai.com/blog/jwt-structure-explained-header-payload-signature',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JWT Structure Explained: Header, Payload, and Signature Deep Dive',
    description:
      'A field-by-field deep dive into JWT anatomy: header fields like alg, typ, and kid, registered vs public vs private claims, and how HS256 and RS256 signatures actually work.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/jwt-structure-explained-header-payload-signature',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the three parts of a JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A JWT has a header (JSON metadata such as the signing algorithm), a payload (JSON claims about the user and token), and a signature (cryptographic proof that the header and payload were not modified). The three parts are base64url-encoded and joined with dots.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between HS256 and RS256?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HS256 is symmetric: the same secret key both signs and verifies the token, so every verifier can also forge tokens. RS256 is asymmetric: a private key signs and a public key verifies, so services can verify tokens without being able to create them. RS256 suits microservices and third-party verification.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the kid field in a JWT header?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'kid means Key ID. It tells the verifier which key from a key set (usually a JWKS endpoint) was used to sign the token, which enables key rotation. The verifier must look up the key by kid from a trusted source, never accept a key embedded in the token itself.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JWT Structure Explained: Header, Payload, Signature | Dev Brains AI</title>
        <meta
          name="description"
          content="Deep dive into JWT anatomy: header fields (alg, typ, kid), registered vs public vs private claims, HS256 vs RS256 signing, with a real token decoded field by field."
        />
        <meta
          name="keywords"
          content="jwt structure, jwt header payload signature, jwt claims, registered claims, jwt alg, jwt kid, hs256 vs rs256, jwt anatomy, json web token structure"
        />
        <meta property="og:title" content="JWT Structure Explained: Header, Payload, Signature" />
        <meta property="og:description" content="Deep dive into JWT anatomy: header fields (alg, typ, kid), registered vs public vs private claims, HS256 vs RS256 signing, with a real token decoded field by field." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/jwt-structure-explained-header-payload-signature" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/jwt-structure-explained-header-payload-signature" />
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
              <li aria-current="page">JWT Structure Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JWT Structure Explained: Header, Payload, and Signature Deep Dive
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Most JWT tutorials stop at &quot;it has three parts&quot;. This one goes deeper. We will walk
            through every field of a real token: what <strong>alg</strong>, <strong>typ</strong>, and
            <strong> kid</strong> mean in the header, how registered claims differ from public and private
            claims in the payload, and what actually happens byte-by-byte when a token is signed with
            HS256 versus RS256. By the end, a decoded JWT should read like plain documentation to you.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Big Picture: header.payload.signature
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A JSON Web Token (defined in RFC 7519) is a compact, URL-safe way of transmitting signed
            claims between parties. Here is a complete example token, split for readability:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS0yMDI2LTA3In0   <- HEADER
.
eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiJ1c2VyXzQy
IiwiYXVkIjoiaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20iLCJleHAiOjE3ODM0MjU2
MDAsImlhdCI6MTc4MzQyNDcwMCwicm9sZSI6ImVkaXRvciJ9                  <- PAYLOAD
.
4lC7ZkFvQ2m8HxNwT1pRaU3sYbE9jKdOgWi5nMfB0cA                       <- SIGNATURE`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Each of the first two parts is just base64url-encoded JSON. The third part is raw signature
            bytes, also base64url-encoded. Nothing is encrypted — a JWT is <strong>signed, not secret</strong>.
            Anyone can read it; only the key holder can produce a valid signature for it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Header: alg, typ, and kid
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Decoding the header above gives:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`{
  "alg": "HS256",
  "typ": "JWT",
  "kid": "key-2026-07"
}`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>alg</strong> — the signing algorithm. Common values: <strong>HS256</strong> (HMAC-SHA256, symmetric), <strong>RS256</strong> (RSA-SHA256, asymmetric), <strong>ES256</strong> (ECDSA, asymmetric but with smaller keys and signatures). The dangerous value is <strong>none</strong> — a verifier must never accept it. Your server should hard-code the algorithms it accepts, not read them from the token.</li>
            <li><strong>typ</strong> — the token type, almost always <strong>JWT</strong>. Some systems use <strong>at+jwt</strong> for OAuth access tokens so verifiers can reject ID tokens sent where access tokens belong.</li>
            <li><strong>kid</strong> — the Key ID. When an issuer rotates keys, it publishes several public keys (usually at a JWKS URL like <strong>/.well-known/jwks.json</strong>) and stamps each token with the id of the key that signed it. The verifier picks the matching key by <strong>kid</strong>. Important: <strong>kid</strong> is a lookup hint into keys you already trust — never fetch or accept key material that the token itself supplies (that is what makes <strong>jku</strong> and <strong>x5u</strong> header injection attacks work).</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Payload: Registered, Public, and Private Claims
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The decoded payload of our example:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`{
  "iss": "https://auth.example.com",   // issuer  - who created the token
  "sub": "user_42",                    // subject - who the token is about
  "aud": "https://api.example.com",    // audience - who should accept it
  "exp": 1783425600,                   // expiry (unix seconds)
  "iat": 1783424700,                   // issued-at (unix seconds)
  "role": "editor"                     // private claim - app-specific
}`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            RFC 7519 groups claims into three categories:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Registered claims</strong> — standardized short names with defined meaning: <strong>iss</strong>, <strong>sub</strong>, <strong>aud</strong>, <strong>exp</strong>, <strong>nbf</strong>, <strong>iat</strong>, <strong>jti</strong> (unique token id, useful for revocation lists). All optional, but <strong>exp</strong> should be considered mandatory in practice.</li>
            <li><strong>Public claims</strong> — names registered in the IANA JSON Web Token Claims registry or namespaced with a URI to avoid collisions, e.g. <strong>email</strong>, <strong>name</strong>, or <strong>https://myapp.com/claims/tenant</strong>. These are meant to be understood across systems.</li>
            <li><strong>Private claims</strong> — anything two parties agree on privately, like <strong>role</strong> or <strong>plan</strong> above. Fine within your own ecosystem, but keep them small: every claim travels on every request, and an HTTP header over ~8 KB will be rejected by many proxies.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            One rule cuts across all three categories: <strong>never put secrets in the payload</strong>.
            It is readable by anyone who obtains the token — no key required.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Signature: HS256 vs RS256 Signing Flows
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The signature is computed over the exact base64url text of the first two parts:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`signingInput = base64url(header) + "." + base64url(payload)

HS256:  signature = HMAC-SHA256(secret, signingInput)
RS256:  signature = RSA-PKCS1-v1.5-Sign(privateKey, SHA256(signingInput))`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The practical difference matters more than the math:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>HS256 (symmetric)</strong> — one shared secret signs <strong>and</strong> verifies. Simple and fast, ideal when the same service issues and consumes tokens. Weakness: every service that can verify can also mint tokens, and a short human-chosen secret can be brute-forced offline.</li>
            <li><strong>RS256 (asymmetric)</strong> — the auth server keeps a private key; every other service verifies with the public key. Perfect for microservices and third-party integrations: verification ability never implies forging ability. Tokens and signatures are larger (an RS256 signature is 256 bytes for a 2048-bit key vs 32 bytes for HS256).</li>
            <li><strong>ES256</strong> — the modern middle ground: asymmetric like RS256, but with signatures around 64 bytes. Increasingly the default for new systems.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Verification reverses the flow: the verifier rebuilds <strong>signingInput</strong> from the
            token it received, computes or checks the signature with its key, and rejects the token if a
            single byte of header or payload changed. That is the entire integrity guarantee of a JWT.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Walking Through the Example Token Field by Field
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>alg: HS256</strong> — verify only with HMAC-SHA256 and the configured secret. If a token arrives claiming RS256 or none, reject it.</li>
            <li><strong>kid: key-2026-07</strong> — the July 2026 signing key; the previous key can still verify old tokens during rotation overlap.</li>
            <li><strong>iss</strong> — must equal the issuer you expect. Prevents tokens from a different (even legitimate) auth server being accepted.</li>
            <li><strong>sub: user_42</strong> — the stable user identifier. Use this, not email (emails change), as your foreign key.</li>
            <li><strong>aud</strong> — must contain your API&apos;s identifier. Prevents a token minted for service A being replayed against service B.</li>
            <li><strong>exp / iat</strong> — 1783425600 minus 1783424700 is 900 seconds: a 15-minute token, a healthy lifetime for an access token.</li>
            <li><strong>role: editor</strong> — a private claim your API can trust <strong>only after</strong> signature verification passes.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            The fastest way to build this reading skill is repetition: paste tokens from your own apps
            into a client-side decoder and identify every field. The
            <Link href="/jwt-decoder"> Dev Brains AI JWT Decoder</Link> decodes in your browser and
            highlights expiry so nothing sensitive leaves your machine.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What are the three parts of a JWT?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A JWT has a header (JSON metadata such as the signing algorithm), a payload (JSON claims about the user and token), and a signature (cryptographic proof that the header and payload were not modified). The three parts are base64url-encoded and joined with dots.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between HS256 and RS256?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              HS256 is symmetric: the same secret key both signs and verifies the token, so every verifier can also forge tokens. RS256 is asymmetric: a private key signs and a public key verifies, so services can verify tokens without being able to create them. RS256 suits microservices and third-party verification.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the kid field in a JWT header?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              kid means Key ID. It tells the verifier which key from a key set (usually a JWKS endpoint) was used to sign the token, which enables key rotation. The verifier must look up the key by kid from a trusted source, never accept a key embedded in the token itself.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JWT Decoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Decode any JWT&apos;s header, payload, and expiry instantly — 100% in your browser.
              No signup, no cost, and your token never leaves your machine.
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
              <li><Link href="/blog/how-to-decode-a-jwt-token-safely">How to Decode a JWT Token Safely</Link></li>
              <li><Link href="/blog/jwt-expiry-claims-exp-iat-nbf-explained">JWT Expiry Claims: exp, iat, nbf Explained</Link></li>
              <li><Link href="/blog/jwt-security-best-practices-for-developers">JWT Security Best Practices for Developers</Link></li>
              <li><Link href="/blog/json-web-token-vs-session-authentication">JWT vs Session Authentication</Link></li>
              <li><Link href="/blog/api-authentication-methods-explained-oauth-jwt-apikey">API Authentication Methods: OAuth, JWT, API Keys</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
