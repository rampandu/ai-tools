// pages/blog/url-encoding-common-mistakes-developers-make.js
import Head from 'next/head';
import Link from 'next/link';

export default function UrlEncodingCommonMistakes() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Common URL Encoding Mistakes Developers Make',
        item: 'https://dev-brains-ai.com/blog/url-encoding-common-mistakes-developers-make',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Common URL Encoding Mistakes Developers Make',
    description:
      'The most common URL-encoding bugs developers run into: double-encoding, encoding a whole URL instead of just the parameters, and mixing up + and %20 for spaces — with fixes for each.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/url-encoding-common-mistakes-developers-make',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is double-encoding and why is it a bug?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Double-encoding happens when you call an encoding function on a string that is already percent-encoded. The % from the first encoding gets encoded again into %25, turning %20 into %2520 instead of staying %20 — which breaks the value when the server decodes it only once.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use encodeURI or encodeURIComponent on a full URL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never run encodeURIComponent on an entire URL — it encodes structural characters like :, /, and ? too, breaking the URL. Use encodeURI for a full URL, or better, encode only the individual dynamic parts (like query values) with encodeURIComponent before assembling the URL.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is + the same as %20 for encoding a space in a URL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only inside application/x-www-form-urlencoded data, such as form submissions and query strings built by URLSearchParams. Outside that context, + is a literal plus sign, not a space, and %20 is the only universally correct way to encode a space.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Common URL Encoding Mistakes Developers Make | Dev Brains AI</title>
        <meta
          name="description"
          content="The most common URL-encoding bugs developers run into: double-encoding, encoding a whole URL instead of just parameters, and mixing up + and %20 for spaces."
        />
        <meta
          name="keywords"
          content="url encoding mistakes, double encoding bug, encodeURI vs encodeURIComponent mistake, url encoding plus vs space, common encoding errors"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/url-encoding-common-mistakes-developers-make" />
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
              <li aria-current="page">URL Encoding Mistakes</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Common URL Encoding Mistakes Developers Make
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            URL encoding bugs are sneaky — they often work fine in local testing and only break with
            specific real-world input: a redirect URL, a name with an ampersand, or a search query
            with special characters. Here are the mistakes that come up again and again, and how to
            avoid each one.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Mistake 1: double-encoding</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This happens when a value gets encoded twice — often because it was already encoded
            upstream (e.g. by a form, a router, or a previous function call) and your code encodes it
            again. The <code>%</code> from the first pass gets re-encoded into <code>%25</code>.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const raw = 'hello world';

const encodedOnce = encodeURIComponent(raw);
// → 'hello%20world'   (correct)

const encodedTwice = encodeURIComponent(encodedOnce);
// → 'hello%2520world'  (BUG — the % became %25)

// Fix: encode exactly once, at the point where the value enters the URL.
// If you're not sure whether a value is already encoded, decode first,
// then encode once to normalize it:
const normalized = encodeURIComponent(decodeURIComponent(encodedOnce));
// → 'hello%20world'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Mistake 2: encoding the whole URL instead of just the parameters</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Running <code>encodeURIComponent</code> on a complete URL encodes structural characters
            like <code>:</code>, <code>/</code>, and <code>?</code> too — turning a working URL into
            garbage. Only encode the dynamic parts (query values, path segments containing user
            input), not the whole thing.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const search = 'node.js & express';

// WRONG — encodes the entire URL, breaking :// and ?
const bad = encodeURIComponent(\`https://api.example.com/search?q=\${search}\`);
// → 'https%3A%2F%2Fapi.example.com%2Fsearch%3Fq%3Dnode.js%20%26%20express'
// This is no longer a valid URL — it's a single encoded blob.

// RIGHT — only encode the dynamic value, keep the URL structure intact
const good = \`https://api.example.com/search?q=\${encodeURIComponent(search)}\`;
// → 'https://api.example.com/search?q=node.js%20%26%20express'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Mistake 3: forgetting to encode a redirect URL passed as a parameter</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            When you pass one URL as a query parameter of another (a common pattern for login
            redirects), the inner URL's own <code>?</code> and <code>&amp;</code> characters will be
            misread as belonging to the outer URL unless the inner URL is encoded first.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const returnTo = 'https://app.example.com/dashboard?tab=billing&ref=email';

// WRONG — the inner URL's & splits the outer query string
const bad = \`https://auth.example.com/login?returnTo=\${returnTo}\`;
// → '...?returnTo=https://app.example.com/dashboard?tab=billing&ref=email'
// The server now sees "tab" and "ref" as SEPARATE outer params — broken.

// RIGHT — encode the inner URL before embedding it
const good = \`https://auth.example.com/login?returnTo=\${encodeURIComponent(returnTo)}\`;
// → '...?returnTo=https%3A%2F%2Fapp.example.com%2Fdashboard%3Ftab%3Dbilling%26ref%3Demail'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Mistake 4: confusing + and %20 for spaces</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>+</code> only means "space" inside{' '}
            <code>application/x-www-form-urlencoded</code> content (form submissions, and query
            strings built with <code>URLSearchParams</code>). Everywhere else — path segments,
            fragment identifiers, manually-built strings — <code>+</code> is a literal plus sign, and{' '}
            <code>%20</code> is the only unambiguous way to encode a space.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`encodeURIComponent('a+b');   // 'a%2Bb'   — encodeURIComponent always escapes '+'
encodeURIComponent('a b');   // 'a%20b'   — spaces become %20, not '+'

// URLSearchParams uses form-urlencoded convention: space becomes '+'
new URLSearchParams({ q: 'a b' }).toString();
// → 'q=a+b'

// If you manually decode a URLSearchParams-style string with decodeURIComponent
// instead of URLSearchParams.get(), '+' will NOT be converted back to a space:
decodeURIComponent('a+b'); // 'a+b'  (WRONG if you meant 'a b')
new URLSearchParams('q=a+b').get('q'); // 'a b'  (correct)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Quick checklist to avoid these bugs</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>Encode each dynamic value exactly once, right before inserting it into the URL — never encode a URL that might already be encoded without checking first.</li>
            <li>Use <code>encodeURIComponent</code> for individual values, never for a complete URL.</li>
            <li>Always encode nested URLs (redirects, callback URLs) before embedding them as a parameter.</li>
            <li>Be consistent about <code>+</code> vs <code>%20</code> — prefer <code>URLSearchParams</code> so the library handles the convention correctly for you.</li>
            <li>Prefer <code>URL</code> / <code>URLSearchParams</code> over manual string concatenation whenever possible — they eliminate most of these mistakes by construction.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is double-encoding and why is it a bug?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Double-encoding happens when you call an encoding function on a string that is already
              percent-encoded. The % from the first encoding gets encoded again into %25, turning
              %20 into %2520 instead of staying %20 — which breaks the value when the server decodes
              it only once.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use encodeURI or encodeURIComponent on a full URL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Never run encodeURIComponent on an entire URL — it encodes structural characters like
              :, /, and ? too, breaking the URL. Use encodeURI for a full URL, or better, encode only
              the individual dynamic parts (like query values) with encodeURIComponent before
              assembling the URL.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is + the same as %20 for encoding a space in a URL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Only inside application/x-www-form-urlencoded data, such as form submissions and query
              strings built by URLSearchParams. Outside that context, + is a literal plus sign, not a
              space, and %20 is the only universally correct way to encode a space.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free URL Encoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Not sure if a value is already encoded? Paste it into our free online tool to check and
              fix it before it causes a bug in production.
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
              <li><Link href="/blog/url-encoding-rest-api-query-parameters">URL Encoding for REST API Query Parameters</Link></li>
              <li><Link href="/blog/encode-decode-query-strings-nodejs">Encoding and Decoding Query Strings in Node.js</Link></li>
              <li><Link href="/blog/url-encoding-vs-uri-encoding-difference">URL Encoding vs URI Encoding — What's the Real Difference?</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
