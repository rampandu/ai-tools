// pages/blog/how-to-document-a-rest-api-endpoint.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowToDocumentARestApiEndpoint() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Document a REST API Endpoint',
        item: 'https://dev-brains-ai.com/blog/how-to-document-a-rest-api-endpoint',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'REST API Endpoint Documentation: 7-Point Checklist',
    description:
      'See exactly what to include when documenting a REST endpoint — a 7-item checklist, a full worked POST /api/orders example, and when Markdown beats OpenAPI.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-to-document-a-rest-api-endpoint',
    datePublished: '2026-07-12',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What should be included when documenting a REST API endpoint?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each endpoint should document the HTTP method and path, a short description, path and query parameters, a request body example, a response example, and the possible status codes with what each one means.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to generate API documentation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free API Docs Generator at dev-brains-ai.com/api-docs-generator. Fill in a short form describing your endpoint and it produces clean, ready-to-paste Markdown documentation instantly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need OpenAPI/Swagger or is Markdown documentation enough?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Markdown documentation is enough for small APIs, internal tools, and early-stage projects where humans read the docs directly. OpenAPI/Swagger is worth the extra effort once you need auto-generated SDKs, interactive "try it" consoles, or automated contract testing.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>REST API Endpoint Documentation: 7-Point Checklist | Dev Brains AI</title>
        <meta
          name="description"
          content="See exactly what to include when documenting a REST endpoint — a 7-item checklist, a full worked POST /api/orders example, and when Markdown beats OpenAPI."
        />
        <meta
          name="keywords"
          content="rest api endpoint documentation checklist, how to document a rest api, document api endpoint, openapi vs markdown docs, rest api documentation example, api docs generator"
        />
        <meta property="og:title" content="REST API Endpoint Documentation: 7-Point Checklist" />
        <meta property="og:description" content="See exactly what to include when documenting a REST endpoint — a 7-item checklist, a full worked POST /api/orders example, and when Markdown beats OpenAPI." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/how-to-document-a-rest-api-endpoint" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-to-document-a-rest-api-endpoint" />
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
              <li aria-current="page">How to Document a REST API Endpoint</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Document a REST API Endpoint (With a Worked Example)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            An API that works perfectly but has no documentation might as well not exist to the
            people trying to integrate with it. Good endpoint documentation turns a guessing game
            into a copy-paste-and-go experience. This guide covers exactly what to include when
            documenting a REST endpoint, walks through a full worked example, and explains when
            plain Markdown docs are enough versus when you need a formal OpenAPI spec.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Undocumented APIs Cause Real Friction
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            When an endpoint isn't documented, every consumer of your API has to reverse-engineer
            it — reading source code, guessing at field names, or opening a support ticket. That
            friction shows up in predictable, expensive ways:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Support load</strong> — "what fields does this endpoint expect?" becomes a recurring Slack message or ticket instead of a five-second doc lookup</li>
            <li><strong>Slower integrations</strong> — partner teams or external developers spend hours on trial-and-error requests instead of minutes reading a page</li>
            <li><strong>Onboarding pain</strong> — new engineers on your own team waste their first week tracing controller code just to understand what the API surface looks like</li>
            <li><strong>Silent breaking changes</strong> — without documented request/response shapes, nobody notices when a field quietly changes type or gets removed</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What to Include for Every Endpoint
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Method and path</strong> — e.g. <code>POST /api/orders</code> — the single most scanned line on the page</li>
            <li><strong>Description</strong> — one or two sentences on what the endpoint does and any side effects (does it send an email? charge a card?)</li>
            <li><strong>Path parameters</strong> — any <code>{'{id}'}</code>-style segments in the URL, with type and meaning</li>
            <li><strong>Query parameters</strong> — filters, pagination (<code>page</code>, <code>limit</code>), sorting — marked required or optional with defaults</li>
            <li><strong>Request body</strong> — a realistic JSON example, with each field's type and whether it is required</li>
            <li><strong>Response example</strong> — a realistic JSON example of a successful response, matching real field names exactly</li>
            <li><strong>Status codes</strong> — every code the endpoint can actually return, and what triggers each one</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Worked Example: Documenting POST /api/orders
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Let's document a realistic order-creation endpoint from scratch, section by section.
          </p>

          <p className="small"><strong>Method, path, and description</strong></p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`## POST /api/orders

Creates a new order for the authenticated user. On success, this also
triggers a confirmation email and reserves stock for each line item.`}
          </pre>

          <p className="small"><strong>Request body</strong></p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`### Request Body

| Field       | Type   | Required | Description                        |
|-------------|--------|----------|-------------------------------------|
| customer_id | string | yes      | ID of the customer placing the order|
| items       | array  | yes      | List of { product_id, quantity }    |
| coupon_code | string | no       | Optional discount code              |

{
  "customer_id": "cus_8821",
  "items": [
    { "product_id": "prod_101", "quantity": 2 },
    { "product_id": "prod_205", "quantity": 1 }
  ],
  "coupon_code": "WELCOME10"
}`}
          </pre>

          <p className="small"><strong>Response example</strong></p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`### Response — 201 Created

{
  "order_id": "ord_5510",
  "status": "pending",
  "total_amount": 1899.00,
  "currency": "INR",
  "created_at": "2026-07-12T09:15:00Z"
}`}
          </pre>

          <p className="small"><strong>Status codes</strong></p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`### Status Codes

201  Created        — order created successfully
400  Bad Request     — missing or invalid fields in the request body
401  Unauthorized    — missing or expired auth token
404  Not Found       — one or more product_id values do not exist
409  Conflict        — insufficient stock for one or more items
500  Server Error    — unexpected failure, safe to retry`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Notice this covers not just the happy path but the failure modes too — a 409 for
            out-of-stock items is exactly the kind of thing a consumer needs to know about before
            they hit it in production and file a confused support ticket.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Human-Readable Docs vs Machine-Readable Specs
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            There are two different jobs documentation can do, and they call for different formats.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>
              <strong>Markdown/README-style docs</strong> — written for humans to read directly.
              Fast to write, easy to review in a pull request, and perfect for internal APIs,
              small projects, or a `/docs` folder that ships alongside your code.
            </li>
            <li>
              <strong>OpenAPI/Swagger specs</strong> — a structured JSON or YAML file describing
              every endpoint, schema, and status code in a machine-readable format. This unlocks
              interactive "try it" consoles (Swagger UI), auto-generated client SDKs, contract
              testing, and mock servers generated straight from the spec.
            </li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            A rule of thumb: start with Markdown docs. They cost almost nothing to write and cover
            90% of real-world needs. Move to OpenAPI once external partners need to generate
            client code automatically, or once your API surface is large enough that manual docs
            drift out of sync faster than anyone can fix them.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Keeping Docs in Sync With the Actual API
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Update docs in the same PR as the code change</strong> — if a field is renamed, the doc update belongs in that commit, not a follow-up task that never happens</li>
            <li><strong>Use real response examples</strong> — copy actual output from a request instead of hand-typing a "plausible-looking" JSON blob that drifts from reality</li>
            <li><strong>Review docs in code review</strong> — treat an outdated example the same as a failing test: block the merge until it's fixed</li>
            <li><strong>Add a "last updated" note</strong> — even a simple date stamp helps readers judge whether they can trust what they're reading</li>
            <li><strong>Automate where you can</strong> — generating docs from code comments or an OpenAPI spec removes the chance of manual docs silently going stale</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What should be included when documenting a REST API endpoint?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Method and path, a description, path and query parameters, a request body example,
              a response example, and the full list of status codes with what triggers each one.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to generate API documentation?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. <Link href="/api-docs-generator">Dev Brains AI API Docs Generator</Link> turns a
              short form describing your endpoint into clean, ready-to-paste Markdown documentation
              — free, instant, no signup.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Do I need OpenAPI/Swagger or is Markdown documentation enough?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Markdown is enough for most small-to-medium APIs read directly by humans. OpenAPI
              becomes worth the extra effort once you need interactive docs, auto-generated SDKs,
              or automated contract testing against your API.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free API Docs Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Fill in a short form and get clean Markdown endpoint documentation instantly.
              No signup, no cost.
            </p>
            <Link href="/api-docs-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open API Docs Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/how-to-design-a-rest-api-best-practices">How to Design a REST API — Best Practices</Link></li>
              <li><Link href="/blog/rest-api-vs-graphql-comparison">REST API vs GraphQL — A Practical Comparison</Link></li>
              <li><Link href="/blog/rest-api-json-response-best-practices">REST API JSON Response Best Practices</Link></li>
              <li><Link href="/readme-generator">Free README Generator</Link></li>
              <li><Link href="/curl-converter">Free cURL to Code Converter</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
