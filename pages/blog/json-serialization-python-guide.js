// pages/blog/json-serialization-python-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function JsonSerializationPythonGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON Serialization in Python — Complete Guide',
        item: 'https://dev-brains-ai.com/blog/json-serialization-python-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Python JSON Serialization: Fix the Not-Serializable Error',
    description:
      "Stuck on Python's not-JSON-serializable TypeError? Two working fixes — a default function and a custom JSONEncoder — plus datetime, Decimal, and object_hook examples you can copy.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/json-serialization-python-guide',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I fix "Object of type X is not JSON serializable" in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This error occurs when json.dumps encounters a Python object it does not know how to convert, such as datetime, Decimal, or a custom class instance. Fix it by passing a default function or a custom JSONEncoder subclass that converts the object to a JSON-compatible type like a string or number.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I serialize a datetime object to JSON in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Convert the datetime object to an ISO 8601 string using .isoformat() before serializing, either manually or via a default function passed to json.dumps, since the json module has no built-in support for datetime objects.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to validate JSON produced by Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free JSON Formatter at dev-brains-ai.com/json-formatter that validates and pretty-prints JSON output from any language, including Python, directly in your browser.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Python JSON Serialization: Fix the Not-Serializable Error | Dev Brains AI</title>
        <meta
          name="description"
          content="Stuck on Python's not-JSON-serializable TypeError? Two working fixes — a default function and a custom JSONEncoder — plus datetime, Decimal, and object_hook examples you can copy."
        />
        <meta
          name="keywords"
          content="json serialization python, python not json serializable error, python json custom encoder, json.dumps typeerror fix, serialize datetime json python, python object_hook json"
        />
        <meta property="og:title" content="Python JSON Serialization: Fix the Not-Serializable Error" />
        <meta property="og:description" content="Stuck on Python's not-JSON-serializable TypeError? Two working fixes — a default function and a custom JSONEncoder — plus datetime, Decimal, and object_hook examples you can copy." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/json-serialization-python-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/json-serialization-python-guide" />
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
              <li aria-current="page">JSON Serialization in Python</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSON Serialization in Python — Complete Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Python's built-in <code>json</code> module handles the basics well, but the moment you
            try to serialize a <code>datetime</code>, a <code>Decimal</code>, or a custom class
            instance, you hit <code>TypeError: Object of type X is not JSON serializable</code>.
            This guide covers the module's core functions and exactly how to handle the types it
            does not support natively.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Basics: dumps, loads, dump, load
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import json

data = {"name": "Priya Sharma", "age": 29, "active": True}

# Python object -> JSON string
json_string = json.dumps(data)
print(json_string)  # '{"name": "Priya Sharma", "age": 29, "active": true}'

# JSON string -> Python object
parsed = json.loads(json_string)
print(parsed["name"])  # Priya Sharma

# Write directly to a file
with open("user.json", "w") as f:
    json.dump(data, f, indent=2)

# Read directly from a file
with open("user.json") as f:
    loaded = json.load(f)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The "Not JSON Serializable" Error
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`from datetime import datetime

data = {"name": "Priya", "created_at": datetime.now()}

json.dumps(data)
# TypeError: Object of type datetime is not JSON serializable

# The json module only knows how to convert: dict, list, tuple, str,
# int, float, bool, and None. Everything else needs help.`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Fix 1: The default Parameter
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The simplest fix — pass a function that converts unknown types to something
            JSON-compatible:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`from datetime import datetime
from decimal import Decimal

def json_default(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable")

data = {
    "name": "Priya",
    "created_at": datetime.now(),
    "balance": Decimal("1499.50")
}

print(json.dumps(data, default=json_default))
# {"name": "Priya", "created_at": "2026-07-11T14:30:00.123456", "balance": 1499.5}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Fix 2: A Custom JSONEncoder Class
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For reuse across a codebase, subclass <code>json.JSONEncoder</code> instead of passing
            <code> default</code> everywhere:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, Decimal):
            return float(obj)
        if hasattr(obj, "__dict__"):
            return obj.__dict__  # serialize simple custom class instances
        return super().default(obj)

class Order:
    def __init__(self, id, total):
        self.id = id
        self.total = total

order = Order(id=501, total=Decimal("1499.50"))
print(json.dumps(order, cls=CustomEncoder))
# {"id": 501, "total": 1499.5}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Deserializing Back into Custom Types
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Deserialization is one-directional by default — dates come back as plain strings.
            Use <code>object_hook</code> to reconstruct richer types on load:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`def date_hook(d):
    for key, value in d.items():
        if key.endswith("_at"):
            try:
                d[key] = datetime.fromisoformat(value)
            except (ValueError, TypeError):
                pass
    return d

json_string = '{"name": "Priya", "created_at": "2026-07-11T14:30:00"}'
result = json.loads(json_string, object_hook=date_hook)
print(type(result["created_at"]))  # <class 'datetime.datetime'>`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick Reference: Common Type Conversions
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>datetime / date</strong> — convert with <code>.isoformat()</code>, parse back with <code>datetime.fromisoformat()</code></li>
            <li><strong>Decimal</strong> — convert with <code>float()</code> or <code>str()</code> to avoid precision loss for currency</li>
            <li><strong>set</strong> — convert with <code>list()</code>; JSON has no set type</li>
            <li><strong>bytes</strong> — convert with <code>.decode('utf-8')</code> or base64-encode binary data</li>
            <li><strong>Enum</strong> — convert with <code>.value</code> or <code>.name</code></li>
            <li><strong>Custom classes</strong> — implement <code>__dict__</code> access or a <code>to_dict()</code> method used in your encoder</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I fix "Object of type X is not JSON serializable" in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              This error occurs when json.dumps encounters a Python object it does not know how to convert, such as datetime, Decimal, or a custom class instance. Fix it by passing a default function or a custom JSONEncoder subclass that converts the object to a JSON-compatible type like a string or number.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I serialize a datetime object to JSON in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Convert the datetime object to an ISO 8601 string using .isoformat() before serializing, either manually or via a default function passed to json.dumps, since the json module has no built-in support for datetime objects.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to validate JSON produced by Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. <Link href="/json-formatter">Dev Brains AI JSON Formatter</Link> validates and pretty-prints JSON output from any language, including Python, directly in your browser.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Validate and pretty-print JSON output from your Python scripts instantly. No signup, no cost.
            </p>
            <Link href="/json-formatter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open JSON Formatter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
              <li><Link href="/blog/json-to-csv-conversion-guide">JSON to CSV Conversion Guide</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
              <li><Link href="/blog/working-with-large-json-files-nodejs">Working with Large JSON Files in Node.js</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
