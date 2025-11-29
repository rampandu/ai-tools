// pages/json-schema-generator.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const FAQ_SCHEMA = [
  {
    q: "Is this JSON Schema generator free?",
    a: "Yes — the JSON Schema generator on Dev Brains AI is free to use in your browser.",
  },
  {
    q: "Do you send my JSON to a server?",
    a: "No. Your JSON is parsed locally in the browser and the schema is generated on the client side.",
  },
  {
    q: "Which draft of JSON Schema does this follow?",
    a: "The generated schema roughly follows JSON Schema draft-style syntax with type, properties, items, and required fields. For advanced use, you may need to refine it manually.",
  },
  {
    q: "Can I use this schema in production?",
    a: "Yes, but always review and adapt it to match your exact validation rules, edge cases, and API contracts before using it in production.",
  },
];

function inferType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value; // "string", "number", "boolean", "object"
}

function mergeSchemas(a, b) {
  // very simple merge: if type differs, use ["type1","type2"]
  if (!a) return b;
  if (!b) return a;

  const result = { ...a };

  // merge type
  const types = new Set();
  const addType = (t) => {
    if (Array.isArray(t)) t.forEach((x) => types.add(x));
    else if (t) types.add(t);
  };
  addType(a.type);
  addType(b.type);
  result.type = types.size === 1 ? [...types][0] : [...types];

  // merge properties (for objects)
  if (a.properties || b.properties) {
    result.properties = { ...(a.properties || {}), ...(b.properties || {}) };
  }

  // merge required
  if (a.required || b.required) {
    const req = new Set([...(a.required || []), ...(b.required || [])]);
    result.required = [...req];
  }

  // merge items (for arrays)
  if (a.items && b.items) {
    result.items = mergeSchemas(a.items, b.items);
  } else if (a.items || b.items) {
    result.items = a.items || b.items;
  }

  return result;
}

function buildSchemaFromValue(value) {
  const t = inferType(value);

  switch (t) {
    case "object": {
      const properties = {};
      const required = [];
      for (const key of Object.keys(value)) {
        properties[key] = buildSchemaFromValue(value[key]);
        required.push(key);
      }
      return {
        type: "object",
        properties,
        required,
      };
    }
    case "array": {
      if (value.length === 0) {
        return { type: "array", items: {} };
      }
      // infer item schema from all entries
      let itemSchema = null;
      for (const item of value) {
        const s = buildSchemaFromValue(item);
        itemSchema = mergeSchemas(itemSchema, s);
      }
      return {
        type: "array",
        items: itemSchema || {},
      };
    }
    case "number":
      return { type: "number" };
    case "boolean":
      return { type: "boolean" };
    case "string":
      return { type: "string" };
    case "null":
      return { type: "null" };
    default:
      return {};
  }
}

export default function JsonSchemaGeneratorPage() {
  const [input, setInput] = useState(
    `{
  "id": 123,
  "name": "Dev Brains AI",
  "active": true,
  "tags": ["tools", "ai"],
  "profile": {
    "country": "India",
    "teamSize": 3
  }
}`
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleGenerateSchema() {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const schema = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        ...buildSchemaFromValue(parsed),
      };
      setOutput(JSON.stringify(schema, null, 2));
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
    mainEntity: FAQ_SCHEMA.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dev Brains AI JSON Schema Generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Free JSON Schema generator that infers a draft-style JSON Schema from example JSON objects in your browser.",
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
        name: "AI JSON Schema Generator",
        item: "https://dev-brains-ai.com/json-schema-generator",
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>AI JSON Schema Generator — Infer Schema from JSON | Dev Brains AI</title>
        <meta
          name="description"
          content="Paste example JSON and instantly generate a draft-style JSON Schema. Free, browser-based JSON Schema generator for APIs and validation."
        />
        <meta
          name="keywords"
          content="JSON Schema generator, infer JSON schema, online JSON schema tool, Dev Brains AI"
        />
        <meta
          property="og:title"
          content="AI JSON Schema Generator — Infer Schema from JSON"
        />
        <meta
          property="og:description"
          content="Generate JSON Schema from sample JSON objects in your browser."
        />
        <meta
          property="og:url"
          content="https://dev-brains-ai.com/json-schema-generator"
        />
        <meta property="og:type" content="article" />
        <link
          rel="canonical"
          href="https://dev-brains-ai.com/json-schema-generator"
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
            <li aria-current="page">AI JSON Schema Generator</li>
          </ol>
        </nav>

        <h1>AI JSON Schema Generator</h1>
        <p className="small">
          Paste a sample JSON object on the left and click{" "}
          <strong>Generate JSON Schema</strong>. The schema is inferred in your
          browser and can be used as a starting point for validation or API contracts.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          {/* Input JSON */}
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <label htmlFor="schema-json-input">
              <strong>Example JSON</strong>
            </label>
            <textarea
              id="schema-json-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ minHeight: 220 }}
              placeholder='{"id": 1, "name": "Dev Brains AI"}'
            />
          </div>

          {/* Output Schema */}
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>Generated JSON Schema</strong>
              <button
                type="button"
                className="small"
                onClick={copyOutput}
                disabled={!output}
              >
                Copy Schema
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              style={{ minHeight: 220, marginTop: 4 }}
              placeholder="JSON Schema will appear here."
            />
          </div>
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" onClick={handleGenerateSchema}>
            Generate JSON Schema
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

      {/* SEO / educational content */}
      <div className="card">
        <h2>Why generate JSON Schema from example JSON?</h2>
        <p className="small">
          Writing JSON Schema by hand can be tedious, especially for large or nested objects. By
          pasting a realistic example payload, you can:
        </p>
        <ul className="small">
          <li>Quickly bootstrap validation rules for APIs and microservices.</li>
          <li>Document expected fields and types for frontend and backend teams.</li>
          <li>Generate starter schemas to use with validators like AJV or OpenAPI tools.</li>
        </ul>

        <p className="small">
          This tool infers basic types, object properties, required fields, and array item types
          based on your sample JSON.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: JSON Schema Generator</h3>
        {FAQ_SCHEMA.map((item, idx) => (
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
        <h4>More JSON tools from Dev Brains AI</h4>
        <p className="small">
          Combine this generator with the{" "}
          <Link href="/json-formatter">JSON Formatter &amp; Validator</Link> to
          clean and validate payloads before defining schemas, or use the{" "}
          <Link href="/ai-error-explainer">AI Error Message Explainer</Link> to
          understand validation errors and runtime issues more easily.
        </p>
      </div>
    </div>
  );
}
