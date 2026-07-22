// pages/blog/how-to-test-rest-apis-with-postman.js
import Head from 'next/head';
import Link from 'next/link';

export default function HowToTestRestApisWithPostman() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Test REST APIs with Postman — Collections, Env Vars, and Automation',
        item: 'https://dev-brains-ai.com/blog/how-to-test-rest-apis-with-postman',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Test REST APIs with Postman: Collections to CI',
    description:
      'Organize Postman collections, use environment variables across environments, write pm.test() assertions, and automate everything in CI/CD with Newman.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/how-to-test-rest-apis-with-postman',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between a Postman collection and an environment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A collection is a saved group of API requests, organized like folders, that you can run and share. An environment is a set of key-value variables, like base URL or API token, that lets the same collection run against different setups such as local, staging, or production.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I run a Postman collection automatically in CI/CD?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Export the collection and environment as JSON, install Newman (Postman\'s command-line runner) with npm install -g newman, and run newman run collection.json -e environment.json in your CI pipeline step.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Postman test assertions check the response body, not just the status code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Postman\'s Tests tab uses pm.test() with the pm.expect() assertion library, which can check status codes, response time, headers, and any field inside the JSON response body via pm.response.json().',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Test REST APIs with Postman: Collections to CI | Dev Brains AI</title>
        <meta
          name="description"
          content="Organize Postman collections, use environment variables across environments, write pm.test() assertions, and automate everything in CI/CD with Newman."
        />
        <meta
          name="keywords"
          content="postman api testing, postman collections, postman environment variables, postman test assertions, newman cli, automate api tests"
        />
        <meta property="og:title" content="Test REST APIs with Postman: Collections to CI" />
        <meta property="og:description" content="Organize Postman collections, use environment variables across environments, write pm.test() assertions, and automate everything in CI/CD with Newman." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/how-to-test-rest-apis-with-postman" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/how-to-test-rest-apis-with-postman" />
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
              <li aria-current="page">Testing REST APIs with Postman</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Test REST APIs with Postman — Collections, Env Vars, and Automation
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Postman is often used just as a place to click "Send" and eyeball a JSON response, but
            it's capable of a lot more: organized collections, environment-driven configuration,
            scripted assertions, and full CI automation. This guide walks through setting all of
            that up properly.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Organizing Requests into Collections
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A collection groups related requests, usually mirroring your API's resource structure.
            Use folders inside a collection to group by feature area.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Users API</strong> — Create User, Get User, Update User, Delete User</li>
            <li><strong>Orders API</strong> — Create Order, List Orders, Cancel Order</li>
            <li><strong>Auth</strong> — Login, Refresh Token, Logout</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Save each request with a descriptive name and a short description of what it verifies
            — future you (and your teammates) will thank you.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Environment Variables
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Hardcoding <code>https://api.example.com</code> into every request makes it painful to
            switch between local, staging, and production. Define variables in a Postman
            Environment instead.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Environment: "Local"
baseUrl = http://localhost:5000
authToken = (empty, filled in by a test script after login)

// Environment: "Production"
baseUrl = https://api.example.com
authToken = (empty)

// Request URL uses the variable instead of a hardcoded host
{{baseUrl}}/api/users/42

// Authorization header
Authorization: Bearer {{authToken}}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Switching environments in the top-right dropdown instantly repoints every request in
            the collection — no find-and-replace needed.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Writing Test Assertions
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The Tests tab on a request runs JavaScript after the response arrives, using
            Postman's built-in <code>pm</code> object.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Response has expected user shape', function () {
  const body = pm.response.json();
  pm.expect(body).to.have.property('id');
  pm.expect(body).to.have.property('email');
  pm.expect(body.id).to.equal(42);
});

pm.test('Response time is under 500ms', function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// Save a token from the login response for use in later requests
pm.test('Save auth token', function () {
  const body = pm.response.json();
  pm.environment.set('authToken', body.token);
});`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            That last example is powerful: the Login request's test script saves the returned
            token into <code>authToken</code>, and every subsequent request in the collection
            automatically uses it via <code>&#123;&#123;authToken&#125;&#125;</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Chaining Requests with the Collection Runner
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The Collection Runner executes every request in a folder in order, running each
            request's tests and reporting pass/fail for the whole suite. This is how you simulate
            a full user flow: login, create a resource, read it back, then delete it.
          </p>
          <ol className="small" style={{ marginBottom: 14 }}>
            <li>Open the collection, click "Run"</li>
            <li>Select the environment (Local, Staging, etc.)</li>
            <li>Choose the requests/folders to include and the run order</li>
            <li>Click "Run" and review the pass/fail summary for each request's assertions</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Automating with Newman
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Newman is Postman's command-line collection runner, letting you run the exact same
            tests in a CI/CD pipeline instead of manually clicking "Run" in the GUI.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`npm install -g newman

# Export your collection and environment as JSON from Postman first
newman run users-api.postman_collection.json \\
  -e staging.postman_environment.json \\
  --reporters cli,junit \\
  --reporter-junit-export results.xml`}
          </pre>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# GitHub Actions step
- name: Run API tests
  run: |
    npm install -g newman
    newman run users-api.postman_collection.json -e staging.postman_environment.json`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Newman exits with a non-zero code if any test fails, so it plugs directly into a CI
            pipeline as a pass/fail gate before deployment.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between a Postman collection and an environment?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A collection is a saved group of API requests, organized like folders, that you can
              run and share. An environment is a set of key-value variables, like base URL or API
              token, that lets the same collection run against different setups such as local,
              staging, or production.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I run a Postman collection automatically in CI/CD?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Export the collection and environment as JSON, install Newman (Postman's
              command-line runner) with npm install -g newman, and run newman run collection.json
              -e environment.json in your CI pipeline step.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can Postman test assertions check the response body, not just the status code?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Postman's Tests tab uses pm.test() with the pm.expect() assertion library,
              which can check status codes, response time, headers, and any field inside the JSON
              response body via pm.response.json().
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Postman test failing with an error you don't understand? Paste the error message
              into our free AI Error Explainer for an instant, plain-English fix.
            </p>
            <Link href="/ai-error-explainer">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Try AI Error Explainer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/how-to-design-a-rest-api-best-practices">How to Design a REST API — Best Practices</Link></li>
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/how-to-debug-rest-api-errors-using-ai">How to Debug REST API Errors Using AI</Link></li>
              <li><Link href="/blog/api-authentication-methods-explained-oauth-jwt-apikey">API Authentication Methods Explained</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
