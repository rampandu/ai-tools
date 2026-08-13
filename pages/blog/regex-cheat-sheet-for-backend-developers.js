import Head from "next/head";
import Link from "next/link";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Regex Cheat Sheet for Backend Developers (Node & Python) | Dev Brains AI</title>

        <meta
          name="description"
          content="A regex cheat sheet for backend developers: symbols, character classes, and patterns for email, phone, PAN, GST, and PIN validation in Node.js and Python."
        />

        <meta property="og:title" content="Regex Cheat Sheet for Backend Developers (Node & Python)" />
        <meta property="og:description" content="A regex cheat sheet for backend developers: symbols, character classes, and patterns for email, phone, PAN, GST, and PIN validation in Node.js and Python." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-cheat-sheet-for-backend-developers" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-cheat-sheet-for-backend-developers" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "Regex Cheat Sheet for Backend Developers (Node & Python)",
              author: { "@type": "Organization", name: "Dev-Brains-AI" },
              publisher: { "@type": "Organization", name: "Dev-Brains-AI" }
            })
          }}
        />
      </Head>

      <main style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
        <h1>Regex Cheat Sheet for Backend Developers</h1>

        <p>
          Regular expressions (regex) are very important for backend developers
          working with Node.js, Python, Java, and databases. Indian developers
          often use regex for validation of phone numbers, Aadhaar, PAN, GST,
          emails, and passwords.
        </p>

        <p>
          👉 Try the <Link href="/regex-generator">Regex Generator Tool</Link>
        </p>

        <hr />

        <h2>1️⃣ Basic Regex Symbols</h2>

        <ul>
          <li><b>.</b> → Any character</li>
          <li><b>*</b> → Zero or more</li>
          <li><b>+</b> → One or more</li>
          <li><b>?</b> → Optional</li>
          <li><b>^</b> → Start of string</li>
          <li><b>$</b> → End of string</li>
        </ul>

        <pre>{`Example: ^hello$`}</pre>

        <hr />

        <h2>2️⃣ Character Classes</h2>

        <pre>{`[abc]      → a or b or c
[a-z]      → lowercase letters
[A-Z]      → uppercase letters
[0-9]      → digits
[^0-9]     → not digits
\\d         → digit
\\w         → word character
\\s         → whitespace`}</pre>

        <hr />

        <h2>3️⃣ Common Validation Regex</h2>

        <h3>Email Validation</h3>
        <pre>{`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$`}</pre>

        <h3>Indian Phone Number</h3>
        <pre>{`^(\\+91)?[6-9][0-9]{9}$`}</pre>

        <h3>PAN Card</h3>
        <pre>{`^[A-Z]{5}[0-9]{4}[A-Z]$`}</pre>

        <h3>GST Number</h3>
        <pre>{`^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$`}</pre>

        <h3>PIN Code</h3>
        <pre>{`^[1-9][0-9]{5}$`}</pre>

        <p>
          For Aadhaar, passport, IFSC, driving license, and a deeper breakdown of
          which of these regex patterns are actually safe to trust versus which
          need a real checksum, see{" "}
          <Link href="/blog/regex-for-indian-id-document-validation">
            the complete guide to Indian ID and document regex validation
          </Link>.
        </p>

        <hr />

        <h2>4️⃣ Regex in Node.js Example</h2>

        <pre>{`
const phoneRegex = /^(\\+91)?[6-9][0-9]{9}$/;

console.log(phoneRegex.test("9876543210"));
`}</pre>

        <h2>Regex in Python</h2>

        <pre>{`
import re

pattern = r"^(\\+91)?[6-9][0-9]{9}$"
print(re.match(pattern, "9876543210"))
`}</pre>

        <hr />

        <h2>5️⃣ Real Use Cases for Backend Developers</h2>

        <ul>
          <li>Validate API input data</li>
          <li>Check password strength</li>
          <li>Extract log errors</li>
          <li>Parse CSV or JSON data</li>
          <li>Validate GST or PAN numbers</li>
        </ul>

        <p>
          👉 Try the <Link href="/json-formatter">JSON Formatter</Link>
        </p>

        <hr />

        <h2>6️⃣ Regex Interview Questions in India</h2>

        Companies like TCS, Infosys, and startups ask:

        <ul>
          <li>Write regex for email validation</li>
          <li>Find duplicate words in string</li>
          <li>Extract numbers from text</li>
          <li>Validate password rules</li>
        </ul>

        Practice using the <Link href="/regex-generator">Dev Brains AI Regex Generator</Link>.

        <hr />

        <h2>Tips to Master Regex</h2>

        <ul>
          <li>Practice daily with real examples</li>
          <li>Test regex using online tools</li>
          <li>Start simple and build step-by-step</li>
          <li>Use comments to explain patterns</li>
        </ul>

        <hr />

        <h2>Conclusion</h2>

        <p>
          Regex is one of the most powerful skills for backend developers in India.
          It helps with validation, parsing, automation, and debugging.
        </p>

        <p>
          Use Dev-Brains-AI tools to generate and test regex patterns faster.
        </p>

        <p>
          👉 <Link href="/">Browse all Dev Brains AI tools</Link>
        </p>
      </main>
    </>
  );
}