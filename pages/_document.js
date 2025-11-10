// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true';
    const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#0ea5a6" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="google-site-verification" content="8i0_dMKtuKPG0AA3-krcTT8YPdySMaY1g2VJNLDTn9s" />


          {/* ✅ Google AdSense verification script (auto toggled) */}
          {ADSENSE_ENABLED && ADSENSE_CLIENT && (
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
