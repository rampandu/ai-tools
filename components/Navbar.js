// components/Navbar.js
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const TOOL_GROUPS = [
  {
    heading: 'Generate',
    items: [
      { href: '/regex-generator', label: 'Regex Generator' },
      { href: '/sql-generator', label: 'SQL Generator' },
      { href: '/cron-generator', label: 'Cron Generator' },
      { href: '/readme-generator', label: 'README Generator' },
      { href: '/api-docs-generator', label: 'API Docs Generator' },
      { href: '/unit-test-generator', label: 'Unit Test Generator' },
      { href: '/commit-message-generator', label: 'Commit Message Generator' },
      { href: '/docstring-generator', label: 'Docstring Generator' },
    ],
  },
  {
    heading: 'Explain',
    items: [
      { href: '/regex-explainer', label: 'Regex Explainer' },
      { href: '/sql-explainer', label: 'SQL Query Explainer' },
      { href: '/code-explainer', label: 'Code Explainer' },
      { href: '/stack-trace-analyzer', label: 'Stack Trace Analyzer' },
      { href: '/ai-error-explainer', label: 'Error Explainer' },
    ],
  },
  {
    heading: 'Convert & Format',
    items: [
      { href: '/json-formatter', label: 'JSON Formatter' },
      { href: '/json-schema-generator', label: 'JSON Schema Generator' },
      { href: '/base64-tool', label: 'Base64 Tool' },
      { href: '/url-encoder', label: 'URL Encoder' },
      { href: '/curl-converter', label: 'cURL to Code' },
    ],
  },
];

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="brand">
          <img
            src="/logo.png"
            width={34}
            height={34}
            alt="Dev Brains AI"
            style={{ borderRadius: 6, flexShrink: 0 }}
          />
          <div className="brand-text">
            <span>Dev</span>
            <span>Brains</span>
            <span>AI</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links" aria-label="Main navigation">
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => setToolsOpen((v) => !v)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Tools {toolsOpen ? '▴' : '▾'}
            </button>
            {toolsOpen && (
              <div className="nav-dropdown-menu" role="menu">
                {TOOL_GROUPS.map((group) => (
                  <div className="nav-dropdown-col" key={group.heading}>
                    <div className="nav-dropdown-heading">{group.heading}</div>
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setToolsOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="nav-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {TOOL_GROUPS.map((group) => (
            <div key={group.heading} className="mobile-menu-group">
              <div className="nav-dropdown-heading">{group.heading}</div>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mobile-menu-group">
            <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
          </div>
        </div>
      )}
    </header>
  );
}
