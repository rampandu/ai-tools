// pages/blog/regex-top-patterns.js
import Head from 'next/head';
import Link from 'next/link';

export default function TopRegexPatterns() {
  return (
    <>
      <Head>
        <title>Top 10 Regex Patterns Every Developer Should Know | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn the top 10 regular expression patterns every developer should know, with practical examples and how to use them."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-top-patterns" />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article
          className="card"
          style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Top 10 Regex Patterns Every Developer Should Know
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Regular expressions (regex) are a compact and powerful language for pattern-matching and
            text processing. Learning a few reliable patterns can dramatically speed up tasks like
            validation, parsing logs, and extracting data. Below are ten patterns that are useful
            across many projects — with brief explanations and examples.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>1. Match only digits</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^\\d+$'}</code> — matches strings that are entirely digits (e.g., "12345"). Use
            for numeric IDs or codes.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>2. Match only letters</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^[A-Za-z]+$'}</code> — matches alphabetic strings. Useful when restricting input
            to letters only.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>3. Basic email validation</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'}</code> — a practical email
            validator for many use cases. Note: email validation can be complicated for every RFC
            nuance; use this for simple checks.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>4. URL detection</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'https?:\\/\\/[^\\s]+'}</code> — finds http or https URLs in text. Pair with
            stricter parsing for production use.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>5. Word boundary match</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'\\bword\\b'}</code> — ensures you match a whole word, not substrings. Helpful in
            search and natural language tasks.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>
            6. Capture groups for extraction
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'(\\d{4})-(\\d{2})-(\\d{2})'}</code> — extracts year, month, day from ISO-like
            date strings. Use capture groups to pull parts into variables.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>7. Optional groups</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'^(\\+?\\d{1,3})?[-.\\s]?\\d{10}$'}</code> — a phone number pattern allowing an
            optional country code. Optional groups are powerful for flexible input formats.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>8. Non-greedy matching</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'<.*?>'}</code> — using <code>?</code> after <code>*</code> makes the quantifier
            non-greedy, matching the shortest possible string. Useful when parsing HTML-like
            snippets.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>9. Alternation (or)</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>{'cat|dog|rabbit'}</code> — matches either "cat", "dog" or "rabbit". Alternation
            is simple but effective for enumerating known tokens.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 16 }}>
            10. Validate hex colors
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>{'^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'}</code> — matches 3- or 6-digit hex color
            codes with optional leading "#". Handy in styling and design tools.
          </p>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>
            Tips for using regex safely
          </h3>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>
              Avoid catastrophic backtracking by limiting nested quantifiers and preferring atomic
              or possessive quantifiers when available.
            </li>
            <li>
              Always test your patterns with representative input sets — edge cases often surface
              unexpected behavior.
            </li>
            <li>
              Use named capture groups where supported to improve readability, e.g.{' '}
              <code>{'(?<year>\\d{4})'}</code>.
            </li>
          </ul>

          <p className="small" style={{ marginTop: 12 }}>
            If you want, try these patterns in our{' '}
            <Link href="/regex-generator" className="text-blue-600 underline">
              AI Regex Generator
            </Link>{' '}
            to see live examples and explanations.
          </p>
        </article>
      </main>
    </>
  );
}
