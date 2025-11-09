// pages/_app.js
import '../styles/globals.css';   // <<-- MUST exist and be imported here
import Navbar from '../components/Navbar';

// client-side snippet to send logs (add in _app.js)
if (typeof window !== 'undefined') {
  window.addEventListener('error', e => {
    try {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: e.message, detail: String(e.error || '') })
      });
    } catch {}
  });
  window.addEventListener('unhandledrejection', e => {
    try {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'UnhandledRejection', detail: String(e.reason || '') })
      });
    } catch {}
  });
}



export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
