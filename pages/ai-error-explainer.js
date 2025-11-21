// pages/ai-error-explainer.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const FAQ = [
  {
    q: "Is this error explainer free?",
    a: "Yes — the AI Error Message Explainer on Dev Brains AI is free to use in your browser.",
  },
  {
    q: "Does my error message get uploaded?",
    a: "No. The explanation runs in your browser using simple pattern-based logic. We do not send your error texts to our server by default.",
  },
  {
    q: "Which errors does it work best for?",
    a: "It works best for common JavaScript, TypeScript, and web-related errors such as undefined variables, type mismatches, import issues, and JSON parsing problems.",
  },
  {
    q: "Is this a replacement for documentation?",
    a: "No. This tool gives you a quick, human-readable explanation and next steps, but you should still consult official docs or logs for complex bugs.",
  },
];

function explainErrorText(text) {
  const lower = text.toLowerCase();
  const suggestions = [];

  let explanation =
    "This looks like a generic error message. The tool could not match a specific pattern, but you can still use the suggestions below to debug.";

  if (lower.includes("undefined") && lower.includes("is not a function")) {
    explanation =
      "A variable or value you are trying to call like a function is actually undefined or not a function. This often happens when an import is wrong or a callback is missing.";
    suggestions.push(
      "Check the import or require path for the function.",
      "Make sure the variable you are calling is actually a function.",
      "Log the value before calling it to see what it contains."
    );
  } else if (lower.includes("cannot read") && lower.includes("of undefined")) {
    explanation =
      "You are trying to access a property on an undefined value. This usually means some object in the chain is not initialised.";
    suggestions.push(
      "Check which part of the expression can be undefined (e.g. user, user.profile).",
      "Add optional chaining or null checks before accessing the property.",
      "Verify that your data is loaded before rendering."
    );
  } else if (lower.includes("json") && lower.includes("unexpected token")) {
    explanation =
      "This error indicates invalid JSON. There is likely a missing quote, comma, or an extra trailing comma.";
    suggestions.push(
      "Paste the JSON into a JSON formatter/validator to pinpoint the error.",
      "Check for trailing commas or missing quotes around keys and strings.",
      "Ensure the response you are parsing is actually JSON, not HTML or plain text."
    );
  } else if (lower.includes("module not found")) {
    explanation =
      "A required module or file cannot be found. The import path or package name is likely wrong.";
    suggestions.push(
      "Check the relative path (./, ../) and file extension if needed.",
      "Confirm the package is installed in node_modules.",
      "Restart your dev server or clear build caches if the file was recently added."
    );
  } else if (lower.includes("typeerror")) {
    explanation =
      "This is a TypeError, which usually means you are using a value in a way that does not match its type (e.g. calling something that is not a function, or using a non-object as an object).";
    suggestions.push(
      "Log the values involved to confirm their types.",
      "Add guards to check for null, undefined, or unexpected types.",
      "Review recent refactors that changed function signatures or return types."
    );
  } else {
    suggestions.push(
      "Search the exact error message (without secrets) on your favourite search engine.",
      "Check recent code changes or commits around the place where the error appears.",
      "Look at the full stack trace to see which file and line it originates from.",
      "If you use TypeScript, check if the compiler gives a more precise hint."
    );
  }

  return { explanation, suggestions };
}

export default function AiErrorExplainerPage() {
  const [input, setInput] = useState(
    "TypeError: Cannot read properties of undefined (reading 'length')"
  );
  const [explanation, setExplanation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hasRun, setHasRun] = useState(false);

  function handleExplain() {
    if (!input.trim()) {
      setExplanation("Please paste an error message first.");
      setSuggestions([]);
      setHasRun(true);
      return;
    }
    const { explanation, suggestions } = explainErrorText(input);
    setExplanation(explanation);
    setSuggestions(suggestions);
    setHasRun(true);
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
    name: "Dev Brains AI Error Message Explainer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Free AI-style error message explainer for developers. Paste your error text and get a human-readable explanation with debugging suggestions.",
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
        name: "AI Error Message Explainer",
        item: "https://dev-brains-ai.com/ai-error-explainer",
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>AI Error Message Explainer — Debug Errors Faster | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste your error message and get a human-readable explanation with practical debugging tips. Works best for JavaScript and web errors."
        />
        <meta
          name="keywords"
          content="error message explainer, JS error helper, debug tool, Dev Brains AI"
        />
        <meta
          property="og:title"
          content="AI Error Message Explainer — Debug Errors Faster"
        />
        <meta
          property="og:description"
          content="Understand cryptic error messages with a simple AI-style explainer for developers."
        />
        <meta
          property="og:url"
          content="https://dev-brains-ai.com/ai-error-explainer"
        />
        <meta property="og:type" content="article" />
        <link
          rel="canonical"
          href="https://dev-brains-ai.com/ai-error-explainer"
        />

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
      </Head>

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
            <li aria-current="page">AI Error Message Explainer</li>
          </ol>
        </nav>

        <h1>AI Error Message Explainer</h1>
        <p className="small">
          Paste your error message below and click{" "}
          <strong>Explain Error</strong> to get a human-readable summary and
          debugging suggestions. All processing happens in your browser.
        </p>

        <label htmlFor="error-input">
          <strong>Error message</strong>
        </label>
        <textarea
          id="error-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ minHeight: 160 }}
          placeholder="Example: TypeError: Cannot read properties of undefined (reading 'length')"
        />

        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" onClick={handleExplain}>
            Explain Error
          </button>
          <button
            type="button"
            onClick={() => {
              setInput("");
              setExplanation("");
              setSuggestions([]);
              setHasRun(false);
            }}
          >
            Clear
          </button>
        </div>

        {hasRun && (
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: 8 }}>Explanation</h2>
            <p className="small">{explanation}</p>

            {suggestions.length > 0 && (
              <>
                <h3 style={{ marginTop: 16, marginBottom: 6 }}>Next steps</h3>
                <ul className="small" style={{ paddingLeft: 20 }}>
                  {suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      {/* Extra SEO content */}
      <div className="card">
        <h2>Why use an error message explainer?</h2>
        <p className="small">
          Error messages are written for compilers and runtimes first, humans second.
          When you are tired or in a hurry, reading a stack trace can feel overwhelming.
          An error explainer helps you break down the message into:
        </p>
        <ul className="small">
          <li>What the error is saying in plain language.</li>
          <li>What usually causes similar errors in real projects.</li>
          <li>Concrete steps you can take to fix the problem.</li>
        </ul>

        <p className="small">
          Use this tool as a quick assistant alongside your usual debugging process,
          logs, breakpoints, and documentation.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: AI Error Message Explainer</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Try the{" "}
          <Link href="/regex-generator">AI Regex Generator</Link> to build
          regex patterns from text,{" "}
          <Link href="/sql-generator">AI SQL Generator</Link> for queries, or{" "}
          <Link href="/json-formatter">JSON Formatter</Link> to debug JSON payloads.
        </p>
      </div>
    </div>
  );
}
