// pages/blog/yaml-vs-json-differences-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function YamlVsJsonDifferencesExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'YAML vs JSON — Key Differences Explained with Examples',
        item: 'https://dev-brains-ai.com/blog/yaml-vs-json-differences-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'YAML vs JSON — Key Differences Explained with Examples',
    description:
      'YAML vs JSON compared side by side: readability, comments, implicit typing surprises like the Norway problem, anchors and references, the superset relationship, and when to use each format.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/yaml-vs-json-differences-explained',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is YAML a superset of JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, practically. YAML 1.2 was designed so that every valid JSON document is also valid YAML — you can paste JSON into a YAML parser and it will load. The reverse is not true: YAML features like comments, anchors, and multi-line strings have no JSON equivalent.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Norway problem in YAML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In YAML 1.1, unquoted values like no, yes, on, and off are implicitly converted to booleans. So a country code list containing NO (Norway) silently becomes false. The fix is to quote ambiguous strings ("NO") or use a YAML 1.2 parser, which only treats true and false as booleans.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use YAML or JSON for configuration files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use YAML when humans write and maintain the file — it supports comments and is easier to read, which is why Kubernetes, GitHub Actions, and docker-compose use it. Use JSON when machines generate or exchange the data — APIs, lock files, and serialization — because its strict grammar removes parsing ambiguity.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>YAML vs JSON — Key Differences Explained with Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="YAML vs JSON side by side: readability, comments, the Norway problem, anchors, the superset relationship, and when each format wins. With real examples."
        />
        <meta
          name="keywords"
          content="yaml vs json, difference between yaml and json, yaml norway problem, yaml anchors, yaml superset of json, yaml comments, json vs yaml config, yaml to json converter"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/yaml-vs-json-differences-explained" />
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
              <li aria-current="page">YAML vs JSON Differences</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            YAML vs JSON — Key Differences Explained with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            YAML and JSON describe the same kinds of data — objects, arrays, strings, numbers,
            booleans — yet they feel completely different to work with. JSON is strict, noisy with
            punctuation, and beloved by machines. YAML is clean, comment-friendly, and beloved by
            humans, right up until an unquoted value silently turns into a boolean. This guide puts
            the two formats side by side: syntax, comments, implicit typing surprises like the
            famous Norway problem, anchors, the superset relationship, and clear rules for when
            each one wins.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Same Data, Side by Side
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here is an identical application config expressed in both formats. Notice how YAML
            drops the braces, brackets, quotes, and commas, using indentation for structure instead:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# ---------- JSON ----------
{
  "name": "payment-service",
  "replicas": 3,
  "debug": false,
  "regions": ["ap-south-1", "eu-west-1"],
  "database": {
    "host": "db.internal",
    "port": 5432
  }
}

# ---------- YAML (same data) ----------
name: payment-service
replicas: 3
debug: false
regions:
  - ap-south-1
  - eu-west-1
database:
  host: db.internal
  port: 5432`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            For a 10-line config the difference is cosmetic. For a 400-line Kubernetes manifest,
            YAML&apos;s reduced punctuation is the difference between a file you can review and
            one you cannot.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Comments: YAML Has Them, JSON Does Not
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This is the single most practical difference. JSON has <strong>no comment syntax</strong> —
            by deliberate design, to keep the grammar minimal. YAML supports <code>#</code> comments
            anywhere:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`replicas: 3        # bumped from 2 after Diwali traffic spike
timeout: 30        # seconds — keep under the ALB idle timeout (60)

# Temporarily disabled until the vendor fixes rate limiting:
# webhook_url: https://hooks.example.com/notify`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Teams using JSON for config resort to hacks like <code>&quot;_comment&quot;</code> keys
            or JSONC (JSON with comments, used by VS Code) — both are workarounds for a feature
            YAML has natively. If a human needs to explain <em>why</em> a value is set, YAML wins.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Implicit Typing: The Norway Problem
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JSON requires quotes around every string, so there is never doubt about a value&apos;s
            type. YAML guesses types from unquoted content — convenient, but full of traps. The
            most famous is the <strong>Norway problem</strong>: in YAML 1.1,
            <code> no</code>, <code>yes</code>, <code>on</code>, and <code>off</code> are parsed
            as booleans, so a list of country codes breaks on Norway:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`countries:
  - IN        # → "IN"    (string, fine)
  - DE        # → "DE"    (string, fine)
  - NO        # → false   (boolean! Norway just disappeared)

version: 1.10  # → 1.1    (float — trailing zero lost)
zip: 01234     # → 668    (octal number in YAML 1.1!)
time: 12:30    # → 750    (sexagesimal — base 60 — in YAML 1.1)

# The fix — quote anything ambiguous:
countries: ["IN", "DE", "NO"]
version: "1.10"
zip: "01234"`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            YAML 1.2 removed most of these (only <code>true</code>/<code>false</code> are booleans),
            but many parsers — including Python&apos;s PyYAML default mode — still follow 1.1
            rules. The safe habit: <strong>quote any string that could look like something
            else</strong>. JSON never has this class of bug.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Anchors and References: YAML&apos;s DRY Feature
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            YAML can define a block once and reuse it — something JSON simply cannot express.
            An <strong>anchor</strong> (<code>&amp;name</code>) labels a node, an
            <strong> alias</strong> (<code>*name</code>) reuses it, and merge keys
            (<code>&lt;&lt;:</code>) inline it into another mapping:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`defaults: &defaults
  retries: 3
  timeout: 30
  region: ap-south-1

staging:
  <<: *defaults        # inherits retries, timeout, region
  replicas: 1

production:
  <<: *defaults
  replicas: 5
  timeout: 60          # override just this key`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This is heavily used in docker-compose files and GitLab CI to avoid repeating
            service definitions. The caveat: converting such YAML to JSON <strong>flattens the
            anchors</strong> — every alias is expanded into a full copy, and the deduplication
            is lost.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Superset Relationship
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            YAML 1.2 was explicitly designed as a superset of JSON: <strong>any valid JSON document
            is also valid YAML</strong>. Braces and brackets are YAML&apos;s &quot;flow style&quot;,
            so <code>{`{"a": [1, 2]}`}</code> parses identically in both. Practical consequences:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>You can paste JSON into any YAML file (a Kubernetes manifest, a GitHub Actions workflow) and it just works.</li>
            <li>A YAML parser doubles as a lenient JSON parser — handy in tooling.</li>
            <li>The reverse fails: comments, anchors, multi-line block strings, and multiple documents (<code>---</code>) cannot survive a trip to JSON.</li>
            <li>Every YAML document can be <em>converted</em> to JSON (losing comments and anchors), which is exactly what a <Link href="/yaml-json-converter">YAML to JSON converter</Link> does.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When Each Format Wins
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>YAML wins for human-edited config</strong> — Kubernetes, docker-compose, GitHub Actions, Ansible, CI pipelines. Comments and clean syntax matter most here.</li>
            <li><strong>JSON wins for machine-to-machine data</strong> — REST APIs, lock files (package-lock.json), serialized state. Strict grammar, universal parser support, and no typing surprises.</li>
            <li><strong>JSON wins for security-sensitive parsing</strong> — its tiny grammar has far less attack surface than a full YAML parser.</li>
            <li><strong>YAML wins when files get long</strong> — anchors kill duplication, and no trailing-comma errors ever.</li>
            <li><strong>JSON wins inside JavaScript</strong> — <code>JSON.parse</code> is built in; YAML needs a dependency.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Many stacks use both: YAML at the human-editing edge, converted to JSON the moment a
            machine takes over. If you regularly move data between the two, keep a converter in
            your toolbox.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Is YAML a superset of JSON?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes, practically. YAML 1.2 was designed so that every valid JSON document is also
              valid YAML — you can paste JSON into a YAML parser and it will load. The reverse is
              not true: YAML features like comments, anchors, and multi-line strings have no JSON
              equivalent.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the Norway problem in YAML?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In YAML 1.1, unquoted values like no, yes, on, and off are implicitly converted to
              booleans. So a country code list containing NO (Norway) silently becomes false. The
              fix is to quote ambiguous strings (&quot;NO&quot;) or use a YAML 1.2 parser, which
              only treats true and false as booleans.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I use YAML or JSON for configuration files?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use YAML when humans write and maintain the file — it supports comments and is
              easier to read, which is why Kubernetes, GitHub Actions, and docker-compose use it.
              Use JSON when machines generate or exchange the data — APIs, lock files, and
              serialization — because its strict grammar removes parsing ambiguity.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free YAML ↔ JSON Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert YAML to JSON and back instantly in your browser — perfect for checking how
              your YAML actually parses. No signup, no cost.
            </p>
            <Link href="/yaml-json-converter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open YAML ↔ JSON Converter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/yaml-syntax-guide-for-beginners">YAML Syntax Guide for Beginners</Link></li>
              <li><Link href="/blog/convert-yaml-to-json-javascript-python">Convert YAML to JSON in JavaScript and Python</Link></li>
              <li><Link href="/blog/when-to-use-yaml-json-toml-config">When to Use YAML, JSON, or TOML for Config</Link></li>
              <li><Link href="/blog/json-vs-xml-comparison-for-apis">JSON vs XML — Comparison for APIs</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
