// pages/blog/index.js
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";

export default function BlogIndex({ posts }) {
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
        name: "Blog",
        item: "https://dev-brains-ai.com/blog",
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 22 }}>
      <Head>
        <title>Dev Brains AI Blog — Regex, SQL & AI Dev Tools Tutorials</title>
        <meta
          name="description"
          content="Tutorials, cheat sheets, and practical guides on regular expressions, SQL queries, cron expressions, and AI tools for developers. Free, no signup."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Ads */}
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

      <div className="card" style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: "flex", flexWrap: "wrap", gap: 4, listStyle: "none", padding: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Blog</li>
          </ol>
        </nav>

        <h1>Dev Brains AI Blog — Regex, SQL & AI Dev Tools Tutorials</h1>
        <p className="small">
          Practical tutorials, cheat sheets, and step-by-step guides for developers. Topics cover
          regular expressions, SQL queries, cron scheduling, JSON handling, and AI-powered tools.
          All articles are free, practical, and written for real-world use.
        </p>

        <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
          {posts.map((post) => (
            <li key={post.slug} className="card small" style={{ marginBottom: 12, padding: 12 }}>
              <h2 style={{ marginBottom: 4, fontSize: "1.1rem" }}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {post.description && (
                <p className="small" style={{ marginTop: 4 }}>
                  {post.description}
                </p>
              )}

              <Link href={`/blog/${post.slug}`} className="small">
                Read article →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// ✅ Auto-load ALL blogs with curated descriptions
const POST_META = {
  "sql-query-generator-tutorial-for-beginners": { title: "SQL Query Generator Tutorial for Beginners", description: "Learn how to use an AI SQL generator to write SELECT, JOIN, GROUP BY, and WHERE queries without remembering syntax." },
  "sql-join-interview-questions-with-examples": { title: "SQL JOIN Interview Questions with Examples", description: "Common SQL JOIN interview questions with answers and worked examples for MySQL and PostgreSQL." },
  "common-sql-errors-and-fix-using-ai": { title: "Common SQL Errors and How to Fix Them with AI", description: "The most frequent SQL errors developers encounter and practical AI-assisted fixes for each." },
  "sql-optimization-techniques-for-large-tables": { title: "SQL Optimization Techniques for Large Tables", description: "Speed up slow queries with indexing, query planning, and pagination strategies for large datasets." },
  "mysql-vs-postgresql-performance-comparison": { title: "MySQL vs PostgreSQL: Performance Comparison", description: "A practical comparison of MySQL and PostgreSQL query performance, feature set, and when to choose each." },
  "50-sql-queries-for-freshers-in-india": { title: "50 SQL Queries for Freshers in India", description: "50 essential SQL queries practised in TCS, Infosys, and Wipro technical rounds — with solutions." },
  "ai-sql-practical": { title: "Practical AI SQL Use Cases for Developers", description: "Real-world scenarios where an AI SQL generator saves time: reporting, data exploration, and ETL." },
  "sql-queries-asked-in-accenture-capgemini-interviews": { title: "SQL Queries Asked in Accenture & Capgemini Interviews", description: "Frequently asked SQL questions in Accenture, Capgemini, and similar service company interviews." },
  "sql-query-for-duplicate-records-detection": { title: "SQL Query to Find and Remove Duplicate Records", description: "Step-by-step SQL techniques to detect, count, and delete duplicate rows in MySQL and PostgreSQL." },
  "sql-query-for-sales-report-dashboard": { title: "SQL Queries for Sales Report Dashboards", description: "Ready-to-use SQL queries for building sales reports: revenue by month, by region, top products." },
  "top-sql-interview-questions-tcs-infosys-wipro": { title: "Top SQL Interview Questions: TCS, Infosys, Wipro", description: "SQL interview prep for IT services companies with questions, expected answers, and query walkthroughs." },
  "regex-top-patterns": { title: "Top 10 Regex Patterns Every Developer Should Know", description: "The most useful regular expressions for email, URL, phone, date, and IP address matching." },
  "regex-cheat-sheet-for-backend-developers": { title: "Regex Cheat Sheet for Backend Developers", description: "A concise reference of regex syntax, flags, anchors, quantifiers, and character classes." },
  "top-50-useful-regex-patterns-for-developers": { title: "Top 50 Useful Regex Patterns for Developers", description: "50 practical regex patterns with examples for validation, parsing, and search tasks." },
  "regex-for-email-validation-javascript-example": { title: "Regex for Email Validation in JavaScript", description: "How to validate email addresses using regex in JavaScript with edge case handling." },
  "regex-for-indian-phone-number-validation": { title: "Regex for Indian Phone Number Validation", description: "Regex patterns to validate Indian mobile numbers including +91, 91, and 10-digit formats." },
  "regex-for-password-validation-rules": { title: "Regex for Password Validation Rules", description: "Build strong password validation with regex: length, uppercase, digits, and special characters." },
  "regex-for-gst-number-validation": { title: "Regex for GST Number Validation in India", description: "Validate Indian GST identification numbers with a regex pattern and JavaScript example." },
  "regex-for-pan-card-validation": { title: "Regex for PAN Card Validation", description: "Regex to validate Indian PAN card format with examples in JavaScript and Python." },
  "regex-for-aadhaar-card-validation": { title: "Regex for Aadhaar Card Validation", description: "Validate Aadhaar card numbers using regex — handles 12-digit format and formatting edge cases." },
  "regex-for-ifsc-code-validation": { title: "Regex for IFSC Code Validation", description: "Regex patterns to validate Indian bank IFSC codes with JavaScript examples." },
  "regex-for-indian-pin-code-validation": { title: "Regex for Indian PIN Code Validation", description: "Validate 6-digit Indian postal PIN codes using regex in JavaScript and Python." },
  "cron-vs-setinterval-nodejs": { title: "Cron vs setInterval in Node.js — Which Should You Use?", description: "Compare node-cron and setInterval for task scheduling in Node.js — with code examples and trade-offs." },
  "cron-expressions-aws-eventbridge-lambda": { title: "Cron Expressions for AWS EventBridge and Lambda", description: "Write cron expressions that schedule AWS Lambda functions correctly using EventBridge syntax." },
  "cron-jobs-github-actions-tutorial": { title: "Cron Jobs in GitHub Actions — Schedule Workflows", description: "How to use cron expressions in GitHub Actions to run workflows on a schedule with examples." },
  "cron-expression-complete-guide": { title: "Cron Expression Complete Guide for Developers", description: "Everything you need to know about cron syntax: fields, special characters, and real-world patterns." },
  "top-10-cron-schedule-patterns-developers": { title: "Top 10 Cron Schedule Patterns for Developers", description: "The most commonly used cron expressions for daily jobs, hourly tasks, and monthly schedules." },
  "url-encoding-rest-api-query-parameters": { title: "URL Encoding for REST API Query Parameters", description: "Why and how to URL-encode query parameters in JavaScript using encodeURIComponent and URLSearchParams." },
  "url-encoding-guide-for-web-developers": { title: "URL Encoding Guide for Web Developers", description: "A complete guide to percent-encoding, when it is required, and common encoding mistakes to avoid." },
  "base64-encoding-javascript-examples": { title: "Base64 Encoding in JavaScript — Examples", description: "How to encode and decode Base64 strings in JavaScript with browser and Node.js examples." },
  "base64-vs-url-encoding-difference": { title: "Base64 vs URL Encoding — What\'s the Difference?", description: "When to use Base64 vs percent-encoding and how each affects data size and portability." },
  "encode-images-base64-data-uri-html-css": { title: "Encode Images as Base64 Data URIs in HTML/CSS", description: "Embed images directly in HTML and CSS using Base64 data URIs to avoid extra HTTP requests." },
  "decode-jwt-tokens-base64-javascript": { title: "Decode JWT Tokens Using Base64 in JavaScript", description: "How JWT tokens use Base64url encoding and how to decode the header and payload in JavaScript." },
  "fix-invalid-json-error-in-nodejs": { title: "Fix Invalid JSON Errors in Node.js", description: "Common causes of SyntaxError: Unexpected token in JSON and how to fix them in Node.js." },
  "how-to-validate-json-in-python-and-javascript": { title: "How to Validate JSON in Python and JavaScript", description: "Validate JSON structure in Python using json.loads and in JavaScript using JSON.parse with error handling." },
  "json-formatter-for-indian-gst-apis": { title: "JSON Formatter for Indian GST APIs", description: "Format and validate GST API JSON responses — with common field references and formatting tips." },
  "json-schema-generator-tutorial-with-examples": { title: "JSON Schema Generator Tutorial with Examples", description: "Generate a JSON Schema from example JSON and use it for API validation, documentation, and testing." },
  "ai-dev-tools-save-time": { title: "How AI Dev Tools Save Developer Time", description: "Practical examples of AI-powered tools that reduce repetitive tasks for developers." },
  "ai-sql-practical": { title: "Practical AI SQL Use Cases for Developers", description: "Real-world scenarios where AI SQL generation saves time in reporting and data work." },
  "ai-projects-for-engineering-students-india": { title: "AI Projects for Engineering Students in India", description: "Beginner-friendly AI project ideas for B.Tech and M.Tech students with implementation guidance." },
  "best-ai-projects-for-final-year-btech": { title: "Best AI Projects for Final Year B.Tech Students", description: "High-impact final year project ideas using machine learning, NLP, and computer vision." },
  "python-ai-projects-for-engineering-students-india": { title: "Python AI Projects for Engineering Students in India", description: "Practical Python + AI project ideas for Indian engineering students with links to resources." },
  "ai-microservices-tutorial-for-backend-developers": { title: "AI Microservices Tutorial for Backend Developers", description: "How to build and integrate AI capabilities into a microservices architecture using Python and REST APIs." },
  "ai-anomaly-detection-for-server-logs-python-example": { title: "AI Anomaly Detection for Server Logs in Python", description: "Detect unusual patterns in server logs using Python, scikit-learn, and simple statistical models." },
  "common-api-errors-and-how-to-fix-them": { title: "Common API Errors and How to Fix Them", description: "The most frequent REST API error codes — 400, 401, 403, 404, 429, 500 — with causes and fixes." },
  "how-to-debug-rest-api-errors-using-ai": { title: "How to Debug REST API Errors Using AI", description: "Use AI tools to diagnose REST API errors faster: read error messages, trace requests, and fix issues." },
  "fix-nodejs-errors-beginners-india": { title: "Fix Common Node.js Errors — Guide for Beginners in India", description: "Common Node.js errors and step-by-step fixes for beginners: Cannot find module, EACCES, ECONNREFUSED." },
  "best-free-developer-tools-for-indian-programmers": { title: "Best Free Developer Tools for Indian Programmers", description: "A curated list of the best free tools for Indian developers: IDEs, APIs, deployment, and utilities." },
  "sql-optimization-techniques-for-large-tables": { title: "SQL Optimization Techniques for Large Tables", description: "Speed up slow SQL queries with indexing, EXPLAIN, query rewriting, and pagination strategies." },
  "free-mysql-query-generator-online": { title: "Free MySQL Query Generator Online", description: "How to use a free AI MySQL query generator to build SELECT, JOIN, GROUP BY queries from plain English — no SQL knowledge required." },
  "ai-regex-generator-guide": { title: "AI Regex Generator — How to Use Automatic Regex Generation", description: "How an AI regex generator works, how to prompt it for email, phone, date, and custom patterns, and how to test the output." },
  "natural-language-to-sql-guide": { title: "Natural Language to SQL — How AI SQL Generators Work", description: "Learn how natural language to SQL conversion works, how to prompt an AI SQL query builder, and when AI-generated SQL saves time." },
};

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), "pages", "blog");

  const files = fs.readdirSync(blogDir)
    .filter(
      (f) =>
        f.endsWith(".js") &&
        f !== "index.js" &&
        !f.startsWith("_")
    );

  const posts = files.map((file) => {
    const slug = file.replace(".js", "");
    const meta = POST_META[slug];

    return {
      slug,
      title: meta?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      description: meta?.description || "",
    };
  });

  // Sort: posts with known meta first
  posts.sort((a, b) => (b.description ? 1 : 0) - (a.description ? 1 : 0));

  return {
    props: { posts },
  };
}