import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="topnav">
      <div className="nav-inner container">
        <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image src="/logo.png" alt="AI Dev Tools Logo" width={28} height={28} />
          <strong>AI Dev Tools</strong>
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
