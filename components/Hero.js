// components/Hero.js
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero card" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 420px' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: 8 }}>Free AI Dev Tools — Regex & SQL</h1>
        <p className="small" style={{ fontSize: '1rem', marginBottom: 16 }}>
          Convert plain English to production-ready Regular Expressions and SQL queries.
          Fast, private, and developer-friendly — no signup required for basic usage.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <Link href="/regex-generator"><button>Try Regex Generator</button></Link>
          <Link href="/sql-generator"><button>Try SQL Generator</button></Link>
          <Link href="/privacy" style={{ alignSelf: 'center', marginLeft: 6 }}>
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Privacy</span>
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Free</div>
            <div className="small">Use without signup</div>
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Fast</div>
            <div className="small">Deterministic engines for quick results</div>
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Private</div>
            <div className="small">No personal data collection by default</div>
          </div>
        </div>
      </div>

      <div style={{ width: 160, textAlign: 'center', flexShrink: 0 }}>
        <Image src="/logo.png" alt="AI Dev Tools" width={120} height={120} />
        <div className="small" style={{ marginTop: 8 }}>Built for developers</div>
      </div>
    </section>
  );
}
