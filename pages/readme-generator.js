// pages/readme-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const FAQ = [
  {
    q: 'Is this README Generator free?',
    a: 'Yes — the README Generator on Dev Brains AI is completely free to use with no signup required.',
  },
  {
    q: 'Is my project data sent to a server?',
    a: 'No. The README is assembled entirely in your browser using JavaScript. Nothing you type is uploaded or stored on our servers.',
  },
  {
    q: 'Can I customize the output further?',
    a: 'Yes — the generated Markdown is just a starting point. Copy it into your README.md file and edit freely to match your project’s style.',
  },
];

function buildReadme(f) {
  const lines = [];
  lines.push(`# ${f.projectName || 'Project Name'}`);
  if (f.tagline) lines.push('', f.tagline);

  const badgeLines = [];
  if (f.badgeBuild) badgeLines.push('![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)');
  if (f.badgeVersion) badgeLines.push('![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)');
  if (f.badgeLicense) badgeLines.push(`![License](https://img.shields.io/badge/license-${(f.license || 'MIT').replace(/\s/g, '_')}-blue.svg)`);
  if (badgeLines.length) lines.push('', badgeLines.join(' '));

  if (f.description) lines.push('', '## Description', '', f.description);

  if (f.features) {
    const featureLines = f.features.split('\n').map((l) => l.trim()).filter(Boolean);
    if (featureLines.length) {
      lines.push('', '## Features', '');
      featureLines.forEach((feat) => lines.push(`- ${feat}`));
    }
  }

  lines.push('', '## Installation', '', '```bash', f.installCommand || 'npm install', '```');

  if (f.usageExample) {
    lines.push('', '## Usage', '', '```', f.usageExample, '```');
  }

  if (f.contributing) {
    lines.push(
      '', '## Contributing', '',
      'Contributions are welcome! Please open an issue first to discuss what you would like to change.',
      '', '1. Fork the repository', '2. Create your feature branch (`git checkout -b feature/my-feature`)',
      '3. Commit your changes', '4. Push to the branch', '5. Open a Pull Request'
    );
  }

  if (f.license && f.license !== 'None') {
    lines.push('', '## License', '', `This project is licensed under the ${f.license} License.`);
  }

  return lines.join('\n');
}

const LICENSES = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Unlicense', 'None'];

export default function ReadmeGeneratorPage() {
  const [projectName, setProjectName] = useState('my-project');
  const [tagline, setTagline] = useState('A short description of what this project does.');
  const [description, setDescription] = useState('');
  const [installCommand, setInstallCommand] = useState('npm install');
  const [usageExample, setUsageExample] = useState('');
  const [features, setFeatures] = useState('');
  const [license, setLicense] = useState('MIT');
  const [badgeBuild, setBadgeBuild] = useState(false);
  const [badgeVersion, setBadgeVersion] = useState(false);
  const [badgeLicense, setBadgeLicense] = useState(false);
  const [contributing, setContributing] = useState(false);
  const [copied, setCopied] = useState(false);

  const markdown = buildReadme({
    projectName,
    tagline,
    description,
    installCommand,
    usageExample,
    features,
    license,
    badgeBuild,
    badgeVersion,
    badgeLicense,
    contributing,
  });

  function handleCopy() {
    if (markdown) {
      navigator.clipboard?.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleReset() {
    setProjectName('my-project');
    setTagline('A short description of what this project does.');
    setDescription('');
    setInstallCommand('npm install');
    setUsageExample('');
    setFeatures('');
    setLicense('MIT');
    setBadgeBuild(false);
    setBadgeVersion(false);
    setBadgeLicense(false);
    setContributing(false);
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dev Brains AI README Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free README generator that runs in your browser. Fill in a form and get a polished README.md instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'README Generator',
        item: 'https://dev-brains-ai.com/readme-generator',
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free README Generator — Create a README.md Instantly | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate a polished README.md instantly with our free README Generator. Fill in a simple form — project name, description, install steps, badges — and copy clean Markdown, entirely in your browser."
        />
        <meta
          name="keywords"
          content="readme generator, readme.md generator, github readme generator, markdown readme, create readme online, Dev Brains AI"
        />
        <meta property="og:title" content="Free README Generator — Create a README.md Instantly" />
        <meta
          property="og:description"
          content="Fill in a form and instantly generate a clean README.md with badges, install steps, usage examples, and license section. No signup, no data uploaded."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/readme-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/readme-generator" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="card" aria-live="polite">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">README Generator</li>
          </ol>
        </nav>

        <h1>README Generator</h1>
        <p className="small">
          Fill in the details about your project and get a polished <code>README.md</code> instantly.
          The preview updates live as you type — nothing is uploaded to a server.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
          {/* Form column */}
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <label htmlFor="rg-name"><strong>Project name</strong></label>
            <input
              id="rg-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-project"
              style={{ marginBottom: 10 }}
            />

            <label htmlFor="rg-tagline"><strong>Tagline</strong></label>
            <input
              id="rg-tagline"
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="A short description of what this project does."
              style={{ marginBottom: 10 }}
            />

            <label htmlFor="rg-description"><strong>Description</strong></label>
            <textarea
              id="rg-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A longer explanation of what the project does, who it's for, and why it exists."
              style={{ minHeight: 90, marginBottom: 10 }}
            />

            <label htmlFor="rg-install"><strong>Install command</strong></label>
            <input
              id="rg-install"
              type="text"
              value={installCommand}
              onChange={(e) => setInstallCommand(e.target.value)}
              placeholder="npm install"
              style={{ marginBottom: 10 }}
            />

            <label htmlFor="rg-usage"><strong>Usage example</strong></label>
            <textarea
              id="rg-usage"
              value={usageExample}
              onChange={(e) => setUsageExample(e.target.value)}
              placeholder={'import { myFunction } from "my-project";\n\nmyFunction();'}
              style={{ minHeight: 90, marginBottom: 10 }}
            />

            <label htmlFor="rg-features"><strong>Features (one per line)</strong></label>
            <textarea
              id="rg-features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder={'Fast and lightweight\nZero dependencies\nWorks in the browser'}
              style={{ minHeight: 90, marginBottom: 10 }}
            />

            <label htmlFor="rg-license"><strong>License</strong></label>
            <select
              id="rg-license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              style={{ marginBottom: 10 }}
            >
              {LICENSES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <div style={{ marginBottom: 10 }}>
              <strong>Badges</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
                <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="checkbox" checked={badgeBuild} onChange={(e) => setBadgeBuild(e.target.checked)} />
                  Build status
                </label>
                <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="checkbox" checked={badgeVersion} onChange={(e) => setBadgeVersion(e.target.checked)} />
                  npm version
                </label>
                <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="checkbox" checked={badgeLicense} onChange={(e) => setBadgeLicense(e.target.checked)} />
                  License
                </label>
              </div>
            </div>

            <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', marginBottom: 10 }}>
              <input type="checkbox" checked={contributing} onChange={(e) => setContributing(e.target.checked)} />
              Include a &quot;Contributing&quot; section
            </label>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="button" onClick={handleReset}>Reset</button>
            </div>
          </div>

          {/* Preview column */}
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Live README.md preview</strong>
              <button type="button" className="small" onClick={handleCopy} disabled={!markdown}>
                {copied ? '✓ Copied' : 'Copy Markdown'}
              </button>
            </div>
            <pre
              style={{
                marginTop: 4,
                minHeight: 480,
                maxHeight: 640,
                overflow: 'auto',
                background: '#0f172a',
                color: '#e2e8f0',
                padding: 14,
                borderRadius: 8,
                fontSize: 13,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {markdown}
            </pre>
          </div>
        </div>
      </div>

      {/* SEO content card */}
      <div className="card">
        <h2>About this README Generator</h2>
        <p>
          The Dev Brains AI README Generator turns a short form into a clean, ready-to-use{' '}
          <code>README.md</code> file. Type your project name, tagline, description, install
          command, usage example, and feature list, and the Markdown preview updates instantly on
          the right. When you are happy with the result, click <strong>Copy Markdown</strong> and
          paste it straight into your repository. Everything runs client-side in your browser, so
          there is no upload, no account, and no waiting.
        </p>

        <h3>Why a good README matters</h3>
        <p>
          A README is usually the first thing a visitor sees when they land on your GitHub
          repository or npm package page. It is your project&apos;s first impression: a clear,
          well-organized README tells contributors and users what the project does, how to install
          it, and how to use it in under a minute. A messy or missing README, on the other hand,
          drives people away before they even try your code. Beyond first impressions, a solid
          README also improves discoverability — GitHub and npm both surface README content in
          search results, and badges (build status, version, license) give visitors quick
          confidence signals at a glance.
        </p>

        <h3>What to include in a README</h3>
        <ul>
          <li><strong>Project name and tagline</strong> — a one-line summary of what the project does.</li>
          <li><strong>Badges</strong> — build status, npm version, and license badges give an instant health check.</li>
          <li><strong>Description</strong> — a short paragraph explaining the problem the project solves.</li>
          <li><strong>Features</strong> — a bullet list highlighting what makes the project useful.</li>
          <li><strong>Installation</strong> — the exact command needed to install or set up the project.</li>
          <li><strong>Usage</strong> — a minimal code example showing the project in action.</li>
          <li><strong>Contributing</strong> — guidance for anyone who wants to submit a pull request.</li>
          <li><strong>License</strong> — which license governs use of the code (MIT, Apache-2.0, GPL-3.0, etc.).</li>
        </ul>

        <h3>Tips for writing a clear project description</h3>
        <ul>
          <li>Lead with the problem your project solves, not just what it technically does.</li>
          <li>Keep the tagline under one sentence — save the detail for the description section.</li>
          <li>Use plain language; avoid jargon that only maintainers would understand.</li>
          <li>Mention who the project is for (e.g. &quot;a CLI for backend developers&quot;).</li>
          <li>List features as short, scannable bullet points rather than long paragraphs.</li>
          <li>Keep usage examples minimal and copy-pasteable — a working snippet beats a wall of text.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: README Generator</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>{item.a}</div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Documenting an API? Try our <Link href="/api-docs-generator">API Docs Generator</Link> to
          turn endpoint details into clean Markdown, or use the{' '}
          <Link href="/commit-message-generator">Commit Message Generator</Link> to write clear
          commit messages. If you are designing your endpoints from scratch, check out our guide on{' '}
          <Link href="/blog/how-to-design-a-rest-api-best-practices">
            how to design a REST API
          </Link>.
        </p>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: README and Markdown</h3>
        <ul className="small">
          <li><Link href="/blog/how-to-write-a-great-readme">How to Write a Great README.md (With Examples)</Link></li>
          <li><Link href="/blog/markdown-syntax-cheat-sheet">Markdown Syntax Cheat Sheet — Every Element with Examples</Link></li>
          <li><Link href="/blog/github-flavored-markdown-guide">GitHub Flavored Markdown (GFM) — The Complete Guide</Link></li>
          <li><Link href="/blog/writing-github-issues-and-prs-with-markdown">Writing GitHub Issues and PRs with Markdown</Link></li>
        </ul>
      </div>

    </div>
  );
}
