// pages/blog/common-yaml-errors-in-kubernetes-and-ci.js
import Head from 'next/head';
import Link from 'next/link';

export default function CommonYamlErrorsInKubernetesAndCi() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Common YAML Errors in Kubernetes and CI Pipelines (and How to Fix Them)',
        item: 'https://dev-brains-ai.com/blog/common-yaml-errors-in-kubernetes-and-ci',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Common YAML Errors in Kubernetes and CI Pipelines (and How to Fix Them)',
    description:
      'Debug YAML errors in Kubernetes, GitHub Actions, and docker-compose: indentation mistakes, tab characters, unquoted strings misparsed as floats and booleans, multi-document separators, and validation with yamllint and kubectl --dry-run.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/common-yaml-errors-in-kubernetes-and-ci',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I validate a Kubernetes YAML file without applying it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Run kubectl apply --dry-run=client -f file.yaml for a quick client-side syntax and schema check, or --dry-run=server to validate against the live API server including admission webhooks. Neither creates any resources. Add yamllint for style and indentation checks before that.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does my GitHub Actions workflow say "you may need to quote this value"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YAML implicitly typed one of your values: on, off, yes, and no become booleans, and version-like numbers such as 3.10 become floats (3.1). Quote the value — python-version: "3.10" — to keep it a string. The bare word on as a top-level workflow key is a known quirk GitHub handles specially.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does "found character that cannot start any token" mean in YAML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It almost always means there is a tab character in your indentation. YAML forbids tabs for indentation. Find it with grep -P "\\t" file.yaml, replace tabs with spaces, and set your editor to insert spaces for .yml files.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Common YAML Errors in Kubernetes and CI Pipelines | Dev Brains AI</title>
        <meta
          name="description"
          content="Fix the YAML errors that break Kubernetes, GitHub Actions, and docker-compose: indentation, tabs, unquoted 3.10 becoming 3.1, on/off becoming booleans, --- separators, yamllint and kubectl --dry-run."
        />
        <meta
          name="keywords"
          content="yaml errors kubernetes, github actions yaml error, docker compose yaml error, yaml indentation error, yaml tab error, yamllint, kubectl dry-run validate, yaml boolean on off, error converting yaml to json"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/common-yaml-errors-in-kubernetes-and-ci" />
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
              <li aria-current="page">Common YAML Errors in Kubernetes and CI</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Common YAML Errors in Kubernetes and CI Pipelines (and How to Fix Them)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            YAML powers the config layer of modern infrastructure — Kubernetes manifests, GitHub
            Actions workflows, docker-compose files, GitLab CI. Which means a single misplaced
            space can block a deployment at 6 pm on a Friday. The good news: YAML failures are
            highly repetitive. The same five or six mistakes account for nearly every broken
            pipeline. This guide catalogues them — with the exact error messages you will see in
            kubectl, Actions, and compose — and shows how to validate files before they ever
            reach production.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 1: Indentation Mistakes
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The most common failure by far. One extra or missing space changes the structure of
            the document — sometimes producing a parse error, sometimes silently attaching a key
            to the wrong parent, which is worse because the file &quot;works&quot; but the value
            is ignored:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# BROKEN — resources is indented under image, not the container
spec:
  containers:
    - name: web
      image: nginx:1.27
        resources:          # <- 2 spaces too deep
          limits:
            memory: 512Mi

# kubectl: error converting YAML to JSON: yaml: line 6:
#          mapping values are not allowed in this context

# FIXED — resources aligns with name and image
    - name: web
      image: nginx:1.27
      resources:
        limits:
          memory: 512Mi`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The silent variant: indenting <code>env:</code> at the pod level instead of the
            container level. Kubernetes ignores unknown fields in some paths, so your environment
            variables simply never appear. When a value &quot;is not taking effect&quot;, check
            its indentation before anything else.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 2: Tab Characters
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            YAML forbids tabs in indentation, and the error message never says the word
            &quot;tab&quot;:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`yaml: line 12: found character that cannot start any token

# Find the invisible culprit:
grep -Pn "\\t" deployment.yaml

# Fix in place (Linux/macOS):
sed -i 's/\\t/  /g' deployment.yaml`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Tabs sneak in when someone edits a file over SSH in a default vim, or copies a snippet
            from a terminal. Set your editor to insert spaces for <code>.yml</code>/<code>.yaml</code>
            files and add an <code>.editorconfig</code> so the whole team inherits the setting.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 3: Unquoted Strings Misparsed as Numbers and Booleans
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            YAML guesses types from unquoted values, and the guesses regularly break CI configs.
            Two famous cases: version numbers with trailing zeros become floats, and
            <code> on</code>/<code>off</code>/<code>yes</code>/<code>no</code> become booleans:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# GitHub Actions — the classic Python version bug
- uses: actions/setup-python@v5
  with:
    python-version: 3.10     # parsed as float 3.1 → installs 3.1!
    python-version: "3.10"   # correct — quoted string

# docker-compose — env values must be strings
environment:
  DEBUG: no                  # → boolean false, then coerced to "false"
  DEBUG: "no"                # correct

# Kubernetes annotation — floats not allowed
metadata:
  annotations:
    version: 1.20            # error: expected string, got float
    version: "1.20"          # correct`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The rule: <strong>quote anything that is a string but does not look like one</strong> —
            versions, phone numbers, PIN codes with leading zeros, country codes, and every
            yes/no/on/off value. Pasting the block into a
            <Link href="/yaml-json-converter"> YAML to JSON converter</Link> shows you instantly
            which type the parser actually produced.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Error 4: Multi-Document Separators (---)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A single YAML file can hold multiple documents separated by <code>---</code> on its
            own line — the standard way to ship a Deployment and Service together. Two common
            failures:
          </p>
          <ul className="small" style={{ marginBottom: 12 }}>
            <li><strong>Missing separator</strong> — concatenating two manifests without <code>---</code> merges them into one invalid document (&quot;mapping key apiVersion already defined&quot; or a schema error).</li>
            <li><strong>Indented separator</strong> — <code>---</code> must start at column zero; indented, it becomes a plain string value.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
# ...
---                    # column zero, its own line
apiVersion: v1
kind: Service
metadata:
  name: web-svc`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note for tooling authors: <code>JSON.parse</code>-style single-document parsers
            (like js-yaml&apos;s <code>load</code>) throw on multi-document files — use
            <code> loadAll</code> or split on the separator first.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Validate Before You Deploy: yamllint and kubectl --dry-run
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every error above is catchable before a commit ever triggers a pipeline. Layer these
            checks:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# 1. Lint syntax + style (tabs, indentation, duplicate keys)
pip install yamllint
yamllint deployment.yaml
# 12:1  error  syntax error: found character '\\t' that cannot
#              start any token

# 2. Validate against the Kubernetes schema — client side
kubectl apply --dry-run=client -f deployment.yaml

# 3. Validate against the LIVE API server (webhooks, quotas)
kubectl apply --dry-run=server -f deployment.yaml

# 4. docker-compose has its own validator
docker compose config          # parses, resolves, prints final YAML

# 5. GitHub Actions — actionlint catches workflow-specific issues
actionlint .github/workflows/*.yml`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>yamllint</strong> catches pure YAML problems: tabs, bad indentation, duplicate keys, trailing spaces.</li>
            <li><strong>kubectl --dry-run=client</strong> checks the manifest against resource schemas without touching the cluster; <strong>=server</strong> also runs admission control.</li>
            <li><strong>docker compose config</strong> is the fastest way to see how compose interpreted your file, with variables resolved.</li>
            <li>Wire yamllint and actionlint into a pre-commit hook or a cheap CI job so broken YAML never reaches the expensive pipeline stages.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A 60-Second Debugging Checklist
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Read the line number in the error — the real mistake is usually on that line <em>or the one above it</em>.</li>
            <li>Check for tabs: <code>grep -Pn &quot;\t&quot; file.yaml</code>.</li>
            <li>Check sibling alignment around the reported line.</li>
            <li>Quote suspicious values: versions, on/off/yes/no, anything with a colon or leading zero.</li>
            <li>Confirm <code>---</code> separators are at column zero.</li>
            <li>Paste the file into a converter to see the parsed structure as JSON — misplaced nesting becomes obvious immediately.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I validate a Kubernetes YAML file without applying it?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Run kubectl apply --dry-run=client -f file.yaml for a quick client-side syntax and
              schema check, or --dry-run=server to validate against the live API server including
              admission webhooks. Neither creates any resources. Add yamllint for style and
              indentation checks before that.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does my GitHub Actions workflow say &quot;you may need to quote this value&quot;?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              YAML implicitly typed one of your values: on, off, yes, and no become booleans, and
              version-like numbers such as 3.10 become floats (3.1). Quote the value —
              python-version: &quot;3.10&quot; — to keep it a string. The bare word on as a
              top-level workflow key is a known quirk GitHub handles specially.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What does &quot;found character that cannot start any token&quot; mean in YAML?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              It almost always means there is a tab character in your indentation. YAML forbids
              tabs for indentation. Find it with grep -P &quot;\t&quot; file.yaml, replace tabs
              with spaces, and set your editor to insert spaces for .yml files.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free YAML ↔ JSON Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste a broken manifest and instantly see how the parser reads it — wrong nesting,
              surprise booleans, and float-ified versions all become visible in the JSON output.
              No signup, no cost.
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
              <li><Link href="/blog/yaml-vs-json-differences-explained">YAML vs JSON — Key Differences Explained</Link></li>
              <li><Link href="/blog/convert-yaml-to-json-javascript-python">Convert YAML to JSON in JavaScript and Python</Link></li>
              <li><Link href="/blog/cron-jobs-github-actions-tutorial">Cron Jobs in GitHub Actions — Tutorial</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
