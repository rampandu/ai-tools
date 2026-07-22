// pages/blog/convert-yaml-to-json-javascript-python.js
import Head from 'next/head';
import Link from 'next/link';

export default function ConvertYamlToJsonJavascriptPython() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Convert YAML to JSON in JavaScript and Python',
        item: 'https://dev-brains-ai.com/blog/convert-yaml-to-json-javascript-python',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Convert YAML to JSON in JavaScript & Python (Safely)',
    description:
      'Convert YAML to JSON using js-yaml and PyYAML safe_load, dodge the yaml.load security trap, and see what round-tripping silently loses: comments and anchors.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/convert-yaml-to-json-javascript-python',
    datePublished: '2026-07-16',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between yaml.load and yaml.safe_load in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'yaml.load with the full loader can construct arbitrary Python objects from special YAML tags, which lets a malicious file execute code when parsed. yaml.safe_load only builds plain types — dicts, lists, strings, numbers, booleans — and is what you should use for any file you did not author yourself.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does converting YAML to JSON preserve comments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Comments are not part of the parsed data model, so they are discarded the moment YAML is loaded. Anchors and aliases are also expanded into full copies, and formatting is lost. If you need to edit YAML while keeping comments, use a round-trip library like ruamel.yaml in Python.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert YAML to JSON on the command line?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The yq tool does it in one line: yq -o=json file.yaml converts YAML to JSON, and yq -P file.json converts JSON back to YAML. Python also works without installing anything extra if PyYAML is present: python -c "import yaml, json, sys; print(json.dumps(yaml.safe_load(sys.stdin)))" < file.yaml.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Convert YAML to JSON in JavaScript & Python (Safely) | Dev Brains AI</title>
        <meta
          name="description"
          content="Convert YAML to JSON using js-yaml and PyYAML safe_load, dodge the yaml.load security trap, and see what round-tripping silently loses: comments and anchors."
        />
        <meta
          name="keywords"
          content="convert yaml to json, yaml to json javascript, js-yaml tutorial, pyyaml safe_load, yaml to json python, json to yaml, yq yaml to json, yaml deserialization security"
        />
        <meta property="og:title" content="Convert YAML to JSON in JavaScript & Python (Safely)" />
        <meta property="og:description" content="Convert YAML to JSON using js-yaml and PyYAML safe_load, dodge the yaml.load security trap, and see what round-tripping silently loses: comments and anchors." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/convert-yaml-to-json-javascript-python" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/convert-yaml-to-json-javascript-python" />
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
              <li aria-current="page">Convert YAML to JSON</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Convert YAML to JSON in JavaScript and Python (Safely)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Sooner or later every pipeline needs to turn YAML into JSON — feeding a Kubernetes
            manifest to an API, loading CI config in a Node script, or transforming Ansible
            variables in Python. The conversion itself is two lines of code. The interesting parts
            are the sharp edges: which loader is safe for untrusted input, what silently disappears
            in the round trip, and how to do it in one line from the shell. This guide covers all
            of it for JavaScript (js-yaml), Python (PyYAML), and the command line (yq).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            JavaScript: js-yaml
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The de facto standard in the Node ecosystem is <code>js-yaml</code>
            (<code>npm install js-yaml</code>). Parse with <code>load</code>, serialize with
            <code> dump</code>, and pair them with the built-in <code>JSON</code> object:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const fs = require('fs');
const yaml = require('js-yaml');

// YAML → JSON
const doc = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
fs.writeFileSync('config.json', JSON.stringify(doc, null, 2));

// JSON → YAML
const data = JSON.parse(fs.readFileSync('config.json', 'utf8'));
fs.writeFileSync('config.yaml', yaml.dump(data, { indent: 2 }));

// Multi-document files (k8s manifests separated by ---)
const docs = yaml.loadAll(fs.readFileSync('all.yaml', 'utf8'));
// → array of parsed documents`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <strong>Untrusted input:</strong> in modern js-yaml (v4+), <code>load</code> uses the
            safe schema by default and will not construct arbitrary objects — the old dangerous
            behaviour now requires explicitly opting into <code>DEFAULT_FULL_SCHEMA</code> via a
            legacy API. If you are stuck on js-yaml v3, use <code>safeLoad</code>, never
            <code> load</code>, for anything a user can upload. Wrap parsing in try/catch:
            <code> YAMLException</code> includes the line and column of the syntax error.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Python: PyYAML — safe_load or Nothing
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Python&apos;s standard choice is PyYAML (<code>pip install pyyaml</code>). Here the
            loader choice is a genuine <strong>security decision</strong>, not a style preference:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import json
import yaml

# YAML → JSON
with open('config.yaml') as f:
    data = yaml.safe_load(f)          # ALWAYS safe_load

with open('config.json', 'w') as f:
    json.dump(data, f, indent=2)

# JSON → YAML
with open('config.json') as f:
    data = json.load(f)

with open('config.yaml', 'w') as f:
    yaml.safe_dump(data, f, default_flow_style=False,
                   sort_keys=False)   # keep original key order

# Multi-document input
docs = list(yaml.safe_load_all(open('all.yaml')))`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Why the insistence on <code>safe_load</code>? Full <code>yaml.load</code> honours
            language-specific tags like <code>!!python/object/apply</code>, which can
            <strong> instantiate arbitrary Python objects — including a call to
            os.system</strong> — the moment the file is parsed. A YAML file from a user upload,
            a webhook, or even another team must be treated as code under <code>load</code>:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# malicious.yaml — parsing this with yaml.load(f, yaml.Loader)
# runs the command:
exploit: !!python/object/apply:os.system ["rm -rf /tmp/x"]

yaml.safe_load(open('malicious.yaml'))
# → yaml.constructor.ConstructorError  (blocked — safe)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Since PyYAML 5.1, bare <code>yaml.load(f)</code> without a Loader argument emits a
            warning for exactly this reason. Make <code>safe_load</code> muscle memory and the
            whole class of vulnerability disappears.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Round-Trip Caveats: What the Conversion Loses
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            YAML → JSON → YAML is <strong>not</strong> a lossless journey. The parsed data
            survives; the human layer does not:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Comments are gone.</strong> They are not part of the data model, so every <code>#</code> line vanishes at load time. If you must edit YAML programmatically while keeping comments, use <code>ruamel.yaml</code> (Python) in round-trip mode instead of PyYAML.</li>
            <li><strong>Anchors are flattened.</strong> JSON has no reference syntax, so each <code>*alias</code> is expanded into a full copy. A compact 50-line file with anchors can explode into hundreds of JSON lines, and converting back does not restore the anchors.</li>
            <li><strong>Key order may change.</strong> JSON objects are technically unordered; PyYAML additionally sorts keys on dump unless you pass <code>sort_keys=False</code>. Diffs against the original file become noisy.</li>
            <li><strong>Types get normalized.</strong> YAML dates become strings, <code>NaN</code>/<code>Infinity</code> are invalid JSON, and octal or sexagesimal edge cases resolve to plain numbers.</li>
            <li><strong>Multiple documents need special handling.</strong> JSON has no <code>---</code> equivalent — emit an array of documents or one file per document.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Command Line: yq One-Liners
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For shell scripts and quick checks, <code>yq</code> (the Go version by Mike Farah) is
            the standard tool — think <code>jq</code> for YAML:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# YAML → JSON
yq -o=json config.yaml > config.json

# JSON → YAML
yq -P config.json > config.yaml

# Extract one field while converting
yq -o=json '.spec.containers[0].image' deployment.yaml

# Convert every doc in a multi-document manifest
yq ea -o=json '[.]' all-manifests.yaml

# No yq installed? Python one-liner (PyYAML required):
python -c "import yaml,json,sys; \\
  print(json.dumps(yaml.safe_load(sys.stdin), indent=2))" \\
  < config.yaml > config.json`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            And when you just need to eyeball how a snippet parses — no terminal, no install —
            paste it into the free <Link href="/yaml-json-converter">YAML ↔ JSON converter</Link>,
            which runs entirely in your browser.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Choosing Your Approach
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Node app or build script</strong> — js-yaml; use <code>loadAll</code> for multi-document manifests.</li>
            <li><strong>Python service or data pipeline</strong> — PyYAML with <code>safe_load</code>; switch to ruamel.yaml only if comments must survive edits.</li>
            <li><strong>Shell scripts and CI steps</strong> — yq; it is a single static binary, ideal for containers.</li>
            <li><strong>One-off inspection or debugging</strong> — a browser-based converter beats writing any code at all.</li>
            <li><strong>Anything user-uploaded</strong> — safe loaders only, size-limit the input, and wrap parsing in a try/except that returns a clean 400 error.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between yaml.load and yaml.safe_load in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              yaml.load with the full loader can construct arbitrary Python objects from special
              YAML tags, which lets a malicious file execute code when parsed. yaml.safe_load only
              builds plain types — dicts, lists, strings, numbers, booleans — and is what you
              should use for any file you did not author yourself.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does converting YAML to JSON preserve comments?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Comments are not part of the parsed data model, so they are discarded the moment
              YAML is loaded. Anchors and aliases are also expanded into full copies, and
              formatting is lost. If you need to edit YAML while keeping comments, use a
              round-trip library like ruamel.yaml in Python.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert YAML to JSON on the command line?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The yq tool does it in one line: yq -o=json file.yaml converts YAML to JSON, and
              yq -P file.json converts JSON back to YAML. Python also works without installing
              anything extra if PyYAML is present: python -c &quot;import yaml, json, sys;
              print(json.dumps(yaml.safe_load(sys.stdin)))&quot; &lt; file.yaml.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free YAML ↔ JSON Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert YAML to JSON and back instantly — right in your browser, with no code and
              no install. No signup, no cost.
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
              <li><Link href="/blog/yaml-syntax-guide-for-beginners">YAML Syntax Guide for Beginners</Link></li>
              <li><Link href="/blog/common-yaml-errors-in-kubernetes-and-ci">Common YAML Errors in Kubernetes and CI Pipelines</Link></li>
              <li><Link href="/blog/json-serialization-python-guide">JSON Serialization in Python — Complete Guide</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
