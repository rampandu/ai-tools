import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-inner">

        {/* BRAND */}
        <Link href="/" className="brand">
          <img
            src="/logo.png"
            width={34}
            height={34}
            alt="Dev Brains AI"
          />
          <div className="brand-text">
            <span>AI</span>
            <span>Dev</span>
            <span>Tools</span>
          </div>
        </Link>

        {/* LINKS */}
        <div className="nav-links">
          <Link href="/regex-generator">Regex</Link>
          <Link href="/sql-generator">SQL</Link>
          <Link href="/json-formatter">JSON</Link>
          <Link href="/error-explainer">Error</Link>
          <Link href="/json-schema-generator">JSON Schema</Link>
          <Link href="/blog">Blog</Link>
        </div>

      </div>
    </div>
  );
}
