// pages/blog/compare-config-files-across-environments.js
import Head from 'next/head';
import Link from 'next/link';

export default function CompareConfigFilesAcrossEnvironments() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Compare Config Files Across Environments',
        item: 'https://dev-brains-ai.com/blog/compare-config-files-across-environments',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Compare Config Files Across Environments: Finding Drift Between Dev, Staging, and Prod',
    description:
      'How to find configuration drift between dev, staging, and production: redact secrets before diffing, sort keys in JSON and YAML configs, automate drift detection in CI, plus a worked example with two .env files.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/compare-config-files-across-environments',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is configuration drift?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Configuration drift is when environments that should be structurally identical — dev, staging, production — slowly diverge: a flag flipped in one place, a timeout tuned during an incident, a key added to staging but never promoted. Drift is a leading cause of works-on-staging, fails-on-prod bugs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I diff config files that contain secrets safely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redact secret values before diffing: replace passwords, API keys, and tokens with a placeholder like [REDACTED]. Since secrets are supposed to differ between environments anyway, redacting removes noise as well as risk. Then use a client-side tool such as the Dev Brains AI Diff Checker so the text never leaves your browser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I sort keys before comparing JSON or YAML configs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Key order carries no meaning in JSON and most YAML mappings, but a line diff compares text, not meaning. If two files list the same keys in different orders, the diff shows dozens of false differences. Normalising with a tool like jq --sort-keys or yq sort_keys makes the diff show only real value differences.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Compare Config Files Across Environments: Find Drift | Dev Brains AI</title>
        <meta
          name="description"
          content="Find config drift between dev, staging, and prod: redact secrets before diffing, sort keys for JSON/YAML, automate drift detection in CI, with a worked .env example."
        />
        <meta
          name="keywords"
          content="compare config files, configuration drift, diff env files, compare environment variables, json config diff, yaml diff sorted keys, drift detection ci, dev staging prod config"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/compare-config-files-across-environments" />
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
              <li aria-current="page">Compare Config Files Across Environments</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Compare Config Files Across Environments: Finding Drift Between Dev, Staging, and Prod
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            &quot;But it works on staging&quot; is rarely a mystery about code — it is usually a
            mystery about configuration. Environments that began as copies of each other drift
            apart one hotfix at a time: a timeout raised during an incident and never propagated,
            a feature flag flipped in dev and forgotten, a cache setting that exists only in
            production. This guide shows how to diff configs across environments safely (secrets!),
            accurately (key order!), and automatically (CI!), ending with a worked .env example.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How Environment Drift Happens
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Incident hotfixes</strong> — a value tuned directly on production at 2 a.m. and never backported to staging or the repo.</li>
            <li><strong>One-way promotions</strong> — a new key added to dev for a feature, promoted to staging, but the production deploy checklist missed it.</li>
            <li><strong>Manual edits</strong> — anyone with server access changing a file by hand, outside version control.</li>
            <li><strong>Abandoned experiments</strong> — flags and keys from features that shipped, changed, or died, still lingering in one environment.</li>
            <li><strong>Different owners</strong> — infra manages prod configs, developers manage dev configs, and nobody owns keeping them aligned.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            The symptom is always the same: behaviour differs between environments and the code is
            identical. The cure is a disciplined diff.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 1: Redact Secrets Before Diffing
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Config files are where secrets live — database passwords, API keys, signing tokens.
            Before pasting configs into any tool (or even attaching them to a ticket), replace
            secret values with placeholders. There is a bonus: secrets are <em>supposed</em> to
            differ between environments, so redacting them also removes expected noise from the
            diff.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Quick redaction with sed (keys containing SECRET/PASSWORD/KEY/TOKEN)
sed -E 's/^(.*(SECRET|PASSWORD|KEY|TOKEN)[^=]*)=.*/\\1=[REDACTED]/' .env.prod

DB_PASSWORD=[REDACTED]
STRIPE_API_KEY=[REDACTED]
SESSION_TIMEOUT=3600      # non-secret values stay visible`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Even with redaction, prefer a client-side diff tool that never uploads your text — the{' '}
            <Link href="/diff-checker">Dev Brains AI Diff Checker</Link> runs entirely in your
            browser.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 2: Normalise Structured Configs (Sort the Keys)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A line diff compares text, not meaning. In JSON and most YAML mappings, key order is
            irrelevant to the application — but if prod lists keys alphabetically and staging lists
            them chronologically, a naive diff reports everything as changed. Normalise first:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# JSON: sort keys and pretty-print with jq
jq --sort-keys . config-staging.json > staging.norm.json
jq --sort-keys . config-prod.json    > prod.norm.json
diff -u staging.norm.json prod.norm.json

# YAML: sort keys with yq
yq 'sort_keys(..)' config-staging.yml > staging.norm.yml

# .env files: plain sort works
sort .env.staging > staging.sorted
sort .env.prod    > prod.sorted`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            After normalisation, every line the diff flags is a <em>real</em> difference. For
            JSON-specific techniques see{' '}
            <Link href="/blog/json-diff-comparing-two-json-objects">comparing two JSON objects</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Worked Example: Two .env Files
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here are staging and production files after redacting secrets and sorting keys:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`# staging.sorted                    # prod.sorted
CACHE_TTL=300                       CACHE_TTL=60
DB_HOST=db.staging.internal         DB_HOST=db.prod.internal
DB_PASSWORD=[REDACTED]              DB_PASSWORD=[REDACTED]
ENABLE_NEW_CHECKOUT=true            ENABLE_NEW_CHECKOUT=false
LOG_LEVEL=debug                     LOG_LEVEL=warn
MAX_UPLOAD_MB=25                    MAX_UPLOAD_MB=10
PAYMENT_RETRIES=3                   PAYMENT_RETRIES=3
                                    RATE_LIMIT_PER_MIN=120`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The diff surfaces four kinds of finding, each needing a different response:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Expected differences</strong> — <code>DB_HOST</code> and <code>LOG_LEVEL</code> are supposed to differ per environment. Fine.</li>
            <li><strong>Suspicious value drift</strong> — <code>CACHE_TTL</code> 300 vs 60 and <code>MAX_UPLOAD_MB</code> 25 vs 10: are these deliberate tuning or a forgotten hotfix? Someone must decide and document.</li>
            <li><strong>Feature flag divergence</strong> — <code>ENABLE_NEW_CHECKOUT</code> is on in staging and off in prod. Staging is not testing what production runs.</li>
            <li><strong>Missing key</strong> — <code>RATE_LIMIT_PER_MIN</code> exists only in prod. If code reads it with a default fallback, staging silently behaves differently.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 3: Automate Drift Detection in CI
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A manual diff finds today&apos;s drift; automation prevents next month&apos;s. The
            trick is comparing <em>keys and structure</em> on a schedule, while ignoring values
            that legitimately differ:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`#!/bin/sh
# ci/check-config-drift.sh — fail if key sets differ
cut -d= -f1 .env.staging | sort > /tmp/staging.keys
cut -d= -f1 .env.prod    | sort > /tmp/prod.keys

if ! diff -u /tmp/staging.keys /tmp/prod.keys; then
  echo "CONFIG DRIFT: key sets differ between staging and prod"
  exit 1
fi`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Run it on every PR that touches config, plus a nightly schedule to catch manual server edits.</li>
            <li>Maintain a small allowlist of keys whose <em>values</em> may differ (hosts, log levels), and alert when other values diverge.</li>
            <li>Better long-term: generate all environment configs from one template plus per-environment overrides, so drift becomes structurally impossible.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is configuration drift?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Configuration drift is when environments that should be structurally identical — dev, staging, production — slowly diverge: a flag flipped in one place, a timeout tuned during an incident, a key added to staging but never promoted. Drift is a leading cause of works-on-staging, fails-on-prod bugs.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I diff config files that contain secrets safely?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Redact secret values before diffing: replace passwords, API keys, and tokens with a placeholder like [REDACTED]. Since secrets are supposed to differ between environments anyway, redacting removes noise as well as risk. Then use a client-side tool such as the <Link href="/diff-checker">Dev Brains AI Diff Checker</Link> so the text never leaves your browser.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why should I sort keys before comparing JSON or YAML configs?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Key order carries no meaning in JSON and most YAML mappings, but a line diff compares text, not meaning. If two files list the same keys in different orders, the diff shows dozens of false differences. Normalising with a tool like <code>jq --sort-keys</code> or <code>yq sort_keys</code> makes the diff show only real value differences.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Diff Checker</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste two configs and compare them line by line in your browser — your data never
              leaves your machine. No signup, no cost.
            </p>
            <Link href="/diff-checker">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Diff Checker →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/how-to-compare-two-text-files-online">How to Compare Two Text Files Online</Link></li>
              <li><Link href="/blog/json-diff-comparing-two-json-objects">JSON Diff: Comparing Two JSON Objects</Link></li>
              <li><Link href="/blog/understanding-diff-output-unified-vs-split-view">Understanding Diff Output: Unified vs Split View</Link></li>
              <li><Link href="/blog/git-diff-explained-for-beginners">Git Diff Explained for Beginners</Link></li>
              <li><Link href="/blog/common-git-errors-and-how-to-fix-them">Common Git Errors and How to Fix Them</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
