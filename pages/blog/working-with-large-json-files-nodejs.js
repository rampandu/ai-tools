// pages/blog/working-with-large-json-files-nodejs.js
import Head from 'next/head';
import Link from 'next/link';

export default function WorkingWithLargeJsonFilesNodejs() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Working with Large JSON Files in Node.js',
        item: 'https://dev-brains-ai.com/blog/working-with-large-json-files-nodejs',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: "Large JSON Files in Node.js: Avoid Heap Out of Memory",
    description:
      "How to process large JSON files in Node.js without crashing with 'heap out of memory' — streaming parsers, NDJSON, and working code examples.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/working-with-large-json-files-nodejs',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does JSON.parse crash on large files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JSON.parse requires the entire file content to be loaded into memory as a single string before it can parse anything. For very large files, this can exceed Node.js default memory limits and throw a "JavaScript heap out of memory" error.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a streaming JSON parser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A streaming JSON parser reads and processes a JSON file incrementally, in small chunks, emitting events as it encounters values, instead of loading the whole file into memory at once. Libraries like stream-json implement this for Node.js.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to inspect large JSON files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free JSON Formatter at dev-brains-ai.com/json-formatter for pretty-printing and validating smaller JSON samples or excerpts pulled from a larger file.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Large JSON Files in Node.js: Avoid Heap Out of Memory | Dev Brains AI</title>
        <meta
          name="description"
          content="How to process large JSON files in Node.js without crashing with 'heap out of memory' — streaming parsers, NDJSON, and working code examples."
        />
        <meta
          name="keywords"
          content="large json file nodejs, stream json nodejs, json heap out of memory, streaming json parser, process large json file, node js json memory limit"
        />
        <meta property="og:title" content="Large JSON Files in Node.js: Avoid Heap Out of Memory" />
        <meta property="og:description" content="How to process large JSON files in Node.js without crashing with 'heap out of memory' — streaming parsers, NDJSON, and working code examples." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/working-with-large-json-files-nodejs" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/working-with-large-json-files-nodejs" />
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
              <li aria-current="page">Large JSON Files in Node.js</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Working with Large JSON Files in Node.js Without Running Out of Memory
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            <code>JSON.parse(fs.readFileSync(...))</code> works fine until the file is a few
            hundred megabytes, at which point Node.js throws
            <code> "JavaScript heap out of memory"</code>. This guide covers why that happens and
            how to process large JSON files — export dumps, log archives, dataset files — without
            loading the entire thing into memory at once.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why the Naive Approach Fails
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const fs = require('fs');

// This reads the ENTIRE file into a string, then parses the ENTIRE string
// into an object — both held in memory simultaneously.
const data = JSON.parse(fs.readFileSync('orders-export.json', 'utf8'));

// For a 2GB file, this can easily exceed Node's default heap size
// and crash with: FATAL ERROR: Reached heap limit Allocation failed
// - JavaScript heap out of memory`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The problem is that both <code>readFileSync</code> and <code>JSON.parse</code> are
            synchronous, whole-file operations — there is no way to parse "part of" a JSON
            document with the built-in parser.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Solution 1: Stream-Process with stream-json
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The <code>stream-json</code> package parses JSON incrementally as bytes arrive,
            emitting events for each array element without holding the whole array in memory:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`npm install stream-json

const fs = require('fs');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

let count = 0;
let totalRevenue = 0;

fs.createReadStream('orders-export.json')
  .pipe(parser())
  .pipe(streamArray())
  .on('data', ({ value: order }) => {
    // Each "order" object is processed one at a time
    count++;
    totalRevenue += order.total;
  })
  .on('end', () => {
    console.log(\`Processed \${count} orders, total revenue: \${totalRevenue}\`);
  })
  .on('error', (err) => {
    console.error('Stream error:', err);
  });

// Memory usage stays flat regardless of file size, because only
// one order object is held in memory at a time.`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Solution 2: NDJSON / JSON Lines for New Data
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If you control how the data is written, avoid a single giant JSON array entirely.
            Newline-delimited JSON (NDJSON) writes one JSON object per line, which can be read and
            processed line-by-line with a simple readline stream:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// orders.ndjson
{"id":1,"total":499}
{"id":2,"total":1299}
{"id":3,"total":899}

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('orders.ndjson'),
  crlfDelay: Infinity
});

let totalRevenue = 0;

rl.on('line', (line) => {
  const order = JSON.parse(line);
  totalRevenue += order.total;
});

rl.on('close', () => {
  console.log('Total revenue:', totalRevenue);
});`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            NDJSON is what most log pipelines and big-data export tools (BigQuery, Elasticsearch
            bulk export) use internally, precisely because it is trivial to stream.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Solution 3: Increase Node's Memory Limit (Short-Term Fix)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If streaming is not immediately feasible, you can raise Node's heap limit as a
            stopgap — but this does not scale indefinitely and is not a substitute for streaming:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`node --max-old-space-size=4096 process-orders.js
# Raises heap limit to 4GB; still bounded by available system RAM.`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            When to Choose Which Approach
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>File under ~50MB</strong> — <code>JSON.parse(readFileSync())</code> is fine, no need to complicate things.</li>
            <li><strong>File is a large array of records you did not create</strong> — use <code>stream-json</code> to process it incrementally.</li>
            <li><strong>You control the write path (logs, exports)</strong> — switch to NDJSON so consumers never need to load the whole file.</li>
            <li><strong>You need random access, not sequential processing</strong> — consider loading the data into a database or SQLite file instead of parsing JSON repeatedly.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does JSON.parse crash on large files?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              JSON.parse requires the entire file content to be loaded into memory as a single string before it can parse anything. For very large files, this can exceed Node.js default memory limits and throw a "JavaScript heap out of memory" error.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a streaming JSON parser?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A streaming JSON parser reads and processes a JSON file incrementally, in small chunks, emitting events as it encounters values, instead of loading the whole file into memory at once. Libraries like stream-json implement this for Node.js.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to inspect large JSON files?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. <Link href="/json-formatter">Dev Brains AI JSON Formatter</Link> is useful for pretty-printing and validating smaller JSON samples or excerpts pulled from a larger file.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Inspect and validate JSON samples before you build a full streaming pipeline. No signup, no cost.
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
              <li><Link href="/blog/nested-json-flattening-techniques">Nested JSON Flattening Techniques</Link></li>
              <li><Link href="/blog/json-to-csv-conversion-guide">JSON to CSV Conversion Guide</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
              <li><Link href="/blog/json-minify-vs-pretty-print-explained">JSON Minify vs Pretty Print Explained</Link></li>
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
