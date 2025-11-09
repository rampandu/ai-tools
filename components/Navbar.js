// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="topnav">
      <div className="nav-inner container">
        <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* use the png in /public */}
          <Image src="/logo.png" alt="AI Dev Tools" width={36} height={36} />
          <span style={{ color: 'white', fontWeight: 700 }}>AI Dev Tools</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/regex-generator">Regex</Link>
          <Link href="/sql-generator">SQL</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}
