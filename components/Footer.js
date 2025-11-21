// components/Footer.js
export default function Footer() {
  return (
    <footer style={{ marginTop: 36, padding: '28px 0', color: '#475569' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>AI Dev Tools</div>
            <div className="small" style={{ marginTop: 6 }}>
              Free developer utilities — regex, SQL & JSON tools.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="/regex-generator" className="small">Regex</a>
            <a href="/sql-generator" className="small">SQL</a>
            <a href="/json-formatter" className="small">JSON</a> {/* ✅ new */}
            <a href="/blog" className="small">Blog</a>
            <a href="/about" className="small">About</a>
            <a href="/contact" className="small">Contact</a>
            <a href="/privacy" className="small">Privacy</a>
            <a href="/terms" className="small">Terms</a>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            borderTop: '1px solid #eef2f6',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div className="small">
            © {new Date().getFullYear()} AI Dev Tools — Built with open models
          </div>
          <div className="small">Made with ♥ — Host responsibly</div>
        </div>
      </div>
    </footer>
  );
}
