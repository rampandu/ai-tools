// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* BRAND */}
        <Link href="/" className="brand">
          <img
            src="/logo.png"
            width={34}
            height={34}
            alt="Dev Brains AI"
            style={{ borderRadius: 6, flexShrink: 0 }}
          />
          <div className="brand-text">
            <span>AI</span>
            <span>Dev</span>
            <span>Tools</span>
          </div>
        </Link>

        {/* LINKS */}
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/regex-generator">Regex</Link>
          <Link href="/sql-generator">SQL</Link>
          <Link href="/json-formatter">JSON</Link>
          {/* ✅ IMPORTANT: use /ai-error-explainer, not /error-explainer */}
          <Link href="/ai-error-explainer">Error Explainer</Link>
          <Link href="/json-schema-generator">JSON Schema</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
