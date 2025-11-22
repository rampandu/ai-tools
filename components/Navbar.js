// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { href: '/regex-generator', label: 'Regex' },
  { href: '/sql-generator', label: 'SQL' },
  { href: '/json-formatter', label: 'JSON' },
  { href: '/ai-error-explainer', label: 'Error' },
  { href: '/json-schema-generator', label: 'JSON Schema' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const router = useRouter();

  const isActive = (href) =>
    router.pathname === href || router.pathname.startsWith(href + '/');

  return (
    <header className="topnav">
      <div className="nav-inner container">
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
            <div className="brand-text">AI Dev Tools</div>
          </a>
        </Link>

        {/* Navigation links */}
        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
