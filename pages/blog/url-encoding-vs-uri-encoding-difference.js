// pages/blog/url-encoding-vs-uri-encoding-difference.js
import Head from 'next/head';
import Link from 'next/link';

export default function UrlVsUriEncoding() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: "URL Encoding vs URI Encoding — What's the Real Difference?",
        item: 'https://dev-brains-ai.com/blog/url-encoding-vs-uri-encoding-difference',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: "URL vs URI Encoding: What's the Real Difference?",
    description:
      'URL encoding and URI encoding both mean percent-encoding, but the terms come from different specs — learn the nuance and which term to use where.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/url-encoding-vs-uri-encoding-difference',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is URL encoding the same as URI encoding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Functionally, yes — both terms refer to percent-encoding, the same mechanism of replacing unsafe characters with %XX hex sequences. The difference is terminology: URI is the broader, formally correct term from RFC 3986, while URL refers specifically to web addresses, a subset of URIs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do JavaScript functions use "URI" instead of "URL" in their names?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JavaScript\'s encodeURIComponent() and encodeURI() are named after URI because that is the technically correct, broader term defined by the relevant RFC. URLs are a specific type of URI, so using "URI" in the API name covers URLs and other URI schemes like urn: or mailto:.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are reserved characters in a URI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reserved characters are symbols like : / ? # [ ] @ ! $ & \' ( ) * + , ; = that have special structural meaning in a URI, such as separating the scheme, host, path, and query. They must be percent-encoded when used as literal data rather than as a delimiter.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>URL vs URI Encoding: What's the Real Difference? | Dev Brains AI</title>
        <meta
          name="description"
          content="URL encoding and URI encoding both mean percent-encoding, but the terms come from different specs — learn the nuance and which term to use where."
        />
        <meta
          name="keywords"
          content="url encoding vs uri encoding, uri encoding, url encoding difference, percent encoding, reserved characters uri, rfc 3986"
        />
        <meta property="og:title" content="URL vs URI Encoding: What's the Real Difference?" />
        <meta property="og:description" content="URL encoding and URI encoding both mean percent-encoding, but the terms come from different specs — learn the nuance and which term to use where." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/url-encoding-vs-uri-encoding-difference" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/url-encoding-vs-uri-encoding-difference" />
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
              <li aria-current="page">URL vs URI Encoding</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            URL Encoding vs URI Encoding — What's the Real Difference?
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            "URL encoding" and "URI encoding" are used interchangeably by most developers, and in
            practice they describe the exact same mechanism: percent-encoding. But the terms aren't
            actually synonyms at the specification level, and understanding why clears up a lot of
            confusion around function names like <code>encodeURIComponent</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>URI is the broader, correct term</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A URI (Uniform Resource Identifier) is any string that identifies a resource — it's
            defined by RFC 3986. A URL (Uniform Resource Locator) is one kind of URI: specifically
            one that also tells you how to <em>locate</em> the resource (a scheme + host + path). All
            URLs are URIs, but not all URIs are URLs.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`https://dev-brains-ai.com/blog       ← URL (and also a URI)
mailto:someone@example.com           ← URI, not conventionally called a URL
urn:isbn:9780132350884               ← URI (URN), not a URL — no locator info
tel:+911234567890                    ← URI, not a URL`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>So what does "encoding" mean for each?</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The encoding mechanism itself — percent-encoding — is defined once, in RFC 3986, as part
            of the URI spec. "URL encoding" isn't a separate algorithm; it's just the same
            percent-encoding applied to a URL specifically. This is exactly why JavaScript's built-in
            functions are named with "URI," not "URL" — they operate on the general spec:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`encodeURIComponent('a value with spaces & symbols');
// → 'a%20value%20with%20spaces%20%26%20symbols'
// Named "URI" because it implements the RFC 3986 percent-encoding rules,
// applicable to any URI, not just HTTP(S) URLs`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Reserved vs unreserved characters</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            RFC 3986 splits characters into two groups. <strong>Unreserved characters</strong> —
            letters, digits, <code>- _ . ~</code> — never need encoding. <strong>Reserved
            characters</strong> have structural meaning (they separate parts of the URI) and must be
            encoded whenever they appear as literal data rather than as a delimiter.
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Reserved (structural)</strong> — <code>: / ? # [ ] @ ! $ &amp; ' ( ) * + , ; =</code></li>
            <li><strong>Unreserved (never encoded)</strong> — <code>A-Z a-z 0-9 - _ . ~</code></li>
            <li>Everything else (spaces, non-ASCII, most symbols) is always percent-encoded.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Why the distinction matters in practice</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            When you hear "URL encoding" in casual conversation, in Postman, in a form field, or in
            most non-spec documentation, treat it as identical to percent-encoding / URI encoding.
            The only place the distinction genuinely matters is when reading RFCs or writing
            spec-accurate documentation — pick "URI encoding" for technical precision, "URL encoding"
            when talking informally about web addresses specifically.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Python's urllib module also favors "quote" and "url" terminology
from urllib.parse import quote

quote('hello world & more')
# → 'hello%20world%20%26%20more'
# Same percent-encoding, Python just calls the function "quote"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Quick terminology cheat sheet</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Percent-encoding</strong> — the formal, spec-accurate name for the %XX encoding mechanism.</li>
            <li><strong>URI encoding</strong> — same mechanism, described relative to the general URI spec (RFC 3986).</li>
            <li><strong>URL encoding</strong> — same mechanism, described relative to web URLs specifically; the term most developers actually use day to day.</li>
            <li>All three describe the identical transformation — there is no functional difference to worry about in code.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Is URL encoding the same as URI encoding?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Functionally, yes — both terms refer to percent-encoding, the same mechanism of
              replacing unsafe characters with %XX hex sequences. The difference is terminology: URI
              is the broader, formally correct term from RFC 3986, while URL refers specifically to
              web addresses, a subset of URIs.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why do JavaScript functions use "URI" instead of "URL" in their names?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              JavaScript's encodeURIComponent() and encodeURI() are named after URI because that is
              the technically correct, broader term defined by the relevant RFC. URLs are a specific
              type of URI, so using "URI" in the API name covers URLs and other URI schemes like urn:
              or mailto:.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What are reserved characters in a URI?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Reserved characters are symbols like : / ? # [ ] @ ! $ &amp; ' ( ) * + , ; = that have
              special structural meaning in a URI, such as separating the scheme, host, path, and
              query. They must be percent-encoded when used as literal data rather than as a
              delimiter.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free URL Encoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              See percent-encoding in action — paste any string or URL into our free online tool to
              encode or decode it instantly.
            </p>
            <Link href="/url-encoder">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open URL Encoder →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/url-encoding-guide-for-web-developers">URL Encoding Guide for Web Developers</Link></li>
              <li><Link href="/blog/percent-encoding-special-characters-guide">Percent-Encoding Special Characters — A Reference Guide</Link></li>
              <li><Link href="/blog/base64-vs-url-encoding-difference">Base64 vs URL Encoding — What's the Difference?</Link></li>
              <li><Link href="/blog/url-encoding-common-mistakes-developers-make">Common URL Encoding Mistakes Developers Make</Link></li>
              <li><Link href="/blog/url-encoding-rest-api-query-parameters">URL Encoding for REST API Query Parameters</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
