// pages/json-formatter.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const FAQ = [
  {
    q: "Is this JSON formatter free?",
    a: "Yes — the JSON formatter and validator on Dev Brains AI is completely free to use in your browser.",
  },
  {
    q: "Does my JSON get sent to your server?",
    a: "No. Formatting and validation are performed in your browser using JavaScript. We do not send your JSON payloads to our server by default.",
  },
  {
    q: "Can I use this for API responses or logs?",
    a: "Yes. You can paste API responses, logs, or configuration files into the tool to quickly pretty-print, validate, and debug JSON.",
  },
  {
    q: "What happens if my JSON is invalid?",
    a: "You will see a clear error message indicating why parsing failed. Fix the issue and click Format again.",
  },
];

export default function JsonFormatterPage() {
  const [input, setInput] = useState("{\n  \"hello\": \"world\"\n}");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function formatJson() {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      setOutput("");
      setError(err?.message || "Invalid JSON");
    }
  }

  function minifyJson() {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setOutput("");
      setError(err?.message || "Invalid JSON");
    }
  }

  function copyOutput() {
    if (output) {
      navigator.clipboard?.writeText(output);
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dev Brains AI JSON Formatter & Validator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Free JSON formatter and validator that runs in your browser. Paste JSON, pretty-print, minify, and validate instantly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dev-brains-ai.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "JSON Formatter",
        item: "https://dev-brains-ai.com/json-formatter",
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>JSON Formatter & Validator — Free Online Tool | Dev Brains AI</title>
        <meta
          name="description"
          content="Format, validate, and minify JSON instantly with our free JSON Formatter & Validator. Paste JSON, pretty-print, check errors, and debug APIs in your browser."
        />
        <meta
          name="keywords"
          content="JSON formatter, JSON validator, JSON beautifier, online JSON formatter, Dev Brains AI"
        />
        <meta
          property="og:title"
          content="JSON Formatter & Validator — Free Online Tool"
        />
        <meta
          property="og:description"
          content="Quickly pretty-print and validate JSON. Ideal for developers, testers, and API debugging."
        />
        <meta
          property="og:url"
          content="https://dev-brains-ai.com/json-formatter"
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/json-formatter" />

        {/* Structured data */}
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

  {/* Google Ads Conversion Tracking */}
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=AW-17753334820"
  ></script>

  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17753334820');
      `,
    }}
  />
      </Head>

      {/* Main tool card */}
      <div className="card" aria-live="polite">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">JSON Formatter</li>
          </ol>
        </nav>

        <h1>JSON Formatter & Validator</h1>
        <p className="small">
          Paste your JSON on the left, then click <strong>Format JSON</strong> or{" "}
          <strong>Minify JSON</strong>. Validation happens automatically in your
          browser — we do not upload your data.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          {/* Input */}
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <label htmlFor="json-input">
              <strong>Input JSON</strong>
            </label>
            <textarea
              id="json-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ minHeight: 220 }}
              placeholder='{"hello": "world"}'
            />
          </div>

          {/* Output */}
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>Formatted / Minified JSON</strong>
              <button
                type="button"
                className="small"
                onClick={copyOutput}
                disabled={!output}
              >
                Copy Output
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              style={{ minHeight: 220, marginTop: 4 }}
              placeholder="Formatted JSON will appear here."
            />
          </div>
        </div>

        {/* Actions + error */}
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" onClick={formatJson}>
            Format JSON
          </button>
          <button type="button" onClick={minifyJson}>
            Minify JSON
          </button>
          <button
            type="button"
            onClick={() => {
              setInput("");
              setOutput("");
              setError("");
            }}
          >
            Clear
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="small"
            style={{ marginTop: 10, color: "crimson" }}
          >
            <strong>JSON Error:</strong> {error}
          </div>
        )}
      </div>

      {/* SEO / educational content card */}
      <div className="card">
        <h2>Why use a JSON Formatter & Validator?</h2>
        <p className="small">
          JSON is the backbone of modern APIs, configs, and data pipelines — but
          it quickly becomes hard to read when everything is on a single line. A
          JSON formatter helps you:
        </p>
        <ul className="small">
          <li>Pretty-print compact or minified JSON from APIs and logs.</li>
          <li>Catch missing commas, quotes, or brackets instantly.</li>
          <li>Debug nested objects and arrays visually.</li>
          <li>Prepare clean JSON for documentation or code reviews.</li>
        </ul>

        <p className="small">
          The Dev Brains AI JSON tool keeps everything on the client side: paste,
          format, validate, and copy — without sending data to a server.
        </p>
      </div>

      <div className="card">
        <h2>Tips for Working with JSON</h2>
        <ul className="small">
          <li>Ensure all keys are in quotes, e.g., <code>"name": "Dev Brains"</code>.</li>
          <li>Use commas between items, but not after the last item in an object or array.</li>
          <li>
            Booleans and null are written as <code>true</code>, <code>false</code>,{" "}
            <code>null</code> without quotes.
          </li>
          <li>
            Remember that JSON does not support comments — remove <code>//</code> or{" "}
            <code>/* ... */</code>.
          </li>
        </ul>

        <p className="small">
          For advanced debugging, you can combine this formatter with your browser DevTools or API
          clients like Postman and Insomnia.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: JSON Formatter & Validator</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-link to other tools */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Try our{" "}
          <Link href="/regex-generator">AI Regex Generator</Link> to build regex patterns from
          plain English, or{" "}
          <Link href="/sql-generator">AI SQL Generator</Link> to convert questions into SQL queries.
        </p>
      </div>
    </div>
  );
}
