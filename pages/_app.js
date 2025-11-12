// pages/_app.js
import '../styles/globals.css'; // global styles
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// ✅ Client-side log capture (your existing logic)
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
  const router = useRouter();

  // ✅ Send page views to GA4 on route changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* ✅ Google Analytics (GA4) */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
