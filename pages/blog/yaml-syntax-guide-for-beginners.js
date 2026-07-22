// pages/blog/yaml-syntax-guide-for-beginners.js
import Head from 'next/head';
import Link from 'next/link';

export default function YamlSyntaxGuideForBeginners() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'YAML Syntax Guide for Beginners — Complete Walkthrough',
        item: 'https://dev-brains-ai.com/blog/yaml-syntax-guide-for-beginners',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'YAML Syntax Guide for Beginners (Indentation, Lists, More)',
    description:
      'Learn YAML step by step: key-value pairs, spaces-only indentation, lists, multi-line strings, quoting, and anchors — with a full worked config example.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/yaml-syntax-guide-for-beginners',
    datePublished: '2026-07-16',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I use tabs for indentation in YAML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The YAML specification forbids tab characters for indentation — parsers throw an error like "found character that cannot start any token". Always use spaces, with 2 spaces per level being the universal convention. Configure your editor to insert spaces when you press Tab in .yml files.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between | and > in YAML multi-line strings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The pipe (|) is the literal block style: line breaks are preserved exactly as written, ideal for scripts and certificates. The greater-than sign (>) is the folded style: line breaks are folded into spaces, producing one long line — ideal for long prose you wrap for readability in the file.',
        },
      },
      {
        '@type': 'Question',
        name: 'When do I need quotes around strings in YAML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most strings need no quotes, but quote values that YAML would misread: booleans-lookalikes (yes, no, on, off), numbers you want as strings ("1.10", "01234"), values starting with special characters (*, &, ?, {, [), values containing a colon followed by a space, and anything beginning with # which would otherwise start a comment.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>YAML Syntax Guide for Beginners (Indentation, Lists, More) | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn YAML step by step: key-value pairs, spaces-only indentation, lists, multi-line strings, quoting, and anchors — with a full worked config example."
        />
        <meta
          name="keywords"
          content="yaml syntax guide, yaml tutorial for beginners, yaml indentation rules, yaml multiline string, yaml literal vs folded, yaml lists, yaml quoting rules, yaml anchors, learn yaml"
        />
        <meta property="og:title" content="YAML Syntax Guide for Beginners (Indentation, Lists, More)" />
        <meta property="og:description" content="Learn YAML step by step: key-value pairs, spaces-only indentation, lists, multi-line strings, quoting, and anchors — with a full worked config example." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/yaml-syntax-guide-for-beginners" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/yaml-syntax-guide-for-beginners" />
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
              <li aria-current="page">YAML Syntax Guide for Beginners</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            YAML Syntax Guide for Beginners — Complete Walkthrough with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            YAML is everywhere in modern development — Kubernetes manifests, GitHub Actions
            workflows, docker-compose files, Ansible playbooks, and application config. It is
            designed to be readable, but its whitespace-based syntax has real rules, and breaking
            them produces confusing errors. This guide walks through YAML from the ground up:
            key-value pairs, nesting, lists, multi-line strings, quoting, comments, and anchors,
            ending with a complete worked config file you can use as a reference.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Key-Value Pairs and Nesting
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The atom of YAML is <code>key: value</code> — note the mandatory space after the colon.
            Structure comes from indentation: indent a block under a key to nest it. The two
            iron rules of indentation:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>Spaces only — never tabs.</strong> A single tab character anywhere in the indentation makes the parser fail. Use 2 spaces per level (the universal convention).</li>
            <li><strong>Siblings must align exactly.</strong> Keys at the same level need identical indentation, or YAML thinks you started a new (invalid) structure.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`app: payment-service          # string
port: 8080                    # integer
debug: false                  # boolean
ratio: 0.75                   # float
nothing: null                 # null (also: ~ or just empty)

database:                     # nested mapping starts here
  host: db.internal           # 2 spaces in
  port: 5432
  credentials:                # nest deeper with 2 more spaces
    user: app_rw`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Lists: Block Style and Inline Flow Style
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A list item is a dash plus a space (<code>- </code>). Lists can hold scalars, mappings,
            or other lists. For short lists, YAML also accepts JSON-like inline &quot;flow&quot;
            syntax:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Block style — one item per line
regions:
  - ap-south-1
  - eu-west-1

# List of mappings (very common in k8s and CI files)
containers:
  - name: web
    image: nginx:1.27
  - name: sidecar
    image: envoy:1.30

# Inline flow style — YAML accepts JSON syntax too
ports: [80, 443, 8080]
labels: { app: web, tier: frontend }`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Flow style is fine for short scalar lists; switch to block style the moment items get
            long or nested, or reviewing diffs becomes painful.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Multi-Line Strings: Literal vs Folded
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            YAML has two block styles for long text, and choosing the wrong one is a classic bug.
            The pipe <code>|</code> (<strong>literal</strong>) keeps line breaks exactly as
            written. The <code>&gt;</code> character (<strong>folded</strong>) joins lines into
            one long string, converting each line break into a space:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Literal (|) — newlines PRESERVED. Use for scripts, certs, SQL.
script: |
  npm ci
  npm run build
  npm test
# → "npm ci\\nnpm run build\\nnpm test\\n"

# Folded (>) — newlines become SPACES. Use for long prose.
description: >
  This service handles UPI payment callbacks
  and retries failed webhooks up to three times.
# → "This service handles UPI payment callbacks and retries failed webhooks up to three times.\\n"

# Chomping modifiers control the trailing newline:
#   |-  strip the final newline      |+  keep all trailing newlines`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Rule of thumb: if the line breaks carry meaning (shell commands, certificates,
            SQL), use the literal pipe. If you only wrapped the text so the file stays readable,
            use the folded style.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quoting Rules: When Strings Need Quotes
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Most YAML strings need no quotes at all — that is the point of the format. But YAML
            guesses types from unquoted content, so you must quote anything ambiguous:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li>Boolean look-alikes: <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code>, <code>true</code>, <code>false</code></li>
            <li>Numbers you want kept as strings: version <code>&quot;1.10&quot;</code>, PIN code <code>&quot;01234&quot;</code></li>
            <li>Values containing <code>: </code> (colon-space) or starting with <code>#</code>, <code>*</code>, <code>&amp;</code>, <code>?</code>, <code>[</code>, <code>{'{'}</code>, <code>!</code>, <code>%</code>, <code>@</code></li>
            <li>The empty string: <code>&quot;&quot;</code> (an empty value parses as null, not empty string)</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`answer: no              # → boolean false (surprise!)
answer: "no"            # → string "no"

message: 'It''s live'   # single quotes: literal, escape ' by doubling
path: "C:\\\\logs\\\\app"    # double quotes: \\ escapes work (\\n, \\t, \\\\)
motto: plain text is fine unquoted   # no special chars → no quotes needed`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Single quotes are &quot;dumb&quot; (everything literal), double quotes support escape
            sequences. When in doubt, double-quote — it never changes the meaning of a plain string.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Comments and Anchors
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Everything from <code>#</code> to the end of the line is a comment (unless the
            <code> #</code> is inside a quoted string). Anchors let you define a block once and
            reuse it — YAML&apos;s built-in DRY mechanism:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Anchor (&) defines, alias (*) reuses, <<: merges into a mapping
base: &base
  cpu: 500m
  memory: 512Mi

web:
  <<: *base          # inherits cpu and memory
  replicas: 3

worker:
  <<: *base
  memory: 1Gi        # override one key`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Full Worked Example: A Complete Config File
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here is everything above combined into one realistic application config:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# app-config.yml — payment-service
app:
  name: payment-service
  version: "2.4.10"          # quoted — keep as string
  debug: false

server:
  port: 8080
  allowed_hosts:
    - api.example.in
    - "*.internal"           # quoted — starts with *

defaults: &retry_policy
  retries: 3
  backoff_seconds: 5

upstreams:
  - name: upi-gateway
    url: "https://gateway.example.com:8443"  # contains ://
    <<: *retry_policy
  - name: sms-provider
    url: "https://sms.example.in"
    <<: *retry_policy
    retries: 5               # override

startup_script: |
  ./wait-for-db.sh
  ./migrate.sh
  exec node server.js

notes: >
  Rotate the gateway API key on the first of every
  month and update the secret in the cluster.`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Not sure how a snippet parses? Paste it into the free
            <Link href="/yaml-json-converter"> YAML to JSON converter</Link> — seeing the JSON
            output instantly reveals whether YAML read your value as a string, number, boolean,
            or something you did not intend.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I use tabs for indentation in YAML?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. The YAML specification forbids tab characters for indentation — parsers throw an
              error like &quot;found character that cannot start any token&quot;. Always use
              spaces, with 2 spaces per level being the universal convention. Configure your
              editor to insert spaces when you press Tab in .yml files.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between | and &gt; in YAML multi-line strings?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The pipe (|) is the literal block style: line breaks are preserved exactly as
              written, ideal for scripts and certificates. The greater-than sign (&gt;) is the
              folded style: line breaks are folded into spaces, producing one long line — ideal
              for long prose you wrap for readability in the file.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>When do I need quotes around strings in YAML?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Most strings need no quotes, but quote values that YAML would misread:
              boolean look-alikes (yes, no, on, off), numbers you want as strings
              (&quot;1.10&quot;, &quot;01234&quot;), values starting with special characters
              (*, &amp;, ?, {'{'}, [), values containing a colon followed by a space, and anything
              beginning with # which would otherwise start a comment.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free YAML ↔ JSON Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any YAML and instantly see how it parses as JSON — the fastest way to catch
              typing surprises and indentation mistakes. No signup, no cost.
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
              <li><Link href="/blog/yaml-vs-json-differences-explained">YAML vs JSON — Key Differences Explained</Link></li>
              <li><Link href="/blog/common-yaml-errors-in-kubernetes-and-ci">Common YAML Errors in Kubernetes and CI Pipelines</Link></li>
              <li><Link href="/blog/convert-yaml-to-json-javascript-python">Convert YAML to JSON in JavaScript and Python</Link></li>
              <li><Link href="/blog/when-to-use-yaml-json-toml-config">When to Use YAML, JSON, or TOML for Config</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
