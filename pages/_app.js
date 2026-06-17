// pages/_app.js
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// client-side snippet to send logs (keeps your previous behavior)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    try {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: e.message, detail: String(e.error || '') }),
      });
    } catch {}
  });

  window.addEventListener('unhandledrejection', (e) => {
    try {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'UnhandledRejection',
          detail: String(e.reason || ''),
        }),
      });
    } catch {}
  });
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // === Show ads everywhere EXCEPT these utility/legal pages
  // (no real content for ads to run alongside, or policy-sensitive)
  const denyAdsPrefixes = [
    '/privacy',
    '/terms',
    '/contact',
    '/about',
    '/api',
    '/404',
    '/500',
  ];

  const isAdAllowed = !denyAdsPrefixes.some(
    (p) => router.pathname === p || router.pathname.startsWith(p + '/')
  );

  const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true';
  const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  const SHOW_ADS = ADSENSE_ENABLED && ADSENSE_CLIENT && isAdAllowed;

  // GA: pageview on route changes
  useEffect(() => {
    const handleRoute = (url) => {
      if (window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRoute);
    return () => {
      router.events.off('routeChangeComplete', handleRoute);
    };
  }, [router.events]);

  return (
    <>
      {/* ✅ Very important: force full-width layout on mobile */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}

      {/* AdSense script — loaded on every page except the deny-list above */}
      {SHOW_ADS && (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      )}

      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}