// pages/blog/base64-encoding-python-examples.js
import Head from 'next/head';
import Link from 'next/link';

export default function Base64EncodingPython() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Base64 Encoding in Python — Complete Guide with Examples',
        item: 'https://dev-brains-ai.com/blog/base64-encoding-python-examples',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Base64 Encoding in Python — Complete Guide with Examples',
    description:
      'Learn how to encode and decode Base64 in Python using the base64 module. Covers strings, bytes, files, URL-safe Base64, and common errors with practical examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/base64-encoding-python-examples',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you Base64 encode a string in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Import the base64 module, encode your string to bytes, then call base64.b64encode(). For example: base64.b64encode("hello".encode("utf-8")).decode("utf-8") returns the Base64 string.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does base64.b64encode() return bytes instead of a string?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Python\'s base64 module works on bytes objects, not strings, because Base64 is fundamentally a binary-to-text encoding. Call .decode("utf-8") on the result to convert the output bytes into a regular Python string.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between b64encode and urlsafe_b64encode in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'b64encode uses the standard Base64 alphabet, which includes + and / characters. urlsafe_b64encode replaces + with - and / with _, making the output safe to use directly inside URLs and filenames without additional encoding.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Base64 Encoding in Python — Complete Guide with Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how to encode and decode Base64 in Python using the base64 module. Covers strings, bytes, files, URL-safe Base64, and common errors with examples."
        />
        <meta
          name="keywords"
          content="base64 python, python base64 encode, python base64 decode, base64 module python, encode string python, b64encode, b64decode"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/base64-encoding-python-examples" />
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
              <li aria-current="page">Base64 Encoding in Python</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Base64 Encoding in Python — Complete Guide with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Python's standard library ships a built-in <code>base64</code> module, so you never need
            a third-party package to encode or decode Base64. The tricky part isn't the API — it's
            remembering that Python's Base64 functions work on <code>bytes</code>, not <code>str</code>.
            This guide walks through encoding strings, files, and URL-safe variants with working code.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Encoding a string to Base64</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            You first need to convert your string to bytes using <code>.encode()</code>, then pass
            those bytes to <code>base64.b64encode()</code>. The result is also bytes, so decode it
            back to a string with UTF-8 if you want to print or store it as text.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import base64

text = "Hello, World!"
text_bytes = text.encode("utf-8")

encoded_bytes = base64.b64encode(text_bytes)
encoded_str = encoded_bytes.decode("utf-8")

print(encoded_str)
# → SGVsbG8sIFdvcmxkIQ==`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Decoding Base64 back to a string</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import base64

encoded_str = "SGVsbG8sIFdvcmxkIQ=="

decoded_bytes = base64.b64decode(encoded_str)
decoded_str = decoded_bytes.decode("utf-8")

print(decoded_str)
# → Hello, World!`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Encoding files and binary data</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Open the file in binary mode (<code>"rb"</code>) so Python reads raw bytes instead of
            trying to decode it as text. This is the same technique used to embed images in JSON
            payloads or send attachments over APIs that only accept text fields.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import base64

with open("photo.png", "rb") as f:
    file_bytes = f.read()

encoded = base64.b64encode(file_bytes).decode("utf-8")

# Write it back out to a new file to verify round-trip
with open("photo_copy.png", "wb") as f:
    f.write(base64.b64decode(encoded))`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>URL-safe Base64 in Python</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Standard Base64 output can contain <code>+</code> and <code>/</code>, which have special
            meaning in URLs and file paths. Python's <code>urlsafe_b64encode</code> swaps them for{' '}
            <code>-</code> and <code>_</code> so the output can be used directly in a URL path,
            query string, or filename — this is exactly what's used inside JWTs.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import base64

data = b'{"user_id": 42, "role": "admin"}'

url_safe = base64.urlsafe_b64encode(data).decode("utf-8")
print(url_safe)
# → eyJ1c2VyX2lkIjogNDIsICJyb2xlIjogImFkbWluIn0=

# Decoding is symmetric
original = base64.urlsafe_b64decode(url_safe)
print(original.decode("utf-8"))`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common errors and how to fix them</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>binascii.Error: Incorrect padding</strong> — Base64 strings must be a multiple of 4 characters. Pad manually with <code>{"input + '=' * (-len(input) % 4)"}</code> before decoding if the source stripped padding.</li>
            <li><strong>AttributeError: 'str' object has no attribute 'decode'</strong> — you passed a string directly to <code>b64encode</code>. Call <code>.encode("utf-8")</code> first to get bytes.</li>
            <li><strong>UnicodeDecodeError on b64decode result</strong> — the decoded bytes aren't valid UTF-8 text (e.g. it's actually an image). Only call <code>.decode("utf-8")</code> when you know the original data was text.</li>
            <li><strong>Mixing standard and URL-safe alphabets</strong> — decoding a URL-safe string with <code>b64decode</code> (instead of <code>urlsafe_b64decode</code>) fails or silently produces wrong bytes because <code>-</code>/<code>_</code> aren't in the standard alphabet.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Quick reference: base64 module functions</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`base64.b64encode(bytes)          # standard Base64 encode
base64.b64decode(bytes_or_str)   # standard Base64 decode
base64.urlsafe_b64encode(bytes)  # URL-safe encode (-, _ instead of +, /)
base64.urlsafe_b64decode(bytes)  # URL-safe decode
base64.b32encode(bytes)          # Base32 encode (different alphabet)
base64.b16encode(bytes)          # Base16 / hex encode`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do you Base64 encode a string in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Import the base64 module, encode your string to bytes, then call base64.b64encode().
              For example: base64.b64encode("hello".encode("utf-8")).decode("utf-8") returns the
              Base64 string.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does base64.b64encode() return bytes instead of a string?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Python's base64 module works on bytes objects, not strings, because Base64 is
              fundamentally a binary-to-text encoding. Call .decode("utf-8") on the result to
              convert the output bytes into a regular Python string.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between b64encode and urlsafe_b64encode in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              b64encode uses the standard Base64 alphabet, which includes + and / characters.
              urlsafe_b64encode replaces + with - and / with _, making the output safe to use
              directly inside URLs and filenames without additional encoding.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Base64 Encoder/Decoder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Skip the boilerplate — paste any string or Base64 value into our free online tool to
              encode or decode instantly, right in your browser. No installs, no data uploaded.
            </p>
            <Link href="/base64-tool">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Base64 Encoder/Decoder →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/base64-encoding-javascript-examples">Base64 Encoding in JavaScript — Complete Guide with Examples</Link></li>
              <li><Link href="/blog/how-to-decode-base64-in-python">How to Decode Base64 in Python — Step by Step</Link></li>
              <li><Link href="/blog/base64-encoding-vs-encryption-difference">Base64 Encoding vs Encryption — What's the Difference?</Link></li>
              <li><Link href="/blog/decode-jwt-tokens-base64-javascript">How to Decode JWT Tokens Using Base64 in JavaScript</Link></li>
              <li><Link href="/blog/base64-file-upload-encoding-guide">Base64 File Upload Encoding — A Practical Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
