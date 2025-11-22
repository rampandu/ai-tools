// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="topnav">
      <div className="container">
        <div className="nav-inner">
          {/* Brand / Logo */}
          <Link href="/">
            <a className="brand">
              <img
                src="/logo.png"
                alt="Dev Brains AI"
                width={32}
                height={32}
                style={{ borderRadius: 6, flexShrink: 0 }}
              />
              <div className="brand-text">
                <span>AI</span>
                <span>Dev</span>
                <span>Tools</span>
              </div>
            </a>
          </Link>

          {/* Navigation links */}
          <nav className="nav-links" aria-label="Main navigation">
            <Link href="/regex-generator">
              <a>Regex</a>
            </Link>
            <Link href="/sql-generator">
              <a>SQL</a>
            </Link>
            <Link href="/json-formatter">
              <a>JSON</a>
            </Link>
            <Link href="/ai-error-explainer">
              <a>Error</a>
            </Link>
            <Link href="/json-schema-generator">
              <a>JSON Schema</a>
            </Link>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
