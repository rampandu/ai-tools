// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
        color: "#f9fafb",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="container" style={{ padding: "10px 0" }}>
        <div className="navbar-inner">
          {/* Logo + brand */}
          <Link href="/">
            <a
              className="navbar-brand"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                color: "#f9fafb",
              }}
            >
              <img
                src="/logo.png"
                alt="Dev Brains AI"
                width={32}
                height={32}
                style={{ borderRadius: 6, flexShrink: 0 }}
              />
              <div style={{ fontWeight: 700, lineHeight: 1.1, fontSize: "0.9rem" }}>
                <div>AI</div>
                <div>Dev</div>
                <div>Tools</div>
              </div>
            </a>
          </Link>

          {/* Links */}
          <nav className="navbar-links">
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
