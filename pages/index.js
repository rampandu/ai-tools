// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Hero from '../components/Hero';

const TOOL_SECTIONS = [
  {
    id: 'generate',
    heading: 'Generate',
    blurb: 'Turn a plain-English description into ready-to-use code, docs, or config.',
    tools: [
      { href: '/regex-generator', name: 'Regex Generator', desc: 'Convert plain English into regular expressions with readable explanations.' },
      { href: '/sql-generator', name: 'SQL Generator', desc: 'Describe the data you need and get ready-to-run SQL queries.' },
      { href: '/cron-generator', name: 'Cron Generator', desc: 'Describe your schedule in plain English and get the correct cron expression.' },
      { href: '/readme-generator', name: 'README Generator', desc: 'Fill in your project details and generate a polished README.md instantly.' },
      { href: '/api-docs-generator', name: 'API Docs Generator', desc: 'Describe an API endpoint and generate clean, structured documentation.' },
      { href: '/unit-test-generator', name: 'Unit Test Generator', desc: 'Paste a function signature and get a ready-to-run test scaffold.' },
      { href: '/commit-message-generator', name: 'Commit Message Generator', desc: 'Describe your change and get a properly formatted Conventional Commit message.' },
      { href: '/docstring-generator', name: 'Docstring Generator', desc: 'Paste a function signature and generate a JSDoc or Python docstring.' },
    ],
  },
  {
    id: 'explain',
    heading: 'Explain',
    blurb: 'Paste something confusing and get a clear, plain-English breakdown.',
    tools: [
      { href: '/regex-explainer', name: 'Regex Explainer', desc: 'Paste any regex and get a plain-English, token-by-token breakdown.' },
      { href: '/sql-explainer', name: 'SQL Query Explainer', desc: 'Paste a SQL query and get a clear explanation of what it does.' },
      { href: '/code-explainer', name: 'Code Explainer', desc: 'Paste a code snippet and get a structural, plain-English walkthrough.' },
      { href: '/stack-trace-analyzer', name: 'Stack Trace Analyzer', desc: 'Paste a full error stack trace and get the likely cause and fix.' },
      { href: '/ai-error-explainer', name: 'Error Explainer', desc: 'Paste an error message and get a human-readable explanation plus debugging steps.' },
      { href: '/jwt-decoder', name: 'JWT Decoder', desc: 'Decode a JWT’s header, payload, and expiry instantly — without sending it anywhere.' },
    ],
  },
  {
    id: 'convert',
    heading: 'Convert & Format',
    blurb: 'Clean up, transform, or translate data between formats — all in your browser.',
    tools: [
      { href: '/json-formatter', name: 'JSON Formatter', desc: 'Pretty-print, validate, and minify JSON directly in your browser.' },
      { href: '/json-schema-generator', name: 'JSON Schema Generator', desc: 'Paste example JSON and instantly generate a draft JSON Schema.' },
      { href: '/base64-tool', name: 'Base64 Tool', desc: 'Encode or decode Base64 strings in your browser. No data uploaded.' },
      { href: '/url-encoder', name: 'URL Encoder', desc: 'Percent-encode or decode URL strings in your browser.' },
      { href: '/curl-converter', name: 'cURL to Code', desc: 'Paste a curl command and get equivalent fetch, axios, or Python requests code.' },
      { href: '/sql-formatter', name: 'SQL Formatter', desc: 'Beautify or minify any SQL query with consistent keyword casing.' },
      { href: '/yaml-json-converter', name: 'YAML ↔ JSON Converter', desc: 'Convert YAML to JSON and back, with clear error messages for invalid input.' },
      { href: '/markdown-preview', name: 'Markdown Previewer', desc: 'Write markdown on the left, see the rendered result live on the right.' },
    ],
  },
  {
    id: 'utilities',
    heading: 'Utilities',
    blurb: 'Everyday developer utilities — fast, private, and free.',
    tools: [
      { href: '/diff-checker', name: 'Diff Checker', desc: 'Compare two texts line by line and see additions and removals highlighted.' },
      { href: '/timestamp-converter', name: 'Timestamp Converter', desc: 'Convert unix timestamps to human dates and back, with a live epoch clock.' },
      { href: '/uuid-generator', name: 'UUID Generator', desc: 'Generate cryptographically random UUID v4 identifiers in bulk.' },
      { href: '/password-generator', name: 'Password Generator', desc: 'Generate strong random passwords locally, with a live entropy meter.' },
      { href: '/hash-generator', name: 'Hash Generator', desc: 'Compute MD5, SHA-1, SHA-256, and SHA-512 hashes of any text instantly.' },
      { href: '/color-converter', name: 'Color Converter', desc: 'Convert colors between HEX, RGB, and HSL with a live preview swatch.' },
    ],
  },
];

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dev-brains-ai.com';

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dev Brains AI',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dev Brains AI',
    url: siteUrl,
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: TOOL_SECTIONS.flatMap((section) => section.tools).map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `${siteUrl}${tool.href}`,
    })),
  };

  return (
    <>
      <Head>
        <title>Dev Brains AI — 28 Free Tools for Developers (Regex, SQL, JSON &amp; More)</title>
        <meta
          name="description"
          content="28 free developer tools: generate regex, SQL, UUIDs and passwords; decode JWTs; format SQL and JSON; convert YAML, timestamps and colors; diff text. No signup."
        />
        <meta
          name="keywords"
          content="regex generator, sql generator, json formatter, jwt decoder, sql formatter, diff checker, timestamp converter, uuid generator, password generator, hash generator, yaml to json, markdown preview, color converter, developer tools, Dev Brains AI"
        />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content="Dev Brains AI — 28 Free Tools for Developers" />
        <meta
          property="og:description"
          content="Free developer tools: generate regex, SQL, and READMEs; explain errors, SQL, and code; format JSON and Base64. No signup, no cost."
        />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <Hero />

        {/* How it works */}
        <section className="card" style={{ marginTop: 22 }}>
          <h2>How it works</h2>
          <p className="small">
            Every tool on Dev Brains AI follows the same three steps — no account, no
            configuration, no waiting.
          </p>
          <div
            style={{
              marginTop: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0ea5a6' }}>1</div>
              <div style={{ fontWeight: 600, marginTop: 4 }}>Paste or describe</div>
              <p className="small" style={{ marginTop: 4 }}>
                Drop in your code, error message, or a plain-English description of what you need.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0ea5a6' }}>2</div>
              <div style={{ fontWeight: 600, marginTop: 4 }}>Run the tool</div>
              <p className="small" style={{ marginTop: 4 }}>
                Each tool processes your input instantly in your browser or on our server — nothing
                is stored.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0ea5a6' }}>3</div>
              <div style={{ fontWeight: 600, marginTop: 4 }}>Copy and use it</div>
              <p className="small" style={{ marginTop: 4 }}>
                Copy the result straight into your project. Every tool page also explains how the
                output works, so you're not just copy-pasting blindly.
              </p>
            </div>
          </div>
        </section>

        {/* Tool sections, grouped to match the nav */}
        {TOOL_SECTIONS.map((section) => (
          <section className="card" style={{ marginTop: 18 }} key={section.id} id={section.id}>
            <h2>{section.heading}</h2>
            <p className="small">{section.blurb}</p>

            <div
              style={{
                marginTop: 16,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              {section.tools.map((tool) => (
                <div className="card small" style={{ marginTop: 0 }} key={tool.href}>
                  <h3 style={{ marginBottom: 6, fontSize: '1rem' }}>{tool.name}</h3>
                  <p className="small">{tool.desc}</p>
                  <Link href={tool.href} className="small" style={{ marginTop: 8, display: 'inline-block', fontWeight: 600 }}>
                    Open {tool.name} →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Why Dev Brains AI — real differentiators, no fabricated stats */}
        <section className="card" style={{ marginTop: 18 }}>
          <h2>Why Dev Brains AI</h2>
          <div
            style={{
              marginTop: 12,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>Genuinely free</div>
              <p className="small" style={{ marginTop: 4 }}>
                Every tool is free to use, with no account, no credit card, and no usage cap that
                pushes you toward a paid plan.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Privacy-first</div>
              <p className="small" style={{ marginTop: 4 }}>
                We don't store the text, code, or queries you paste in. Read the{' '}
                <Link href="/privacy">Privacy Policy</Link> for the full details.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Built for real workflows</div>
              <p className="small" style={{ marginTop: 4 }}>
                Every tool page includes worked examples, explanations, and an FAQ — not just a bare
                input box — so you understand the output, not just copy it.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Actively maintained</div>
              <p className="small" style={{ marginTop: 4 }}>
                We regularly add new tools and publish new guides on the{' '}
                <Link href="/blog">Blog</Link> covering regex, SQL, cron, JSON, and general developer
                workflow topics.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
